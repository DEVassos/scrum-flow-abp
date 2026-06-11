const API_BASE = "";

function urlValidacao(codigo) {
    return `${API_BASE}/api/certificados/hash/${encodeURIComponent(codigo)}`;
}

/* -------- elementos da página -------- */
const form        = document.getElementById("form-validar");
const inputCodigo = document.getElementById("input-codigo");
const erroCodigo  = document.getElementById("erro-codigo");
const btnValidar  = document.getElementById("btn-validar");

const elCarregando = document.getElementById("estado-carregando");
const elValido     = document.getElementById("estado-valido");
const elInvalido   = document.getElementById("estado-invalido");
const invalidoMsg  = document.getElementById("invalido-msg");

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

// Aceita nota como número; exibe com 1 casa e vírgula (ex.: 8,5)
function formatarNota(n) {
    const v = Number(String(n).replace(",", "."));
    return Number.isFinite(v) ? v.toFixed(1).replace(".", ",") : "—";
}

// Formata ISO date para dd/mm/aaaa
function formatarData(iso) {
    if (!iso) return "—";
    const d = new Date(iso);
    return isNaN(d.getTime()) ? "—" : d.toLocaleDateString("pt-BR");
}

/* -------- renderização do resultado -------- */
function renderValido(dados) {
    // Estrutura do backend:
    // { aluno: { nome, cpf }, certificado: { codigoValidacao, emitidoEm }, progresso: { modulosConcluidos } }

    document.getElementById("res-nome").textContent    = dados.aluno?.nome || "—";
    document.getElementById("res-cpf").textContent     = mascararCpf(dados.aluno?.cpf);
    document.getElementById("res-emissao").textContent = formatarData(dados.certificado?.emitidoEm);
    document.getElementById("res-codigo").textContent  = dados.certificado?.codigoValidacao || inputCodigo.value.trim();

    const modulos = dados.progresso?.modulosConcluidos || [];
    const corpo = document.getElementById("res-modulos");
    corpo.innerHTML = "";

    let somaNotas = 0;
    modulos.forEach((m) => {
        // Pega a maior nota dentre as tentativas concluídas e converte para escala 0–10
        const melhorNota = m.notasTentativas
            .filter((t) => t.concluida)
            .reduce((max, t) => Math.max(max, t.nota), 0);
        const meta = m.metaQuestoes || 1;
        const notaFinal = (melhorNota / meta) * 10;
        somaNotas += notaFinal;

        const tr = document.createElement("tr");
        const tdNome = document.createElement("td");
        const tdNota = document.createElement("td");
        tdNome.textContent = m.titulo || "Módulo";
        tdNota.textContent = formatarNota(notaFinal);
        tr.appendChild(tdNome);
        tr.appendChild(tdNota);
        corpo.appendChild(tr);
    });

    const media = modulos.length > 0 ? somaNotas / modulos.length : 0;
    document.getElementById("res-media").textContent = formatarNota(media);

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

        if (resp.status === 404) {
            renderInvalido();
            return;
        }

        // 409 = usuário encontrado mas ainda não concluiu todos os módulos
        if (resp.status === 409) {
            const dados = await resp.json();
            renderInvalido(dados.message || "Certificado indisponível: conclusão de todos os módulos é obrigatória.");
            return;
        }

        if (!resp.ok) {
            throw new Error(`HTTP ${resp.status}`);
        }

        renderValido(await resp.json());
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
// Permite links diretos como: validar_certificado.html?codigo=ABC123
(function autoValidarPelaUrl() {
    const params = new URLSearchParams(window.location.search);
    const codigo = params.get("codigo");
    if (codigo) {
        inputCodigo.value = codigo;
        validar(codigo.trim());
    }
})();