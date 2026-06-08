# 📚 Requisitos & Escopo

Documentação de requisitos, restrições e escopo do projeto.

---

## 📋 Documentos

| Documento | Descrição |
|-----------|-----------|
| [Requisitos Funcionais](./functional-requirements.md) | RF01–RF12: O que o sistema deve fazer |
| [Requisitos Não-Funcionais](./non-functional.md) | RNF01–RNF06: Qualidade, performance, segurança |
| [Restrições de Projeto](./constraints.md) | RP01–RP05: Limitações técnicas e de prazo |

---

## 🎯 Visão Geral

**Sistema de Avaliação por Módulos com Certificação**

Este projeto implementa uma plataforma educacional onde usuários podem:
- Cadastrar-se com CPF
- Realizar avaliações em 5 módulos diferentes
- Obter certificados ao atingir média mínima
- Consultar histórico de tentativas

---

## ✅ Checklist de Requisitos

### Funcionais (RF)

- [ ] RF01 — Cadastro com CPF, nome, email, senha
- [ ] RF02 — Login por CPF e senha
- [ ] RF03 — Seleção aleatória de 10 questões por módulo
- [ ] RF04 — Classificação em fácil, médio, difícil
- [ ] RF05 — Composição: 3 fáceis + 4 médias + 3 difíceis
- [ ] RF06 — Limite de 2 tentativas por módulo
- [ ] RF07 — Nota final = melhor nota entre tentativas
- [ ] RF08 — Resultado final = média dos 5 módulos
- [ ] RF09 — Emissão de certificado
- [ ] RF10 — Histórico de tentativas
- [ ] RF11 — Consulta de progresso
- [ ] RF12 — Área administrativa (opcional)

### Não-Funcionais (RNF)

- [ ] RNF01 — Interface responsiva
- [ ] RNF02 — Tempo de resposta adequado
- [ ] RNF03 — Conformidade LGPD
- [ ] RNF04 — Prevenção de fraudes
- [ ] RNF05 — Práticas ágeis (Scrum)
- [ ] RNF06 — Documentação mínima

### Restrições (RP)

- [ ] RP01 — Frontend: HTML/CSS/JS puro (sem frameworks)
- [ ] RP02 — BD: PostgreSQL (sem ORM)
- [ ] RP03 — Entrega em 3 sprints
- [ ] RP04 — Lógica de negócio no backend
- [ ] RP05 — Git Flow com PRs

---

## 📖 Leitura Recomendada

1. **Novo no projeto?** Leia [Requisitos Funcionais](./functional-requirements.md)
2. **Desenvolvedor?** Entenda as [Restrições](./constraints.md)
3. **Arquiteto?** Analise os [RNF](./non-functional.md)

---

<div align="center">
  <a href="../README.md">📚 Índice da Documentação</a>
</div>
