const pool = require("../database/db");

async function listarQuestoes() {
  const result = await pool.query(
    `
    SELECT
      id_questao,
      id_modulo,
      grupo,
      numero,
      dificuldade,
      enunciado,
      alternativa_a,
      alternativa_b,
      alternativa_c,
      alternativa_d,
      alternativa_correta,
      imagem
    FROM questoes
    ORDER BY id_questao ASC
    `,
  );

  return result.rows;
}

async function buscarQuestaoPorId(idQuestao) {
  const result = await pool.query(
    `
    SELECT
      id_questao,
      id_modulo,
      grupo,
      numero,
      dificuldade,
      enunciado,
      alternativa_a,
      alternativa_b,
      alternativa_c,
      alternativa_d,
      alternativa_correta,
      imagem
    FROM questoes
    WHERE id_questao = $1
    `,
    [idQuestao],
  );

  return result.rows[0] || null;
}

async function criarQuestao(dados) {
  const {
    id_modulo,
    grupo,
    numero,
    dificuldade,
    enunciado,
    alternativa_a,
    alternativa_b,
    alternativa_c,
    alternativa_d,
    alternativa_correta,
    imagem,
  } = dados;

  const result = await pool.query(
    `
    INSERT INTO questoes (
      id_modulo,
      grupo,
      numero,
      dificuldade,
      enunciado,
      alternativa_a,
      alternativa_b,
      alternativa_c,
      alternativa_d,
      alternativa_correta,
      imagem
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
    RETURNING *
    `,
    [
      id_modulo,
      grupo,
      numero,
      dificuldade,
      enunciado,
      alternativa_a,
      alternativa_b,
      alternativa_c,
      alternativa_d,
      alternativa_correta,
      imagem || null,
    ],
  );

  return result.rows[0];
}

async function atualizarQuestao(idQuestao, dados) {
  const {
    id_modulo,
    grupo,
    numero,
    dificuldade,
    enunciado,
    alternativa_a,
    alternativa_b,
    alternativa_c,
    alternativa_d,
    alternativa_correta,
    imagem,
  } = dados;

  const result = await pool.query(
    `
    UPDATE questoes
    SET
      id_modulo = $1,
      grupo = $2,
      numero = $3,
      dificuldade = $4,
      enunciado = $5,
      alternativa_a = $6,
      alternativa_b = $7,
      alternativa_c = $8,
      alternativa_d = $9,
      alternativa_correta = $10,
      imagem = $11
    WHERE id_questao = $12
    RETURNING *
    `,
    [
      id_modulo,
      grupo,
      numero,
      dificuldade,
      enunciado,
      alternativa_a,
      alternativa_b,
      alternativa_c,
      alternativa_d,
      alternativa_correta,
      imagem || null,
      idQuestao,
    ],
  );

  return result.rows[0] || null;
}

async function removerQuestao(idQuestao) {
  const result = await pool.query(
    `
    DELETE FROM questoes
    WHERE id_questao = $1
    RETURNING id_questao
    `,
    [idQuestao],
  );

  return result.rows[0] || null;
}

module.exports = {
  listarQuestoes,
  buscarQuestaoPorId,
  criarQuestao,
  atualizarQuestao,
  removerQuestao,
};
