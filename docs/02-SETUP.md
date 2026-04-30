# 🛠️ Setup Completo

← [Índice da Documentação](./00-INDICE.md)

Guia de instalação, configuração e troubleshooting. Para versão rápida, use o [Quickstart](./01-QUICKSTART.md).

---

## 📋 Sumário
- [Pré-requisitos](#pré-requisitos)
- [Instalação Detalhada](#instalação-detalhada)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Banco de Dados](#banco-de-dados)
- [Scripts npm](#scripts-npm)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Troubleshooting](#troubleshooting)

---

## Pré-requisitos

| Ferramenta | Versão | Instalação |
|------------|--------|------------|
| Node.js 18+ | LTS recomendado | [nodejs.org](https://nodejs.org/) |
| PostgreSQL 14+ | Servidor local ou Docker | [postgresql.org](https://www.postgresql.org/download/) |
| Git 2+ | Qualquer recente | [git-scm.com](https://git-scm.com/) |

---

## Instalação Detalhada

### 1. Clonar e entrar na pasta do app
```bash
git clone https://github.com/DEVassos/scrum-flow-abp.git
cd scrum-flow-abp/app
```
> A pasta `app/` contém frontend estático e backend Node no mesmo módulo.

### 2. Instalar dependências
```bash
npm install
```
Instala: `express`, `pg`, `dotenv`, `jsonwebtoken`.

### 3. Copiar template de ambiente
```bash
cp .env.example .env
```
Depois edite `app/.env` e preencha `POSTGRES_PASSWORD` e `JWT_SECRET`.

> 💡 Para gerar `JWT_SECRET`: `openssl rand -hex 32` (Linux/Mac) ou use um gerador de string aleatória online.

---

## Variáveis de Ambiente

| Variável | Descrição | Exemplo | Obrigatório |
|----------|-----------|---------|-------------|
| `PORT` | Porta do servidor Express | `3005` | Não (default 3005) |
| `POSTGRES_HOST` | Host do PostgreSQL | `localhost` | Sim |
| `POSTGRES_PORT` | Porta do PostgreSQL | `5432` | Sim |
| `POSTGRES_USER` | Usuário do PostgreSQL | `postgres` | Sim |
| `POSTGRES_PASSWORD` | Senha do PostgreSQL | — | Sim |
| `POSTGRES_DB` | Nome do banco | `abp` | Sim |
| `JWT_SECRET` | Segredo para assinar tokens JWT | string aleatória longa | Sim |
| `DEFAULT_EXPIRES_IN_SECONDS` | Tempo de vida do token JWT | `600` | Sim |

> ⚠️ Nunca commitar `.env`. Está no `.gitignore`.

---

## Banco de Dados

### Criar o banco
```bash
createdb abp
```

### Schemas (ordem de criação)
Os arquivos em `app/src/infra/init/` são executados pelo `npm run db:init` na ordem numérica:

1. `01_schema_modulos.sql` — Tabela de módulos (níveis 1–5)
2. `02_schema_questoes.sql` — Banco de questões com classificação (fácil/médio/difícil)
3. `03_schema_usuarios.sql` — Cadastro de usuários (CPF único)
4. `04_schema_exames.sql` — Tentativas de avaliação
5. `05_schema_respostas.sql` — Respostas registradas por tentativa
6. `06_seed_modulos.sql` — Dados iniciais dos 5 módulos
7. `07_seed_questoes.sql` — Banco de questões inicial

### Resetar o banco
```bash
dropdb abp && createdb abp && npm run db:init
```

### Inspecionar tabelas
```bash
psql abp
# \dt          → listar tabelas
# \d <tabela>  → descrever uma tabela
# \q           → sair
```

---

## Scripts npm

| Comando | O que faz |
|---------|-----------|
| `npm start` | Sobe o servidor (sem watch) |
| `npm run dev` | Sobe com `--watch` (reload automático) |
| `npm run db:init` | Executa todos os SQLs de `src/infra/init/` em ordem |

---

## Estrutura de Pastas

```
app/
├── .env.example               # Template de variáveis de ambiente
├── package.json
├── public/                    # Frontend estático
│   ├── assets/
│   │   ├── css/
│   │   │   ├── global.css     # Variáveis e reset global
│   │   │   ├── components/    # CSS de componentes reutilizáveis
│   │   │   └── pages/         # CSS específico por página
│   │   └── js/                # Scripts (auth.js, api.js, index.js, dashboard.js)
│   └── pages/                 # Páginas HTML
└── src/
    ├── database/
    │   └── db.js              # Pool de conexão PostgreSQL
    ├── infra/
    │   ├── init/              # Schemas e seeds SQL (numerados)
    │   └── run-sql.js         # Runner do db:init
    ├── middlewares/
    │   └── auth.middleware.js # Verificação de JWT
    ├── repositories/          # Consultas SQL (acesso a dados)
    ├── routes/                # Rotas Express (/api/*)
    ├── utils/                 # Helpers: cpf.js, jwt.js, password.js
    └── server.js              # Entry point
```

---

## Troubleshooting

### `ECONNREFUSED 127.0.0.1:5432`
PostgreSQL não está rodando.
- **Linux:** `sudo service postgresql start`
- **macOS:** `brew services start postgresql`
- **Windows:** Abrir Services e iniciar `postgresql-x64-XX`

### `password authentication failed for user "postgres"`
Senha em `POSTGRES_PASSWORD` está errada. Confirmar com `psql -U postgres` no terminal.

### `database "abp" does not exist`
Faltou criar o banco: `createdb abp`

### Porta 3005 ocupada
Trocar `PORT` no `.env` ou matar o processo:
- **Linux/Mac:** `lsof -i :3005` → `kill -9 <PID>`
- **Windows:** `netstat -ano | findstr :3005` → `taskkill /PID <PID> /F`

### `npm install` falha
Limpar cache e tentar de novo:
```bash
rm -rf node_modules package-lock.json
npm install
```

### `JWT_SECRET` vazio ou inválido
Gerar nova chave aleatória e colar no `.env`. Sem isso, o login falha silenciosamente.

### `DEFAULT_EXPIRES_IN_SECONDS` ausente
O token JWT não consegue expirar. Adicionar `DEFAULT_EXPIRES_IN_SECONDS=600` no `.env`.

---

## 🔗 Próximos Passos
- 💻 [Guia do Desenvolvedor](./03-DEVELOPER-GUIDE.md)
- 🤝 [CONTRIBUTING.md](../CONTRIBUTING.md)

---

<div align="center">
  <a href="./00-INDICE.md">← Voltar ao Índice</a>
</div>
