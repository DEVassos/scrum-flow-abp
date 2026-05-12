const pool = require("../database/db");

/*
pega o exame mais recente do usuário, filtra as 
questões do mesmo id_modulo e grupo, exclui as 
que já têm registro em respostas para aquele exame 
e retorna a próxima por ordem de numero e id_questao
*/
/**
 * Busca a próxima questão pendente para o usuário.
 * Filtra as questões do módulo e grupo atual do exame mais recente do usuário,
 * excluindo aquelas que ele já respondeu com sucesso.
 * 
 * @async
 * @param {number} idUsuario - ID do usuário autenticado.
 * @returns {Promise<Object|null>} A questão encontrada ou null.
 */
async function findProximaQuestaoByUsuario(idUsuario) {
  const result = await pool.query(
    `
    WITH exame_atual AS (
      SELECT id_exame, id_modulo, grupo, tentativa
      FROM exames
      WHERE id_usuario = $1
      ORDER BY id_exame DESC
      LIMIT 1
    )
    SELECT
      e.id_exame,
      e.tentativa,
      q.id_questao,
      q.id_modulo,
      q.grupo,
      q.numero,
      q.dificuldade,
      q.enunciado,
      q.alternativa_a,
      q.alternativa_b,
      q.alternativa_c,
      q.alternativa_d,
      q.imagem
    FROM exame_atual e
    INNER JOIN questoes q
      ON q.id_modulo = e.id_modulo
     AND q.grupo IS NOT DISTINCT FROM e.grupo
    WHERE NOT EXISTS (
      SELECT 1
      FROM respostas r
      WHERE r.id_exame = e.id_exame
        AND r.id_questao = q.id_questao
    )
    ORDER BY q.numero ASC NULLS LAST, q.id_questao ASC
    LIMIT 1    `,
    [idUsuario],
  );

  return result.rows[0] || null;
};

/**
 * Valida se uma questão específica pertence ao exame ativo do usuário.
 * Retorna a alternativa correta para fins de conferência no backend.
 * 
 * @async
 * @param {number} idUsuario - ID do usuário.
 * @param {number} idExame - ID do exame.
 * @param {number} idQuestao - ID da questão.
 * @returns {Promise<Object|null>}
 */
async function findQuestaoDoExameByUsuario(idUsuario, idExame, idQuestao) {
  const result = await pool.query(
    `
    SELECT
      e.id_exame,
      q.id_questao,
      q.alternativa_correta
    FROM exames e
    INNER JOIN questoes q
      ON q.id_modulo = e.id_modulo
     AND q.grupo IS NOT DISTINCT FROM e.grupo
    WHERE e.id_usuario = $1
      AND e.id_exame = $2
      AND q.id_questao = $3
    LIMIT 1
    `,
    [idUsuario, idExame, idQuestao],
  );

  return result.rows[0] || null;
};

/**
 * Verifica se já existe um registro de resposta para uma questão em um exame.
 * 
 * @async
 * @param {number} idExame - ID do exame.
 * @param {number} idQuestao - ID da questão.
 * @returns {Promise<Object|null>}
 */
async function findRespostaByExameEQuestao(idExame, idQuestao) {
  const result = await pool.query(
    `
    SELECT
      id_resposta,
      id_exame,
      id_questao,
      resposta,
      nota,
      respondido_em
    FROM respostas
    WHERE id_exame = $1
      AND id_questao = $2
    LIMIT 1
    `,
    [idExame, idQuestao],
  );

  return result.rows[0] || null;
};

/**
 * Insere a resposta do usuário e a respectiva nota no banco de dados.
 * 
 * @async
 * @param {number} id_exame - ID do exame.
 * @param {number} id_questao - ID da questão.
 * @param {string} resposta - Texto da alternativa escolhida.
 * @param {number} nota - Nota obtida (0 ou 1).
 * @returns {Promise<Object|null>} A resposta inserida.
 */
async function inserirRespostaQuestao(id_exame, id_questao, resposta, nota) {
  const result = await pool.query(
    `
    INSERT INTO respostas (
      id_exame,
      id_questao,
      nota,
      resposta)
    VALUES ($1,$2,$3,$4)
    RETURNING id_resposta, id_exame, id_questao, nota
    `,
    [id_exame, id_questao, nota, resposta],
  );

  return result.rows[0] || null;
};

/**
 * Verifica se o usuário concluiu todas as questões do módulo atual do seu exame ativo.
 * 
 * @async
 * @param {number} idUsuario - ID do usuário.
 * @returns {Promise<boolean>}
 */
async function usuarioConcluiuModuloAtual(idUsuario) {
  const result = await pool.query(
    `
    WITH exame_atual AS (
      SELECT
        id_exame,
        id_modulo,
        grupo
      FROM exames
      WHERE id_usuario = $1
      ORDER BY id_exame DESC
      LIMIT 1
    )
    SELECT NOT EXISTS (
      SELECT 1
      FROM exame_atual e
      INNER JOIN questoes q
        ON q.id_modulo = e.id_modulo
       AND q.grupo IS NOT DISTINCT FROM e.grupo
      WHERE NOT EXISTS (
        SELECT 1
        FROM respostas r
        WHERE r.id_exame = e.id_exame
          AND r.id_questao = q.id_questao
      )
    ) AS concluido
    `,
    [idUsuario],
  );

  return result.rows[0]?.concluido || false;
};

/**
 * Obtém os detalhes do módulo atual que o usuário está respondendo.
 * 
 * @async
 * @param {number} idUsuario - ID do usuário.
 * @returns {Promise<Object|null>}
 */
async function findModuloAtualByUsuario(idUsuario) {
  const result = await pool.query(
    `
    SELECT
      e.id_exame,
      e.id_modulo,
      m.titulo,
      e.grupo,
      e.tentativa
    FROM exames e
    INNER JOIN modulos m
      ON m.id_modulo = e.id_modulo
    WHERE e.id_usuario = $1
    ORDER BY e.id_exame DESC
    LIMIT 1
    `,
    [idUsuario],
  );

  return result.rows[0] || null;
};

/**
 * Sorteia um grupo de questões aleatório para o módulo, 
 * garantindo que seja diferente dos grupos já respondidos pelo usuário no mesmo módulo.
 * 
 * @async
 * @param {number} idUsuario - ID do usuário.
 * @param {number} idModulo - ID do módulo.
 * @returns {Promise<string|null>} O nome do grupo sorteado.
 */
async function findOutroGrupoAleatorio(idUsuario, idModulo) {
  const result = await pool.query(
    `
    SELECT q.grupo
    FROM questoes q
    WHERE q.id_modulo = $1
      AND q.grupo IS NOT NULL
      AND q.grupo NOT IN (
        SELECT e.grupo
        FROM exames e
        WHERE e.id_usuario = $2
          AND e.id_modulo = $1
          AND e.grupo IS NOT NULL
      )
    GROUP BY q.grupo
    ORDER BY RANDOM()
    LIMIT 1
    `,
    [idModulo, idUsuario],
  );

  return result.rows[0]?.grupo || null;
};

/**
 * Atualiza o exame atual incrementando o número da tentativa e trocando o grupo de questões.
 * 
 * @async
 * @param {number} idExame - ID do exame.
 * @param {string} grupo - Novo grupo de questões.
 * @param {number} tentativa - Número da nova tentativa.
 * @returns {Promise<Object|null>}
 */
async function updateProximaTentativa(idExame, grupo, tentativa) {
  const result = await pool.query(
    `
    UPDATE exames
    SET
      grupo = $1,
      tentativa = $2
    WHERE id_exame = $3
    RETURNING
      id_exame,
      id_modulo,
      id_usuario,
      grupo,
      tentativa
    `,
    [grupo, tentativa, idExame],
  );

  return result.rows[0] || null;
};

/**
 * Identifica qual o próximo módulo na sequência de aprendizado para o usuário.
 * 
 * @async
 * @param {number} idUsuario - ID do usuário.
 * @returns {Promise<number|null>} O ID do próximo módulo.
 */
async function findProximoModuloByUsuario(idUsuario) {
  const result = await pool.query(
    `
    WITH modulo_atual AS (
      SELECT id_modulo
      FROM exames
      WHERE id_usuario = $1
      ORDER BY id_exame DESC
      LIMIT 1
    )
    SELECT
      m.id_modulo,
      m.titulo
    FROM modulos m
    INNER JOIN modulo_atual ma
      ON m.id_modulo > ma.id_modulo
    ORDER BY m.id_modulo ASC
    LIMIT 1
    `,
    [idUsuario],
  );

  return result.rows[0]?.id_modulo || null;
};

/**
 * Atualiza o registro do exame para apontar para um novo módulo e grupo.
 * 
 * @async
 * @param {number} idExame - ID do exame.
 * @param {number} modulo - ID do novo módulo.
 * @param {string} grupo - Grupo de questões sorteado para o novo módulo.
 * @param {number} tentativa - Reinicia o contador de tentativas (normalmente 1).
 * @returns {Promise<Object|null>}
 */
async function updateProximoModulo(idExame, modulo, grupo, tentativa) {
  const result = await pool.query(
    `
    UPDATE exames
    SET
      id_modulo = $1,
      grupo = $2,
      tentativa = $3
    WHERE id_exame = $4
    RETURNING
      id_exame,
      id_modulo,
      id_usuario,
      grupo,
      tentativa
    `,
    [modulo, grupo, tentativa, idExame],
  );

  return result.rows[0] || null;
};

/**
 * Gera estatísticas de desempenho do usuário agrupadas por módulo e tentativa.
 * 
 * @async
 * @param {number} idUsuario - ID do usuário.
 * @returns {Promise<Array>} Lista de módulos respondidos com datas e notas.
 */
async function findModulosRespondidosByUsuario(idUsuario) {
  const result = await pool.query(
    `
    WITH tentativas AS (
      SELECT
        q.id_modulo,
        q.grupo,
        MIN(r.respondido_em) AS inicio,
        MAX(r.respondido_em) AS fim,
        COUNT(DISTINCT r.id_questao)::INTEGER AS questoes_respondidas,
        COALESCE(SUM(r.nota), 0)::INTEGER AS nota
      FROM respostas r
      INNER JOIN exames e
        ON e.id_exame = r.id_exame
      INNER JOIN questoes q
        ON q.id_questao = r.id_questao
      WHERE e.id_usuario = $1
      GROUP BY
        q.id_modulo,
        q.grupo
    )
    SELECT
      t.id_modulo,
      t.inicio,
      t.fim,
      t.questoes_respondidas,
      COUNT(q.id_questao)::INTEGER AS questoes,
      t.nota,
      ROW_NUMBER() OVER (
        PARTITION BY t.id_modulo
        ORDER BY t.inicio ASC
      )::INTEGER AS tentativa
    FROM tentativas t
    INNER JOIN questoes q
      ON q.id_modulo = t.id_modulo
     AND q.grupo IS NOT DISTINCT FROM t.grupo
    GROUP BY
      t.id_modulo,
      t.grupo,
      t.inicio,
      t.fim,
      t.questoes_respondidas,
      t.nota
    ORDER BY
      t.id_modulo ASC,
      tentativa ASC
    `,
    [idUsuario],
  );

  return result.rows;
};

module.exports = {
  findProximaQuestaoByUsuario,
  findQuestaoDoExameByUsuario,
  findRespostaByExameEQuestao,
  inserirRespostaQuestao,
  usuarioConcluiuModuloAtual,
  findModuloAtualByUsuario,
  findOutroGrupoAleatorio,
  updateProximaTentativa,
  findProximoModuloByUsuario,
  updateProximoModulo,
  findModulosRespondidosByUsuario
};