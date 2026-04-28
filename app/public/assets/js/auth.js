// ================================
//   AUTH.JS — Gerenciamento de sessão do usuário
//   Responsável por salvar, ler e limpar o token JWT no localStorage,
//   e por verificar se a sessão ainda é válida sem precisar consultar o servidor.
//   Este arquivo deve ser carregado ANTES de qualquer página que use autenticação.
// ================================

// Persiste o token JWT e o nome do usuário após login bem-sucedido.
// O token é usado nas requisições autenticadas (via api.js).
function salvarToken(token, nome) {
  localStorage.setItem("token", token);
  localStorage.setItem("nome", nome);
}

// Retorna o token JWT salvo, ou null se o usuário não está logado.
function obterToken() {
  return localStorage.getItem("token");
}

// Retorna o nome do usuário salvo no localStorage após login.
function obterNome() {
  return localStorage.getItem("nome");
}

// Remove o token e o nome do localStorage, encerrando a sessão local.
// Chamado no logout e em redirecionamentos por token inválido (via api.js).
function limparSessao() {
  localStorage.removeItem("token");
  localStorage.removeItem("nome");
}

// Verifica se o usuário possui uma sessão ativa e com token não expirado.
// Decodifica o payload do JWT em Base64 para ler o campo "exp" (timestamp Unix).
// IMPORTANTE: essa verificação é apenas client-side para UX — a validade real
// do token é sempre checada pelo servidor em rotas protegidas.
function estaAutenticado() {
  const token = obterToken();
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    // Token malformado (corrompido ou adulterado) — trata como não autenticado
    return false;
  }
}
