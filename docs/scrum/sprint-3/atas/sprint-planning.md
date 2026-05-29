← [Sprint 3](../sprint-3.md)

# Sprint Planning — Sprint 3

**Data:** 28/05/2026
**Horário:** 20:00 às 21:30
**Scrum Master:** Gabriel Travensolli
**Product Owner:** Gustavo Koiti
**Presentes:** Gabriel Travensolli, Gustavo Koiti, Andrea Turíbio, Henrique Camargo, Lucas Amorim, Marcello Campbell, Vinicius Augusto

---

## Meta da Sprint

> "Entregar o histórico de tentativas (US08) e a área administrativa (US09), corrigir bugs remanescentes, melhorar a experiência visual da aplicação e preparar a apresentação final do projeto."

Ao final desta sprint, o usuário autenticado conseguirá consultar o histórico detalhado de suas tentativas por módulo, com questões sorteadas e gabarito. O administrador terá acesso a uma área exclusiva para gerenciar questões, alternativas, níveis e resetar senhas de usuários. Bugs críticos de exames, validação e rotas serão corrigidos. A interface receberá melhorias visuais significativas (responsividade, gamificação, terminologia "Módulo") e a documentação será atualizada para a apresentação final.

---

## Itens Selecionados do Backlog (Sprint Backlog)

| ID | História de Usuário | Estimativa (SP) | Responsáveis |
|----|---------------------|:---------------:|-----------------|
| US08 | Histórico de Tentativas | 13 | Marcello, Gustavo, Vinicius, Henrique, Lucas, Andrea |
| US09 | Área Administrativa | 19 | Marcello, Gustavo, Vinicius, Gabriel, Andrea, Henrique, Lucas |
| — | Bug Fixes — Exames e Progressão | 24 | Marcello, Gustavo, Vinicius, Gabriel, Henrique, Lucas, Andrea |
| — | Autenticação e Sessão | 6 | Marcello, Vinicius, Andrea |
| — | Melhorias UX/UI | 26 | Andrea, Henrique, Lucas, Marcello, Gabriel |
| — | Documentação | 11 | Marcello, Vinicius, Gabriel, Gustavo, Andrea |
| — | Gamificação (Extensão Opcional) | 5 | Henrique, Lucas, Andrea |
| — | Infraestrutura e Deploy | 3 | Gabriel, Vinicius, Marcello, Gustavo |
| — | Refatoração de Fluxo (Bônus) | 5 | Andrea, Henrique, Lucas |
| — | Apresentação Final | 3 | Gustavo, Gabriel, Time completo |

**Total de pontos comprometidos:** 115 SP

---

## Decomposição em Tarefas

### US08 — Histórico de Tentativas *(13 SP)*

- [ ] S3_T13 — Repository: historico.repositories.js — Responsável: Marcello + Vinicius *(2 SP)*
- [ ] S3_T14 — Endpoint GET /api/historico/:idUsuario — Responsável: Marcello + Gustavo *(3 SP)*
- [ ] S3_T15 — Página historico.html + historico.js — Responsável: Henrique + Lucas *(3 SP)*
- [ ] S3_T16 — CSS: pages/historico.css — Responsável: Andrea + Henrique *(2 SP)*
- [ ] S3_T17 — Exibir questões erradas na tela de resultado — Responsável: Henrique + Lucas *(3 SP)*

### US09 — Área Administrativa *(19 SP)*

- [ ] S3_T18 — Auth admin — middleware de perfil — Responsável: Marcello + Gustavo *(3 SP)*
- [ ] S3_T19 — CRUD de questões e alternativas (backend) — Responsável: Marcello + Vinicius + Gustavo *(5 SP)*
- [ ] S3_T20 — CRUD de níveis (backend) — Responsável: Vinicius + Gabriel *(3 SP)*
- [ ] S3_T21 — Interface administrativa (frontend) — Responsável: Andrea + Henrique + Lucas *(5 SP)*
- [ ] S3_T22 — Reset de senha via admin — Responsável: Marcello + Gustavo *(3 SP)*

### Bug Fixes — Exames e Progressão *(24 SP)*

- [ ] S3_T01 — Recriação automática de exame inicial — Responsável: Marcello + Gustavo *(3 SP)*
- [ ] S3_T02 — Integridade após reset de usuário — Responsável: Vinicius + Gabriel *(2 SP)*
- [ ] S3_T03 — Corrigir carregamento de imagens das questões — Responsável: Marcello + Gustavo *(3 SP)*
- [ ] S3_T04 — Corrigir mensagens de validação no cadastro — Responsável: Henrique + Lucas *(2 SP)*
- [ ] S3_T05 — Corrigir animação inicial (2ª linha) — Responsável: Andrea + Lucas *(2 SP)*
- [ ] S3_T06 — Corrigir exibição da escrita/texto na prova — Responsável: Henrique + Lucas *(1 SP)*
- [ ] S3_T07 — Corrigir navbar inconsistente após login — Responsável: Henrique + Lucas *(3 SP)*
- [ ] S3_T08 — Corrigir links do footer — Responsável: Andrea + Lucas *(1 SP)*
- [ ] S3_T09 — Corrigir rota manifesto pré-login — Responsável: Vinicius + Gabriel *(2 SP)*
- [ ] S3_T10 — Corrigir rota scrum pré-login — Responsável: Vinicius + Gabriel *(2 SP)*
- [ ] S3_T11 — Corrigir animação invertida hover footer — Responsável: Andrea *(1 SP)*
- [ ] S3_T12 — Verificar/corrigir comportamento após fim das tentativas — Responsável: Vinicius + Gabriel *(2 SP)*

### Autenticação e Sessão *(6 SP)*

- [ ] S3_T24 — Aumentar tempo de sessão JWT + exibir tempo restante — Responsável: Marcello + Vinicius *(2 SP)*
- [ ] S3_T25 — Excluir checkbox "Lembrar de mim" — Responsável: Andrea *(1 SP)*
- [ ] S3_T26 — Proteger rotas privadas — Responsável: Vinicius + Marcello *(3 SP)*

### Melhorias UX/UI *(26 SP)*

- [ ] S3_T27 — Ajustar botão 'Sair' na navbar — Responsável: Andrea + Lucas *(1 SP)*
- [ ] S3_T28 — Adicionar favicon do ScrumFlow — Responsável: Andrea + Henrique *(1 SP)*
- [ ] S3_T29 — Criar página 'Sobre' — Responsável: Lucas + Gabriel *(2 SP)*
- [ ] S3_T30 — Melhorar responsividade geral — Responsável: Andrea + Henrique + Lucas *(3 SP)*
- [ ] S3_T31 — Refatorar página 'O que é Scrum' — Responsável: Andrea + Lucas *(2 SP)*
- [ ] S3_T32 — Corrigir redundância do nome no Dashboard — Responsável: Andrea *(1 SP)*
- [ ] S3_T33 — Melhorar frase contraste Dashboard — Responsável: Andrea *(1 SP)*
- [ ] S3_T34 — Melhorar layout da seção de provas — Responsável: Henrique + Lucas *(3 SP)*
- [ ] S3_T35 — Alterar mensagem pós-prova — Responsável: Lucas + Henrique *(2 SP)*
- [ ] S3_T36 — Exibir nota para certificado por módulo — Responsável: Marcello + Henrique *(2 SP)*
- [ ] S3_T37 — Trocar "Nível" por "Módulo" na UI — Responsável: Andrea + Henrique *(3 SP)*
- [ ] S3_T38 — Certificado branco para impressão — Responsável: Andrea + Henrique *(2 SP)*
- [ ] S3_T39 — Centralizar links na navbar — Responsável: Andrea + Lucas *(1 SP)*
- [ ] S3_T40 — Melhorar nome do usuário na navbar — Responsável: Andrea + Henrique *(2 SP)*

### Documentação *(11 SP)*

- [ ] S3_T41 — Atualizar diagramas UML — Responsável: Marcello + Vinicius + Gabriel *(3 SP)*
- [ ] S3_T42 — Atualizar modelos BD — Responsável: Gabriel + Vinicius *(2 SP)*
- [ ] S3_T43 — Atualizar README.md — Responsável: Gabriel + Gustavo *(1 SP)*
- [ ] S3_T44 — Atualizar Product Backlog — Responsável: Gustavo *(1 SP)*
- [ ] S3_T45 — Melhorar organização da documentação Git — Responsável: Gabriel + Vinicius *(2 SP)*
- [ ] S3_T46 — Criar manual de uso do aluno — Responsável: Gabriel + Andrea *(2 SP)*

### Gamificação — Extensão Opcional *(5 SP)*

- [ ] S3_T47 — Animação de conclusão de módulo — Responsável: Henrique + Lucas *(2 SP)*
- [ ] S3_T48 — Animação de geração de certificado — Responsável: Andrea + Henrique *(2 SP)*
- [ ] S3_T49 — Mensagens motivacionais — Responsável: Andrea + Lucas *(1 SP)*

### Infraestrutura *(3 SP)*

- [ ] S3_T23 — Reorganizar estrutura do repositório — Responsável: Gabriel + Vinicius *(2 SP)*
- [ ] S3_T50 — Atualizar deploy no Render — Responsável: Marcello + Gustavo *(1 SP)*

### Refatoração de Fluxo de Páginas — Bônus *(5 SP)*

- [ ] S3_T51 — Padronizar navbar em todas as páginas — Responsável: Andrea + Henrique + Lucas *(3 SP)*
- [ ] S3_T52 — Incluir footer em todas as páginas — Responsável: Andrea + Henrique *(2 SP)*

### Apresentação Final *(3 SP)*

- [ ] S3_T53 — Criar roteiro da apresentação final — Responsável: Gustavo + Gabriel *(2 SP)*
- [ ] S3_T54 — Realizar ensaio técnico — Responsável: Time completo *(1 SP)*

---

## Distribuição de Tarefas por Integrante

| Membro | Papel | Qtd (Tarefas / SP) | Tarefas |
|--------|:-----:|:------------------:|---------|
| Gabriel Travensolli | SM | 12 (26 SP) | S3_T02, S3_T09, S3_T10, S3_T12, S3_T20, S3_T23, S3_T29, S3_T41, S3_T42, S3_T45, S3_T46, S3_T53 |
| Gustavo Koiti | PO | 11 (26 SP) | S3_T01, S3_T03, S3_T14, S3_T18, S3_T19, S3_T22, S3_T43, S3_T44, S3_T50, S3_T53, S3_T54 |
| Andrea Turíbio | Dev | 21 (39 SP) | S3_T05, S3_T08, S3_T11, S3_T16, S3_T21, S3_T25, S3_T27, S3_T28, S3_T30, S3_T31, S3_T32, S3_T33, S3_T37, S3_T38, S3_T39, S3_T40, S3_T46, S3_T48, S3_T49, S3_T51, S3_T52 |
| Henrique Camargo | Dev | 19 (46 SP) | S3_T04, S3_T06, S3_T07, S3_T15, S3_T16, S3_T17, S3_T21, S3_T28, S3_T30, S3_T34, S3_T35, S3_T36, S3_T37, S3_T38, S3_T40, S3_T47, S3_T48, S3_T51, S3_T52 |
| Lucas Amorim | Dev | 18 (40 SP) | S3_T04, S3_T05, S3_T06, S3_T07, S3_T08, S3_T15, S3_T17, S3_T21, S3_T27, S3_T29, S3_T30, S3_T31, S3_T34, S3_T35, S3_T39, S3_T47, S3_T49, S3_T51 |
| Marcello Campbell | Dev | 13 (34 SP) | S3_T01, S3_T03, S3_T13, S3_T14, S3_T18, S3_T19, S3_T22, S3_T24, S3_T26, S3_T36, S3_T41, S3_T50, S3_T54 |
| Vinicius Augusto | Dev | 14 (33 SP) | S3_T02, S3_T09, S3_T10, S3_T12, S3_T13, S3_T19, S3_T20, S3_T23, S3_T24, S3_T26, S3_T41, S3_T42, S3_T45, S3_T54 |

---

## Critérios de Aceite Revisados

- **US08:** Critérios confirmados conforme backlog — histórico exibe tentativas por módulo com data/hora, pontuação, questões sorteadas, resposta escolhida vs. correta; ordenação cronológica; dados recuperados do banco
- **US09:** Critérios confirmados — acesso restrito a perfil admin; CRUD completo de questões, alternativas e níveis; exatamente uma alternativa correta por questão; reset de senha pelo admin; interface responsiva

---

## Riscos e Dependências Identificados

| Risco / Dependência | Impacto | Mitigação |
|---------------------|:-------:|-----------:|
| Cadeia Bug Fixes → US08 → US09 (dependência em cascata) | Alto | Priorizar Bug Fixes na Semana 1; US08 backend antes do frontend |
| S3_T18 (auth admin) bloqueia todo o fluxo US09 | Alto | Executar S3_T18 logo após US08 backend estar pronto |
| Volume de 115 SP (~20% acima da velocidade da Sprint 2) | Alto | SM monitora burndown diariamente; Gamificação e Refactor como stretch goals |
| Refatoração de navbar/footer (S3_T51/S3_T52) pode causar regressão | Médio | Executar apenas após code freeze de funcionalidades |
| Feriado de Corpus Christi (04/06) reduz 1 dia útil | Baixo | Já considerado no burndown (13 dias úteis) |
| Dependência entre Trilha A (backend) e Trilha B (frontend) | Médio | Trilha B trabalha em quick wins UX enquanto aguarda endpoints |

---

## Observações e Decisões Tomadas

- **US09 é obrigatória**, não extensão opcional — escopo comprometido pelo time na Sprint Planning.
- **Reset de senha** via admin (S3_T22) substitui o fluxo completo com e-mail — decisão do PO para evitar SMTP.
- **"Lembrar de mim"** será removido (S3_T25) — PO decidiu não implementar.
- **"Nível" → "Módulo"** será trocado apenas na UI (S3_T37) — sem alterar banco de dados.
- **Certificado branco para impressão** aprovado pelo PO (S3_T38) — implementar via CSS `@media print`.
- **Comportamento após 2 tentativas** será verificado e corrigido (S3_T12) — garantir estado consistente.
- **Manual de uso do aluno** (S3_T46) será criado como documento de referência.
- **Refactor de navbar/footer** (S3_T51/S3_T52) é o **último passo** — executar somente sobre código estabilizado.
- Time organizado em **3 trilhas paralelas** conforme plano consolidado.
- Scrum Master deve acompanhar burndown diariamente e escalar se P0+P1 não forem concluídos até o final da Semana 2.

<div align="center">
  <a href="../sprint-3.md">← Voltar à Sprint 3</a>
</div>
