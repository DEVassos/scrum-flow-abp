← [Voltar ao README principal](../README.md) · [📚 Índice da Documentação](./00-INDICE.md)

# 📚 Documentação Técnica — Sistema de Avaliação por Níveis com Certificação

**ABP 1DSM 2026/1 · FATEC Jacareí · Equipe DEVassos**

> Esta é a central técnica do projeto. Utilize o índice abaixo para navegar pelos artefatos de documentação, requisitos, modelagem e gestão ágil.
>
> ← [Voltar ao README principal](../README.md)

---

## 🚀 Atalhos por Objetivo

- 🆕 **Primeira vez aqui?** → [Quickstart em 5 min](./01-QUICKSTART.md)
- 💻 **Vou desenvolver?** → [Guia do Desenvolvedor](./03-DEVELOPER-GUIDE.md)
- 🔄 **Vim por causa do Scrum?** → [Gestão Ágil](./scrum/README.md)
- 📖 **Procuro um doc específico?** → [Índice Completo](./00-INDICE.md)

---

## 📋 Requisitos e Restrições

Fonte: [Edital do Desafio ABP — versão 06/02/2026](./edital/desafio-1dsm-2026-1.md)

### Requisitos Funcionais (RF)

| ID                | Descrição                                                                           |
| ----------------- | ----------------------------------------------------------------------------------- |
| RF01              | Cadastro de usuário com CPF (identificador único), nome, e-mail e senha             |
| RF02              | Login exclusivamente por CPF e senha                                                |
| RF03              | Seleção aleatória de 10 questões de um banco de 30 por módulo                       |
| RF04              | Classificação das questões em: fácil, médio e difícil                               |
| RF05              | Composição obrigatória da avaliação: 3 fáceis · 4 médias · 3 difíceis               |
| RF06              | Limite de 2 tentativas por módulo por usuário                                       |
| RF07              | Nota final do módulo = maior nota entre as tentativas realizadas                    |
| RF08              | Resultado final = média das notas finais de cada módulo                             |
| RF09              | Emissão de certificado com nome, CPF, e-mail, data e notas discriminadas por módulo |
| RF10              | Histórico de tentativas contendo data/hora, pontuação e questões sorteadas          |
| RF11              | Consulta de progresso (módulos concluídos, tentativas restantes e melhor nota)      |
| RF12 _(opcional)_ | Área administrativa para cadastro e manutenção de questões, módulos e imagens       |

### Requisitos Não Funcionais (RNF)

| ID        | Descrição                                                                                                |
| --------- | -------------------------------------------------------------------------------------------------------- |
| RNF01     | Interface simples, clara e responsiva (mobile-friendly)                                                  |
| RNF02     | Tempo de resposta adequado para carregamento e registro de respostas                                     |
| **RNF03** | **Tratamento de dados pessoais em conformidade com a LGPD**                                              |
| RNF04     | Prevenção de fraudes: lógica de notas e controle de tentativas obrigatoriamente no back-end              |
| RNF05     | Práticas ágeis: backlog priorizado, sprints definidas, versionamento com Git e critérios de pronto (DoD) |
| RNF06     | Documentação mínima: modelo de dados, instruções de execução e rotas da API                              |

### Restrições de Projeto (RP)

| ID       | Restrição                                                                                                                     |
| -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| RP01     | O front-end deve ser desenvolvido exclusivamente com HTML, CSS e JavaScript puro — sem uso de frameworks ou bibliotecas de UI |
| **RP02** | **O banco de dados é exclusivamente PostgreSQL, com DDL e DML explícitos — sem uso de ORMs**                                  |
| RP03     | O sistema deve ser entregue e funcional dentro do prazo das 3 sprints definidas no cronograma                                 |
| RP04     | Toda a lógica de negócio (cálculo de notas, controle de tentativas) deve residir no back-end, nunca no front-end              |
| RP05     | O versionamento deve seguir o fluxo Git Flow adaptado, com contribuições via Pull Request aprovado                            |

---

## 📅 Metodologia Ágil

O projeto é conduzido com o framework **Scrum**, seguindo seus pilares de transparência, inspeção e adaptação. A adoção do Scrum é um requisito da disciplina (RNF05).

> **Nota:** Para detalhes sobre o cronograma oficial e a composição da equipe (papéis), consulte o [README principal](../README.md).

### Cerimônias Scrum

| Cerimônia                | Frequência            | Objetivo                                                            |
| ------------------------ | --------------------- | ------------------------------------------------------------------- |
| **Sprint Planning**      | Início de cada sprint | Selecionar itens do backlog e planejar tarefas da sprint            |
| **Daily Scrum**          | Diária (≤ 15 min)     | Sincronizar o time: o que foi feito, o que será feito, impedimentos |
| **Sprint Review**        | Final de cada sprint  | Apresentar o incremento entregue e coletar feedback                 |
| **Sprint Retrospective** | Final de cada sprint  | Refletir sobre o processo e definir melhorias                       |
| **Backlog Refinement**   | Durante a sprint      | Detalhar e estimar histórias futuras                                |

As atas de todas as cerimônias são registradas e versionadas, organizadas por sprint em `scrum/sprint-N/atas/`.

---

## 🗂️ Índice de Documentos

### 📌 Referência do Desafio (`edital/`)

| Documento                                                           | Descrição                                            |
| ------------------------------------------------------------------- | ---------------------------------------------------- |
| [Desafio 1DSM - 2026-1.pdf](edital/Desafio%201DSM%20-%202026-1.pdf) | Enunciado oficial do desafio ABP (versão 06/02/2026) |
| [desafio-1dsm-2026-1.md](edital/desafio-1dsm-2026-1.md)             | Enunciado em Markdown — RF, RNF e RP completos       |

### 🔄 Gestão Ágil (`scrum/`)

| Documento | Caminho | Descrição |
| --------- | ------- | --------- |
| Contexto Ágil (README) | `scrum/README.md` _(A adicionar)_ | Visão geral da gestão ágil: papéis, cerimônias e fluxo de trabalho |
| Product Backlog | `scrum/backlog/product-backlog.md` _(A adicionar)_ | Histórias de usuário priorizadas (US01–US09) com critérios de aceite |
| Riscos e Premissas | `scrum/riscos-premissas.md` _(A adicionar)_ | Registro de riscos, premissas e restrições do projeto |

#### Estrutura Padrão por Sprint

As Sprints documentadas (Sprints 1 a 3) seguem a estrutura de diretórios abaixo, localizada em `scrum/sprint-N/`:

| Arquivo | Descrição |
| ------- | --------- |
| `sprint-N.md` | Documento geral: meta, sprint backlog e burndown |
| `dor-dod.md` | Critérios de entrada (DoR) e conclusão (DoD) validados por história |
| `atas/sprint-planning.md` | Ata da Sprint Planning |
| `atas/sprint-review.md` | Ata da Sprint Review |
| `atas/sprint-retrospective.md` | Ata da Sprint Retrospective |
| `atas/dailies/` | Atas das Daily Scrums |

> **Status:** Na fase de Kick-off (atual), as pastas de Sprint contêm apenas arquivos `.gitkeep`. Os artefatos serão adicionados progressivamente.

### 🗄️ Banco de Dados (`bd/`)

| Documento         | Caminho                                   | Descrição                                            |
| ----------------- | ----------------------------------------- | ---------------------------------------------------- |
| Modelo Conceitual | `bd/modelo-conceitual.md` _(A adicionar)_ | DER com entidades, atributos e relacionamentos       |
| Modelo Lógico     | `bd/modelo-logico.md` _(A adicionar)_     | Tabelas PostgreSQL, tipos, PKs, FKs, índices e seeds |

### 📐 Modelagem UML (`uml/`)

| Documento                  | Caminho                                                        | Descrição                                       |
| -------------------------- | -------------------------------------------------------------- | ----------------------------------------------- |
| Casos de Uso               | `uml/casos-de-uso/casos-de-uso.md` _(A adicionar)_             | Diagrama e descrição textual de UC01–UC16        |
| Diagrama de Classes        | `uml/classes/diagrama-de-classes.md` _(A adicionar)_           | Entidades, atributos, métodos e relacionamentos  |
| Sequência — Cadastro/Login | `uml/sequencia/fluxo-cadastro-login.md` _(A adicionar)_        | Fluxo de cadastro e autenticação                 |
| Sequência — Avaliação      | `uml/sequencia/fluxo-avaliacao.md` _(A adicionar)_             | Fluxo de sorteio, respostas e nota               |
| Sequência — Certificado    | `uml/sequencia/fluxo-certificado-progresso.md` _(A adicionar)_ | Fluxo de emissão e validação do certificado      |

### 📋 Usuário Final (`manual-usuario/`)

| Documento         | Caminho                                            | Descrição                          |
| ----------------- | -------------------------------------------------- | ---------------------------------- |
| Manual do Usuário | `manual-usuario/manual-usuario.md` _(A adicionar)_ | Guia de uso completo da plataforma |

---

<div align="center">
  <a href="../README.md">← Voltar ao README principal</a> · <a href="./00-INDICE.md">📚 Índice da Documentação</a>
</div>
