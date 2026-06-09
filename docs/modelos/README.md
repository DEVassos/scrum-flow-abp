# Modelos e Diagramas do Projeto

← [Índice da Documentação](../00-INDICE.md)

Este documento reúne a documentação visual e técnica do **Portal de Certificação em Metodologias Ágeis**. Os diagramas detalham como os requisitos do edital e do backlog da sprint serão contemplados e estruturados.

---

## 👥 1. Casos de Uso (Visão Geral)
**Arquivo:** `dcu_scrum.svg`

O diagrama fornece a visão holística das interações do Usuário e do Sistema de Gerenciamento com a plataforma.
*   O **Usuário** interage com fluxos vitais: Cadastrar (RF01), Logar com CPF (RF02), Avaliar Módulo (RF05) e Consultar Progresso (RF11).
*   O **Sistema de Gerenciamento** coordena fluxos ocultos de regra de negócio (back-end): Selecionar e Classificar questões (RF03, RF04), Limitar tentativas (RF06), Atribuir maior nota e calcular média (RF07, RF08), Manter histórico (RF10) e Emitir certificado (RF09). Essa separação reforça que toda lógica sensível fica isolada no servidor (RNF04). 
*   O diagrama também prevê a extensão de Aprimorar informações (RF12).

![Diagrama de Casos de Uso](uml/casos-de-uso/dcu_scrum.svg)

---

## 🔄 2. Diagramas de Classes e Sequência (Mapeamento por Requisito)

Para garantir a rastreabilidade, cada Requisito Funcional (RF) do sistema foi modelado tanto do ponto de vista estrutural (Diagrama de Classes - dc) quanto comportamental (Diagrama de Sequência - ds).

### RF01 - Cadastro de Usuário e RF02 - Login
**Classes:** `RF01_dc_cadastro.svg`, `RF02_dc_login.svg` | **Sequência:** `RF01_ds_cadastro.svg`, `RF02_ds_login.svg`  
**Descrição:** O pacote de classes `cad_user` abstrai as propriedades (CPF, Nome, e-mail, senha) e métodos (`cadastrar()`, `logar()`). A sequência demonstra a validação que restringe o login exclusivamente por CPF e senha (RF02) e assegura que o back-end processe esses dados (RP04).
*RF01:*
![DC Cadastro](uml/classes/RF01_dc_cadastro.svg)
![DS Cadastro](uml/sequencia/RF01_ds_cadastro.svg)
*RF02:*
![DC Login](uml/classes/RF02_dc_login.svg)
![DS Login](uml/sequencia/RF02_ds_login.svg)

### RF03 - Seleção Aleatória e RF04 - Classificação de Questões
**Classes:** `RF03_dc_questoes.svg`, `RF04_dc_classificar.svg` | **Sequência:** `RF03_ds_selecionar.svg`, `RF04_ds_classificar.svg`  
**Descrição:** A classe `cad_questoes` expõe os métodos de negócio para embaralhar e agrupar perguntas. A sequência ilustra o Sistema de Gerenciamento acionando o método para pinçar 10 questões de um pool de 30 (RF03), e aplicando as tags fácil, médio ou difícil (RF04).
*RF03:*
![DC Questões](uml/classes/RF03_dc_questoes.svg)
![DS Selecionar](uml/sequencia/RF03_ds_selecionar.svg)
*RF04:*
![DC Classificar](uml/classes/RF04_dc_classificar.svg)
![DS Classificar](uml/sequencia/RF04_ds_classificar.svg)

### RF05 - Composição da Avaliação e RF06 - Limite de Tentativas
**Classes:** `RF05_dc_avaliar.svg`, `RF06_dc_tentativa.svg` | **Sequência:** `RF05_ds_avaliar.svg`, `RF06_ds_tentativa.svg`  
**Descrição:** Nestes fluxos, a entidade intermedeia a geração da prova. A sequência apresenta a interface chamando a composição estrita de 3 Fáceis, 4 Médias e 3 Difíceis (RF05) e consolidando as respostas. O fluxo do RF06 enfatiza o método `limitar_tentativa()` barrando o acesso caso o limite máximo de 2 tentativas por módulo tenha sido atingido (RF06).
*RF05:*
![DC Avaliar](uml/classes/RF05_dc_avaliar.svg)
![DS Avaliar](uml/sequencia/RF05_ds_avaliar.svg)
*RF06:*
![DC Tentativa](uml/classes/RF06_dc_tentativa.svg)
![DS Tentativa](uml/sequencia/RF06_ds_tentativa.svg)

### RF07 - Maior Nota e RF08 - Média Final
**Classes:** `RF07_dc_nota.svg`, `RF08_dc_media.svg` | **Sequência:** `RF07_ds_nota.svg`, `RF08_ds_media.svg`  
**Descrição:** A lógica de cálculo é detalhada aqui. O sistema invoca `atribuir_maior_nota()` para selecionar o melhor desempenho entre as duas tentativas permitidas (RF07). Em seguida, a classe `cad_media_final` é acionada (`RF08_ds_media.svg`) para calcular a média global do usuário e verificar sua aprovação (RF08).
*RF07:*
![DC Nota](uml/classes/RF07_dc_nota.svg)
![DS Nota](uml/sequencia/RF07_ds_nota.svg)
*RF08:*
![DC Média](uml/classes/RF08_dc_media.svg)
![DS Média](uml/sequencia/RF08_ds_media.svg)

### RF09 - Emissão de Certificado
**Classes:** `RF09_dc_certificado.svg` | **Sequência:** `RF09_ds_certificado.svg`  
**Descrição:** A classe de usuário comunica-se com a `cad_media_final` para obter a nota validada. A sequência demonstra a compilação dos dados (Nome, CPF, média) gerando o certificado apenas para usuários que completaram todos os módulos e foram aprovados (RF09).
![DC Certificado](uml/classes/RF09_dc_certificado.svg)
![DS Certificado](uml/sequencia/RF09_ds_certificado.svg)

### RF10 - Histórico e RF11 - Progresso
**Classes:** `RF10_dc_historico.svg`, `RF11_dc_progresso.svg` | **Sequência:** `RF10_ds_historico.svg`, `RF11_ds_progresso.svg`  
**Descrição:** Para garantir a transparência do usuário na plataforma (US08). A classe de avaliação disponibiliza o método `exibir_historico()`, que traz as questões sorteadas e as datas no `RF10_ds_historico.svg`. O progresso geral (módulos concluídos e pendentes) é orquestrado na sequência do RF11.
*RF10:*
![DC Histórico](uml/classes/RF10_dc_historico.svg)
![DS Histórico](uml/sequencia/RF10_ds_historico.svg)
*RF11:*
![DC Progresso](uml/classes/RF11_dc_progresso.svg)
![DS Progresso](uml/sequencia/RF11_ds_progresso.svg)

### RF12 - Área Administrativa (Requisito Opcional)
**Classes:** `RF12_dc_aprimorar.svg` | **Sequência:** `RF12_ds_aprimorar.svg`  
**Descrição:** Estende a funcionalidade do sistema. A classe `cad_questoes` e o fluxo sequencial detalham o administrador utilizando métodos como `cadastrar_questao()` e `atualizar_questao()`, garantindo a manutenção do banco de 30 questões sem a necessidade de intervenção direta via scripts de BD (US09).
![DC Aprimorar](uml/classes/RF12_dc_aprimorar.svg)
![DS Aprimorar](uml/sequencia/RF12_ds_aprimorar.svg)

---

## 💾 3. Modelagem de Banco de Dados

Em conformidade com a restrição **RP02**, o banco de dados foi modelado exclusivamente para PostgreSQL, utilizando DDL e DML explícitos (sem uso de ORMs). Toda a persistência, como usuários, módulos, questões e resultados (RP04), é suportada pelos modelos abaixo.

### 3.1 Modelo Conceitual (DER)
**Arquivo:** `modelo_conceitual.jpg`  
**Descrição e Confronto:** O Modelo Conceitual ilustra as entidades principais do domínio da aplicação e seus relacionamentos:
*   **usuário:** Centraliza os dados de acesso (CPF, nome, email, senha), atendendo diretamente ao RF01 e às regras da LGPD (RNF03).
*   **tentativa e resultado:** Relacionam-se ao usuário e ao módulo para armazenar o histórico de avaliações (pontuação, timestamp), garantindo o rastreio exigido pelo RF10 e o cálculo da maior nota (RF07) e média final (RF08).
*   **módulo, questao e alternativa:** Estruturam o banco de perguntas. A relação indica que um módulo possui várias questões, e estas possuem alternativas, suportando o controle de dificuldades exigido pelo RF04.

![Modelo Conceitual](bd/modelo-conceitual/modelo_conceitual.jpg)

### 3.2 Modelo Lógico
**Arquivo:** `modelo_logico.png`  
**Descrição e Confronto:** O Modelo Lógico traduz a visão conceitual para o formato relacional:
*   **Tabelas Principais:** `usuarios`, `modulos`, `exames` (avaliações iniciadas), `questoes` e `respostas`.
*   **Regras Embutidas:** O vínculo das Chaves Estrangeiras (FKs) entre `respostas` e `questoes` permite registrar a alternativa marcada (`alternativa_marcada`) e verificar se está correta (`correta: BOOL`), atendendo à necessidade do back-end auditar o histórico e calcular as notas com segurança para evitar fraudes (RNF04, RP04).

![Modelo Lógico](bd/modelo-logico/modelo_logico.png)

---

<div align="center">
  <a href="../00-INDICE.md">← Voltar ao Índice</a>
</div>
