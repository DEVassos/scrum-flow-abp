// ================================
//   DASHBOARD.JS
//   Carrega e renderiza o progresso do usuário autenticado.
//   Depende de auth.js (carregado antes deste script).
// ================================

// Guard de rota: throw é necessário porque window.location.href não para
// a execução do script — sem ele o DOMContentLoaded ainda dispararia.
if (!estaAutenticado()) {
  window.location.href = "index.html";
  throw new Error("não autenticado");
}

// ================================
//   ÍCONES reutilizados na geração dos cards
// ================================

const SVG_CHECK = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/></svg>`;

const SVG_LOCK = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 16 16"><path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"/></svg>`;

// ================================
//   INICIALIZAÇÃO
// ================================

document.addEventListener("DOMContentLoaded", () => {
  // Busca módulos e histórico em paralelo — são independentes entre si
  Promise.all([carregarModulos(), carregarHistorico()]);
});

// ================================
//   MÓDULOS — cards de módulo
// ================================

async function carregarModulos() {
  const container = document.getElementById("niveis-lista");

  try {
    const response = await fetch("/api/questoes/modulos", {
      headers: { Authorization: `Bearer ${obterToken()}` },
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const modulos = await response.json();

    container.innerHTML = modulos.map(gerarCardNivel).join("");

    container.addEventListener("click", (e) => {
      const card = e.target.closest(".nivel-card:not(.nivel-bloqueado)");
      if (!card) return;
      window.location.href = `modulos.html?modulo=${card.dataset.id}`;
    });

    // Atualiza o progresso do certificado depois de ter os dados dos módulos
    atualizarCertificado(modulos);
  } catch (error) {
    console.error("Erro ao carregar módulos:", error);
    container.innerHTML = `<p style="color:var(--slate-400);font-size:13px">Erro ao carregar os módulos. Tente recarregar a página.</p>`;
  }
}

// Determina o status visual de um módulo com base nos campos da API:
//   aprovado      → concluido
//   id_modulo_atual nulo + módulo 1 → disponivel (usuário sem exame ainda)
//   id_modulo === atual → andamento
//   id_modulo >   atual → bloqueado
function classificarModulo(modulo) {
  const id = Number(modulo.id_modulo);
  const idAtual = modulo.id_modulo_atual != null ? Number(modulo.id_modulo_atual) : null;

  if (modulo.aprovado) return "concluido";
  if (idAtual === null) return id === 1 ? "disponivel" : "bloqueado";
  if (id === idAtual) return "andamento";
  if (id > idAtual) return "bloqueado";

  // id < idAtual sem aprovação: esgotou tentativas sem atingir a nota mínima
  return "andamento";
}

// Gera o HTML completo de um card de módulo.
// melhor_nota vem da API como inteiro (qtd. de acertos); convertemos para escala de 0–10.
function gerarCardNivel(modulo) {
  const id = Number(modulo.id_modulo);
  const status = classificarModulo(modulo);
  const questoes = Number(modulo.questoes) || 0;
  const respondidas = Number(modulo.questoes_respondidas_atual) || 0;
  const melhorNota = Number(modulo.melhor_nota) || 0;
  const tentativasUsadas = Number(modulo.tentativas_usadas) || 0;
  const tentativasRestantes = 2 - tentativasUsadas;

  const pct = questoes > 0 ? Math.round((respondidas / questoes) * 100) : 0;

  // Só exibe nota numérica se o usuário tiver ao menos uma tentativa registrada
  const notaFormatada =
    tentativasUsadas > 0 && questoes > 0
      ? ((melhorNota / questoes) * 10).toFixed(1).replace(".", ",")
      : "–";

  // Cada status tem seu próprio conjunto de classes e textos visuais
  const cfg = {
    concluido: {
      cardClass: "nivel-concluido",
      indicadorClass: "nivel-indicador--verde",
      indicadorConteudo: SVG_CHECK,
      badgeHtml: `<span class="nivel-badge nivel-badge--concluido">Concluído</span>`,
      barraClass: "nivel-barra-fill--verde",
      pct: 100,
      statusHtml: `<span class="nivel-status nivel-status--aprovado">✓ Aprovado</span>`,
    },
    andamento: {
      cardClass: "nivel-em-andamento",
      indicadorClass: "nivel-indicador--amber",
      indicadorConteudo: `<span>${id}</span>`,
      badgeHtml: `<span class="nivel-badge nivel-badge--andamento">Em andamento</span>`,
      barraClass: "nivel-barra-fill--amber",
      pct,
      statusHtml: `<span class="nivel-status nivel-status--tentativa">${tentativasRestantes} tentativa${tentativasRestantes !== 1 ? "s" : ""} restante${tentativasRestantes !== 1 ? "s" : ""}</span>`,
    },
    disponivel: {
      cardClass: "nivel-disponivel",
      indicadorClass: "nivel-indicador--amber",
      indicadorConteudo: `<span>${id}</span>`,
      badgeHtml: "",
      barraClass: "nivel-barra-fill--azul",
      pct: 0,
      statusHtml: `<span class="nivel-status nivel-status--tentativa">2 tentativas disponíveis</span>`,
    },
    bloqueado: {
      cardClass: "nivel-bloqueado",
      indicadorClass: "nivel-indicador--lock",
      indicadorConteudo: SVG_LOCK,
      badgeHtml: `<span class="nivel-badge nivel-badge--bloqueado">Bloqueado</span>`,
      barraClass: "",
      pct: 0,
      statusHtml: "",
    },
  }[status];

  const barraFill = cfg.barraClass
    ? `<div class="nivel-barra-fill ${cfg.barraClass}" style="width: ${cfg.pct}%"></div>`
    : `<div class="nivel-barra-fill" style="width: 0%"></div>`;

  return `
    <div class="nivel-card ${cfg.cardClass}" data-id="${id}">
      <div class="nivel-indicador ${cfg.indicadorClass}">
        ${cfg.indicadorConteudo}
      </div>
      <div class="nivel-info">
        <div class="nivel-cabecalho">
          <span class="nivel-nome">Módulo ${id} – ${modulo.titulo}</span>
          ${cfg.badgeHtml}
        </div>
        <div class="nivel-barra-wrapper">
          <div class="nivel-barra">${barraFill}</div>
        </div>
        <div class="nivel-meta">
          <span class="nivel-nota">Melhor Nota: <strong>${notaFormatada}</strong></span>
          ${cfg.statusHtml}
        </div>
      </div>
    </div>
  `;
}

// ================================
//   HISTÓRICO DE TENTATIVAS
// ================================

async function carregarHistorico() {
  const corpo = document.getElementById("historico-corpo");

  try {
    const response = await fetch("/api/questoes/modulos-respondidos", {
      headers: { Authorization: `Bearer ${obterToken()}` },
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const tentativas = await response.json();

    if (tentativas.length === 0) {
      corpo.innerHTML = `<tr><td colspan="3" style="color:var(--slate-400);text-align:center;padding:16px 0">Nenhuma tentativa ainda.</td></tr>`;
      return;
    }

    // mantém apenas a melhor nota por módulo
    var melhores = new Map();
    tentativas.forEach(function(t) {
      var id = Number(t.id_modulo);
      var existente = melhores.get(id);
      if (!existente || Number(t.nota) > Number(existente.nota)) {
        melhores.set(id, t);
      }
    });

    var melhoresList = Array.from(melhores.values())
      .sort(function(a, b) { return Number(a.id_modulo) - Number(b.id_modulo); });

    corpo.innerHTML = melhoresList.map(gerarLinhaHistorico).join("");
  } catch (error) {
    console.error("Erro ao carregar histórico:", error);
    corpo.innerHTML = `<tr><td colspan="3" style="color:var(--slate-400);text-align:center;padding:8px 0">Erro ao carregar.</td></tr>`;
  }
}

// Gera uma linha <tr> do histórico.
// nota vem como inteiro (acertos); convertemos para escala de 0–10.
// Cor: verde ≥ 6,0 | amarelo ≥ 4,0 | vermelho < 4,0
function gerarLinhaHistorico(tentativa) {
  const id = Number(tentativa.id_modulo);
  const questoes = Number(tentativa.questoes) || 0;
  const nota = Number(tentativa.nota) || 0;

  const notaDecimal = questoes > 0 ? (nota / questoes) * 10 : 0;
  const notaFormatada = notaDecimal.toFixed(1).replace(".", ",");

  const corClass =
    notaDecimal >= 6
      ? "pontuacao--verde"
      : notaDecimal >= 4
      ? "pontuacao--amarelo"
      : "pontuacao--vermelho";

  // tentativa.fim é o timestamp da última resposta daquela tentativa
  const data = new Date(tentativa.fim).toLocaleDateString("pt-BR");

  return `
    <tr>
      <td>Módulo ${id}</td>
      <td>${data}</td>
      <td class="pontuacao ${corClass}">${notaFormatada}</td>
    </tr>
  `;
}

// ================================
//   CERTIFICADO
// ================================

// Atualiza o card de certificado: progresso ou botão de acesso quando todos aprovados.
function atualizarCertificado(modulos) {
  const card = document.querySelector(".lateral-card--certificado");
  if (!card) return;

  const concluidos = modulos.filter((m) => m.aprovado).length;
  const todosAprovados = modulos.length > 0 && concluidos === modulos.length;

  const progressoEl = document.getElementById("cert-progresso");
  const lockEl = card.querySelector(".certificado-lock");
  const descricaoEl = card.querySelector(".certificado-descricao");

  if (todosAprovados) {
    card.classList.add("lateral-card--certificado-liberado");
    if (lockEl) lockEl.hidden = true;
    if (descricaoEl) descricaoEl.hidden = true;
    if (progressoEl) progressoEl.hidden = true;

    if (!card.querySelector(".cert-liberado-badge")) {
      const badge = document.createElement("div");
      badge.className = "cert-liberado-badge";
      badge.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/> </svg> Certificado disponível!`;
      const ref = lockEl || descricaoEl || progressoEl;
      ref ? card.insertBefore(badge, ref) : card.appendChild(badge);
    }

    if (!card.querySelector("#btn-ver-certificado")) {
      const btn = document.createElement("button");
      btn.id = "btn-ver-certificado";
      btn.className = "btn btn-primary";
      btn.textContent = "Ver Certificado";
      btn.style.marginTop = "12px";
      btn.addEventListener("click", async () => {
        btn.disabled = true;
        btn.textContent = "Aguarde…";
        try {
          const res = await fetch("/api/certificados", {
            method: "POST",
            headers: { Authorization: `Bearer ${obterToken()}` },
          });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const { hash } = await res.json();
          window.location.href = `certificado.html?hash=${encodeURIComponent(hash)}`;
        } catch {
          btn.disabled = false;
          btn.textContent = "Ver Certificado";
          alert("Erro ao gerar certificado. Tente novamente.");
        }
      });
      card.appendChild(btn);
    }
  } else {
    if (progressoEl) {
      progressoEl.textContent = `Progresso atual: ${concluidos}/${modulos.length} módulos concluídos`;
    }
  }
}
