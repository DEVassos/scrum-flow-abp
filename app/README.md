# ScrumFlow — Aplicação

**ABP 1DSM 2026/1 · FATEC Jacareí**

> Código-fonte da aplicação: backend Node.js + Express e frontend HTML/CSS/JS puro.

---

## Sumário

- [Instalação Rápida](#instalação-rápida)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Scripts](#scripts)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Páginas](#páginas)
- [Rotas da API](#rotas-da-api)
- [Arquitetura](#arquitetura)
- [Dependências](#dependências)

---

## Instalação Rápida

**Pré-requisitos:** Node.js 18+ e um PostgreSQL acessível via `DATABASE_URL` (ex.: [Neon](https://neon.tech), Supabase ou RDS — gerenciados, com SSL).

```bash
cp .env.example .env        # preencha DATABASE_URL e JWT_SECRET
npm install
npm run db:init             # cria as tabelas e insere os módulos + questões
npm run dev
```

Acesse: [http://localhost:3005](http://localhost:3005)

> O `npm run db:init` executa os SQLs de `src/infra/init/` no banco apontado por `DATABASE_URL` — não é necessário `createdb` quando se usa um banco gerenciado.

---

## Variáveis de Ambiente

Copie `.env.example` para `.env` e preencha os valores em branco:

| Variável | Descrição | Padrão |
|---|---|---|
| `PORT` | Porta do servidor | `3005` |
| `DATABASE_URL` | String de conexão PostgreSQL (usada pelo servidor **e** pelo `db:init`) | — |
| `JWT_SECRET` | Chave de assinatura JWT | — |
| `DEFAULT_EXPIRES_IN_SECONDS` | Duração do token em segundos | `600` |

> **Conexão (`src/database/db.js`):** a aplicação usa exclusivamente `DATABASE_URL` e ativa **SSL** sempre que ela está definida — por isso o banco precisa suportar SSL (caso de provedores gerenciados como o Neon). As variáveis `POSTGRES_*` do template estão **comentadas e não são utilizadas** atualmente. Para rodar contra um PostgreSQL local sem SSL, ajuste o `ssl` em `src/database/db.js`.

---

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Inicia o servidor com `--watch` (reload automático) |
| `npm start` | Inicia o servidor sem watch |
| `npm run db:init` | Executa os SQLs de `src/infra/init/` em ordem (cria tabelas + seeds) |

---

## Estrutura de Pastas

```
app/
├── .env.example
├── package.json
├── public/                        # Frontend estático
│   ├── assets/
│   │   ├── css/
│   │   │   ├── global.css              # Reset, variáveis e paleta de cores
│   │   │   ├── components/             # Estilos de componentes reutilizáveis
│   │   │   │   ├── blob.css            # Formas decorativas animadas
│   │   │   │   ├── button.css
│   │   │   │   ├── checkbox.css
│   │   │   │   ├── content.css
│   │   │   │   ├── modal.css
│   │   │   │   ├── navbar.css
│   │   │   │   └── validacao.css
│   │   │   └── pages/                  # Estilos específicos por página
│   │   └── js/
│   │       ├── auth.js                 # Sessão JWT no localStorage
│   │       ├── api.js                  # Wrapper fetch com token automático
│   │       ├── navbar.js               # Menu hamburguer e estado de autenticação
│   │       ├── stars.js                # Animação de estrelas do fundo
│   │       ├── index.js                # Home: modal de login e cadastro
│   │       ├── dashboard.js            # Dashboard: lista de módulos do usuário
│   │       ├── modulos.js              # Tela de seleção de módulo
│   │       ├── questoes.js             # Tela de avaliação (questão a questão)
│   │       ├── resultado.js            # Tela de resultado do módulo
│   │       ├── certificado.js          # Exibição e validação do certificado
│   │       ├── historicoQuestoes.js    # Histórico de respostas por módulo
│   │       └── configuracoes.js        # Configurações do usuário e painel admin
│   └── pages/
│       ├── index.html                  # Home / Landing Page
│       ├── dashboard.html              # Painel de progresso (autenticado)
│       ├── modulos.html                # Seleção de módulo (autenticado)
│       ├── certificado.html            # Visualização do certificado
│       ├── historicoquestoes.html      # Histórico de questões (autenticado)
│       ├── configuracoes.html          # Configurações + painel admin (autenticado)
│       ├── scrum.html                  # Conteúdo sobre Scrum
│       ├── manifesto.html              # Manifesto Ágil (12 princípios)
│       ├── sobre.html                  # Sobre o projeto e a equipe
│       └── not-found.html              # Página 404
└── src/
    ├── server.js                       # Entry point
    ├── database/
    │   └── db.js                       # Pool de conexão PostgreSQL
    ├── infra/
    │   ├── init/                       # SQLs executados por db:init (em ordem)
    │   │   ├── 01_schema_modulos.sql
    │   │   ├── 02_schema_questoes.sql
    │   │   ├── 03_schema_usuarios.sql
    │   │   ├── 04_schema_exames.sql
    │   │   ├── 05_schema_respostas.sql
    │   │   ├── 06_seed_modulos.sql
    │   │   ├── 07_seed_questoes.sql    # 150 questões
    │   │   └── 08_seed_schema_admin.sql
    │   └── run-sql.js                  # Runner do db:init
    ├── middlewares/
    │   ├── auth.middleware.js          # Valida JWT e injeta req.usuario
    │   ├── admin.middleware.js         # Verifica se req.usuario.is_admin === true
    │   └── ensureExame.middleware.js   # Garante que o usuário tenha um exame ativo
    ├── repositories/
    │   ├── usuarios.repositories.js    # Consultas de usuários
    │   ├── questoes.repositories.js    # Consultas de avaliação e progresso
    │   ├── certificados.repositories.js
    │   ├── adminQuestoes.repositories.js  # CRUD de questões (admin)
    │   └── adminModulos.repositories.js   # CRUD de módulos (admin)
    ├── routes/
    │   ├── index.js                    # Agrega todas as rotas em /api/*
    │   ├── auth.routes.js              # /api/auth
    │   ├── usuarios.routes.js          # /api/usuarios
    │   ├── questoes.routes.js          # /api/questoes
    │   ├── certificados.routes.js      # /api/certificados
    │   └── admin.routes.js             # /api/admin (requer auth + admin)
    └── utils/
        ├── cpf.js                      # Validação de CPF (algoritmo Receita Federal)
        ├── jwt.js                      # createToken / verifyToken
        └── password.js                 # scrypt + salt, comparação timing-safe
```

---

## Páginas

| Página | URL | Autenticação | Descrição |
|---|---|---|---|
| Home | `/` | Não | Landing page com modal de login e cadastro |
| Dashboard | `/pages/dashboard.html` | Sim | Progresso geral: módulos concluídos e notas |
| Módulos | `/pages/modulos.html` | Sim | Seleção do módulo para iniciar ou retomar |
| Avaliação | *(via modulos.html)* | Sim | Questão a questão com timer |
| Resultado | `/pages/resultado.html` | Sim | Pontuação e gabarito do módulo concluído |
| Histórico | `/pages/historicoquestoes.html` | Sim | Respostas dadas em cada módulo |
| Certificado | `/pages/certificado.html` | Não* | Exibe certificado por hash (validação pública) |
| Configurações | `/pages/configuracoes.html` | Sim | Dados do usuário + painel admin (se admin) |
| Scrum | `/pages/scrum.html` | Não | Conteúdo educacional sobre Scrum |
| Manifesto | `/pages/manifesto.html` | Não | Manifesto Ágil e os 12 princípios |
| Sobre | `/pages/sobre.html` | Não | Sobre o projeto e a equipe |
| 404 | `/pages/not-found.html` | Não | Página de erro |

*O certificado pode ser acessado sem login via hash único na URL.

---

## Rotas da API

Base: `http://localhost:3005/api`

Rotas protegidas exigem o header:
```
Authorization: Bearer <token>
```

### Autenticação

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/auth/login` | Login por CPF e senha. Retorna `{ token, nome }` |

**Body de login:**
```json
{ "cpf": "123.456.789-09", "senha": "minhasenha123" }
```

---

### Usuários

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| `POST` | `/usuarios` | Não | Cadastra novo usuário |

**Body de cadastro:**
```json
{ "nome": "João Silva", "email": "joao@email.com", "cpf": "123.456.789-09", "senha": "minhasenha123" }
```

| Status | Situação |
|---|---|
| `201` | Usuário criado |
| `400` | Campo inválido ou faltando |
| `409` | CPF ou e-mail já cadastrado |

---

### Questões e Avaliação

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/questoes/proxima-questao` | Retorna a próxima questão não respondida do módulo atual |
| `POST` | `/questoes/responder` | Registra a resposta de uma questão |
| `PATCH` | `/questoes/proxima-tentativa` | Inicia a 2ª tentativa no módulo atual (com grupo diferente) |
| `PATCH` | `/questoes/proximo-modulo` | Avança para o próximo módulo após concluir o atual |
| `GET` | `/questoes/modulos` | Lista todos os módulos com o progresso do usuário |
| `GET` | `/questoes/modulos-respondidos` | Lista os módulos que o usuário já concluiu |
| `GET` | `/questoes/historico/:idModulo` | Retorna as questões e respostas da última tentativa de um módulo |

**Body de responder:**
```json
{ "id_exame": 1, "id_questao": 42, "resposta": "b" }
```

---

### Certificados

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| `POST` | `/certificados` | Sim | Obtém o hash do certificado do usuário logado |
| `GET` | `/certificados/hash/:hash` | Não | Busca os dados de um certificado pelo hash (validação pública) |

O certificado só é retornado quando o usuário concluiu todos os módulos. O hash é gerado no cadastro e é único por usuário.

---

### Administração

> Todas as rotas abaixo exigem autenticação **e** `is_admin = true` no token.

#### Usuários

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/admin/usuarios` | Lista todos os usuários |
| `GET` | `/admin/usuarios-progresso` | Lista usuários com o progresso atual de cada um |
| `PATCH` | `/admin/usuarios/:id/reset-senha` | Gera senha temporária e retorna no corpo da resposta |
| `PATCH` | `/admin/usuarios/:id/zerar-modulo` | Apaga as respostas do módulo atual e reseta tentativa para 1 |
| `PATCH` | `/admin/usuarios/:id/reiniciar` | Apaga todas as respostas e volta o usuário ao Módulo 1 |

#### Questões

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/admin/questoes` | Lista todas as questões |
| `GET` | `/admin/questoes/:id` | Busca questão por ID |
| `POST` | `/admin/questoes` | Cria nova questão |
| `PUT` | `/admin/questoes/:id` | Atualiza questão existente |
| `DELETE` | `/admin/questoes/:id` | Remove questão |

**Body de questão (criação/edição):**
```json
{
  "id_modulo": 1,
  "grupo": 1,
  "numero": 1,
  "dificuldade": "facil",
  "enunciado": "Texto da pergunta",
  "alternativa_a": "...",
  "alternativa_b": "...",
  "alternativa_c": "...",
  "alternativa_d": "...",
  "alternativa_correta": "b"
}
```

#### Módulos (Níveis)

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/admin/niveis` | Lista todos os módulos |
| `GET` | `/admin/niveis/:id` | Busca módulo por ID |
| `POST` | `/admin/niveis` | Cria novo módulo (`{ "titulo": "Nome" }`) |
| `PUT` | `/admin/niveis/:id` | Atualiza título do módulo |
| `DELETE` | `/admin/niveis/:id` | Remove módulo (falha se houver questões vinculadas) |

---

## Arquitetura

Arquitetura **cliente-servidor em três camadas**:

```
CLIENTE (HTML + CSS + JS puro)
    │  HTTP (fetch + JWT no header)
    ▼
SERVIDOR (Node.js + Express 5)
    │  routes → repositories → SQL
    ▼
BANCO DE DADOS (PostgreSQL 14+)
```

**Camadas do backend:**

| Camada | Pasta | Responsabilidade |
|---|---|---|
| Rotas | `src/routes/` | Receber a requisição, validar campos, acionar o repository |
| Repositórios | `src/repositories/` | Executar o SQL e encapsular transações |
| Banco | `src/database/` | Pool de conexões PostgreSQL |
| Middlewares | `src/middlewares/` | JWT, verificação de admin, garantia de exame ativo |
| Utils | `src/utils/` | CPF, JWT, hash de senha |

**Autenticação:** stateless via JWT. O token é emitido no login, armazenado no `localStorage` e enviado em todas as requisições protegidas via header `Authorization: Bearer`.

**Hash de senha:** `scrypt` com salt único por usuário e comparação `timingSafeEqual` (resistente a timing attacks).

---

## Dependências

| Pacote | Versão | Uso |
|---|---|---|
| `express` | ^5.2.1 | Framework HTTP |
| `pg` | ^8.20.0 | Driver PostgreSQL |
| `dotenv` | ^17.4.2 | Variáveis de ambiente |
| `jsonwebtoken` | ^9.0.3 | Geração e validação de JWT |

> `crypto` é módulo nativo do Node.js — usado para `scrypt` e geração do `certificado_hash`.

---

*ScrumFlow · Equipe DEVassos · 1DSM 2026/1*
