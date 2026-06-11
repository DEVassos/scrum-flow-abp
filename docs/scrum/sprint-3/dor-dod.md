← [Índice da Documentação](../../README.md) · [Gestão Ágil — Scrum](../README.md) · [Sprint 3](sprint-3.md)
# Checklist de DoR e DoD — Sprint 3

> **DoR (Definition of Ready):** critérios que um item do backlog deve atender **antes** de entrar em uma sprint.
> **DoD (Definition of Done):** critérios que uma entrega deve atender para ser considerada **pronta**.

---

## Definition of Ready (DoR) — Critérios de Entrada na Sprint

Um item do backlog está **pronto para ser puxado para a sprint** quando atende a **todos** os critérios abaixo:

- [x] A história de usuário está escrita no formato *"Como [persona], quero [ação] para [benefício]"*
- [x] Os critérios de aceite estão definidos e compreendidos pelo time
- [x] A história está estimada pelo time de desenvolvimento (em pontos ou esforço)
- [x] Dependências técnicas ou de outras histórias foram identificadas
- [x] A história é pequena o suficiente para ser concluída em uma única sprint
- [x] O Product Owner validou e priorizou o item no backlog
- [x] Não há ambiguidades: o time sabe o que precisa ser feito e pode iniciar sem bloqueios

---

## Definition of Done (DoD) — Critérios de Conclusão

Um item é considerado **Pronto (Done)** quando atende a **todos** os critérios abaixo:

- [x] Código implementado e funcional conforme os critérios de aceite da história
- [x] Código revisado por ao menos um membro do time via Pull Request aprovado
- [x] Sem conflitos de merge com a branch `develop`
- [x] Testado manualmente nos cenários principais (fluxo feliz) e cenários de erro
- [x] Toda lógica de negócio está implementada no back-end (não depende exclusivamente do front-end)
- [x] Dados persistidos e recuperados corretamente do banco PostgreSQL
- [x] Nenhum dado sensível exposto (senhas em hash, sem logs de credenciais)
- [x] Documentação atualizada conforme necessidade:
  - [x] Rotas da API atualizadas (histórico e endpoints administrativos)
  - [x] Modelo de dados atualizado no diagrama de classes (área administrativa)
  - [x] Instruções de execução revisadas no README
- [x] Pull Request mergeado em `develop` e branch de feature excluída
- [x] Aceito pelo Product Owner ao final da Sprint Review

> ✅ **DoD atendido integralmente** — todas as 61 tarefas (128 SP) foram concluídas e validadas pelo PO na [Sprint Review](atas/sprint-review.md) de 11/06/2026. Burndown zerado no encerramento da sprint.

---

## Status DoR por História

| História | DoR | DoD | Observação |
|----------|:---:|:---:|------------|
| US08 — Histórico de Tentativas | ✅ | ✅ | Critérios validados na Sprint Planning; endpoint, página e CSS entregues e aceitos |
| US09 — Área Administrativa | ✅ | ✅ | Critérios validados na Sprint Planning; CRUD completo + middleware admin entregues e aceitos |
| Bug Fixes — Exames e Progressão | ✅ | ✅ | Bugs identificados pela equipe e corrigidos; ressalvas da Sprint 2 sanadas |
| Melhorias UX/UI | ✅ | ✅ | Itens priorizados com consenso do time e concluídos (favicon, responsividade, terminologia "Módulo") |
| Autenticação e Sessão | ✅ | ✅ | Reset via admin, sessão JWT ampliada e remoção do "Lembrar de mim" entregues |
| Documentação | ✅ | ✅ | UML, BD, README, Product Backlog, manual do aluno e organização do repositório atualizados |
| Gamificação (Extensão Opcional) | ✅ | ✅ | Animações de módulo/certificado e mensagens motivacionais entregues |
| Escopo Incremental pós-Planning (S3_T55–S3_T61) | ✅ | ✅ | 13 SP adicionados em 01/06; integração da área administrativa e recriação do banco em nuvem concluídas |

<div align="center">
  <a href="../../README.md">← Voltar ao Índice</a> · <a href="../README.md">Gestão Ágil — Scrum</a> · <a href="sprint-3.md">Sprint 3</a>
</div>
