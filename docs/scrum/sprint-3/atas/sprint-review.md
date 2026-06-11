← [Índice da Documentação](../../../README.md) · [Gestão Ágil — Scrum](../../README.md) · [Sprint 3](../sprint-3.md)

# Sprint Review — Sprint 3

**Data:** 11/06/2026  
**Formato:** Assíncrona (vídeo de demonstração + validação via GitHub/WhatsApp)  
**Scrum Master:** Gabriel Travensolli  
**Product Owner:** Gustavo Koiti  
**Time:** Andrea Turíbio, Henrique Camargo, Lucas Amorim, Marcello Campbell, Vinicius Augusto

---

## Meta da Sprint

> Entregar o histórico de tentativas (US08) e a área administrativa (US09), corrigir bugs remanescentes, melhorar a experiência visual e preparar a apresentação final do projeto.

**Meta atingida?** ✅ Sim — burndown encerrado em 0 SP no dia 11/06.

---

## Itens Entregues (Conforme DoD)

| ID   | História / Frente                | SP  | Status      | Observações                                                                                  |
| ---- | -------------------------------- | --- | ----------- | -------------------------------------------------------------------------------------------- |
| US08 | Histórico de Tentativas          | 13  | ✅ Entregue | Usuário consulta o histórico detalhado por módulo, com questões sorteadas, resposta escolhida vs. correta |
| US09 | Área Administrativa              | 27  | ✅ Entregue | Admin gerencia questões, alternativas e módulos via interface web e reseta senha de usuários; acesso liberado após login de perfil admin |
| —    | Correção de Bugs                 | 26  | ✅ Entregue | Recriação de exame, carregamento de imagens, validações, rotas pré-login, navbar e footer corrigidos |
| —    | Autenticação e Segurança         | 6   | ✅ Entregue | Sessão JWT ampliada, rotas privadas protegidas e remoção do "Lembrar de mim" |
| —    | UX/UI e Refinamento Visual       | 26  | ✅ Entregue | Favicon, responsividade, página "Sobre", certificado para impressão e terminologia "Nível" → "Módulo" |
| —    | Gamificação                      | 5   | ✅ Entregue | Animações de conclusão de módulo e geração de certificado, mensagens motivacionais |
| —    | Refatoração (navbar/footer)      | 5   | ✅ Entregue | Navbar e footer padronizados em todas as páginas, com extração de código compartilhado |
| —    | Documentação                     | 11  | ✅ Entregue | UML, modelos de BD, README, Product Backlog, manual do aluno e organização do repositório/Git |
| —    | Infraestrutura                   | 6   | ✅ Entregue | Banco recriado em nuvem (Neon) e deploy atualizado no Render |
| —    | Apresentação Final               | 3   | ✅ Entregue | Roteiro da apresentação concluído e ensaio técnico realizado |

**Pontos entregues:** 128 SP / **Pontos planejados:** 128 SP  
**Aproveitamento:** 100%

---

## Demonstração do Incremento

Fluxo demonstrado (vídeo):

1. **Histórico de Tentativas (US08)** — consulta detalhada por módulo, exibindo as questões sorteadas e a comparação entre resposta escolhida e correta.
2. **Área Administrativa (US09)** — login de perfil admin, CRUD de questões/alternativas e módulos, e reset de senha de usuários.
3. **Refinamentos de UX/UI** — favicon, página "Sobre", responsividade, certificado para impressão e a unificação da terminologia "Módulo".
4. **Gamificação** — animações de conclusão de módulo e de geração de certificado, com mensagens motivacionais.
5. **Encerramento do projeto** — apresentação do MVP completo do ScrumFlow, do cadastro à emissão do certificado.

**Vídeo da demo:** [Assistir no YouTube](https://youtu.be/pa0tak9AOZI)  
**Link da aplicação:** [ScrumFlow](https://scrum-flow-abp.onrender.com/)

---

## Critérios de Aceite — Validação pelo PO

- [x] Código implementado e funcional conforme os critérios de aceite das histórias
- [x] Código revisado por ao menos um membro do time via Pull Request aprovado
- [x] Sem conflitos de merge com a branch `develop`
- [x] Testado manualmente nos cenários principais (fluxo feliz) e cenários de erro
- [x] Toda lógica de negócio está implementada no back-end (não depende exclusivamente do front-end)
- [x] Dados persistidos e recuperados corretamente do banco PostgreSQL
- [x] Nenhum dado sensível exposto (senhas em hash, sem logs de credenciais)
- [x] Acesso administrativo restrito por middleware de perfil
- [x] Documentação atualizada conforme necessidade:
  - [x] Rotas da API atualizadas (histórico e endpoints administrativos)
  - [x] Modelo de dados e diagramas UML revisados
  - [x] README, Product Backlog e manual do aluno revisados
- [x] Pull Request mergeado em `develop` e branch de feature excluída
- [x] Aceito pelo Product Owner ao final da Sprint Review

**PO:** Gustavo Koiti  
**Data de validação:** 11/06/2026

---

## Feedback do Product Owner

| Item | Feedback | Ação Necessária |
|------|----------|-----------------|
| US08 | O histórico de tentativas ficou claro e completo, permitindo ao aluno revisar suas questões erradas por módulo. | Nenhuma — aprovado |
| US09 | A área administrativa entrega o CRUD completo de questões, alternativas e módulos, além do reset de senha, com acesso devidamente restrito ao perfil admin. | Nenhuma — aprovado |
| Bug Fix | Os bugs remanescentes da Sprint 2 (imagens das questões, rotas pré-login, navbar) foram corrigidos e validados. | Nenhuma — aprovado |
| UX/UI | O refinamento visual e a unificação da terminologia "Módulo" elevaram a maturidade do produto para a entrega final. | Nenhuma — aprovado |
| Commits | A distribuição de commits ficou mais equilibrada entre os integrantes em relação às sprints anteriores, atendendo à métrica de participação exigida pelo cliente. | Nenhuma — aprovado |
| Documentação | Toda a documentação foi revisada, e a organização do repositório foi aprimorada para facilitar o acesso de terceiros. | Nenhuma — aprovado |

---

## Itens Não Entregues

Nenhum item ficou pendente nesta sprint. Todas as histórias comprometidas (US08 e US09) e os 13 itens adicionais de escopo foram entregues com 100% das tarefas concluídas.

---

## Observações Finais

A Sprint 3 foi validada e aceita pelo PO, encerrando o projeto ScrumFlow com **128/128 SP entregues** e burndown zerado em 11/06. As duas histórias comprometidas (US08 — Histórico de tentativas e US09 — Área administrativa) foram entregues integralmente, somadas a 13 correções de bugs, melhorias de UX/UI, gamificação, atualização de documentação e à preparação da apresentação final.

As ressalvas herdadas da Sprint 2 — responsividade instável no redimensionamento da janela e não renderização das imagens de algumas questões — foram corrigidas. A organização do repositório e da documentação Git, ponto de melhoria recorrente nas retrospectivas anteriores, também foi endereçada. O incremento está funcional e acessível em [scrum-flow-abp.onrender.com](https://scrum-flow-abp.onrender.com/), completando o MVP de ponta a ponta — do cadastro à emissão do certificado.

---

<div align="center">
  <a href="../../../README.md">← Voltar ao Índice</a> · <a href="../../README.md">Gestão Ágil — Scrum</a> · <a href="../sprint-3.md">Sprint 3</a>
</div>
