(function () {
  const scriptAtual = document.currentScript;

  function estaEmSubpasta() {
    return window.location.pathname
      .split("/")
      .some(function (parte) {
        return parte === "exame";
      });
  }

  function hrefPagina(arquivo) {
    return estaEmSubpasta() ? "../" + arquivo : arquivo;
  }

  function srcImagem(arquivo) {
    return new URL("../img/" + arquivo, scriptAtual.src).href;
  }

  const footer = `
    <footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <div class="footer__brand">
            <a href="${hrefPagina("index.html")}" class="footer__logo">Scrum<span class="flow">Flow</span></a>
            <div class="footer__badge">
              <span class="footer__badge-dot"></span>
              Online e Gratuito
            </div>
          </div>

          <div class="footer__desc-col">
            <p class="footer__desc">
              Portal de aprendizado em metodologias &aacute;geis, desenvolvido como
              Projeto ABP do 1&ordm; semestre de 2026 na FATEC Jacare&iacute;.
            </p>
          </div>

          <div>
            <h3 class="footer__col-title">Projeto</h3>
            <ul class="footer__links">
              <li>
                <a
                  href="https://github.com/DEVassos/scrum-flow-abp"
                  target="_blank"
                  rel="noopener"
                >GitHub</a>
              </li>
              <li>
                <a
                  href="http://github.com/DEVassos/scrum-flow-abp/blob/develop/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener"
                >Guia de Contribui&ccedil;&atilde;o</a>
              </li>
              <li>
                <a
                  href="https://github.com/DEVassos/scrum-flow-abp/tree/develop/docs"
                  target="_blank"
                  rel="noopener"
                >Documenta&ccedil;&atilde;o</a>
              </li>
            </ul>
          </div>
        </div>

        <hr class="footer__divider" />

        <div class="footer__inst-bar">
          <div class="footer__fatec">
            <img
              src="${srcImagem("cps-favicon.ico")}"
              alt="Centro Paula Souza"
              class="footer__inst-logo footer__inst-logo--cps"
            />
            <img
              src="${srcImagem("logo_fatec_transparente.png")}"
              alt="Fatec Jacare&iacute;"
              class="footer__inst-logo"
            />
            <img
              src="${srcImagem("logo_dsm_transparente.png")}"
              alt="DSM - Desenvolvimento de Software Multiplataforma"
              class="footer__inst-logo footer__inst-logo--dsm"
            />
            <span class="footer__inst-text">
              FATEC Jacare&iacute; Prof. Francisco Moura &mdash; 1DSM ABP 2026/1
            </span>
          </div>
        </div>

        <hr class="footer__divider" />

        <div class="footer__bottom">
          <p class="footer__copy">
            &copy; 2026 <strong>ScrumFlow</strong> &mdash; DEVassos. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  `;

  scriptAtual.insertAdjacentHTML("beforebegin", footer);
})();
