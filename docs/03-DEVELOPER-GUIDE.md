# 💻 Guia do Desenvolvedor

← [Índice da Documentação](./00-INDICE.md)

Guia para quem vai contribuir com código. Para subir a app, veja [Quickstart](./01-QUICKSTART.md).

---

## 📋 Sumário
- [Visão Geral da Arquitetura](#visão-geral-da-arquitetura)
- [Convenções de Código](#convenções-de-código)
- [Como Adicionar uma Nova Rota](#como-adicionar-uma-nova-rota)
- [Como Adicionar uma Nova Página](#como-adicionar-uma-nova-página)
- [Trabalhando com o Banco](#trabalhando-com-o-banco)
- [Debug](#debug)
- [Fluxo de Contribuição](#fluxo-de-contribuição)

---

## Visão Geral da Arquitetura

**Backend (Express 5, CommonJS):**
- Entry point: `app/src/server.js`
- API prefixada em `/api` — sub-rotas: `/api/usuarios`, `/api/auth`
- Camadas: `routes` → `repositories` → `database`
- Auth via JWT: middleware em `src/middlewares/auth.middleware.js`
- Helpers: `src/utils/cpf.js`, `src/utils/jwt.js`, `src/utils/password.js`

**Frontend (HTML/CSS/JS puro — sem frameworks):**
- Páginas em `app/public/pages/`
- Assets em `app/public/assets/css/` (componentes) e `assets/css/pages/` (CSS específico por página)
- Scripts em `app/public/assets/js/`
- `assets/js/auth.js` — gerência de sessão JWT (localStorage) — carregar primeiro
- `assets/js/api.js` — wrapper `fetch` autenticado com injeção automática de token
- `assets/js/index.js` — lógica da home (modal, cadastro, login)
- `assets/js/dashboard.js` — lógica do dashboard (proteção de rota)

**Banco (PostgreSQL — DDL puro, sem ORM):**
- Schemas e seeds em `src/infra/init/` (7 arquivos numerados)
- Pool de conexão: `src/database/db.js` (variáveis `POSTGRES_*`)

---

## Convenções de Código

### Backend
| O que | Padrão |
|-------|--------|
| Arquivos de rota | `*.routes.js` |
| Arquivos de repositório | `*.repositories.js` |
| Arquivos de middleware | `*.middleware.js` |
| Utilitários | `utils/<dominio>.js` |
| Módulos | CommonJS (`require`/`module.exports`) |

### Frontend
| O que | Padrão |
|-------|--------|
| Páginas | `public/pages/<nome>.html` |
| CSS de componente | `public/assets/css/components/<componente>.css` |
| CSS de página | `public/assets/css/pages/<nome>.css` |
| JS por página | `public/assets/js/<nome>.js` |
| Sem frameworks | JS puro — `fetch`, `localStorage`, DOM nativo |

### Nomenclatura
| Onde | Padrão |
|------|--------|
| Pastas e arquivos | `kebab-case` |
| Funções/variáveis JS | `camelCase` |
| Constantes | `UPPER_SNAKE_CASE` |
| Colunas e tabelas SQL | `snake_case` |

---

## Como Adicionar uma Nova Rota

1. Criar `src/routes/<recurso>.routes.js`:
   ```javascript
   const { Router } = require('express');
   const router = Router();

   router.get('/', async (req, res) => {
     res.json({ ok: true });
   });

   module.exports = router;
   ```

2. Registrar em `src/routes/index.js`:
   ```javascript
   const meuRecurso = require('./meu-recurso.routes');
   router.use('/meu-recurso', meuRecurso);
   ```

3. Criar repositório em `src/repositories/<recurso>.repositories.js` para consultas SQL.

4. Para rotas protegidas, adicionar middleware:
   ```javascript
   const authMiddleware = require('../middlewares/auth.middleware');
   router.get('/protegido', authMiddleware, handler);
   ```

---

## Como Adicionar uma Nova Página

1. Criar `public/pages/minha-pagina.html`
2. CSS da página em `public/assets/css/pages/minha-pagina.css`
3. JS específico em `public/assets/js/minha-pagina.js`

Para chamadas à API autenticadas, importar os helpers:
```html
<script src="/assets/js/auth.js"></script>
<script src="/assets/js/api.js"></script>
<script src="/assets/js/minha-pagina.js"></script>
```

---

## Trabalhando com o Banco

- Nunca executar DML avulso — sempre via script versionado
- Novas tabelas: criar `src/infra/init/NN_schema_<nome>.sql` (numerar em sequência)
- Para resetar: `dropdb abp && createdb abp && npm run db:init`
- Para inspecionar:
  ```bash
  psql abp
  # \dt              → listar tabelas
  # \d <tabela>      → descrever colunas e tipos
  # SELECT * FROM usuarios LIMIT 5;
  ```

---

## Debug

### Backend
```bash
node --inspect src/server.js
# Abrir chrome://inspect no navegador → clicar em "inspect"
```

### Frontend
DevTools do navegador (F12):
- **Network** → ver requisições para `/api/*`
- **Console** → erros JS e logs
- **Application → Local Storage** → ver token JWT

### Banco
```bash
psql abp
# Verificar se os dados foram inseridos corretamente
SELECT cpf, nome, email FROM usuarios;
```

---

## Fluxo de Contribuição

1. Pegar tarefa do Sprint Backlog ([sprint-1.md](./scrum/sprint-1/sprint-1.md))
2. Criar branch a partir de `develop`:
   ```bash
   git checkout develop && git pull
   git checkout -b feature/USXX-descricao-curta
   ```
3. Codar + testar localmente
4. Commit seguindo [Conventional Commits](../CONTRIBUTING.md#convenção-de-commits)
5. Push e abrir PR contra `develop`
6. Aguardar revisão de ao menos 1 par
7. **Atualizar a documentação relacionada no mesmo PR**

> Detalhes completos: [CONTRIBUTING.md](../CONTRIBUTING.md)

---

## 🔗 Próximos Passos
- 🤝 [CONTRIBUTING.md](../CONTRIBUTING.md)
- 🔄 [Gestão Ágil (Scrum)](./scrum/README.md)

---

<div align="center">
  <a href="./00-INDICE.md">← Voltar ao Índice</a>
</div>
