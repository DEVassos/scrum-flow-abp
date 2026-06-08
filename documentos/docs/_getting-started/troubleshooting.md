# ❌ Troubleshooting & FAQ

← [Voltar a Getting Started](./)

**Algo deu errado?** Procure seu erro aqui. Se não encontrar, abra uma issue!

---

## 🔴 Erros Comuns

### PostgreSQL

#### `ECONNREFUSED 127.0.0.1:5432`
PostgreSQL não está rodando.

**Linux:**
```bash
sudo service postgresql start
# ou
sudo systemctl start postgresql
```

**macOS:**
```bash
brew services start postgresql
```

**Windows:**
1. Abrir `Services` (Win + R → `services.msc`)
2. Procurar por `postgresql-x64-XX`
3. Clique em `Start`

---

#### `password authentication failed for user "postgres"`
Senha em `POSTGRES_PASSWORD` está errada.

**Verificar/resetar senha:**
```bash
# Conectar com sudo (sem senha)
sudo -u postgres psql

# Dentro do psql:
ALTER USER postgres WITH PASSWORD 'sua-nova-senha';
\q
```

Depois atualize `.env`:
```
POSTGRES_PASSWORD=sua-nova-senha
```

---

#### `database "abp" does not exist`
Banco não foi criado.

```bash
createdb abp
npm run db:init
```

---

#### `role "postgres" does not exist`
Usuário padrão não existe (raro).

```bash
# Criar usuário novamente
createuser -s postgres

# Definir senha
psql -U postgres -c "ALTER USER postgres WITH PASSWORD 'sua-senha';"
```

---

### Node.js & npm

#### `npm: command not found`
Node.js não está instalado.

[Instale em nodejs.org](https://nodejs.org/)

Após instalar:
```bash
node --version   # v18.x ou superior
npm --version    # 9.x ou superior
```

---

#### `npm install` falha
Problema com cache ou dependências corrompidas.

```bash
# Limpar cache
npm cache clean --force

# Remover node_modules
rm -rf node_modules package-lock.json

# Instalar novamente
npm install
```

---

#### Porta 3005 ocupada
Outro processo está usando a porta.

**Linux/Mac:**
```bash
# Ver qual processo está usando
lsof -i :3005

# Matar o processo (substitua PID)
kill -9 <PID>
```

**Windows:**
```bash
# Ver processo
netstat -ano | findstr :3005

# Matar (substitua PID)
taskkill /PID <PID> /F
```

**Ou simplesmente trocar a porta:**
```
PORT=3006
```

---

### Variáveis de Ambiente

#### `JWT_SECRET` vazio ou ausente
Token JWT não consegue ser assinado.

```bash
# Gerar novo
openssl rand -hex 32  # Linux/Mac

# Ou use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Colar em `.env`:
```
JWT_SECRET=<valor-gerado>
```

---

#### `POSTGRES_PASSWORD` não definida
Variável de ambiente não foi lida.

1. Verifique se `.env` existe
2. Verifique se `.env` não está no `.gitignore` (ele DEVE estar!)
3. Reinicie o servidor: `npm run dev`

---

### Banco de Dados

#### `npm run db:init` falha com SQL error
Arquivo SQL tem erro de sintaxe.

```bash
# Executar SQL manualmente para ver o erro
psql abp < src/infra/init/01_schema_modulos.sql

# Se tiver erro, revisar o arquivo
```

---

#### Dados não aparecem após `npm run db:init`
Seeds não foram executados.

```bash
# Verificar se tabelas existem
psql abp

# Dentro do psql:
\dt              # listar tabelas
SELECT COUNT(*) FROM modulos;  # contar registros
\q
```

Se tabelas estão vazias:
```bash
# Limpar e reiniciar
dropdb abp
createdb abp
npm run db:init
```

---

## ❓ Perguntas Frequentes

### P: Preciso de Docker?
**R:** Não! Você pode instalar PostgreSQL direto na sua máquina. Docker é opcional para quem preferir.

---

### P: Posso usar MySQL?
**R:** Não. O projeto foi desenvolvido **exclusivamente para PostgreSQL** (requisito RP02).

---

### P: Posso usar npm@10 ou Node.js 20?
**R:** Sim! Versões mais novas geralmente funcionam. Só certifique-se de que é `18+` no mínimo.

---

### P: O `.env` deve estar versionado no Git?
**R:** **NÃO!** Nunca. Ele contém senhas e tokens sensíveis e já está em `.gitignore`.

---

### P: Como resetar o banco sem perder nada?
**R:** Você vai perder os dados (é proposital):
```bash
dropdb abp
createdb abp
npm run db:init
```

---

### P: Posso usar a app em produção?
**R:** Essa é uma versão educacional (ABP 2026). Para produção, faltam várias coisas (SSL, rate limiting, etc).

---

### P: Esqueci a senha do PostgreSQL
**R:** Resetar (Linux/Mac):
```bash
sudo -u postgres psql
ALTER USER postgres WITH PASSWORD 'nova-senha';
\q
```

---

### P: O servidor sobe mas não abre no navegador
**R:** Tente:
1. Verifique se não há erros no console (npm run dev)
2. Confirme a porta: http://localhost:3005
3. Tente http://127.0.0.1:3005

---

### P: Posso usar a app em 2 máquinas diferentes?
**R:** Sim, mas cada uma precisa da própria `.env` com seus valores locais.

---

## 🆘 Ainda Não Funcionou?

1. ✅ Revisar esta página de novo
2. ✅ Rodar `npm run db:init` novamente
3. ✅ Limpar cache: `npm cache clean --force`
4. ✅ Resetar tudo:
   ```bash
   dropdb abp
   rm -rf node_modules package-lock.json
   npm install
   createdb abp
   npm run db:init
   npm run dev
   ```

Se ainda não funcionar:
- 📞 Fale com a equipe no Slack
- 🐛 Abra uma issue no GitHub com:
  - Sistema operacional
  - Versão do Node e npm
  - Erro exato da tela
  - Passos que você fez

---

<div align="center">
  <a href="./">← Voltar a Getting Started</a>
</div>
