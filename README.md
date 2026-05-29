<div align="center">

# Sistema de Avaliação por Níveis com Certificação

**Projeto ABP — 1º Semestre de Desenvolvimento de Software Multiplataforma · FATEC Jacareí · 2026/1**

> 🏫 **Parceiro:** FATEC Jacareí (Interno) · **Orientador:** Prof. Antonio Egydio São Thiago Graça · **Focal Point:** Prof. Marcelo Augusto Sudo · **Kick-off:** 09/04/2026

[![Status](https://img.shields.io/badge/status-Desenvolvendo-yellow)](https://github.com/DEVassos/scrum-flow-abp)
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

## 📋 Sumário

- [Visão Geral](#visão-geral)
- [Principais Funcionalidades](#principais-funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Status e Como Executar](#status-e-como-executar)
- [Sprints](#sprints)
- [Equipe](#equipe)
- [Documentação Técnica](#documentação-técnica)
- [Licença](#licença)

---

## 🎯 Visão Geral

O aprendizado de metodologias ágeis é fundamental na formação do desenvolvedor de software — mas sem um mecanismo estruturado de avaliação, é difícil para o estudante saber o que já domina e o que ainda precisa consolidar.

Este projeto propõe a criação de um **portal web de certificação interna em metodologias ágeis**: o usuário se cadastra, realiza avaliações progressivas divididas em **5 níveis de dificuldade** (do básico ao avançado), com questões sorteadas aleatoriamente de um banco de questões, e ao concluir todos os níveis recebe um **certificado digital** baseado no seu desempenho.

O projeto integra em uma única entrega os conteúdos do semestre: **HTML, CSS e JavaScript puro**, **PostgreSQL** e a metodologia **Scrum** — desenvolvido ao longo de três sprints durante o 1º semestre de 2026.

---

## ✨ Principais Funcionalidades

- **Cadastro e autenticação** de usuários via CPF (identificador único), nome, e-mail e senha
- **Avaliações divididas em 5 módulos** de dificuldade progressivos (básico ao avançado)
- **Sorteio de 10 questões** por avaliação, balanceadas por dificuldade (3 fáceis · 4 médias · 3 difíceis), a partir de um banco de 30 por módulo
- **Limite de 2 tentativas por módulo**, com a maior nota sendo considerada como resultado final
- **Cálculo automático** da média final com base nas melhores notas de cada módulo
- **Geração de certificado digital dinâmico** com nome, CPF, e-mail, data de emissão e notas discriminadas por módulo — validado via hash único
- **Histórico completo de tentativas** com data/hora, pontuação e questões sorteadas
- **Consulta de progresso** em tempo real (módulos concluídos, tentativas restantes e melhor nota)

---

## ⚙️ Tecnologias Utilizadas

| Camada             | Tecnologia                | Restrição                                  |
| ------------------ | ------------------------- | ------------------------------------------ |
| **Front-end**      | HTML5 · CSS3 · JavaScript | Sem uso de frameworks — apenas código puro |
| **Back-end**       | Node.js                   | —                                          |
| **Banco de Dados** | PostgreSQL                | Apenas DDL e DML explícitos; sem ORMs      |
| **Versionamento**  | Git + GitHub (Git Flow)   | —                                          |

---

## 🚀 Status e Como Executar

> **Status Atual: Em desenvolvimento — Sprint 1 encerrada · Sprint 2 inicia em 04/05/2026.**

Para rodar a aplicação localmente em 5 minutos, siga o [Quickstart](./docs/01-QUICKSTART.md).

```bash
git clone https://github.com/DEVassos/scrum-flow-abp.git
cd scrum-flow-abp/app
cp .env.example .env   # preencha POSTGRES_PASSWORD e JWT_SECRET
npm install && createdb abp && npm run db:init && npm run dev
```

Acesse: [http://localhost:3005](http://localhost:3005)

---

## 📅 Sprints

| Etapa                  | Período              | Entregáveis                                  | Vídeo            |
| ---------------------- | -------------------- | -------------------------------------------- | ---------------- |
| **Kick-off**           | 09/04/2026           | Documentação inicial e scaffolding           | —                |
| [**Sprint 1**](./docs/scrum/sprint-1/sprint-1.md) | 13/04 — 30/04/2026   | Setup · Banco de Dados · Cadastro e Login    | [▶ Assistir](https://youtu.be/rQ7mEWP7sGU) |
| [**Sprint 2**](./docs/scrum/sprint-2/sprint-2.md) | 04/05 — 21/05/2026   | Avaliação · Sorteio de Questões · Tentativas · Resultado Final · Certificado · Histórico| [▶ Assistir](https://youtu.be/YXv9-3iwp9A?si=H825GGN9ZulsM6Ch) |
| [**Sprint 3**](./docs/scrum/sprint-3/sprint-3.md)           | 25/05 — 11/06/2026   | Página Administrativa e Refinos de UX    | A disponibilizar |
| **Apresentação Final** | Semana de 22/06/2026 | Entrega e demonstração ao parceiro           | A disponibilizar |

---

## 👥 Equipe

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

## 📚 Documentação Técnica

> Quer entender as regras de negócio, modelagem de dados, requisitos ou como o Scrum está sendo aplicado?

### 📂 [Acesse o Índice da Documentação em `docs/`](./docs/00-INDICE.md)

> 🆕 **Primeira vez aqui?** → [Quickstart em 5 min](./docs/01-QUICKSTART.md)
> 💻 **Vai desenvolver?** → [Guia do Desenvolvedor](./docs/03-DEVELOPER-GUIDE.md)

Lá você encontrará o índice central com acesso a:

- 📋 Requisitos Funcionais, Não Funcionais e Restrições de Projeto
- 📅 Cronograma detalhado e artefatos de cada Sprint
- 🗄️ Modelagem do banco de dados (conceitual e lógico)
- 📐 Diagramas UML (Casos de Uso, Classes e Sequência)
- 🔄 Papéis Scrum, cerimônias e fluxo de versionamento

---

## 📄 Licença

Distribuído sob a licença especificada no arquivo [LICENSE](./LICENSE).

---

<div align="center">
  Desenvolvido com dedicação pela equipe <strong>DEVassos</strong> · 1DSM 2026/1
</div>
