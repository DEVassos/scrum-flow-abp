// ================================
//   QUESTOES.JS
//   Controla o fluxo de perguntas do exame:
//   carregar, exibir, selecionar, confirmar e avançar.
// ================================

// Estado da sessão de exame — guardam os dados da questão atual e do progresso
let questaoAtual = null;
let idExame      = null;
let idModulo     = null;
let tentativaAtual = 1;
let opcaoSelecionada = null;
let acertos = 0;
let totalRespondidas = 0;

// Guarda a função a executar quando o usuário confirmar o modal
let aoConfirmar = null;

// ================================
//   INICIALIZAÇÃO
// ================================

document.addEventListener('DOMContentLoaded', () => {
    verificarAutenticacao();
    configurarEventos();
    carregarProximaQuestao();
});

// Redireciona para o login se o usuário não estiver autenticado,
// e exibe o nome de boas-vindas no navbar.
function verificarAutenticacao() {
    if (!estaAutenticado()) {
        window.location.href = '../index.html';
        return;
    }

    const nome = obterNome();
    const saudacao = document.getElementById('saudacao');
    if (saudacao && nome) {
        saudacao.textContent = `Bem-vindo, ${nome.split(' ')[0]}`;
    }
}

// Conecta cada botão da página à sua função correspondente
function configurarEventos() {
    document.getElementById('btn-voltar')?.addEventListener('click', voltarAoMaterial);
    document.getElementById('btn-proxima')?.addEventListener('click', proximaQuestao);
    document.getElementById('btn-cancelar-modal')?.addEventListener('click', fecharModalConfirmacao);
    document.getElementById('btn-confirmar-modal')?.addEventListener('click', executarConfirmacao);
    document.getElementById('btn-continuar-modal')?.addEventListener('click', proximaQuestao);
    document.getElementById('btn-sair')?.addEventListener('click', sair);
}

// ================================
//   CARREGAMENTO E EXIBIÇÃO
// ================================

// Busca a próxima questão do servidor e chama a renderização
async function carregarProximaQuestao() {
    try {
        const response = await fetch('/api/questoes/proxima-questao', {
            headers: { 'Authorization': `Bearer ${obterToken()}` }
        });

        // 404 significa que não há mais questões — o módulo acabou
        if (response.status === 404) {
            finalizarModulo();
            return;
        }

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const questao = await response.json();

        // Atualiza o estado com os dados da questão recebida
        idExame          = questao.id_exame;
        idModulo         = questao.id_modulo;
        tentativaAtual   = questao.tentativa || 1;
        opcaoSelecionada = null;

        questaoAtual = {
            id_questao:   questao.id_questao,
            numero:       questao.numero,
            enunciado:    questao.enunciado,
            imagem:       questao.imagem,
            alternativaA: questao.alternativa_a,
            alternativaB: questao.alternativa_b,
            alternativaC: questao.alternativa_c,
            alternativaD: questao.alternativa_d
        };

        renderizarQuestao();
    } catch (error) {
        console.error('Erro ao carregar questão:', error);
        alert('Erro ao carregar questão. Tente novamente.');
    }
}

// Preenche o card de questão com os dados recebidos do servidor
function renderizarQuestao() {
    if (!questaoAtual) return;

    document.getElementById('nivel-info').textContent    = obterNivelInfo(idModulo);
    document.getElementById('tentativa-info').textContent = `Tentativa ${tentativaAtual}/2`;
    document.getElementById('questao-numero').textContent = `Questão ${questaoAtual.numero || 1}`;
    document.getElementById('questao-titulo').textContent = questaoAtual.enunciado || '';
    document.getElementById('questao-descricao').textContent = 'Escolha a alternativa correta:';

    // Limpa as opções anteriores antes de montar as novas
    const container = document.querySelector('.questao-opcoes');
    container.innerHTML = '';

    const opcoes = [
        { letra: 'A', texto: questaoAtual.alternativaA },
        { letra: 'B', texto: questaoAtual.alternativaB },
        { letra: 'C', texto: questaoAtual.alternativaC },
        { letra: 'D', texto: questaoAtual.alternativaD }
    ];

    opcoes.forEach((opcao, index) => {
        const div = document.createElement('div');
        div.className = 'opcao-item';
        div.dataset.opcao = opcao.letra;
        div.innerHTML = `
            <div class="opcao-header">
                <span class="opcao-letra">${opcao.letra}</span>
                <span class="opcao-id">#${100 + index + 1}</span>
            </div>
            <p class="opcao-texto">${opcao.texto || ''}</p>
        `;
        div.addEventListener('click', () => selecionarOpcao(opcao.letra));
        container.appendChild(div);
    });
}

// ================================
//   SELEÇÃO E CONFIRMAÇÃO
// ================================

// Marca visualmente a opção clicada e abre o modal para confirmar
function selecionarOpcao(letra) {
    opcaoSelecionada = letra;

    document.querySelectorAll('.opcao-item').forEach(item => {
        item.classList.toggle('selecionada', item.dataset.opcao === letra);
    });

    abrirModalConfirmacao(
        'Confirmar Resposta',
        `Você selecionou a alternativa ${letra}. Confirma?`,
        () => enviarResposta(letra)
    );
}

// Abre o modal de confirmação com título, mensagem e ação personalizados.
// A função 'callback' será executada quando o usuário clicar em Confirmar.
function abrirModalConfirmacao(titulo, mensagem, callback) {
    document.getElementById('modal-titulo').textContent   = titulo;
    document.getElementById('modal-mensagem').textContent = mensagem;
    aoConfirmar = callback;
    document.getElementById('modal-confirmacao').style.display = 'flex';
}

// Fecha o modal e limpa a seleção caso o usuário cancele
function fecharModalConfirmacao() {
    aoConfirmar = null;
    document.getElementById('modal-confirmacao').style.display = 'none';
    document.querySelectorAll('.opcao-item').forEach(item => item.classList.remove('selecionada'));
    opcaoSelecionada = null;
}

// Executa a ação guardada em aoConfirmar (resposta ou navegação)
function executarConfirmacao() {
    document.getElementById('modal-confirmacao').style.display = 'none';
    if (aoConfirmar) {
        aoConfirmar();
        aoConfirmar = null;
    }
}

// ================================
//   ENVIO E RESULTADO
// ================================

// Envia a resposta escolhida para o servidor e exibe o resultado
async function enviarResposta(letra) {
    try {
        const response = await fetch('/api/questoes/responder', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${obterToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id_exame:   idExame,
                id_questao: questaoAtual.id_questao,
                resposta:   letra.toLowerCase()
            })
        });

        // 409 significa que essa questão já foi respondida — avança direto
        if (response.status === 409) {
            await carregarProximaQuestao();
            return;
        }

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const resultado = await response.json();
        const estaCorreta = resultado.nota === 1;

        totalRespondidas++;
        if (estaCorreta) acertos++;

        mostrarResultado(estaCorreta);
    } catch (error) {
        console.error('Erro ao enviar resposta:', error);
        alert('Erro ao enviar resposta. Tente novamente.');
    }
}

// Exibe o modal de resultado com ícone e mensagem de acerto ou erro
function mostrarResultado(estaCorreta) {
    document.getElementById('resultado-icon').className = 'resultado-icon ' + (estaCorreta ? 'acerto' : 'erro');
    document.getElementById('resultado-titulo').textContent  = estaCorreta ? 'Parabéns!' : 'Resposta Incorreta';
    document.getElementById('resultado-mensagem').textContent = estaCorreta
        ? 'Você acertou! Continue assim!'
        : 'Essa não era a resposta correta.';

    document.getElementById('modal-resultado').style.display = 'flex';
}

// Fecha o modal de resultado e carrega a próxima questão
async function proximaQuestao() {
    document.getElementById('modal-resultado').style.display = 'none';
    await carregarProximaQuestao();
}

// ================================
//   FINALIZAÇÃO
// ================================

// Salva o resultado do módulo no sessionStorage e redireciona para a tela de resultado
function finalizarModulo() {
    const percentual = totalRespondidas > 0
        ? Math.round((acertos / totalRespondidas) * 100)
        : 0;

    sessionStorage.setItem('resultado_exame', JSON.stringify({
        acertos,
        total:     totalRespondidas,
        percentual,
        modulo:    obterNivelInfo(idModulo),
        data:      new Date().toLocaleDateString('pt-BR'),
        status:    percentual >= 60 ? 'aprovado' : 'reprovado'
    }));

    window.location.href = 'resultado.html';
}

// Retorna o nome do nível com base no id do módulo recebido da API
function obterNivelInfo(idModulo) {
    const niveis = {
        1: 'Nível 1 – Fundamentos',
        2: 'Nível 2 – Papéis e Responsabilidades',
        3: 'Nível 3 – Eventos Scrum',
        4: 'Nível 4 – Artefatos do Scrum',
        5: 'Nível 5 – Escalando o Scrum'
    };
    return niveis[idModulo] || `Módulo ${idModulo}`;
}

// Abre o modal pedindo confirmação antes de sair do exame
function voltarAoMaterial() {
    abrirModalConfirmacao(
        'Sair do exame?',
        'Tem certeza que deseja sair? O progresso das questões já respondidas será mantido.',
        () => { window.location.href = '../dashboard.html'; }
    );
}

// Encerra a sessão do usuário e volta para a tela de login
function sair() {
    limparSessao();
    window.location.href = '../index.html';
}
