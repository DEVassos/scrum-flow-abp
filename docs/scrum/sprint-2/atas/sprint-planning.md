← [Sprint 2](../sprint-2.md)

# Sprint Planning — Sprint 2

**Data:** 05/05/2026
**Horário:** 21:20 às 22:00
**Scrum Master:** Gabriel Travensolli
**Product Owner:** Gustavo Koiti
**Presentes:** Gabriel Travensolli, Gustavo Koiti, Andrea Turíbio, Henrique Camargo, Lucas Amorim, Marcello Campbell, Vinicius Augusto

---

## Meta da Sprint

> "Entregar o fluxo completo de avaliação — sorteio de questões, controle de tentativas, notas por nível, média final e certificado digital."

Ao final desta sprint, o usuário autenticado conseguirá iniciar uma avaliação de nível com 10 questões sorteadas, ter até 2 tentativas por nível com a maior nota preservada, visualizar suas notas e média final no dashboard, e receber seu certificado digital ao concluir todos os níveis.

---

## Itens Selecionados do Backlog (Sprint Backlog)

| ID | História de Usuário | Estimativa (SP) | Responsáveis |
|----|---------------------|:---------------:|--------------|
| US03 | Realizar Avaliação de Nível | 27 | Andrea, Gabriel, Gustavo, Henrique, Lucas, Marcello |
| US04 | Controle de Tentativas por Nível | 16 | Andrea, Gabriel, Gustavo, Henrique, Lucas, Marcello, Vinicius |
| US05 | Nota Final por Nível | 2 | Andrea, Gustavo |
| US06 | Média Final | 5 | Andrea, Gabriel, Lucas, Vinicius |
| US07 | Certificado Digital | 13 | Andrea, Henrique, Lucas, Marcello, Vinicius |
| — | Correção Responsividade *(ressalva Sprint 1)* | 4 | Andrea, Henrique, Lucas |
| — | Infra / Suporte | 10 | Gabriel, Gustavo, Marcello, Vinicius |
| — | Documentação | 12 | Gabriel, Gustavo, Marcello, Vinicius |

**Total de pontos comprometidos:** 89 SP

---

## Decomposição em Tarefas

### US03 — Realizar Avaliação de Nível *(27 SP)*

- [ ] T01 — Endpoint GET /api/exames/:idExame/questoes — Responsável: Marcello + Gustavo *(3 SP)*
- [ ] T02 — Endpoint POST /api/exames/:idExame/respostas — Responsável: Marcello + Gustavo *(5 SP)*
- [ ] T03 — Revisar lógica de sortear questões — Responsável: Vinicius + Gabriel *(3 SP)*
- [ ] T04 — Repository: exames.repositories.js — Responsável: Marcello + Gabriel *(3 SP)*
- [ ] T05 — Página: avaliacao.html — Responsável: Andrea + Henrique *(3 SP)*
- [ ] T06 — Fluxo de questões em avaliacao.js — Responsável: Andrea + Lucas *(5 SP)*
- [ ] T07 — Tela de resultado imediato após submissão — Responsável: Henrique + Lucas *(3 SP)*
- [ ] T08 — CSS: pages/avaliacao.css — Responsável: Andrea + Henrique + Lucas *(2 SP)*

### US04 — Controle de Tentativas por Nível *(16 SP)*

- [ ] T09 — Endpoint GET /api/usuarios/progresso (com melhor_nota) — Responsável: Marcello + Gustavo *(5 SP)*
- [ ] T10 — Validação server-side em POST /api/exames (limite 2 tentativas) — Responsável: Vinicius + Gabriel *(3 SP)*
- [ ] T11 — Repository: progresso.repositories.js — Responsável: Gustavo + Vinicius *(3 SP)*
- [ ] T12 — Atualizar dashboard.html + dashboard.js — Responsável: Andrea + Henrique + Lucas *(3 SP)*
- [ ] T13 — Fluxo de navegação: dashboard → avaliacao → resultado — Responsável: Andrea + Lucas *(2 SP)*

### US05 — Nota Final por Nível *(2 SP)*

- [ ] T19 — Exibir nota final por nível no dashboard (dados do T09) — Responsável: Andrea + Gustavo *(2 SP)*

### US06 — Média Final *(5 SP)*

- [ ] T20 — Endpoint/lógica backend para calcular média final — Responsável: Vinicius + Gabriel *(3 SP)*
- [ ] T21 — Exibir média final no dashboard (condicional: todos os níveis tentados) — Responsável: Andrea + Lucas *(2 SP)*

### US07 — Certificado Digital *(13 SP)*

- [ ] T22 — Endpoint POST /api/certificados (gerar + persistir) — Responsável: Marcello + Gustavo *(5 SP)*
- [ ] T23 — Repository: certificados.repositories.js — Responsável: Marcello + Vinicius *(3 SP)*
- [ ] T24 — Página certificado.html + certificado.js — Responsável: Henrique + Lucas *(3 SP)*
- [ ] T25 — CSS do certificado (layout + suporte a exportação/print) — Responsável: Andrea + Henrique *(2 SP)*

### Correção Responsividade — Ressalva Sprint 1 *(4 SP)*

- [ ] T14 — Revisar index.html / index.css — responsividade mobile — Responsável: Henrique + Lucas *(2 SP)*
- [ ] T15 — Breakpoints consistentes em global.css (mobile-first) — Responsável: Andrea + Henrique *(2 SP)*

### Infra / Suporte *(10 SP)*

- [ ] T16 — Endpoint POST /api/exames (iniciar avaliação + sortear questões) — Responsável: Marcello + Gustavo *(5 SP)*
- [ ] T17 — Coluna pontuacao em exames + migration SQL — Responsável: Vinicius + Gabriel *(3 SP)*
- [ ] T18 — Testes manuais + roteiro de documentação do fluxo — Responsável: Vinicius + Gabriel *(2 SP)*

### Documentação *(12 SP)*

- [ ] T26 — Atualizar diagramas UML (Caso de Uso, Classe e Sequência) — Responsável: Marcello + Vinicius + Gabriel *(5 SP)*
- [ ] T27 — Atualizar modelos BD (conceitual + lógico) — novas tabelas — Responsável: Gabriel + Vinicius *(3 SP)*
- [ ] T28 — Atualizar README.md — status Sprint 2, novas rotas e telas — Responsável: Gabriel + Gustavo *(2 SP)*
- [ ] T29 — Revisar e atualizar Product Backlog — status das USs — Responsável: Gustavo *(2 SP)*

---

## Distribuição de Tarefas por Integrante

| Membro | Papel | Qtd | Tarefas |
|--------|:-----:|:---:|---------|
| Gabriel Travensolli | Scrum Master | 9 | T03, T04, T10, T17, T18, T20, T26, T27, T28 |
| Gustavo Koiti | Product Owner | 9 | T01, T02, T09, T11, T16, T19, T22, T28, T29 |
| Andrea Turíbio | Dev | 9 | T05, T06, T08, T12, T13, T15, T19, T21, T25 |
| Vinicius Augusto | Dev | 9 | T03, T10, T11, T17, T18, T20, T23, T26, T27 |
| Henrique Camargo | Dev | 8 | T05, T07, T08, T12, T14, T15, T24, T25 |
| Lucas Amorim | Dev | 8 | T06, T07, T08, T12, T13, T14, T21, T24 |
| Marcello Campbell | Dev | 8 | T01, T02, T04, T09, T16, T22, T23, T26 |

---

## Critérios de Aceite Revisados

- **US03:** Critérios confirmados conforme backlog — sorteio 3 fáceis + 4 médias + 3 difíceis; questões registradas antes de exibidas; pontuação calculada no back-end
- **US04:** Critérios confirmados — máximo 2 tentativas validadas server-side; maior nota preservada; dashboard exibe status e tentativas restantes
- **US05:** Critérios confirmados — nota exibida é a maior entre as tentativas; dados provenientes do endpoint de progresso (T09)
- **US06:** Critérios confirmados — média aritmética das melhores notas; exibida com 2 casas decimais; condicional à conclusão de todos os níveis
- **US07:** Critérios confirmados — certificado gerado e persistido após ao menos 1 tentativa em todos os níveis; contém nome, CPF, e-mail, data de emissão e média final

---

## Riscos e Dependências Identificados

| Risco / Dependência | Impacto | Mitigação |
|---------------------|:-------:|-----------|
| Cadeia US03 → US04 → US05 → US06 → US07 (dependência em cascata) | Alto | Priorizar US03 e T16 no início da sprint |
| T16 (criar exame) e T17 (migration SQL) bloqueiam todos os endpoints | Alto | Executar nas primeiras sessões de trabalho |
| Volume de 89 SP (+19% em relação à Sprint 1) | Médio | SM monitora o burndown diariamente |
| Geração do certificado digital (T22) pode ser subestimada | Médio | Validar tecnologia de exportação antes de iniciar |
| Responsividade (T14/T15) — ressalva pendente da Sprint 1 | Médio | Aplicar breakpoints mobile-first desde o início das novas telas |
| Sorteio sem repetição de questões (T03) | Médio | Validar e cobrir a lógica existente antes de expandir |

---

## Observações e Decisões Tomadas

- **Scrum Master deve observar o cumprimento das tarefas diariamente**, acompanhando o progresso de cada integrante nas Dailies e atualizando o Burndown Chart ao final de cada dia.
- Tarefas redistribuídas para garantir equilíbrio: 4 membros com 9 tarefas e 3 membros com 8 tarefas.
- US05 e US06 aproveitam dados já retornados pelo endpoint de progresso (T09), minimizando retrabalho.
- Ressalva de responsividade da Sprint 1 formalizada como tasks T14 e T15 nesta sprint.

<div align="center">
  <a href="../sprint-2.md">← Voltar à Sprint 2</a>
</div>
