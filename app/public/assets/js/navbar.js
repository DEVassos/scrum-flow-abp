(function () {
  function estaEmSubpasta() {
    const partes = window.location.pathname.split("/");
    return ["modulo-1", "modulo-2", "modulo-3", "exame"].some(function (pasta) {
      return partes.includes(pasta);
    });
  }

  function hrefRaiz(arquivo) {
    return estaEmSubpasta() ? "../" + arquivo : arquivo;
  }

  function textoSeguro(valor) {
    return String(valor || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function obterPayloadToken() {
    try {
      return JSON.parse(atob(obterToken().split(".")[1]));
    } catch {
      return {};
    }
  }

  function obterIniciais(nome) {
    const partes = String(nome || "Usuario")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2);

    return partes.map(function (parte) {
      return parte.charAt(0).toUpperCase();
    }).join("") || "U";
  }

  function configurarMenuUsuario(container) {
    if (!container || container.dataset.profileMenu === "true") return;

    const nome = obterNome() || "Usuário";
    const payload = obterPayloadToken();
    const perfil = payload.perfil === "admin" ? "Administrador" : "Estudante";
    const email = payload.email || "Conta Scrum Flow";
    const iniciais = obterIniciais(nome);
    const dashboardHref =
      document.querySelector("#nav-dashboard a")?.getAttribute("href") ||
      hrefRaiz("dashboard.html");

    container.dataset.profileMenu = "true";
    container.innerHTML = `
      <div class="profile-menu">
        <button
          type="button"
          class="profile-menu__trigger"
          aria-label="Abrir menu do usuário"
          aria-expanded="false"
        >
          <span class="profile-menu__avatar" aria-hidden="true">${textoSeguro(iniciais)}</span>
          <span class="profile-menu__chevron" aria-hidden="true"></span>
        </button>

        <div class="profile-menu__panel" hidden>
          <div class="profile-menu__header">
            <div class="profile-menu__avatar-wrap">
              <span class="profile-menu__avatar profile-menu__avatar--large" aria-hidden="true">${textoSeguro(iniciais)}</span>
              <span class="profile-menu__status" aria-hidden="true"></span>
            </div>
            <div class="profile-menu__identity">
              <strong>${textoSeguro(nome)}</strong>
              <span class="profile-menu__role">${textoSeguro(perfil)}</span>
              <span class="profile-menu__email">${textoSeguro(email)}</span>
            </div>
            <span class="profile-menu__level" data-profile-level aria-label="Nível atual">Nível 0</span>
          </div>

          <div class="profile-menu__items">
            <a class="profile-menu__item" href="${dashboardHref}">
              <span class="profile-menu__icon profile-menu__icon--grid" aria-hidden="true"></span>
              <span class="profile-menu__text">
                <strong>Dashboard</strong>
                <small>Visão geral do sistema</small>
              </span>
              <span class="profile-menu__arrow" aria-hidden="true"></span>
            </a>

            <a class="profile-menu__item" href="${hrefRaiz("configuracoes.html")}">
              <span class="profile-menu__icon profile-menu__icon--gear" aria-hidden="true"></span>
              <span class="profile-menu__text">
                <strong>Configurações</strong>
                <small>Ajustes da sua conta</small>
              </span>
              <span class="profile-menu__arrow" aria-hidden="true"></span>
            </a>
          </div>

          <button class="profile-menu__item profile-menu__item--logout" type="button" data-logout>
            <span class="profile-menu__icon profile-menu__icon--logout" aria-hidden="true"></span>
            <span class="profile-menu__text">
              <strong>Sair</strong>
              <small>Encerrar sua sessão</small>
            </span>
          </button>
        </div>
      </div>
    `;

    const trigger = container.querySelector(".profile-menu__trigger");
    const panel = container.querySelector(".profile-menu__panel");
    const logout = container.querySelector("[data-logout]");
    const level = container.querySelector("[data-profile-level]");

    function fecharMenu() {
      panel.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
    }

    trigger.addEventListener("click", function () {
      const deveAbrir = panel.hidden;
      panel.hidden = !deveAbrir;
      trigger.setAttribute("aria-expanded", String(deveAbrir));
    });

    document.addEventListener("click", function (event) {
      if (!container.contains(event.target)) fecharMenu();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") fecharMenu();
    });

    logout.addEventListener("click", function () {
      limparSessao();
      window.location.href = hrefRaiz("index.html");
    });

    atualizarNivelConcluido(level);
  }

  async function atualizarNivelConcluido(elemento) {
    if (!elemento || !obterToken()) return;

    try {
      const resposta = await fetch("/api/questoes/modulos", {
        headers: { Authorization: `Bearer ${obterToken()}` },
      });

      if (!resposta.ok) return;

      const modulos = await resposta.json();
      const concluidos = modulos.filter(function (modulo) {
        return Boolean(modulo.aprovado);
      }).length;

      elemento.textContent = "Nível " + concluidos;
      elemento.setAttribute(
        "aria-label",
        concluidos + " nível" + (concluidos === 1 ? "" : "s") + " concluído" + (concluidos === 1 ? "" : "s"),
      );
    } catch {
      elemento.textContent = "Nível 0";
    }
  }

  const paginaAtual = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-link").forEach(function (link) {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (href && paginaAtual === href.split("/").pop()) {
      link.classList.add("active");
    }
  });

  const linkDashboard = document.getElementById("nav-dashboard");
  if (linkDashboard) {
    linkDashboard.style.display = estaAutenticado() ? "" : "none";
  }

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

  const navDeslogado = document.getElementById("nav-deslogado");
  const navLogado = document.getElementById("nav-logado");

  if (!navDeslogado || !navLogado) {
    if (estaAutenticado()) {
      configurarMenuUsuario(document.querySelector(".navbar__actions"));
    }
    return;
  }

  if (estaAutenticado()) {
    navDeslogado.hidden = true;
    navLogado.hidden = false;
    configurarMenuUsuario(navLogado);
  } else {
    navDeslogado.hidden = false;
    navLogado.hidden = true;
  }
})();
