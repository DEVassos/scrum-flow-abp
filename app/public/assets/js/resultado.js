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
  badge.textContent = status === 'aprovado' ? 'Aprovado' : 'Reprovado';
  badge.classList.remove('status-badge--aprovado', 'status-badge--reprovado');
  badge.classList.add(`status-badge--${status}`);

  const pct = (dados.percentual ?? 0) + '%';
  document.getElementById('score-ring').style.setProperty('--score-percent', pct);
  document.getElementById('progresso-fill').style.width = pct;
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
  } catch (_) {}

  // Remove do sessionStorage para não reexibir o mesmo resultado se o usuário recarregar
  sessionStorage.removeItem('resultado_exame');
}
