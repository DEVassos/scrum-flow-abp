// ================================
//   DASHBOARD.JS — Lógica da página do usuário autenticado
//   Depende de auth.js (deve ser carregado antes deste script).
// ================================

// ================================
//   PROTEÇÃO DE ROTA
//   Roda imediatamente ao carregar a página — antes do DOM renderizar.
//   Se o usuário não tiver sessão válida, redireciona para a home/login
//   sem exibir nenhum conteúdo protegido.
// ================================

if (!estaAutenticado()) {
  window.location.href = "index.html";
}

// ================================
//   SAUDAÇÃO PERSONALIZADA
//   Exibe o nome do usuário logado nos dois pontos da UI:
//   - Navbar (#saudacao): "Olá, [nome]"
//   - Hero (#hero-nome): destaque em amber no título principal
// ================================

const nome = obterNome();

document.getElementById("saudacao").textContent = `Olá, ${nome}`;

const heroNome = document.getElementById("hero-nome");
if (heroNome) heroNome.textContent = nome;

// ================================
//   LOGOUT
//   Limpa token e nome do localStorage (via limparSessao de auth.js)
//   e redireciona para a home, que contém o modal de login.
// ================================

document.getElementById("btn-sair").addEventListener("click", function () {
  limparSessao();
  window.location.href = "index.html";
});
