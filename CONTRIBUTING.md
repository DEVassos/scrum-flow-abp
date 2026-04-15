# Guia de Contribuição — DEVassos / ABP 1DSM 2026/1

> Este documento define as regras de trabalho colaborativo para o projeto ABP do 1º semestre de 2026.
> Todos os membros do time devem ler e seguir estas diretrizes.

---

## Convenção de Commits

Use o padrão **Conventional Commits** para que o histórico seja legível e rastreável:

| Prefixo | Quando usar |
|---------|-------------|
| `feat:` | Nova funcionalidade (ex: novo endpoint, nova página) |
| `fix:` | Correção de bug ou comportamento incorreto |
| `docs:` | Alteração apenas em documentação (.md, comentários) |
| `chore:` | Configuração, dependências, scripts de infra |
| `refactor:` | Refatoração sem mudança de comportamento externo |
| `test:` | Adição ou correção de testes |

**Exemplos:**

```
feat: implementar endpoint de cadastro de usuário (US01)
fix: corrigir validação de CPF duplicado no cadastro
docs: atualizar burndown da Sprint 1
chore: adicionar jsonwebtoken nas dependências do backend
refactor: extrair validação de CPF para função utilitária
```

> 💡 Use o imperative no presente: "implementar", "corrigir", "atualizar" — não "implementado", "corrigindo".

---

## Fluxo de Branches (Git Flow Acadêmico)

```
main        ← código estável (mergeado ao final de cada sprint)
  └── develop     ← integração contínua do time
        ├── feature/US01-cadastro-usuario
        ├── feature/US02-login
        ├── feature/US03-avaliacao-nivel
        └── fix/correcao-calculo-nota
```

### Regras

1. **Nunca** commitar diretamente em `main` ou `develop`
2. Crie uma branch a partir de `develop` para cada história ou correção
3. Nomes de branch seguem o padrão:
   - `feature/<id>-<descricao-curta>` (ex: `feature/US01-cadastro-usuario`)
   - `fix/<descricao-curta>` (ex: `fix/validacao-cpf`)
   - `docs/<descricao-curta>` (ex: `docs/atualizar-burndown-sprint1`)
4. Merge para `develop` **somente via Pull Request** com ao menos **1 aprovação**
5. Merge `develop → main` ao final de cada sprint, após a Sprint Review

---

## Abrindo um Pull Request

Antes de abrir o PR:
- [ ] Sua branch está atualizada com `develop` (`git pull origin develop`)
- [ ] O código funciona localmente sem erros
- [ ] Todos os critérios do DoD foram atendidos
- [ ] Arquivos de ambiente (`.env`) **não** foram incluídos no commit

Na descrição do PR, informe:
- A US ou tarefa relacionada
- O que foi implementado / corrigido
- Como testar (passo a passo)
- Prints ou evidências (se for interface)

---

## Padrão para Atas de Daily

Para registrar uma daily, copie o template e nomeie com a data:

```bash
# Template:
docs/scrum/templates/daily.md

# Destino (substitua N pelo número da sprint e a data real):
docs/scrum/sprint-N/atas/dailies/YYYY-MM-DD.md

# Exemplo:
docs/scrum/sprint-1/atas/dailies/2026-04-14.md
```

---

## Dúvidas frequentes

**Posso commitar `.env`?**
Não. O `.gitignore` já exclui automaticamente. Nunca force o commit desse arquivo.

**Posso trabalhar direto na `main`?**
Não. A `main` só recebe merges da `develop` ao final de cada sprint.

**Posso aprovar meu próprio PR?**
Não. O PR precisa da aprovação de ao menos 1 outro membro antes do merge.

---

*Mantido pelo Scrum Master · Equipe DEVassos · 1DSM 2026/1*
