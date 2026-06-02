# ScrumFlow — Aplicação

**Sprint 1 · ABP 1DSM 2026/1 · FATEC Jacareí**

> Portal web de certificação em metodologias ágeis. Esta pasta contém o código-fonte completo da aplicação (backend Node.js + frontend estático HTML/CSS/JS puro).

---

## 📋 Sumário
- [Instalação Rápida](#instalação-rápida)
- [Arquitetura](#arquitetura)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Fluxo de Cadastro](#fluxo-de-cadastro)
- [Fluxo de Login](#fluxo-de-login)
- [Rotas da API](#rotas-da-api)
- [Páginas](#páginas)
- [Scripts](#scripts)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Dependências](#dependências)

---

## Instalação Rápida

```bash
cp .env.example .env   # preencha POSTGRES_PASSWORD e JWT_SECRET
npm install
createdb abp
npm run db:init
npm run dev
```

Acesse: [http://localhost:3005](http://localhost:3005)

> Guia detalhado em [docs/01-QUICKSTART.md](../docs/01-QUICKSTART.md).

---

## Arquitetura

O ScrumFlow adota uma arquitetura **cliente-servidor em três camadas**:

```
┌─────────────────────────────────────────────────┐
│                   CLIENTE                        │
│  HTML + CSS + JavaScript puro (sem frameworks)  │
│  Páginas estáticas servidas pelo próprio Express │
└─────────────────────┬───────────────────────────┘
                      │ HTTP (fetch + JWT)
                      ▼
┌─────────────────────────────────────────────────┐
│                   SERVIDOR                       │
│  Node.js + Express 5                            │
│                                                  │
│  Rotas (/api/*)                                  │
│    └─ Repositories (consultas SQL)               │
│         └─ Pool de Conexão (pg)                  │
└─────────────────────┬───────────────────────────┘
                      │ SQL
                      ▼
┌─────────────────────────────────────────────────┐
│                   BANCO DE DADOS                 │
│  PostgreSQL 14+                                  │
│  DDL e DML explícitos (sem ORM)                  │
└─────────────────────────────────────────────────┘
```

### Camadas do backend

| Camada | Pasta | Responsabilidade |
|--------|-------|-----------------|
| **Rotas** | `src/routes/` | Receber requisições HTTP, validar campos, acionar repository |
| **Repositories** | `src/repositories/` | Executar consultas SQL, encapsular transações |
| **Database** | `src/database/` | Pool de conexões PostgreSQL |
| **Middlewares** | `src/middlewares/` | Interceptar rotas protegidas, validar JWT |
| **Utils** | `src/utils/` | Helpers reutilizáveis: CPF, JWT, senha |

### Autenticação

A autenticação é **stateless via JWT**:
1. Login bem-sucedido → backend emite um token JWT assinado
2. Frontend armazena o token no `localStorage`
3. Requisições subsequentes incluem `Authorization: Bearer <token>`
4. Middleware valida o token e injeta `req.usuario` na requisição

### Frontend

O frontend é composto por **páginas HTML estáticas** servidas diretamente pelo Express. Não há framework — toda a interação usa JavaScript puro, `fetch` nativo e manipulação direta do DOM.

Dois arquivos utilitários compartilhados entre páginas:
- `auth.js` — gerência de sessão JWT no `localStorage`
- `api.js` — wrapper de `fetch` que injeta o token automaticamente e redireciona em caso de 401

---

## Estrutura de Pastas

```
app/
├── .env.example               # Template de variáveis de ambiente
├── package.json
├── public/                    # Frontend estático
│   ├── assets/
│   │   ├── css/
│   │   │   ├── global.css          # Reset e variáveis CSS (paleta de cores)
│   │   │   ├── components/
│   │   │   │   ├── blob.css        # Formas decorativas animadas
│   │   │   │   ├── button.css      # Componente de botão
│   │   │   │   ├── checkbox.css    # Checkbox customizado
│   │   │   │   ├── content.css     # Wrappers de conteúdo
│   │   │   │   ├── modal.css       # Modal lateral deslizante
│   │   │   │   ├── navbar.css      # Barra de navegação
│   │   │   │   └── validacao.css   # Feedback de erros em formulários
│   │   │   └── pages/
│   │   │       ├── index.css       # Layout da home
│   │   │       └── dashboard.css   # Layout do dashboard
│   │   └── js/
│   │       ├── auth.js        # Gerência de sessão JWT (localStorage)
│   │       ├── api.js         # Wrapper fetch autenticado
│   │       ├── index.js       # Lógica da home (modal, login, cadastro)
│   │       └── dashboard.js   # Lógica do dashboard (proteção de rota)
│   └── pages/
│       ├── index.html         # Home / Landing Page
│       ├── dashboard.html     # Dashboard de módulos (autenticado)
│       ├── scrum.html         # Conteúdo sobre Scrum
│       ├── manifesto.html     # Manifesto Ágil (12 princípios)
│       ├── hello.html         # Página de boas-vindas (em elaboração)
│       └── not-found.html     # Página 404
└── src/
    ├── database/
    │   └── db.js              # Pool de conexão PostgreSQL (POSTGRES_*)
    ├── infra/
    │   ├── init/              # Schemas e seeds SQL (executados por db:init)
    │   │   ├── 01_schema_modulos.sql
    │   │   ├── 02_schema_questoes.sql
    │   │   ├── 03_schema_usuarios.sql
    │   │   ├── 04_schema_exames.sql
    │   │   ├── 05_schema_respostas.sql
    │   │   ├── 06_seed_modulos.sql   # 4 módulos
    │   │   └── 07_seed_questoes.sql  # 150 questões
    │   └── run-sql.js         # Runner do db:init
    ├── middlewares/
    │   └── auth.middleware.js # Valida JWT e injeta req.usuario
    ├── repositories/
    │   └── usuarios.repositories.js  # Consultas SQL de usuários e exames
    ├── routes/
    │   ├── index.js           # Agregador de rotas (/api/*)
    │   ├── auth.routes.js     # POST /api/auth/login
    │   └── usuarios.routes.js # POST /api/usuarios
    ├── utils/
    │   ├── cpf.js             # Sanitização e validação de CPF (algoritmo Receita Federal)
    │   ├── jwt.js             # createToken / verifyToken
    │   └── password.js        # Hash e verificação de senha (scrypt + salt)
    └── server.js              # Entry point
```

---

## Fluxo de Cadastro

O cadastro envolve validação dupla (cliente e servidor) e uma **transação atômica** no banco que inicializa o perfil do usuário.

```
[Usuário] preenche form-cadastro na home (index.html)
    │
    ▼
[index.js] validação client-side
    ├─ nome obrigatório
    ├─ CPF válido (algoritmo dos dígitos verificadores)
    ├─ e-mail válido (regex)
    ├─ senha ≥ 8 caracteres
    └─ confirmação de senha idêntica
    │
    ▼ POST /api/usuarios  { nome, email, cpf, senha }
    │
[usuarios.routes.js] validação server-side
    ├─ campos obrigatórios
    ├─ CPF sanitizado e revalidado
    └─ senha ≥ 8 caracteres
    │
    ▼
[usuarios.repositories.js] → createUsuario()  ← TRANSAÇÃO
    ├─ 1. insertUsuario()
    │       ├─ gera certificado_hash único (24 bytes hex)
    │       ├─ gera salt único (16 bytes hex)
    │       ├─ aplica scrypt(senha + salt) → hash 64 bytes
    │       └─ persiste: nome, email, cpf, hash:salt, certificado_hash
    │
    ├─ 2. findPrimeiroModuloId()
    │       └─ busca o primeiro módulo disponível
    │
    ├─ 3. findGrupoAleatorio(id_modulo)
    │       └─ sorteia um grupo de questões do módulo
    │
    ├─ 4. insertExame()
    │       └─ cria a 1ª tentativa do usuário (exame inicial)
    │
    └─ COMMIT (sucesso) ou ROLLBACK (qualquer erro)
    │
    ▼
[Resposta]
    ├─ 201 Created   → frontend volta para o modal de login
    ├─ 409 Conflict  → "CPF ou e-mail já cadastrado" (constraint UNIQUE)
    └─ 400 Bad Request → erro de validação com mensagem específica
```

> **Segurança:** o hash de senha usa **scrypt** com salt único por usuário e comparação **timing-safe** (`crypto.timingSafeEqual`) para evitar timing attacks.

---

## Fluxo de Login

```
[Usuário] preenche form-login na home (index.html)
    │
    ▼
[index.js] validação client-side
    ├─ CPF válido
    └─ senha não vazia
    │
    ▼ POST /api/auth/login  { cpf, senha }
    │
[auth.routes.js] validação server-side
    └─ CPF e senha presentes
    │
    ▼
[usuarios.repositories.js] → findUsuarioByCpfAndSenha()
    ├─ busca usuário pelo CPF
    ├─ desempacota salt:hash armazenado
    ├─ aplica scrypt(senha_informada + salt)
    └─ compara com timingSafeEqual()
    │
    ▼
[auth.routes.js] → createToken({ id_usuario })
    └─ JWT assinado com JWT_SECRET, expira em DEFAULT_EXPIRES_IN_SECONDS
    │
    ▼
[Resposta 200]  { token, nome }
    │
    ▼
[index.js] → auth.salvarToken(token, nome)
    └─ persiste no localStorage
    │
    ▼
[Redireciona para dashboard.html]
    │
    ▼
[dashboard.js] → auth.estaAutenticado()
    ├─ decodifica JWT do localStorage
    ├─ verifica campo exp (expiração)
    └─ se inválido/expirado → redireciona para index.html
```

---

## Rotas da API

Base: `http://localhost:3005/api`

### `POST /api/usuarios` — Cadastro

**Body:**
```json
{ "nome": "João Silva", "email": "joao@email.com", "cpf": "123.456.789-09", "senha": "minhasenha123" }
```

| Status | Situação |
|--------|----------|
| `201 Created` | Usuário criado com sucesso |
| `400 Bad Request` | Campo faltando, CPF inválido ou senha < 8 chars |
| `409 Conflict` | CPF ou e-mail já cadastrado |
| `500 Internal Server Error` | Erro inesperado |

---

### `POST /api/auth/login` — Login

**Body:**
```json
{ "cpf": "123.456.789-09", "senha": "minhasenha123" }
```

**Resposta `200 OK`:**
```json
{ "token": "<JWT>", "nome": "João Silva" }
```

| Status | Situação |
|--------|----------|
| `200 OK` | Login bem-sucedido, retorna JWT |
| `400 Bad Request` | CPF ou senha ausentes |
| `401 Unauthorized` | Credenciais inválidas |

---

### Rotas protegidas (Sprint 2+)

Inclua o token no header:
```
Authorization: Bearer <token>
```

O middleware verifica o JWT, busca o usuário no banco e injeta `req.usuario` na rota.

---

## Páginas

| Arquivo | Título | Descrição |
|---------|--------|-----------|
| `index.html` | ScrumFlow \| Home | Landing page com modal de login/cadastro |
| `dashboard.html` | ScrumFlow \| Dashboard | Painel de módulos (requer autenticação) |
| `sobre.html` | ScrumFlow \| Sobre | Página institucional do projeto ABP e da equipe |
| `scrum.html` | SF \| Scrum \| Índice | Conteúdo estático sobre Scrum |
| `manifesto.html` | SF \| Manifesto Ágil | Os 12 princípios com navegação por âncoras |
| `hello.html` | ScrumFlow \| Olá | Página de boas-vindas (em elaboração) |
| `not-found.html` | ScrumFlow \| 404 | Página de erro com ilustração |

---

## Scripts

| Comando | O que faz |
|---------|-----------|
| `npm start` | Sobe o servidor (sem watch) |
| `npm run dev` | Sobe com `--watch` (reload automático) |
| `npm run db:init` | Executa os 7 SQLs de `src/infra/init/` em ordem |

---

## Variáveis de Ambiente

Copie `.env.example` para `.env` e preencha os valores:

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `PORT` | Porta do servidor | `3005` |
| `POSTGRES_HOST` | Host do PostgreSQL | `localhost` |
| `POSTGRES_PORT` | Porta do PostgreSQL | `5432` |
| `POSTGRES_USER` | Usuário do banco | `postgres` |
| `POSTGRES_PASSWORD` | Senha do banco | — |
| `POSTGRES_DB` | Nome do banco | `abp` |
| `JWT_SECRET` | Chave de assinatura JWT | — |
| `DEFAULT_EXPIRES_IN_SECONDS` | Expiração do token em segundos | `600` |

---

## Dependências

| Pacote | Versão | Uso |
|--------|--------|-----|
| `express` | ^5.2.1 | Framework HTTP |
| `pg` | ^8.20.0 | Driver PostgreSQL |
| `dotenv` | ^17.4.2 | Variáveis de ambiente |
| `jsonwebtoken` | ^9.0.3 | Geração e validação de JWT |

> `crypto` é módulo nativo do Node.js — usado para hash de senha com scrypt e geração de `certificado_hash`.

---

*ScrumFlow · Sprint 1 · Equipe DEVassos · 1DSM 2026/1*
