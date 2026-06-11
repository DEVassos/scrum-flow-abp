// ================================
//   CONFIGURACOES.JS
//   Controla a página de configurações:
//   — redireciona se não autenticado
//   — exibe seção admin quando perfil === 'admin' (campo adicionado em T15)
//   — pré-preenche campos com dados da sessão
//   — valida e envia formulários (stubs — rotas wired em T15/T16/T17)
//   — tabelas de questões e módulos com dados de exemplo
// ================================

(function () {
  // ── Guarda de autenticação ────────────────────────────────────────
  if (!estaAutenticado()) {
    window.location.href = "index.html";
    return;
  }

  // ── Verifica perfil admin ─────────────────────────────────────────
  // Lê o campo 'perfil' do payload JWT.
  // Quando T15 adicionar esse campo ao token, a seção de admin aparece automaticamente.
  function estaAdmin() {
    const token = obterToken();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.is_admin === true;
    } catch {
      return false;
    }
  }

  // ── Saudação no navbar ────────────────────────────────────────────
  // navbar.js retorna cedo quando não há #nav-deslogado na página,
  // então preenchemos manualmente aqui.
  const navSaudacao = document.getElementById("nav-saudacao");
  if (navSaudacao) {
    navSaudacao.textContent = "Olá, " + (obterNome() || "");
  }

  // ── Carrega dados do usuário via API ─────────────────────────────
  carregarDadosUsuario();

  async function carregarDadosUsuario() {
    try {
      const response = await fetch("/api/usuarios/me", {
        headers: { Authorization: "Bearer " + obterToken() },
      });
      if (!response.ok) return;
      const usuario = await response.json();
      const inputNome = document.getElementById("input-nome");
      const inputEmail = document.getElementById("input-email");
      const inputCpf = document.getElementById("input-cpf");
      if (inputNome) inputNome.value = usuario.nome || "";
      if (inputEmail) inputEmail.value = usuario.email || "";
      if (inputCpf && usuario.cpf) inputCpf.value = formatarCpf(usuario.cpf);
    } catch (e) {
      console.error("Erro ao carregar dados do usuário:", e);
    }
  }

  function formatarCpf(cpf) {
    const s = String(cpf || "").replace(/\D/g, "");
    if (s.length !== 11) return cpf;
    return s.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  // ── Exibe seção de admin se aplicável ────────────────────────────
  const secaoAdmin = document.getElementById("secao-admin");
  if (estaAdmin() && secaoAdmin) {
    secaoAdmin.hidden = false;
    carregarQuestoes();
    carregarNiveis();
    configurarModalProgresso();
  }

  // ── Formulário: dados pessoais ────────────────────────────────────
  const formDados = document.getElementById("form-dados");
  if (formDados) {
    formDados.addEventListener("submit", async function (e) {
      e.preventDefault();
      const nome = document.getElementById("input-nome").value.trim();
      const email = document.getElementById("input-email").value.trim();
      const cpf = document.getElementById("input-cpf").value.trim();

      if (!nome || !email) {
        mostrarToast("Preencha ao menos o nome e o e-mail.", "erro");
        return;
      }

      try {
        const body = { nome, email };
        if (cpf) body.cpf = cpf;

        const response = await fetch("/api/usuarios/me", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + obterToken(),
          },
          body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
          mostrarToast(data.message || "Erro ao salvar dados.", "erro");
          return;
        }

        mostrarToast("Dados salvos com sucesso!", "sucesso");
      } catch (err) {
        console.error(err);
        mostrarToast("Erro de conexão ao salvar dados.", "erro");
      }
    });
  }

  // ── Formulário: senha ─────────────────────────────────────────────
  const formSenha = document.getElementById("form-senha");
  if (formSenha) {
    formSenha.addEventListener("submit", async function (e) {
      e.preventDefault();
      const senhaAtual = document.getElementById("input-senha-atual").value;
      const nova = document.getElementById("input-nova-senha").value;
      const confirmar = document.getElementById("input-confirmar-senha").value;

      if (!senhaAtual) {
        mostrarToast("Informe a senha atual.", "erro");
        return;
      }
      if (nova.trim().length < 8) {
        mostrarToast("A nova senha deve ter no mínimo 8 caracteres.", "erro");
        return;
      }
      if (nova !== confirmar) {
        mostrarToast("As senhas não coincidem.", "erro");
        return;
      }

      try {
        const response = await fetch("/api/usuarios/me/senha", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + obterToken(),
          },
          body: JSON.stringify({ senha_atual: senhaAtual, nova_senha: nova }),
        });

        const data = await response.json().catch(function () {
          return {};
        });

        if (!response.ok) {
          mostrarToast(data.message || "Erro ao alterar senha.", "erro");
          return;
        }

        mostrarToast("Senha alterada com sucesso!", "sucesso");
        formSenha.reset();
      } catch (err) {
        console.error(err);
        mostrarToast("Erro de conexão ao alterar senha.", "erro");
      }
    });
  }

  // ── Toggle do formulário de nova questão ─────────────────────────
  const btnNovaQuestao = document.getElementById("btn-nova-questao");
  const formWrapper = document.getElementById("form-nova-questao-wrapper");
  const btnCancelar = document.getElementById("btn-cancelar-questao");
  const formNovaQuestao = document.getElementById("form-nova-questao");
  const btnSalvarQuestao = formNovaQuestao
    ? formNovaQuestao.querySelector('button[type="submit"]')
    : null;
  const btnToggleQuestoes = document.getElementById("btn-toggle-questoes");
  const questoesListaWrapper = document.getElementById("questoes-lista-wrapper");
  let questaoEmEdicaoId = null;

  if (btnNovaQuestao && formWrapper) {
    btnNovaQuestao.addEventListener("click", function () {
      if (questaoEmEdicaoId !== null) {
        limparFormularioQuestao();
        formWrapper.hidden = false;
        return;
      }

      formWrapper.hidden = !formWrapper.hidden;
    });
  }

  if (btnToggleQuestoes && questoesListaWrapper) {
    btnToggleQuestoes.addEventListener("click", function () {
      questoesListaWrapper.hidden = !questoesListaWrapper.hidden;
      btnToggleQuestoes.textContent = questoesListaWrapper.hidden
        ? "Ver questões cadastradas"
        : "Ocultar questões cadastradas";
    });
  }

  if (btnCancelar && formWrapper) {
    btnCancelar.addEventListener("click", function () {
      limparFormularioQuestao();
    });
  }

  if (formNovaQuestao) {
    formNovaQuestao.addEventListener("submit", async function (e) {
      e.preventDefault();

      const dadosQuestao = obterDadosFormularioQuestao();
      if (!dadosQuestao) return;

      const editando = questaoEmEdicaoId !== null;
      const url = editando
        ? "/api/admin/questoes/" + questaoEmEdicaoId
        : "/api/admin/questoes";
      const method = editando ? "PUT" : "POST";

      try {
        const response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + obterToken(),
          },
          body: JSON.stringify(dadosQuestao),
        });

        const data = await response.json();

        if (!response.ok) {
          mostrarToast(
            data.message ||
              (editando ? "Erro ao atualizar questão." : "Erro ao criar questão."),
            "erro",
          );
          return;
        }

        mostrarToast(
          editando
            ? "Questão atualizada com sucesso!"
            : "Questão criada com sucesso!",
          "sucesso",
        );

        limparFormularioQuestao();
        carregarQuestoes();
      } catch (error) {
        console.error(error);
        mostrarToast(
          editando
            ? "Erro de conexão ao atualizar questão."
            : "Erro de conexão ao criar questão.",
          "erro",
        );
      }
    });
  }

  function obterDadosFormularioQuestao() {
    const enunciado = document.getElementById("q-enunciado").value.trim();
    const modulo = document.getElementById("q-modulo").value;
    const grupo = document.getElementById("q-grupo").value.trim();
    const numero = document.getElementById("q-numero").value;
    const dificuldade = document.getElementById("q-dificuldade").value;
    const alternativaA = document.getElementById("q-alt-a").value.trim();
    const alternativaB = document.getElementById("q-alt-b").value.trim();
    const alternativaC = document.getElementById("q-alt-c").value.trim();
    const alternativaD = document.getElementById("q-alt-d").value.trim();
    const correta = document.querySelector('input[name="correta"]:checked');

    if (!enunciado || !modulo || !grupo || !numero || !dificuldade) {
      mostrarToast(
        "Preencha enunciado, módulo, grupo, número e dificuldade.",
        "erro",
      );
      return null;
    }

    if (!alternativaA || !alternativaB || !alternativaC || !alternativaD) {
      mostrarToast("Preencha todas as alternativas.", "erro");
      return null;
    }

    if (!correta) {
      mostrarToast("Marque qual alternativa é a correta.", "erro");
      return null;
    }

    return {
      id_modulo: Number(modulo),
      grupo: grupo,
      numero: Number(numero),
      dificuldade: Number(dificuldade),
      enunciado: enunciado,
      alternativa_a: alternativaA,
      alternativa_b: alternativaB,
      alternativa_c: alternativaC,
      alternativa_d: alternativaD,
      alternativa_correta: correta.value,
    };
  }

  function preencherFormularioQuestao(questao) {
    document.getElementById("q-enunciado").value = questao.enunciado || "";
    document.getElementById("q-modulo").value = questao.id_modulo || "";
    document.getElementById("q-grupo").value = questao.grupo || "";
    document.getElementById("q-numero").value = questao.numero || "";
    document.getElementById("q-dificuldade").value = normalizarDificuldade(
      questao.dificuldade,
    );
    document.getElementById("q-alt-a").value = questao.alternativa_a || "";
    document.getElementById("q-alt-b").value = questao.alternativa_b || "";
    document.getElementById("q-alt-c").value = questao.alternativa_c || "";
    document.getElementById("q-alt-d").value = questao.alternativa_d || "";

    const correta = String(questao.alternativa_correta || "").toLowerCase();
    const radioCorreta = document.querySelector(
      'input[name="correta"][value="' + correta + '"]',
    );
    if (radioCorreta) radioCorreta.checked = true;
  }

  function normalizarDificuldade(dificuldade) {
    const valor = String(dificuldade || "").toLowerCase();
    if (valor === "fácil" || valor === "facil") return "1";
    if (valor === "média" || valor === "media") return "2";
    if (valor === "difícil" || valor === "dificil") return "3";
    return valor;
  }

  function entrarModoEdicaoQuestao(idQuestao, questao) {
    questaoEmEdicaoId = idQuestao;
    preencherFormularioQuestao(questao);
    if (btnSalvarQuestao) btnSalvarQuestao.textContent = "Salvar questão";
    if (formWrapper) formWrapper.hidden = false;
    formNovaQuestao.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function sairModoEdicaoQuestao() {
    questaoEmEdicaoId = null;
    if (btnSalvarQuestao) btnSalvarQuestao.textContent = "Salvar questão";
  }

  function limparFormularioQuestao() {
    sairModoEdicaoQuestao();
    if (formNovaQuestao) formNovaQuestao.reset();
    if (formWrapper) formWrapper.hidden = true;
  }

  // ── Botão "Novo módulo" ────────────────────────────────────────────
  const btnNovoNivel = document.getElementById("btn-novo-nivel");
  if (btnNovoNivel) {
    btnNovoNivel.addEventListener("click", async function () {
      const titulo = prompt("Informe o título do módulo:");

      if (titulo === null) return;

      const tituloLimpo = titulo.trim();

      if (!tituloLimpo) {
        mostrarToast("Informe o título do módulo.", "erro");
        return;
      }

      try {
        const response = await fetch("/api/admin/niveis", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + obterToken(),
          },
          body: JSON.stringify({ titulo: tituloLimpo }),
        });

        const data = await response.json();

        if (!response.ok) {
          mostrarToast(data.message || "Erro ao criar módulo.", "erro");
          return;
        }

        mostrarToast("Módulo criado com sucesso!", "sucesso");
        carregarNiveis();
      } catch (error) {
        console.error(error);
        mostrarToast("Erro de conexão ao criar módulo.", "erro");
      }
    });
  }

  // ── Stub: popula tabela de questões com dados de exemplo ─────────
  async function carregarQuestoes() {
    const tbody = document.getElementById("questoes-tbody");
    const vazio = document.getElementById("questoes-vazio");

    if (!tbody) return;

    try {
      const token = obterToken();

      const response = await fetch("/api/admin/questoes", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao carregar questões");
      }

      const questoes = await response.json();

      if (!questoes.length) {
        tbody.innerHTML = "";
        if (vazio) vazio.hidden = false;
        return;
      }

      if (vazio) vazio.hidden = true;

      tbody.innerHTML = questoes
        .map(function (q) {
          const trecho =
            q.enunciado.length > 55
              ? q.enunciado.slice(0, 55) + "…"
              : q.enunciado;

          return `
                <tr>
                    <td>${q.id_questao}</td>
                    <td>${trecho}</td>
                    <td>Módulo ${q.id_modulo}</td>
                    <td>${q.grupo}</td>
                    <td>
                        <div class="config-tabela-acoes">
                            <button class="btn-tabela btn-tabela--editar"
                                onclick="editarQuestao(${q.id_questao})">
                                Editar
                            </button>

                            <button class="btn-tabela btn-tabela--excluir"
                                onclick="excluirQuestao(${q.id_questao})">
                                Excluir
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        })
        .join("");
    } catch (error) {
      console.error(error);

      tbody.innerHTML = "";

      if (vazio) {
        vazio.hidden = false;
        vazio.textContent = "Erro ao carregar questões.";
      }

      mostrarToast("Erro ao carregar questões.", "erro");
    }
  }
  // ── Popula tabela de módulos ───────────────────────────────────────
  async function carregarNiveis() {
    const tbody = document.getElementById("niveis-tbody");
    const vazio = document.getElementById("niveis-vazio");
    if (!tbody) return;

    try {
      const token = obterToken();

      const response = await fetch("/api/admin/niveis", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao carregar módulos");
      }

      const niveis = await response.json();

      if (!niveis.length) {
        tbody.innerHTML = "";
        if (vazio) {
          vazio.hidden = false;
          vazio.textContent = "Nenhum módulo cadastrado.";
        }
        return;
      }

      if (vazio) vazio.hidden = true;

      tbody.innerHTML = niveis
        .map(function (n) {
          return `
                <tr>
                    <td>${n.id_modulo}</td>
                    <td>${escapeHtml(n.titulo)}</td>
                    <td>${n.id_modulo}</td>
                    <td>
                        <div class="config-tabela-acoes">
                            <button class="btn-tabela btn-tabela--editar"
                                    onclick="editarNivel(${n.id_modulo})">Editar</button>
                            <button class="btn-tabela btn-tabela--excluir"
                                    onclick="excluirNivel(${n.id_modulo})">Excluir</button>
                        </div>
                    </td>
                </tr>
            `;
        })
        .join("");
    } catch (error) {
      console.error(error);

      tbody.innerHTML = "";

      if (vazio) {
        vazio.hidden = false;
        vazio.textContent = "Erro ao carregar módulos.";
      }

      mostrarToast("Erro ao carregar módulos.", "erro");
    }
  }

  // ── Modal: Gerenciar Progresso ────────────────────────────────────
  function configurarModalProgresso() {
    const btnAbrir = document.getElementById("btn-gerenciar-progresso");
    const modal = document.getElementById("modal-progresso");
    const btnFechar = document.getElementById("btn-fechar-modal-progresso");

    if (!btnAbrir || !modal) return;

    btnAbrir.addEventListener("click", function () {
      modal.hidden = false;
      carregarProgressoUsuarios();
    });

    btnFechar.addEventListener("click", function () {
      modal.hidden = true;
    });

    modal.addEventListener("click", function (e) {
      if (e.target === modal) modal.hidden = true;
    });
  }

  function carregarProgressoUsuarios() {
    const tbody = document.getElementById("usuarios-progresso-tbody");
    if (!tbody) return;
    tbody.innerHTML =
      '<tr><td colspan="5" style="text-align:center;padding:20px;color:var(--navy-400)">Carregando...</td></tr>';

    const token = obterToken();
    fetch("/api/admin/usuarios-progresso", {
      headers: { Authorization: "Bearer " + token },
    })
      .then(function (r) {
        return r.json();
      })
      .then(function (usuarios) {
        if (!usuarios.length) {
          tbody.innerHTML =
            '<tr><td colspan="5" style="text-align:center;padding:20px;color:var(--navy-400)">Nenhum aluno cadastrado.</td></tr>';
          return;
        }
        tbody.innerHTML = usuarios
          .map(function (u) {
            const modulo = u.id_modulo ? "Módulo " + u.id_modulo : "—";
            const tentativas = u.id_exame
              ? u.tentativas_modulo_atual + " / 2"
              : "—";
            return (
              "<tr>" +
              "<td>" +
              escapeHtml(u.nome) +
              "</td>" +
              '<td style="font-size:12px;color:var(--navy-300)">' +
              escapeHtml(u.email) +
              "</td>" +
              "<td>" +
              modulo +
              "</td>" +
              "<td>" +
              tentativas +
              "</td>" +
              "<td>" +
              '<div class="config-tabela-acoes">' +
              (u.id_exame
                ? '<button class="btn-tabela btn-tabela--editar" onclick="zerarModulo(' +
                  u.id_usuario +
                  ", '" +
                  escapeHtml(u.nome) +
                  "')\">Zerar módulo</button>" +
                  '<button class="btn-tabela btn-tabela--excluir" onclick="reiniciarUsuario(' +
                  u.id_usuario +
                  ", '" +
                  escapeHtml(u.nome) +
                  "')\">Módulo 1</button>"
                : '<span style="font-size:12px;color:var(--navy-400)">Sem exame</span>') +
              '<button class="btn-tabela ' +
              (u.is_admin ? "btn-tabela--excluir" : "btn-tabela--editar") +
              '" onclick="toggleAdmin(' +
              u.id_usuario +
              ", '" +
              escapeHtml(u.nome) +
              "', " +
              u.is_admin +
              ')">' +
              (u.is_admin ? "Remover admin" : "Tornar admin") +
              "</button>" +
              '<button class="btn-tabela btn-tabela--excluir" onclick="excluirUsuario(' +
              u.id_usuario +
              ", '" +
              escapeHtml(u.nome) +
              '\')" style="background:rgba(239,68,68,0.15);border-color:rgba(239,68,68,0.4);color:#f87171">Excluir</button>' +
              "</div>" +
              "</td>" +
              "</tr>"
            );
          })
          .join("");
      })
      .catch(function () {
        tbody.innerHTML =
          '<tr><td colspan="5" style="text-align:center;padding:20px;color:var(--red-400)">Erro ao carregar.</td></tr>';
      });
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  window.zerarModulo = function (idUsuario, nome) {
    if (
      !confirm(
        'Zerar tentativas do módulo atual de "' +
          nome +
          '"?\n\nIsso apaga as respostas do módulo atual e permite que o aluno recomece a partir da tentativa 1.',
      )
    )
      return;
    const token = obterToken();
    fetch("/api/admin/usuarios/" + idUsuario + "/zerar-modulo", {
      method: "PATCH",
      headers: { Authorization: "Bearer " + token },
    })
      .then(function (r) {
        return r.json().then(function (d) {
          return { ok: r.ok, data: d };
        });
      })
      .then(function (res) {
        mostrarToast(
          res.ok
            ? res.data.message
            : res.data.message || "Erro ao zerar módulo.",
          res.ok ? "sucesso" : "erro",
        );
        if (res.ok) carregarProgressoUsuarios();
      })
      .catch(function () {
        mostrarToast("Erro de conexão.", "erro");
      });
  };

  window.reiniciarUsuario = function (idUsuario, nome) {
    if (
      !confirm(
        'Reiniciar "' +
          nome +
          '" para o Módulo 1?\n\nIsso apaga TODAS as respostas e o histórico de provas do aluno. Esta ação não pode ser desfeita.',
      )
    )
      return;
    const token = obterToken();
    fetch("/api/admin/usuarios/" + idUsuario + "/reiniciar", {
      method: "PATCH",
      headers: { Authorization: "Bearer " + token },
    })
      .then(function (r) {
        return r.json().then(function (d) {
          return { ok: r.ok, data: d };
        });
      })
      .then(function (res) {
        mostrarToast(
          res.ok ? res.data.message : res.data.message || "Erro ao reiniciar.",
          res.ok ? "sucesso" : "erro",
        );
        if (res.ok) carregarProgressoUsuarios();
      })
      .catch(function () {
        mostrarToast("Erro de conexão.", "erro");
      });
  };

  window.excluirUsuario = function (idUsuario, nome) {
    if (
      !confirm(
        'Excluir "' +
          nome +
          '"?\n\nIsso remove permanentemente o usuário e todo o seu histórico. Esta ação não pode ser desfeita.',
      )
    )
      return;
    const token = obterToken();
    fetch("/api/admin/usuarios/" + idUsuario, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    })
      .then(function (r) {
        return r.json().then(function (d) {
          return { ok: r.ok, data: d };
        });
      })
      .then(function (res) {
        mostrarToast(
          res.ok ? res.data.message : res.data.message || "Erro ao excluir.",
          res.ok ? "sucesso" : "erro",
        );
        if (res.ok) carregarProgressoUsuarios();
      })
      .catch(function () {
        mostrarToast("Erro de conexão.", "erro");
      });
  };

  window.toggleAdmin = function (idUsuario, nome, isAdmin) {
    const acao = isAdmin ? "remover admin de" : "tornar admin";
    if (!confirm('Deseja ' + acao + ' "' + nome + '"?')) return;
    const token = obterToken();
    fetch("/api/admin/usuarios/" + idUsuario + "/toggle-admin", {
      method: "PATCH",
      headers: { Authorization: "Bearer " + token },
    })
      .then(function (r) {
        return r.json().then(function (d) {
          return { ok: r.ok, data: d };
        });
      })
      .then(function (res) {
        mostrarToast(
          res.ok ? res.data.message : res.data.message || "Erro ao alterar admin.",
          res.ok ? "sucesso" : "erro",
        );
        if (res.ok) carregarProgressoUsuarios();
      })
      .catch(function () {
        mostrarToast("Erro de conexão.", "erro");
      });
  };

  // ── Ações das tabelas (expostas no escopo global pelo onclick) ────
  window.editarQuestao = async function (idQuestao) {
    try {
      const response = await fetch("/api/admin/questoes/" + idQuestao, {
        headers: {
          Authorization: "Bearer " + obterToken(),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        mostrarToast(data.message || "Erro ao buscar questão.", "erro");
        return;
      }

      entrarModoEdicaoQuestao(idQuestao, data);
    } catch (error) {
      console.error(error);
      mostrarToast("Erro de conexão ao buscar questão.", "erro");
    }
  };
  window.excluirQuestao = async function (idQuestao) {
    if (!confirm("Deseja excluir esta questão?")) return;

    try {
      const response = await fetch("/api/admin/questoes/" + idQuestao, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + obterToken(),
        },
      });

      const data = await response.json();

      if (!response.ok) {
        mostrarToast(data.message || "Erro ao excluir questão.", "erro");
        return;
      }

      if (questaoEmEdicaoId === idQuestao) {
        limparFormularioQuestao();
      }

      mostrarToast(data.message || "Questão excluída com sucesso!", "sucesso");
      carregarQuestoes();
    } catch (error) {
      console.error(error);
      mostrarToast("Erro de conexão ao excluir questão.", "erro");
    }
  };
  window.editarNivel = function () {
    mostrarToast("Edição de módulo: em desenvolvimento (T17)", "erro");
  };
  window.excluirNivel = function () {
    mostrarToast("Exclusão de módulo: em desenvolvimento (T17)", "erro");
  };

  // ── Toast de feedback ─────────────────────────────────────────────
  function mostrarToast(mensagem, tipo) {
    const toast = document.getElementById("config-toast");
    const msg = document.getElementById("config-toast-msg");
    if (!toast || !msg) return;

    msg.textContent = mensagem;
    toast.className = "config-toast config-toast--" + tipo;
    toast.hidden = false;

    clearTimeout(toast._timer);
    toast._timer = setTimeout(function () {
      toast.hidden = true;
    }, 3000);
  }

  // ── Logout ────────────────────────────────────────────────────────
  const btnSair = document.getElementById("btn-sair");
  if (btnSair) {
    btnSair.addEventListener("click", function () {
      limparSessao();
      window.location.href = "index.html";
    });
  }
})();
