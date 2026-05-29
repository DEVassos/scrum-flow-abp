← [Sprint 3](sprint-3.md)

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

- [ ] Código implementado e funcional conforme os critérios de aceite da história
- [ ] Código revisado por ao menos um membro do time via Pull Request aprovado
- [ ] Sem conflitos de merge com a branch `develop`
- [ ] Testado manualmente nos cenários principais (fluxo feliz) e cenários de erro
- [ ] Toda lógica de negócio está implementada no back-end (não depende exclusivamente do front-end)
- [ ] Dados persistidos e recuperados corretamente do banco PostgreSQL
- [ ] Nenhum dado sensível exposto (senhas em hash, sem logs de credenciais)
- [ ] Documentação atualizada conforme necessidade:
  - [ ] Rotas da API atualizadas (se houver novos endpoints)
  - [ ] Modelo de dados atualizado no diagrama de classes (se houver alterações)
  - [ ] Instruções de execução revisadas no README (se houver novas dependências)
- [ ] Pull Request mergeado em `develop` e branch de feature excluída
- [ ] Aceito pelo Product Owner ao final da Sprint Review

---

## Status DoR por História

| História | DoR | Observação |
|----------|:---:|------------|
| US08 — Histórico de Tentativas | ✅ | Critérios validados na Sprint Planning; endpoint, página e CSS definidos |
| US09 — Área Administrativa | ✅ | Critérios validados na Sprint Planning; CRUD completo + middleware admin |
| Bug Fixes — Exames e Progressão | ✅ | Bugs identificados e documentados pela equipe durante análise |
| Melhorias UX/UI | ✅ | Itens priorizados com consenso do time (ver análise de sobreposições) |
| Autenticação e Sessão | ✅ | Decisões do PO confirmadas (reset via admin, excluir "Lembrar de mim") |
| Documentação | ✅ | Escopo definido; dependente de código estável para diagramas UML |
| Gamificação (Extensão Opcional) | ✅ | Escopo definido como stretch goal |

<div align="center">
  <a href="sprint-3.md">← Voltar à Sprint 3</a>
</div>
