← [Índice da Documentação](../../../README.md) · [Gestão Ágil — Scrum](../../README.md) · [Sprint 2](../sprint-2.md)

# Sprint Planning — Sprint 2

**Data:** 05/05/2026
**Horário:** 21:20 às 22:00
**Scrum Master:** Gabriel Travensolli
**Product Owner:** Gustavo Koiti
**Presentes:** Gabriel Travensolli, Gustavo Koiti, Andrea Turíbio, Henrique Camargo, Lucas Amorim, Marcello Campbell, Vinicius Augusto

---

## Meta da Sprint

> "Entregar o fluxo completo de avaliação — sorteio de questões, controle de tentativas, notas por módulo, média final e certificado digital."

Ao final desta sprint, o usuário autenticado conseguirá iniciar uma avaliação de módulo com 10 questões sorteadas, ter até 2 tentativas por módulo com a maior nota preservada, visualizar suas notas e média final no dashboard, e receber seu certificado digital ao concluir todos os módulos.

---

## Itens Selecionados do Backlog (Sprint Backlog)

| ID | História de Usuário | Estimativa (SP) | Responsáveis |
|----|---------------------|:---------------:|--------------|
| US03 | Realizar Avaliação de Módulo | 27 | Andrea, Gabriel, Gustavo, Henrique, Lucas, Marcello |
| US04 | Controle de Tentativas por Módulo | 16 | Andrea, Gabriel, Gustavo, Henrique, Lucas, Marcello, Vinicius |
| US05 | Nota Final por Módulo | 2 | Andrea, Gustavo |
| US06 | Média Final | 5 | Andrea, Gabriel, Lucas, Vinicius |
| US07 | Certificado Digital | 13 | Andrea, Henrique, Lucas, Marcello, Vinicius |
| — | Correção Responsividade *(ressalva Sprint 1)* | 4 | Andrea, Henrique, Lucas |
| — | Infra / Suporte | 10 | Gabriel, Gustavo, Marcello, Vinicius |
| — | Documentação | 12 | Gabriel, Gustavo, Marcello, Vinicius |

**Total de pontos comprometidos:** 96 SP (89 iniciais + 7 ressalvas de escopo)

---

## Decomposição em Tarefas

### US03 — Realizar Avaliação de Módulo *(27 SP)*

- [ ] S2_T01 — Endpoint GET /api/exames/:idExame/questoes — Responsável: Marcello + Gustavo *(3 SP)*
- [ ] S2_T02 — Endpoint POST /api/exames/:idExame/respostas — Responsável: Marcello + Gustavo *(5 SP)*
- [ ] S2_T03 — Revisar lógica de sortear questões — Responsável: Vinicius + Gabriel *(3 SP)*
- [ ] S2_T04 — Repository: exames.repositories.js — Responsável: Marcello + Gabriel *(3 SP)*
- [ ] S2_T05 — Página: avaliacao.html — Responsável: Andrea + Henrique *(3 SP)*
- [ ] S2_T06 — Fluxo de questões em avaliacao.js — Responsável: Andrea + Lucas *(5 SP)*
- [ ] S2_T07 — Tela de resultado imediato após submissão — Responsável: Henrique + Lucas *(3 SP)*
- [ ] S2_T08 — CSS: pages/avaliacao.css — Responsável: Andrea + Henrique + Lucas *(2 SP)*

### US04 — Controle de Tentativas por Módulo *(16 SP)*

- [ ] S2_T09 — Endpoint GET /api/usuarios/progresso (com melhor_nota) — Responsável: Marcello + Gustavo *(5 SP)*
- [ ] S2_T10 — Validação server-side em POST /api/exames (limite 2 tentativas) — Responsável: Vinicius + Gabriel *(3 SP)*
- [ ] S2_T11 — Repository: progresso.repositories.js — Responsável: Gustavo + Vinicius *(3 SP)*
- [ ] S2_T12 — Atualizar dashboard.html + dashboard.js — Responsável: Andrea + Henrique + Lucas *(3 SP)*
- [ ] S2_T13 — Fluxo de navegação: dashboard → avaliacao → resultado — Responsável: Andrea + Lucas *(2 SP)*

### US05 — Nota Final por Módulo *(2 SP)*

- [ ] S2_T19 — Exibir nota final por módulo no dashboard (dados do S2_T09) — Responsável: Andrea + Gustavo *(2 SP)*

### US06 — Média Final *(5 SP)*

- [ ] S2_T20 — Endpoint/lógica backend para calcular média final — Responsável: Vinicius + Gabriel *(3 SP)*
- [ ] S2_T21 — Exibir média final no dashboard (condicional: todos os módulos tentados) — Responsável: Andrea + Lucas *(2 SP)*

### US07 — Certificado Digital *(13 SP)*

- [ ] S2_T22 — Endpoint POST /api/certificados (gerar + persistir) — Responsável: Marcello + Gustavo *(5 SP)*
- [ ] S2_T23 — Repository: certificados.repositories.js — Responsável: Marcello + Vinicius *(3 SP)*
- [ ] S2_T24 — Página certificado.html + certificado.js — Responsável: Henrique + Lucas *(3 SP)*
- [ ] S2_T25 — CSS do certificado (layout + suporte a exportação/print) — Responsável: Andrea + Henrique *(2 SP)*

### Correção Responsividade — Ressalva Sprint 1 *(4 SP)*

- [ ] S2_T14 — Revisar index.html / index.css — responsividade mobile — Responsável: Henrique + Lucas *(2 SP)*
- [ ] S2_T15 — Breakpoints consistentes em global.css (mobile-first) — Responsável: Andrea + Henrique *(2 SP)*

### Infra / Suporte *(10 SP)*

- [ ] S2_T16 — Endpoint POST /api/exames (iniciar avaliação + sortear questões) — Responsável: Marcello + Gustavo *(5 SP)*
- [ ] S2_T17 — Coluna pontuacao em exames + migration SQL — Responsável: Vinicius + Gabriel *(3 SP)*
- [ ] S2_T18 — Testes manuais + roteiro de documentação do fluxo — Responsável: Vinicius + Gabriel *(2 SP)*

### Documentação *(12 SP)*

- [ ] S2_T26 — Atualizar diagramas UML (Caso de Uso, Classe e Sequência) — Responsável: Marcello + Vinicius + Gabriel *(5 SP)*
- [ ] S2_T27 — Atualizar modelos BD (conceitual + lógico) — novas tabelas — Responsável: Gabriel + Vinicius *(3 SP)*
- [ ] S2_T28 — Atualizar README.md — status Sprint 2, novas rotas e telas — Responsável: Gabriel + Gustavo *(2 SP)*
- [ ] S2_T29 — Revisar e atualizar Product Backlog — status das USs — Responsável: Gustavo *(2 SP)*

### Mudanças de Escopo (Ressalvas durante a Sprint) *(7 SP)*

- [ ] S2_T30 — Criar estrutura visual da página de módulos — Responsável: Andrea + Henrique *(2 SP)*
- [ ] S2_T31 — Implementar lógica dinâmica e progressão dos módulos — Responsável: Andrea + Lucas *(3 SP)*
- [ ] S2_T32 — Inserir conteúdos oficiais dos módulos ScrumFlow — Responsável: Gustavo + Gabriel *(2 SP)*

---

## Distribuição de Tarefas por Integrante

| Membro | Papel | Qtd | Tarefas |
|--------|:-----:|:---:|---------|
| Gabriel Travensolli | Scrum Master | 9 | S2_T03, S2_T04, S2_T10, S2_T17, S2_T18, S2_T20, S2_T26, S2_T27, S2_T28 |
| Gustavo Koiti | Product Owner | 9 | S2_T01, S2_T02, S2_T09, S2_T11, S2_T16, S2_T19, S2_T22, S2_T28, S2_T29 |
| Andrea Turíbio | Dev | 9 | S2_T05, S2_T06, S2_T08, S2_T12, S2_T13, S2_T15, S2_T19, S2_T21, S2_T25 |
| Vinicius Augusto | Dev | 9 | S2_T03, S2_T10, S2_T11, S2_T17, S2_T18, S2_T20, S2_T23, S2_T26, S2_T27 |
| Henrique Camargo | Dev | 8 | S2_T05, S2_T07, S2_T08, S2_T12, S2_T14, S2_T15, S2_T24, S2_T25 |
| Lucas Amorim | Dev | 8 | S2_T06, S2_T07, S2_T08, S2_T12, S2_T13, S2_T14, S2_T21, S2_T24 |
| Marcello Campbell | Dev | 8 | S2_T01, S2_T02, S2_T04, S2_T09, S2_T16, S2_T22, S2_T23, S2_T26 |

---

## Critérios de Aceite Revisados

- **US03:** Critérios confirmados conforme backlog — sorteio 3 fáceis + 4 médias + 3 difíceis; questões registradas antes de exibidas; pontuação calculada no back-end
- **US04:** Critérios confirmados — máximo 2 tentativas validadas server-side; maior nota preservada; dashboard exibe status e tentativas restantes
- **US05:** Critérios confirmados — nota exibida é a maior entre as tentativas; dados provenientes do endpoint de progresso (S2_T09)
- **US06:** Critérios confirmados — média aritmética das melhores notas; exibida com 2 casas decimais; condicional à conclusão de todos os módulos
- **US07:** Critérios confirmados — certificado gerado e persistido após ao menos 1 tentativa em todos os módulos; contém nome, CPF, e-mail, data de emissão e média final

---

## Riscos e Dependências Identificados

| Risco / Dependência | Impacto | Mitigação |
|---------------------|:-------:|-----------|
| Cadeia US03 → US04 → US05 → US06 → US07 (dependência em cascata) | Alto | Priorizar US03 e S2_T16 no início da sprint |
| S2_T16 (criar exame) e S2_T17 (migration SQL) bloqueiam todos os endpoints | Alto | Executar nas primeiras sessões de trabalho |
| Volume de 89 SP (+19% em relação à Sprint 1) | Médio | SM monitora o burndown diariamente |
| Geração do certificado digital (S2_T22) pode ser subestimada | Médio | Validar tecnologia de exportação antes de iniciar |
| Responsividade (S2_T14/S2_T15) — ressalva pendente da Sprint 1 | Médio | Aplicar breakpoints mobile-first desde o início das novas telas |
| Sorteio sem repetição de questões (S2_T03) | Médio | Validar e cobrir a lógica existente antes de expandir |

---

## Observações e Decisões Tomadas

- **Scrum Master deve observar o cumprimento das tarefas diariamente**, acompanhando o progresso de cada integrante nas Dailies e atualizando o Burndown Chart ao final de cada dia.
- Tarefas redistribuídas para garantir equilíbrio: 4 membros com 9 tarefas e 3 membros com 8 tarefas.
- US05 e US06 aproveitam dados já retornados pelo endpoint de progresso (S2_T09), minimizando retrabalho.
- Ressalva de responsividade da Sprint 1 formalizada como tasks S2_T14 e S2_T15 nesta sprint.

<div align="center">
  <a href="../../../README.md">← Voltar ao Índice</a> · <a href="../../README.md">Gestão Ágil — Scrum</a> · <a href="../sprint-2.md">Sprint 2</a>
</div>
