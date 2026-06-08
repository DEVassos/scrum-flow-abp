# ⚡ Quickstart — Rode a Aplicação em 5 Minutos

← [Voltar a Getting Started](./)

> Guia mínimo para rodar a aplicação localmente. Para detalhes completos, veja [setup.md](./setup.md).

---

## 📋 Pré-requisitos

| Ferramenta | Versão mínima | Verificar com |
|------------|---------------|---------------|
| Node.js | 18.x | `node --version` |
| npm | 9.x | `npm --version` |
| PostgreSQL | 14.x | `psql --version` |
| Git | 2.x | `git --version` |

---

## 🚀 Passo a Passo (5 min)

### 1. Clonar o repositório
```bash
git clone https://github.com/DEVassos/scrum-flow-abp.git
cd scrum-flow-abp/app
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar variáveis de ambiente
```bash
cp .env.example .env
```
Edite `app/.env` e preencha:
- `POSTGRES_PASSWORD` → sua senha do PostgreSQL
- `JWT_SECRET` → uma string aleatória (ex: `openssl rand -hex 32`)

> 🔐 Nunca commitar `.env` — já está em `.gitignore`.

### 4. Criar o banco de dados
```bash
createdb abp
```

### 5. Inicializar banco (schemas + seeds)
```bash
npm run db:init
```

### 6. Subir o servidor
```bash
npm run dev
```
Você vai ver:
```
Server running on http://localhost:3005
```

### 7. Abrir no navegador
👉 [http://localhost:3005](http://localhost:3005)

Pronto! 🎉 Você deve ver a página inicial.

---

## ❌ Deu erro?

| Erro | Causa | Solução |
|------|-------|---------|
| `ECONNREFUSED 5432` | PostgreSQL não rodando | [Veja troubleshooting](./troubleshooting.md) |
| `password authentication failed` | Senha errada | Revisar `POSTGRES_PASSWORD` em `.env` |
| `database "abp" does not exist` | BD não criado | Rodar `createdb abp` novamente |
| Porta 3005 ocupada | Outro processo usa | Trocar `PORT=3006` em `.env` |
| `JWT_SECRET` vazio | Faltou preencher | Gerar: `openssl rand -hex 32` |

**Solução completa:** [Troubleshooting & FAQ](./troubleshooting.md)

---

## ✅ Confirmação

Se você conseguiu:
- ✅ Clonar o repo
- ✅ Instalar dependências
- ✅ Rodar o servidor sem erros
- ✅ Ver a página em http://localhost:3005

**Você está pronto!** 🚀

---

## 📚 Próximos Passos

- 💻 [Guia do Desenvolvedor](../_development/) — como contribuir com código
- 📋 [Requisitos](../_requirements/) — entender o escopo
- 🤝 [CONTRIBUTING.md](../CONTRIBUTING.md) — padrões de commit e PR

---

<div align="center">
  <a href="./">← Voltar a Getting Started</a>
</div>
