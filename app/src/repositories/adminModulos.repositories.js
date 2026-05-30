const pool = require("../database/db");

async function listarModulos() {
  const result = await pool.query(
    `
    SELECT
      id_modulo,
      titulo
    FROM modulos
    ORDER BY id_modulo ASC
    `,
  );

  return result.rows;
}

async function buscarModuloPorId(idModulo) {
  const result = await pool.query(
    `
    SELECT
      id_modulo,
      titulo
    FROM modulos
    WHERE id_modulo = $1
    `,
    [idModulo],
  );

  return result.rows[0] || null;
}

async function criarModulo(titulo) {
  const result = await pool.query(
    `
    INSERT INTO modulos (titulo)
    VALUES ($1)
    RETURNING id_modulo, titulo
    `,
    [titulo],
  );

  return result.rows[0];
}

async function atualizarModulo(idModulo, titulo) {
  const result = await pool.query(
    `
    UPDATE modulos
    SET titulo = $1
    WHERE id_modulo = $2
    RETURNING id_modulo, titulo
    `,
    [titulo, idModulo],
  );

  return result.rows[0] || null;
}

async function moduloPossuiQuestoes(idModulo) {
  const result = await pool.query(
    `
    SELECT id_questao
    FROM questoes
    WHERE id_modulo = $1
    LIMIT 1
    `,
    [idModulo],
  );

  return result.rows.length > 0;
}

async function removerModulo(idModulo) {
  const possuiQuestoes = await moduloPossuiQuestoes(idModulo);

  if (possuiQuestoes) {
    return {
      removido: false,
      motivo: "MODULO_COM_QUESTOES",
    };
  }

  const result = await pool.query(
    `
    DELETE FROM modulos
    WHERE id_modulo = $1
    RETURNING id_modulo, titulo
    `,
    [idModulo],
  );

  return {
    removido: !!result.rows[0],
    modulo: result.rows[0] || null,
  };
}

module.exports = {
  listarModulos,
  buscarModuloPorId,
  criarModulo,
  atualizarModulo,
  moduloPossuiQuestoes,
  removerModulo,
};