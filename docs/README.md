# 📂 Documentação do Projeto

**Sistema de Avaliação por Níveis com Certificação** — ABP 1DSM 2026/1

> 🏫 **Parceiro:** FATEC Jacareí (Interno) · **Contato:** Prof. Antonio Egydio São Thiago Graça · **Focal Point:** Prof. Marcelo Augusto Sudo

---

## Estrutura Atual

```text
docs/
├── edital/                        # Material de referência do desafio
│   ├── Desafio 1DSM - 2026-1.pdf  # Enunciado oficial do desafio ABP (v. 06/02/2026)
│   └── desafio-1dsm-2026-1.md     # Enunciado oficial (Markdown)
│
├── bd/                            # Modelagem do banco de dados
├── manual-usuario/                # Documentação para o usuário final
├── scrum/                         # Artefatos de gestão ágil (Scrum)
│   ├── backlog/                   # Repositório de histórias
│   ├── sprint-1/                  # Artefatos da Sprint 1 (13/04–30/04)
│   │   └── atas/                  # Atas das cerimônias semanais
│   │       └── dailies/           # Atas das Daily Scrums
│   ├── sprint-2/                  # Artefatos da Sprint 2 (04/05–21/05)
│   │   └── atas/                  # Atas das cerimônias semanais
│   │       └── dailies/           # Atas das Daily Scrums
│   ├── sprint-3/                  # Artefatos da Sprint 3 (25/05–11/06)
│   │   └── atas/                  # Atas das cerimônias semanais
│   │       └── dailies/           # Atas das Daily Scrums
│   └── templates/                 # Modelos reutilizáveis para cerimônias
└── uml/                           # Modelagem e diagramas do sistema
    ├── casos-de-uso/
    ├── classes/
    ├── sequencia/
    └── user-stories/
```

> **Nota:** As subpastas acima contêm apenas arquivos ocultos `.gitkeep` momentaneamente, para preservar a estrutura de diretórios no commit inicial. Os artefatos documentais (arquivos `.md`) serão adicionados ao longo das Sprints.

---

## Cronograma Resumido

| Etapa | Período |
|-------|---------|
| Kick-off | 09/04/2026 |
| Sprint 1 — Setup, BD, Cadastro e Login | 13/04 — 30/04/2026 |
| Sprint 2 — Avaliação: Sorteio e Tentativas | 04/05 — 21/05/2026 |
| Sprint 3 — Resultado, Certificado, Histórico e Entrega Final | 25/05 — 11/06/2026 |
| Apresentação Final | Semana de 22/06/2026 |

---

## Índice de Documentos

### 📌 Referência do Desafio

| Documento | Descrição |
|-----------|-----------|
| [Desafio 1DSM - 2026-1.pdf](edital/Desafio%201DSM%20-%202026-1.pdf) | Enunciado oficial do desafio ABP (versão 06/02/2026) |
| [desafio-1dsm-2026-1.md](edital/desafio-1dsm-2026-1.md) | Enunciado oficial em Markdown — RF01–RF12, RNF01–RNF06, RP01–RP05 |

> **Observação:** Abaixo estão listados os futuros arquivos de documentação a serem produzidos. Os hiperlinks foram desativados neste momento (já que os documentos correspondentes ainda não existem) e retornarão **à medida que** as entregas evoluírem nas Sprints.

### 🔄 Gestão Ágil (Scrum)

| Documento | Descrição |
|-----------|-----------|
| Product Backlog *(A ser adicionado em `scrum/backlog/product-backlog.md`)* | Histórias de usuário priorizadas com critérios de aceite |
| Cronograma de Sprints *(A ser adicionado em `scrum/cronograma.md`)* | Sprint backlogs, metas e entregas planejadas |
| DoR e DoD *(A ser adicionado em `scrum/templates/dor-dod-checklist.md`)* | Critérios de entrada e conclusão de histórias |
| Sprint 1 *(A ser adicionado em `scrum/sprint-1/sprint-1.md`)* | Meta, backlog, burndown e atas da Sprint 1 (13/04–30/04) |
| Riscos e Premissas *(A ser adicionado em `scrum/riscos-premissas.md`)* | Registro de riscos, premissas e restrições do projeto |

### 🗄️ Banco de Dados

| Documento | Descrição |
|-----------|-----------|
| Modelo Conceitual *(A ser adicionado em `bd/modelo-conceitual.md`)* | DER com entidades, atributos e relacionamentos |
| Modelo Lógico *(A ser adicionado em `bd/modelo-logico.md`)* | DDL real das tabelas PostgreSQL, índices e seeds |

### 📐 Modelagem UML

| Documento | Descrição |
|-----------|-----------|
| Índice UML *(A ser adicionado em `uml/README.md`)* | Rastreabilidade completa |
| User Stories *(A ser adicionado em `uml/user-stories/user-stories.md`)* | Histórias de usuário no formato ágil com critérios de aceite |
| Casos de Uso *(A ser adicionado em `uml/casos-de-uso/casos-de-uso.md`)* | Diagrama + descrição textual de Casos de Uso |
| Diagrama de Classes *(A ser adicionado em `uml/classes/diagrama-de-classes.md`)* | Entidades do sistema (5 tabelas implementadas + valores calculados) |
| Sequência — Cadastro/Login *(A ser adicionado em `uml/sequencia/fluxo-cadastro-login.md`)* | Fluxo de Cadastro e Login |
| Sequência — Avaliação *(A ser adicionado em `uml/sequencia/fluxo-avaliacao.md`)* | Fluxo de Avaliação |
| Sequência — Certificado *(A ser adicionado em `uml/sequencia/fluxo-certificado-progresso.md`)* | Fluxo de Certificado e Progresso |

### 📋 Usuário Final

| Documento | Descrição |
|-----------|-----------|
| Manual do Usuário *(A ser adicionado em `manual-usuario/manual-usuario.md`)* | Guia de uso completo da plataforma |
