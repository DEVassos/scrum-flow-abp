function salvarToken(token, nome) {
  localStorage.setItem("token", token);
  localStorage.setItem("nome", nome);
}

function obterToken() {
  return localStorage.getItem("token");
}

function obterNome() {
  return localStorage.getItem("nome");
}

function limparSessao() {
  localStorage.removeItem("token");
  localStorage.removeItem("nome");
}

function estaAutenticado() {
  const token = obterToken();
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}
