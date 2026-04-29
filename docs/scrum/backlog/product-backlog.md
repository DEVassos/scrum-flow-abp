# Product Backlog

← [Índice da Documentação](../../00-INDICE.md)

> Artefato mantido pelo **Product Owner**. Revisado e refinado ao início de cada sprint.  
> Histórias seguem o formato: *"Como [persona], quero [ação] para [benefício]."*

---

## Legenda de Prioridade

| Valor | Significado |
|-------|-------------|
| 🔴 Alta | Essencial para o MVP — deve ser entregue nas primeiras sprints |
| 🟡 Média | Importante, mas pode aguardar estabilização do MVP |
| 🟢 Baixa | Desejável ou extensão opcional |

---


## Histórias de Usuário

| ID | Como... | Quero... | Para... | Prioridade | Sprint | Status |
|----|---------|----------|---------|------------|--------|--------|
| DOC | time de desenvolvimento | documentar a aplicação (UML, modelagem de dados, identidade visual e protótipo) | alinhar o time e embasar o desenvolvimento nas sprints seguintes | 🔴 Alta | Sprint 1 | ✅ Concluído |
| US01 | usuário | me cadastrar com CPF, nome, e-mail e senha | criar acesso com o sistema | 🔴 Alta | Sprint 1 | ✅ Concluído |
| US02 | usuário | fazer login com CPF e senha | acessar minha conta com segurança | 🔴 Alta | Sprint 1 | ✅ Concluído |
| US03 | usuário | realizar uma avaliação de nível com 10 questões sorteadas | ser avaliado no conteúdo do nível | 🔴 Alta | Sprint 2 | 🔲 Não iniciado |
| US04 | usuário | ter até 2 tentativas por nível | melhorar meu desempenho se necessário | 🔴 Alta | Sprint 2 | 🔲 Não iniciado |
| US05 | usuário | visualizar minha nota final por nível | acompanhar meu progresso individualmente | 🟡 Média | Sprint 3 | 🔲 Não iniciado |
| US06 | usuário | ver minha média final calculada automaticamente | saber meu resultado geral ao concluir todos os níveis | 🟡 Média | Sprint 3 | 🔲 Não iniciado |
| US07 | usuário | receber um certificado com meus dados e notas | comprovar minha conclusão do ciclo de avaliação | 🟡 Média | Sprint 3 | 🔲 Não iniciado |
| US08 | usuário | consultar meu histórico de tentativas | revisar meu desempenho e as questões sorteadas | 🟢 Baixa | Sprint 3 | 🔲 Não iniciado |
| US09 | administrador | cadastrar e gerenciar questões e níveis via área administrativa | manter o banco de questões atualizado sem alterar o código | 🟢 Baixa | Sprint 3 *(se cabível)* | 🔲 Opcional |

---

## Critérios de Aceitação

### DOC — Documentação da Aplicação
> **Como** time de desenvolvimento, **quero** documentar a aplicação, **para** alinhar o time e embasar o desenvolvimento nas sprints seguintes.

- [ ] `README.md` do repositório está estruturado com descrição do projeto, tecnologias utilizadas e instruções de execução
- [ ] Kanban do projeto está configurado e reflete o andamento das tarefas da sprint
- [ ] Diagramas de Caso de Uso cobrem todos os fluxos principais do sistema
- [ ] Diagrama de Classes reflete as entidades, atributos e relacionamentos acordados pelo time
- [ ] Diagramas de Sequência cobrem os fluxos de cadastro, login e avaliação
- [ ] Modelo Conceitual do BD está produzido e revisado pelo time
- [ ] Modelo Lógico do BD está alinhado ao modelo conceitual e compatível com o PostgreSQL
- [ ] Identidade visual (paleta de cores, tipografia e logotipo) está definida e registrada
- [ ] Protótipo no Figma cobre as telas principais da aplicação e está navegável

**Aceito por:** Product Owner (validar na Sprint Review)

---

### US01 — Cadastro de usuário
> **Como** visitante do sistema, **quero** me cadastrar informando meu CPF, nome completo, e-mail e senha, **para** criar uma conta e acessar as avaliações da plataforma.

- [ ] O campo CPF deve aceitar apenas CPFs válidos no formato `XXX.XXX.XXX-XX`
- [ ] CPF deve ser o identificador único — tentativas de cadastro com CPF já existente devem ser rejeitadas com mensagem clara
- [ ] Campos obrigatórios: CPF, nome completo, e-mail, senha
- [ ] A senha deve ter no mínimo 8 caracteres
- [ ] Senha deve ser armazenada com hash (nunca em texto puro)
- [ ] Após cadastro bem-sucedido, o usuário é redirecionado para a página de login
- [ ] A interface deve ser responsiva e funcionar em dispositivos móveis

**RF relacionado:** RF01 | **Aceito por:** Product Owner (validar na Sprint Review)

---

### US02 — Login
> **Como** usuário cadastrado, **quero** fazer login usando meu CPF e senha, **para** acessar minha área personalizada na plataforma.

- [ ] O login aceita apenas CPF e senha (sem e-mail)
- [ ] Redirecionar para o painel de progresso após login bem-sucedido
- [ ] Em caso de credenciais inválidas, a mensagem de erro não especifica qual campo está errado (prevenção de enumeração)
- [ ] Usuário inativo ou inexistente recebe a mesma mensagem genérica de erro
- [ ] A sessão/token é gerenciada pelo back-end

**RF relacionado:** RF02 | **Aceito por:** Product Owner (validar na Sprint Review)

---

### US03 — Realizar Avaliação de Nível
> **Como** usuário autenticado, **quero** iniciar uma avaliação de um nível, **para** ser avaliado com 10 questões do banco de questões daquele nível.

- [ ] Ao iniciar, o sistema sorteia aleatoriamente: 3 questões fáceis, 4 médias e 3 difíceis
- [ ] As questões são selecionadas a partir de um banco de 30 por nível
- [ ] As alternativas de cada questão são exibidas embaralhadas
- [ ] As questões sorteadas são registradas no banco **antes** de serem exibidas (para auditoria)
- [ ] O usuário não pode avançar sem selecionar uma alternativa
- [ ] Ao finalizar, o sistema registra as respostas e calcula a pontuação no back-end

**RF relacionado:** RF03, RF04, RF05 | **Aceito por:** Product Owner (validar na Sprint Review)

---

### US04 — Controle de Tentativas por Nível
> **Como** usuário autenticado, **quero** ter até 2 tentativas por nível, **para** poder tentar melhorar meu desempenho caso não obtenha uma boa nota na primeira tentativa.

- [ ] O sistema informa ao usuário quantas tentativas restam antes de iniciar a avaliação
- [ ] Após a 2ª tentativa, o botão de iniciar avaliação é bloqueado para aquele nível
- [ ] O controle de tentativas é validar no back-end — não pode ser burlado pelo front-end
- [ ] A nota considerada para o resultado final é sempre a maior entre as tentativas realizadas

**RF relacionado:** RF06, RF07 | **Aceito por:** Product Owner (validar na Sprint Review)

---

### US05 — Nota Final por Nível
> **Como** usuário autenticado, **quero** visualizar minha nota final em cada nível, **para** acompanhar meu desempenho individual por nível.

- [ ] A nota exibida é sempre a maior obtida entre as tentativas realizadas no nível
- [ ] Níveis não iniciados exibem status "Não iniciado"
- [ ] Níveis com tentativas disponíveis exibem quantas restam
- [ ] O cálculo é realizado e armazenado no back-end

**RF relacionado:** RF07, RF11 | **Aceito por:** Product Owner (validar na Sprint Review)

---

### US06 — Média Final
> **Como** usuário autenticado, **quero** ver minha média final calculada automaticamente ao concluir todos os níveis, **para** saber meu resultado global na plataforma.

- [ ] A média final é a média aritmética das melhores notas obtidas em cada nível
- [ ] O cálculo é realizado exclusivamente no back-end
- [ ] A média é exibida com duas casas decimais
- [ ] A média só é exibida quando todos os níveis tiverem sido tentados ao menos uma vez

**RF relacionado:** RF08 | **Aceito por:** Product Owner (validar na Sprint Review)

---

### US07 — Certificado Digital
> **Como** usuário que concluiu todos os níveis, **quero** receber um certificado digital, **para** comprovar minha participação e desempenho na plataforma.

- [ ] O certificado só é disponibilizado após o usuário realizar ao menos uma tentativa em todos os níveis
- [ ] O certificado contém: nome completo, CPF, e-mail, data de emissão e média final
- [ ] Notas por nível discriminadas no certificado (desejável)
- [ ] O certificado pode ser visualizado no navegador e/ou exportado
- [ ] Gerado e armazenado no banco — ao acessar novamente, exibe o mesmo certificado sem reelaborá-lo

**RF relacionado:** RF09 | **Aceito por:** Product Owner (validar na Sprint Review)

---

### US08 — Histórico de Tentativas
> **Como** usuário autenticado, **quero** consultar o histórico detalhado das minhas tentativas, **para** revisar meu desempenho e as questões que foram sorteadas.

- [ ] O histórico exibe por tentativa: data/hora, pontuação obtida e questões sorteadas
- [ ] As respostas escolhidas e a alternativa correta são indicadas
- [ ] O histórico é organizado por nível e ordenado cronologicamente
- [ ] Os dados são recuperados do banco de dados

**RF relacionado:** RF10 | **Aceito por:** Product Owner (validar na Sprint Review)

---

### US09 — Área Administrativa *(Extensão Opcional)*
> **Como** administrador do sistema, **quero** gerenciar questões, alternativas, níveis e imagens via interface administrativa, **para** manter o banco de questões atualizado sem necessidade de acesso direto ao banco de dados.

- [ ] Acesso restrito a usuários com perfil `admin`
- [ ] CRUD completo de: níveis, questões, alternativas e imagens
- [ ] Cada questão deve ter exatamente uma alternativa marcada como correta
- [ ] Upload ou vinculação de imagem às questões
- [ ] Interface responsiva

**RF relacionado:** RF12 | **Aceito por:** Product Owner (validar na Sprint Review)

---

## Histórico de Alterações

| Data | Alteração | Responsável |
|------|-----------|-------------|
| 14/04/2026 | Criação inicial do backlog | Gustavo Koiti (PO) |

---

<div align="center">
  <a href="../../00-INDICE.md">← Voltar ao Índice</a>
</div>
