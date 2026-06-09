# 💻 Guia de Desenvolvimento Backend

← [Voltar a Desenvolvimento](./)

Tudo o que você precisa saber para adicionar rotas, repositories e lógica no backend.

---

## 📋 Sumário

- [Stack & Ferramentas](#stack--ferramentas)
- [Adicionar Nova Rota](#adicionar-nova-rota)
- [Adicionar Nova Repository](#adicionar-nova-repository)
- [Middlewares](#middlewares)
- [Validações](#validações)
- [Tratamento de Erros](#tratamento-de-erros)
- [Boas Práticas](#boas-práticas)

---

## Stack & Ferramentas

| Coisa | Versão | Por que |
|-------|--------|--------|
| Node.js | 18+ | Runtime |
| Express | 5.x | Framework HTTP |
| PostgreSQL | 14+ | Banco de dados |
| JsonWebToken | ↓ | Autenticação JWT |
| CommonJS | — | Módulo (require/exports) |

---

## Adicionar Nova Rota

### Passo 1: Criar arquivo de rota

`src/routes/meu-recurso.routes.js`:

```javascript
const { Router } = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const repository = require('../repositories/meu-recurso.repositories');

const router = Router();

// Rota pública
router.get('/publico', async (req, res) => {
  try {
    const dados = await repository.getPublico();
    res.json(dados);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar dados' });
  }
});

// Rota protegida (precisa de JWT)
router.post('/privado', authMiddleware, async (req, res) => {
  try {
    const { param } = req.body;
    const usuarioId = req.usuario.id;  // Vem do middleware!
    
    if (!param) {
      return res.status(400).json({ error: 'Parâmetro obrigatório' });
    }
    
    const resultado = await repository.criar(param, usuarioId);
    res.status(201).json(resultado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao processar' });
  }
});

module.exports = router;
```

### Passo 2: Registrar a rota

`src/routes/index.js`:

```javascript
const { Router } = require('express');
const authRoutes = require('./auth.routes');
const metiRecursoRoutes = require('./meu-recurso.routes');

const router = Router();

router.use('/auth', authRoutes);
router.use('/meu-recurso', metiRecursoRoutes);

module.exports = router;
```

### Passo 3: Agora as requisições vão para `/api/meu-recurso/*`

---

## Adicionar Nova Repository

Cria `src/repositories/meu-recurso.repositories.js`:

```javascript
const db = require('../database/db');

// SELECT
async function buscarTodos() {
  const result = await db.query(
    'SELECT id, nome, email FROM usuarios LIMIT 100'
  );
  return result.rows;
}

async function buscarPorId(id) {
  const result = await db.query(
    'SELECT id, nome, email FROM usuarios WHERE id = $1',
    [id]
  );
  return result.rows[0];
}

// INSERT
async function criar(nome, email, senha_hash) {
  const result = await db.query(
    `INSERT INTO usuarios (nome, email, senha_hash, created_at)
     VALUES ($1, $2, $3, NOW())
     RETURNING id, nome, email`,
    [nome, email, senha_hash]
  );
  return result.rows[0];
}

// UPDATE
async function atualizar(id, nome, email) {
  const result = await db.query(
    `UPDATE usuarios SET nome = $1, email = $2, updated_at = NOW()
     WHERE id = $3
     RETURNING id, nome, email`,
    [nome, email, id]
  );
  return result.rows[0];
}

// DELETE
async function deletar(id) {
  const result = await db.query(
    'DELETE FROM usuarios WHERE id = $1 RETURNING id',
    [id]
  );
  return result.rows[0];
}

module.exports = {
  buscarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar
};
```

### Padrão SQL

- Use **prepared statements** com `$1, $2, ...`
- Sempre retorne dados úteis
- Trate erros no middleware da rota

---

## Middlewares

### Autenticação (JWT)

```javascript
// Proteger rota
router.get('/dados-privados', authMiddleware, async (req, res) => {
  // req.usuario = { id, cpf, nome, ... }
  const usuarioId = req.usuario.id;
  // ...
});
```

### Criar Middleware Customizado

`src/middlewares/validar-cpf.middleware.js`:

```javascript
const { validarCPF } = require('../utils/cpf');

function validarCPFMiddleware(req, res, next) {
  const { cpf } = req.body;
  
  if (!cpf || !validarCPF(cpf)) {
    return res.status(400).json({ error: 'CPF inválido' });
  }
  
  next();
}

module.exports = validarCPFMiddleware;
```

Usar na rota:
```javascript
const validarCPF = require('../middlewares/validar-cpf.middleware');

router.post('/cadastro', validarCPF, async (req, res) => {
  // CPF já foi validado
  // ...
});
```

---

## Validações

Sempre validar no **backend**, nunca confiar no frontend!

```javascript
router.post('/login', async (req, res) => {
  const { cpf, password } = req.body;
  
  // 1. Validar presença
  if (!cpf || !password) {
    return res.status(400).json({ error: 'CPF e senha obrigatórios' });
  }
  
  // 2. Validar formato
  if (!validarCPF(cpf)) {
    return res.status(400).json({ error: 'CPF formato inválido' });
  }
  
  // 3. Validar comprimento
  if (password.length < 6) {
    return res.status(400).json({ error: 'Senha muito curta' });
  }
  
  // 4. Validar no banco
  const usuario = await repository.buscarPorCPF(cpf);
  if (!usuario) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }
  
  // ... continuar
});
```

---

## Tratamento de Erros

### Padrão

```javascript
try {
  // Lógica
  const resultado = await repository.operacao();
  res.json(resultado);
} catch (err) {
  // Log do erro
  console.error('Erro em /rota:', err.message);
  
  // Resposta genérica (não expor detalhes internos!)
  res.status(500).json({ 
    error: 'Erro ao processar requisição' 
  });
}
```

### Erros Esperados vs Não Esperados

```javascript
try {
  if (!email) {
    // Erro esperado → código 400
    return res.status(400).json({ error: 'Email obrigatório' });
  }
  
  const usuario = await repository.buscarPorEmail(email);
  if (!usuario) {
    // Erro esperado → código 404
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
  
  // Sucesso
  res.json(usuario);
} catch (err) {
  // Erro não esperado (SQL, conexão, etc) → código 500
  console.error(err);
  res.status(500).json({ error: 'Erro interno do servidor' });
}
```

---

## Boas Práticas

### ✅ Faça

- ✅ Use `const db = require('../database/db')` para acessar banco
- ✅ Sempre valide entrada do usuário
- ✅ Use middlewares para lógica compartilhada
- ✅ Trate erros explicitamente
- ✅ Log de erros (console.error)
- ✅ Retorne apenas dados necessários (SELECT col1, col2)
- ✅ Use prepared statements com $1, $2

### ❌ Não faça

- ❌ Usar `var` (use `const` ou `let`)
- ❌ Queries SQL dinâmicas (risco de SQL injection)
- ❌ Expor stack trace em resposta de erro
- ❌ Fazer lógica no frontend (notas, tentativas, etc)
- ❌ Armazenar senhas em texto plano
- ❌ Retornar todos os campos de uma tabela
- ❌ Confiar em token do frontend (validar sempre)

---

## 🔄 Fluxo Completo de Exemplo

**Requisição:** POST `/api/usuarios` com `{ nome, cpf, email, password }`

**Rota:**
```javascript
router.post('/', async (req, res) => {
  try {
    const { nome, cpf, email, password } = req.body;
    
    // Validações
    if (!nome || !cpf || !email || !password) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }
    
    if (!validarCPF(cpf)) {
      return res.status(400).json({ error: 'CPF inválido' });
    }
    
    // Chamar repository
    const usuario = await repository.criar(nome, cpf, email, password);
    
    // Responder
    res.status(201).json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email
    });
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});
```

**Repository:**
```javascript
async function criar(nome, cpf, email, password) {
  const senhaHash = await bcrypt.hash(password, 10);
  
  const result = await db.query(
    `INSERT INTO usuarios (nome, cpf, email, senha_hash, created_at)
     VALUES ($1, $2, $3, $4, NOW())
     RETURNING id, nome, cpf, email`,
    [nome, cpf, email, senhaHash]
  );
  
  return result.rows[0];
}
```

---

## 📚 Próximos Passos

- [Guia Frontend](./frontend-guide.md) — como adicionar páginas
- [Guia de Banco](./database-guide.md) — como alterar BD
- [Referência de API](./api-reference.md) — endpoints

---

<div align="center">
  <a href="./">← Voltar a Desenvolvimento</a>
</div>
