# 🚧 Restrições de Projeto

← [Voltar a Requisitos](./)

Limitações técnicas e de prazo.

---

## RP01 — Frontend: HTML/CSS/JS Puro

**Descrição:** Frontend **não pode** usar frameworks de UI (Vue, React, Angular).

**Permitido:**
- ✅ HTML5 semântico
- ✅ CSS3 com variáveis e grid/flexbox
- ✅ JavaScript ES6+ vanilla
- ✅ Fetch API
- ✅ LocalStorage
- ✅ DOM APIs nativas

**Proibido:**
- ❌ React, Vue, Angular
- ❌ jQuery
- ❌ Bootstrap, Tailwind
- ❌ Bibliotecas de UI
- ❌ Build tools (webpack, vite) — apenas código plano

**Estrutura Aceita:**
```
public/
├── pages/
│   ├── index.html
│   ├── dashboard.html
│   └── ...
└── assets/
    ├── css/
    │   ├── global.css
    │   ├── components/
    │   └── pages/
    └── js/
        ├── auth.js
        ├── api.js
        └── ...
```

**Por que?**
- Requisito educacional: aprender fundamentais
- Simplicidade: sem complexidade de ferramentas
- Desempenho: sem overhead de framework
- Controle: entender cada linha de código

---

## RP02 — Banco: PostgreSQL (Sem ORM)

**Descrição:** Banco **exclusivamente PostgreSQL** com SQL explícito (sem ORM).

**Permitido:**
- ✅ PostgreSQL 14+
- ✅ SQL puro (queries escritas manualmente)
- ✅ Prepared statements (`$1, $2, ...`)
- ✅ Connection pooling (`pg` npm package)
- ✅ Migrations versionadas

**Proibido:**
- ❌ Sequelize, TypeORM, Prisma
- ❌ MongoDB, MySQL, SQLite
- ❌ Concatenação de SQL dinâmica
- ❌ Queries geradas automaticamente

**Stack Aceito:**
```javascript
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  // ... conexão
});

// ✅ OK - SQL explícito
const result = await pool.query(
  'SELECT * FROM usuarios WHERE cpf = $1',
  [cpf]
);

// ❌ NUNCA - SQL dinâmica (SQL Injection!)
const result = await pool.query(
  `SELECT * FROM usuarios WHERE cpf = '${cpf}'`
);
```

**Por que?**
- Requisito educacional: aprender SQL
- Segurança: evitar ORM que mascaram vulnerabilidades
- Performance: controle total de queries
- Auditoria: ver exatamente o que toca no BD

---

## RP03 — Entrega em 3 Sprints

**Descrição:** Projeto deve ser entregue funcionando em **3 sprints máximo**.

**Cronograma:**
```
Sprint 1 (1-2 semanas)
├── Setup do projeto
├── RF01-02: Cadastro e Login
├── Modelo de dados básico
└── Review: Autenticação funcional

Sprint 2 (1-2 semanas)
├── RF03-07: Avaliações
├── Integração com banco
├── UI de questões
└── Review: Avaliações funcionais

Sprint 3 (1-2 semanas)
├── RF08-11: Certificados e Histórico
├── Testes e ajustes
├── Documentação final
└── Review: Sistema completo
```

**Implicações:**
- ✅ Histórias pequenas e claras
- ✅ Daily standups rigorosos
- ✅ Priorização estrita
- ✅ MVP: focar no essencial (RF01-11)
- ✅ Opcional: RF12 (admin) se sobrar tempo

---

## RP04 — Lógica de Negócio no Backend

**Descrição:** Toda lógica crítica **deve estar no servidor**.

**Exemplos Críticos:**

**Cálculo de Notas:**
```javascript
// ❌ NUNCA no frontend
const nota = (respostasCorretas / 10) * 10;
localStorage.setItem('nota', nota);

// ✅ SEMPRE no backend
router.post('/responder', authMiddleware, async (req, res) => {
  const { questaoId, resposta } = req.body;
  const correta = await repo.verificarResposta(questaoId, resposta);
  const nota = await repo.calcularNota(exameId);
  res.json({ nota });
});
```

**Controle de Tentativas:**
```javascript
// ❌ NUNCA confiar no frontend
// usuário pode incrementar arbitrariamente

// ✅ SEMPRE validar no servidor
if (tentativas >= 2) {
  return res.status(403).json({ error: 'Limite atingido' });
}
```

**Por que?**
- Segurança: evitar fraudes
- Auditoria: logs confiáveis
- Integridade: dados consistentes

---

## RP05 — Git Flow & PRs

**Descrição:** Versionamento com Git Flow e Pull Requests obrigatórias.

**Fluxo:**
```
develop (branch principal)
  ├── feature/US01-cadastro
  ├── feature/US02-login
  └── feature/US03-avaliacoes
    ├── Código
    ├── Testes
    └── PR → Code Review → Merge para develop

main (releases apenas)
  ├── v1.0.0
  └── v1.1.0
```

**Regras:**
- ✅ Nunca commitar direto em `develop` ou `main`
- ✅ Sempre criar branch feature/nomezado
- ✅ PR deve ter:
  - [ ] Descrição clara
  - [ ] Ligada a issue/história
  - [ ] Documentação atualizada
  - [ ] Mínimo 1 aprovação antes de merge
- ✅ Commits devem seguir padrão: `feat:`, `fix:`, `docs:`

**Exemplo de Commit:**
```bash
# ✅ BOM
git commit -m "feat: implementa US01 - cadastro de usuários"
git commit -m "fix: corrige validação de CPF"
git commit -m "docs: atualiza guia de setup"

# ❌ RUIM
git commit -m "alterações"
git commit -m "xpto"
git commit -m "arrumado"
```

---

## 📋 Checklist de Conformidade

Antes de cada sprint, verificar:

- [ ] **RP01** — Nenhuma importação de frameworks de UI
- [ ] **RP02** — Todas as queries com prepared statements
- [ ] **RP03** — Sprint está dentro do prazo
- [ ] **RP04** — Lógica crítica testada no backend
- [ ] **RP05** — PRs têm 1+ revisão antes de merge

---

## ⚠️ Consequências de Não Cumprimento

| Restrição | Violação | Consequência |
|-----------|----------|-------------|
| RP01 | Usar React | Retrabalho (remover framework) |
| RP02 | Usar ORM | Retrabalho (reescrever com SQL) |
| RP03 | Atraso > 1 sprint | Corte de requisitos |
| RP04 | Lógica no frontend | Falha na segurança / rejeição |
| RP05 | Commit sem PR | Revert automático |

---

<div align="center">
  <a href="./">← Voltar a Requisitos</a>
</div>
