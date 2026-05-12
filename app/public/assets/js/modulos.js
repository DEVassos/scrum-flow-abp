// ================================
//   MODULOS.JS — ScrumFlow
//   Controle da página de módulos
// ================================

// ================================
//   PROTEÇÃO DE ROTA
// ================================

if (!estaAutenticado()) {
    window.location.href = "index.html";
}

// ================================
//   SAUDAÇÃO PERSONALIZADA
// ================================

const nome = obterNome();

const saudacao = document.getElementById("nav-saudacao");

if (saudacao) {
    saudacao.textContent = `Olá, ${nome}`;
}

// ================================
//   LOGOUT
// ================================

const btnSair = document.getElementById("btn-sair");

if (btnSair) {
    btnSair.addEventListener("click", function () {
        limparSessao();
        window.location.href = "index.html";
    });
}

// ================================
//   PLACEHOLDER DOS MÓDULOS
//   Futuramente:
//   - carregar módulos da API
//   - controlar progresso
//   - controlar tentativas
//   - iniciar avaliações
// ================================

console.log("Página de módulos carregada.");