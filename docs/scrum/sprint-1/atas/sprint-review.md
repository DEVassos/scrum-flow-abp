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
| DOC  | Documentação da Aplicação | 39  | ✅ Entregue | UML, modelos BD, identidade visual e protótipo concluídos |
| US01 | Cadastro de Usuário       | 18  | ✅ Entregue | Fluxo completo validado — hash de senha e CPF único       |
| US02 | Login                     | 18  | ✅ Entregue | JWT no back-end, proteção de rotas implementada           |

**Pontos entregues:** 75 SP / **Pontos planejados:** 75 SP  
**Aproveitamento:** 100%

---

## Demonstração do Incremento

Fluxo demonstrado (vídeo):

1. **Cadastro** — preenchimento dos campos (CPF, nome, e-mail, senha), validação no front-end, rejeição de CPF duplicado, confirmação de persistência no PostgreSQL.
2. **Login** — autenticação com CPF e senha, geração de JWT, redirecionamento ao Painel de Módulos.
3. **Documentação** — navegação pelos artefatos no repositório: diagramas UML, modelos de BD, identidade visual e protótipo Figma.

**Vídeo da demo:** [Assistir no YouTube](https://youtu.be/rQ7mEWP7sGU)  
**Link da aplicação:** [ScrumFlow](https://scrum-flow-abp.onrender.com/)

---

## Critérios de Aceite — Validação pelo PO

### DOC — Documentação da Aplicação

- [x] `README.md` estruturado com descrição do projeto, tecnologias e instruções de execução
- [x] Kanban do projeto configurado e refletindo o andamento das tarefas da sprint
- [x] Diagramas de Caso de Uso cobrindo os fluxos principais do sistema
- [x] Diagrama de Classes com entidades, atributos e relacionamentos
- [x] Diagramas de Sequência para os fluxos de cadastro, login e avaliação
- [x] Modelo Conceitual do BD produzido e revisado pelo time
- [x] Modelo Lógico do BD alinhado ao modelo conceitual e compatível com PostgreSQL
- [x] Identidade visual (paleta de cores, tipografia e logotipo) definida e registrada
- [x] Protótipo no Figma cobrindo as telas principais e navegável

### US01 — Cadastro de Usuário

- [x] CPF aceita apenas CPFs válidos no formato `XXX.XXX.XXX-XX`
- [x] CPF duplicado é rejeitado com mensagem clara ao usuário
- [x] Campos obrigatórios validados: CPF, nome completo, e-mail, senha (mín. 8 caracteres)
- [x] Senha armazenada com hash criptográfico — nunca em texto puro
- [x] Após cadastro bem-sucedido, usuário é redirecionado para a página de login
- [ ] Interface responsiva — funciona em dispositivos móveis

### US02 — Login

- [x] Login aceita apenas CPF e senha (sem e-mail)
- [x] Após login bem-sucedido, redirecionamento ao painel de módulos
- [x] Credenciais inválidas retornam mensagem genérica (não especifica qual campo está errado)
- [x] Sessão/token gerenciada pelo back-end

**PO:** Gustavo Koiti  
**Data de validação:** 30/04/2026

---

## Feedback do Product Owner

| Item | Feedback | Ação Necessária |
|------|----------|-----------------|
| DOC — Documentação geral | Todos os artefatos foram produzidos dentro do esperado. O README está claro e as instruções de execução são objetivas. Os diagramas cobrem os fluxos principais e a identidade visual está alinhada com a proposta do projeto. | Nenhuma — aprovado |
| US01 — Cadastro | O fluxo de cadastro funciona conforme os critérios de aceite. A validação de CPF duplicado está clara para o usuário. **Ressalva:** a responsividade em dispositivos móveis não está satisfatória — a interface não se comporta adequadamente em telas pequenas. | Ajustar responsividade (CSS mobile-first) nas Sprints 2 ou 3 |
| US02 — Login | O login funciona corretamente com CPF e senha. O redirecionamento para o painel de módulos ocorre sem erros e as mensagens de erro genéricas estão de acordo com o requisito de segurança. | Nenhuma — aprovado |
| Entrega adicional | A equipe entregou, além do comprometido, a página de manifesto e a página "O que é Scrum" — iniciativa valorizada pelo PO como demonstração de comprometimento e cuidado com a experiência do usuário. | Nenhuma — destaque positivo |

---

## Itens Não Entregues

Nenhum item ficou pendente nesta sprint. Todas as histórias comprometidas (DOC, US01, US02) foram entregues com 100% das tarefas concluídas.

---

## Observações Finais

As histórias da Sprint 1 foram validadas e aceitas pelo PO. Ressalva registrada: a responsividade em dispositivos móveis não está satisfatória e será endereçada nas Sprints 2 ou 3. O incremento entregue — cadastro, login e documentação completa — está funcional e acessível em [scrum-flow-abp.onrender.com](https://scrum-flow-abp.onrender.com/). O burndown encerrou em 0 SP no dia 28/04, um dia antes do prazo, com entregas adicionais além do sprint backlog. A Sprint 2 inicia com a base técnica e documental estabelecida.

---

<div align="center">
  <a href="../../../00-INDICE.md">← Voltar ao Índice</a> · <a href="../sprint-1.md">Sprint 1</a>
</div>
