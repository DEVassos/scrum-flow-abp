<!-- Template — copie para seu destino e ajuste o caminho do Índice -->
← [Índice da Documentação](../../README.md)

# Checklist de DoR e DoD

> **DoR (Definition of Ready):** critérios que um item do backlog deve atender **antes** de entrar em uma sprint.  
> **DoD (Definition of Done):** critérios que uma entrega deve atender para ser considerada **pronta**.

---

## Definition of Ready (DoR) — Critérios de Entrada na Sprint

Um item do backlog está **pronto para ser puxado para a sprint** quando atende a **todos** os critérios abaixo:

- [ ] A história de usuário está escrita no formato *"Como [persona], quero [ação] para [benefício]"*
- [ ] Os critérios de aceite estão definidos e compreendidos pelo time
- [ ] A história está estimada pelo time de desenvolvimento (em pontos ou esforço)
- [ ] Dependências técnicas ou de outras histórias foram identificadas
- [ ] A história é pequena o suficiente para ser concluída em uma única sprint
- [ ] O Product Owner validou e priorizou o item no backlog
- [ ] Não há ambiguidades: o time sabe o que precisa ser feito e pode iniciar sem bloqueios

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

## DoR e DoD por Sprint

Acesse os registros específicos de cada sprint:

| Sprint | DoR e DoD registrados |
|--------|-----------------------|
| [Sprint 1](../sprint-1/dor-dod.md) | Critérios validados e marcados ao início/fim da sprint |
| [Sprint 2](../sprint-2/dor-dod.md) | Critérios validados e marcados ao início/fim da sprint |
| [Sprint 3](../sprint-3/dor-dod.md) | Critérios validados e marcados ao início/fim da sprint |


