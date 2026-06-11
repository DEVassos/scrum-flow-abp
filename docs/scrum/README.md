# 🔄 Gestão Ágil — Scrum

← [Índice da Documentação](../README.md)

Visão geral de como o time aplica Scrum no projeto.

---

## 📋 Papéis

| Papel | Responsável | Atribuições |
|-------|-------------|-------------|
| **Product Owner** | Gustavo Koiti | Priorizar backlog, validar entregas, contato com parceiro |
| **Scrum Master** | Gabriel Travensolli | Facilitar cerimônias, remover impedimentos, manter fluxo |
| **Time de Desenvolvimento** | Andrea, Henrique, Lucas, Marcello, Vinicius | Implementar histórias, estimar, garantir DoD |

---

## 📅 Cerimônias

| Cerimônia | Frequência | Objetivo |
|-----------|------------|----------|
| **Sprint Planning** | Início de cada sprint | Selecionar histórias e quebrar em tarefas |
| **Daily Scrum** | Diária (≤ 15 min) | Sincronizar: fiz / vou fazer / impedimentos |
| **Sprint Review** | Final da sprint | Demonstrar incremento ao parceiro |
| **Sprint Retrospective** | Final da sprint | Refletir sobre processo e ajustar |
| **Backlog Refinement** | Ao longo da sprint | Detalhar e estimar próximas histórias |

> Templates de atas em [`templates/`](./templates/).

---

## 🗂️ Artefatos

| Artefato | Localização |
|----------|-------------|
| **Product Backlog** | [backlog/product-backlog.md](./backlog/product-backlog.md) |
| **Sprint Backlog** | `sprint-N/sprint-N.md` (em cada sprint) |
| **Incremento** | Branch `main` ao final de cada sprint |
| **Burndown** | Mermaid chart em cada `sprint-N.md` |

---

## 📆 Cronograma de Sprints

| Sprint | Período | Foco |
|--------|---------|------|
| [Sprint 1](./sprint-1/sprint-1.md) | 13/04 — 30/04/2026 | Documentação · Cadastro · Login |
| [Sprint 2](./sprint-2/sprint-2.md) | 04/05 — 21/05/2026 | Avaliação · Sorteio · Tentativas |
| [Sprint 3](./sprint-3/sprint-3.md) | 25/05 — 11/06/2026 | Histórico · Área Admin · UX/UI · Gamificação |

---

## ✅ Definition of Ready (DoR) e Definition of Done (DoD)

Cada sprint mantém o checklist específico em `sprint-N/dor-dod.md`.

**DoR resumido:** história tem critérios de aceite, é estimada e cabe na sprint.
**DoD resumido:** código revisado em PR, testado localmente, documentado e mergeado em `develop`.

> Template padrão: [templates/dor-dod-checklist.md](./templates/dor-dod-checklist.md)

> 🆕 **Item adicionado ao DoD:** "Documentação relacionada foi atualizada (se aplicável)".

---

## 🔗 Como Acompanhar o Andamento

- 📊 [Kanban no GitHub Projects](https://github.com/orgs/DEVassos/projects/4)
- 📅 [Sprint 1 (encerrada)](./sprint-1/sprint-1.md) · [Sprint 2 (encerrada)](./sprint-2/sprint-2.md) · [Sprint 3 (encerrada)](./sprint-3/sprint-3.md)
- 📋 [Product Backlog](./backlog/product-backlog.md)

---

<div align="center">
  <a href="../README.md">← Voltar ao Índice</a>
</div>
