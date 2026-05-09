// ================================
//   RESULTADO.JS — Lógica da página de resultado do teste
//   Depende de auth.js (deve ser carregado antes deste script).
// ================================

// ================================
//   MODO DE TESTE — remover antes de integrar com avaliacao.js
//   Para ativar: mude MODO_TESTE para true e ajuste os valores abaixo.
//   Para testar reprovado: mude status para "reprovado" e pontuacao para < 60.
// ================================

const MODO_TESTE = true;

const dadosTeste = {
  nome: "Henrique",
  pontuacao: 30,
  acertos: 2,
  totalQuestoes: 20,
  percentual: 10,
  modulo: "Módulo 1",
  data: "07/05/2026",
  status: "reprovado",   // "aprovado" ou "reprovado"
};

// ================================
//   PROTEÇÃO DE ROTA
// ================================

if (!MODO_TESTE && !estaAutenticado()) {
  window.location.href = "index.html";
}

// ================================
//   POPULAR DADOS
// ================================

function popularResultado(dados) {
  document.getElementById("nome-usuario").textContent = dados.nome;
  document.getElementById("pontuacao").textContent = dados.pontuacao;
  document.getElementById("acertos").textContent = dados.acertos;
  document.getElementById("total-questoes").textContent = dados.totalQuestoes;
  document.getElementById("percentual").textContent = dados.percentual;
  document.getElementById("nome-modulo").textContent = dados.modulo;
  document.getElementById("data-conclusao").textContent = dados.data;

  const badge = document.getElementById("status-badge");
  badge.textContent = dados.status === "aprovado" ? "Aprovado" : "Reprovado";
  badge.classList.remove("status-badge--aprovado", "status-badge--reprovado");
  badge.classList.add(`status-badge--${dados.status}`);

  const pct = dados.percentual + "%";
  document.getElementById("score-ring").style.setProperty("--score-percent", pct);
  document.getElementById("progresso-fill").style.width = pct;
}

if (MODO_TESTE) {
  popularResultado(dadosTeste);
} else {
  const nome = obterNome();
  if (nome) document.getElementById("nome-usuario").textContent = nome;
  // TODO: ler dados do sessionStorage populados por avaliacao.js e chamar popularResultado()
}
