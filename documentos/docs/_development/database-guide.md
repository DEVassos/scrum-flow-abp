# 🗄️ Guia de Banco de Dados

← [Voltar a Desenvolvimento](./)

Tudo sobre estrutura SQL, migrations e queries.

---

## 📋 Sumário

- [Estrutura de Arquivos SQL](#estrutura-de-arquivos-sql)
- [Adicionar Nova Tabela](#adicionar-nova-tabela)
- [Migrations](#migrations)
- [Padrões SQL](#padrões-sql)
- [Consultas Comuns](#consultas-comuns)

---

## Estrutura de Arquivos SQL

```
src/infra/init/
├── 01_schema_modulos.sql      # Tabelas base
├── 02_schema_questoes.sql
├── 03_schema_usuarios.sql
├── 04_schema_exames.sql
├── 05_schema_respostas.sql
├── 06_seed_modulos.sql        # Dados iniciais
├── 07_seed_questoes.sql
└── run-sql.js                 # Runner
```

**Regra:** Numeração define ordem de execução. Schemas antes de seeds!

---

## Adicionar Nova Tabela

### Passo 1: Criar arquivo SQL

`src/infra/init/08_schema_certificados.sql`:

```sql
-- Tabela de certificados emitidos
CREATE TABLE certificados (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER NOT NULL,
  data_emissao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  arquivo_path VARCHAR(255),
  
  -- Constraints
  CONSTRAINT fk_certificados_usuario 
    FOREIGN KEY (usuario_id) 
    REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Índices
CREATE INDEX idx_certificados_usuario_id ON certificados(usuario_id);

-- Comentário
COMMENT ON TABLE certificados IS 'Certificados emitidos aos usuários';
```

### Passo 2: Rodar migration

```bash
# Drop e reiniciar (se em desenvolvimento)
dropdb abp
createdb abp
npm run db:init

# Ou em produção (CUIDADO!):
psql abp < src/infra/init/08_schema_certificados.sql
```

### Passo 3: Criar Repository

`src/repositories/certificado.repositories.js`:

```javascript
const db = require('../database/db');

async function criar(usuarioId, caminhoArquivo) {
  const result = await db.query(
    `INSERT INTO certificados (usuario_id, arquivo_path)
     VALUES ($1, $2)
     RETURNING id, usuario_id, data_emissao`,
    [usuarioId, caminhoArquivo]
  );
  return result.rows[0];
}

async function buscarPorUsuario(usuarioId) {
  const result = await db.query(
    `SELECT id, usuario_id, data_emissao, arquivo_path
     FROM certificados
     WHERE usuario_id = $1
     ORDER BY data_emissao DESC`,
    [usuarioId]
  );
  return result.rows;
}

module.exports = {
  criar,
  buscarPorUsuario
};
```

---

## Migrations

### Problema: Mudar estrutura em produção

**NÃO FAÇA ASSIM:**
```sql
DROP TABLE usuarios;  -- PERDA TOTAL DE DADOS!
CREATE TABLE usuarios (...);
```

**FAÇA ASSIM:**
```sql
-- 1. Adicionar coluna
ALTER TABLE usuarios ADD COLUMN telefone VARCHAR(20);

-- 2. Modificar coluna
ALTER TABLE usuarios ALTER COLUMN email SET NOT NULL;

-- 3. Renomear coluna
ALTER TABLE usuarios RENAME COLUMN email TO email_principal;

-- 4. Remover coluna (cuidado!)
ALTER TABLE usuarios DROP COLUMN email;
```

### Exemplo: Adicionar Campo

`src/infra/migrations/001_add_telefone_usuarios.sql`:

```sql
-- Adicionar campo telefone à tabela usuarios
ALTER TABLE usuarios ADD COLUMN telefone VARCHAR(20);

-- Criar índice (opcional)
CREATE INDEX idx_usuarios_telefone ON usuarios(telefone);

-- Comentário
COMMENT ON COLUMN usuarios.telefone IS 'Telefone de contato do usuário';
```

Executar:
```bash
psql abp < src/infra/migrations/001_add_telefone_usuarios.sql
```

---

## Padrões SQL

### Naming Conventions

| O que | Padrão | Exemplo |
|-------|--------|---------|
| Tabelas | `snake_case` | `usuario_modulo` |
| Colunas | `snake_case` | `created_at` |
| Primary Key | `id` | `id SERIAL PRIMARY KEY` |
| Foreign Key | `fk_<tabela>_<coluna>` | `fk_usuarios_modulo` |
| Índices | `idx_<tabela>_<coluna>` | `idx_usuarios_cpf` |

### Tipos de Dados

| Tipo | Uso | Exemplo |
|------|-----|---------|
| `SERIAL` | ID auto-incrementado | `id SERIAL PRIMARY KEY` |
| `INTEGER` | Números inteiros | `idade INTEGER` |
| `DECIMAL(10,2)` | Números com decimais | `preco DECIMAL(10,2)` |
| `VARCHAR(n)` | Texto até n caracteres | `nome VARCHAR(100)` |
| `TEXT` | Texto longo | `descricao TEXT` |
| `BOOLEAN` | Verdadeiro/Falso | `ativo BOOLEAN DEFAULT true` |
| `TIMESTAMP` | Data e hora | `created_at TIMESTAMP DEFAULT NOW()` |
| `DATE` | Apenas data | `data_nascimento DATE` |
| `UUID` | ID único global | `id UUID DEFAULT gen_random_uuid()` |

### Constraints

```sql
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,                    -- Chave primária
  cpf VARCHAR(11) UNIQUE NOT NULL,          -- Única e obrigatória
  nome VARCHAR(100) NOT NULL,               -- Obrigatória
  email VARCHAR(255) NOT NULL UNIQUE,       -- Única
  ativo BOOLEAN DEFAULT true,               -- Com padrão
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Timestamp
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Foreign key
  CONSTRAINT fk_usuarios_cidade
    FOREIGN KEY (cidade_id) 
    REFERENCES cidades(id) 
    ON DELETE SET NULL,                     -- Se deletar cidade, usuario.cidade_id vira NULL
  
  -- Check constraint
  CONSTRAINT ck_cpf_length
    CHECK (LENGTH(cpf) = 11)
);
```

---

## Consultas Comuns

### SELECT

```sql
-- Básico
SELECT * FROM usuarios;

-- Com WHERE
SELECT id, nome, email FROM usuarios WHERE cpf = '12345678900';

-- Com ORDER BY
SELECT * FROM usuarios ORDER BY created_at DESC LIMIT 10;

-- Com JOIN
SELECT u.nome, m.nome as modulo
FROM usuarios u
INNER JOIN modulos m ON u.id = m.usuario_id;

-- Com agregação
SELECT COUNT(*) as total FROM usuarios;
SELECT AVG(nota) as media FROM respostas;

-- Com GROUP BY
SELECT modulo_id, COUNT(*) as tentativas
FROM exames
GROUP BY modulo_id;

-- Com LIMIT
SELECT * FROM usuarios LIMIT 10 OFFSET 20;  -- Paginação
```

### INSERT

```sql
-- Básico
INSERT INTO usuarios (nome, cpf, email)
VALUES ('João', '12345678900', 'joao@example.com');

-- Múltiplas linhas
INSERT INTO usuarios (nome, cpf, email)
VALUES 
  ('João', '12345678900', 'joao@example.com'),
  ('Maria', '98765432100', 'maria@example.com');

-- Retornar dados inseridos
INSERT INTO usuarios (nome, cpf, email)
VALUES ('João', '12345678900', 'joao@example.com')
RETURNING id, nome;
```

### UPDATE

```sql
-- Básico
UPDATE usuarios SET nome = 'João Silva' WHERE id = 1;

-- Múltiplas colunas
UPDATE usuarios 
SET nome = 'João Silva', updated_at = NOW()
WHERE cpf = '12345678900';

-- Com cálculo
UPDATE respostas
SET nota = nota + 5
WHERE modulo_id = 1;

-- Retornar dados atualizados
UPDATE usuarios 
SET nome = 'João Silva'
WHERE id = 1
RETURNING id, nome;
```

### DELETE

```sql
-- Básico (CUIDADO!)
DELETE FROM usuarios WHERE id = 1;

-- Com condição mais específica
DELETE FROM usuarios WHERE cpf = '12345678900' AND ativo = false;

-- Retornar dados deletados
DELETE FROM usuarios WHERE id = 1 RETURNING id, nome;
```

---

## Prepared Statements (Segurança)

**Sempre use prepared statements!** Previne SQL injection.

### ❌ NUNCA FAÇA ISSO:

```javascript
// SQL INJECTION RISK!
const cpf = req.body.cpf;  // "12345' OR '1'='1"
const query = `SELECT * FROM usuarios WHERE cpf = '${cpf}'`;
db.query(query);  // PERIGO!
```

### ✅ FAÇA ISSO:

```javascript
const cpf = req.body.cpf;
const query = 'SELECT * FROM usuarios WHERE cpf = $1';
db.query(query, [cpf]);  // SEGURO!
```

**Sempre use `$1, $2, $3...` e passe parâmetros como array.**

---

## Inspecting Database

```bash
# Conectar
psql abp

# Dentro do psql:
\dt                    # Listar tabelas
\d usuarios            # Descrever tabela
\l                     # Listar bancos
\c abp                 # Conectar a banco
\di                    # Listar índices
\df                    # Listar funções

# Queries úteis
SELECT * FROM usuarios LIMIT 5;
SELECT COUNT(*) FROM usuarios;
SELECT * FROM information_schema.tables WHERE table_schema='public';
SELECT * FROM pg_stat_user_tables;  -- Stats

\q                     # Sair
```

---

## Backup e Restore

```bash
# Backup do banco
pg_dump abp > backup.sql

# Restore
psql abp < backup.sql

# Backup comprimido
pg_dump -F c abp > backup.dump

# Restore comprimido
pg_restore -d abp backup.dump
```

---

## 🔗 Próximos Passos

- [Backend Guide](./backend-guide.md) — como usar repositories
- [API Reference](./api-reference.md) — endpoints disponíveis

---

<div align="center">
  <a href="./">← Voltar a Desenvolvimento</a>
</div>
