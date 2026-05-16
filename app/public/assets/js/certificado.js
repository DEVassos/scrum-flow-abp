// ================================
//   CERTIFICADO.JS
//   Busca e exibe o certificado pelo hash na URL (?hash=XXXX).
//   Endpoint público — não exige JWT.
// ================================

const params = new URLSearchParams(window.location.search);
const hash = (params.get("hash") || "").trim();

if (!hash) {
  window.location.href = "dashboard.html";
  throw new Error("hash não informado");
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch(`/api/certificados/hash/${encodeURIComponent(hash)}`);

    if (res.status === 404) {
      mostrarErro("Certificado não encontrado. Verifique o link e tente novamente.");
      return;
    }

    if (res.status === 409) {
      const body = await res.json();
      mostrarErro(body.message || "Certificado indisponível.");
      return;
    }

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const dados = await res.json();
    renderizarCertificado(dados);
  } catch {
    mostrarErro("Erro ao carregar o certificado. Tente recarregar a página.");
  }
});

// ================================
//   RENDERIZAÇÃO
// ================================

function renderizarCertificado(dados) {
  const { aluno, certificado, progresso } = dados;
  const modulos = progresso.modulosConcluidos;

  document.getElementById("aluno-nome").textContent = aluno.nome;
  document.getElementById("aluno-cpf").textContent = formatarCPF(aluno.cpf);
  document.getElementById("periodo-inicio").textContent = formatarData(certificado.inicioEm);
  document.getElementById("periodo-fim").textContent = formatarData(certificado.fimEm);
  document.getElementById("emitido-em").textContent = formatarData(certificado.emitidoEm);
  document.getElementById("codigo-validacao").textContent = certificado.codigoValidacao;
  document.getElementById("media-final").textContent = calcularMedia(modulos);

  document.getElementById("modulos-corpo").innerHTML = modulos
    .map(gerarLinhaModulo)
    .join("");

  document.getElementById("loading").hidden = true;
  document.getElementById("certificado").hidden = false;
  document.getElementById("cert-actions").hidden = false;
}

function gerarLinhaModulo(modulo) {
  const melhor = modulo.notasTentativas
    .filter((t) => t.concluida)
    .sort((a, b) => b.nota - a.nota)[0];

  const nota =
    melhor && melhor.metaQuestoes > 0
      ? ((melhor.nota / melhor.metaQuestoes) * 10).toFixed(1).replace(".", ",")
      : "—";

  return `
    <tr>
      <td>Nível ${modulo.idModulo} – ${modulo.titulo}</td>
      <td>${nota}</td>
    </tr>
  `;
}

// ================================
//   MÉDIA FINAL
// ================================

function calcularMedia(modulos) {
  if (!modulos.length) return "—";

  const notas = modulos.map((m) => {
    const melhor = m.notasTentativas
      .filter((t) => t.concluida)
      .sort((a, b) => b.nota - a.nota)[0];
    return melhor && melhor.metaQuestoes > 0
      ? (melhor.nota / melhor.metaQuestoes) * 10
      : 0;
  });

  const media = notas.reduce((soma, n) => soma + n, 0) / notas.length;
  return media.toFixed(1).replace(".", ",");
}

// ================================
//   ESTADO DE ERRO
// ================================

function mostrarErro(msg) {
  document.getElementById("loading").hidden = true;
  document.getElementById("erro-msg").textContent = msg;
  document.getElementById("erro").hidden = false;
}

// ================================
//   FORMATAÇÕES
// ================================

function formatarData(isoString) {
  if (!isoString) return "—";
  return new Date(isoString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatarCPF(cpf) {
  const digits = String(cpf).replace(/\D/g, "");
  return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// ================================
//   IMPRESSÃO
// ================================

document.getElementById("btn-imprimir")?.addEventListener("click", () => {
  window.print();
});
