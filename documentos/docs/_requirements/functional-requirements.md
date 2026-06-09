# ✅ Requisitos Funcionais

← [Voltar a Requisitos](./)

O que o sistema **deve fazer** para os usuários.

---

## RF01 — Cadastro de Usuário

**Descrição:** O sistema deve permitir que novos usuários se cadastrem.

**Critérios:**
- CPF como identificador único (11 dígitos, validado)
- Nome (obrigatório)
- Email (obrigatório, único)
- Senha (criptografada)

**Endpoint:** `POST /api/auth/register`

**Exemplo:**
```json
{
  "nome": "João Silva",
  "cpf": "12345678900",
  "email": "joao@example.com",
  "password": "senha123"
}
```

---

## RF02 — Login

**Descrição:** Usuários fazem login com CPF e senha.

**Critérios:**
- Autenticação exclusivamente por CPF + senha
- Gera token JWT
- Token armazenado no frontend (localStorage)

**Endpoint:** `POST /api/auth/login`

**Exemplo:**
```json
{
  "cpf": "12345678900",
  "password": "senha123"
}
```

**Resposta:**
```json
{
  "token": "eyJhbGc...",
  "usuario": { "id": 1, "nome": "João", "cpf": "..." }
}
```

---

## RF03 — Seleção Aleatória de Questões

**Descrição:** O sistema seleciona **10 questões aleatórias** de um banco de 30 por módulo.

**Critérios:**
- Aleatória (não repetir na mesma tentativa)
- 1 módulo = 1 avaliação de 10 questões
- Total de 30 questões por módulo no banco
- Seleção é **aleatória por tentativa** (diferentes questões em tentativas diferentes)

---

## RF04 — Classificação de Questões

**Descrição:** Cada questão tem um nível de dificuldade.

**Critérios:**
- Classificação em 3 níveis: **Fácil**, **Médio**, **Difícil**
- Cada questão tem apenas 1 nível

**Banco de Questões:**
```
30 questões por módulo
├── 10 fáceis
├── 10 médias
└── 10 difíceis
```

---

## RF05 — Composição Obrigatória

**Descrição:** Cada avaliação de 10 questões segue a composição: **3 fáceis + 4 médias + 3 difíceis**.

**Critérios:**
- Composição fixa (não negociável)
- Garantida em todas as tentativas
- Aleatória dentro de cada nível (não a mesma questão)

**Exemplo:**
```
Tentativa 1:
- Questões fáceis: 1, 5, 12
- Questões médias: 3, 7, 9, 15
- Questões difíceis: 2, 11, 25

Tentativa 2 (do mesmo módulo):
- Questões fáceis: 4, 8, 14  ← diferentes!
- Questões médias: 6, 10, 13, 20
- Questões difíceis: 18, 24, 28
```

---

## RF06 — Limite de Tentativas

**Descrição:** Cada usuário tem **limite de 2 tentativas** por módulo.

**Critérios:**
- Máximo 2 tentativas por módulo
- Após esgotar, não pode fazer mais avaliações naquele módulo
- Limite é **por usuário + módulo**

---

## RF07 — Nota Final do Módulo

**Descrição:** A nota final do módulo é a **maior nota entre as tentativas** realizadas.

**Critérios:**
- Se usuário fez 2 tentativas: usa a maior
- Se fez 1 tentativa: usa essa nota
- Se não fez: 0 ou ausência de nota

**Exemplo:**
```
Tentativa 1: 6.5 pontos
Tentativa 2: 8.2 pontos
→ Nota final do módulo = 8.2
```

---

## RF08 — Resultado Final

**Descrição:** O resultado final é a **média aritmética das notas** de todos os 5 módulos.

**Critérios:**
- Calcula a média dos 5 módulos
- Só inclui módulos com notas (evita divisão por 0)
- Certificado emitido se média ≥ X (definir threshold com professor)

**Fórmula:**
```
Resultado Final = (Módulo1 + Módulo2 + Módulo3 + Módulo4 + Módulo5) / 5
```

**Exemplo:**
```
Módulo 1: 8.2
Módulo 2: 7.5
Módulo 3: 9.0
Módulo 4: 6.8
Módulo 5: 8.5
→ Resultado Final = 8.0
```

---

## RF09 — Emissão de Certificado

**Descrição:** Sistema emite certificado automaticamente.

**Critérios:**
- Contém: nome, CPF, email, data, notas discriminadas por módulo
- Formato: PDF
- Emitido após conclusão de **todos os 5 módulos**
- Pode ser baixado do dashboard

**Dados no Certificado:**
```
CERTIFICADO DE CONCLUSÃO
─────────────────────────
Nome: João Silva
CPF: 123.456.789-00
Email: joao@example.com
Data: 15 de janeiro de 2026

Notas por Módulo:
├── Módulo 1: 8.2
├── Módulo 2: 7.5
├── Módulo 3: 9.0
├── Módulo 4: 6.8
└── Módulo 5: 8.5

Resultado Final: 8.0
─────────────────────────
```

---

## RF10 — Histórico de Tentativas

**Descrição:** Usuários podem consultar o histórico de tentativas.

**Critérios:**
- Mostra data/hora da tentativa
- Pontuação obtida
- Questões sorteadas (opcional: respostas)
- Filtro por módulo

**Dados:**
```
Tentativa 1 (Módulo 1)
├── Data: 15/01/2026 - 14:30
├── Nota: 8.2
├── Questões: 1, 3, 5, 7, 9, 11, 13, 15, 17, 19
└── Respostas: [A, B, C, ...]

Tentativa 2 (Módulo 1)
├── Data: 14/01/2026 - 10:15
├── Nota: 6.5
├── Questões: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20
└── Respostas: [B, C, A, ...]
```

---

## RF11 — Consulta de Progresso

**Descrição:** Usuários veem seu progresso geral.

**Critérios:**
- Módulos concluídos (com notas finais)
- Módulos em andamento (com tentativas restantes)
- Melhor nota em cada módulo
- Resultado final (média geral)
- Percentual de conclusão

**Exemplo:**
```
Progresso Geral
──────────────────────
Módulo 1: Concluído (nota: 8.2)
Módulo 2: Concluído (nota: 7.5)
Módulo 3: 1 tentativa feita (1 restante)
Módulo 4: Não iniciado (2 tentativas disponíveis)
Módulo 5: Não iniciado (2 tentativas disponíveis)

Média Geral: 8.0
Progresso: 2 de 5 módulos concluídos
```

---

## RF12 — Área Administrativa (Opcional)

**Descrição:** Área para gerenciar questões, módulos e imagens (implementação opcional).

**Funcionalidades (se implementadas):**
- Cadastro de questões
- Manutenção de módulos
- Upload de imagens para questões
- Visualização de estatísticas

---

## 📊 Matriz de Rastreabilidade

| RF | Implementado? | Sprint | Observações |
|----|---|--------|---|
| RF01 | ✅ | 1 | Cadastro básico |
| RF02 | ✅ | 1 | JWT token |
| RF03 | ✅ | 2 | Aleatória com seed |
| RF04 | ✅ | 1 | Seed data |
| RF05 | ✅ | 2 | 3-4-3 garantido |
| RF06 | ✅ | 2 | Check no BE |
| RF07 | ✅ | 2 | Max(nota1, nota2) |
| RF08 | ✅ | 3 | AVG(notas) |
| RF09 | ✅ | 3 | PDF gerado |
| RF10 | ✅ | 3 | Query com histórico |
| RF11 | ✅ | 3 | Dashboard |
| RF12 | ❓ | — | Não priorizado |

---

<div align="center">
  <a href="./">← Voltar a Requisitos</a>
</div>
