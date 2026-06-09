# 🛠️ Setup Completo

← [Voltar a Getting Started](./)

Guia de instalação, configuração e ambiente. Para versão rápida, use o [Quickstart](./quickstart.md).

---

## 📋 Sumário
- [Pré-requisitos](#pré-requisitos)
- [Instalação Detalhada](#instalação-detalhada)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Banco de Dados](#banco-de-dados)
- [Scripts npm](#scripts-npm)
- [Estrutura de Pastas](#estrutura-de-pastas)

---

## Pré-requisitos

| Ferramenta | Versão | Instalação |
|------------|--------|------------|
| Node.js 18+ | LTS recomendado | [nodejs.org](https://nodejs.org/) |
| PostgreSQL 14+ | Servidor local ou Docker | [postgresql.org](https://www.postgresql.org/download/) |
| Git 2+ | Qualquer recente | [git-scm.com](https://git-scm.com/) |

---

## Instalação Detalhada

### 1. Clonar repositório
```bash
git clone https://github.com/DEVassos/scrum-flow-abp.git
cd scrum-flow-abp/app
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Copiar template de ambiente
```bash
cp .env.example .env
```

Depois edite `app/.env` e preencha as variáveis obrigatórias.

### 4. Criar banco de dados
```bash
createdb abp
```

### 5. Inicializar schemas e seeds
```bash
npm run db:init
```

> Este comando executa todos os SQLs em `src/infra/init/` na ordem numérica (01, 02, 03...).

---

## Variáveis de Ambiente

Arquivo: `app/.env`

| Variável | Descrição | Exemplo | Obrigatório |
|----------|-----------|---------|-------------|
| `PORT` | Porta do servidor Express | `3005` | Não (default 3005) |
| `POSTGRES_HOST` | Host do PostgreSQL | `localhost` | Sim |
| `POSTGRES_PORT` | Porta do PostgreSQL | `5432` | Sim |
| `POSTGRES_USER` | Usuário do PostgreSQL | `postgres` | Sim |
| `POSTGRES_PASSWORD` | Senha do PostgreSQL | — | Sim |
| `POSTGRES_DB` | Nome do banco | `abp` | Sim |
| `JWT_SECRET` | Segredo para assinar tokens JWT | string aleatória | Sim |
| `DEFAULT_EXPIRES_IN_SECONDS` | Expiração do token JWT | `600` | Sim |

### Gerando JWT_SECRET

**Linux/Mac:**
```bash
openssl rand -hex 32
```

**Windows:**
Use um gerador online ou Node.js:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

> ⚠️ **Nunca commitar `.env`** — já está em `.gitignore`.

---

## Banco de Dados

### Criar banco
```bash
createdb abp
```

### Estrutura de SQLs (`src/infra/init/`)

Executados em ordem numérica:
1. `01_schema_modulos.sql` — Tabela de módulos (1–5)
2. `02_schema_questoes.sql` — Banco de questões
3. `03_schema_usuarios.sql` — Cadastro de usuários (CPF único)
4. `04_schema_exames.sql` — Tentativas de avaliação
5. `05_schema_respostas.sql` — Respostas registradas
6. `06_seed_modulos.sql` — Dados iniciais (5 módulos)
7. `07_seed_questoes.sql` — Banco de questões

### Resetar tudo
```bash
dropdb abp && createdb abp && npm run db:init
```

### Inspecionar banco
```bash
psql abp

# Dentro do psql:
\dt              # listar tabelas
\d <tabela>      # descrever tabela
SELECT * FROM usuarios;  # ver dados
\q               # sair
```

---

## Scripts npm

| Comando | O que faz |
|---------|-----------|
| `npm start` | Sobe servidor (sem auto-reload) |
| `npm run dev` | Sobe com `--watch` (reload automático) |
| `npm run db:init` | Executa todos os SQLs em `src/infra/init/` |

---

## Estrutura de Pastas

```
app/
├── .env.example               # Template de variáveis
├── .env                       # ← Preencher (não commitar!)
├── .gitignore
├── package.json
├── package-lock.json
│
├── public/                    # Frontend estático
│   ├── assets/
│   │   ├── css/
│   │   │   ├── global.css         # Reset e variáveis
│   │   │   ├── components/        # CSS reutilizável
│   │   │   └── pages/             # CSS por página
│   │   └── js/
│   │       ├── auth.js            # Gerência de sessão JWT
│   │       ├── api.js             # Wrapper fetch autenticado
│   │       ├── index.js           # Lógica da home
│   │       └── dashboard.js       # Lógica do dashboard
│   └── pages/
│       ├── index.html
│       ├── cadastro.html
│       ├── login.html
│       └── dashboard.html
│
└── src/
    ├── database/
    │   └── db.js              # Pool de conexão PostgreSQL
    │
    ├── infra/
    │   ├── init/              # Schemas e seeds SQL (numerados)
    │   │   ├── 01_schema_modulos.sql
    │   │   ├── 02_schema_questoes.sql
    │   │   └── ...
    │   └── run-sql.js         # Runner do db:init
    │
    ├── middlewares/
    │   └── auth.middleware.js # Verificação de JWT
    │
    ├── repositories/          # Consultas SQL
    │   ├── usuario.repositories.js
    │   └── ...
    │
    ├── routes/                # Rotas Express
    │   ├── index.js
    │   ├── auth.routes.js
    │   └── ...
    │
    ├── utils/                 # Helpers
    │   ├── cpf.js
    │   ├── jwt.js
    │   └── password.js
    │
    └── server.js              # Entry point
```

---

## 🔗 Próximos Passos

- [Troubleshooting & FAQ](./troubleshooting.md) — se tiver problemas
- [💻 Guia do Desenvolvedor](../_development/) — como contribuir

---

<div align="center">
  <a href="./">← Voltar a Getting Started</a>
</div>
