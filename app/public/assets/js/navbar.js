(function () {
  // ── Active link ──────────────────────────────────────────────────────────
  // Remove qualquer classe "active" hardcoded no HTML e aplica no link
  // correspondente à página atual, garantindo o destaque amarelo correto.
  const paginaAtual = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-link").forEach(function (link) {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (href && paginaAtual === href) {
      link.classList.add("active");
    }
  });

  // ── Dashboard link ───────────────────────────────────────────────────────
  // O link para Dashboard só deve aparecer para usuários autenticados.
  const linkDashboard = document.getElementById("nav-dashboard");
  if (linkDashboard) {
    linkDashboard.style.display = estaAutenticado() ? "" : "none";
  }

    // ── Hamburguer ───────────────────────────────────────────────────────────
  // Abre e fecha o menu vertical. Fecha também ao clicar em qualquer link.
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("aberto");
      navMenu.classList.toggle("aberto");
    });

    navMenu.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        hamburger.classList.remove("aberto");
        navMenu.classList.remove("aberto");
      });
    });
  }

  // ── Estado da navbar (logado / deslogado) ────────────────────────────────
  const navDeslogado = document.getElementById("nav-deslogado");
  const navLogado    = document.getElementById("nav-logado");

  if (!navDeslogado || !navLogado) return; // página sem os dois blocos (ex: dashboard)

  if (estaAutenticado()) {
    navDeslogado.hidden = true;
    navLogado.hidden    = false;

    const saudacao = document.getElementById("nav-saudacao");
    if (saudacao) saudacao.textContent = "Olá, " + obterNome();
  } else {
    navDeslogado.hidden = false;
    navLogado.hidden    = true;
  }

  // ── Botão Sair ───────────────────────────────────────────────────────────
  // Trata tanto "btn-sair" (padrão) quanto "btn-sair-index" (index.html),
  // centralizando o comportamento de logout em todas as páginas.
  ["btn-sair", "btn-sair-index"].forEach(function (id) {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener("click", function () {
        limparSessao();
        window.location.href = "index.html";
      });
    }
  });
})();