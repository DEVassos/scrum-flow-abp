# 📐 Diagramas UML

← [Índice da Documentação](../../README.md) · [Modelos](../README.md)

Diagramas que mapeiam cada Requisito Funcional (RF) em estrutura (Classes) e comportamento (Sequência).

> Definição completa dos RF: [Edital](../../edital/desafio-1dsm-2026-1.md) (fonte única) · siglas no [Glossário](../../GLOSSARIO.md).

---

## Diagrama de Casos de Uso

Visão holística das interações entre Usuário e Sistema.

![Diagrama de Casos de Uso](./casos-de-uso/dcu_scrum.svg)

---

## 📋 Mapa por Requisito

> Clique em qualquer imagem para ampliá-la. Para descrições detalhadas, veja [modelos/README.md](../README.md).

| RF | Descrição | Classes | Sequência |
|----|-----------|---------|-----------|
| RF01 | Cadastro de Usuário | ![dc](./classes/RF01_dc_cadastro.svg) | ![ds](./sequencia/RF01_ds_cadastro.svg) |
| RF02 | Login (CPF + senha) | ![dc](./classes/RF02_dc_login.svg) | ![ds](./sequencia/RF02_ds_login.svg) |
| RF03 | Sorteio de questões | ![dc](./classes/RF03_dc_questoes.svg) | ![ds](./sequencia/RF03_ds_selecionar.svg) |
| RF04 | Classificação por dificuldade | ![dc](./classes/RF04_dc_classificar.svg) | ![ds](./sequencia/RF04_ds_classificar.svg) |
| RF05 | Composição da prova (3+4+3) | ![dc](./classes/RF05_dc_avaliar.svg) | ![ds](./sequencia/RF05_ds_avaliar.svg) |
| RF06 | Limite de 2 tentativas | ![dc](./classes/RF06_dc_tentativa.svg) | ![ds](./sequencia/RF06_ds_tentativa.svg) |
| RF07 | Maior nota entre tentativas | ![dc](./classes/RF07_dc_nota.svg) | ![ds](./sequencia/RF07_ds_nota.svg) |
| RF08 | Média final | ![dc](./classes/RF08_dc_media.svg) | ![ds](./sequencia/RF08_ds_media.svg) |
| RF09 | Certificado digital | ![dc](./classes/RF09_dc_certificado.svg) | ![ds](./sequencia/RF09_ds_certificado.svg) |
| RF10 | Histórico de tentativas | ![dc](./classes/RF10_dc_historico.svg) | ![ds](./sequencia/RF10_ds_historico.svg) |
| RF11 | Consulta de progresso | ![dc](./classes/RF11_dc_progresso.svg) | ![ds](./sequencia/RF11_ds_progresso.svg) |
| RF12 | Área administrativa (opcional) | ![dc](./classes/RF12_dc_aprimorar.svg) | ![ds](./sequencia/RF12_ds_aprimorar.svg) |

---

## 🛠️ Editar os Diagramas

Arquivo fonte: [ABP Scrum.asta](./ABP%20Scrum.asta) (Astah Community).

---

<div align="center">
  <a href="../../README.md">← Voltar ao Índice</a>
</div>