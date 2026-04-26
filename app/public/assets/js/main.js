
const btnCriarConta = document.getElementById('btn-criar-conta');
const modalCadastro = document.getElementById('modal-login');

// ================================
//   MODAL
// ================================

function abrirModal() {
    modalCadastro.classList.add('aberto');
}

function fecharModal() {
    modalCadastro.classList.remove('aberto');
}

btnCriarConta.addEventListener('click', function (e) {
    e.preventDefault();
    abrirModal();
});

document.addEventListener('click', function (e) {
    if (modalCadastro.classList.contains('aberto') &&
        !modalCadastro.contains(e.target) &&
        e.target !== btnCriarConta) {
        fecharModal();
    }
});

// ================================
//   TOGGLE DE SENHA
// ================================

function configurarToggleSenha(toggleId, inputId) {
    const toggle = document.getElementById(toggleId);
    const input = document.getElementById(inputId);
    toggle.addEventListener('click', function () {
        input.type = input.type === 'password' ? 'text' : 'password';
    });
}

configurarToggleSenha('toggle-cad-senha', 'cad-senha');
configurarToggleSenha('toggle-cad-confirmar', 'cad-confirmar');