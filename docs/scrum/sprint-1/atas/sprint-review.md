← [Índice da Documentação](../../../00-INDICE.md) · [Sprint 1](../sprint-1.md)

# Sprint Review — Sprint 1

**Data:** 29/04/2026  
**Formato:** Assíncrona (vídeo de demonstração + validação via GitHub/WhatsApp)  
**Scrum Master:** Gabriel Travensolli  
**Product Owner:** Gustavo Koiti  
**Time:** Andrea Turíbio, Henrique Camargo, Lucas Amorim, Marcello Campbell, Vinicius Augusto

---

## Meta da Sprint

> Ao final desta sprint, qualquer usuário poderá se cadastrar e fazer login na plataforma, com dados validados no front-end, processados no back-end e persistidos no PostgreSQL. Paralelamente, toda a documentação técnica e de produto estará produzida e revisada.

**Meta atingida?** ✅ Sim — burndown encerrado em 0 SP no dia 28/04, um dia antes do prazo.

---

## Itens Entregues (Conforme DoD)

| ID   | História                  | SP  | Status      | Observações                                               |
| ---- | ------------------------- | --- | ----------- | --------------------------------------------------------- |
| DOC  | Documentação da Aplicação | 25  | ✅ Entregue | UML, modelos BD, identidade visual e protótipo concluídos |
| US01 | Cadastro de Usuário       | 25  | ✅ Entregue | Fluxo completo validado — hash de senha e CPF único       |
| US02 | Login                     | 25  | ✅ Entregue | JWT no back-end, proteção de rotas implementada           |

**Pontos entregues:** 75 SP / **Pontos planejados:** 75 SP  
**Aproveitamento:** 100%

---

## Demonstração do Incremento

Fluxo demonstrado (vídeo):

1. **Cadastro** — preenchimento dos campos (CPF, nome, e-mail, senha), validação no front-end, rejeição de CPF duplicado, confirmação de persistência no PostgreSQL.
2. **Login** — autenticação com CPF e senha, geração de JWT, redirecionamento ao Painel de Módulos.
3. **Documentação** — navegação pelos artefatos no repositório: diagramas UML, modelos de BD, identidade visual e protótipo Figma.

**Vídeo da demo:** _A disponibilizar pelo SM_  
**Link da aplicação:** [ScrumFlow](https://scrum-flow-abp.onrender.com/)

---

## Critérios de Aceite — Validação pelo PO

### DOC — Documentação da Aplicação

- [ ] `README.md` estruturado com descrição do projeto, tecnologias e instruções de execução
- [ ] Kanban do projeto configurado e refletindo o andamento das tarefas da sprint
- [ ] Diagramas de Caso de Uso cobrindo os fluxos principais do sistema
- [ ] Diagrama de Classes com entidades, atributos e relacionamentos
- [ ] Diagramas de Sequência para os fluxos de cadastro, login e avaliação
- [ ] Modelo Conceitual do BD produzido e revisado pelo time
- [ ] Modelo Lógico do BD alinhado ao modelo conceitual e compatível com PostgreSQL
- [ ] Identidade visual (paleta de cores, tipografia e logotipo) definida e registrada
- [ ] Protótipo no Figma cobrindo as telas principais e navegável

### US01 — Cadastro de Usuário

- [ ] CPF aceita apenas CPFs válidos no formato `XXX.XXX.XXX-XX`
- [ ] CPF duplicado é rejeitado com mensagem clara ao usuário
- [ ] Campos obrigatórios validados: CPF, nome completo, e-mail, senha (mín. 8 caracteres)
- [ ] Senha armazenada com hash criptográfico — nunca em texto puro
- [ ] Após cadastro bem-sucedido, usuário é redirecionado para a página de login
- [ ] Interface responsiva — funciona em dispositivos móveis

### US02 — Login

- [ ] Login aceita apenas CPF e senha (sem e-mail)
- [ ] Após login bem-sucedido, redirecionamento ao painel de módulos
- [ ] Credenciais inválidas retornam mensagem genérica (não especifica qual campo está errado)
- [ ] Sessão/token gerenciada pelo back-end

**PO:** _A preencher_  
**Data de validação:** _A preencher_

---

## Feedback do Product Owner

| Item | Feedback              | Ação Necessária |
| ---- | --------------------- | --------------- |
| —    | _A preencher pelo PO_ | —               |

---

## Itens Não Entregues

Nenhum item ficou pendente nesta sprint. Todas as histórias comprometidas (DOC, US01, US02) foram entregues com 100% das tarefas concluídas.

---

## Observações Finais

_A preencher pelo SM com base no feedback coletado e na validação do PO._

---

<div align="center">
  <a href="../../../00-INDICE.md">← Voltar ao Índice</a> · <a href="../sprint-1.md">Sprint 1</a>
</div>
