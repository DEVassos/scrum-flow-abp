// ================================
//   MODULOS.JS — ScrumFlow
// ================================

if (!estaAutenticado()) {
    window.location.href = "index.html";
}

const nome = obterNome();
const saudacao = document.getElementById("nav-saudacao");

if (saudacao) {
    saudacao.textContent = `Olá, ${nome}`;
}

const btnSair = document.getElementById("btn-sair");

if (btnSair) {
    btnSair.addEventListener("click", function () {
        limparSessao();
        window.location.href = "index.html";
    });
}

// ================================
//   DADOS SIMULADOS DOS MÓDULOS
// ================================

const modulos = [
    {
        id: 1,
        titulo: "Módulo 1",
        nome: "Fundamentos das Metodologias Ágeis",
        foco: "A origem da agilidade e a mudança de mentalidade.",
        status: "disponivel",
        progresso: 0,
        tentativasUsadas: 0,
        tentativasMaximas: 2,
        aprovado: false,
        cards: [
            {
                tag: "Contexto",
                titulo: "A Crise do Software",
                texto: "Na década de 60/70, os projetos de software ficaram grandes e difíceis de adaptar. O modelo cascata era rígido e muitas vezes entregava produtos que já não atendiam mais ao cliente."
            },
            {
                tag: "Exemplo",
                titulo: "Mudança de cenário",
                texto: "Um aplicativo planejado em 2019 poderia ficar ultrapassado em 2021 se não permitisse mudanças no caminho. A agilidade ajuda justamente nesse tipo de adaptação."
            },
            {
                tag: "Base Ágil",
                titulo: "Manifesto Ágil",
                texto: "Valoriza indivíduos e interações, software funcionando, colaboração com o cliente e resposta a mudanças."
            },
            {
                tag: "Pilares",
                titulo: "Empirismo",
                texto: "O Scrum se apoia em transparência, inspeção e adaptação para melhorar continuamente o trabalho."
            }
        ]
    },
    {
        id: 2,
        titulo: "Módulo 2",
        nome: "Scrum: Estrutura, Papéis e Artefatos",
        foco: "As responsabilidades e os objetos que geram transparência.",
        status: "bloqueado",
        progresso: 0,
        tentativasUsadas: 0,
        tentativasMaximas: 2,
        aprovado: false,
        cards: [
            {
                tag: "Papel",
                titulo: "Product Owner",
                texto: "Representa os interesses do cliente e organiza o Product Backlog, priorizando o que gera mais valor para o produto."
            },
            {
                tag: "Papel",
                titulo: "Scrum Master",
                texto: "Facilita o uso do Scrum, remove impedimentos e ajuda o time a trabalhar de forma produtiva e saudável."
            },
            {
                tag: "Qualidade",
                titulo: "Definition of Done",
                texto: "Define quando uma entrega pode ser considerada realmente pronta, incluindo critérios como código testado, revisado e aprovado."
            },
            {
                tag: "Entrega",
                titulo: "Incremento",
                texto: "É a entrega funcional gerada pelo time ao final de uma Sprint, seguindo a Definition of Done."
            }
        ]
    },
    {
        id: 3,
        titulo: "Módulo 3",
        nome: "Eventos do Scrum e Fluxo de Trabalho",
        foco: "O ritmo e as cerimônias de inspeção.",
        status: "bloqueado",
        progresso: 0,
        tentativasUsadas: 0,
        tentativasMaximas: 2,
        aprovado: false,
        cards: [
            {
                tag: "Evento",
                titulo: "Sprint",
                texto: "É o ciclo principal do Scrum, com duração limitada e foco em alcançar um objetivo definido."
            },
            {
                tag: "Evento",
                titulo: "Daily Scrum",
                texto: "Reunião curta, de até 15 minutos, usada pelos Developers para planejar o trabalho das próximas 24 horas."
            },
            {
                tag: "Melhoria",
                titulo: "Sprint Retrospective",
                texto: "Momento em que o time analisa o que funcionou, o que não funcionou e como melhorar na próxima Sprint."
            },
            {
                tag: "Fluxo",
                titulo: "Inspeção contínua",
                texto: "Os eventos do Scrum ajudam o time a verificar o andamento do trabalho e adaptar o plano quando necessário."
            }
        ]
    },
    {
        id: 4,
        titulo: "Módulo 4",
        nome: "Práticas Ágeis, Métricas e Qualidade",
        foco: "Ferramentas de gestão técnica e visibilidade de progresso.",
        status: "bloqueado",
        progresso: 0,
        tentativasUsadas: 0,
        tentativasMaximas: 2,
        aprovado: false,
        cards: [
            {
                tag: "Qualidade",
                titulo: "Dívida Técnica",
                texto: "Acontece quando o time escolhe uma solução rápida, sabendo que precisará corrigir ou melhorar depois."
            },
            {
                tag: "Métrica",
                titulo: "Gráfico Burn-down",
                texto: "Mostra a quantidade de trabalho restante ao longo da Sprint, ajudando o time a perceber se está dentro do ritmo esperado."
            },
            {
                tag: "Backlog",
                titulo: "Refinamento",
                texto: "É a prática de quebrar itens grandes em partes menores e mais claras, para que possam caber em uma Sprint."
            },
            {
                tag: "Exemplo",
                titulo: "Sistema de Login",
                texto: "Um item grande como 'Sistema de Login' pode ser dividido em login com e-mail, login com Google e recuperação de senha."
            }
        ]
    },
    {
        id: 5,
        titulo: "Módulo 5",
        nome: "Aplicação Prática, Cenários e Análise Crítica",
        foco: "Comportamento do time e resolução de problemas reais.",
        status: "bloqueado",
        progresso: 0,
        tentativasUsadas: 0,
        tentativasMaximas: 2,
        aprovado: false,
        cards: [
            {
                tag: "Adaptação",
                titulo: "Mudanças de Escopo",
                texto: "Em vez de resistir às mudanças, o time ágil reorganiza prioridades e responde ao novo cenário."
            },
            {
                tag: "Maturidade",
                titulo: "Scrum Zumbi",
                texto: "Acontece quando o time faz cerimônias do Scrum, mas sem transparência, autonomia ou melhoria real."
            },
            {
                tag: "Autogestão",
                titulo: "Time Maduro",
                texto: "Um time maduro identifica problemas e se mobiliza para resolvê-los sem depender de ordens constantes."
            },
            {
                tag: "Risco",
                titulo: "Falta de Feedback",
                texto: "Sem ouvir o cliente ou usuário, o time pode construir algo tecnicamente bom, mas sem utilidade real."
            }
        ]
    }
];

let moduloSelecionado = modulos[0];

// ================================
//   ELEMENTOS DA TELA
// ================================

const itensSidebar = document.querySelectorAll(".modulo-item");
const painelBadge = document.querySelector(".painel-badge");
const painelTitulo = document.querySelector(".painel-titulo");
const painelDescricao = document.querySelector(".painel-descricao");
const painelTentativas = document.querySelector(".painel-tentativas strong");
const painelCards = document.querySelector(".painel-cards");
const botoesAcao = document.querySelector(".painel-acoes");

// ================================
//   FUNÇÕES DE TELA
// ================================

function atualizarTela(modulo) {
    moduloSelecionado = modulo;

    painelBadge.className = "painel-badge";

    if (modulo.status === "disponivel") {
        painelBadge.classList.add("painel-badge--disponivel");
    }

    if (modulo.status === "em_andamento") {
        painelBadge.classList.add("painel-badge--andamento");
    }

    if (modulo.status === "concluido") {
        painelBadge.classList.add("painel-badge--concluido");
    }

    if (modulo.status === "bloqueado") {
        painelBadge.classList.add("painel-badge--bloqueado");
    }

    painelBadge.textContent = formatarStatus(modulo.status);

    painelTitulo.textContent = modulo.nome;

    painelDescricao.textContent = gerarDescricao(modulo);

    painelTentativas.textContent =
        `${modulo.tentativasUsadas} / ${modulo.tentativasMaximas}`;

    renderizarCards(modulo);

    atualizarSidebar();

    atualizarBotoes(modulo);
}

function renderizarCards(modulo) {
    painelCards.innerHTML = "";

    modulo.cards.forEach(function (card) {
        painelCards.innerHTML += `
            <div class="painel-card">
                <span class="painel-card-tag">${card.tag}</span>
                <h3 class="painel-card-titulo">${card.titulo}</h3>
                <p class="painel-card-texto">${card.texto}</p>
            </div>
        `;
    });
}

function atualizarSidebar() {
    itensSidebar.forEach(function (item, index) {
        const modulo = modulos[index];

        item.classList.remove("modulo-item--ativo");
        item.disabled = modulo.status === "bloqueado";

        const titulo = item.querySelector(".modulo-item-titulo");
        const status = item.querySelector(".modulo-item-status");

        titulo.textContent = modulo.titulo;
        status.textContent = formatarStatus(modulo.status);

        if (modulo.id === moduloSelecionado.id) {
            item.classList.add("modulo-item--ativo");
        }
    });
}

function atualizarBotoes(modulo) {
    botoesAcao.innerHTML = "";

    if (modulo.status === "bloqueado") {
        botoesAcao.innerHTML = `
            <button class="btn btn-ghost" disabled>Conclua o módulo anterior</button>
        `;
        return;
    }

    if (modulo.status === "concluido") {
        botoesAcao.innerHTML = `
            <button class="btn btn-primary" disabled>Módulo concluído</button>
        `;
        return;
    }

    botoesAcao.innerHTML = `
        <button class="btn btn-primary" id="btn-aprovar">Simular aprovação</button>
        <button class="btn btn-ghost" id="btn-reprovar">Simular reprovação</button>
    `;

    document.getElementById("btn-aprovar").addEventListener("click", aprovarModulo);
    document.getElementById("btn-reprovar").addEventListener("click", reprovarModulo);
}

// ================================
//   REGRAS DE PROGRESSÃO
// ================================

function aprovarModulo() {
    moduloSelecionado.aprovado = true;
    moduloSelecionado.status = "concluido";
    moduloSelecionado.progresso = 100;

    const proximoModulo = modulos.find(function (modulo) {
        return modulo.id === moduloSelecionado.id + 1;
    });

    if (proximoModulo && proximoModulo.status === "bloqueado") {
        proximoModulo.status = "disponivel";
    }

    atualizarTela(moduloSelecionado);
}

function reprovarModulo() {
    moduloSelecionado.tentativasUsadas++;

    if (moduloSelecionado.tentativasUsadas >= moduloSelecionado.tentativasMaximas) {
        reiniciarModulo(moduloSelecionado);
        alert("Você usou as 2 tentativas. O módulo será reiniciado do zero.");
    } else {
        moduloSelecionado.status = "em_andamento";
        moduloSelecionado.progresso = 50;
    }

    atualizarTela(moduloSelecionado);
}

function reiniciarModulo(modulo) {
    modulo.status = "disponivel";
    modulo.progresso = 0;
    modulo.tentativasUsadas = 0;
    modulo.aprovado = false;
}

// ================================
//   TEXTOS AUXILIARES
// ================================

function formatarStatus(status) {
    const statusFormatado = {
        bloqueado: "Bloqueado",
        disponivel: "Disponível",
        em_andamento: "Em andamento",
        concluido: "Concluído"
    };

    return statusFormatado[status] || status;
}

function gerarDescricao(modulo) {
    if (modulo.status === "bloqueado") {
        return "Este módulo ainda está bloqueado. Para acessá-lo, conclua a avaliação do módulo anterior.";
    }

    if (modulo.status === "concluido") {
        return "Módulo concluído com sucesso. O próximo módulo foi liberado para continuar sua jornada.";
    }

    return `${modulo.foco} Estude o conteúdo deste módulo e realize a avaliação correspondente. O módulo só será considerado concluído após aprovação.`;
}

// ================================
//   EVENTOS
// ================================

itensSidebar.forEach(function (item, index) {
    item.addEventListener("click", function () {
        const modulo = modulos[index];

        if (modulo.status === "bloqueado") {
            return;
        }

        atualizarTela(modulo);
    });
});

// ================================
//   INICIALIZAÇÃO
// ================================

atualizarTela(moduloSelecionado);