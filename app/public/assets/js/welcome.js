if (!estaAutenticado()) {
  window.location.href = "login.html";
}

const nome = obterNome();

document.getElementById("saudacao").textContent = `Olá, ${nome}`;

const heroNome = document.getElementById("hero-nome");
if (heroNome) heroNome.textContent = nome;

document.getElementById("btn-sair").addEventListener("click", function () {
  limparSessao();
  window.location.href = "login.html";
});
