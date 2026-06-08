# 💻 Guia de Desenvolvimento

Para quem vai **contribuir com código**. Aqui estão todos os padrões, convenções e guias práticos.

---

## 📋 Sumário

- [Visão Geral da Arquitetura](#visão-geral-da-arquitetura)
- [Antes de Começar](#antes-de-começar)
- [Documentos Disponíveis](#documentos-disponíveis)

---

## 🏗️ Visão Geral da Arquitetura

**Stack:**
- **Backend:** Node.js + Express (CommonJS)
- **Frontend:** HTML/CSS/JavaScript puro (sem frameworks)
- **Banco:** PostgreSQL (sem ORM)

**Estrutura:**
```
Backend (src/)
├── server.js           ← Entry point
├── routes/             ← Rotas HTTP
├── repositories/       ← Consultas SQL
├── middlewares/        ← Autenticação, etc
├── utils/              ← Helpers (JWT, CPF, etc)
└── infra/
    ├── database/       ← Pool de conexão
    └── init/           ← Schemas e seeds SQL

Frontend (public/)
├── pages/              ← HTML
├── assets/
│   ├── css/            ← Componentes + páginas
│   └── js/             ← Scripts por página
```

---

## ✅ Antes de Começar

**Você fez isso?**

- ✅ [Rodou localmente](../getting-started/quickstart.md)
- ✅ Leu [CONTRIBUTING.md](../CONTRIBUTING.md)
- ✅ Entendeu as [Convenções de Código](#documentos-disponíveis)
- ✅ Pegou uma história no Sprint Backlog

Se não, faça antes!

---

## 📚 Documentos Disponíveis

| Documento | Para quem | O que cobre |
|-----------|-----------|------------|
| [architecture.md](./architecture.md) | Todos | Visão geral, camadas, padrões |
| [backend-guide.md](./backend-guide.md) | Backend devs | Rotas, repos, middlewares |
| [frontend-guide.md](./frontend-guide.md) | Frontend devs | Estrutura de páginas, CSS, JS |
| [database-guide.md](./database-guide.md) | Backend + DBAs | Scripts SQL, migrations, queries |
| [api-reference.md](./api-reference.md) | Todos | Endpoints disponíveis, autenticação |

---

## 🚀 Fluxo de Contribuição (Rápido)

```bash
# 1. Criar branch a partir de develop
git checkout develop
git pull origin develop
git checkout -b feature/US01-descricao-curta

# 2. Fazer as mudanças
# 3. Testar localmente
# 4. Commit com padrão
git add .
git commit -m "feat: implementa US01 - cadastro de usuários"

# 5. Push e abrir PR
git push origin feature/US01-descricao-curta

# 6. Atualizar documentação relacionada no PR
```

**Detalhes completos:** [CONTRIBUTING.md](../CONTRIBUTING.md)

---

## 📖 Convenções de Código

### Backend (Node.js)

| Padrão | Exemplos |
|--------|----------|
| **Modelos** | CommonJS (`require`/`module.exports`) |
| **Nomes de arquivos** | `kebab-case` (ex: `user-routes.js`) |
| **Nomes de funções** | `camelCase` (ex: `getUserById`) |
| **Constantes** | `UPPER_SNAKE_CASE` (ex: `MAX_ATTEMPTS`) |

### Frontend (HTML/CSS/JS)

| Padrão | Exemplos |
|--------|----------|
| **Arquivos CSS** | Um por página (`dashboard.css`) + componentes (`button.css`) |
| **Seletores CSS** | `kebab-case` (ex: `.auth-button`) |
| **IDs HTML** | `camelCase` (ex: `id="loginForm"`) |
| **Classes HTML** | `kebab-case` (ex: `class="form-group"`) |
| **Scripts JS** | Um por página (`dashboard.js`) |

### Banco de Dados (SQL)

| Padrão | Exemplos |
|--------|----------|
| **Tabelas** | `snake_case` (ex: `usuario_modulo`) |
| **Colunas** | `snake_case` (ex: `created_at`) |
| **Constraints** | `pk_<tabela>`, `fk_<tabela>_<coluna>` |
| **Índices** | `idx_<tabela>_<coluna>` |

---

## 🤝 Como Contribuir

1. **Crie sua branch** — sempre a partir de `develop`
2. **Faça as mudanças** — código + testes + docs
3. **Commit com mensagem clara** — [Conventional Commits](../CONTRIBUTING.md)
4. **Abra PR** — descreva o que fez
5. **Aguarde revisão** — de pelo menos 1 colega
6. **Atualize a documentação** — se relevante

---

## 📚 Próximos Passos

Escolha seu caminho:

- 🏗️ [Arquitetura Geral](./architecture.md)
- 💻 [Guia Backend](./backend-guide.md)
- 🎨 [Guia Frontend](./frontend-guide.md)
- 🗄️ [Guia de Banco de Dados](./database-guide.md)
- 📡 [Referência da API](./api-reference.md)

---

<div align="center">
  <a href="../README.md">📚 Índice da Documentação</a>
</div>
