# 🗄️ Modelagem do Banco de Dados

← [Índice da Documentação](../../00-INDICE.md) · [Modelos](../README.md)

Documentação dos modelos conceitual e lógico do PostgreSQL.

> 📌 **Restrição (RP02):** apenas DDL e DML explícitos. Nenhum ORM permitido.

> ⚠️ **Modelos em evolução:** os modelos abaixo refletem o estado atual do projeto. Novas tabelas e relacionamentos serão adicionados conforme os requisitos das Sprints 2 e 3 (avaliações, histórico, certificado) forem implementados.

---

## Modelo Conceitual (DER)

Entidades, atributos e relacionamentos do domínio.

![Modelo Conceitual](./modelo-conceitual/modelo_conceitual.jpg)

---

## Modelo Lógico

Tabelas, tipos, PKs, FKs e índices para PostgreSQL.

![Modelo Lógico](./modelo-logico/modelo_logico.png)

> Arquivo fonte editável: [modelo_abp.xml](./modelo-logico/modelo_abp.xml) (brModelo/draw.io)

---

## 🏗️ Tabelas Principais

| Tabela | Campos principais | Requisitos atendidos |
|--------|-------------------|----------------------|
| `usuarios` | `id_usuario`, `nome`, `email`, `cpf` (UNIQUE), `senha` (hash:salt), `certificado_hash` (UNIQUE) | RF01, RF02, RNF03 |
| `modulos` | `id_modulo`, `titulo` | RF03, RF04 |
| `questoes` | `id_questao`, `id_modulo`, `grupo`, `numero`, `dificuldade`, `enunciado`, `alternativa_correta`, alternativas A–D, `imagem` | RF03, RF04, RF05 |
| `exames` | `id_exame`, `id_modulo`, `id_usuario`, `grupo`, `tentativa` | RF06, RF10 |
| `respostas` | `id_resposta`, `id_exame`, `id_questao`, `nota`, `resposta`, `respondido_em` | RF07, RF10 |

> **Estado atual (Sprint 1):** 5 módulos e 150 questões carregados via seed.

---

## 📥 Schemas e Seeds

Os arquivos SQL ficam em `app/src/infra/init/` e são executados em ordem pelo `npm run db:init`.

Banco utilizado: **`abp`** (PostgreSQL 14+).

Veja detalhes em [02-SETUP.md → Banco de Dados](../../02-SETUP.md#banco-de-dados).

---

<div align="center">
  <a href="../../00-INDICE.md">← Voltar ao Índice</a>
</div>
