# Atualização proposta: Diagramas de Sequência

Baseado nas rotas e repositórios de `app/src`, proponho as seguintes atualizações de sequência.

## RF01 - Cadastro de Usuário

Fluxo:
- `POST /api/usuarios`
- `usuarios.routes` valida nome, email, cpf e senha
- `usuarios.repositories.createUsuario`
  - `insertUsuario`
  - `findPrimeiroModuloId`
  - `findGrupoAleatorio`
  - `insertExame`
- Commit da transação

O diagrama deve mostrar a criação do exame imediatamente após o cadastro.

## RF02 - Login

Fluxo:
- `POST /api/auth/login`
- `auth.routes` chama `findUsuarioByCpfAndSenha`
- `verifyPassword`
- `createToken`
- Resposta com JWT

## RF03 - Obter próxima questão

Fluxo:
- `GET /api/questoes/proxima-questao`
- `authMiddleware` valida token e carrega `req.usuario`
- `findProximaQuestaoByUsuario`
- Consulta `exames` + `questoes` para retornar a próxima questão pendente do exame atual

## RF04 - Classificar por dificuldade

Embora não exista endpoint específico de filtragem, a propriedade `dificuldade` de `Questao` deve aparecer na sequência de seleção de questões e retorno ao front-end.

## RF05 - Composição da prova

O modelo deve refletir que cada módulo tem um conjunto de questões agrupadas por `grupo`
- `findProximaQuestaoByUsuario` seleciona questões pelo `id_modulo` e `grupo`
- `Respostas` são registradas por `id_exame`
- A nota final do módulo é computada a partir da soma das respostas

## RF06 - Limite de 2 tentativas

Fluxo:
- `PATCH /api/questoes/proxima-tentativa`
- `authMiddleware`
- `usuarioConcluiuModuloAtual`
- `findModuloAtualByUsuario`
- `findOutroGrupoAleatorio`
- `updateProximaTentativa`

O diagrama deve expressar a regra de negócio:
- só permite nova tentativa após conclusão do módulo
- só permite até 2 tentativas

## RF07 / RF08 - Melhor nota e média final

Esses fluxos são derivados de `findModulosRespondidosByUsuario` e `findProgressoModulosByUsuario`.
- `findProgressoModulosByUsuario` agrega tentativas por módulo
- `melhor_nota` é calculado como `MAX(nota)`
- `aprovado` é determinado a partir da meta de acerto

## RF09 - Certificado digital

Fluxos:
- `POST /api/certificados` retorna hash do certificado
- `GET /api/certificados/hash/:hash` valida hash e retorna dados do certificado
- `findCertificadoByHash` monta o objeto de certificado a partir de `usuarios`, `modulos` e `tentativas`
- Se não estiver concluído, retorna `indisponivel`

## RF10 / RF11 - Histórico e progresso

- `GET /api/questoes/modulos-respondidos`
- `GET /api/questoes/modulos`

Esses endpoints são essenciais para os diagramas de sequência de relatório e de consulta de progresso.

## Observação

Não há fluxo backend explícito para uma área administrativa (`RF12`) em `app/src`; recomendo marcar `RF12` como futuro/pendente no conjunto de diagramas.
