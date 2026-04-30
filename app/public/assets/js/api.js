async function apiFetch(url, options = {}) {
  const token = obterToken();
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const resp = await fetch(url, { ...options, headers });

  if (resp.status === 401) {
    limparSessao();
    window.location.href = "index.html";
    return null;
  }

  return resp;
}