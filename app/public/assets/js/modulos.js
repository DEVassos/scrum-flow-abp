// ================================
//   MODULOS.JS - ScrumFlow
// ================================

if (!estaAutenticado()) {
  window.location.href = "index.html";
}

const MODULOS_CONTEUDO = {
  1: {
    tituloCurto: "Módulo 1",
    foco: "A origem da agilidade e a mudança de mentalidade.",
    materialUrl: "modulo-1/manifesto.html",
    cards: [
      {
        tag: "Contexto",
        titulo: "A Crise do Software",
        texto: "Entenda por que projetos grandes e rígidos abriram espaço para formas de trabalho mais adaptáveis.",
      },
      {
        tag: "Base Ágil",
        titulo: "Manifesto Ágil",
        texto: "Conheça os valores que sustentam colaboração, entrega frequente e resposta a mudanças.",
      },
      {
        tag: "Pilares",
        titulo: "Empirismo",
        texto: "Veja como transparência, inspeção e adaptação orientam a melhoria contínua.",
      },
    ],
  },
  2: {
    tituloCurto: "Módulo 2",
    foco: "As responsabilidades e os artefatos que geram transparência no Scrum.",
    materialUrl: "modulo-2/scrum.html",
    cards: [
      {
        tag: "Papel",
        titulo: "Product Owner",
        texto: "Responsável por maximizar valor e ordenar o Product Backlog.",
      },
      {
        tag: "Papel",
        titulo: "Scrum Master",
        texto: "Facilita o uso do Scrum e ajuda o time a remover impedimentos.",
      },
      {
        tag: "Artefatos",
        titulo: "Backlog e Incremento",
        texto: "Aprenda como os artefatos tornam o trabalho e a entrega visíveis.",
      },
    ],
  },
  3: {
    tituloCurto: "Módulo 3",
    foco: "O ritmo dos eventos Scrum e as cerimônias de inspeção.",
    materialUrl: "modulo-3/eventos.html",
    cards: [
      {
        tag: "Evento",
        titulo: "Sprint",
        texto: "O ciclo principal de trabalho, com objetivo claro e duração limitada.",
      },
      {
        tag: "Evento",
        titulo: "Daily Scrum",
        texto: "Reunião curta para planejar o trabalho das próximas 24 horas.",
      },
      {
        tag: "Melhoria",
        titulo: "Retrospectiva",
        texto: "Momento para aprender com a Sprint e ajustar o próximo ciclo.",
      },
    ],
  },
  4: {
    tituloCurto: "Módulo 4",
    foco: "Práticas ágeis, métricas e qualidade técnica.",
    materialUrl: null,
    cards: [
      {
        tag: "Qualidade",
        titulo: "Dívida Técnica",
        texto: "Reconheça decisões rápidas que exigem correção ou melhoria posterior.",
      },
      {
        tag: "Métrica",
        titulo: "Burn-down",
        texto: "Acompanhe a quantidade de trabalho restante durante uma Sprint.",
      },
      {
        tag: "Backlog",
        titulo: "Refinamento",
        texto: "Quebre itens grandes em partes menores, claras e viáveis.",
      },
    ],
  },
  5: {
    tituloCurto: "Módulo 5",
    foco: "Aplicação prática, cenários reais e análise crítica.",
    materialUrl: null,
    cards: [
      {
        tag: "Adaptação",
        titulo: "Mudanças de Escopo",
        texto: "Reorganize prioridades quando o contexto muda sem perder o foco em valor.",
      },
      {
        tag: "Maturidade",
        titulo: "Scrum Zumbi",
        texto: "Identifique práticas feitas no automático, sem transparência ou melhoria real.",
      },
      {
        tag: "Autogestão",
        titulo: "Time Maduro",
        texto: "Observe como times maduros identificam problemas e agem com autonomia.",
      },
    ],
  },
};

const APROVACAO_PERCENTUAL = 60;
const TENTATIVAS_MAXIMAS = 2;

let modulos = [];
let moduloSelecionado = null;

const saudacao = document.getElementById("nav-saudacao");
const btnSair = document.getElementById("btn-sair");
const sidebarModulos = document.querySelector(".sidebar-modulos");
const painelBadge = document.querySelector(".painel-badge");
const painelTitulo = document.querySelector(".painel-titulo");
const painelDescricao = document.querySelector(".painel-descricao");
const painelTentativas = document.querySelector(".painel-tentativas strong");
const painelCards = document.querySelector(".painel-cards");
const botoesAcao = document.querySelector(".painel-acoes");
const statusValor = document.querySelector(".status-valor");
const statusBarraFill = document.querySelector(".status-barra-fill");
const statusTexto = document.querySelector(".status-texto");

inicializar();

async function inicializar() {
  configurarNavbar();
  await carregarModulos();
}

function configurarNavbar() {
  const nome = obterNome();

  if (saudacao && nome) {
    saudacao.textContent = `Olá, ${nome}`;
  }

  btnSair?.addEventListener("click", () => {
    limparSessao();
    window.location.href = "index.html";
  });
}

async function carregarModulos() {
  try {
    renderizarCarregando();

    const response = await apiFetch("/api/questoes/modulos");
    if (!response) return;

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const dados = await response.json();
    modulos = dados.map(mapearModulo);

    moduloSelecionado =
      modulos.find((modulo) => modulo.status !== "bloqueado") || modulos[0];

    renderizarSidebar();
    atualizarTela(moduloSelecionado);
    atualizarProgressoGeral();
  } catch (error) {
    console.error("Erro ao carregar módulos:", error);
    renderizarErro();
  }
}

function mapearModulo(moduloApi) {
  const id = Number(moduloApi.id_modulo);
  const conteudo = MODULOS_CONTEUDO[id] || {};
  const idModuloAtual = Number(moduloApi.id_modulo_atual) || 1;
  const questoes = Number(moduloApi.questoes) || 0;
  const respondidasAtual = Number(moduloApi.questoes_respondidas_atual) || 0;
  const tentativaAtual = Number(moduloApi.tentativa_atual) || 1;
  const melhorNota = Number(moduloApi.melhor_nota) || 0;
  const aprovado = Boolean(moduloApi.aprovado) || id < idModuloAtual;
  const progresso =
    aprovado || id < idModuloAtual
      ? 100
      : questoes > 0 && id === idModuloAtual
        ? Math.round((respondidasAtual / questoes) * 100)
        : 0;

  return {
    id,
    titulo: conteudo.tituloCurto || `Módulo ${id}`,
    nome: moduloApi.titulo,
    foco: conteudo.foco || "Estude o conteúdo e realize a avaliação do módulo.",
    materialUrl: conteudo.materialUrl,
    cards: conteudo.cards || [],
    status: obterStatusModulo(id, idModuloAtual, aprovado, respondidasAtual),
    progresso,
    questoes,
    questoesRespondidas: id === idModuloAtual ? respondidasAtual : questoes,
    tentativasUsadas: aprovado ? Number(moduloApi.tentativas_usadas) || 1 : tentativaAtual,
    tentativasMaximas: TENTATIVAS_MAXIMAS,
    melhorNota,
    aprovado,
  };
}

function obterStatusModulo(id, idModuloAtual, aprovado, respondidasAtual) {
  if (aprovado || id < idModuloAtual) return "concluido";
  if (id > idModuloAtual) return "bloqueado";
  if (respondidasAtual > 0) return "em_andamento";
  return "disponivel";
}

function renderizarSidebar() {
  sidebarModulos.innerHTML = "";

  modulos.forEach((modulo) => {
    const item = document.createElement("button");
    item.className = `modulo-item modulo-item--${modulo.status}`;
    item.type = "button";
    item.disabled = modulo.status === "bloqueado";
    item.innerHTML = `
      <div class="modulo-item-info">
        <span class="modulo-item-titulo">${escapeHtml(modulo.titulo)}</span>
        <span class="modulo-item-status">${formatarStatus(modulo.status)}</span>
      </div>
    `;

    item.addEventListener("click", () => atualizarTela(modulo));
    sidebarModulos.appendChild(item);
  });
}

function atualizarTela(modulo) {
  if (!modulo) return;

  moduloSelecionado = modulo;
  painelBadge.className = `painel-badge painel-badge--${modulo.status}`;
  painelBadge.textContent = formatarStatus(modulo.status);
  painelTitulo.textContent = modulo.nome;
  painelDescricao.textContent = gerarDescricao(modulo);
  painelTentativas.textContent = `${modulo.tentativasUsadas} / ${modulo.tentativasMaximas}`;

  renderizarCards(modulo);
  atualizarSidebarAtiva();
  atualizarBotoes(modulo);
}

function renderizarCards(modulo) {
  painelCards.innerHTML = "";

  modulo.cards.forEach((card) => {
    const div = document.createElement("div");
    div.className = "painel-card";
    div.innerHTML = `
      <span class="painel-card-tag">${escapeHtml(card.tag)}</span>
      <h3 class="painel-card-titulo">${escapeHtml(card.titulo)}</h3>
      <p class="painel-card-texto">${escapeHtml(card.texto)}</p>
    `;
    painelCards.appendChild(div);
  });

  const avaliacao = document.createElement("div");
  avaliacao.className = "painel-card";
  avaliacao.innerHTML = `
    <span class="painel-card-tag">Avaliação</span>
    <h3 class="painel-card-titulo">Questionário do módulo</h3>
    <p class="painel-card-texto">${escapeHtml(gerarTextoAvaliacao(modulo))}</p>
  `;
  painelCards.appendChild(avaliacao);
}

function atualizarSidebarAtiva() {
  document.querySelectorAll(".modulo-item").forEach((item, index) => {
    const modulo = modulos[index];
    item.className = `modulo-item modulo-item--${modulo.status}`;
    item.classList.toggle("modulo-item--ativo", modulo.id === moduloSelecionado.id);
    item.disabled = modulo.status === "bloqueado";
    item.querySelector(".modulo-item-status").textContent = formatarStatus(modulo.status);
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

  const botaoMaterial = document.createElement("button");
  botaoMaterial.className = "btn btn-ghost";
  botaoMaterial.type = "button";
  botaoMaterial.textContent = modulo.materialUrl ? "Estudar conteúdo" : "Material em breve";
  botaoMaterial.disabled = !modulo.materialUrl;
  botaoMaterial.addEventListener("click", () => {
    window.location.href = modulo.materialUrl;
  });

  const botaoProva = document.createElement("button");
  botaoProva.className = "btn btn-primary";
  botaoProva.type = "button";
  botaoProva.textContent = modulo.status === "concluido" ? "Módulo concluído" : "Iniciar avaliação";
  botaoProva.disabled = modulo.status === "concluido";
  botaoProva.addEventListener("click", () => {
    window.location.href = "exame/questoes.html";
  });

  botoesAcao.append(botaoProva, botaoMaterial);
}

function atualizarProgressoGeral() {
  const concluidos = modulos.filter((modulo) => modulo.status === "concluido").length;
  const percentual = modulos.length
    ? Math.round((concluidos / modulos.length) * 100)
    : 0;

  statusValor.textContent = `${percentual}%`;
  statusBarraFill.style.width = `${percentual}%`;
  statusTexto.textContent =
    concluidos === 0
      ? "Nenhum módulo concluído"
      : `${concluidos} de ${modulos.length} módulos concluídos`;
}

function gerarDescricao(modulo) {
  if (modulo.status === "bloqueado") {
    return "Este módulo ainda está bloqueado. Para acessá-lo, conclua a avaliação do módulo anterior.";
  }

  if (modulo.status === "concluido") {
    return "Módulo concluído com sucesso. Você pode revisar o conteúdo quando quiser.";
  }

  if (modulo.status === "em_andamento") {
    return `${modulo.foco} Você já respondeu ${modulo.questoesRespondidas} de ${modulo.questoes} questões desta tentativa.`;
  }

  return `${modulo.foco} Estude o conteúdo e realize a avaliação correspondente. O módulo é concluído após aprovação.`;
}

function gerarTextoAvaliacao(modulo) {
  if (modulo.status === "bloqueado") {
    return "A avaliação será liberada quando o módulo anterior for concluído.";
  }

  if (modulo.status === "concluido") {
    return `Melhor resultado registrado: ${modulo.melhorNota}/${modulo.questoes} questões.`;
  }

  return `Você precisa atingir pelo menos ${APROVACAO_PERCENTUAL}% para liberar o próximo módulo.`;
}

function renderizarCarregando() {
  painelTitulo.textContent = "Carregando módulos...";
  painelDescricao.textContent = "Buscando seu progresso na plataforma.";
  painelCards.innerHTML = "";
  botoesAcao.innerHTML = "";
}

function renderizarErro() {
  painelBadge.className = "painel-badge painel-badge--bloqueado";
  painelBadge.textContent = "Erro";
  painelTitulo.textContent = "Não foi possível carregar os módulos";
  painelDescricao.textContent = "Atualize a página ou faça login novamente para tentar de novo.";
  painelTentativas.textContent = "-";
  painelCards.innerHTML = "";
  botoesAcao.innerHTML = `
    <button class="btn btn-primary" type="button" id="btn-recarregar">Tentar novamente</button>
  `;
  document.getElementById("btn-recarregar")?.addEventListener("click", carregarModulos);
}

function formatarStatus(status) {
  const statusFormatado = {
    bloqueado: "Bloqueado",
    disponivel: "Disponível",
    em_andamento: "Em andamento",
    concluido: "Concluído",
  };

  return statusFormatado[status] || status;
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}