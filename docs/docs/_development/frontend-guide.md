# 🎨 Guia de Desenvolvimento Frontend

← [Voltar a Desenvolvimento](./)

Tudo para adicionar páginas, componentes e interatividade no frontend.

---

## 📋 Sumário

- [Stack](#stack)
- [Adicionar Nova Página](#adicionar-nova-página)
- [Estrutura HTML](#estrutura-html)
- [CSS & Componentes](#css--componentes)
- [JavaScript & API](#javascript--api)
- [Autenticação](#autenticação)
- [Boas Práticas](#boas-práticas)

---

## Stack

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| HTML5 | — | Estrutura |
| CSS3 | — | Estilo |
| JavaScript | ES6+ | Interatividade |
| Fetch API | — | Requisições HTTP |
| LocalStorage | — | Armazenar token JWT |

**Sem frameworks de UI!** (Requisito RP01)

---

## Adicionar Nova Página

### Passo 1: Criar arquivo HTML

`public/pages/minha-pagina.html`:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Minha Página</title>
  
  <!-- CSS Global -->
  <link rel="stylesheet" href="/assets/css/global.css">
  
  <!-- CSS Específico da Página -->
  <link rel="stylesheet" href="/assets/css/pages/minha-pagina.css">
</head>
<body>
  <header>
    <nav class="navbar">
      <a href="/">Home</a>
      <a href="/pages/minha-pagina.html">Minha Página</a>
      <button id="logoutBtn">Logout</button>
    </nav>
  </header>

  <main>
    <h1>Bem-vindo!</h1>
    <div id="conteudo">
      <!-- Seu conteúdo aqui -->
    </div>
  </main>

  <!-- Scripts (ORDEM IMPORTA!) -->
  <script src="/assets/js/auth.js"></script>  <!-- Primeiro! -->
  <script src="/assets/js/api.js"></script>   <!-- Segundo! -->
  <script src="/assets/js/minha-pagina.js"></script>  <!-- Por último -->
</body>
</html>
```

### Passo 2: Criar CSS da página

`public/assets/css/pages/minha-pagina.css`:

```css
/* Reset específico desta página */
body {
  background-color: var(--bg-color);
  font-family: var(--font-family);
}

/* Componentes desta página */
.card {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* Layout */
main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
```

### Passo 3: Criar JavaScript da página

`public/assets/js/minha-pagina.js`:

```javascript
/**
 * Minha Página - Lógica de Interação
 * 
 * Scripts carregados antes deste:
 * - auth.js (gerencia sessão)
 * - api.js (wrapper fetch autenticado)
 */

// Verificar autenticação ao carregar
document.addEventListener('DOMContentLoaded', () => {
  if (!isUserLoggedIn()) {
    window.location.href = '/pages/login.html';
    return;
  }
  
  initPage();
});

// Inicializar página
async function initPage() {
  try {
    const dados = await apiCall('/api/meu-recurso');
    renderizarDados(dados);
  } catch (err) {
    console.error('Erro ao carregar dados:', err);
    showError('Erro ao carregar dados');
  }
}

// Renderizar dados
function renderizarDados(dados) {
  const container = document.getElementById('conteudo');
  
  if (!dados || dados.length === 0) {
    container.innerHTML = '<p>Nenhum dado encontrado</p>';
    return;
  }
  
  container.innerHTML = dados.map(item => `
    <div class="card">
      <h3>${item.nome}</h3>
      <p>${item.descricao}</p>
      <button onclick="editar(${item.id})">Editar</button>
    </div>
  `).join('');
}

// Exemplo de handler
function editar(id) {
  console.log('Editando:', id);
  // Abrir modal, chamar API, etc
}

// Funções auxiliares
function showError(mensagem) {
  const alert = document.createElement('div');
  alert.className = 'alert alert-error';
  alert.textContent = mensagem;
  document.body.prepend(alert);
  
  setTimeout(() => alert.remove(), 5000);
}

function showSuccess(mensagem) {
  const alert = document.createElement('div');
  alert.className = 'alert alert-success';
  alert.textContent = mensagem;
  document.body.prepend(alert);
  
  setTimeout(() => alert.remove(), 3000);
}
```

---

## Estrutura HTML

### Layout Responsivo

```html
<header class="navbar">
  <!-- Logo, nav links, botões -->
</header>

<main class="container">
  <section class="page-section">
    <h1>Título</h1>
    <article>Conteúdo</article>
  </section>
</main>

<footer>
  <!-- Info da empresa, links, etc -->
</footer>
```

### Formulários

```html
<form id="meuForm" class="form">
  <div class="form-group">
    <label for="email">Email</label>
    <input 
      type="email" 
      id="email" 
      name="email" 
      placeholder="seu@email.com"
      required
    >
    <span class="form-error" id="emailError"></span>
  </div>
  
  <div class="form-group">
    <label for="password">Senha</label>
    <input 
      type="password" 
      id="password" 
      name="password" 
      placeholder="Sua senha"
      required
    >
  </div>
  
  <button type="submit" class="btn btn-primary">Enviar</button>
</form>

<script>
document.getElementById('meuForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  };
  
  try {
    const response = await apiCall('/api/login', formData);
    console.log('Sucesso:', response);
  } catch (err) {
    document.getElementById('emailError').textContent = err.message;
  }
});
</script>
```

---

## CSS & Componentes

### Variáveis CSS Global

`public/assets/css/global.css`:

```css
:root {
  /* Cores */
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --error-color: #dc3545;
  --warning-color: #ffc107;
  
  /* Fundo */
  --bg-color: #ffffff;
  --bg-light: #f5f5f5;
  --text-color: #333333;
  
  /* Espaçamento */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Tipografia */
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
  --font-size-base: 1rem;
  --font-size-lg: 1.25rem;
  --font-size-sm: 0.875rem;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  color: var(--text-color);
  background-color: var(--bg-color);
  line-height: 1.6;
}
```

### Componentes Reutilizáveis

`public/assets/css/components/button.css`:

```css
.btn {
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: var(--font-size-base);
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: var(--secondary-color);
  color: white;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

---

## JavaScript & API

### Arquivo `auth.js`

Gerencia login/logout e token JWT:

```javascript
const TOKEN_KEY = 'authToken';
const USER_KEY = 'authUser';

// Armazenar token
function setAuthToken(token, usuario) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(usuario));
}

// Recuperar token
function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY);
}

// Recuperar usuário
function getAuthUser() {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
}

// Verificar se logado
function isUserLoggedIn() {
  return !!getAuthToken();
}

// Logout
function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  window.location.href = '/pages/login.html';
}

// Setup automático do logout
document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }
});
```

### Arquivo `api.js`

Wrapper autenticado do fetch:

```javascript
/**
 * Fazer requisição HTTP autenticada com token JWT
 */
async function apiCall(endpoint, data = null, method = 'GET') {
  const options = {
    method: data ? 'POST' : method,
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  // Adicionar token JWT se existir
  const token = getAuthToken();
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }
  
  // Adicionar corpo se for POST/PUT
  if (data) {
    options.body = JSON.stringify(data);
    options.method = method || 'POST';
  }
  
  const response = await fetch(endpoint, options);
  
  if (!response.ok) {
    if (response.status === 401) {
      // Token expirado → logout
      logout();
    }
    
    const error = await response.json();
    throw new Error(error.error || 'Erro na requisição');
  }
  
  return await response.json();
}
```

---

## Autenticação

### Proteger Página

No início do script principal:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  // Verificar se está logado
  if (!isUserLoggedIn()) {
    window.location.href = '/pages/login.html';
    return;
  }
  
  // Obter dados do usuário
  const user = getAuthUser();
  console.log('Logado como:', user.nome);
  
  // Inicializar página
  initPage();
});
```

---

## Boas Práticas

### ✅ Faça

- ✅ Usar `const` e `let` (nunca `var`)
- ✅ Validar entrada do usuário (frontend + backend!)
- ✅ Mostrar feedback visual (loading, erro, sucesso)
- ✅ Tratar erros de requisição (try/catch)
- ✅ Usar classes CSS para reutilização
- ✅ Mobile-first (design responsivo)
- ✅ Estruturar HTML semanticamente (header, nav, main, footer)

### ❌ Não faça

- ❌ Inline styles (`style="..."`)
- ❌ IDs genéricos (`id="div1"`)
- ❌ Lógica no HTML (sempre em JS)
- ❌ Requisições sem tratamento de erro
- ❌ Armazenar senhas em localStorage
- ❌ Confiar só em validação frontend
- ❌ Código duplicado (criar funções reutilizáveis)

---

## 📚 Próximos Passos

- [Guia Backend](./backend-guide.md)
- [Guia de Banco](./database-guide.md)
- [Arquitetura Geral](./architecture.md)

---

<div align="center">
  <a href="./">← Voltar a Desenvolvimento</a>
</div>
