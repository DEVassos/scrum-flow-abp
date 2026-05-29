# Como funciona a página de Configurações

## Visão geral

A página `configuracoes.html` tem duas seções:

1. **Dados da Conta** — visível para qualquer usuário logado (alterar nome, e-mail, CPF e senha)
2. **Administração** — visível somente para usuários com perfil `admin` (gerenciar questões e níveis)

---

## Como a seção Admin aparece

O arquivo `configuracoes.js` lê o campo `perfil` do payload do JWT:

```js
function estaAdmin() {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.perfil === 'admin';
}
```

Se `perfil === 'admin'`, a seção é exibida automaticamente. Caso contrário, ela fica oculta.

**Hoje esse campo não existe no token** — ele será adicionado na **T15 (Auth admin — middleware de perfil)**.

---

## O que precisa ser feito (por tarefa)

### T15 — Auth admin (Marcello + Gustavo)

- Adicionar coluna `perfil` na tabela `usuarios` do banco (valores: `'aluno'` ou `'admin'`)
- Criar seed inicial com pelo menos um usuário admin
- Alterar o `createToken` para incluir `perfil` no payload do JWT:

```js
// utils/jwt.js
const token = createToken({ id_usuario: usuario.id_usuario, perfil: usuario.perfil });
```

- Criar middleware `adminMiddleware` que rejeita requests de não-admins (reutiliza o `authMiddleware` e checa `req.usuario.perfil === 'admin'`)
- Expor as rotas de dados pessoais (ainda não existem no backend):
  - `PATCH /api/usuarios/:id` → atualizar nome, e-mail, CPF
  - `PATCH /api/usuarios/:id/senha` → alterar senha

> Os repositórios `updateUsuarioNome`, `updateUsuarioMail`, `updateUsuarioCpf`, `updateUsuarioSenha` já existem em `usuarios.repositories.js` — só falta expor as rotas.

---

### T16 — CRUD de questões (Marcello + Vinicius + Gustavo)

Criar as rotas protegidas por `adminMiddleware`:

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/admin/questoes` | Lista todas as questões |
| `POST` | `/api/admin/questoes` | Cria nova questão + alternativas |
| `PUT` | `/api/admin/questoes/:id` | Edita questão existente |
| `DELETE` | `/api/admin/questoes/:id` | Remove questão |

No frontend (`configuracoes.js`), substituir os dados de exemplo (`carregarQuestoes`) por chamadas reais à API usando `obterToken()` no header `Authorization: Bearer`.

**Regra de negócio importante:** garantir que exatamente **uma** alternativa seja marcada como correta ao criar/editar.

---

### T17 — CRUD de níveis (Vinicius + Gabriel)

Criar as rotas protegidas por `adminMiddleware`:

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/api/admin/niveis` | Lista todos os níveis/módulos |
| `POST` | `/api/admin/niveis` | Cria novo nível |
| `PUT` | `/api/admin/niveis/:id` | Edita nível |
| `DELETE` | `/api/admin/niveis/:id` | Remove nível |

No frontend, substituir `carregarNiveis()` por chamadas reais e implementar o formulário do botão "Novo nível" (hoje ele só exibe um toast de aviso).

---

## Como testar a seção admin agora (sem T15 pronta)

1. Abra `configuracoes.html` no browser
2. Abra o DevTools (F12) → aba **Console**
3. Cole e execute:

```js
document.getElementById('secao-admin').hidden = false
```

A seção aparece com dados de exemplo. As tabelas são preenchidas com dados fictícios definidos em `configuracoes.js` — serão substituídos pelas chamadas reais nas tarefas T16 e T17.

---

## Estrutura dos arquivos

```
pages/
  configuracoes.html          ← página principal
  COMO_ATIVAR_ADMIN.md        ← este arquivo

assets/
  css/pages/configuracoes.css ← estilos da página
  js/configuracoes.js         ← lógica (auth, admin, formulários, tabelas)
```
