# 🛠️ Setup — Banco de Dados, Scripts e Troubleshooting

← [Índice da Documentação](../README.md)

Complementa o [Quickstart](./01-quickstart.md) com gestão do banco, scripts e solução de problemas.

> **Onde está o resto?**
> - Passo a passo de instalação → [01-quickstart.md](./01-quickstart.md)
> - Variáveis de ambiente (lista completa) e rotas da API → [app/README.md](../../app/README.md)

---

## 📋 Sumário
- [Banco de Dados](#banco-de-dados)
- [Scripts npm](#scripts-npm)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Troubleshooting](#troubleshooting)

---

## Banco de Dados

A aplicação conecta pelo **`DATABASE_URL`** (string de conexão completa, com SSL). Recomenda-se um PostgreSQL gerenciado — ex.: [Neon](https://neon.tech), Supabase ou RDS. Nesses provedores o banco já vem provisionado; basta apontar `DATABASE_URL` para ele. (Ver [app/README.md → Variáveis de Ambiente](../../app/README.md#variáveis-de-ambiente).)

### Criar as tabelas e carregar os dados
```bash
npm run db:init
```
Executa todos os SQLs de `app/src/infra/init/` no banco apontado por `DATABASE_URL`, em ordem numérica:

| Arquivo | Conteúdo |
|---|---|
| `01_schema_modulos.sql` | Tabela de módulos (1–5) |
| `02_schema_questoes.sql` | Banco de questões com classificação (fácil/médio/difícil) |
| `03_schema_usuarios.sql` | Cadastro de usuários (CPF único) |
| `04_schema_exames.sql` | Tentativas de avaliação |
| `05_schema_respostas.sql` | Respostas registradas por tentativa |
| `06_seed_modulos.sql` | Dados iniciais dos 5 módulos |
| `07_seed_questoes.sql` | Banco de questões inicial |
| `08_seed_schema_admin.sql` | Estrutura e seed do administrador |

> Modelagem detalhada das tabelas: [modelos/bd/README.md](../modelos/bd/README.md).

### Inspecionar / resetar
Use a `DATABASE_URL` diretamente com o `psql`:
```bash
psql "$DATABASE_URL"
# \dt          → listar tabelas
# \d <tabela>  → descrever uma tabela
# \q           → sair
```
Para recriar do zero, recrie/limpe o banco pelo painel do provedor (ou faça `DROP`/`TRUNCATE` das tabelas) e rode `npm run db:init` novamente.

---

## Scripts npm

| Comando | O que faz |
|---------|-----------|
| `npm start` | Sobe o servidor (sem watch) |
| `npm run dev` | Sobe com `--watch` (reload automático) |
| `npm run db:init` | Executa todos os SQLs de `src/infra/init/` em ordem |
| `npm run db:dev-cert -- <CPF>` | Atalho de dev: simula conclusão de todos os módulos ([detalhes](./seed-dev-cert.md)) |

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
│   │   └── js/                # Scripts (auth.js, api.js, dashboard.js…)
│   └── pages/                 # Páginas HTML
└── src/
    ├── database/db.js         # Pool de conexão PostgreSQL
    ├── infra/
    │   ├── init/              # Schemas e seeds SQL (numerados)
    │   └── run-sql.js         # Runner do db:init
    ├── middlewares/           # Verificação de JWT e perfil admin
    ├── repositories/          # Consultas SQL (acesso a dados)
    ├── routes/                # Rotas Express (/api/*)
    ├── utils/                 # Helpers: cpf.js, jwt.js, password.js
    └── server.js              # Entry point
```

---

## Troubleshooting

### `DATABASE_URL` vazio / `connection string required`
A variável `DATABASE_URL` não está definida no `.env`. Preencha-a com a string de conexão do seu PostgreSQL.

### Erro de SSL / `no pg_hba.conf entry ... no encryption`
A aplicação ativa **SSL obrigatório** sempre que `DATABASE_URL` está definida. Use um banco que suporte SSL (provedores gerenciados, como o Neon, já suportam). Para um PostgreSQL local sem SSL, ajuste a opção `ssl` em `app/src/database/db.js`.

### `password authentication failed`
Usuário/senha incorretos na `DATABASE_URL`. Revise as credenciais da string de conexão.

### `relation "modulos" does not exist` (ou similar)
As tabelas ainda não foram criadas no banco. Rode `npm run db:init`.

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
Gerar nova chave aleatória (`openssl rand -hex 32`) e colar no `.env`. Sem isso, o login falha silenciosamente.

### `DEFAULT_EXPIRES_IN_SECONDS` ausente
O token JWT não consegue expirar. Adicionar `DEFAULT_EXPIRES_IN_SECONDS=600` no `.env`.

---

## 🔗 Próximos Passos
- 💻 [Guia do Desenvolvedor](./03-developer-guide.md)
- 🤝 [CONTRIBUTING.md](../../CONTRIBUTING.md)

---

<div align="center">
  <a href="../README.md">← Voltar ao Índice</a>
</div>