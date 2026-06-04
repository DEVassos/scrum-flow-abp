← [Voltar ao README principal](../README.md)

# Documentação Técnica — ScrumFlow

**ABP 1DSM 2026/1 · FATEC Jacareí · Equipe DEVassos**

> Central técnica do projeto. Use o índice abaixo para navegar pelos artefatos de documentação, requisitos, modelagem e gestão ágil.

---

## Atalhos Rápidos

| O que você precisa | Onde está |
|---|---|
| **Modelagem do banco (conceitual + lógico)** | [modelos/bd/README.md](./modelos/bd/README.md) |
| **Diagramas UML (casos de uso, classes, sequência)** | [modelos/uml/README.md](./modelos/uml/README.md) |
| **Product Backlog** | [scrum/backlog/product-backlog.md](./scrum/backlog/product-backlog.md) |
| **Sprints (backlog, DoR/DoD, atas)** | [scrum/sprint-1/](./scrum/sprint-1/sprint-1.md) · [sprint-2/](./scrum/sprint-2/sprint-2.md) · [sprint-3/](./scrum/sprint-3/sprint-3.md) |
| Rodar o projeto pela primeira vez | [01-QUICKSTART.md](./01-QUICKSTART.md) |
| Configurar o ambiente de dev | [02-SETUP.md](./02-SETUP.md) |
| Guia do desenvolvedor (rotas, arquitetura) | [03-DEVELOPER-GUIDE.md](./03-DEVELOPER-GUIDE.md) |
| Gestão ágil, papéis e cerimônias | [scrum/README.md](./scrum/README.md) |
| Manual do usuário final | [manual-usuario/manual-usuario.md](./manual-usuario/manual-usuario.md) |

---

## Requisitos e Restrições

Fonte: [Edital do Desafio ABP — versão 06/02/2026](./edital/desafio-1dsm-2026-1.md)

### Requisitos Funcionais (RF)

| ID | Descrição |
|---|---|
| RF01 | Cadastro de usuário com CPF (identificador único), nome, e-mail e senha |
| RF02 | Login exclusivamente por CPF e senha |
| RF03 | Seleção aleatória de 10 questões de um banco de 30 por módulo |
| RF04 | Classificação das questões em: fácil, médio e difícil |
| RF05 | Composição obrigatória da avaliação: 3 fáceis · 4 médias · 3 difíceis |
| RF06 | Limite de 2 tentativas por módulo por usuário |
| RF07 | Nota final do módulo = maior nota entre as tentativas realizadas |
| RF08 | Resultado final = média das notas finais de cada módulo |
| RF09 | Emissão de certificado com nome, CPF, e-mail, data e notas discriminadas por módulo |
| RF10 | Histórico de tentativas contendo data/hora, pontuação e questões sorteadas |
| RF11 | Consulta de progresso (módulos concluídos, tentativas restantes e melhor nota) |
| RF12 *(opcional)* | Área administrativa para cadastro e manutenção de questões, módulos e usuários |

### Requisitos Não Funcionais (RNF)

| ID | Descrição |
|---|---|
| RNF01 | Interface simples, clara e responsiva (mobile-friendly) |
| RNF02 | Tempo de resposta adequado para carregamento e registro de respostas |
| **RNF03** | **Tratamento de dados pessoais em conformidade com a LGPD** |
| RNF04 | Prevenção de fraudes: lógica de notas e controle de tentativas obrigatoriamente no back-end |
| RNF05 | Práticas ágeis: backlog priorizado, sprints definidas, versionamento com Git e critérios de pronto (DoD) |
| RNF06 | Documentação mínima: modelo de dados, instruções de execução e rotas da API |

### Restrições de Projeto (RP)

| ID | Restrição |
|---|---|
| RP01 | Front-end exclusivamente com HTML, CSS e JavaScript puro — sem frameworks ou bibliotecas de UI |
| **RP02** | **Banco de dados exclusivamente PostgreSQL, com DDL e DML explícitos — sem ORMs** |
| RP03 | Sistema entregue e funcional dentro do prazo das 3 sprints |
| RP04 | Lógica de negócio (notas, tentativas) deve residir no back-end |
| RP05 | Versionamento seguindo Git Flow adaptado, com contribuições via Pull Request aprovado |

---

## Metodologia Ágil

O projeto é conduzido com o framework **Scrum** (transparência, inspeção e adaptação), como requisito da disciplina (RNF05).

### Cerimônias Scrum

| Cerimônia | Frequência | Objetivo |
|---|---|---|
| **Sprint Planning** | Início de cada sprint | Selecionar itens do backlog e planejar as tarefas |
| **Daily Scrum** | Diária (≤ 15 min) | Sincronizar o time: feito, a fazer, impedimentos |
| **Sprint Review** | Final de cada sprint | Apresentar o incremento e coletar feedback |
| **Sprint Retrospective** | Final de cada sprint | Refletir sobre o processo e definir melhorias |
| **Backlog Refinement** | Durante a sprint | Detalhar e estimar histórias futuras |

As atas são registradas e versionadas em `scrum/sprint-N/atas/`.

---

## Índice de Documentos

### Referência do Desafio (`edital/`)

| Documento | Descrição |
|---|---|
| [Desafio 1DSM - 2026-1.pdf](edital/Desafio%201DSM%20-%202026-1.pdf) | Enunciado oficial do desafio ABP (versão 06/02/2026) |
| [desafio-1dsm-2026-1.md](edital/desafio-1dsm-2026-1.md) | Enunciado em Markdown — RF, RNF e RP completos |

### Modelagem (`modelos/`)

| Documento | Caminho | Descrição |
|---|---|---|
| Visão geral dos modelos | [modelos/README.md](modelos/README.md) | Índice dos modelos de dados e UML |
| Modelos conceitual e lógico | [modelos/bd/README.md](modelos/bd/README.md) | DER, modelo relacional e decisões de modelagem |
| Diagramas UML | [modelos/uml/README.md](modelos/uml/README.md) | Casos de uso, classes e sequência por RF |
| Alterações de backend | [modelos/alteracoes-backend.md](modelos/alteracoes-backend.md) | Registro de mudanças nas rotas e repositórios |

### Gestão Ágil (`scrum/`)

| Documento | Caminho | Descrição |
|---|---|---|
| Visão geral Scrum | [scrum/README.md](scrum/README.md) | Papéis, cerimônias e fluxo de trabalho |
| Product Backlog | [scrum/backlog/product-backlog.md](scrum/backlog/product-backlog.md) | Histórias de usuário priorizadas (US01–US12) com critérios de aceite |

#### Estrutura por Sprint (`scrum/sprint-N/`)

| Arquivo | Descrição |
|---|---|
| `sprint-N.md` | Meta, sprint backlog e burndown |
| `dor-dod.md` | Critérios de entrada (DoR) e conclusão (DoD) por história |
| `atas/sprint-planning.md` | Ata da Sprint Planning |
| `atas/sprint-review.md` | Ata da Sprint Review |
| `atas/sprint-retrospective.md` | Ata da Sprint Retrospective |
| `atas/dailies/` | Atas das Daily Scrums (uma por dia) |

> **Status:** Sprints 1 e 2 concluídas. Sprint 3 em andamento (25/05 – 11/06/2026).

### Identidade Visual (`identidade-visual/`)

| Documento | Caminho | Descrição |
|---|---|---|
| Identidade visual | [identidade-visual/identidade-visual-scrumflow.md](identidade-visual/identidade-visual-scrumflow.md) | Paleta de cores, tipografia e protótipos Figma |

### Manual e Auxiliares (`manual-usuario/`)

| Documento | Caminho | Descrição |
|---|---|---|
| Manual do usuário | [manual-usuario/manual-usuario.md](manual-usuario/manual-usuario.md) | Guia de uso completo da plataforma |
| Seed para certificado de dev | [manual-usuario/seed-dev-cert.md](manual-usuario/seed-dev-cert.md) | Como gerar um usuário com certificado pronto para testes |

---

<div align="center">
  <a href="../README.md">← Voltar ao README principal</a>
</div>
