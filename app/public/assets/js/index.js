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
// ================================

function abrirModal(viewInicial = "login") {
  overlay.classList.add("aberto");
  modalLogin.classList.add("aberto");
  mostrarView(viewInicial);
}

function fecharModal() {
  overlay.classList.remove("aberto");
  modalLogin.classList.remove("aberto");
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
  modalLogin.scrollTop = 0;

  if (direcao) {
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
  if (v.length > 9)
    v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
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
//   SUBMIT COM FETCH
// ================================

if (new URLSearchParams(window.location.search).get("abrir") === "cadastro") {
  abrirModal("cadastro");
}

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
      window.location.href = "login.html";
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
    alert("Erro inesperado. Tente novamente.");
  } catch (err) {
    console.error("Falha na requisição:", err);
    alert("Sem conexão com o servidor. Verifique se o backend está rodando.");
  }
});
