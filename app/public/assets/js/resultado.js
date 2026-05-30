// ================================
//   RESULTADO.JS
//   Exibe o resultado do exame e notifica o servidor
//   para preparar o próximo passo (módulo ou tentativa).
//   Depende de auth.js (carregado antes deste script).
// ================================

if (!estaAutenticado()) {
  window.location.href = '../index.html';
}

// ================================
//   SAUDAÇÃO
// ================================

const nome = obterNome();
if (nome) document.getElementById('nome-usuario').textContent = nome;

// ================================
//   POPULAR DADOS
// ================================

function popularResultado(dados) {
  document.getElementById('pontuacao').textContent       = dados.acertos ?? '—';
  document.getElementById('acertos').textContent         = dados.acertos ?? '—';
  document.getElementById('total-questoes').textContent  = dados.total ?? '—';
  document.getElementById('percentual').textContent      = dados.percentual ?? '—';
  document.getElementById('nome-modulo').textContent     = dados.modulo ?? '—';
  document.getElementById('data-conclusao').textContent  = dados.data ?? '—';

  const badge  = document.getElementById('status-badge');
  const status = dados.status === 'aprovado' ? 'aprovado' : 'reprovado';
  atualizarHeroResultado(status);
  badge.textContent = status === 'aprovado' ? 'Aprovado' : 'Reprovado';
  badge.classList.remove('status-badge--aprovado', 'status-badge--reprovado');
  badge.classList.add(`status-badge--${status}`);

  const pct = (dados.percentual ?? 0) + '%';
  document.getElementById('score-ring').style.setProperty('--score-percent', pct);
  document.getElementById('progresso-fill').style.width = pct;
  atualizarMensagemResultado(dados, status);
}

function atualizarHeroResultado(status) {
  const titulo = document.getElementById('resultado-hero-titulo');
  const subtitulo = document.getElementById('resultado-hero-subtitulo');

  if (!titulo || !subtitulo) return;

  if (status === 'aprovado') {
    titulo.textContent = 'Parabéns';
    subtitulo.textContent = 'Confira seu desempenho abaixo.';
    return;
  }

  titulo.textContent = 'Hmm, não foi dessa vez';
  subtitulo.textContent = 'Confira seu desempenho e veja uma sugestão para a próxima tentativa.';
}

function atualizarMensagemResultado(dados, status) {
  const card = document.getElementById('resultado-motivacional');
  const tagEl = document.getElementById('resultado-motivacional-tag');
  const tituloEl = document.getElementById('resultado-motivacional-titulo');
  const textoEl = document.getElementById('resultado-motivacional-texto');

  if (!card || !tagEl || !tituloEl || !textoEl) return;

  const percentual = Number(dados.percentual) || 0;
  let estado = status;
  let tag = 'Próximo passo';
  let titulo = 'Continue sua jornada Scrum';
  let texto = 'Volte ao dashboard para acompanhar seu próximo passo e manter o progresso ativo.';

  if (status === 'aprovado' && percentual >= 90) {
    estado = 'excelente';
    titulo = 'Excelente domínio do conteúdo';
    texto = 'Seu resultado mostra segurança neste módulo. Avance para o próximo nível e mantenha o mesmo cuidado nas revisões.';
  } else if (status === 'aprovado') {
    titulo = 'Módulo concluído';
    texto = 'Você atingiu a média necessária e desbloqueou o próximo passo. Revise os pontos em que teve dúvida antes de seguir.';
  } else if (percentual >= 40) {
    tag = 'Mensagem de apoio';
    titulo = 'Você está perto da aprovação';
    texto = 'Faltou pouco. Esse resultado já mostra que você construiu parte da base. Revise os pontos em que errou e tente novamente com foco nas dúvidas.';
  } else {
    estado = 'revisao';
    tag = 'Mensagem de apoio';
    titulo = 'Uma tentativa ruim não define seu aprendizado';
    texto = 'Use essa prova como diagnóstico, não como derrota. Volte ao conteúdo do módulo, anote os conceitos que confundiram e faça a próxima tentativa com calma.';
  }

  card.dataset.estado = estado;
  tagEl.textContent = tag;
  tituloEl.textContent = titulo;
  textoEl.textContent = texto;
}

// ================================
//   AVANÇAR NO SISTEMA DE MÓDULOS
// ================================

// Notifica o servidor do resultado para atualizar o banco de dados.
// Chamado logo após exibir o resultado, em segundo plano, para que
// o próximo acesso ao exame já carregue o módulo ou tentativa corretos.
async function avancarProgresso(status) {
  try {
    if (status === 'aprovado') {
      // Usuário atingiu 60% ou mais: avança para o próximo módulo da trilha
      await fetch('/api/questoes/proximo-modulo', {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${obterToken()}` }
      });
    } else {
      // Usuário ficou abaixo de 60%: prepara nova tentativa com grupo diferente de questões.
      // O servidor rejeita automaticamente se o limite de 2 tentativas já foi atingido.
      await fetch('/api/questoes/proxima-tentativa', {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${obterToken()}` }
      });
    }
  } catch (erro) {
    // Erro silencioso: não interrompe a exibição do resultado para o usuário
    console.error('Erro ao avançar progresso:', erro);
  }
}

// ================================
//   REVISÃO DE ERROS
// ================================

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function carregarRevisao(idModulo) {
  try {
    const resp = await fetch(`/api/questoes/historico/${idModulo}`, {
      headers: { 'Authorization': `Bearer ${obterToken()}` }
    });
    if (!resp.ok) return;

    const questoes = await resp.json();
    const erradas = questoes.filter(q => q.nota === 0);
    if (!erradas.length) return;

    const lista = document.getElementById('lista-erros');
    const letras = ['a', 'b', 'c', 'd'];

    erradas.forEach(q => {
      const alternativas = letras.map(l => {
        const texto = q[`alternativa_${l}`];
        if (!texto) return '';
        const isCorreta  = l === q.alternativa_correta;
        const isEscolhida = l === q.resposta_usuario;
        let cls = 'revisao-alt';
        if (isCorreta)        cls += ' revisao-alt--correta';
        else if (isEscolhida) cls += ' revisao-alt--errada';

        const tagCorreta  = isCorreta   ? '<span class="revisao-alt-tag revisao-alt-tag--correta">Correta</span>'      : '';
        const tagEscolhida = (isEscolhida && !isCorreta) ? '<span class="revisao-alt-tag revisao-alt-tag--errada">Sua resposta</span>' : '';

        return `<div class="${cls}">
          <span class="revisao-alt-letra">${l.toUpperCase()}</span>
          <span class="revisao-alt-texto">${escapeHtml(texto)}</span>
          ${tagCorreta}${tagEscolhida}
        </div>`;
      }).join('');

      const card = document.createElement('div');
      card.className = 'revisao-card';
      card.innerHTML = `
        <p class="revisao-enunciado"><strong>Q${q.numero}.</strong> ${escapeHtml(q.enunciado)}</p>
        <div class="revisao-alternativas">${alternativas}</div>
      `;
      lista.appendChild(card);
    });

    document.getElementById('secao-erros').hidden = false;
  } catch (_) {}
}

// ================================
//   LER DADOS DO sessionStorage
// ================================

// O questoes.js salva o resultado no sessionStorage antes de redirecionar para cá
const raw = sessionStorage.getItem('resultado_exame');
if (raw) {
  try {
    const dados = JSON.parse(raw);
    popularResultado(dados);

    // Avisa o servidor em paralelo enquanto o usuário lê o resultado.
    // Quando ele clicar em "Voltar ao Dashboard", o banco já estará atualizado.
    avancarProgresso(dados.status);

    if (dados.idModulo) carregarRevisao(dados.idModulo);
  } catch (_) {}

  // Remove do sessionStorage para não reexibir o mesmo resultado se o usuário recarregar
  sessionStorage.removeItem('resultado_exame');
}
