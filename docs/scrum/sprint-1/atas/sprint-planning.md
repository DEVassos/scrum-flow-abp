# Sprint Planning — Sprint 1

**Data:** 14/04/2026  
**Horário:** 21:30 às 22:30  
**Scrum Master:** Gabriel Travensolli  
**Product Owner:** Gustavo Koiti  
**Presentes:** Gabriel Travensolli, Gustavo Koiti, Andrea Turíbio, Henrique Camargo, Lucas Amorim, Marcello Campbell, Vinicius Augusto

---

## Meta da Sprint

Ao final desta sprint, qualquer usuário poderá se cadastrar e fazer login na plataforma, com dados validados no front-end, processados no back-end e persistidos no PostgreSQL. Paralelamente, toda a documentação técnica e de produto estará produzida e revisada, garantindo que o time execute as sprints com base sólida e alinhada.

---

## Itens Selecionados do Backlog (Sprint Backlog)

| ID | História de Usuário | Estimativa (pontos) | Responsável |
|----|---------------------|---------------------|-------------|
| DOC | Documentação da Aplicação | 39 SP | Todos |
| US01 | Cadastro de Usuário | 18 SP | Todos |
| US02 | Login | 18 SP | Todos |

**Total de pontos comprometidos:** 75 SP

---

## Decomposição em Tarefas

### DOC — Documentação da Aplicação

| ID | Tarefa | Responsável | SP |
|----|--------|-------------|----|
| T1 | Elaboração `README.md` / Kanban | Gustavo, Gabriel | 2 |
| T2 | Diagramas de Caso de Uso | Marcello, Vinicius, Gustavo, Gabriel | 5 |
| T3 | Diagramas de Classe | Marcello, Gustavo, Gabriel | 5 |
| T4 | Diagramas de Sequência | Marcello, Vinicius, Gustavo, Gabriel | 5 |
| T5 | Modelo Conceitual do BD | Marcello, Vinicius, Gabriel | 3 |
| T6 | Modelo Lógico do BD | Marcello, Vinicius, Gustavo | 3 |
| T7 | Identidade Visual | Andrea, Henrique, Lucas | 8 |
| T8 | Prototipação da Aplicação (Figma) | Andrea, Henrique, Lucas | 8 |

**Subtotal: 39 SP**


### US01 — Cadastro de Usuário

| ID | Tarefa | Responsável | SP |
|----|--------|-------------|----|
| T9 | Estrutura do projeto HTML/CSS/JS | Andrea, Henrique, Lucas | 2 |
| T10 | Página de cadastro (HTML + CSS) | Andrea, Henrique, Lucas | 2 |
| T11 | Validação de formulário JS com CPF | Andrea, Henrique, Lucas | 2 |
| T12 | Rota POST de cadastro | Marcello, Gustavo | 2 |
| T13 | Criptografia de senha no cadastro (bcrypt) | Marcello, Gustavo | 2 |
| T14 | Validar CPF único no backend | Vinicius, Gabriel | 2 |
| T15 | Script de inicialização do BD (schema.sql) | Andrea, Gustavo | 2 |
| T16 | Conectar API no frontend (fetch) | Henrique, Lucas | 2 |
| T17 | Teste de fluxo completo de cadastro | Vinicius, Gabriel | 2 |

**Subtotal: 18 SP**

### US02 — Login

| ID | Tarefa | Responsável | SP |
|----|--------|-------------|----|
| T18 | Página de login (HTML + CSS) | Andrea, Henrique, Lucas | 2 |
| T19 | Rota POST de login | Marcello, Gustavo | 2 |
| T20 | Buscar usuário no BD pelo CPF | Vinicius, Gabriel | 2 |
| T21 | Verificar senha com hash | Andrea, Henrique, Lucas | 2 |
| T22 | Armazenar JWT/Token no frontend | Marcello, Gustavo | 2 |
| T23 | Middleware de autenticação e proteção de rotas | Vinicius, Gabriel | 2 |
| T24 | Página inicial / Painel de Módulos | Andrea, Henrique, Lucas | 2 |
| T25 | Conectar frontend de login à API | Marcello, Vinicius | 2 |
| T26 | Teste de fluxo completo de login | Gustavo, Gabriel | 2 |

**Subtotal: 18 SP**

---

## Critérios de Aceite Revisados

> Critérios lidos, discutidos e validados com o PO durante o Sprint Planning. Cada item deve ser verificável objetivamente na Sprint Review. Ajustes em relação ao backlog são sinalizados com ⚠️.

### DOC — Documentação da Aplicação

_Critérios confirmados conforme backlog. Nenhum ajuste realizado._

| # | Critério de aceite |
|---|--------------------|
| 1 | `README.md` está estruturado com descrição do projeto, tecnologias utilizadas e instruções de execução |
| 2 | Kanban está configurado e reflete o andamento das tarefas da sprint |
| 3 | Diagramas de Caso de Uso cobrem todos os fluxos principais do sistema |
| 4 | Diagrama de Classes reflete as entidades, atributos e relacionamentos acordados pelo time |
| 5 | Diagramas de Sequência cobrem os fluxos de cadastro, login e avaliação |
| 6 | Modelo Conceitual do BD está produzido e revisado pelo time |
| 7 | Modelo Lógico do BD está alinhado ao modelo conceitual e compatível com o PostgreSQL |
| 8 | Identidade visual (paleta de cores, tipografia e logotipo) está definida e registrada |
| 9 | Protótipo no Figma cobre as telas principais da aplicação e está navegável |

### US01 — Cadastro de Usuário

_Critérios confirmados conforme backlog. Nenhum ajuste realizado._

| # | Critério de aceite |
|---|--------------------|
| 1 | Dado um CPF inválido ou fora do formato `XXX.XXX.XXX-XX`, o formulário rejeita o envio com mensagem de validação |
| 2 | Dado um CPF já cadastrado, o sistema retorna erro claro — sem criar duplicata |
| 3 | Todos os campos (CPF, nome completo, e-mail e senha) são obrigatórios; senha deve ter no mínimo 8 caracteres |
| 4 | A senha nunca é armazenada em texto puro — apenas o hash bcrypt é persistido |
| 5 | Cadastro bem-sucedido redireciona o usuário para a página de login |
| 6 | A interface é utilizável em dispositivos móveis (layout responsivo) |

### US02 — Login

_Critérios confirmados conforme backlog. Nenhum ajuste realizado._

| # | Critério de aceite |
|---|--------------------|
| 1 | O formulário aceita apenas CPF e senha — nenhum outro campo de identificação |
| 2 | Login bem-sucedido redireciona para o painel de progresso do usuário |
| 3 | Credenciais inválidas exibem mensagem genérica que não revela qual campo está incorreto |
| 4 | Usuário inexistente recebe a mesma mensagem genérica que credenciais erradas |
| 5 | A sessão/token é emitida e validada exclusivamente pelo back-end |

---

## Riscos e Dependências Identificados

### Riscos

| # | Risco | Probabilidade | Impacto | Mitigação |
|---|-------|:-------------:|:-------:|-----------|
| R1 | Não entrega de US01 — cadastro indisponível ao final da sprint | Média | Alto | Priorizar T12–T14 (back-end de cadastro); integração com front-end (T16) pode ser adiada desde que a API esteja funcional e testada (T17) |
| R2 | Não entrega de US02 — login indisponível ao final da sprint | Média | Alto | Priorizar T19–T23 (back-end de login); conexão com front-end (T25) pode ser adiada desde que o fluxo de autenticação esteja validado (T26) |
| R3 | Documentação técnica incompleta ao final da sprint | Média | Alto | Revisão contínua ao longo da sprint; documentação tratada como tarefa paralela, não acumulada para o fim |
| R4 | Sobrecarga de membros com múltiplas responsabilidades (DOC + desenvolvimento) | Alta | Médio | Distribuição deliberada de papéis: grupo DOC separado do grupo de desenvolvimento; revisão no Daily se necessário |

### Dependências

| # | Tipo | Dependência | Bloqueia | Responsável | Prazo sugerido |
|---|:----:|-------------|----------|:-----------:|:--------------:|
| D1 | 🔴 Dura | T5 + T6 (Modelos Conceitual e Lógico do BD) devem estar finalizados antes da criação do schema.sql | T15 | Marcello, Vinicius, Gustavo, Gabriel | Dias 1–2 da sprint |
| D2 | 🔴 Dura | T15 (schema.sql) deve estar concluído antes de qualquer implementação de back-end | T12, T13, T14, T19, T20, T22, T23 | Andrea, Gustavo | Dia 3 da sprint |
| D3 | 🟡 Recomendada | T3 (Diagrama de Classe) deve estar revisado antes da implementação das entidades e rotas do back-end — garante consistência entre o modelo acordado e o código | T12, T13, T14, T19, T20 | Marcello, Gustavo, Gabriel | Antes de T12 e T19 |

---

## Observações e Decisões Tomadas

| # | Decisão / Observação |
|---|----------------------|
| 1 | **Escopo ampliado em relação à proposta inicial:** embora o foco original da Sprint 1 fosse exclusivamente a documentação, o time decidiu incluir US01 e US02 para garantir a entrega de um incremento funcional ao final da sprint, alinhado ao princípio de valor contínuo do Scrum. |
| 2 | **Distribuição de tarefas por perfil:** o grupo DOC (T1–T8) foi composto por membros com maior afinidade com modelagem e design, enquanto as USs foram desenvolvidas em pares mistos para nivelar conhecimento técnico entre os membros. |
| 3 | **Pareamento deliberado no desenvolvimento:** nas tarefas de back-end e integração, optou-se por parear desenvolvedores com diferentes níveis de experiência, de forma a reduzir o risco de bloqueio individual e potencializar a evolução do conhecimento. |
| 4 | **Portfólio de desenvolvimento:** decidiu-se registrar a evolução do produto em uma página web simples, documentando o progresso sprint a sprint como vitrine do projeto. Essa atividade não entra no sprint backlog formal desta sprint — será avaliada como capacidade residual. |