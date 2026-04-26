const btnCriarConta = document.getElementById("btn-criar-conta");
const modalCadastro = document.getElementById("modal-login");

// ================================
//   MODAL
// ================================

function abrirModal() {
  modalCadastro.classList.add("aberto");
}

function fecharModal() {
  modalCadastro.classList.remove("aberto");
}

btnCriarConta.addEventListener("click", function (e) {
  e.preventDefault();
  abrirModal();
});

document.addEventListener("click", function (e) {
  if (
    modalCadastro.classList.contains("aberto") &&
    !modalCadastro.contains(e.target) &&
    e.target !== btnCriarConta
  ) {
    fecharModal();
  }
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
//   VALIDAÇÃO DO CADASTRO
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
  let soma = 0,
    resto;
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

document
  .getElementById("form-cadastro")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("cad-nome");
    const cpf = document.getElementById("cad-cpf");
    const email = document.getElementById("cad-email");

    const erros = {
      nome: document.getElementById("erro-nome"),
      cpf: document.getElementById("erro-cpf"),
      email: document.getElementById("erro-email"),
    };

    limparErro(nome, erros.nome);
    limparErro(cpf, erros.cpf);
    limparErro(email, erros.email);

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

    if (valido) mostrarView("sucesso", "avancar");
  });
