// ================================
//   NAVBAR — BOTÕES DE AUTENTICAÇÃO
//   abrirModal() é definido e exposto pelo modal-login.js
// ================================

document.getElementById("btn-entrar").addEventListener("click", function (e) {
  e.preventDefault();
  abrirModal("login");
});

document.getElementById("btn-criar-conta").addEventListener("click", function (e) {
  e.preventDefault();
  abrirModal("cadastro");
});

// ================================
//   BOTÃO HERO "COMEÇAR AGORA"
//   Logado → dashboard | Deslogado → modal de cadastro
// ================================

const btnComecarAgora = document.getElementById("btn-comecar-agora");
if (btnComecarAgora) {
  btnComecarAgora.addEventListener("click", function (e) {
    e.preventDefault();
    if (estaAutenticado()) {
      window.location.href = "dashboard.html";
    } else {
      abrirModal("cadastro");
    }
  });
}

// ================================
//   ABERTURA AUTOMÁTICA VIA URL
//   Links externos podem usar ?abrir=cadastro para abrir direto o cadastro.
// ================================

if (new URLSearchParams(window.location.search).get("abrir") === "cadastro") {
  abrirModal("cadastro");
}
