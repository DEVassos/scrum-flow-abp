// ================================
//   HISTORICO QUESTOES - ScrumFlow
// ================================

if (!estaAutenticado()) {
  window.location.href = "index.html";
}

var moduloSelecionado = null;
var respondidos = [];

var sidebarLista = document.getElementById("sidebar-lista");
var historicoPainel = document.getElementById("historico-painel");

inicializar();

async function inicializar() {
  configurarNavbar();
  await carregarDados();
}

function configurarNavbar() {
  var saudacao = document.getElementById("nav-saudacao");
  var btnSair = document.getElementById("btn-sair");
  var nome = obterNome();

  if (saudacao && nome) {
    saudacao.textContent = "Olá, " + nome;
  }

  if (btnSair) {
    btnSair.addEventListener("click", function() {
      limparSessao();
      window.location.href = "index.html";
    });
  }
}

async function carregarDados() {
  try {
    renderizarPainelCarregando();

    var resModulos = await apiFetch("/api/questoes/modulos");
    var resRespondidos = await apiFetch("/api/questoes/modulos-respondidos");

    if (!resModulos || !resRespondidos) return;

    var dadosModulos = await resModulos.json();
    var dadosRespondidos = await resRespondidos.json();

    // mapa id_modulo → titulo vindo do banco
    var titulosMap = new Map(
      dadosModulos.map(function(m) {
        return [Number(m.id_modulo), m.titulo];
      })
    );

    // agrupa por módulo mantendo apenas a última tentativa (maior número de tentativa)
    var mapaRespondidos = new Map();
    dadosRespondidos.forEach(function(item) {
      var id = Number(item.id_modulo);
      var existente = mapaRespondidos.get(id);
      if (!existente || Number(item.tentativa) > Number(existente.tentativa)) {
        mapaRespondidos.set(id, item);
      }
    });

    respondidos = Array.from(mapaRespondidos.values())
      .map(function(item) {
        return {
          id_modulo: Number(item.id_modulo),
          titulo: titulosMap.get(Number(item.id_modulo)) || "Módulo " + item.id_modulo,
          nota: Number(item.nota),
          questoes: Number(item.questoes),
          tentativa: Number(item.tentativa),
        };
      })
      .sort(function(a, b) {
        return a.id_modulo - b.id_modulo;
      });

    renderizarSidebar();

    if (respondidos.length > 0) {
      await selecionarModulo(respondidos[0]);
    } else {
      renderizarPainelVazio();
    }
  } catch (e) {
    console.error("Erro ao carregar dados:", e);
    renderizarPainelErro();
  }
}

function renderizarSidebar() {
  if (respondidos.length === 0) {
    sidebarLista.innerHTML = '<p class="sidebar-vazio">Nenhuma prova realizada ainda.</p>';
    return;
  }

  sidebarLista.innerHTML = "";

  respondidos.forEach(function(modulo) {
    var aprovado = modulo.nota >= Math.ceil(modulo.questoes * 0.6);

    var item = document.createElement("button");
    item.type = "button";
    item.className = "historico-modulo-item historico-modulo-item--" + (aprovado ? "aprovado" : "reprovado");
    item.dataset.id = modulo.id_modulo;
    item.innerHTML =
      '<div class="historico-modulo-info">' +
        '<span class="historico-modulo-titulo">' + escapeHtml(modulo.titulo) + "</span>" +
        '<span class="historico-modulo-nota">' + modulo.nota + " / " + modulo.questoes + "</span>" +
      "</div>";

    item.addEventListener("click", function() {
      selecionarModulo(modulo);
    });

    sidebarLista.appendChild(item);
  });
}

async function selecionarModulo(modulo) {
  moduloSelecionado = modulo;
  atualizarSidebarAtiva();
  renderizarPainelCarregando();

  try {
    var response = await apiFetch("/api/questoes/historico/" + modulo.id_modulo);
    if (!response) return;

    if (!response.ok) {
      renderizarPainelErro("Não foi possível carregar as questões deste módulo.");
      return;
    }

    var questoes = await response.json();
    renderizarPainel(modulo, questoes);
  } catch (e) {
    console.error("Erro ao carregar histórico do módulo:", e);
    renderizarPainelErro();
  }
}

function atualizarSidebarAtiva() {
  document.querySelectorAll(".historico-modulo-item").forEach(function(item) {
    var ativo = Number(item.dataset.id) === (moduloSelecionado && moduloSelecionado.id_modulo);
    item.classList.toggle("historico-modulo-item--ativo", ativo);
  });
}

function renderizarPainel(modulo, questoes) {
  var acertos = 0;
  questoes.forEach(function(q) {
    if (q.nota === 1) acertos++;
  });
  var total = questoes.length;
  var aprovado = total > 0 && acertos >= Math.ceil(total * 0.6);

  var questoesHtml = "";
  questoes.forEach(function(q, i) {
    questoesHtml += renderizarQuestao(q, i);
  });

  historicoPainel.innerHTML =
    '<div class="painel-topo">' +
      "<div>" +
        '<span class="painel-badge painel-badge--' + (aprovado ? "aprovado" : "reprovado") + '">' +
          (aprovado ? "Aprovado" : "Reprovado") +
        "</span>" +
        '<h2 class="painel-titulo">' + escapeHtml(modulo.titulo) + "</h2>" +
      "</div>" +
      '<div class="painel-resultado">' +
        "<span>Resultado</span>" +
        "<strong>" + acertos + " / " + total + "</strong>" +
      "</div>" +
    "</div>" +
    '<div class="questoes-lista">' + questoesHtml + "</div>";
}

function renderizarQuestao(questao, index) {
  var alternativas = ["a", "b", "c", "d"];
  var correta = questao.alternativa_correta;
  var escolhida = questao.resposta_usuario;
  var acertou = questao.nota === 1;

  var opcoesHtml = "";
  alternativas.forEach(function(letra) {
    var texto = questao["alternativa_" + letra];
    var classeExtra = "";

    if (letra === escolhida && acertou) {
      classeExtra = "opcao--escolhida-correta";
    } else if (letra === escolhida && !acertou) {
      classeExtra = "opcao--escolhida-errada";
    } else if (letra === correta && !acertou) {
      classeExtra = "opcao--gabarito";
    }

    opcoesHtml +=
      '<div class="opcao ' + classeExtra + '">' +
        '<span class="opcao-letra">' + letra.toUpperCase() + "</span>" +
        '<span class="opcao-texto">' + escapeHtml(texto) + "</span>" +
      "</div>";
  });

  return (
    '<div class="questao-card questao-card--' + (acertou ? "correta" : "errada") + '">' +
      '<div class="questao-topo">' +
        '<span class="questao-numero">' + (index + 1) + "</span>" +
        '<span class="questao-tag questao-tag--' + (acertou ? "correta" : "errada") + '">' +
          (acertou ? "Acerto" : "Erro") +
        "</span>" +
      "</div>" +
      '<p class="questao-enunciado">' + escapeHtml(questao.enunciado) + "</p>" +
      '<div class="questao-opcoes">' + opcoesHtml + "</div>" +
    "</div>"
  );
}

function renderizarPainelCarregando() {
  historicoPainel.innerHTML =
    '<div class="painel-mensagem"><p>Carregando questões...</p></div>';
}

function renderizarPainelVazio() {
  historicoPainel.innerHTML =
    '<div class="painel-mensagem">' +
      "<p>Você ainda não realizou nenhuma prova.</p>" +
      '<a href="modulos.html" class="btn btn-primary">Ir para os módulos</a>' +
    "</div>";
}

function renderizarPainelErro(msg) {
  historicoPainel.innerHTML =
    '<div class="painel-mensagem">' +
      "<p>" + (msg || "Não foi possível carregar o histórico. Tente novamente.") + "</p>" +
    "</div>";
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
