# Atualização proposta: Diagrama de Classes

Com base na implementação do backend em `app/src`, recomendo as seguintes atualizações no diagrama de classes:

## Entidades principais

- `Usuario`
  - `id_usuario: Integer`
  - `nome: String`
  - `email: String`
  - `cpf: String`
  - `senha: String` (hash)
  - `certificado_hash: String`

- `Modulo`
  - `id_modulo: Integer`
  - `titulo: String`

- `Questao`
  - `id_questao: Integer`
  - `id_modulo: Integer`
  - `grupo: Integer`
  - `numero: Integer`
  - `dificuldade: String`
  - `enunciado: Text`
  - `alternativa_a: Text`
  - `alternativa_b: Text`
  - `alternativa_c: Text`
  - `alternativa_d: Text`
  - `alternativa_correta: Char`
  - `imagem: String`

- `Exame`
  - `id_exame: Integer`
  - `id_modulo: Integer`
  - `id_usuario: Integer`
  - `grupo: Integer`
  - `tentativa: Integer`

- `Resposta`
  - `id_resposta: Integer`
  - `id_exame: Integer`
  - `id_questao: Integer`
  - `resposta: Char`
  - `nota: Integer`
  - `respondido_em: Timestamp`

## Associações

- `Usuario` 1..* `Exame`
- `Modulo` 1..* `Questao`
- `Exame` 1..* `Resposta`
- `Questao` 1..* `Resposta`
- `Exame` *--1 `Modulo`
- `Questao` *--1 `Modulo`
- `Exame` *--1 `Usuario`

## Componentes de serviço / infraestrutura

Também recomendo mostrar, como elementos de suporte, os colaboradores:

- `UsuariosRepository`
- `QuestoesRepository`
- `CertificadosRepository`
- `AuthMiddleware`
- `JwtUtil`
- `PasswordUtil`

## Observações de modelagem

1. `Certificado` não é uma tabela persistida separadamente: ele é um objeto construído a partir dos módulos concluídos e das tentativas do usuário.
2. `Questao.dificuldade` e `Questao.grupo` são atributos importantes para a seleção de prova e devem aparecer no diagrama.
3. `Exame.grupo` e `Exame.tentativa` representam o mecanismo de sorteio de novos conjuntos e limite de 2 tentativas.
4. O diagrama atual de classes deve ser ajustado para deixar explícito que o usuário inicializa um exame ao se cadastrar.

## Itens que podem ser removidos ou marcados como opcionais

- A área administrativa (`RF12`) não possui suporte backend visível em `app/src`; recomendo marcar como opcional ou documentar que ainda não foi implementada.
