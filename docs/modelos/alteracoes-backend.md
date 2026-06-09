# Alterações de Backend — Histórico de Questões (RF10)

← [Índice de Modelos](./README.md)

Este documento registra os novos artefatos de backend criados para implementar a página **Histórico de Questões** (`historicoquestoes.html`). O objetivo é que qualquer membro do time consiga atualizar os diagramas UML e o modelo de BD sem precisar rastrear os commits.

---

## Contexto

O RF10 (Histórico) já existia na documentação de forma parcial — o endpoint `GET /api/questoes/modulos-respondidos` retorna estatísticas por tentativa (nota, data, questões respondidas), mas **não retornava o detalhe das questões com as respostas do usuário**. A nova página precisa exibir, questão a questão, o que o usuário respondeu, se acertou ou errou, e qual era a alternativa correta.

---

## O que foi adicionado

### 1. Função de repositório — `findHistoricoQuestoesByModulo`

**Arquivo:** `app/src/repositories/questoes.repositories.js`

Retorna todas as questões respondidas da **última tentativa** do usuário em um módulo específico, incluindo a resposta do usuário e o gabarito.

**Parâmetros:**
| Parâmetro   | Tipo    | Descrição                        |
|-------------|---------|----------------------------------|
| `idUsuario` | integer | ID do usuário autenticado (JWT)  |
| `idModulo`  | integer | ID do módulo a consultar         |

**Retorno (array de objetos):**
| Campo              | Tipo    | Descrição                                      |
|--------------------|---------|------------------------------------------------|
| `id_questao`       | integer | Identificador da questão                       |
| `numero`           | integer | Número de ordem da questão na prova            |
| `enunciado`        | string  | Texto da pergunta                              |
| `alternativa_a`    | string  | Texto da alternativa A                         |
| `alternativa_b`    | string  | Texto da alternativa B                         |
| `alternativa_c`    | string  | Texto da alternativa C                         |
| `alternativa_d`    | string  | Texto da alternativa D                         |
| `alternativa_correta` | string | Letra da alternativa correta (`"a"`, `"b"`, `"c"` ou `"d"`) |
| `resposta_usuario` | string  | Letra que o usuário escolheu                   |
| `nota`             | integer | `1` se acertou, `0` se errou                   |

**Lógica da query:**

1. Busca o `id_exame` mais recente do usuário (há um exame por usuário, atualizado em place).
2. Dentro desse exame, identifica o `grupo` de questões da **última tentativa** no módulo especificado (pelo `MAX(respondido_em)` agrupado por grupo).
3. Retorna todas as questões desse grupo com as respectivas respostas registradas na tabela `respostas`.

> **Por que "última tentativa"?** Um usuário pode ter tentado o mesmo módulo até 2 vezes (grupos diferentes). O histórico exibe sempre a tentativa mais recente.

---

### 2. Nova rota — `GET /api/questoes/historico/:idModulo`

**Arquivo:** `app/src/routes/questoes.routes.js`

**Acesso:** Privado — requer `Authorization: Bearer <token>` (middleware `authMiddleware`).

**Parâmetro de rota:**
| Parâmetro  | Tipo    | Descrição                |
|------------|---------|--------------------------|
| `idModulo` | integer | ID do módulo a consultar |

**Respostas HTTP:**

| Status | Situação                                                   |
|--------|------------------------------------------------------------|
| `200`  | Questões encontradas — retorna o array descrito acima      |
| `400`  | `idModulo` não é um número inteiro positivo válido         |
| `404`  | Usuário não tem nenhuma resposta registrada nesse módulo   |
| `500`  | Erro interno do servidor                                   |

**Exemplo de resposta `200`:**
```json
[
  {
    "id_questao": 5,
    "numero": 1,
    "enunciado": "Qual dos itens abaixo NÃO é um valor do Manifesto Ágil?",
    "alternativa_a": "Indivíduos e interações",
    "alternativa_b": "Software funcionando",
    "alternativa_c": "Processos e ferramentas",
    "alternativa_d": "Colaboração com o cliente",
    "alternativa_correta": "c",
    "resposta_usuario": "b",
    "nota": 0
  },
  {
    "id_questao": 7,
    "numero": 2,
    "enunciado": "Em que ano foi publicado o Manifesto Ágil?",
    "alternativa_a": "1999",
    "alternativa_b": "2001",
    "alternativa_c": "2003",
    "alternativa_d": "2005",
    "alternativa_correta": "b",
    "resposta_usuario": "b",
    "nota": 1
  }
]
```

---

## Rotas existentes utilizadas pela mesma página

A página `historicoquestoes.html` também consome o endpoint já existente abaixo, sem modificações:

| Método | Endpoint                              | Uso na página                                    |
|--------|---------------------------------------|--------------------------------------------------|
| `GET`  | `/api/questoes/modulos-respondidos`   | Popula a lista lateral de módulos já tentados    |

---

## Impacto nos diagramas — o que precisa ser atualizado

### RF10 — Histórico (`RF10_dc_historico.svg` e `RF10_ds_historico.svg`)

Os diagramas atuais de RF10 mostram o fluxo de `exibir_historico()` de forma genérica. Com essa entrega, o fluxo ganhou um detalhe novo que deve ser refletido:

**Diagrama de Sequência (`RF10_ds_historico.svg`) — sugestão de atualização:**
- Adicionar a mensagem do Frontend para o Backend: `GET /historico/:idModulo`
- Adicionar a consulta do Backend ao BD: query nas tabelas `exames`, `respostas` e `questoes` (join triplo com CTE `ultima_tentativa`)
- Adicionar o retorno: array com `enunciado`, `alternativa_correta`, `resposta_usuario`, `nota`

**Diagrama de Classes (`RF10_dc_historico.svg`) — sugestão de atualização:**
- O método `exibir_historico()` pode ser desdobrado em dois: `listarModulosRespondidos()` (já existia) e `buscarQuestoesPorModulo(idModulo)` (novo)

### Modelo Lógico de BD

Nenhuma tabela nova foi criada. A query utiliza apenas as tabelas já existentes:
- `exames` (para identificar o exame do usuário)
- `respostas` (para recuperar as respostas registradas)
- `questoes` (para recuperar enunciado, alternativas e gabarito)

O modelo lógico **não precisa ser alterado**.

---

## Arquivos alterados neste PR

```
app/src/repositories/questoes.repositories.js  ← função findHistoricoQuestoesByModulo adicionada
app/src/routes/questoes.routes.js              ← rota GET /historico/:idModulo adicionada
```

---

<div align="center">
  <a href="./README.md">← Voltar ao Índice de Modelos</a>
</div>
