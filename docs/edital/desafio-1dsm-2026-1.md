# Faculdade de Tecnologia Professor Francisco de Moura – FATEC Jacareí

← [Índice da Documentação](../00-INDICE.md)

**Versão do documento:** 06/02/2026

## ABP - Aprendizagem Baseada em Projetos – 2026-1

| Campo | Informação |
|---|---|
| **Parceiro** | Interno |
| **Contato** | Prof. Antonio Egydio São Thiago Graça |
| **Período/Curso** | 1º DSM |
| **Focal point** | Prof. Marcelo Augusto Sudo |
| **Kick off** | 09/04/2026 |

---

## Tema do Semestre

**Portal de Certificação em Metodologias Ágeis**

---

## Desafio (problema)

O aprendizado de metodologias ágeis, especialmente Scrum, é um elemento fundamental para a formação inicial do estudante de desenvolvimento de software. Entretanto, é comum que os alunos tenham dificuldade em consolidar conceitos (papéis, artefatos, eventos, princípios) e em medir sua evolução de forma estruturada.

O desafio proposto consiste no desenvolvimento de um **portal web voltado à certificação interna em metodologias ágeis**, no qual o usuário se cadastra e realiza avaliações por níveis de dificuldade.

A aplicação deverá disponibilizar um banco de questões organizado em **5 níveis** (do básico ao avançado), aplicando provas com questões aleatórias e emitindo um **certificado final** com base no desempenho.

O objetivo educacional é integrar, em um único projeto, os conteúdos do semestre: construção de páginas com **HTML, CSS e JavaScript** (sem frameworks), persistência de dados em **PostgreSQL** (DDL e DML), e organização do trabalho por **Scrum** e práticas ágeis básicas.

---

## Requisitos

### Requisitos Funcionais

| ID | Descrição | Coberto em |
|---|---|---|
| **RF01** | O sistema deve permitir o cadastro do usuário utilizando CPF (como identificador único), nome completo, e-mail e senha. | [US01](../scrum/backlog/product-backlog.md) · [Diagramas](../modelos/uml/README.md) |
| **RF02** | O login no sistema deve ser realizado exclusivamente por meio de CPF e senha. | [US02](../scrum/backlog/product-backlog.md) · [Diagramas](../modelos/uml/README.md) |
| **RF03** | Para cada nível, o sistema deve selecionar aleatoriamente 10 questões a partir de um banco com 30 questões daquele nível, respeitando a classificação de dificuldade. | [US03](../scrum/backlog/product-backlog.md) · [Diagramas](../modelos/uml/README.md) |
| **RF04** | As questões de cada nível devem ser classificadas em três graus de dificuldade: fáceis, médias e difíceis. | [US03](../scrum/backlog/product-backlog.md) · [Diagramas](../modelos/uml/README.md) |
| **RF05** | Cada avaliação de nível apresentada ao usuário deve ser composta obrigatoriamente por 3 questões fáceis, 4 questões médias e 3 questões difíceis, selecionadas de forma aleatória dentro de cada categoria. | [US03](../scrum/backlog/product-backlog.md) · [Diagramas](../modelos/uml/README.md) |
| **RF06** | O usuário deve poder realizar no máximo 2 tentativas por nível. | [US04](../scrum/backlog/product-backlog.md) · [Diagramas](../modelos/uml/README.md) |
| **RF07** | Para cada nível, a nota final do usuário deve ser a maior nota obtida entre as tentativas realizadas. | [US04](../scrum/backlog/product-backlog.md), [US05](../scrum/backlog/product-backlog.md) · [Diagramas](../modelos/uml/README.md) |
| **RF08** | O sistema deve calcular o resultado final do usuário como a média das notas finais obtidas em cada nível. | [US06](../scrum/backlog/product-backlog.md) · [Diagramas](../modelos/uml/README.md) |
| **RF09** | O sistema deve emitir um certificado final contendo, no mínimo: nome completo, CPF, e-mail, data de emissão, e a média final (com discriminação das notas por nível, se desejável). | [US07](../scrum/backlog/product-backlog.md) · [Diagramas](../modelos/uml/README.md) |
| **RF10** | O sistema deve manter histórico das tentativas por nível (data/hora, pontuação, questões sorteadas) para auditoria e acompanhamento. | [US08](../scrum/backlog/product-backlog.md) · [Diagramas](../modelos/uml/README.md) |
| **RF11** | O sistema deve permitir a consulta do progresso do usuário (níveis concluídos, tentativas restantes, melhor nota por nível). | [US05](../scrum/backlog/product-backlog.md) · [Diagramas](../modelos/uml/README.md) |
| **RF12 (opcional)** | O sistema pode disponibilizar uma área administrativa para cadastro e manutenção das questões, níveis e imagens. | [US09](../scrum/backlog/product-backlog.md) · [Diagramas](../modelos/uml/README.md) |

### Requisitos Não Funcionais

- **RNF01:** A interface deve ser simples, clara e responsiva, permitindo uso em dispositivos móveis.
- **RNF02:** A aplicação deve apresentar tempo de resposta adequado para carregamento de páginas e registro de respostas.
- **RNF03:** Os dados pessoais (nome, e-mail e CPF) devem ser tratados em conformidade com a LGPD, com armazenamento e acesso restritos ao necessário.
- **RNF04:** O sistema deve evitar fraudes triviais, garantindo que a contagem de tentativas e o cálculo das notas não possam ser alterados apenas por manipulação no front-end.
- **RNF05:** O projeto deverá adotar práticas básicas de desenvolvimento ágil, incluindo gestão de backlog, planejamento em sprints, versionamento de código e definição de critérios de pronto (DoD).
- **RNF06:** Deve existir documentação mínima do projeto (modelo de dados, instruções de execução e descrição das rotas/funcionalidades).

### Restrições de Projeto

- **RP01:** O front-end deve ser desenvolvido utilizando HTML, CSS e JavaScript, sem frameworks.
- **RP02:** O banco de dados deve ser PostgreSQL, com uso explícito de DDL (criação de tabelas) e DML (inserção/consulta/atualização).
- **RP03:** O back-end deve implementar a comunicação com o PostgreSQL e expor as funcionalidades necessárias ao front-end (por páginas dinâmicas e/ou endpoints HTTP), utilizando tecnologia compatível com aplicações web modernas.
- **RP04:** O sistema deve armazenar, no banco de dados, usuários, níveis, questões, alternativas, tentativas e resultados.
- **RP05:** O escopo do projeto deverá ser compatível com o tempo disponível para desenvolvimento ao longo do semestre, priorizando um MVP funcional.

---

## Cronograma

| Sprint | Período |
|---|---|
| **Sprint 1** | 13/04 a 30/04/2026 |
| **Sprint 2** | 04/05 a 21/05/2026 |
| **Sprint 3** | 25/05 a 11/06/2026 |
| **Apresentação final** | A definir (semana de 22 de junho de 2026) |

---

<div align="center">
  <a href="../00-INDICE.md">← Voltar ao Índice</a>
</div>
