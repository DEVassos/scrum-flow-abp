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

  // ── Pré-preenche campos com dados da sessão ───────────────────────
  const inputNome = document.getElementById("input-nome");
  if (inputNome) {
    inputNome.value = obterNome() || "";
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
    formDados.addEventListener("submit", function (e) {
      e.preventDefault();
      const nome = document.getElementById("input-nome").value.trim();
      const email = document.getElementById("input-email").value.trim();
      const cpf = document.getElementById("input-cpf").value.trim();

      if (!nome || !email) {
        mostrarToast("Preencha ao menos o nome e o e-mail.", "erro");
        return;
      }

      // TODO (T15): PATCH /api/usuarios/:id com { nome, email, cpf }
      mostrarToast("Dados salvos com sucesso!", "sucesso");
    });
  }

  // ── Formulário: senha ─────────────────────────────────────────────
  const formSenha = document.getElementById("form-senha");
  if (formSenha) {
    formSenha.addEventListener("submit", function (e) {
      e.preventDefault();
      const nova = document.getElementById("input-nova-senha").value;
      const confirmar = document.getElementById("input-confirmar-senha").value;

      if (nova.trim().length < 8) {
        mostrarToast("A senha deve ter no mínimo 8 caracteres.", "erro");
        return;
      }
      if (nova !== confirmar) {
        mostrarToast("As senhas não coincidem.", "erro");
        return;
      }

      // TODO (T15): PATCH /api/usuarios/:id/senha com { senha: nova }
      mostrarToast("Senha alterada com sucesso!", "sucesso");
      formSenha.reset();
    });
  }

  // ── Toggle do formulário de nova questão ─────────────────────────
  const btnNovaQuestao = document.getElementById("btn-nova-questao");
  const formWrapper = document.getElementById("form-nova-questao-wrapper");
  const btnCancelar = document.getElementById("btn-cancelar-questao");
  const formNovaQuestao = document.getElementById("form-nova-questao");

  if (btnNovaQuestao && formWrapper) {
    btnNovaQuestao.addEventListener("click", function () {
      formWrapper.hidden = !formWrapper.hidden;
    });
  }

  if (btnCancelar && formWrapper) {
    btnCancelar.addEventListener("click", function () {
      formWrapper.hidden = true;
      if (formNovaQuestao) formNovaQuestao.reset();
    });
  }

  if (formNovaQuestao) {
    formNovaQuestao.addEventListener("submit", async function (e) {
      e.preventDefault();

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
        return;
      }

      if (!alternativaA || !alternativaB || !alternativaC || !alternativaD) {
        mostrarToast("Preencha todas as alternativas.", "erro");
        return;
      }

      if (!correta) {
        mostrarToast("Marque qual alternativa é a correta.", "erro");
        return;
      }

      const dadosQuestao = {
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

      try {
        const response = await fetch("/api/admin/questoes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + obterToken(),
          },
          body: JSON.stringify(dadosQuestao),
        });

        const data = await response.json();

        if (!response.ok) {
          mostrarToast(data.message || "Erro ao criar questão.", "erro");
          return;
        }

        mostrarToast("Questão criada com sucesso!", "sucesso");

        formNovaQuestao.reset();
        formWrapper.hidden = true;

        carregarQuestoes();
      } catch (error) {
        console.error(error);
        mostrarToast("Erro de conexão ao criar questão.", "erro");
      }
    });
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
            const modulo = u.modulo_titulo
              ? "Módulo " + u.id_modulo + " – " + u.modulo_titulo
              : "—";
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

  // ── Ações das tabelas (expostas no escopo global pelo onclick) ────
  window.editarQuestao = function () {
    mostrarToast("Edição de questão: em desenvolvimento (T16)", "erro");
  };
  window.excluirQuestao = function () {
    mostrarToast("Exclusão de questão: em desenvolvimento (T16)", "erro");
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
