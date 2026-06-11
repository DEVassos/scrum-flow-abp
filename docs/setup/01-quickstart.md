# ⚡ Quickstart — Rode a Aplicação em 5 Minutos

← [Índice da Documentação](../README.md)

> Caminho mínimo para subir a aplicação localmente. Para banco de dados, scripts e troubleshooting, veja [02-setup.md](./02-setup.md). Para variáveis de ambiente e rotas da API, veja [app/README.md](../../app/README.md).

---

## 📋 Pré-requisitos

| Ferramenta | Versão mínima | Verificar com |
|------------|---------------|---------------|
| Node.js | 18.x | `node --version` |
| npm | 9.x | `npm --version` |
| PostgreSQL (acessível via `DATABASE_URL`) | 14.x | — |
| Git | 2.x | `git --version` |

> A aplicação conecta por **`DATABASE_URL`** com SSL. Use um PostgreSQL gerenciado (ex.: [Neon](https://neon.tech), Supabase, RDS). Detalhes em [app/README.md](../../app/README.md#variáveis-de-ambiente).

---

## 🚀 Passo a Passo

```bash
git clone https://github.com/DEVassos/scrum-flow-abp.git
cd scrum-flow-abp/app
cp .env.example .env        # preencha DATABASE_URL e JWT_SECRET
npm install
npm run db:init             # cria tabelas e carrega módulos + questões no banco do DATABASE_URL
npm run dev
```

Abra 👉 [http://localhost:3005](http://localhost:3005) — você deve ver a página inicial. 🎉

> 🔐 O `.env` está no `.gitignore`. Nunca faça commit dele.

---

## ❌ Deu erro?

| Sintoma | Possível causa | Como resolver |
|---------|----------------|---------------|
| `DATABASE_URL` vazio / `connection string required` | Faltou preencher a string de conexão | Definir `DATABASE_URL` no `.env` |
| `no pg_hba.conf entry` / erro de SSL | Banco sem SSL (a app exige SSL com `DATABASE_URL`) | Usar um banco gerenciado (Neon etc.) ou ajustar `ssl` em `src/database/db.js` |
| `password authentication failed` | Credenciais erradas na `DATABASE_URL` | Revisar usuário/senha da string |
| Porta 3005 ocupada | Outro processo usa a porta | Trocar `PORT=3006` no `.env` |
| `JWT_SECRET` vazio | Faltou preencher no `.env` | Gerar uma string e colar |

➡ Troubleshooting completo em [02-setup.md](./02-setup.md#troubleshooting).

---

## 🔗 Próximos Passos

- 📖 [Setup Completo](./02-setup.md) — banco de dados, scripts e troubleshooting
- 💻 [Guia do Desenvolvedor](./03-developer-guide.md) — arquitetura e como contribuir
- 🤝 [CONTRIBUTING.md](../../CONTRIBUTING.md) — padrões de commit e PR

---

<div align="center">
  <a href="../README.md">← Voltar ao Índice</a>
</div>