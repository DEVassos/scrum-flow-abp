← [Índice da Documentação](../../../00-INDICE.md) · [Sprint 1](../sprint-1.md)

# Sprint Review — Sprint 2

**Data:** 21/05/2026  
**Formato:** Assíncrona (vídeo de demonstração + validação via GitHub/WhatsApp)  
**Scrum Master:** Gabriel Travensolli  
**Product Owner:** Gustavo Koiti  
**Time:** Andrea Turíbio, Henrique Camargo, Lucas Amorim, Marcello Campbell, Vinicius Augusto

---

## Meta da Sprint

> Ao final desta sprint, qualquer usuário poderá se cadastrar e fazer login na plataforma, com dados validados no front-end, processados no back-end e persistidos no PostgreSQL, bem como realizar todos os 5 módulos presentes no curso, com material de estudo, avaliação de certificação de realização e desempenho. Paralelamente, toda a documentação técnica e de produto estará produzida e revisada.

**Meta atingida?** ✅ Sim — burndown encerrado em 0 SP no dia 21/05.

---

## Itens Entregues (Conforme DoD)

| ID   | História                  | SP  | Status      | Observações                                               |
| ---- | ------------------------- | --- | ----------- | --------------------------------------------------------- |
| US03 | Realizar Avaliação de Nível | 27 | ✅ Entregue | A Avaliação do módulo é automaticamente disponibilizada assim que o usuário garante seu acesso ao módulo seguinte |
| US04 | Controle de Tentativas por Nível | 16 | ✅ Entregue | O backend garante que o usuário possua tentativas limitadas de realização do exame, evitando que sua certificação seja emitida por meio de exaustão do banco de questões |
| US05 | Nota Final por Nível | 2 | ✅ Entregue | Ao realizar novas tentativas dos exames de cada módulo, o sistema computa automaticamente a melhor nota e a disponibiliza no histórico do usuário |
| US06 | Média Final | 5 | ✅ Entregue | O desempenho final do usuário é automaticamente calculado assim que é aprovado no último exame |
| US07 | Certificado Digital | 13 | ✅ Entregue | Assim que o usuário conclui a realização do curso, o certificado é imediatamente disponibilizado para download e/ou impressão |
| — | Ressalvas de escopo | 11 | ⚠️ Entregue parcialmente | Responsividade CSS: time com expectativa de melhoras ainda mais a responsividade da aplicação em diferentes dispositivos |
| — | Infra / Suporte | 10 | ✅ Entregue | Todos os testes de funcionamento e desempenho realizados e aprovados |
| — | Documentação | 12 | ✅ Entregue | Revisada e atualizada conforme endpoints estabelecidos |

**Pontos entregues:** 96 SP / **Pontos planejados:** 96 SP  
**Aproveitamento:** 100%

---

## Demonstração do Incremento

Fluxo demonstrado (vídeo):

1. **Cadastro e Login** — autenticação com CPF e senha, geração de JWT, redirecionamento ao Painel de Módulos.
2. **Dashboard e Módulos** — navegação pelas páginas da aplicação.
3. **Exame** — demonstração da realização de um dos exames presentes na aplicação e apresentação das exceções previstas pelos requisitos elicitados do cliente.
4. **Certificação** — exibição do painel de certificação da aplicação.
5. **Sprint 3** — discussão das expectativas de entrega final do produto requisitado.

**Vídeo da demo:** [Assistir no YouTube](https://www.youtube.com/watch?v=YXv9-3iwp9A)  
**Link da aplicação:** [ScrumFlow](https://scrum-flow-abp.onrender.com/)

---

## Critérios de Aceite — Validação pelo PO

- [x] Código implementado e funcional conforme os critérios de aceite da história
- [x] Código revisado por ao menos um membro do time via Pull Request aprovado
- [x] Sem conflitos de merge com a branch `develop`
- [x] Testado manualmente nos cenários principais (fluxo feliz) e cenários de erro
- [x] Toda lógica de negócio está implementada no back-end (não depende exclusivamente do front-end)
- [x] Dados persistidos e recuperados corretamente do banco PostgreSQL
- [x] Nenhum dado sensível exposto (senhas em hash, sem logs de credenciais)
- [x] Documentação atualizada conforme necessidade:
  - [x] Rotas da API atualizadas (com novos endpoints)
  - [x] Modelo de dados atualizado no diagrama de classes e sequência
  - [x] Instruções de execução revisadas no README (aguardando apresentação do MVP)
- [x] Pull Request mergeado em `develop` e branch de feature excluída
- [x] Aceito pelo Product Owner ao final da Sprint Review

**PO:** Gustavo Koiti  
**Data de validação:** 21/05/2026

---

## Feedback do Product Owner

| Item | Feedback | Ação Necessária |
|------|----------|-----------------|
| DOC | Todos os artefatos foram produzidos, revisados e atualizados, conforme seu uso e necessidade. | Nenhuma — aprovado |
| US03~07 | Todas as User Stories desenvolvidas no decorrer da Sprint foram dependentes de um árduo trabalho em ambos front e backend, onde o time entregou tudo o que fora requisitado com maestria e austeridade | Nenhuma — aprovado |
| Infra / Suporte | Todos os testes necessários foram realizados de forma independente por todos os integrantes do time, garantido integridade e replicabilidade | Nenhuma — aprovado |
| Responsividade | A aplicação apresenta responsividade total em dispositivos móveis, porém apresenta responsividade instável no redimensionamento da janela do navegador, fato verificado pelos desenvolvedores | Estender e finalizar o desenvolvimento na Sprint 3 |

---

## Itens Não Entregues

Nenhum item ficou pendente nesta sprint. Todas as histórias comprometidas foram entregues com 100% das tarefas concluídas.

---

## Observações Finais

As histórias da Sprint 2 foram validadas e aceitas pelo PO. Ressalvas registradas: a responsividade em dispositivos móveis ainda não está satisfatória e será endereçada na Sprint 3; as imagens de algumas questões não estão renderizando; equalização no volume de commits por membro. O incremento entregue está funcional e acessível em [scrum-flow-abp.onrender.com](https://scrum-flow-abp.onrender.com/). O burndown encerrou em 0 SP no dia 21/05, com entregas adicionais além do sprint backlog. A Sprint 3 inicia com a base técnica e documental estabelecida, objetivando o aprimoramento estético da aplicação e a implementação da área administrativa.

---

<div align="center">
  <a href="../../../00-INDICE.md">← Voltar ao Índice</a> · <a href="../sprint-2.md">Sprint 2</a>
</div>
