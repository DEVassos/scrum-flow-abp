// ================================
//   QUESTOES.JS
//   Controla o fluxo de perguntas do exame:
//   carregar, navegar, selecionar e finalizar.
// ================================

if (!estaAutenticado()) {
  window.location.href = "../index.html";
}

// ================================
//   ESTADO DA SESSÃO
// ================================

// Dados do exame atual
let idExame = null;
let idModulo = null;
let tentativaAtual = 1;

// Contadores de desempenho
let acertos = 0;
let totalRespondidas = 0;

// Opção selecionada na questão atual (frontier)
let opcaoSelecionada = null;

// Callback guardado para o modal de confirmação
let aoConfirmar = null;

// Histórico de navegação — cada item guarda a questão e a resposta já submetida
// { questao: {...}, resposta: 'a'|'b'|'c'|'d'|null }
let historico = [];
let indiceAtual = -1; // posição atual no histórico

// ================================
//   INICIALIZAÇÃO
// ================================

document.addEventListener("DOMContentLoaded", () => {
  const nome = obterNome();
  const saudacao = document.getElementById("saudacao");
  if (saudacao && nome) {
    saudacao.textContent = `Bem-vindo, ${nome.split(" ")[0]}`;
  }

  configurarEventos();
  carregarProximaQuestao();
});

// Conecta cada botão da página à sua função correspondente
function configurarEventos() {
  document
    .getElementById("btn-voltar")
    ?.addEventListener("click", voltarAoMaterial);
  document
    .getElementById("btn-anterior")
    ?.addEventListener("click", questaoAnterior);
  document
    .getElementById("btn-proxima")
    ?.addEventListener("click", proximaQuestao);
  document
    .getElementById("btn-cancelar-modal")
    ?.addEventListener("click", fecharModalConfirmacao);
  document
    .getElementById("btn-confirmar-modal")
    ?.addEventListener("click", executarConfirmacao);
  document.getElementById("btn-sair")?.addEventListener("click", sair);
}

// ================================
//   CARREGAMENTO
// ================================

// Busca a próxima questão pendente no servidor e adiciona ao histórico
async function carregarProximaQuestao() {
  try {
    const response = await fetch("/api/questoes/proxima-questao", {
      headers: { Authorization: `Bearer ${obterToken()}` },
    });

    // 404 = todas as questões foram respondidas — exibe confirmação final
    if (response.status === 404) {
      finalizarModulo();
      return;
    }

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const questao = await response.json();

    idExame = questao.id_exame;
    idModulo = questao.id_modulo;
    tentativaAtual = questao.tentativa || 1;
    opcaoSelecionada = null;

    const novaQuestao = {
      id_questao: questao.id_questao,
      numero: questao.numero,
      enunciado: questao.enunciado,
      imagem: questao.imagem,
      alternativaA: questao.alternativa_a,
      alternativaB: questao.alternativa_b,
      alternativaC: questao.alternativa_c,
      alternativaD: questao.alternativa_d,
    };

    // Adiciona a nova questão ao histórico e avança o índice
    historico.push({ questao: novaQuestao, resposta: null });
    indiceAtual = historico.length - 1;

    renderizarQuestao();
    atualizarBotoes();
  } catch (error) {
    console.error("Erro ao carregar questão:", error);
    alert("Erro ao carregar questão. Tente novamente.");
  }
}

// ================================
//   RENDERIZAÇÃO
// ================================

// Exibe a questão do índice atual do histórico.
// Se já foi respondida (resposta !== null), entra em modo leitura:
// opções não são clicáveis e a resposta submetida aparece destacada.
function renderizarQuestao() {
  const item = historico[indiceAtual];
  if (!item) return;

  const questao = item.questao;
  const modoLeitura = item.resposta !== null;
  const respostaSubmet = item.resposta;

  document.getElementById("nivel-info").textContent = obterNivelInfo(idModulo);
  document.getElementById("tentativa-info").textContent =
    `Tentativa ${tentativaAtual}/2`;
  document.getElementById("questao-numero").textContent =
    `Questão ${questao.numero || indiceAtual + 1}`;
  document.getElementById("questao-titulo").textContent =
    questao.enunciado || "";
  document.getElementById("questao-descricao").textContent = modoLeitura
    ? "Questão já respondida — somente leitura."
    : "Escolha a alternativa correta:";

  // Limpa e remonta as opções
  const container = document.querySelector(".questao-opcoes");
  container.innerHTML = "";

  const opcoes = [
    { letra: "A", texto: questao.alternativaA },
    { letra: "B", texto: questao.alternativaB },
    { letra: "C", texto: questao.alternativaC },
    { letra: "D", texto: questao.alternativaD },
  ];

  opcoes.forEach((opcao, index) => {
    const div = document.createElement("div");
    div.className = "opcao-item";
    div.dataset.opcao = opcao.letra;

    // Em modo leitura: bloqueia clique e destaca a resposta enviada
    if (modoLeitura) {
      div.classList.add("leitura");
      if (respostaSubmet === opcao.letra.toLowerCase()) {
        div.classList.add("selecionada");
      }
    } else if (opcaoSelecionada === opcao.letra) {
      div.classList.add("selecionada");
    }

    div.innerHTML = `
            <div class="opcao-header">
                <span class="opcao-letra">${opcao.letra}</span>
                <span class="opcao-id">#${100 + index + 1}</span>
            </div>
            <p class="opcao-texto">${opcao.texto || ""}</p>
        `;

    // Só registra clique se a questão ainda não foi respondida
    if (!modoLeitura) {
      div.addEventListener("click", () => selecionarOpcao(opcao.letra));
    }

    container.appendChild(div);
  });

  renderizarProgresso();
}

// Atualiza os dots de progresso conforme o histórico
function renderizarProgresso() {
  const container = document.getElementById("progresso-dots");
  if (!container) return;
  container.innerHTML = "";

  historico.forEach((item, i) => {
    const dot = document.createElement("div");
    dot.className = "progresso-dot";

    if (i === indiceAtual) dot.classList.add("ativo");
    else if (item.resposta) dot.classList.add("respondida");

    container.appendChild(dot);
  });
}

// Habilita ou desabilita os botões de navegação conforme o estado atual
function atualizarBotoes() {
  const naFronteira = indiceAtual === historico.length - 1;

  document.getElementById("btn-anterior").disabled = indiceAtual <= 0;

  // Na fronteira (questão nova): só habilita Próxima se houver seleção
  // No histórico (questão já respondida): sempre habilitado
  document.getElementById("btn-proxima").disabled = naFronteira
    ? !opcaoSelecionada
    : false;
}

// ================================
//   SELEÇÃO
// ================================

// Marca visualmente a opção clicada e habilita o botão Próxima
function selecionarOpcao(letra) {
  opcaoSelecionada = letra;

  document.querySelectorAll(".opcao-item").forEach((item) => {
    item.classList.toggle("selecionada", item.dataset.opcao === letra);
  });

  document.getElementById("btn-proxima").disabled = false;
}

// ================================
//   NAVEGAÇÃO
// ================================

async function proximaQuestao() {
  const naFronteira = indiceAtual === historico.length - 1;

  if (!naFronteira) {
    // Avança pelo histórico sem submeter nada (questão já respondida)
    indiceAtual++;
    opcaoSelecionada = null;
    renderizarQuestao();
    atualizarBotoes();
    return;
  }

  // Na fronteira: precisa de uma opção selecionada para avançar
  if (!opcaoSelecionada) return;

  // Registra a resposta no histórico antes de enviar
  historico[indiceAtual].resposta = opcaoSelecionada.toLowerCase();

  // Envia a resposta ao servidor e carrega a próxima questão
  await enviarResposta(opcaoSelecionada);
  await carregarProximaQuestao();
}

function questaoAnterior() {
  if (indiceAtual <= 0) return;

  indiceAtual--;
  opcaoSelecionada = null;
  renderizarQuestao();
  atualizarBotoes();
}

// ================================
//   ENVIO
// ================================

// Envia a resposta ao servidor e atualiza os contadores locais
async function enviarResposta(letra) {
  try {
    const questaoAtual = historico[indiceAtual].questao;

    const response = await fetch("/api/questoes/responder", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${obterToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_exame: idExame,
        id_questao: questaoAtual.id_questao,
        resposta: letra.toLowerCase(),
      }),
    });

    // 409 = questão já respondida anteriormente, apenas avança
    if (response.status === 409) return;

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const resultado = await response.json();
    const estaCorreta = resultado.nota === 1;

    totalRespondidas++;
    if (estaCorreta) acertos++;
  } catch (error) {
    console.error("Erro ao enviar resposta:", error);
    alert("Erro ao enviar resposta. Tente novamente.");
  }
}

// ================================
//   MODAL DE CONFIRMAÇÃO
// ================================

// Abre o modal com título, mensagem e ação personalizados
function abrirModalConfirmacao(titulo, mensagem, callback) {
  document.getElementById("modal-titulo").textContent = titulo;
  document.getElementById("modal-mensagem").textContent = mensagem;
  aoConfirmar = callback;
  document.getElementById("modal-confirmacao").style.display = "flex";
}

function fecharModalConfirmacao() {
  aoConfirmar = null;
  document.getElementById("modal-confirmacao").style.display = "none";
}

// Executa o callback guardado (finalizar prova ou sair do material)
function executarConfirmacao() {
  document.getElementById("modal-confirmacao").style.display = "none";
  if (aoConfirmar) {
    aoConfirmar();
    aoConfirmar = null;
  }
}

// ================================
//   FINALIZAÇÃO
// ================================

// Exibe a confirmação ao término de todas as questões
function finalizarModulo() {
  abrirModalConfirmacao(
    "Prova concluída!",
    "Você respondeu todas as questões. Deseja ver seu resultado agora?",
    irParaResultado,
  );
}

// Salva o resultado no sessionStorage e redireciona para resultado.html
function irParaResultado() {
  const percentual =
    totalRespondidas > 0 ? Math.round((acertos / totalRespondidas) * 100) : 0;

  sessionStorage.setItem(
    "resultado_exame",
    JSON.stringify({
      acertos,
      total: totalRespondidas,
      percentual,
      modulo: obterNivelInfo(idModulo),
      idModulo,
      data: new Date().toLocaleDateString("pt-BR"),
      status: percentual >= 60 ? "aprovado" : "reprovado",
    }),
  );

  window.location.href = "resultado.html";
}

// Retorna o nome do nível com base no id do módulo
function obterNivelInfo(idModulo) {
  const niveis = {
    1: "Nível 1 – Fundamentos",
    2: "Nível 2 – Papéis e Responsabilidades",
    3: "Nível 3 – Eventos Scrum",
    4: "Nível 4 – Artefatos do Scrum",
    5: "Nível 5 – Escalando o Scrum",
  };
  return niveis[idModulo] || `Módulo ${idModulo}`;
}

// ================================
//   AÇÕES GERAIS
// ================================

// Confirma antes de sair da prova (respostas já enviadas são mantidas)
function voltarAoMaterial() {
  abrirModalConfirmacao(
    "Sair do exame?",
    "Tem certeza que deseja sair? O progresso das questões já respondidas será mantido.",
    () => {
      window.location.href = "../dashboard.html";
    },
  );
}

function sair() {
  limparSessao();
  window.location.href = "../index.html";
}
