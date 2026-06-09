# 📈 Requisitos Não-Funcionais

← [Voltar a Requisitos](./)

Qualidades esperadas do sistema.

---

## RNF01 — Interface Responsiva

**Descrição:** A interface deve ser clara, simples e adaptável a diferentes tamanhos de tela.

**Critérios:**
- ✅ Mobile-first (design começa em 320px)
- ✅ Responsiva (funciona em desktop, tablet, mobile)
- ✅ Navegação intuitiva
- ✅ Contraste adequado (acessibilidade WCAG AA)
- ✅ Tempo de carregamento < 3s

**Testes:**
```
Devices: iPhone 12, iPad, Desktop 1920x1080
Browsers: Chrome, Firefox, Safari
Performance: PageSpeed Insights > 80
```

---

## RNF02 — Tempo de Resposta

**Descrição:** Sistema deve responder rapidamente em operações normais.

**Critérios:**
- Carregamento de página: < 2s
- Registro de resposta: < 500ms
- Emissão de certificado: < 5s
- Histórico com 100 registros: < 1s

**Medição:**
```
GET /api/usuarios/perfil      → ~100ms
POST /api/avaliacoes/responder → ~200ms
GET /api/avaliacoes/historico  → ~300ms
```

---

## RNF03 — Conformidade LGPD

**Descrição:** Proteção de dados pessoais conforme Lei Geral de Proteção de Dados.

**Critérios:**
- ✅ Consentimento do usuário coletado
- ✅ Senhas criptografadas (bcrypt, min 10 rounds)
- ✅ Não armazenar dados sensíveis em texto plano
- ✅ Logs de acesso (quem acessou quando)
- ✅ Direito ao esquecimento (DELETE de dados)
- ✅ Política de Privacidade visível
- ✅ Cookies e localStorage explicados

**Implementação:**
```javascript
// ✅ Criptografia
const senhaHash = await bcrypt.hash(senha, 10);

// ✅ Sem PII em logs
console.log('Usuário logou'); // OK
console.log(`CPF: ${cpf}`);   // NÃO OK

// ✅ Expiração de token
const token = jwt.sign(data, secret, { expiresIn: '10m' });
```

---

## RNF04 — Prevenção de Fraudes

**Descrição:** Evitar manipulações nas notas e tentativas.

**Critérios:**
- ✅ Lógica de notas **exclusivamente no backend**
- ✅ Validação de tentativas no servidor
- ✅ CPF único por usuário
- ✅ Timestamp em cada resposta
- ✅ Não confiar em dados do frontend
- ✅ Rate limiting em requisições

**Proteções:**
```javascript
// ❌ NUNCA fazer isso no frontend
localStorage.setItem('nota', 10);

// ✅ SEMPRE fazer isso no backend
if (tentativas_usadas >= 2) {
  return res.status(403).json({ error: 'Tentativas esgotadas' });
}

if (!validarCPF(cpf)) {
  return res.status(400).json({ error: 'CPF inválido' });
}
```

---

## RNF05 — Práticas Ágeis (Scrum)

**Descrição:** Projeto seguirá metodologia Scrum.

**Critérios:**
- ✅ Backlog priorizado
- ✅ Sprints de 1–2 semanas
- ✅ Cerimônias: Planning, Review, Retro, Daily
- ✅ Versionamento Git com PRs
- ✅ Definition of Ready (DoR) e Definition of Done (DoD)
- ✅ Burndown visível
- ✅ Retrospectivas registradas

**Artefatos:**
- Product Backlog (docs/_project-management/backlog.md)
- Sprint Backlog (docs/_project-management/sprint-N/)
- Burndown chart
- Atas de cerimônias

---

## RNF06 — Documentação Mínima

**Descrição:** Documentação suficiente para manutenção.

**Critérios:**
- ✅ README com instruções de setup
- ✅ Modelo de dados (BD)
- ✅ Diagramas UML
- ✅ Rotas da API documentadas
- ✅ Padrões de código estabelecidos
- ✅ Atualizações junto com PRs

**Documentos:**
```
docs/
├── _getting-started/      # Quickstart + Setup
├── _development/          # Guias de código
├── _design/               # Modelos + UML
├── _requirements/         # RF, RNF, RP
└── _project-management/   # Scrum + Backlog
```

---

## 📊 Avaliação de Qualidade

| RNF | Métrica | Target | Método |
|-----|---------|--------|--------|
| RNF01 | Responsividade | 100% dos devices | Testes manuais |
| RNF02 | Latência | < 500ms | DevTools / Lighthouse |
| RNF03 | Conformidade | Checklist LGPD | Auditoria |
| RNF04 | Fraude | 0 casos | Teste de penetração |
| RNF05 | Aderência | 100% | Daily + Retro |
| RNF06 | Cobertura | ≥ 80% | Revisão de docs |

---

<div align="center">
  <a href="./">← Voltar a Requisitos</a>
</div>
