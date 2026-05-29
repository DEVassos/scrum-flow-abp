// ================================
//   CONFIGURACOES.JS
//   Controla a página de configurações:
//   — redireciona se não autenticado
//   — exibe seção admin quando perfil === 'admin' (campo adicionado em T15)
//   — pré-preenche campos com dados da sessão
//   — valida e envia formulários (stubs — rotas wired em T15/T16/T17)
//   — tabelas de questões e níveis com dados de exemplo
// ================================

(function () {

    // ── Guarda de autenticação ────────────────────────────────────────
    if (!estaAutenticado()) {
        window.location.href = 'index.html';
        return;
    }

    // ── Verifica perfil admin ─────────────────────────────────────────
    // Lê o campo 'perfil' do payload JWT.
    // Quando T15 adicionar esse campo ao token, a seção de admin aparece automaticamente.
    function estaAdmin() {
        const token = obterToken();
        if (!token) return false;
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.perfil === 'admin';
        } catch {
            return false;
        }
    }

    // ── Saudação no navbar ────────────────────────────────────────────
    // navbar.js retorna cedo quando não há #nav-deslogado na página,
    // então preenchemos manualmente aqui.
    const navSaudacao = document.getElementById('nav-saudacao');
    if (navSaudacao) {
        navSaudacao.textContent = 'Olá, ' + (obterNome() || '');
    }

    // ── Pré-preenche campos com dados da sessão ───────────────────────
    const inputNome = document.getElementById('input-nome');
    if (inputNome) {
        inputNome.value = obterNome() || '';
    }

    // ── Exibe seção de admin se aplicável ────────────────────────────
    const secaoAdmin = document.getElementById('secao-admin');
    if (estaAdmin() && secaoAdmin) {
        secaoAdmin.hidden = false;
        carregarQuestoes();
        carregarNiveis();
    }

    // ── Formulário: dados pessoais ────────────────────────────────────
    const formDados = document.getElementById('form-dados');
    if (formDados) {
        formDados.addEventListener('submit', function (e) {
            e.preventDefault();
            const nome  = document.getElementById('input-nome').value.trim();
            const email = document.getElementById('input-email').value.trim();
            const cpf   = document.getElementById('input-cpf').value.trim();

            if (!nome || !email) {
                mostrarToast('Preencha ao menos o nome e o e-mail.', 'erro');
                return;
            }

            // TODO (T15): PATCH /api/usuarios/:id com { nome, email, cpf }
            mostrarToast('Dados salvos com sucesso!', 'sucesso');
        });
    }

    // ── Formulário: senha ─────────────────────────────────────────────
    const formSenha = document.getElementById('form-senha');
    if (formSenha) {
        formSenha.addEventListener('submit', function (e) {
            e.preventDefault();
            const nova      = document.getElementById('input-nova-senha').value;
            const confirmar = document.getElementById('input-confirmar-senha').value;

            if (nova.trim().length < 8) {
                mostrarToast('A senha deve ter no mínimo 8 caracteres.', 'erro');
                return;
            }
            if (nova !== confirmar) {
                mostrarToast('As senhas não coincidem.', 'erro');
                return;
            }

            // TODO (T15): PATCH /api/usuarios/:id/senha com { senha: nova }
            mostrarToast('Senha alterada com sucesso!', 'sucesso');
            formSenha.reset();
        });
    }

    // ── Toggle do formulário de nova questão ─────────────────────────
    const btnNovaQuestao  = document.getElementById('btn-nova-questao');
    const formWrapper     = document.getElementById('form-nova-questao-wrapper');
    const btnCancelar     = document.getElementById('btn-cancelar-questao');
    const formNovaQuestao = document.getElementById('form-nova-questao');

    if (btnNovaQuestao && formWrapper) {
        btnNovaQuestao.addEventListener('click', function () {
            formWrapper.hidden = !formWrapper.hidden;
        });
    }

    if (btnCancelar && formWrapper) {
        btnCancelar.addEventListener('click', function () {
            formWrapper.hidden = true;
            if (formNovaQuestao) formNovaQuestao.reset();
        });
    }

    if (formNovaQuestao) {
        formNovaQuestao.addEventListener('submit', function (e) {
            e.preventDefault();

            const enunciado = document.getElementById('q-enunciado').value.trim();
            const modulo    = document.getElementById('q-modulo').value;
            const correta   = document.querySelector('input[name="correta"]:checked');

            if (!enunciado || !modulo) {
                mostrarToast('Preencha o enunciado e selecione o módulo.', 'erro');
                return;
            }
            if (!correta) {
                mostrarToast('Marque qual alternativa é a correta.', 'erro');
                return;
            }

            // TODO (T16): POST /api/admin/questoes com os dados do form
            mostrarToast('Questão criada! (integração pendente — T16)', 'sucesso');
            formNovaQuestao.reset();
            formWrapper.hidden = true;
        });
    }

    // ── Stub: botão "Novo nível" ──────────────────────────────────────
    const btnNovoNivel = document.getElementById('btn-novo-nivel');
    if (btnNovoNivel) {
        btnNovoNivel.addEventListener('click', function () {
            mostrarToast('Formulário de nível: em desenvolvimento (T17)', 'erro');
        });
    }

    // ── Stub: popula tabela de questões com dados de exemplo ─────────
    function carregarQuestoes() {
        const tbody = document.getElementById('questoes-tbody');
        const vazio = document.getElementById('questoes-vazio');
        if (!tbody) return;

        // Substituir por GET /api/admin/questoes quando T16 estiver pronto
        const questoes = [
            { id: 1, enunciado: 'O que é o Scrum?', modulo: 'Módulo 2', grupo: 'A' },
            { id: 2, enunciado: 'Quais são os pilares do Scrum?', modulo: 'Módulo 1', grupo: 'B' },
            { id: 3, enunciado: 'Qual é o papel do Product Owner?', modulo: 'Módulo 2', grupo: 'A' },
        ];

        if (!questoes.length) {
            if (vazio) vazio.hidden = false;
            return;
        }

        tbody.innerHTML = questoes.map(function (q) {
            const trecho = q.enunciado.length > 55
                ? q.enunciado.slice(0, 55) + '…'
                : q.enunciado;
            return `
                <tr>
                    <td>${q.id}</td>
                    <td>${trecho}</td>
                    <td>${q.modulo}</td>
                    <td>${q.grupo}</td>
                    <td>
                        <div class="config-tabela-acoes">
                            <button class="btn-tabela btn-tabela--editar"
                                    onclick="editarQuestao(${q.id})">Editar</button>
                            <button class="btn-tabela btn-tabela--excluir"
                                    onclick="excluirQuestao(${q.id})">Excluir</button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // ── Stub: popula tabela de níveis com dados de exemplo ────────────
    function carregarNiveis() {
        const tbody = document.getElementById('niveis-tbody');
        const vazio = document.getElementById('niveis-vazio');
        if (!tbody) return;

        // Substituir por GET /api/admin/niveis quando T17 estiver pronto
        const niveis = [
            { id: 1, nome: 'Manifesto Ágil',    ordem: 1 },
            { id: 2, nome: 'Framework Scrum',   ordem: 2 },
        ];

        if (!niveis.length) {
            if (vazio) vazio.hidden = false;
            return;
        }

        tbody.innerHTML = niveis.map(function (n) {
            return `
                <tr>
                    <td>${n.id}</td>
                    <td>${n.nome}</td>
                    <td>${n.ordem}</td>
                    <td>
                        <div class="config-tabela-acoes">
                            <button class="btn-tabela btn-tabela--editar"
                                    onclick="editarNivel(${n.id})">Editar</button>
                            <button class="btn-tabela btn-tabela--excluir"
                                    onclick="excluirNivel(${n.id})">Excluir</button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    // ── Ações das tabelas (expostas no escopo global pelo onclick) ────
    window.editarQuestao  = function () { mostrarToast('Edição de questão: em desenvolvimento (T16)', 'erro'); };
    window.excluirQuestao = function () { mostrarToast('Exclusão de questão: em desenvolvimento (T16)', 'erro'); };
    window.editarNivel    = function () { mostrarToast('Edição de nível: em desenvolvimento (T17)', 'erro'); };
    window.excluirNivel   = function () { mostrarToast('Exclusão de nível: em desenvolvimento (T17)', 'erro'); };

    // ── Toast de feedback ─────────────────────────────────────────────
    function mostrarToast(mensagem, tipo) {
        const toast = document.getElementById('config-toast');
        const msg   = document.getElementById('config-toast-msg');
        if (!toast || !msg) return;

        msg.textContent = mensagem;
        toast.className = 'config-toast config-toast--' + tipo;
        toast.hidden = false;

        clearTimeout(toast._timer);
        toast._timer = setTimeout(function () {
            toast.hidden = true;
        }, 3000);
    }

    // ── Logout ────────────────────────────────────────────────────────
    const btnSair = document.getElementById('btn-sair');
    if (btnSair) {
        btnSair.addEventListener('click', function () {
            limparSessao();
            window.location.href = 'index.html';
        });
    }

})();
