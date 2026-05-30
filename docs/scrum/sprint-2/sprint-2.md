← [Índice da Documentação](../../00-INDICE.md)

# Sprint 2

**Período:** 04/05/2026 — 21/05/2026
**Sprint Goal:** _Entregar o fluxo completo de avaliação — sorteio de questões, controle de tentativas, notas por módulo, média final e certificado digital._
**Histórias:** US03, US04, US05, US06, US07
**Total de pontos comprometidos:** 96 SP (89 iniciais + 7 ressalvas)
**Scrum Master:** Gabriel Travensolli
**Product Owner:** Gustavo Koiti

---

## Sprint Backlog

| # | Tarefa | História | Responsável | Status |
|:-:|--------|:--------:|-------------|:------:|
| T01 | Endpoint GET /api/exames/:idExame/questoes | US03 | Marcello + Gustavo | ✅ |
| T02 | Endpoint POST /api/exames/:idExame/respostas | US03 | Marcello + Gustavo | ✅ |
| T03 | Revisar lógica de sortear questões | US03 | Vinicius + Gabriel | ✅ |
| T04 | Repository: exames.repositories.js | US03 | Marcello + Gabriel | ✅ |
| T05 | Página: avaliacao.html | US03 | Andrea + Henrique | ✅ |
| T06 | Fluxo de questões em avaliacao.js | US03 | Andrea + Lucas | ✅ |
| T07 | Tela de resultado imediato após submissão | US03 | Henrique + Lucas | ✅ |
| T08 | CSS: pages/avaliacao.css | US03 | Andrea + Henrique + Lucas | ✅ |
| T09 | Endpoint GET /api/usuarios/progresso | US04 | Marcello + Gustavo | ✅ |
| T10 | Validação server-side em POST /api/exames (limite 2 tentativas) | US04 | Vinicius + Gabriel | ✅ |
| T11 | Repository: progresso.repositories.js | US04 | Gustavo + Vinicius | ✅ |
| T12 | Atualizar dashboard.html + dashboard.js | US04 | Andrea + Henrique + Lucas | ✅ |
| T13 | Fluxo de navegação: dashboard → avaliacao → resultado | US04 | Andrea + Lucas | ✅ |
| T14 | Revisar index.html / index.css — responsividade mobile *(ressalva S1)* | Correção | Henrique + Lucas | ✅ |
| T15 | Breakpoints consistentes em global.css (mobile-first) *(ressalva S1)* | Correção | Andrea + Henrique | ✅ |
| T16 | Endpoint POST /api/exames (iniciar avaliação + sortear questões) | Infra | Marcello + Gustavo | ✅ |
| T17 | Coluna pontuacao em exames + migration SQL | Infra | Vinicius + Gabriel | ✅ |
| T18 | Testes manuais + roteiro de documentação do fluxo | Infra | Vinicius + Gabriel | ✅ |
| T19 | Exibir nota final por módulo no dashboard | US05 | Andrea + Gustavo | ✅ |
| T20 | Endpoint/lógica backend para calcular média final | US06 | Vinicius + Gabriel | ✅ |
| T21 | Exibir média final no dashboard (condicional) | US06 | Andrea + Lucas | ✅ |
| T22 | Endpoint POST /api/certificados (gerar + persistir) | US07 | Marcello + Gustavo | ✅ |
| T23 | Repository: certificados.repositories.js | US07 | Marcello + Vinicius | ✅ |
| T24 | Página certificado.html + certificado.js | US07 | Henrique + Lucas | ✅ |
| T25 | CSS do certificado (layout + suporte a exportação/print) | US07 | Andrea + Henrique | ✅ |
| T26 | Atualizar diagramas UML (Caso de Uso, Classe e Sequência) | Doc | Marcello + Vinicius + Gabriel | ✅ |
| T27 | Atualizar modelos BD (conceitual + lógico) — novas tabelas | Doc | Gabriel + Vinicius | ✅ |
| T28 | Atualizar README.md — status Sprint 2, novas rotas e telas | Doc | Gabriel + Gustavo | ✅ |
| T29 | Revisar e atualizar Product Backlog — status das USs | Doc | Gustavo | ✅ |
| T30 | Criar estrutura visual da página de módulos | US04 | Andrea + Henrique | ✅ |
| T31 | Implementar lógica dinâmica e progressão dos módulos | US04 | Andrea + Lucas | ✅ |
| T32 | Inserir conteúdos oficiais dos módulos ScrumFlow | US04 | Gustavo + Gabriel | ✅ |

**Incremento esperado ao final da Sprint:**

- Usuário consegue iniciar e completar uma avaliação com 10 questões sorteadas por módulo
- Sistema controla e bloqueia após 2 tentativas, considerando sempre a maior nota
- Notas por módulo e média final exibidas no dashboard
- Certificado digital gerado e persistido após conclusão de todos os módulos
- Todas as páginas com responsividade mobile corrigida
- Diagramas UML e modelos de BD atualizados com as novas entidades

---

## Burndown Chart

> Atualizado diariamente pelo Scrum Master ao final de cada Daily.

**Como atualizar o gráfico:**
1. Edite a segunda linha `line [...]` do bloco Mermaid abaixo substituindo cada valor pelo total de pontos **restantes** naquele dia
2. Preencha a mesma informação na coluna **Pontos Real** da tabela de acompanhamento
3. Ajuste o intervalo do `y-axis` conforme necessário

```mermaid
xychart-beta
    title "Burndown — Sprint 2 (04/05 a 21/05/2026)"
    x-axis ["04/05", "05/05", "06/05", "07/05", "08/05", "11/05", "12/05", "13/05", "14/05", "15/05", "18/05", "19/05", "20/05", "21/05"]
    y-axis "Pontos Restantes" 0 --> 100
    line [96, 89, 81, 74, 66, 59, 52, 44, 37, 30, 22, 15, 7, 0]
    line [96, 96, 96, 78, 53, 50, 38, 38, 30, 13, 11, 11, 11, 0]
```

> 🔵 **Linha 1 — Ideal:** queima linear esperada (não editar)
> 🟠 **Linha 2 — Real:** substituir os `89` pelos pontos efetivamente restantes a cada dia

| Dia | Data | Dia da semana | Pontos Ideal | Pontos Real | Impedimentos |
|:---:|:----:|:-------------:|:------------:|:-----------:|:-------------|
| 1  | 04/05 | Segunda | 96 | 96 | — |
| 2  | 05/05 | Terça   | 89 | 96 | Sprint Planning (Sem Daily) |
| 3  | 06/05 | Quarta  | 81 | 96 | — |
| 4  | 07/05 | Quinta  | 74 | 78 | — |
| 5  | 08/05 | Sexta   | 66 | 53 | — |
| 6  | 11/05 | Segunda | 59 | 50 | — |
| 7  | 12/05 | Terça   | 52 | 38 | — |
| 8  | 13/05 | Quarta  | 44 | 38 | (Sem Daily) |
| 9  | 14/05 | Quinta  | 37 | 30 | — |
| 10 | 15/05 | Sexta   | 30 | 13 | — |
| 11 | 18/05 | Segunda | 22 | 11 | — |
| 12 | 19/05 | Terça   | 15 | 11 | — |
| 13 | 20/05 | Quarta  |  7 | 11 | — |
| 14 | 21/05 | Quinta  |  0 |  0 | — |

---

## Cerimônias

| Cerimônia | Ata |
|-----------|-----|
| Sprint Planning | [atas/sprint-planning.md](atas/sprint-planning.md) |
| Sprint Review | [atas/sprint-review.md](atas/sprint-review.md) |
| Sprint Retrospective | [atas/sprint-retrospectiva.md](atas/sprint-retrospectiva.md) |
| Dailies | [atas/dailies/](atas/dailies/) |

> As atas são criadas a partir dos templates em [`templates/`](../templates/).

---

## DoR e DoD

Checklists de entrada (DoR) e conclusão (DoD) das histórias desta sprint:

[dor-dod.md](dor-dod.md)

---

## Resultado da Sprint

> A preencher ao final da Sprint Review.

**Pontos planejados:** 89
**Pontos entregues (DoD completo):** —
**Pontos não entregues:** —
**Velocidade da sprint:** — pontos

**Histórias concluídas:** —
**Histórias não entregues (e motivo):** —

### Observações sobre a execução

> Registre desvios do burndown, bloqueios recorrentes, mudança de escopo ou qualquer fato relevante para a retrospectiva.

_A preencher na Sprint Review / Retrospectiva._
