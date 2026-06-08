/* ============================================================
   ScrumFlow — Validação de Certificado
   ------------------------------------------------------------
   Esta página é PÚBLICA: qualquer pessoa pode validar um código,
   sem precisar estar logada.

   >>> AJUSTE OBRIGATÓRIO <<<
   Aponte API_BASE para a base da sua API (a mesma que o seu
   assets/js/api.js já usa). Exemplos:
     const API_BASE = "";                       // se o front e a API são servidos juntos
     const API_BASE = "http://localhost:3000";  // em desenvolvimento
   ============================================================ */

const API_BASE = ""; // <-- coloque aqui a base da sua API

// Monta a URL do endpoint de validação.
// O back-end deve expor: GET {API_BASE}/api/certificados/validar/:codigo
function urlValidacao(codigo) {
    return `${API_BASE}/api/certificados/validar/${encodeURIComponent(codigo)}`;
}

/* -------- elementos da página -------- */
const form          = document.getElementById("form-validar");
const inputCodigo   = document.getElementById("input-codigo");
const erroCodigo    = document.getElementById("erro-codigo");
const btnValidar    = document.getElementById("btn-validar");

const elCarregando  = document.getElementById("estado-carregando");
const elValido      = document.getElementById("estado-valido");
const elInvalido    = document.getElementById("estado-invalido");
const invalidoMsg   = document.getElementById("invalido-msg");

/* -------- helpers de exibição -------- */
function esconderTudo() {
    elCarregando.hidden = true;
    elValido.hidden = true;
    elInvalido.hidden = true;
}

function mostrarErroCampo(mostrar) {
    erroCodigo.classList.toggle("visivel", mostrar);
    inputCodigo.classList.toggle("erro", mostrar);
}

// Mascara o CPF por privacidade (LGPD): 123.456.789-00 -> 123.***.***-00
function mascararCpf(cpf) {
    if (!cpf) return "—";
    const d = String(cpf).replace(/\D/g, "").padStart(11, "0");
    return `${d.slice(0, 3)}.***.***-${d.slice(9, 11)}`;
}

// Aceita nota como número ou texto; exibe com 1 casa e vírgula (ex.: 8,5)
function formatarNota(n) {
    const v = Number(String(n).replace(",", "."));
    return Number.isFinite(v) ? v.toFixed(1).replace(".", ",") : String(n);
}

/* -------- renderização do resultado -------- */
function renderValido(dados) {
    document.getElementById("res-nome").textContent     = dados.nome || "—";
    document.getElementById("res-cpf").textContent      = mascararCpf(dados.cpf);
    document.getElementById("res-media").textContent    = dados.media != null ? formatarNota(dados.media) : "—";
    document.getElementById("res-emissao").textContent  = dados.emitidoEm || dados.emitido_em || "—";
    document.getElementById("res-codigo").textContent   = dados.codigo || inputCodigo.value.trim();

    const corpo = document.getElementById("res-modulos");
    corpo.innerHTML = "";
    (dados.modulos || []).forEach((m) => {
        const tr = document.createElement("tr");
        const tdNome = document.createElement("td");
        const tdNota = document.createElement("td");
        tdNome.textContent = m.nome || m.modulo || "Módulo";
        tdNota.textContent = formatarNota(m.nota);
        tr.appendChild(tdNome);
        tr.appendChild(tdNota);
        corpo.appendChild(tr);
    });

    esconderTudo();
    elValido.hidden = false;
}

function renderInvalido(mensagem) {
    if (mensagem) invalidoMsg.textContent = mensagem;
    esconderTudo();
    elInvalido.hidden = false;
}

/* -------- chamada ao back-end -------- */
async function validar(codigo) {
    esconderTudo();
    elCarregando.hidden = false;
    btnValidar.disabled = true;

    try {
        const resp = await fetch(urlValidacao(codigo), { headers: { "Accept": "application/json" } });

        // 404 => código não existe no banco
        if (resp.status === 404) {
            renderInvalido();
            return;
        }
        if (!resp.ok) {
            throw new Error(`HTTP ${resp.status}`);
        }

        const dados = await resp.json();

        // O back-end pode responder de duas formas:
        //  a) { valido: true, nome, cpf, media, emitidoEm, modulos: [{nome, nota}] }
        //  b) { valido: false }
        if (dados && dados.valido === false) {
            renderInvalido();
        } else {
            renderValido(dados);
        }
    } catch (e) {
        renderInvalido("Não foi possível verificar o código agora. Tente novamente em instantes.");
    } finally {
        btnValidar.disabled = false;
    }
}

/* -------- envio do formulário -------- */
form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const codigo = inputCodigo.value.trim();
    if (!codigo) {
        mostrarErroCampo(true);
        return;
    }
    mostrarErroCampo(false);
    validar(codigo);
});

inputCodigo.addEventListener("input", () => mostrarErroCampo(false));

/* -------- validação automática via link -------- */
/* Permite links diretos como: validar-certificado.html?codigo=ABC123
   (útil para colocar num QR Code ou no rodapé do certificado).      */
(function autoValidarPelaUrl() {
    const params = new URLSearchParams(window.location.search);
    const codigo = params.get("codigo");
    if (codigo) {
        inputCodigo.value = codigo;
        validar(codigo.trim());
    }
})();
