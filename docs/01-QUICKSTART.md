# ⚡ Quickstart — Rode a Aplicação em 5 Minutos

← [Índice da Documentação](./00-INDICE.md)

> Guia mínimo para subir a aplicação localmente. Para detalhes (variáveis, troubleshooting, scripts), veja [02-SETUP.md](./02-SETUP.md).

---

## 📋 Pré-requisitos

| Ferramenta | Versão mínima | Verificar com |
|------------|---------------|---------------|
| Node.js | 18.x | `node --version` |
| npm | 9.x | `npm --version` |
| PostgreSQL | 14.x | `psql --version` |
| Git | 2.x | `git --version` |

---

## 🚀 Passo a Passo

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
Edite `app/.env` e preencha `POSTGRES_PASSWORD` e `JWT_SECRET`.

> 🔐 O `.env` está no `.gitignore`. Nunca faça commit dele.

### 4. Criar o banco de dados
```bash
createdb abp
```

### 5. Inicializar schema e seeds
```bash
npm run db:init
```
Esse comando executa todos os SQLs em `src/infra/init/` na ordem (schemas → seeds).

### 6. Subir o servidor
```bash
npm run dev
```

### 7. Abrir no navegador
👉 [http://localhost:3005](http://localhost:3005)

Você deve ver a página inicial. 🎉

---

## ❌ Deu erro?

| Sintoma | Possível causa | Onde resolver |
|---------|----------------|---------------|
| `ECONNREFUSED 5432` | PostgreSQL não está rodando | [02-SETUP.md](./02-SETUP.md#troubleshooting) |
| `password authentication failed` | Senha errada no `.env` | Revisar `POSTGRES_PASSWORD` |
| `database "abp" does not exist` | BD não criado (passo 4) | Repetir `createdb abp` |
| Porta 3005 ocupada | Outro processo usa a porta | Trocar `PORT=3006` no `.env` |
| `JWT_SECRET` vazio | Faltou preencher no `.env` | Gerar string e colar |

➡ Para troubleshooting completo, veja [02-SETUP.md](./02-SETUP.md).

---

## 🔗 Próximos Passos

- 📖 [Setup Completo](./02-SETUP.md) — entenda cada variável e script
- 💻 [Guia do Desenvolvedor](./03-DEVELOPER-GUIDE.md) — como contribuir
- 🤝 [CONTRIBUTING.md](../CONTRIBUTING.md) — padrões de commit e PR

---

<div align="center">
  <a href="./00-INDICE.md">← Voltar ao Índice</a>
</div>
