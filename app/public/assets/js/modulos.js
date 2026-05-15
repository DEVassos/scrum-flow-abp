// ================================
//   MODULOS.JS - ScrumFlow
// ================================

if (!estaAutenticado()) {
  window.location.href = "index.html";
}

const MODULOS_CONTEUDO = {
  1: {
    tituloCurto: "Módulo 1",
    foco: "A origem da agilidade e a mudança de mentalidade.",
    conteudo: `
<section class="conteudo-secao">
  <h3>1.1 A Crise do Software e o Contexto Histórico</h3>
  <p>Nas décadas de 1960 e 1970, a indústria de tecnologia enfrentou um fenômeno chamado de <strong>"crise do software"</strong>. Projetos eram entregues com anos de atraso, custavam muito mais do que o previsto e frequentemente não atendiam às necessidades reais dos usuários.</p>
  <p>O principal problema não era técnico — era a <strong>dificuldade em lidar com mudanças frequentes de requisitos</strong> ao longo do desenvolvimento. Os modelos tradicionais da época, como o modelo em Cascata, exigiam que todos os requisitos fossem definidos e congelados antes do início da codificação. Quando o cliente mudava de ideia, o custo de adaptação era proibitivo.</p>
  <div class="conteudo-callout">
    <strong>Ponto-chave para a prova:</strong> A crise do software está fortemente associada à <em>dificuldade em lidar com mudanças frequentes de requisitos</em>, não à falta de hardware, linguagens de programação ou padronização de bancos de dados.
  </div>
</section>

<section class="conteudo-secao">
  <h3>1.2 O Manifesto Ágil</h3>
  <p>Em fevereiro de <strong>2001</strong>, dezessete desenvolvedores experientes se reuniram em Snowbird, Utah (EUA), e publicaram o <em>Manifesto para o Desenvolvimento Ágil de Software</em>. O documento estabelece uma filosofia baseada em <strong>quatro valores</strong> e <strong>doze princípios</strong>.</p>
  <h4>Os Quatro Valores</h4>
  <p>O Manifesto declara que, embora haja valor nos itens à direita, valoriza-se <em>mais</em> os itens à esquerda. Os itens da direita <strong>não são abandonados</strong> — são colocados em segundo plano quando há conflito de prioridade.</p>
  <table class="conteudo-tabela">
    <thead><tr><th>Prioridade maior</th><th>Prioridade menor</th></tr></thead>
    <tbody>
      <tr><td>Indivíduos e interações</td><td>Processos e ferramentas</td></tr>
      <tr><td>Software funcionando</td><td>Documentação abrangente</td></tr>
      <tr><td>Colaboração com o cliente</td><td>Negociação de contratos</td></tr>
      <tr><td>Responder a mudanças</td><td>Seguir um plano</td></tr>
    </tbody>
  </table>
  <div class="conteudo-callout">
    <strong>Interpretação correta:</strong> O Manifesto não elimina documentação, contratos ou planos. A agilidade foca na priorização de interações e entrega de valor, <em>sem ignorar</em> os itens da direita. O sucesso não depende <em>exclusivamente</em> das pessoas — os demais itens continuam tendo valor.
  </div>
  <h4>Os Doze Princípios</h4>
  <p>O Manifesto Ágil possui exatamente <strong>12 princípios</strong> (não 4, 8 ou 10). Os mais cobrados em provas são:</p>
  <ol>
    <li>A maior prioridade é satisfazer o cliente por meio de entrega contínua e adiantada de software com valor.</li>
    <li>Mudanças de requisitos são <strong>bem-vindas</strong>, mesmo tardiamente — são oportunidades de vantagem competitiva.</li>
    <li>Entregar software funcionando com <strong>frequência</strong>, de preferência em intervalos menores.</li>
    <li>A principal medida de progresso é o <strong>software funcionando e entregando valor</strong> — não cronogramas, documentações ou reuniões.</li>
    <li>Atenção contínua à excelência técnica e ao bom design aumenta a agilidade.</li>
    <li>Em intervalos regulares, a equipe <strong>reflete</strong> sobre como se tornar mais eficaz e ajusta seu comportamento — princípio da melhoria contínua, operacionalizado pelas retrospectivas.</li>
  </ol>
</section>

<section class="conteudo-secao">
  <h3>1.3 Conceitos Centrais das Metodologias Ágeis</h3>
  <h4>Iteração</h4>
  <p>Uma <strong>iteração</strong> é um ciclo curto e repetível — geralmente de uma a quatro semanas — ao final do qual a equipe entrega uma parte funcional do produto. É um micro-ciclo completo que inclui planejamento, desenvolvimento, teste e revisão.</p>
  <h4>Entregas Incrementais e Frequentes</h4>
  <p>As metodologias ágeis promovem <strong>entregas frequentes e incrementais</strong>. O principal benefício direto dessa prática é a <strong>redução de riscos ao longo do projeto</strong>.</p>
  <h4>Feedback Contínuo</h4>
  <p>O feedback frequente do cliente é a base do ajuste de direção. Entregar software com frequência <strong>sem coletar e incorporar feedback</strong> contraria diretamente o princípio de colaboração com o cliente.</p>
  <h4>Equipes Auto-Organizadas</h4>
  <p>Equipes auto-organizadas possuem <strong>autonomia para decidir como executar o trabalho</strong>. A gerência define <em>o quê</em>; a equipe auto-organizada define <em>o como</em>.</p>
  <h4>Melhoria Contínua</h4>
  <p>A melhoria contínua está relacionada à prática de <strong>refletir regularmente sobre a forma de trabalhar</strong>. Em Scrum, isso acontece formalmente na Sprint Retrospective.</p>
  <h4>Mudanças como Oportunidade</h4>
  <p>As metodologias ágeis tratam mudanças de requisitos como <strong>oportunidades de agregar valor</strong>. Uma equipe que evita qualquer mudança após o início do projeto demonstra uma <strong>interpretação incorreta da agilidade</strong>.</p>
  <h4>Valor ao Cliente</h4>
  <p>O conceito de "valor" está relacionado à <strong>utilidade percebida pelo cliente</strong> — não à quantidade de código produzida, à complexidade técnica ou ao tamanho da equipe.</p>
</section>

<section class="conteudo-secao">
  <h3>1.4 Métodos Ágeis vs. Métodos Tradicionais</h3>
  <p>A principal diferença conceitual entre métodos tradicionais e ágeis está na <strong>abordagem sobre pessoas, mudanças e entregas</strong> — não apenas no uso de ferramentas ou na forma de organizar equipes.</p>
  <table class="conteudo-tabela">
    <thead><tr><th>Aspecto</th><th>Métodos Tradicionais (ex: Cascata)</th><th>Métodos Ágeis</th></tr></thead>
    <tbody>
      <tr><td>Entregas</td><td>Única, ao final do projeto</td><td>Frequentes e incrementais</td></tr>
      <tr><td>Mudanças de requisito</td><td>Evitadas; custo alto</td><td>Bem-vindas; são oportunidades</td></tr>
      <tr><td>Documentação</td><td>Extensa, antes da codificação</td><td>Necessária, mas não prioritária</td></tr>
      <tr><td>Envolvimento do cliente</td><td>No início e no final</td><td>Contínuo, ao longo do projeto</td></tr>
      <tr><td>Fases</td><td>Rígidas e sequenciais</td><td>Iterativas e sobrepostas</td></tr>
      <tr><td>Medida de progresso</td><td>Cumprimento do cronograma</td><td>Software funcionando com valor</td></tr>
    </tbody>
  </table>
</section>

<section class="conteudo-secao">
  <h3>1.5 Exemplos de Metodologias Ágeis</h3>
  <p>As principais metodologias ágeis são <strong>Scrum, Kanban e XP (Extreme Programming)</strong>. Modelos como Cascata, RUP, Espiral e V-Model são considerados tradicionais — não ágeis.</p>
  <ul>
    <li><strong>Scrum:</strong> framework iterativo com papéis, eventos e artefatos definidos. Foco em gerenciar produtos complexos com entregas em Sprints.</li>
    <li><strong>Kanban:</strong> método de fluxo contínuo baseado em visualização do trabalho e limitação do WIP (Work in Progress).</li>
    <li><strong>XP (Extreme Programming):</strong> conjunto de práticas técnicas de engenharia — TDD, programação em par, integração contínua, refatoração.</li>
  </ul>
</section>
    `,
  },
  2: {
    tituloCurto: "Módulo 2",
    foco: "As responsabilidades e os artefatos que geram transparência no Scrum.",
    conteudo: `
<section class="conteudo-secao">
  <h3>2.1 O que é o Scrum?</h3>
  <p>O Scrum é um <strong>framework leve para gerenciamento e desenvolvimento de produtos complexos</strong>. Não é uma metodologia prescritiva com etapas fixas, nem uma ferramenta de controle de tarefas. É um conjunto mínimo de regras que cria um ambiente para equipes trabalharem de forma empírica e adaptativa.</p>
  <p>O Scrum é baseado no conceito de <strong>empirismo</strong>: o conhecimento vem da experiência, das inspeções frequentes e da adaptação com base nos resultados observados. Decisões são tomadas com base no que é conhecido, não em especulação.</p>
</section>

<section class="conteudo-secao">
  <h3>2.2 Os Três Pilares do Empirismo</h3>
  <ul>
    <li><strong>Transparência:</strong> o processo e o trabalho devem ser visíveis para todos os envolvidos. Sem transparência, inspeção e adaptação são impossíveis.</li>
    <li><strong>Inspeção:</strong> os artefatos e o progresso devem ser inspecionados frequentemente para detectar variações indesejadas.</li>
    <li><strong>Adaptação:</strong> se a inspeção revela que algo está fora dos limites aceitáveis, o processo deve ser ajustado.</li>
  </ul>
  <div class="conteudo-callout">
    <strong>Ponto-chave para a prova:</strong> Quando uma equipe altera a Definition of Done durante uma Sprint sem alinhamento, isso viola o pilar da <em>transparência</em>.
  </div>
</section>

<section class="conteudo-secao">
  <h3>2.3 Os Três Papéis (Accountabilities)</h3>
  <p>O Scrum Guide 2020 substituiu o termo <em>roles</em> por <strong>accountabilities</strong> (responsabilidades) para enfatizar que são responsabilidades claras, não cargos hierárquicos. São exatamente três: <strong>Product Owner, Scrum Master e Developers</strong>.</p>
  <h4>Product Owner (PO)</h4>
  <p>O Product Owner é responsável por <strong>maximizar o valor do produto resultante do trabalho do time</strong>. Para isso, gerencia e ordena o Product Backlog, comunica a visão do produto e garante que o time entenda os itens com clareza suficiente para trabalhar neles.</p>
  <p>O PO <em>não</em> é responsável por garantir que o Scrum seja seguido — isso é papel do Scrum Master. Somente o PO pode <strong>cancelar uma Sprint</strong>, quando o Sprint Goal se torna obsoleto.</p>
  <h4>Scrum Master</h4>
  <p>O Scrum Master é responsável por garantir que o Scrum seja compreendido e aplicado corretamente. Atua como <strong>facilitador e remove impedimentos</strong> que bloqueiam o progresso do time. Não distribui tarefas, não aprova código e não define prioridades do backlog.</p>
  <p>O Scrum Master é um <strong>líder-servidor</strong> — serve ao Scrum Team, ao Product Owner e à organização como um todo.</p>
  <h4>Developers</h4>
  <p>Os Developers são responsáveis por <strong>planejar, construir e entregar o Incremento</strong> a cada Sprint, incluindo toda a qualidade técnica. O Scrum não define cargos técnicos específicos dentro dos Developers porque foca em <strong>equipes multifuncionais</strong> — o time como um todo possui todas as habilidades necessárias.</p>
  <div class="conteudo-callout">
    <strong>Resumo:</strong><br>
    • <strong>Product Owner</strong> — maximizar valor, gerenciar o Product Backlog.<br>
    • <strong>Scrum Master</strong> — garantir que o Scrum funcione, remover impedimentos, facilitar.<br>
    • <strong>Developers</strong> — criar o Incremento com qualidade, gerenciar o Sprint Backlog.
  </div>
</section>

<section class="conteudo-secao">
  <h3>2.4 Os Três Artefatos e Seus Compromissos</h3>
  <table class="conteudo-tabela">
    <thead><tr><th>Artefato</th><th>Descrição</th><th>Compromisso</th></tr></thead>
    <tbody>
      <tr><td><strong>Product Backlog</strong></td><td>Lista ordenada de tudo o que é necessário no produto. Dinâmico e nunca completo.</td><td><strong>Product Goal</strong> — visão de longo prazo do produto.</td></tr>
      <tr><td><strong>Sprint Backlog</strong></td><td>Itens selecionados para a Sprint + plano para entregá-los. Pertence aos Developers.</td><td><strong>Sprint Goal</strong> — objetivo único da Sprint.</td></tr>
      <tr><td><strong>Incremento</strong></td><td>Conjunto de itens concluídos durante a Sprint, somados aos anteriores. Deve ser utilizável.</td><td><strong>Definition of Done</strong> — critério formal de "pronto".</td></tr>
    </tbody>
  </table>
  <h4>Definition of Done (DoD)</h4>
  <p>A Definition of Done é um acordo formal que define condições que devem ser atendidas para que um item e o Incremento sejam considerados "prontos". Seu principal objetivo é <strong>padronizar quando um incremento pode ser considerado concluído</strong>.</p>
  <div class="conteudo-callout">
    <strong>Atenção:</strong> Uma equipe que entrega funcionalidades "quase prontas" ao final da Sprint está violando a Definition of Done.
  </div>
  <h4>Refinamento do Product Backlog</h4>
  <p>O refinamento é o processo contínuo de <strong>detalhar, estimar e reordenar os itens</strong> do backlog. Não é um evento formal com time-box definido. Durante o refinamento, ocorre o detalhamento e a reordenação dos itens — não execução de testes, aprovação formal do cliente ou encerramento de Sprint.</p>
</section>

<section class="conteudo-secao">
  <h3>2.5 Características do Scrum Team</h3>
  <p>O Scrum Team é composto por Product Owner, Scrum Master e Developers. É recomendado que seja <strong>pequeno e multifuncional</strong> — geralmente entre 3 e 9 pessoas.</p>
  <p>O Scrum evita a figura do gerente de projetos tradicional porque <strong>substitui a gestão centralizada pela auto-organização</strong>, responsabilizando o próprio time pelas decisões de execução. A <strong>responsabilidade pela qualidade do Incremento é compartilhada por todo o Scrum Team</strong>.</p>
</section>
    `,
  },
  3: {
    tituloCurto: "Módulo 3",
    foco: "O ritmo dos eventos Scrum e as cerimônias de inspeção.",
    conteudo: `
<section class="conteudo-secao">
  <h3>3.1 A Sprint</h3>
  <p>A Sprint é o evento central do Scrum — o coração do framework. É um ciclo fixo de <strong>até um mês</strong> durante o qual a equipe cria um Incremento utilizável do produto. Todos os outros eventos acontecem <em>dentro</em> da Sprint.</p>
  <p>Durante uma Sprint, o escopo pode ser clarificado e renegociado com o Product Owner conforme mais é aprendido — desde que o <strong>Sprint Goal seja respeitado</strong>. Somente o <strong>Product Owner</strong> pode cancelar uma Sprint, e somente quando o Sprint Goal se torna obsoleto.</p>
  <div class="conteudo-callout">
    <strong>Atenção:</strong> Sprints não são prorrogadas. Encerram na data prevista, independentemente do que foi ou não concluído.
  </div>
</section>

<section class="conteudo-secao">
  <h3>3.2 Sprint Planning</h3>
  <p>A Sprint Planning é o evento que abre a Sprint. Seu principal objetivo é <strong>definir o Sprint Goal e planejar como atingi-lo</strong>. <strong>Todo o Scrum Team participa obrigatoriamente</strong>: Product Owner, Scrum Master e Developers.</p>
  <p>O Sprint Goal é criado durante a Sprint Planning. Ele dá coerência e foco ao trabalho da Sprint — é o <em>porquê</em> da Sprint. Mesmo que o Sprint Backlog mude, o Sprint Goal deve ser preservado.</p>
  <div class="conteudo-callout">
    <strong>Impacto do Product Backlog não ordenado:</strong> Quando o backlog não está claramente ordenado, o principal impacto ocorre na <em>Sprint Planning</em> — o time não sabe quais são os itens de maior prioridade para selecionar.
  </div>
</section>

<section class="conteudo-secao">
  <h3>3.3 Daily Scrum</h3>
  <p>A Daily Scrum é um evento <strong>diário</strong> com time-box de <strong>15 minutos</strong>, exclusivo para os <strong>Developers</strong>. Seu objetivo é <strong>inspecionar o progresso em direção ao Sprint Goal</strong> e adaptar o Sprint Backlog conforme necessário.</p>
  <p>A Daily Scrum <em>não</em> é uma reunião de status para o Product Owner acompanhar o progresso, nem um fórum para resolver problemas técnicos detalhados. Questões técnicas levantadas na Daily devem ser resolvidas depois, em conversas separadas.</p>
</section>

<section class="conteudo-secao">
  <h3>3.4 Sprint Review</h3>
  <p>A Sprint Review ocorre <strong>ao final da Sprint</strong>, antes da Retrospective. Seu foco é a <strong>inspeção do Incremento</strong> e a coleta de feedback dos stakeholders. Participam o Scrum Team e os stakeholders relevantes.</p>
  <p>O principal resultado esperado é a <strong>atualização do Product Backlog com base no feedback</strong> recebido. Quando a Sprint Review se transforma em uma apresentação sem diálogo, ocorre uma <strong>perda de oportunidade de inspeção e adaptação</strong>.</p>
  <div class="conteudo-callout">
    <strong>Ponto-chave:</strong> A ausência frequente do Product Owner na Sprint Review compromete principalmente a <em>transparência e o feedback sobre o Incremento</em>.
  </div>
</section>

<section class="conteudo-secao">
  <h3>3.5 Sprint Retrospective</h3>
  <p>A Sprint Retrospective é o <strong>último evento da Sprint</strong>, ocorrendo após a Sprint Review. Seu foco é a <strong>melhoria contínua do processo</strong> — não do produto. O time inspeciona como foi a Sprint em relação a pessoas, processos e ferramentas, e identifica <strong>ações concretas de melhoria</strong> para aplicar na próxima Sprint.</p>
  <p>Ignorar sistematicamente a Retrospective resulta na <strong>estagnação do processo de melhoria contínua</strong> — os mesmos problemas continuam se repetindo.</p>
  <div class="conteudo-callout">
    <strong>Atenção:</strong> A Sprint Retrospective é o evento que <em>encerra formalmente a Sprint</em> — não a Sprint Review.
  </div>
</section>

<section class="conteudo-secao">
  <h3>3.6 O Sprint Goal</h3>
  <p>O Sprint Goal é o compromisso do Sprint Backlog. É criado durante a Sprint Planning e serve para <strong>guiar e dar coerência ao trabalho da Sprint</strong>. Quando o Sprint Goal deixa de orientar as decisões do time, o principal risco é a <strong>perda de foco e de valor entregue</strong>.</p>
  <p>Um Product Owner que constantemente altera prioridades durante a Sprint compromete principalmente o <strong>Sprint Goal</strong>. Se a equipe frequentemente não atinge o Sprint Goal mantendo todas as cerimônias, o cenário indica principalmente uma <strong>falha no planejamento ou na inspeção</strong>.</p>
</section>

<section class="conteudo-secao">
  <h3>3.7 Time-boxes dos Eventos</h3>
  <p>Todos os eventos do Scrum possuem <strong>time-boxes</strong> — durações máximas fixas. O principal objetivo dos time-boxes é <strong>promover foco, previsibilidade e disciplina</strong>.</p>
  <table class="conteudo-tabela">
    <thead><tr><th>Evento</th><th>Time-box (Sprint de 1 mês)</th><th>Participantes</th></tr></thead>
    <tbody>
      <tr><td>Sprint Planning</td><td>Máximo 8 horas</td><td>Todo o Scrum Team</td></tr>
      <tr><td>Daily Scrum</td><td><strong>15 minutos</strong> (diariamente)</td><td>Developers</td></tr>
      <tr><td>Sprint Review</td><td>Máximo 4 horas</td><td>Scrum Team + Stakeholders</td></tr>
      <tr><td>Sprint Retrospective</td><td>Máximo 3 horas</td><td>Todo o Scrum Team</td></tr>
    </tbody>
  </table>
</section>
    `,
  },
  4: {
    tituloCurto: "Módulo 4",
    foco: "Práticas ágeis, métricas e qualidade técnica.",
    conteudo: `
<section class="conteudo-secao">
  <h3>4.1 Integração Contínua (CI) e Entrega Contínua (CD)</h3>
  <p>A <strong>Integração Contínua (CI)</strong> é a prática de <strong>integrar e testar frequentemente o código produzido</strong> — idealmente várias vezes ao dia. Cada integração é verificada por uma build automatizada com testes, permitindo detectar problemas cedo.</p>
  <p>A <strong>Entrega Contínua (CD)</strong> está associada à prática de <strong>automatizar o processo de deploy</strong>, garantindo que o software esteja sempre em condições de ser entregue a produção. A ausência de testes automatizados em um ambiente de CI tende a <strong>aumentar falhas e retrabalho</strong>.</p>
</section>

<section class="conteudo-secao">
  <h3>4.2 Kanban</h3>
  <p>O Kanban é uma abordagem ágil que enfatiza o <strong>fluxo contínuo de trabalho</strong> — diferente do Scrum, que organiza o trabalho em Sprints com duração fixa. Não define papéis fixos nem eventos obrigatórios.</p>
  <h4>Limites de WIP (Work In Progress)</h4>
  <p>Uma das práticas fundamentais do Kanban é o uso de <strong>limites de WIP</strong>, cujo principal objetivo é <strong>controlar o fluxo e evitar sobrecarga</strong>. Quando uma coluna excede seu limite, o time para de iniciar novas tarefas e foca em concluir as existentes. Iniciar mais tarefas não aumenta a velocidade real — cria gargalos.</p>
  <h4>Gargalo</h4>
  <p>Em Kanban, um <strong>gargalo</strong> ocorre quando <strong>uma etapa acumula mais itens que as demais</strong>, impedindo o fluxo suave do trabalho. Quando a coluna "Em Desenvolvimento" acumula muito mais cartões que as demais, o diagnóstico correto é um <strong>gargalo no fluxo de trabalho</strong>.</p>
  <div class="conteudo-callout">
    <strong>Atenção:</strong> Melhorar o fluxo sem analisar gargalos pode resultar em <em>otimização local sem ganho sistêmico</em>.
  </div>
</section>

<section class="conteudo-secao">
  <h3>4.3 Dívida Técnica</h3>
  <p>A <strong>dívida técnica</strong> refere-se a <strong>decisões técnicas inadequadas que geram retrabalho futuro</strong>. É a metáfora financeira aplicada ao desenvolvimento: uma decisão que acelera a entrega agora, mas que precisará ser "paga" no futuro com bugs, retrabalho ou dificuldade de manutenção.</p>
  <p>Quando a refatoração é constantemente adiada, o risco mais significativo é exatamente o <strong>aumento da dívida técnica</strong>.</p>
</section>

<section class="conteudo-secao">
  <h3>4.4 Refatoração</h3>
  <p>A <strong>refatoração</strong> é a prática de <strong>melhorar a estrutura interna do código sem alterar seu comportamento externo</strong>. Não adiciona funcionalidades nem aumenta o tamanho do sistema. É uma prática de qualidade preventiva que reduz a dívida técnica ao longo do tempo.</p>
</section>

<section class="conteudo-secao">
  <h3>4.5 Métricas Ágeis</h3>
  <h4>Velocity (Velocidade)</h4>
  <p>A <strong>Velocity</strong> é a quantidade de trabalho que uma equipe consegue completar em uma Sprint. Deve ser utilizada principalmente para <strong>apoiar previsões internas da própria equipe</strong> — não para comparar equipes diferentes nem avaliar desempenho individual. Quando métricas ágeis são usadas para punir equipes, o efeito mais provável é a <strong>distorção dos dados e a perda de confiança</strong>.</p>
  <h4>Lead Time vs. Cycle Time</h4>
  <ul>
    <li><strong>Lead Time:</strong> tempo total desde a <em>solicitação</em> de um item até sua entrega ao cliente (inclui filas e espera).</li>
    <li><strong>Cycle Time:</strong> tempo que um item leva <em>em desenvolvimento</em> — do início do trabalho ativo até a conclusão (não considera o tempo de espera anterior).</li>
  </ul>
  <div class="conteudo-callout">
    <strong>Diferença fundamental:</strong> Lead Time = tempo total desde a solicitação. Cycle Time = apenas o tempo em desenvolvimento ativo.
  </div>
  <h4>Burndown Chart</h4>
  <p>O <strong>Burndown Chart</strong> mostra o <strong>trabalho restante ao longo do tempo</strong>. A linha desce conforme o trabalho é concluído, indicando quanto ainda falta para atingir o Sprint Goal.</p>
  <h4>Burnup Chart</h4>
  <p>O <strong>Burnup Chart</strong> mostra o <strong>progresso acumulado do trabalho realizado</strong>. É mais indicado quando se quer visualizar a evolução do trabalho concluído — ao contrário do Burndown, que foca no que ainda resta.</p>
</section>

<section class="conteudo-secao">
  <h3>4.6 Qualidade em Ambientes Ágeis</h3>
  <p>A qualidade em métodos ágeis é considerada <strong>responsabilidade compartilhada por toda a equipe</strong> — não é exclusiva do testador nem é uma etapa final. Equipes que buscam alta qualidade devem priorizar <strong>qualidade embutida no processo</strong>, não velocidade acima de tudo.</p>
  <p>Práticas que contribuem diretamente para a redução de defeitos:</p>
  <ul>
    <li>Testes automatizados frequentes</li>
    <li>Definition of Done clara e consistente</li>
    <li>Integração Contínua</li>
    <li>Refatoração contínua</li>
    <li>Retrospectivas com foco em processo</li>
  </ul>
  <div class="conteudo-callout">
    <strong>Atenção:</strong> Uma equipe com alta Velocity mas baixo valor percebido pelo cliente indica <em>foco excessivo em velocidade em detrimento de valor</em>.
  </div>
</section>
    `,
  },
  5: {
    tituloCurto: "Módulo 5",
    foco: "Aplicação prática, cenários reais e análise crítica.",
    conteudo: `
<section class="conteudo-secao">
  <h3>5.1 Aplicando Scrum em Cenários Reais</h3>
  <h4>Mudanças durante o projeto</h4>
  <p>Quando um cliente solicita uma mudança de requisito após o início do projeto, a postura correta segundo os princípios ágeis é <strong>avaliar a mudança e adaptar o plano</strong> — não rejeitá-la automaticamente nem aceitá-la sem análise.</p>
  <h4>Equipe não conclui o planejado</h4>
  <p>Quando uma equipe frequentemente não consegue concluir tudo o que planejou para a Sprint, a ação mais adequada no Scrum é <strong>ajustar planejamento e estimativas futuras</strong> — não aumentar a duração da Sprint nem eliminar o Sprint Goal.</p>
  <h4>Feedback dos stakeholders na Sprint Review</h4>
  <p>Quando stakeholders sugerem ajustes importantes durante a Sprint Review, o próximo passo adequado é <strong>atualizar o Product Backlog com base no feedback</strong>.</p>
  <h4>Satisfação baixa com entregas frequentes</h4>
  <p>Quando a equipe entrega incrementos frequentes mas o cliente demonstra insatisfação contínua, a análise mais coerente é que <strong>o foco pode estar em velocidade, não em valor</strong>.</p>
</section>

<section class="conteudo-secao">
  <h3>5.2 User Stories</h3>
  <h4>O que são User Stories</h4>
  <p>As <strong>User Stories</strong> são uma forma simples de <strong>representar necessidades do usuário</strong>. Seu objetivo principal é descrever funcionalidades do ponto de vista do usuário final. O formato clássico é:</p>
  <div class="conteudo-callout">
    <strong>Como</strong> [quem], <strong>quero</strong> [o quê], <strong>para que</strong> [benefício].
  </div>
  <h4>Critérios de Aceitação</h4>
  <p>Os <strong>critérios de aceitação</strong> servem principalmente para <strong>definir quando uma User Story está completa</strong>. Ignorar critérios de aceitação para "ganhar velocidade" compromete diretamente a <strong>qualidade e a satisfação do cliente</strong>.</p>
  <h4>User Stories grandes (Épicos)</h4>
  <p>Uma User Story grande demais (épico) tende a gerar <strong>dificuldade de estimativa e entrega</strong>. Quando a equipe não compreende totalmente uma User Story durante o planejamento, a ação mais adequada é <strong>refinar e esclarecer a story</strong> — não estimá-la assim mesmo.</p>
</section>

<section class="conteudo-secao">
  <h3>5.3 Estimativas em Métodos Ágeis</h3>
  <p>As estimativas em métodos ágeis são consideradas <strong>previsões baseadas em informação incompleta</strong> — não compromissos contratuais fixos, não garantias de entrega e não métricas de desempenho individual. A estimativa existe para <strong>apoiar planejamento e previsões</strong>, permitindo que o time e os stakeholders tomem decisões informadas sobre escopo e prioridade.</p>
</section>

<section class="conteudo-secao">
  <h3>5.4 Refinamento Contínuo do Backlog</h3>
  <p>Quando o backlog não é refinado continuamente, o principal risco é o <strong>planejamento ineficiente das Sprints</strong> — o time chega à Sprint Planning sem entender ou estimar corretamente os itens mais prioritários.</p>
  <p>Quando a equipe entrega todas as stories planejadas mas com baixo valor percebido, isso indica principalmente <strong>problemas na priorização do backlog</strong>.</p>
</section>

<section class="conteudo-secao">
  <h3>5.5 Planejamento de Releases e Gestão de Riscos</h3>
  <p>O <strong>planejamento de releases</strong> tem como principal objetivo <strong>definir entregas futuras de alto nível</strong> — não eliminar mudanças, não substituir Sprints e não detalhar tarefas técnicas.</p>
  <p>Em projetos ágeis, riscos são tratados preferencialmente por meio de <strong>entregas frequentes e feedback</strong> — não por documentação extensa, contratos rígidos ou planejamento fixo.</p>
</section>

<section class="conteudo-secao">
  <h3>5.6 Dívida Técnica na Prática</h3>
  <p>Uma decisão técnica que acelera a entrega agora mas gera retrabalho futuro caracteriza <strong>dívida técnica</strong> — não melhoria contínua, não otimização de fluxo e não refatoração.</p>
  <p>A dívida técnica não é necessariamente um erro — às vezes é uma escolha consciente para cumprir um prazo. O problema está em acumulá-la sem controle e sem plano para quitá-la.</p>
</section>

<section class="conteudo-secao">
  <h3>5.7 Maturidade Ágil e Adoção do Scrum</h3>
  <p>Uma equipe madura em agilidade demonstra principalmente <strong>capacidade de aprender e se adaptar</strong> — não alta velocidade constante, não ausência de erros e não planejamento rígido.</p>
  <p>A adoção "mecânica" do Scrum — seguir os rituais sem entender seus princípios — tende a resultar em <strong>perda de efetividade do framework</strong>.</p>
  <div class="conteudo-callout">
    <strong>Exemplo crítico:</strong> Um Scrum Master que atua como gerente tradicional, distribuindo tarefas e cobrando resultados individuais, impacta negativamente principalmente a <em>auto-organização do time</em>.
  </div>
  <p>O sucesso em projetos ágeis depende principalmente de <strong>pessoas, colaboração e aprendizado contínuo</strong> — não de ferramentas sofisticadas, processos rígidos ou documentação extensa.</p>
</section>
    `,
  },
};

const APROVACAO_PERCENTUAL = 60;
const TENTATIVAS_MAXIMAS = 2;

let modulos = [];
let moduloSelecionado = null;

const saudacao = document.getElementById("nav-saudacao");
const btnSair = document.getElementById("btn-sair");
const sidebarModulos = document.querySelector(".sidebar-modulos");
const painelBadge = document.querySelector(".painel-badge");
const painelTitulo = document.querySelector(".painel-titulo");
const painelDescricao = document.querySelector(".painel-descricao");
const painelTentativas = document.querySelector(".painel-tentativas strong");
const painelConteudo = document.querySelector(".painel-conteudo");
const botoesAcao = document.querySelector(".painel-acoes");
const statusValor = document.querySelector(".status-valor");
const statusBarraFill = document.querySelector(".status-barra-fill");
const statusTexto = document.querySelector(".status-texto");

inicializar();

async function inicializar() {
  configurarNavbar();
  await carregarModulos();
}

function configurarNavbar() {
  const nome = obterNome();

  if (saudacao && nome) {
    saudacao.textContent = `Olá, ${nome}`;
  }

  btnSair?.addEventListener("click", () => {
    limparSessao();
    window.location.href = "index.html";
  });
}

async function carregarModulos() {
  try {
    renderizarCarregando();

    const response = await apiFetch("/api/questoes/modulos");
    if (!response) return;

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const dados = await response.json();
    modulos = dados.map(mapearModulo);

    moduloSelecionado =
      modulos.find((modulo) => modulo.status !== "bloqueado") || modulos[0];

    renderizarSidebar();
    atualizarTela(moduloSelecionado);
    atualizarProgressoGeral();
  } catch (error) {
    console.error("Erro ao carregar módulos:", error);
    renderizarErro();
  }
}

function mapearModulo(moduloApi) {
  const id = Number(moduloApi.id_modulo);
  const conteudo = MODULOS_CONTEUDO[id] || {};
  const idModuloAtual = Number(moduloApi.id_modulo_atual) || 1;
  const questoes = Number(moduloApi.questoes) || 0;
  const respondidasAtual = Number(moduloApi.questoes_respondidas_atual) || 0;
  const tentativaAtual = Number(moduloApi.tentativa_atual) || 1;
  const melhorNota = Number(moduloApi.melhor_nota) || 0;
  const aprovado = Boolean(moduloApi.aprovado) || id < idModuloAtual;
  const progresso =
    aprovado || id < idModuloAtual
      ? 100
      : questoes > 0 && id === idModuloAtual
        ? Math.round((respondidasAtual / questoes) * 100)
        : 0;

  return {
    id,
    titulo: conteudo.tituloCurto || `Módulo ${id}`,
    nome: moduloApi.titulo,
    foco: conteudo.foco || "Estude o conteúdo e realize a avaliação do módulo.",
    conteudo: conteudo.conteudo || "",
    status: obterStatusModulo(id, idModuloAtual, aprovado, respondidasAtual),
    progresso,
    questoes,
    questoesRespondidas: id === idModuloAtual ? respondidasAtual : questoes,
    tentativasUsadas: aprovado ? Number(moduloApi.tentativas_usadas) || 1 : tentativaAtual,
    tentativasMaximas: TENTATIVAS_MAXIMAS,
    melhorNota,
    aprovado,
  };
}

function obterStatusModulo(id, idModuloAtual, aprovado, respondidasAtual) {
  if (aprovado || id < idModuloAtual) return "concluido";
  if (id > idModuloAtual) return "bloqueado";
  if (respondidasAtual > 0) return "em_andamento";
  return "disponivel";
}

function renderizarSidebar() {
  sidebarModulos.innerHTML = "";

  modulos.forEach((modulo) => {
    const item = document.createElement("button");
    item.className = `modulo-item modulo-item--${modulo.status}`;
    item.type = "button";
    item.disabled = modulo.status === "bloqueado";
    item.innerHTML = `
      <div class="modulo-item-info">
        <span class="modulo-item-titulo">${escapeHtml(modulo.titulo)}</span>
        <span class="modulo-item-status">${formatarStatus(modulo.status)}</span>
      </div>
    `;

    item.addEventListener("click", () => atualizarTela(modulo));
    sidebarModulos.appendChild(item);
  });
}

function atualizarTela(modulo) {
  if (!modulo) return;

  moduloSelecionado = modulo;
  painelBadge.className = `painel-badge painel-badge--${modulo.status}`;
  painelBadge.textContent = formatarStatus(modulo.status);
  painelTitulo.textContent = modulo.nome;
  painelDescricao.textContent = gerarDescricao(modulo);
  painelTentativas.textContent = `${modulo.tentativasUsadas} / ${modulo.tentativasMaximas}`;

  renderizarConteudo(modulo);
  atualizarSidebarAtiva();
  atualizarBotoes(modulo);
}

function renderizarConteudo(modulo) {
  if (modulo.status === "bloqueado") {
    painelConteudo.innerHTML = "";
    return;
  }
  painelConteudo.innerHTML = modulo.conteudo;
}

function atualizarSidebarAtiva() {
  document.querySelectorAll(".modulo-item").forEach((item, index) => {
    const modulo = modulos[index];
    item.className = `modulo-item modulo-item--${modulo.status}`;
    item.classList.toggle("modulo-item--ativo", modulo.id === moduloSelecionado.id);
    item.disabled = modulo.status === "bloqueado";
    item.querySelector(".modulo-item-status").textContent = formatarStatus(modulo.status);
  });
}

function atualizarBotoes(modulo) {
  botoesAcao.innerHTML = "";

  if (modulo.status === "bloqueado") {
    botoesAcao.innerHTML = `
      <button class="btn btn-ghost" disabled>Conclua o módulo anterior</button>
    `;
    return;
  }

  const botaoProva = document.createElement("button");
  botaoProva.className = "btn btn-primary";
  botaoProva.type = "button";
  botaoProva.textContent = modulo.status === "concluido" ? "Módulo concluído" : "Iniciar avaliação";
  botaoProva.disabled = modulo.status === "concluido";
  botaoProva.addEventListener("click", () => {
    window.location.href = "exame/questoes.html";
  });

  botoesAcao.append(botaoProva);
}

function atualizarProgressoGeral() {
  const concluidos = modulos.filter((modulo) => modulo.status === "concluido").length;
  const percentual = modulos.length
    ? Math.round((concluidos / modulos.length) * 100)
    : 0;

  statusValor.textContent = `${percentual}%`;
  statusBarraFill.style.width = `${percentual}%`;
  statusTexto.textContent =
    concluidos === 0
      ? "Nenhum módulo concluído"
      : `${concluidos} de ${modulos.length} módulos concluídos`;
}

function gerarDescricao(modulo) {
  if (modulo.status === "bloqueado") {
    return "Este módulo ainda está bloqueado. Para acessá-lo, conclua a avaliação do módulo anterior.";
  }

  if (modulo.status === "concluido") {
    return "Módulo concluído com sucesso. Você pode revisar o conteúdo quando quiser.";
  }

  if (modulo.status === "em_andamento") {
    return `${modulo.foco} Você já respondeu ${modulo.questoesRespondidas} de ${modulo.questoes} questões desta tentativa.`;
  }

  return `${modulo.foco} Estude o conteúdo abaixo e realize a avaliação correspondente.`;
}

function renderizarCarregando() {
  painelTitulo.textContent = "Carregando módulos...";
  painelDescricao.textContent = "Buscando seu progresso na plataforma.";
  painelConteudo.innerHTML = "";
  botoesAcao.innerHTML = "";
}

function renderizarErro() {
  painelBadge.className = "painel-badge painel-badge--bloqueado";
  painelBadge.textContent = "Erro";
  painelTitulo.textContent = "Não foi possível carregar os módulos";
  painelDescricao.textContent = "Atualize a página ou faça login novamente para tentar de novo.";
  painelTentativas.textContent = "-";
  painelConteudo.innerHTML = "";
  botoesAcao.innerHTML = `
    <button class="btn btn-primary" type="button" id="btn-recarregar">Tentar novamente</button>
  `;
  document.getElementById("btn-recarregar")?.addEventListener("click", carregarModulos);
}

function formatarStatus(status) {
  const statusFormatado = {
    bloqueado: "Bloqueado",
    disponivel: "Disponível",
    em_andamento: "Em andamento",
    concluido: "Concluído",
  };

  return statusFormatado[status] || status;
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}