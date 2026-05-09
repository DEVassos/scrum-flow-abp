// ================================
// GERENCIADOR DE QUESTÕES
// ================================

class GerenciadorQuestoes {
    constructor() {
        this.questaoAtual = null;
        this.idExame = null;
        this.idModulo = null;
        this.totalQuestoes = 0;
        this.tentativaAtual = 1;
        this.selecionada = null;

        this.inicializar();
    }

    inicializar() {
        this.verificarAutenticacao();
        this.carregarParametros();
        this.carregarQuestoes();
        this.configurarEventos();
        this.renderizarQuestao();
    }

    verificarAutenticacao() {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = 'index.html';
        }

        const usuario = localStorage.getItem('usuario');
        if (usuario) {
            const saudacao = document.getElementById('saudacao');
            if (saudacao) {
                const nome = JSON.parse(usuario).nome || 'Usuário';
                saudacao.textContent = `Bem-vindo, ${nome.split(' ')[0]}`;
            }
        }
    }

    carregarParametros() {
        // Os parâmetros são obtidos do banco de dados, não da URL
        const params = new URLSearchParams(window.location.search);
        this.tentativaAtual = params.get('tentativa') || 1;
    }

    async carregarQuestoes() {
        try {
            const token = localStorage.getItem('token');
            
            // Buscar próxima questão da API
            const response = await fetch('/api/questoes/proxima-questao', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                if (response.status === 404) {
                    // Nenhuma questão pendente
                    this.totalQuestoes = 0;
                    this.questoes = [];
                    this.respostas = [];
                    console.log('Nenhuma questão pendente encontrada');
                    return;
                }
                throw new Error('Erro ao buscar questão');
            }

            const primeiraQuestao = await response.json();
            
            // Armazenar informações do exame
            this.idExame = primeiraQuestao.id_exame;
            this.idModulo = primeiraQuestao.id_modulo;
            
            // Criar objeto de questão formatado
            this.questaoAtual = {
                id_questao: primeiraQuestao.id_questao,
                numero: primeiraQuestao.numero,
                enunciado: primeiraQuestao.enunciado,
                imagem: primeiraQuestao.imagem,
                alternativaA: primeiraQuestao.alternativa_a,
                alternativaB: primeiraQuestao.alternativa_b,
                alternativaC: primeiraQuestao.alternativa_c,
                alternativaD: primeiraQuestao.alternativa_d,
                alternativaCorreta: primeiraQuestao.alternativa_correta
            };

            this.totalQuestoes = 1; // Será atualizado conforme navegar
            this.respostas = [];

            console.log('Questão carregada com sucesso:', this.questaoAtual);
        } catch (error) {
            console.error('Erro ao carregar questão:', error);
            alert('Erro ao carregar questão. Tente novamente.');
        }
    }

    configurarEventos() {
        // Botões de navegação
        document.getElementById('btn-anterior')?.addEventListener('click', () => this.questaoAnterior());
        document.getElementById('btn-proxima')?.addEventListener('click', () => this.proximaQuestao());
        document.getElementById('btn-voltar')?.addEventListener('click', () => this.voltarAoMaterial());

        // Opções de resposta
        document.querySelectorAll('.opcao-item').forEach(opcao => {
            opcao.addEventListener('click', (e) => this.selecionarOpcao(e));
        });

        // Modal de confirmação
        document.getElementById('btn-cancelar-modal')?.addEventListener('click', () => this.fecharModal());
        document.getElementById('btn-confirmar-modal')?.addEventListener('click', () => this.confirmarResposta());

        // Modal de resultado
        document.getElementById('btn-continuar-modal')?.addEventListener('click', () => this.proximaQuestao());

        // Botão sair
        document.getElementById('btn-sair')?.addEventListener('click', () => this.sair());
    }

    renderizarQuestao() {
        if (!this.questaoAtual) {
            console.error('Nenhuma questão para renderizar');
            alert('Nenhuma questão disponível. Você pode ter concluído o módulo!');
            window.location.href = 'dashboard.html';
            return;
        }

        const questao = this.questaoAtual;

        // Atualizar header
        const nivelInfo = this.obterNivelInfo(this.idModulo);
        document.getElementById('nivel-info').textContent = nivelInfo;
        document.getElementById('tentativa-info').textContent = `Tentativa ${this.tentativaAtual}/3`;

        // Atualizar número da questão
        document.getElementById('questao-numero').textContent = 
            `Questão ${questao.numero || 1}`;

        // Atualizar conteúdo da questão
        document.getElementById('questao-titulo').textContent = questao.enunciado || 'Questão sem enunciado';
        document.getElementById('questao-descricao').textContent = 'Escolha a alternativa correta:';

        // Renderizar opções (A, B, C, D)
        const containerOpcoes = document.querySelector('.questao-opcoes');
        containerOpcoes.innerHTML = '';

        const opcoes = [
            { letra: 'A', texto: questao.alternativaA },
            { letra: 'B', texto: questao.alternativaB },
            { letra: 'C', texto: questao.alternativaC },
            { letra: 'D', texto: questao.alternativaD }
        ];

        opcoes.forEach((opcao, index) => {
            const div = document.createElement('div');
            div.className = 'opcao-item';
            div.setAttribute('data-opcao', opcao.letra);
            div.setAttribute('data-index', index);

            // Verificar se essa opção já foi selecionada
            if (this.selecionada === opcao.letra) {
                div.classList.add('selecionada');
            }

            div.innerHTML = `
                <div class="opcao-header">
                    <span class="opcao-letra">${opcao.letra}</span>
                    <span class="opcao-id">#${100 + index + 1}</span>
                </div>
                <p class="opcao-texto">${opcao.texto || 'Alternativa sem texto'}</p>
            `;

            div.addEventListener('click', (e) => this.selecionarOpcao(e));
            containerOpcoes.appendChild(div);
        });

        // Atualizar botões de navegação
        const btnAnterior = document.getElementById('btn-anterior');
        const btnProxima = document.getElementById('btn-proxima');

        btnAnterior.disabled = true; // Desabilitar por enquanto
        btnProxima.textContent = 'Próxima →';

        // Atualizar indicador de progresso
        this.renderizarProgresso();
    }

    renderizarProgresso() {
        const container = document.getElementById('progresso-dots');
        container.innerHTML = '';

        // Mostrar apenas 1 dot pela questão atual
        const dot = document.createElement('div');
        dot.className = 'progresso-dot ativo';
        container.appendChild(dot);
    }

    selecionarOpcao(e) {
        const opcaoItem = e.currentTarget.closest('.opcao-item');
        if (!opcaoItem) return;

        // Remover seleção anterior
        document.querySelectorAll('.opcao-item.selecionada').forEach(item => {
            item.classList.remove('selecionada');
        });

        // Selecionar nova opção
        opcaoItem.classList.add('selecionada');
        this.selecionada = opcaoItem.getAttribute('data-opcao');

        // Mostrar modal de confirmação
        this.mostrarModalConfirmacao();
    }

    mostrarModalConfirmacao() {
        const modal = document.getElementById('modal-confirmacao');
        const mensagem = document.getElementById('modal-mensagem');
        mensagem.textContent = `Você selecionou a alternativa ${this.selecionada}. Tem certeza que deseja confirmar?`;
        modal.style.display = 'flex';
    }

    fecharModal() {
        document.getElementById('modal-confirmacao').style.display = 'none';
        document.querySelectorAll('.opcao-item.selecionada').forEach(item => {
            item.classList.remove('selecionada');
        });
        this.selecionada = null;
    }

    confirmarResposta() {
        if (!this.selecionada) return;

        this.enviarResposta(this.selecionada);
    }

    async enviarResposta(respostaLetra) {
        try {
            const token = localStorage.getItem('token');

            // Enviar resposta para a API
            const response = await fetch('/api/questoes/responder', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id_exame: this.idExame,
                    id_questao: this.questaoAtual.id_questao,
                    resposta: respostaLetra.toLowerCase()
                })
            });

            if (!response.ok) {
                if (response.status === 409) {
                    alert('Questão já respondida!');
                } else {
                    throw new Error('Erro ao enviar resposta');
                }
                document.getElementById('modal-confirmacao').style.display = 'none';
                return;
            }

            const respostaGravada = await response.json();
            
            // Fechar modal de confirmação
            document.getElementById('modal-confirmacao').style.display = 'none';

            // Verificar se está correta
            const estaCorreta = respostaGravada.nota === 1;

            // Mostrar resultado
            this.mostrarResultado(estaCorreta);
        } catch (error) {
            console.error('Erro ao enviar resposta:', error);
            alert('Erro ao enviar resposta. Tente novamente.');
            document.getElementById('modal-confirmacao').style.display = 'none';
        }
    }

    mostrarResultado(estaCorreta) {
        const modal = document.getElementById('modal-resultado');
        const icon = document.getElementById('resultado-icon');
        const titulo = document.getElementById('resultado-titulo');
        const mensagem = document.getElementById('resultado-mensagem');

        icon.className = 'resultado-icon ' + (estaCorreta ? 'acerto' : 'erro');
        titulo.textContent = estaCorreta ? 'Parabéns! 🎉' : 'Resposta Incorreta';
        mensagem.textContent = estaCorreta 
            ? 'Você acertou! Continue assim!' 
            : 'Essa não era a resposta correta. Tente novamente na próxima!';

        modal.style.display = 'flex';
    }

    fecharModalResultado() {
        document.getElementById('modal-resultado').style.display = 'none';
    }

    async proximaQuestao() {
        try {
            const token = localStorage.getItem('token');

            // Buscar próxima questão da API
            const response = await fetch('/api/questoes/proxima-questao', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                if (response.status === 404) {
                    // Nenhuma questão pendente - exame concluído
                    this.finalizarAvaliacao();
                    return;
                }
                throw new Error('Erro ao buscar próxima questão');
            }

            const proximaQuestao = await response.json();

            // Atualizar questão atual
            this.questaoAtual = {
                id_questao: proximaQuestao.id_questao,
                numero: proximaQuestao.numero,
                enunciado: proximaQuestao.enunciado,
                imagem: proximaQuestao.imagem,
                alternativaA: proximaQuestao.alternativa_a,
                alternativaB: proximaQuestao.alternativa_b,
                alternativaC: proximaQuestao.alternativa_c,
                alternativaD: proximaQuestao.alternativa_d,
                alternativaCorreta: proximaQuestao.alternativa_correta
            };

            this.selecionada = null;

            // Fechar modal de resultado
            this.fecharModalResultado();

            // Renderizar nova questão
            this.renderizarQuestao();
        } catch (error) {
            console.error('Erro ao carregar próxima questão:', error);
            alert('Erro ao carregar próxima questão. Tente novamente.');
        }
    }

    questaoAnterior() {
        alert('Não é possível voltar para a questão anterior.');
    }

    irParaQuestao(index) {
        alert('Não é possível pular questões.');
    }

    obterNivelInfo(idModulo) {
        // Este será mapeado conforme seus módulos
        const niveis = {
            1: 'Nível 1 - Introdução ao Scrum',
            2: 'Nível 2 - Papéis e Responsabilidades',
            3: 'Nível 3 - Cerimônias',
            4: 'Nível 4 - Prácticas Avançadas'
        };
        return niveis[idModulo] || `Módulo ${idModulo}`;
    }

    finalizarAvaliacao() {
        // Redirecionar para dashboard indicando conclusão
        alert('Parabéns! Você completou todas as questões do módulo!');
        window.location.href = 'dashboard.html';
    }

    voltarAoMaterial() {
        if (confirm('Tem certeza que deseja sair da avaliação? O progresso não será salvo.')) {
            window.location.href = 'dashboard.html';
        }
    }

    sair() {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        window.location.href = 'index.html';
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new GerenciadorQuestoes();
});
