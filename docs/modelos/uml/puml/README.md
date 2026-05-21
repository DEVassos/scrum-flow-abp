# Detalhamento dos Diagramas UML em PlantUML

Este documento descreve, para cada Requisito Funcional (RF), os principais elementos do diagrama de classes e de sequência gerados em `scrum-flow-uml.puml`.

## RF01 — Cadastro de Usuário

### Fluxo
1. O ator `Usuario` faz `POST /api/usuarios`.
2. `UsuariosRoute` valida campos obrigatórios e CPF.
3. Chama `UsuariosRepository.createUsuario(...)`.
4. `UsuariosRepository` grava o usuário em `usuarios`.
5. Busca o primeiro módulo disponível em `modulos`.
6. Seleciona um grupo aleatório de `questoes` para o módulo inicial.
7. Insere um registro em `exames` com `tentativa = 1`.
8. Retorna `201 Created` com dados do usuário (sem senha).

### Elementos envolvidos
- `Usuario`
- `UsuariosRepository`
- `Modulo`
- `Questao`
- `Exame`
- banco de dados: tabelas `usuarios`, `modulos`, `questoes`, `exames`

### Observações
- A criação do usuário sempre inicializa um exame.
- O `certificado_hash` é gerado no cadastro mas o certificado só é disponibilizado após conclusão total dos módulos.

## RF02 — Login

### Fluxo
1. O ator `Usuario` faz `POST /api/auth/login`.
2. `AuthRoute` chama `UsuariosRepository.findUsuarioByCpfAndSenha(cpf, senha)`.
3. O repositório consulta `usuarios` por CPF.
4. `PasswordUtil.verifyPassword(...)` valida o hash da senha.
5. `JwtUtil.createToken(...)` gera um JWT.
6. A rota retorna `200 OK` com o token.

### Elementos envolvidos
- `Usuario`
- `UsuariosRepository`
- `PasswordUtil`
- `JwtUtil`
- tabela `usuarios`

### Observações
- O token JWT é usado em todas as rotas privadas subsequentes.

## RF03 — Obter próxima questão

### Fluxo
1. O ator `Usuario` chama `GET /api/questoes/proxima-questao`.
2. `AuthMiddleware` valida o token e carrega `req.usuario`.
3. `QuestoesRoute` chama `QuestoesRepository.findProximaQuestaoByUsuario(id_usuario)`.
4. O repositório obtém o exame atual em `exames`.
5. Seleciona a próxima `Questao` não respondida do mesmo `id_modulo` e `grupo`.
6. Retorna `200 OK` com os dados da questão.

### Elementos envolvidos
- `Usuario`
- `QuestoesRepository`
- `Exame`
- `Questao`
- tabela `respostas`

### Observações
- A lógica garante que a sequência permanece dentro do módulo e grupo do exame atual.
- O atributo `dificuldade` está disponível para o front-end e pode ser usado em classificações.

## RF04 — Classificação por dificuldade

### Fluxo e elementos
- Não há endpoint específico para filtrar por dificuldade.
- A propriedade `Questao.dificuldade` é retornada em `GET /api/questoes/proxima-questao`.
- O cliente pode exibir ou ordenar questões por `dificuldade` na interface.

### Observações
- No diagrama de classe, `Questao.dificuldade` deve aparecer como atributo relevante para seleção e análise.

## RF05 — Composição da prova (3+4+3)

### Fluxo
- O exame atual é composto por questões de `Questao` agrupadas por `id_modulo` e `grupo`.
- `findProximaQuestaoByUsuario` seleciona questões do mesmo módulo/grupo até que todas estejam respondidas.
- O total de questões por exame é determinado pelos registros de `questoes` no grupo atual.

### Elementos envolvidos
- `Questao`
- `Exame`
- `Resposta`
- `Modulo`

### Observações
- A composição efetiva (3+4+3) é uma regra de conteúdo do conjunto de `questoes`, não uma regra hardcoded no backend.
- A agregação da nota final depende da soma das `Resposta.nota` no exame.

## RF06 — Limite de 2 tentativas

### Fluxo
1. O ator `Usuario` chama `PATCH /api/questoes/proxima-tentativa`.
2. `AuthMiddleware` valida o token.
3. `QuestoesRoute` verifica se o módulo atual foi concluído com `usuarioConcluiuModuloAtual(id_usuario)`.
4. Recupera o exame atual com `findModuloAtualByUsuario(id_usuario)`.
5. Verifica se `tentativa < 2`.
6. Busca um grupo alternativo com `findOutroGrupoAleatorio(id_usuario, id_modulo)`.
7. Atualiza o exame para a nova tentativa com `updateProximaTentativa(...)`.
8. Retorna `200 OK` com o novo exame.

### Regras de negócio
- A nova tentativa só é permitida após conclusão do módulo atual.
- O usuário não pode exceder 2 tentativas por módulo.

## RF07 / RF08 — Melhor nota e média final

### Fluxo
- `GET /api/questoes/modulos-respondidos` e `GET /api/questoes/modulos` agregam dados históricos.
- `findModulosRespondidosByUsuario` calcula, por módulo e grupo, quantidade de questões respondidas e soma de notas.
- `findProgressoModulosByUsuario` calcula:
  - `tentativas_usadas`
  - `melhor_nota`
  - `questoes_respondidas_atual`
  - `aprovado`

### Observações
- O backend não usa um campo explícito "média final" no banco; ele deriva o status de aprovação com base no desempenho agregado.
- A melhor nota é o máximo entre todas as tentativas por módulo.

## RF09 — Certificado digital

### Fluxo
1. O ator `Usuario` chama `POST /api/certificados`.
2. `AuthMiddleware` valida token.
3. `CertificadosRoute` chama `findHashByUsuario(id_usuario)`.
4. Retorna o `certificado_hash` do usuário.

### Fluxo de validação de hash
1. Um cliente acessa `GET /api/certificados/hash/:hash`.
2. `CertificadosRoute` valida a presença do hash.
3. Chama `findCertificadoByHash(certificadoHash)`.
4. `findCertificadoByHash` recupera dados do usuário e do progresso de módulos.
5. Se todos os módulos estiverem concluídos, monta o objeto de certificado; caso contrário, retorna `indisponivel`.

### Elementos envolvidos
- `Usuario`
- `CertificadosRepository`
- `Modulo`
- `Resposta`
- tabelas `usuarios`, `modulos`, `respostas`, `exames`

## RF10 / RF11 — Histórico e progresso

### Fluxos
- `GET /api/questoes/modulos-respondidos`
  - lista módulos já respondidos e as tentativas associadas.
- `GET /api/questoes/modulos`
  - apresenta todos os módulos com progresso consolidado e tentativa atual.

### Observações
- `findProgressoModulosByUsuario` retorna um estado de progresso adequado para as telas de histórico e progresso.
- O resultado contém informações de módulo, número de questões e se o usuário está aprovado.

## RF12 — Área administrativa

### Observação
- Não há implementação backend visível em `app/src` para RF12.
- Recomenda-se manter RF12 como requisito futuro/pendente até que exista suporte de rotas e repositórios.

---

## Arquivos PUML gerados por RF

Os seguintes templates PlantUML foram gerados (classe + sequência) em `puml/`:

- RF01_class.puml, RF01_seq.puml
- RF02_class.puml, RF02_seq.puml
- RF03_class.puml, RF03_seq.puml
- RF04_class.puml, RF04_seq.puml
- RF05_class.puml, RF05_seq.puml
- RF06_class.puml, RF06_seq.puml
- RF07_class.puml, RF07_seq.puml
- RF08_class.puml, RF08_seq.puml
- RF09_class.puml, RF09_seq.puml
- RF10_class.puml, RF10_seq.puml
- RF11_class.puml, RF11_seq.puml
- RF12_class.puml, RF12_seq.puml

## Gerar imagens (PlantUML)

Exemplo de comando para gerar SVG (requer PlantUML/Java):

```bash
java -jar plantuml.jar -tsvg RF01_class.puml
java -jar plantuml.jar -tsvg RF01_seq.puml
```

Para gerar todas as imagens do diretório:

```bash
java -jar plantuml.jar -tsvg *.puml
```

Se preferir, posso gerar os SVGs aqui e adicioná-los ao repositório — me avise.
