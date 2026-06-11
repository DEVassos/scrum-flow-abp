<div align="center">

# ScrumFlow — Portal de Certificação em Metodologias Ágeis

**Projeto ABP — 1º Semestre de Desenvolvimento de Software Multiplataforma · FATEC Jacareí · 2026/1**

> **Parceiro:** FATEC Jacareí (Interno) · **Orientador:** Prof. Antonio Egydio São Thiago Graça · **Focal Point:** Prof. Marcelo Augusto Sudo · **Kick-off:** 09/04/2026

[![Status](https://img.shields.io/badge/status-Sprint%203%20em%20andamento-yellow)](https://github.com/DEVassos/scrum-flow-abp)
[![Kanban](https://img.shields.io/badge/Kanban-Board-blue?logo=github)](https://github.com/orgs/DEVassos/projects/4)
[![Licença](https://img.shields.io/badge/licença-MIT-green)](./LICENSE)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)

</div>

---

## Documentação Completa

| Documento | Onde encontrar |
|---|---|
| Índice geral de documentação | [docs/README.md](./docs/README.md) |
| Requisitos funcionais, não funcionais e restrições | [docs/edital/desafio-1dsm-2026-1.md](./docs/edital/desafio-1dsm-2026-1.md#requisitos) |
| Modelagem do banco de dados | [docs/modelos/bd/](./docs/modelos/bd/) |
| Diagramas UML | [docs/modelos/uml/](./docs/modelos/uml/) |
| Visão do produto (para o cliente) | [docs/produto/visao-produto.md](./docs/produto/visao-produto.md) |
| Manual do usuário | [docs/produto/manual-usuario.md](./docs/produto/manual-usuario.md) |
| Product Backlog e histórias de usuário | [docs/scrum/backlog/product-backlog.md](./docs/scrum/backlog/product-backlog.md) |
| Sprint 1 — backlog, DoR/DoD e atas | [docs/scrum/sprint-1/](./docs/scrum/sprint-1/sprint-1.md) · [▶ Vídeo](https://youtu.be/rQ7mEWP7sGU) |
| Sprint 2 — backlog, DoR/DoD e atas | [docs/scrum/sprint-2/](./docs/scrum/sprint-2/sprint-2.md) · [▶ Vídeo](https://youtu.be/YXv9-3iwp9A) |
| Sprint 3 — backlog, DoR/DoD e atas | [docs/scrum/sprint-3/](./docs/scrum/sprint-3/sprint-3.md) · [▶ Vídeo](https://youtu.be/pa0tak9AOZI) |
| Requisitos funcionais, não funcionais e restrições | [docs/README.md](./docs/README.md#requisitos-e-restrições) |
| Kanban do projeto | [GitHub Projects](https://github.com/orgs/DEVassos/projects/4) |
---

## Sumário

- [O que é o ScrumFlow?](#o-que-é-o-scrumflow)
- [Funcionalidades](#funcionalidades)
- [Como Executar](#como-executar)
- [Sprints e Entregas](#sprints-e-entregas)
- [Equipe](#equipe)
- [Tecnologias](#tecnologias)
- [Licença](#licença)

---

## O que é o ScrumFlow?

O ScrumFlow é um **portal web de certificação interna em metodologias ágeis**. O usuário se cadastra, realiza avaliações progressivas divididas em **módulos de dificuldade crescente** (básico ao avançado), e ao concluir todos os módulos recebe um **certificado digital** com suas notas.

O projeto integra em uma única entrega os conteúdos do semestre — **HTML, CSS e JavaScript puro**, **PostgreSQL**, **Node.js** e a metodologia **Scrum** — desenvolvido ao longo de três sprints no 1º semestre de 2026.

---

## Funcionalidades

### Autenticação
- Cadastro com nome, e-mail, CPF e senha (CPF como identificador único)
- Login via CPF e senha com token JWT
- Sessão armazenada no navegador via `localStorage`

### Avaliação
- Módulos progressivos (do básico ao avançado), cada um com 10 questões sorteadas aleatoriamente
- Questões balanceadas por dificuldade: 3 fáceis · 4 médias · 3 difíceis
- Banco de questões com 150 questões (30 por módulo em grupos distintos)
- Limite de **2 tentativas por módulo**, com a maior nota sendo o resultado final
- Avanço automático para o próximo módulo ao concluir o atual

### Resultados e Histórico
- Tela de resultado ao final de cada módulo com pontuação e gabarito
- Histórico de questões por módulo: enunciado, resposta marcada e resposta correta
- Progresso em tempo real no dashboard: módulos concluídos, tentativas restantes e melhor nota

### Certificado
- Geração de **certificado digital** com nome, CPF, e-mail, data de emissão e notas por módulo
- Certificado validável publicamente via **hash único** (URL compartilhável)

### Conteúdo Educacional
- Página completa sobre **Scrum** com conceitos, papéis, cerimônias e artefatos
- Página do **Manifesto Ágil** com os 12 princípios e navegação por âncoras

### Painel Administrativo *(Sprint 3)*
- Acesso exclusivo para usuários com perfil `admin`
- Listagem de todos os usuários e seus progressos
- Zerar tentativas do módulo atual ou reiniciar completamente um usuário
- CRUD completo de questões (criar, editar, excluir)
- CRUD de módulos/níveis

---

## Como Executar

**Pré-requisitos:** Node.js 18+, um PostgreSQL acessível via `DATABASE_URL` (ex.: Neon, com SSL) e Git.

```bash
git clone https://github.com/DEVassos/scrum-flow-abp.git
cd scrum-flow-abp/app
cp .env.example .env        # preencha DATABASE_URL e JWT_SECRET
npm install
npm run db:init             # cria tabelas e carrega módulos + questões
npm run dev
```

Acesse: [http://localhost:3005](http://localhost:3005)

> Guia detalhado com variáveis de ambiente e solução de problemas: [app/README.md](./app/README.md)

---

## Sprints e Entregas

| Etapa | Período | O que foi entregue | Vídeo |
|---|---|---|---|
| **Kick-off** | 09/04/2026 | Documentação inicial e scaffolding | — |
| [**Sprint 1**](./docs/scrum/sprint-1/sprint-1.md) | 13/04 – 30/04/2026 | Banco de dados · Cadastro · Login · JWT | [▶ Assistir](https://youtu.be/rQ7mEWP7sGU) |
| [**Sprint 2**](./docs/scrum/sprint-2/sprint-2.md) | 04/05 – 21/05/2026 | Avaliação · Sorteio · Tentativas · Resultado · Certificado · Histórico | [▶ Assistir](https://youtu.be/YXv9-3iwp9A?si=H825GGN9ZulsM6Ch) |
| [**Sprint 3**](./docs/scrum/sprint-3/sprint-3.md) | 25/05 – 11/06/2026 | Painel Admin · Configurações · Refinamentos de UX | A disponibilizar |

---

## Equipe

<table>
  <thead>
    <tr>
      <th>Foto</th>
      <th>Nome</th>
      <th>Papel</th>
      <th>GitHub</th>
      <th>LinkedIn</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><img src="https://avatars.githubusercontent.com/u/261997502" width="60" style="border-radius:50%" alt="foto"/></td>
      <td>Gustavo Koiti</td>
      <td>Product Owner<br/><a href="https://github.com/DEVassos/scrum-flow-abp/commits?author=gustavokoitiyoshimura"><img src="https://img.shields.io/github/commit-activity/t/DEVassos/scrum-flow-abp?authorFilter=gustavokoitiyoshimura&style=flat&label=commits&color=007ec6" alt="commits"/></a></td>
      <td><a href="https://github.com/gustavokoitiyoshimura">@gustavokoitiyoshimura</a></td>
      <td><a href="https://linkedin.com/in/">LinkedIn</a></td>
    </tr>
    <tr>
      <td><img src="https://avatars.githubusercontent.com/u/55038859" width="60" style="border-radius:50%" alt="foto"/></td>
      <td>Gabriel Travensolli</td>
      <td>Scrum Master<br/><a href="https://github.com/DEVassos/scrum-flow-abp/commits?author=travensolli"><img src="https://img.shields.io/github/commit-activity/t/DEVassos/scrum-flow-abp?authorFilter=travensolli&style=flat&label=commits&color=007ec6" alt="commits"/></a></td>
      <td><a href="https://github.com/travensolli">@travensolli</a></td>
      <td><a href="https://www.linkedin.com/in/gabrieltravensolli/">LinkedIn</a></td>
    </tr>
    <tr>
      <td><img src="https://avatars.githubusercontent.com/u/139165742" width="60" style="border-radius:50%" alt="foto"/></td>
      <td>Andrea Turíbio</td>
      <td>Desenvolvedora<br/><a href="https://github.com/DEVassos/scrum-flow-abp/commits?author=DeaTuribio"><img src="https://img.shields.io/github/commit-activity/t/DEVassos/scrum-flow-abp?authorFilter=DeaTuribio&style=flat&label=commits&color=007ec6" alt="commits"/></a></td>
      <td><a href="https://github.com/DeaTuribio">@DeaTuribio</a></td>
      <td><a href="https://www.linkedin.com/in/andrea-turibio-41507467/">LinkedIn</a></td>
    </tr>
    <tr>
      <td><img src="https://avatars.githubusercontent.com/u/233653222" width="60" style="border-radius:50%" alt="foto"/></td>
      <td>Henrique Camargo</td>
      <td>Desenvolvedor<br/><a href="https://github.com/DEVassos/scrum-flow-abp/commits?author=henriqueptbd-cell"><img src="https://img.shields.io/github/commit-activity/t/DEVassos/scrum-flow-abp?authorFilter=henriqueptbd-cell&style=flat&label=commits&color=007ec6" alt="commits"/></a></td>
      <td><a href="https://github.com/henriqueptbd-cell">@henriqueptbd-cell</a></td>
      <td><a href="https://www.linkedin.com/in/henrique-camargo-6275a6394/">LinkedIn</a></td>
    </tr>
    <tr>
      <td><img src="https://avatars.githubusercontent.com/u/177771290" width="60" style="border-radius:50%" alt="foto"/></td>
      <td>Lucas Amorim</td>
      <td>Desenvolvedor<br/><a href="https://github.com/DEVassos/scrum-flow-abp/commits?author=LUCASAMR23"><img src="https://img.shields.io/github/commit-activity/t/DEVassos/scrum-flow-abp?authorFilter=LUCASAMR23&style=flat&label=commits&color=007ec6" alt="commits"/></a></td>
      <td><a href="https://github.com/LUCASAMR23">@LUCASAMR23</a></td>
      <td><a href="https://www.linkedin.com/in/lucas-amorim-4b3312362/">LinkedIn</a></td>
    </tr>
    <tr>
      <td><img src="https://avatars.githubusercontent.com/u/242081514" width="60" style="border-radius:50%" alt="foto"/></td>
      <td>Marcello Campbell</td>
      <td>Desenvolvedor<br/><a href="https://github.com/DEVassos/scrum-flow-abp/commits?author=mparise28-dev"><img src="https://img.shields.io/github/commit-activity/t/DEVassos/scrum-flow-abp?authorFilter=mparise28-dev&style=flat&label=commits&color=007ec6" alt="commits"/></a></td>
      <td><a href="https://github.com/mparise28-dev">@mparise28-dev</a></td>
      <td><a href="https://www.linkedin.com/in/marcello-parise-campbell-fonseca-147965194/">LinkedIn</a></td>
    </tr>
    <tr>
      <td><img src="https://avatars.githubusercontent.com/u/261281418" width="60" style="border-radius:50%" alt="foto"/></td>
      <td>Vinicius Augusto</td>
      <td>Desenvolvedor<br/><a href="https://github.com/DEVassos/scrum-flow-abp/commits?author=viniciusaugusto1997"><img src="https://img.shields.io/github/commit-activity/t/DEVassos/scrum-flow-abp?authorFilter=viniciusaugusto1997&style=flat&label=commits&color=007ec6" alt="commits"/></a></td>
      <td><a href="https://github.com/viniciusaugusto1997">@viniciusaugusto1997</a></td>
      <td><a href="https://linkedin.com/in/">LinkedIn</a></td>
    </tr>
  </tbody>
</table>

---

## Tecnologias

| Camada | Tecnologia | Restrição |
|---|---|---|
| **Front-end** | HTML5 · CSS3 · JavaScript | Sem frameworks — código puro |
| **Back-end** | Node.js + Express 5 | — |
| **Banco de Dados** | PostgreSQL 14+ | DDL e DML explícitos; sem ORMs |
| **Autenticação** | JWT (`jsonwebtoken`) | Stateless, expira em 10 min |
| **Versionamento** | Git + GitHub (Git Flow) | — |

---

## Licença

Distribuído sob a licença especificada no arquivo [LICENSE](./LICENSE).

---

<div align="center">
  Desenvolvido pela equipe <strong>DEVassos</strong> · 1DSM 2026/1
</div>
