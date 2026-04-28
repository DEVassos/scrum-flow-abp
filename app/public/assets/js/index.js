const btnCriarConta = document.getElementById("btn-criar-conta");
const btnEntrar = document.getElementById("btn-entrar");
const overlay = document.getElementById("modal-overlay");
const modalLogin = document.getElementById("modal-login");

const views = {
  login: document.getElementById("view-login"),
  cadastro: document.getElementById("view-cadastro"),
};



// ================================
//   MODAL
//   Controla abertura/fechamento do painel lateral de login/cadastro.
//   O overlay escurece o fundo e fecha o modal ao ser clicado.
// ================================

function abrirModal(viewInicial = "login") {
  overlay.classList.add("aberto");
  modalLogin.classList.add("aberto");
  mostrarView(viewInicial);
}

function fecharModal() {
  overlay.classList.remove("aberto");
  modalLogin.classList.remove("aberto");
  // Reseta para login após a animação de saída terminar (300ms)
  setTimeout(() => mostrarView("login", false), 300);
}

btnEntrar.addEventListener("click", function (e) {
  e.preventDefault();
  abrirModal("login");
});

btnCriarConta.addEventListener("click", function (e) {
  e.preventDefault();
  abrirModal("cadastro");
});

// Botão hero "Começar agora":
// - logado → vai direto para o dashboard
// - deslogado → abre modal de cadastro
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

overlay.addEventListener("click", fecharModal);

// ================================
//   TROCA DE VIEWS
//   Alterna entre a tela de login e a tela de cadastro dentro do modal.
//   A direção ("avancar" / "voltar") define qual animação CSS é aplicada.
// ================================

function mostrarView(id, direcao = "avancar") {
  Object.values(views).forEach((v) => {
    v.hidden = true;
    v.classList.remove("animando-avancar", "animando-voltar");
  });

  const alvo = views[id];
  alvo.hidden = false;
  modalLogin.scrollTop = 0;

  if (direcao) {
    // Força reflow para garantir que a animação reinicie corretamente
    void alvo.offsetWidth;
    alvo.classList.add("animando-" + direcao);
  }
}

document.getElementById("link-ir-cadastro").addEventListener("click", function (e) {
  e.preventDefault();
  mostrarView("cadastro", "avancar");
});

document.getElementById('link-ir-login').addEventListener('click', function (e) {
  e.preventDefault();
  mostrarView('login', 'voltar');
});

// ================================
//   TOGGLE DE SENHA
//   Alterna visibilidade do campo de senha entre "password" e "text".
//   Aplicado ao login e aos dois campos de senha do cadastro.
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
//   Formata o input em tempo real para o padrão 000.000.000-00.
//   Remove não-dígitos antes de formatar para evitar conflitos com ctrl+delete.
// ================================

document.getElementById("cad-cpf").addEventListener("input", function () {
  let v = this.value.replace(/\D/g, "").slice(0, 11);
  if (v.length > 9)
    v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
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
//   Helpers para exibir e limpar mensagens de erro inline nos campos.
//   A classe "erro" aplica a borda vermelha definida no CSS de validação.
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

// Validação do dígito verificador do CPF (algoritmo oficial da Receita Federal)
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
//   ABERTURA AUTOMÁTICA VIA URL
//   Permite que links externos abram direto o modal de cadastro
//   usando a query string ?abrir=cadastro (ex: após clicar em CTA externo).
// ================================

if (new URLSearchParams(window.location.search).get("abrir") === "cadastro") {
  abrirModal("cadastro");
}

// ================================
//   SUBMIT — CADASTRO
//   Fluxo: validação client-side → POST /api/usuarios → volta para login.
//   Em caso de CPF/e-mail duplicado (409), exibe erro inline no campo CPF.
// ================================

document.getElementById("form-cadastro").addEventListener("submit", async function (e) {
  e.preventDefault();

  const nome = document.getElementById("cad-nome");
  const cpf = document.getElementById("cad-cpf");
  const email = document.getElementById("cad-email");
  const senha = document.getElementById("cad-senha");
  const confirmar = document.getElementById("cad-confirmar");

  const erros = {
    nome: document.getElementById("erro-nome"),
    cpf: document.getElementById("erro-cpf"),
    email: document.getElementById("erro-email"),
    senha: document.getElementById("erro-senha"),
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
      // Cadastro realizado: volta para login e limpa o formulário
      mostrarView('login', 'voltar');
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
  }
});

// ================================
//   SUBMIT — LOGIN
//   Fluxo: validação client-side → POST /api/auth/login → salva token
//   no localStorage via auth.js → redireciona para /dashboard.html.
//   Erros de autenticação são exibidos inline (sem alert nativo).
// ================================

document.getElementById("form-login").addEventListener("submit", async function (e) {
  e.preventDefault();

  const cpfInput = document.getElementById("cpf");
  const senhaInput = document.getElementById("senha");
  const erroCpf = document.getElementById("erro-cpf-login");
  const erroSenha = document.getElementById("erro-senha-login");

  limparErro(cpfInput, erroCpf);
  limparErro(senhaInput, erroSenha);

  const cpfVal = cpfInput.value.replace(/\D/g, "");
  const senhaVal = senhaInput.value;

  // Validação básica client-side antes de bater na API
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

  try {
    const resp = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cpf: cpfVal,
        senha: senhaVal,
      }),
    });

    const data = await resp.json();

    if (resp.status === 200) {
      // Salva token JWT e nome do usuário no localStorage (via auth.js)
      salvarToken(data.token, data.nome);
      window.location.href = "/dashboard.html";
    } else {
      // 401: credenciais inválidas — exibe erro no campo de senha
      mostrarErro(senhaInput, erroSenha, data.message || "Usuário ou senha incorretos.");
    }
  } catch (err) {
    console.error("Falha no login:", err);
    mostrarErro(senhaInput, erroSenha, "Erro ao conectar com o servidor.");
  }
});
