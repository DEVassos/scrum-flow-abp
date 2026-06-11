# ScrumFlow — Manual de Identidade Visual

← [Índice da Documentação](../README.md)

**Versão 1.0 · Sprint 1 · ABP 2026-1 · FATEC Jacareí**

> 📄 **Fonte de verdade:** este `.md` é a versão canônica e versionada. Os arquivos [`.docx`](./identidade-visual-scrumflow.docx) e [`.pdf`](./identidade-visual-scrumflow.pdf) são cópias de distribuição/impressão e podem ficar desatualizadas — em caso de divergência, vale o `.md`.

---

## A Marca em 1 Página

> Resumo rápido para consulta. O detalhamento completo (regras, usos indevidos e CSS) vem nas seções seguintes.

**Conceito:** *Scrum* (estrutura) + *Flow* (fluxo/imersão). Tema **dark**, alinhado à indústria de TI. Valores: profissionalismo, confiança, ação, clareza, modernidade.

**Cores principais:**

| Cor | Hex | Uso |
|---|---|---|
| 🟦 Navy 900 | `#0A1628` | Fundo principal |
| 🟦 Navy 800 | `#0F2044` | Cards, modais |
| 🟧 Amber 500 | `#F59E0B` | Botões/CTA, destaques, links ativos |
| 🟩 Teal 500 | `#0D9488` | Sucesso / concluído |
| 🟥 Red 500 | `#EF4444` | Erro / tentativa esgotada |
| ⬜ White | `#FFFFFF` | Texto sobre fundo escuro |

**Tipografia:** **Jomhuria** (logo) · **Poppins** (títulos e botões) · **Inter** (texto e inputs).

**Logo:** nome em Jomhuria, com o "S" em Amber 500. Versão clara (Navy `#0A1628` sobre branco) para impressão de certificados.

---

## Sumário

1. [Introdução](#1-introdução)
2. [A Marca — Conceito](#2-a-marca--conceito)
3. [Logo — Construção e Versões](#3-logo--construção-e-versões)
4. [Área de Proteção e Tamanho Mínimo](#4-área-de-proteção-e-tamanho-mínimo)
5. [Sistema de Cores](#5-sistema-de-cores)
6. [Tipografia](#6-tipografia)
7. [Espaçamento e Tokens de Design](#7-espaçamento-e-tokens-de-design)
8. [Componentes e Estados](#8-componentes-e-estados)
9. [Iconografia](#9-iconografia)
10. [Aplicação em Fundos Variados](#10-aplicação-em-fundos-variados)
11. [Usos Indevidos](#11-usos-indevidos)
12. [Implementação CSS](#12-implementação-css)
13. [Referências](#13-referências)

---

## 1. Introdução

Este manual apresenta, documenta e normatiza a identidade visual do **ScrumFlow**, plataforma de certificação em metodologias ágeis desenvolvida pelo grupo da turma de Desenvolvimento de Software Multiplataforma da FATEC Jacareí como projeto ABP do semestre 2026-1.

É fundamental que todos os integrantes do time respeitem os critérios estabelecidos aqui em todas as telas, componentes e materiais produzidos, mantendo padronização, legibilidade, contraste e coerência visual ao longo de todo o desenvolvimento.

---

## 2. A Marca — Conceito

### O que é o ScrumFlow

O ScrumFlow é uma plataforma educacional voltada para a certificação de estudantes e profissionais em metodologias ágeis, com foco em Scrum. O nome une dois conceitos: **Scrum** (a metodologia) e **Flow** (fluxo contínuo, estado de imersão e produtividade). A identidade visual deve comunicar esse equilíbrio entre estrutura e movimento.

### Valores da marca

| Valor | Como se traduz visualmente |
|-------|---------------------------|
| Profissionalismo | Paleta escura, tipografia limpa e estruturada |
| Confiança | Azul marinho como cor dominante |
| Ação | Âmbar vibrante para elementos interativos |
| Clareza | Hierarquia tipográfica bem definida |
| Modernidade | Tema dark, alinhado às práticas da indústria de TI |

### Decisão pelo tema dark

A identidade visual do ScrumFlow foi definida colaborativamente pelo time considerando que a plataforma está posicionada na área de Tecnologia da Informação. Interfaces escuras são amplamente adotadas na indústria de TI por reduzir fadiga visual, melhorar foco e transmitir profissionalismo. Plataformas de referência como TryHackMe, GitHub e VS Code reforçam essa escolha.

### Metodologia de seleção de cores

A composição cromática segue a harmonia de **cores complementares divididas (split-complementary)**, técnica que oferece contraste atraente mantendo coerência visual. A seleção foi feita com auxílio da [Adobe Color Wheel](https://color.adobe.com/pt/create/color-wheel). O **navy** foi escolhido como cor primária por transmitir confiabilidade e serenidade; o **âmbar** como cor de ação por criar contraste vibrante que orienta o olhar para elementos interativos.

---

## 3. Logo — Construção e Versões

### Nome da marca

O logotipo do ScrumFlow utiliza o nome escrito em **Jomhuria** (Display, peso 400), fonte com personalidade forte e traços que remetem a movimento e agilidade. A primeira letra **S** pode ser destacada em Amber 500 para reforçar o caráter de marca.

```
ScrumFlow
```

- Fonte: Jomhuria Regular (400)
- Tamanho de referência: 48px
- Cor padrão: `#FFFFFF` sobre fundo navy
- Cor do "S" de destaque: `#F59E0B` (Amber 500)
- Letter-spacing: 0

### Versões da marca

| Versão | Uso |
|--------|-----|
| **Completa** | Nome "ScrumFlow" + tagline opcional. Uso prioritário em cabeçalhos, splash screens e materiais institucionais. |
| **Reduzida** | Apenas as iniciais "SF" em Jomhuria. Para ícones de aplicativo, favicons e espaços reduzidos. |
| **Monocromática positiva** | Branco sobre fundo escuro. Uso em fundos navy ou dark. |
| **Monocromática negativa** | Dark (`#0A1628`) sobre fundo claro. Para impressão de certificados em papel. |

### O que NÃO é o logo

O logo é exclusivamente o nome tipográfico. Não existe símbolo ou ícone gráfico separado — a força da marca está na tipografia e nas cores. Qualquer elemento gráfico adicionado ao nome sem aprovação do time é considerado uso indevido.

---

## 4. Área de Proteção e Tamanho Mínimo

### Área de proteção

A área de proteção garante que nenhum elemento externo interfira na legibilidade da marca. O espaço mínimo ao redor do logotipo em todas as direções deve ser equivalente à **altura da letra "S"** do nome ScrumFlow (referência: 1x).

```
  ┌─────────────────────────────┐
  │   1x                        │
  │        ScrumFlow        1x  │
  │   1x                        │
  └─────────────────────────────┘
```

Nenhum texto, imagem, botão ou elemento decorativo pode invadir essa área.

### Tamanho mínimo

Para garantir a legibilidade da marca nas aplicações digitais e impressas:

| Mídia | Tamanho mínimo |
|-------|---------------|
| Digital (telas) | 120px de largura |
| Favicon / ícone | 32px × 32px (versão "SF") |
| Impressão (certificado) | 40mm de largura |

Abaixo desses valores, utilizar apenas as iniciais "SF".

---

## 5. Sistema de Cores

As cores foram definidas para uso em toda a interface, desde fundos e cards até textos, botões, badges e estados de feedback. Os valores abaixo devem ser respeitados rigorosamente — nunca criar variações ou tonalidades não listadas.

### 5.1 Cores Primárias — Navy

| Token | Nome | Hex | RGB | Uso |
|-------|------|-----|-----|-----|
| `--navy-900` | Navy 900 | `#0A1628` | 10, 22, 40 | Fundo principal das telas |
| `--navy-800` | Navy 800 | `#0F2044` | 15, 32, 68 | Fundo de cards, modais, painéis |
| `--navy-700` | Navy 700 | `#162B5C` | 22, 43, 92 | Hover, superfícies elevadas |
| `--navy-600` | Navy 600 | `#1E3A7A` | 30, 58, 122 | Bordas, separadores |
| `--navy-400` | Navy 400 | `#4A6FA5` | 74, 111, 165 | Texto desabilitado, ícones secundários |
| `--navy-200` | Navy 200 | `#A3B8D8` | 163, 184, 216 | Texto de suporte |
| `--navy-50`  | Navy 50  | `#EEF3FB` | 238, 243, 251 | Fundo claro (certificados, impressão) |

### 5.2 Cor de Ação — Amber

| Token | Nome | Hex | RGB | Uso |
|-------|------|-----|-----|-----|
| `--amber-600` | Amber 600 | `#D97706` | 217, 119, 6 | Hover de botões primários |
| `--amber-500` | Amber 500 | `#F59E0B` | 245, 158, 11 | Botões CTA, links ativos, destaques |
| `--amber-400` | Amber 400 | `#FBB824` | 251, 184, 36 | Badges, ícones de destaque |
| `--amber-100` | Amber 100 | `#FEF3C7` | 254, 243, 199 | Background de badges "em andamento" |

### 5.3 Cores de Apoio — Feedback e Estados

| Token | Nome | Hex | Uso |
|-------|------|-----|-----|
| `--teal-500` | Teal 500 | `#0D9488` | Sucesso, concluído, aprovação |
| `--teal-100` | Teal 100 | `#CCFBF1` | Background de status "concluído" |
| `--red-500`  | Red 500  | `#EF4444` | Erro, reprovação, tentativa esgotada |
| `--red-100`  | Red 100  | `#FEE2E2` | Background de status "falhou" |
| `--slate-600`| Slate 600| `#475569` | Labels de formulário |
| `--slate-400`| Slate 400| `#94A3B8` | Texto secundário, placeholders |
| `--white`    | White    | `#FFFFFF` | Texto principal sobre fundos escuros |

### 5.4 Hierarquia de uso das cores

```
Fundo base (Navy 900)
  └── Superfícies (Navy 800)
        └── Hover / elevação (Navy 700)
              └── Bordas (Navy 600)

Ações primárias → Amber 500
Hover de ações → Amber 600
Destaques secundários → Amber 400

Sucesso → Teal 500 / Teal 100
Erro → Red 500 / Red 100

Texto principal → White
Texto de suporte → Navy 200
Texto secundário → Slate 400
Texto desabilitado → Navy 400
```

---

## 6. Tipografia

### 6.1 Famílias tipográficas

| Papel | Família | Tipo | Justificativa |
|-------|---------|------|---------------|
| Logo | Jomhuria | Display | Personalidade forte, remete a movimento |
| Títulos e botões | Poppins | Sans-serif geométrica | Moderna, legível, assertiva |
| Texto corrido e inputs | Inter | Sans-serif neutra | Alta legibilidade em telas |

### 6.2 Importação (Google Fonts)

```css
@import url('https://fonts.googleapis.com/css2?family=Jomhuria&family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500&display=swap');
```

### 6.3 Escala tipográfica

| Papel | Família | Peso | Tamanho | Line-height | Uso |
|-------|---------|------|---------|-------------|-----|
| Logo | Jomhuria | 400 | 48px | 1 | Nome da marca no header |
| Título Hero | Poppins | 700 | 48px | 1.2 | Headline principal da home |
| Título de seção | Poppins | 700 | 32px | 1.2 | H2 de seções |
| Título de tela | Poppins | 600 | 24px | 1.3 | H3 de páginas internas |
| Subtítulo | Poppins | 500 | 16px | 1.5 | H4, introduções curtas |
| Label de campo | Poppins | 500 | 12px | 1.4 | Labels de formulário |
| Texto de input | Inter | 400 | 15px | 1.5 | Valor digitado nos campos |
| Botão | Poppins | 600 | 14px | 1 | Texto de todos os botões |
| Texto de card | Inter | 400 | 14px | 1.65 | Corpo de texto em cards |
| Badge | Poppins | 500 | 12px | 1 | Status, tags, rótulos |
| Rodapé | Inter | 400 | 12px | 1.5 | Informações secundárias |

### 6.4 Regras tipográficas

- **Nunca usar Jomhuria fora do logo.** Essa fonte é exclusiva da marca.
- **Nunca misturar Poppins e Inter no mesmo nível hierárquico.** Poppins é para títulos e ações; Inter é para leitura contínua.
- **Peso mínimo em telas escuras:** 400 (nunca usar Thin ou Light sobre navy escuro — perde legibilidade).
- **Nunca usar itálico** nos componentes da interface. Itálico só é permitido em citações dentro de textos longos.

---

## 7. Espaçamento e Tokens de Design

### 7.1 Escala de espaçamento

O sistema de espaçamento segue uma escala baseada em múltiplos de 4px:

| Token | Valor | Uso típico |
|-------|-------|------------|
| `--space-1` | 4px | Espaço interno mínimo, gap entre ícone e texto |
| `--space-2` | 8px | Padding interno de badges, gap pequeno |
| `--space-3` | 12px | Padding de inputs, gap entre elementos de form |
| `--space-4` | 16px | Padding padrão de cards e painéis |
| `--space-5` | 20px | Gap entre grupos de campos |
| `--space-6` | 24px | Gutter do grid, padding interno de modais |
| `--space-8` | 32px | Separação entre seções dentro de uma tela |
| `--space-10` | 40px | Margem entre seções maiores |
| `--space-12` | 48px | Padding de seções da home |
| `--space-16` | 64px | Separação entre blocos principais |

### 7.2 Border-radius

| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-sm` | 4px | Badges, tags pequenas |
| `--radius-md` | 8px | Inputs, botões |
| `--radius-lg` | 12px | Cards, painéis |
| `--radius-xl` | 16px | Modais |
| `--radius-full` | 9999px | Avatares, botões pill |

### 7.3 Sombras

| Token | Valor CSS | Uso |
|-------|-----------|-----|
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.3)` | Cards em repouso |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.4)` | Cards com hover |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.5)` | Modais, dropdowns |
| `--shadow-amber` | `0 0 12px rgba(245,158,11,0.3)` | Botão primário em foco |

### 7.4 Layout e Grid

| Parâmetro | Valor |
|-----------|-------|
| Frame de referência | 1440 × 900 px |
| Largura máxima do conteúdo | 1280px |
| Margens laterais | 80px |
| Colunas | 12 |
| Gutter | 24px |

| Tela | Estrutura | Largura |
|------|-----------|---------|
| Home | Seções centralizadas | max 1200px |
| Modal Login | Lateral direito | 480px fixo |
| Modal Cadastro | Lateral direito | 480px fixo |
| Página de questão | Centralizado | max 800px |
| Dashboard | Sidebar + conteúdo | 260px + restante |

---

## 8. Componentes e Estados

Esta seção define como os componentes visuais se comportam em cada estado. Todo componente deve implementar **todos** os estados listados.

### 8.1 Botão Primário

| Estado | Background | Texto | Borda | Sombra |
|--------|-----------|-------|-------|--------|
| Default | Amber 500 (`#F59E0B`) | Navy 900 | nenhuma | nenhuma |
| Hover | Amber 600 (`#D97706`) | Navy 900 | nenhuma | `--shadow-amber` |
| Focus | Amber 500 | Navy 900 | 2px Amber 400 | `--shadow-amber` |
| Active (clicando) | Amber 600 | Navy 900 | nenhuma | nenhuma |
| Disabled | Navy 700 (`#162B5C`) | Navy 400 | nenhuma | nenhuma |
| Loading | Amber 500 (50% opacidade) | — | nenhuma | nenhuma |

### 8.2 Botão Secundário (Ghost)

| Estado | Background | Texto | Borda |
|--------|-----------|-------|-------|
| Default | transparente | Amber 500 | 1px Amber 500 |
| Hover | Amber 500 (10% opacidade) | Amber 400 | 1px Amber 400 |
| Disabled | transparente | Navy 400 | 1px Navy 600 |

### 8.3 Input / Campo de formulário

| Estado | Background | Borda | Texto | Label |
|--------|-----------|-------|-------|-------|
| Default | Navy 800 | 1px Navy 600 | White | Slate 600 |
| Focus | Navy 800 | 1px Amber 500 | White | Amber 500 |
| Preenchido | Navy 800 | 1px Navy 600 | White | Slate 600 |
| Erro | Navy 800 | 1px Red 500 | White | Red 500 |
| Disabled | Navy 900 | 1px Navy 700 | Navy 400 | Navy 400 |

### 8.4 Card

| Estado | Background | Borda | Sombra |
|--------|-----------|-------|--------|
| Default | Navy 800 | 1px Navy 600 | `--shadow-sm` |
| Hover | Navy 700 | 1px Navy 600 | `--shadow-md` |
| Selecionado | Navy 700 | 1px Amber 500 | `--shadow-amber` |

### 8.5 Badge de status

| Status | Background | Texto | Uso |
|--------|-----------|-------|-----|
| Em andamento | Amber 100 | Amber 600 | Módulo em progresso |
| Concluído | Teal 100 | Teal 500 | Módulo aprovado |
| Falhou | Red 100 | Red 500 | Tentativa reprovada |
| Bloqueado | Navy 800 | Navy 400 | Módulo não liberado |

---

## 9. Iconografia

### Biblioteca adotada

O ScrumFlow utiliza exclusivamente ícones da biblioteca **[Lucide Icons](https://lucide.dev/)** (open source, MIT License). Esta biblioteca foi escolhida por ser limpa, consistente e amplamente usada em projetos de TI.

### Regras de uso

- **Tamanho padrão:** 20px × 20px em componentes de interface (botões, inputs, menus).
- **Tamanho secundário:** 16px × 16px para uso inline em textos.
- **Tamanho de destaque:** 32px × 32px para ícones decorativos em cards grandes.
- **Cor:** sempre usar a variável CSS do contexto (nunca hardcodar cor diretamente no SVG).
- **Stroke width:** 1.5px (padrão Lucide — não alterar).
- **Nunca usar ícones preenchidos (filled)** — o ScrumFlow usa apenas a versão outline do Lucide.
- **Nunca misturar ícones de bibliotecas diferentes** no mesmo projeto.

### Ícones principais definidos

| Ícone Lucide | Uso no ScrumFlow |
|-------------|-----------------|
| `trophy` | Certificado, conquista |
| `layers` | Níveis de certificação |
| `check-circle` | Questão correta, módulo aprovado |
| `x-circle` | Questão errada, tentativa falhou |
| `lock` | Módulo bloqueado |
| `unlock` | Módulo liberado |
| `clock` | Tempo restante de exame |
| `user` | Perfil do usuário |
| `log-out` | Sair do sistema |
| `chevron-right` | Navegação, próximo |
| `arrow-left` | Voltar |
| `alert-triangle` | Aviso, atenção |

---

## 10. Aplicação em Fundos Variados

### 10.1 Fundo escuro (padrão do sistema)

Uso prioritário. Logo e textos em branco. Botões primários em Amber 500.

### 10.2 Fundo claro (certificados e impressão)

Utilizar `--navy-50` (`#EEF3FB`) como fundo. Logo em versão monocromática negativa (Navy 900). Textos em Navy 900. Nunca usar o tema dark em certificados — prejudica a impressão.

### 10.3 Fundo fotográfico

Permitido apenas em seções hero da home. A foto deve ter um overlay escuro (`rgba(10, 22, 40, 0.75)`) antes de aplicar o logo ou texto. Nunca aplicar logo diretamente sobre foto sem overlay.

---

## 11. Usos Indevidos

As situações abaixo são **proibidas** e nunca devem aparecer em nenhuma tela, documento ou material do ScrumFlow:

| Proibido | Por quê |
|----------|---------|
| Trocar Amber 500 por outra cor amarela "parecida" | Quebra a consistência da paleta |
| Usar Jomhuria fora do logo | Fonte exclusiva da marca |
| Aplicar gradiente no logo | Compromete legibilidade e identidade |
| Rotacionar o nome da marca | Prejudica leitura |
| Usar sombra de texto no logo | Poluição visual |
| Usar o logo em tamanho menor que o mínimo definido | Perde legibilidade |
| Adicionar outline ou contorno ao logo | Não faz parte da especificação |
| Usar cores fora da paleta | Quebra a coerência visual |
| Misturar ícones de bibliotecas diferentes | Inconsistência visual |
| Usar pesos tipográficos fora da escala definida | Quebra a hierarquia |
| Aplicar o logo sobre fundo sem contraste suficiente | Prejudica legibilidade |
| Usar Inter para títulos ou Poppins para corpo de texto longo | Inverte a hierarquia tipográfica |

---

## 12. Implementação CSS

### 12.1 Estrutura de arquivos

```
public/
  assets/
    css/
      variables.css   ← tokens de design (cores, tipografia, espaçamento)
      reset.css       ← reset e box-sizing global
      components.css  ← botões, inputs, cards, badges, modais
      layout.css      ← grid, header, sidebar, containers
      pages.css       ← estilos específicos de cada página
      main.css        ← apenas @imports dos arquivos acima
```

### 12.2 Arquivo variables.css

```css
:root {
  /* === CORES — NAVY === */
  --navy-900: #0A1628;
  --navy-800: #0F2044;
  --navy-700: #162B5C;
  --navy-600: #1E3A7A;
  --navy-400: #4A6FA5;
  --navy-200: #A3B8D8;
  --navy-50:  #EEF3FB;

  /* === CORES — AMBER === */
  --amber-600: #D97706;
  --amber-500: #F59E0B;
  --amber-400: #FBB824;
  --amber-100: #FEF3C7;

  /* === CORES — APOIO === */
  --teal-500:  #0D9488;
  --teal-100:  #CCFBF1;
  --red-500:   #EF4444;
  --red-100:   #FEE2E2;
  --slate-600: #475569;
  --slate-400: #94A3B8;
  --white:     #FFFFFF;

  /* === TIPOGRAFIA === */
  --font-display: 'Jomhuria', cursive;
  --font-title:   'Poppins', sans-serif;
  --font-body:    'Inter', sans-serif;

  /* === ESPAÇAMENTO === */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;

  /* === BORDER-RADIUS === */
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   12px;
  --radius-xl:   16px;
  --radius-full: 9999px;

  /* === SOMBRAS === */
  --shadow-sm:    0 1px 3px rgba(0,0,0,0.3);
  --shadow-md:    0 4px 12px rgba(0,0,0,0.4);
  --shadow-lg:    0 8px 24px rgba(0,0,0,0.5);
  --shadow-amber: 0 0 12px rgba(245,158,11,0.3);
}
```

### 12.3 main.css

```css
@import url('https://fonts.googleapis.com/css2?family=Jomhuria&family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500&display=swap');

@import 'variables.css';
@import 'reset.css';
@import 'components.css';
@import 'layout.css';
@import 'pages.css';
```

---

## 13. Referências

Durante a concepção da identidade visual do ScrumFlow, o time consultou as seguintes plataformas como referência de design, experiência de usuário e paleta de cores:

1. **Codefinity** — [https://codefinity.com/](https://codefinity.com/)
   Referência para layouts responsivos e elementos visuais dinâmicos em plataformas de ensino de programação.

2. **Cisco Networking Academy (NetAcad)** — [https://www.netacad.com/](https://www.netacad.com/)
   Referência para design profissional e estruturação de conteúdo educacional em ambiente de TI.

3. **TryHackMe** — [https://tryhackme.com/](https://tryhackme.com/)
   Referência principal para tema dark, gamificação e progressão visual em plataformas de aprendizado técnico.

4. **Adobe Color Wheel** — [https://color.adobe.com/pt/create/color-wheel](https://color.adobe.com/pt/create/color-wheel)
   Ferramenta utilizada para validar a harmonia split-complementary da paleta de cores.

5. **Lucide Icons** — [https://lucide.dev/](https://lucide.dev/)
   Biblioteca de ícones adotada pelo projeto.

---

*ScrumFlow — Manual de Identidade Visual v1.0*
*ABP 2026-1 · FATEC Jacareí · Sprint 1*

---

<div align="center">
  <a href="../README.md">← Voltar ao Índice</a>
</div>