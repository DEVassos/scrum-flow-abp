(function () {
  // Injeta overlay no body
  const overlay = document.createElement("div");
  overlay.id = "modal-overlay";
  overlay.className = "modal-overlay";
  document.body.appendChild(overlay);

  // Injeta HTML do modal no container reservado em cada página
  const modalEl = document.getElementById("modal-login");
  // Desativa transition antes de aplicar a classe para o browser não animar
  // a posição inicial (translateX 0 → 100%) ao inserir o elemento no DOM
  modalEl.style.transition = "none";
  modalEl.className = "modal-lateral";
  void modalEl.offsetWidth; // força reflow: browser confirma posição sem animação
  modalEl.style.transition = "";
  modalEl.innerHTML = `
    <a href="index.html" class="logo">Scrum<span class="flow">Flow</span></a>

    <div id="view-login" class="modal-view">
      <h2 class="modal-titulo">Entrar no time</h2>
      <p class="modal-subtitulo">Bem-vindo de volta! Faça login para continuar.</p>

      <form id="form-login" autocomplete="on">
        <div class="campo-grupo">
          <label class="campo-label" for="cpf">CPF</label>
          <div class="campo-wrapper">
            <span class="campo-icone">&#9679;</span>
            <input type="text" id="cpf" name="username" class="input" placeholder="000.000.000-00" autocomplete="username">
          </div>
          <span class="campo-erro" id="erro-cpf-login"></span>
        </div>

        <div class="campo-grupo">
          <label class="campo-label" for="senha">Senha</label>
          <div class="campo-wrapper">
            <span class="campo-icone">&#9679;</span>
            <input type="password" id="senha" name="password" class="input" placeholder="Digite sua senha" autocomplete="current-password">
            <span class="campo-icone-direita" id="toggle-senha">&#128065;</span>
          </div>
          <span class="campo-erro" id="erro-senha-login"></span>
        </div>

        <button type="submit" class="btn btn-primary btn-full">Entrar no Sprint &rarr;</button>

        <div class="modal-rodape">
          Não tem uma conta? <a href="#" id="link-ir-cadastro" class="link-amber">Criar conta</a>
        </div>
      </form>
    </div>

    <div id="view-cadastro" class="modal-view">
      <h2 class="modal-titulo">Criar conta</h2>
      <p class="modal-subtitulo">Junte-se ao time e comece sua jornada Scrum.</p>

      <form id="form-cadastro" autocomplete="on">
        <div class="campo-grupo">
          <label class="campo-label" for="cad-nome">Nome completo</label>
          <div class="campo-wrapper">
            <span class="campo-icone">&#9679;</span>
            <input type="text" id="cad-nome" name="name" class="input" placeholder="Seu nome completo" autocomplete="name">
          </div>
          <span class="campo-erro" id="erro-nome"></span>
        </div>

        <div class="campo-grupo">
          <label class="campo-label" for="cad-cpf">CPF</label>
          <div class="campo-wrapper">
            <span class="campo-icone">&#9679;</span>
            <input type="text" id="cad-cpf" name="cpf" class="input" placeholder="000.000.000-00" maxlength="14" autocomplete="off">
          </div>
          <span class="campo-erro" id="erro-cpf"></span>
        </div>

        <div class="campo-grupo">
          <label class="campo-label" for="cad-email">E-mail</label>
          <div class="campo-wrapper">
            <span class="campo-icone">&#9993;</span>
            <input type="email" id="cad-email" name="email" class="input" placeholder="seu@email.com" autocomplete="email">
          </div>
          <span class="campo-erro" id="erro-email"></span>
        </div>

        <div class="campo-grupo">
          <label class="campo-label" for="cad-senha">Senha</label>
          <div class="campo-wrapper">
            <span class="campo-icone">&#9679;</span>
            <input type="password" id="cad-senha" name="new-password" class="input" placeholder="Mínimo 8 caracteres" autocomplete="new-password">
            <span class="campo-icone-direita" id="toggle-cad-senha">&#128065;</span>
          </div>
          <span class="campo-erro" id="erro-senha"></span>
        </div>

        <div class="campo-grupo">
          <label class="campo-label" for="cad-confirmar">Confirmar senha</label>
          <div class="campo-wrapper">
            <span class="campo-icone">&#9679;</span>
            <input type="password" id="cad-confirmar" name="confirm-password" class="input" placeholder="Repita a senha" autocomplete="new-password">
            <span class="campo-icone-direita" id="toggle-cad-confirmar">&#128065;</span>
          </div>
          <span class="campo-erro" id="erro-confirmar"></span>
        </div>

        <button type="submit" class="btn btn-primary btn-full">Criar conta &rarr;</button>
        <div class="modal-rodape">
          Já tem conta? <a href="#" id="link-ir-login" class="link-amber">Entrar</a>
        </div>
      </form>
    </div>
  `;

  // ================================
  //   MODAL
  // ================================

  const views = {
    login: document.getElementById("view-login"),
    cadastro: document.getElementById("view-cadastro"),
  };

  function abrirModal(viewInicial = "login") {
    overlay.classList.add("aberto");
    modalEl.classList.add("aberto");
    mostrarView(viewInicial);
  }

  function fecharModal() {
    overlay.classList.remove("aberto");
    modalEl.classList.remove("aberto");
    setTimeout(() => mostrarView("login", false), 300);
  }

  overlay.addEventListener("click", fecharModal);

  // ================================
  //   TROCA DE VIEWS
  // ================================

  function mostrarView(id, direcao = "avancar") {
    Object.values(views).forEach((v) => {
      v.hidden = true;
      v.classList.remove("animando-avancar", "animando-voltar");
    });

    const alvo = views[id];
    alvo.hidden = false;
    modalEl.scrollTop = 0;

    if (direcao) {
      void alvo.offsetWidth;
      alvo.classList.add("animando-" + direcao);
    }
  }

  document.getElementById("link-ir-cadastro").addEventListener("click", function (e) {
    e.preventDefault();
    mostrarView("cadastro", "avancar");
  });

  document.getElementById("link-ir-login").addEventListener("click", function (e) {
    e.preventDefault();
    mostrarView("login", "voltar");
  });

  // ================================
  //   TOGGLE DE SENHA
  // ================================

  function configurarToggleSenha(toggleId, inputId) {
    const toggle = document.getElementById(toggleId);
    const input = document.getElementById(inputId);
    toggle.addEventListener("click", function () {
      input.type = input.type === "password" ? "text" : "password";
    });
  }

  configurarToggleSenha("toggle-senha", "senha");
  configurarToggleSenha("toggle-cad-senha", "cad-senha");
  configurarToggleSenha("toggle-cad-confirmar", "cad-confirmar");

  // ================================
  //   MÁSCARA DE CPF
  // ================================

  document.getElementById("cad-cpf").addEventListener("input", function () {
    let v = this.value.replace(/\D/g, "").slice(0, 11);
    if (v.length > 9) v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
    else if (v.length > 3) v = v.replace(/(\d{3})(\d+)/, "$1.$2");
    this.value = v;
  });

  document.getElementById("cpf").addEventListener("input", function () {
    let v = this.value.replace(/\D/g, "").slice(0, 11);
    if (v.length > 9) v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
    else if (v.length > 3) v = v.replace(/(\d{3})(\d+)/, "$1.$2");
    this.value = v;
  });

  // ================================
  //   VALIDAÇÃO
  // ================================

  function mostrarErro(inputEl, erroEl, msg) {
    inputEl.classList.add("erro");
    erroEl.textContent = msg;
    erroEl.classList.add("visivel");
  }

  function limparErro(inputEl, erroEl) {
    inputEl.classList.remove("erro");
    erroEl.textContent = "";
    erroEl.classList.remove("visivel");
  }

  function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    let soma = 0, resto;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;
    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf[10]);
  }

  function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ================================
  //   VALIDAÇÃO EM TEMPO REAL — CADASTRO
  // ================================

  (function configurarValidacaoTempoReal() {
    const nome      = document.getElementById("cad-nome");
    const cpf       = document.getElementById("cad-cpf");
    const email     = document.getElementById("cad-email");
    const senha     = document.getElementById("cad-senha");
    const confirmar = document.getElementById("cad-confirmar");

    const erros = {
      nome:      document.getElementById("erro-nome"),
      cpf:       document.getElementById("erro-cpf"),
      email:     document.getElementById("erro-email"),
      senha:     document.getElementById("erro-senha"),
      confirmar: document.getElementById("erro-confirmar"),
    };

    nome.addEventListener("input", function () {
      if (!this.value.trim() || this.value.trim().length > 0)
        limparErro(this, erros.nome);
    });

    cpf.addEventListener("input", function () {
      if (!this.value.trim() || validarCPF(this.value))
        limparErro(this, erros.cpf);
    });

    email.addEventListener("input", function () {
      if (!this.value.trim() || validarEmail(this.value.trim()))
        limparErro(this, erros.email);
    });

    senha.addEventListener("input", function () {
      if (!this.value || this.value.length >= 8)
        limparErro(this, erros.senha);
      if (!confirmar.value || confirmar.value === this.value)
        limparErro(confirmar, erros.confirmar);
    });

    confirmar.addEventListener("input", function () {
      if (!this.value || this.value === senha.value)
        limparErro(this, erros.confirmar);
    });
  })();

  // ================================
  //   SUBMIT — CADASTRO
  // ================================

  document.getElementById("form-cadastro").addEventListener("submit", async function (e) {
    e.preventDefault();

    const nome      = document.getElementById("cad-nome");
    const cpf       = document.getElementById("cad-cpf");
    const email     = document.getElementById("cad-email");
    const senha     = document.getElementById("cad-senha");
    const confirmar = document.getElementById("cad-confirmar");

    const erros = {
      nome:      document.getElementById("erro-nome"),
      cpf:       document.getElementById("erro-cpf"),
      email:     document.getElementById("erro-email"),
      senha:     document.getElementById("erro-senha"),
      confirmar: document.getElementById("erro-confirmar"),
    };

    [nome, cpf, email, senha, confirmar].forEach((el, i) => {
      limparErro(el, Object.values(erros)[i]);
    });

    let valido = true;

    if (!nome.value.trim()) {
      mostrarErro(nome, erros.nome, "Nome obrigatório.");
      valido = false;
    }
    if (!validarCPF(cpf.value)) {
      mostrarErro(cpf, erros.cpf, "CPF inválido.");
      valido = false;
    }
    if (!validarEmail(email.value.trim())) {
      mostrarErro(email, erros.email, "E-mail inválido.");
      valido = false;
    }
    if (senha.value.length < 8) {
      mostrarErro(senha, erros.senha, "Senha deve ter no mínimo 8 caracteres.");
      valido = false;
    }
    if (senha.value !== confirmar.value) {
      mostrarErro(confirmar, erros.confirmar, "As senhas não coincidem.");
      valido = false;
    }

    if (!valido) return;

    const btnCadastro = e.target.querySelector('button[type="submit"]');
    const textoOriginal = btnCadastro.innerHTML;
    btnCadastro.innerHTML = "Carregando...";
    btnCadastro.classList.add("btn-loading");

    try {
      const resp = await fetch("/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nome.value.trim(),
          email: email.value.trim(),
          cpf: cpf.value.replace(/\D/g, ""),
          senha: senha.value,
        }),
      });

      const data = await resp.json();

      if (resp.status === 201) {
        mostrarView("login", "voltar");
        e.target.reset();
        return;
      }
      if (resp.status === 409) {
        mostrarErro(cpf, erros.cpf, "CPF ou e-mail já cadastrado.");
        return;
      }
      if (resp.status === 400) {
        mostrarErro(cpf, erros.cpf, data.error || "Dados inválidos.");
        return;
      }
      console.error("Erro inesperado:", data);
    } catch (err) {
      console.error("Falha na requisição:", err);
    } finally {
      btnCadastro.innerHTML = textoOriginal;
      btnCadastro.classList.remove("btn-loading");
    }
  });

  // ================================
  //   SUBMIT — LOGIN
  // ================================

  document.getElementById("form-login").addEventListener("submit", async function (e) {
    e.preventDefault();

    const cpfInput  = document.getElementById("cpf");
    const senhaInput = document.getElementById("senha");
    const erroCpf   = document.getElementById("erro-cpf-login");
    const erroSenha = document.getElementById("erro-senha-login");

    limparErro(cpfInput, erroCpf);
    limparErro(senhaInput, erroSenha);

    const cpfVal  = cpfInput.value.replace(/\D/g, "");
    const senhaVal = senhaInput.value;

    let valido = true;
    if (!validarCPF(cpfVal)) {
      mostrarErro(cpfInput, erroCpf, "CPF inválido.");
      valido = false;
    }
    if (senhaVal.length < 1) {
      mostrarErro(senhaInput, erroSenha, "Senha obrigatória.");
      valido = false;
    }
    if (!valido) return;

    const btnLogin = e.target.querySelector('button[type="submit"]');
    const textoOriginal = btnLogin.innerHTML;
    btnLogin.innerHTML = "Carregando...";
    btnLogin.classList.add("btn-loading");

    try {
      const resp = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cpf: cpfVal, senha: senhaVal }),
      });

      const data = await resp.json();

      if (resp.status === 200) {
        salvarToken(data.token, data.nome);
        window.location.href = "/dashboard.html";
      } else {
        mostrarErro(senhaInput, erroSenha, data.message || "Usuário ou senha incorretos.");
      }
    } catch (err) {
      console.error("Falha no login:", err);
      mostrarErro(senhaInput, erroSenha, "Erro ao conectar com o servidor.");
    } finally {
      btnLogin.innerHTML = textoOriginal;
      btnLogin.classList.remove("btn-loading");
    }
  });

  // Expõe abrirModal globalmente para que cada página possa chamá-la
  window.abrirModal = abrirModal;
})();
