# 🏗️ Arquitetura da Aplicação

← [Voltar a Desenvolvimento](./)

Visão geral da arquitetura, camadas e padrões da aplicação.

---

## 📊 Diagrama de Arquitetura (Alto Nível)

```
┌─────────────────────────────────────────────┐
│         Frontend (HTML/CSS/JS)              │
│  ┌──────────────────────────────────────┐   │
│  │  Pages: index, cadastro, dashboard   │   │
│  │  Assets: CSS componentes, JS handlers│   │
│  └──────────────────────────────────────┘   │
│                    │                        │
│    Fetch com Token JWT (localStorage)       │
│                    │                        │
└────────────────────┼────────────────────────┘
                     │ HTTP
                     ↓
┌─────────────────────────────────────────────┐
│     Backend API (Express + Node.js)         │
│  ┌──────────────────────────────────────┐   │
│  │  Routes: /api/auth, /api/usuarios    │   │
│  │  Middlewares: JWT, validações        │   │
│  │  Repositories: Consultas SQL         │   │
│  │  Utils: CPF, JWT, Password           │   │
│  └──────────────────────────────────────┘   │
│                    │                        │
│         SQL (Pool de conexão)               │
│                    │                        │
└────────────────────┼────────────────────────┘
                     │
                     ↓
        ┌─────────────────────────┐
        │   PostgreSQL Database   │
        │  (Tabelas: usuarios,    │
        │   modulos, questoes,    │
        │   respostas, exames)    │
        └─────────────────────────┘
```

---

## 🔄 Fluxo de uma Requisição

### Exemplo: Usuário faz Login

```
1. Frontend (browser)
   ├─ Usuário preenche CPF e senha
   ├─ JS manda POST /api/auth/login (fetch)
   └─ Aguarda resposta
        │
        ↓
2. Backend (Express)
   ├─ Router recebe em /api/auth/login
   ├─ Validação básica
   ├─ Repository consulta BD: SELECT * FROM usuarios WHERE cpf = ?
   ├─ Verifica senha com bcrypt
   ├─ Gera JWT token
   └─ Responde com { token, usuario }
        │
        ↓
3. Frontend recebe resposta
   ├─ Se sucesso: localStorage.setItem('token', token)
   ├─ Redireciona para /dashboard
   └─ Dashboard carrega com token autenticado
        │
        ↓
4. Próximas requisições
   ├─ Cada fetch inclui header: Authorization: Bearer <token>
   ├─ Backend valida token em cada rota protegida
   └─ Se expirou, usuário é deslogado
```

---

## 🏛️ Camadas

### 1️⃣ Presentation (Frontend)

**Responsabilidade:** Exibir dados, capturar entrada do usuário

**Arquivos:**
- `public/pages/*.html` — Estrutura HTML
- `public/assets/css/pages/*.css` — Estilos de página
- `public/assets/js/*.js` — Lógica de interação

**Exemplo:**
```html
<!-- dashboard.html -->
<form id="loginForm">
  <input type="text" id="cpf" placeholder="CPF">
  <input type="password" id="password" placeholder="Senha">
  <button type="submit">Entrar</button>
</form>

<script src="/assets/js/dashboard.js"></script>
```

```javascript
// dashboard.js
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const response = await apiCall('/api/auth/login', {
    cpf: document.getElementById('cpf').value,
    password: document.getElementById('password').value
  });
  // ...
});
```

---

### 2️⃣ API Layer (Routes)

**Responsabilidade:** Receber requisições HTTP, validar, chamar repository, retornar resposta

**Arquivos:**
- `src/routes/*.routes.js` — Definição de rotas
- `src/middlewares/auth.middleware.js` — Autenticação JWT

**Exemplo:**
```javascript
// src/routes/auth.routes.js
const { Router } = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const repository = require('../repositories/auth.repositories');

const router = Router();

router.post('/login', async (req, res) => {
  try {
    const { cpf, password } = req.body;
    
    // Validação
    if (!cpf || !password) {
      return res.status(400).json({ error: 'CPF e senha obrigatórios' });
    }
    
    // Chamar repository
    const result = await repository.login(cpf, password);
    
    if (!result.success) {
      return res.status(401).json({ error: result.message });
    }
    
    res.json({ token: result.token, usuario: result.usuario });
  } catch (err) {
    res.status(500).json({ error: 'Erro interno' });
  }
});

router.get('/perfil', authMiddleware, async (req, res) => {
  // req.usuario vem do middleware
  res.json(req.usuario);
});

module.exports = router;
```

---

### 3️⃣ Data Access Layer (Repositories)

**Responsabilidade:** Executar queries SQL, retornar dados formatados

**Arquivos:**
- `src/repositories/*.repositories.js` — Consultas SQL

**Padrão:**
```javascript
// src/repositories/usuario.repositories.js
const db = require('../database/db');

async function findByCpf(cpf) {
  const result = await db.query(
    'SELECT * FROM usuarios WHERE cpf = $1',
    [cpf]
  );
  return result.rows[0];
}

async function create(nome, cpf, email, senha_hash) {
  const result = await db.query(
    `INSERT INTO usuarios (nome, cpf, email, senha_hash, created_at) 
     VALUES ($1, $2, $3, $4, NOW()) 
     RETURNING id, nome, cpf, email`,
    [nome, cpf, email, senha_hash]
  );
  return result.rows[0];
}

module.exports = {
  findByCpf,
  create
};
```

---

### 4️⃣ Database Layer

**Responsabilidade:** Conexão com PostgreSQL, execução de queries

**Arquivos:**
- `src/database/db.js` — Pool de conexão
- `src/infra/init/*.sql` — Schemas e seeds

**Pool de Conexão:**
```javascript
// src/database/db.js
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

module.exports = pool;
```

---

## 🔐 Autenticação (JWT)

**Fluxo:**

1. Usuário faz login → backend gera JWT
2. Frontend armazena JWT em `localStorage`
3. Cada requisição inclui `Authorization: Bearer <token>`
4. Middleware valida token
5. Se expirado, frontend redireciona para login

**Código do Middleware:**
```javascript
// src/middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }
  
  const token = authHeader.replace('Bearer ', '');
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}

module.exports = authMiddleware;
```

---

## 📐 Padrões de Código

### Backend (Node.js)

**Estrutura de Rota:**
```javascript
router.METHOD('/rota', [middlewares], async (req, res) => {
  try {
    // 1. Extrair dados
    const { param } = req.body || req.params;
    
    // 2. Validar
    if (!param) return res.status(400).json({ error: 'Obrigatório' });
    
    // 3. Chamar repository
    const resultado = await repository.funcao(param);
    
    // 4. Retornar
    res.json(resultado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro interno' });
  }
});
```

**Estrutura de Repository:**
```javascript
async function operacao(params) {
  const result = await db.query(
    'SELECT ... FROM ... WHERE ... = $1',
    [params]
  );
  return result.rows[0] || result.rows;
}
```

### Frontend (HTML/CSS/JS)

**Estrutura de Página:**
```
pages/dashboard.html
├── <head>
│   ├── global.css
│   └── pages/dashboard.css
├── <body>
│   ├── conteúdo HTML
│   ├── auth.js (primeiro!)
│   ├── api.js
│   └── dashboard.js
```

**Estrutura de Script:**
```javascript
// Funções de API
async function fetchDados() {
  return await apiCall('/api/endpoint');
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('btn');
  if (btn) btn.addEventListener('click', handleClick);
});

// Handlers
function handleClick() {
  // ...
}
```

---

## 🗂️ Estrutura Completa de Pastas

```
app/
├── public/                       # Frontend
│   ├── pages/
│   │   ├── index.html           # Home
│   │   ├── cadastro.html        # Registro
│   │   ├── login.html           # Login
│   │   └── dashboard.html       # Dashboard
│   └── assets/
│       ├── css/
│       │   ├── global.css       # Reset, variáveis
│       │   ├── components/
│       │   │   ├── button.css
│       │   │   └── form.css
│       │   └── pages/
│       │       ├── index.css
│       │       ├── dashboard.css
│       │       └── ...
│       └── js/
│           ├── auth.js          # Gerência de sessão
│           ├── api.js           # Wrapper fetch
│           ├── index.js         # Lógica da home
│           ├── dashboard.js     # Lógica do dashboard
│           └── ...
│
└── src/                          # Backend
    ├── server.js                # Entry point
    ├── database/
    │   └── db.js               # Pool de conexão
    ├── infra/
    │   ├── init/
    │   │   ├── 01_schema_modulos.sql
    │   │   ├── 02_schema_questoes.sql
    │   │   └── ...
    │   └── run-sql.js
    ├── middlewares/
    │   └── auth.middleware.js
    ├── routes/
    │   ├── index.js            # Registro de rotas
    │   ├── auth.routes.js
    │   ├── usuario.routes.js
    │   └── ...
    ├── repositories/
    │   ├── auth.repositories.js
    │   ├── usuario.repositories.js
    │   └── ...
    └── utils/
        ├── cpf.js              # Validação de CPF
        ├── jwt.js              # Helpers JWT
        ├── password.js         # Hash de senha
        └── ...
```

---

## 🔗 Próximos Passos

- [Guia Backend](./backend-guide.md) — como adicionar rotas
- [Guia Frontend](./frontend-guide.md) — como adicionar páginas
- [Guia de Banco](./database-guide.md) — como alterar BD

---

<div align="center">
  <a href="./">← Voltar a Desenvolvimento</a>
</div>
