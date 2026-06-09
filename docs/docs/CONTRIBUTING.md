# 🤝 Guia de Contribuição

Bem-vindo! Aqui está como contribuir com o projeto.

---

## 📋 Sumário

- [Antes de Começar](#antes-de-começar)
- [Fluxo de Contribuição](#fluxo-de-contribuição)
- [Convenção de Commits](#convenção-de-commits)
- [Padrões de Código](#padrões-de-código)
- [Submeter PR](#submeter-pr)
- [Code Review](#code-review)

---

## ✅ Antes de Começar

1. **Setup Local**
   - Clone o repo
   - Siga [Getting Started](./docs/_getting-started/)
   - Certifique-se que roda localmente

2. **Escolha uma Tarefa**
   - Veja o [Product Backlog](./docs/_project-management/product-backlog.md)
   - Ou converse com a equipe sobre o que fazer

3. **Conheça as Restrições**
   - Leia [Requisitos & Escopo](./docs/_requirements/)
   - Entenda [Arquitetura](./docs/_development/architecture.md)

---

## 🔄 Fluxo de Contribuição

### 1. Atualizar local

```bash
# Certifique-se que está na branch develop
git checkout develop

# Puxar mudanças mais recentes
git pull origin develop
```

### 2. Criar branch de feature

```bash
# Nomear: feature/USXX-descricao
git checkout -b feature/US01-cadastro-usuario

# Ou para bugfix:
git checkout -b fix/validacao-cpf

# Ou para documentação:
git checkout -b docs/guia-backend
```

### 3. Fazer mudanças

```bash
# Codar!
# Testar localmente
# npm run dev
```

### 4. Commit com padrão

```bash
git add .
git commit -m "feat: implementa US01 - cadastro de usuários"
```

### 5. Push para remoto

```bash
git push origin feature/US01-cadastro-usuario
```

### 6. Abrir Pull Request

- Vá ao GitHub
- Clique em "New Pull Request"
- Selecione sua branch
- Descreva o que fez
- Aguarde revisão

---

## 📝 Convenção de Commits

**Formato:** `<tipo>: <assunto>`

### Tipos

| Tipo | Uso | Exemplo |
|------|-----|---------|
| `feat` | Nova funcionalidade | `feat: adiciona login com CPF` |
| `fix` | Correção de bug | `fix: corrige validação de email` |
| `docs` | Documentação | `docs: atualiza README` |
| `style` | Formatação (sem lógica) | `style: formata código com prettier` |
| `refactor` | Reorganização sem mudança funcional | `refactor: simplifica função de cálculo` |
| `test` | Testes | `test: adiciona testes de login` |
| `chore` | Manutenção (deps, config) | `chore: atualiza npm packages` |

### Regras

- ✅ **Minúscula** — `feat:` (não `Feat:`)
- ✅ **Imperativo** — `adiciona` (não `adicionado`)
- ✅ **Conciso** — máximo 50 caracteres no subject
- ✅ **Sem ponto** — `implementa login` (não `implementa login.`)
- ✅ **Uma linha por commit** — se precisa de múltiplas, são múltiplas mudanças

### Exemplos

```bash
# ✅ BONS
git commit -m "feat: implementa cadastro de usuário"
git commit -m "fix: corrige erro 401 em aviações protegidas"
git commit -m "docs: adiciona guia de backend"

# ❌ RUINS
git commit -m "mudanças"
git commit -m "Feat: novo código"
git commit -m "Fix bug in login validation"
git commit -m "adicionado o arquivo X.js"
```

---

## 💻 Padrões de Código

### Backend (Node.js)

**Estrutura:**
```javascript
// 1. Imports
const { Router } = require('express');
const authMiddleware = require('../middlewares/auth.middleware');

// 2. Setup
const router = Router();

// 3. Rotas
router.post('/recurso', authMiddleware, async (req, res) => {
  try {
    const { param } = req.body;
    
    if (!param) {
      return res.status(400).json({ error: 'Parâmetro obrigatório' });
    }
    
    const resultado = await repository.fazer(param);
    res.json(resultado);
  } catch (err) {
    console.error('Erro:', err);
    res.status(500).json({ error: 'Erro interno' });
  }
});

// 4. Export
module.exports = router;
```

**Conventions:**
- Use `const` (nunca `var`)
- Funções async/await (não callbacks)
- Erro sempre em try/catch
- Prepared statements com `$1, $2`

### Frontend (HTML/CSS/JS)

**HTML:**
```html
<!-- Semântico e limpo -->
<main class="container">
  <section class="form-section">
    <h1>Título</h1>
    <form id="myForm">
      <!-- inputs -->
    </form>
  </section>
</main>
```

**CSS:**
```css
/* Variáveis primeiro */
:root {
  --primary: #007bff;
  --spacing: 1rem;
}

/* Componentes reutilizáveis */
.btn {
  padding: var(--spacing);
  background: var(--primary);
}

/* Responsivo */
@media (max-width: 768px) {
  .container {
    padding: 0.5rem;
  }
}
```

**JavaScript:**
```javascript
// Verificar autenticação
document.addEventListener('DOMContentLoaded', () => {
  if (!isUserLoggedIn()) {
    window.location.href = '/pages/login.html';
    return;
  }
  
  initPage();
});

// Handlers claros
async function initPage() {
  try {
    const data = await apiCall('/api/endpoint');
    render(data);
  } catch (err) {
    showError(err.message);
  }
}
```

### Banco de Dados (SQL)

```sql
-- Nomes em snake_case
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  cpf VARCHAR(11) UNIQUE NOT NULL,
  nome VARCHAR(100) NOT NULL,
  
  -- Comments ajudam
  CONSTRAINT fk_usuarios_cidade
    FOREIGN KEY (cidade_id) 
    REFERENCES cidades(id)
);

-- Índices para performance
CREATE INDEX idx_usuarios_cpf ON usuarios(cpf);
```

---

## 📤 Submeter PR

### Checklist antes de submeter

- [ ] Código segue padrões da equipe
- [ ] Funciona localmente (`npm run dev`)
- [ ] Testes passam (se houver)
- [ ] Documentação foi atualizada
- [ ] Commit segue convenção
- [ ] Nenhum `console.log` debuggin deixado para trás
- [ ] `.env` não foi commitado

### Descrição da PR

```markdown
## Descrição
Implementa autenticação JWT com tokens que expiram em 10 minutos.

## O que mudou
- Adicionado arquivo `auth.middleware.js`
- Modificado `auth.routes.js` para usar novo middleware
- Atualizado documentação de API

## Testes
- Login com credenciais válidas ✅
- Login com CPF inválido ✅
- Token expirado redireciona para login ✅

## Issues
Closes #123

## Screenshots (se aplicável)
[Adicionar imagens aqui]
```

---

## 👀 Code Review

### Para Revisor

- [ ] Código segue padrões?
- [ ] Lógica faz sentido?
- [ ] Não há SQL injection?
- [ ] Documentação está atualizada?
- [ ] Testes cobrem casos críticos?

**Aprovação:** Usar "Approve" no GitHub

### Para Autor

- [ ] Responda aos comentários
- [ ] Faça as mudanças sugeridas
- [ ] Faça push dos novos commits
- [ ] Marque como "Ready for review" quando terminar

---

## 🚀 Após Aprovação

1. **Seu PR foi aprovado?** 🎉
2. GitHub vai oferecer "Merge" — clique!
3. Delete a branch local:
   ```bash
   git checkout develop
   git branch -D feature/US01-cadastro
   git pull origin develop
   ```

---

## ❓ Dúvidas?

- 💬 Converse com a equipe no Slack
- 📖 Leia a [Documentação Completa](./docs/)
- 🐛 Abra uma issue se encontrar um bug

---

## 📏 Regras de Ouro

1. **Sempre criar branch** — nunca comitar direto em `develop`
2. **Commit small, often** — commits pequenos são fáceis de revisar
3. **Documentação junto** — código + docs no mesmo PR
4. **Respeite o padrão** — siga convenções da equipe
5. **Code review é normal** — não é crítica pessoal!

---

Obrigado por contribuir! 🙌

<div align="center">
  <a href="./docs/README.md">📚 Voltar à Documentação</a>
</div>
