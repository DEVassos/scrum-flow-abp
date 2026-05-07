const pool = require("../database/db");
async function findQuestoesByExame(idExame) {
  const result = await pool.query(
    `
    SELECT
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
    FROM exames e
    INNER JOIN questoes q
      ON q.id_modulo = e.id_modulo
      AND q.grupo IS NOT DISTINCT FROM e.grupo
    WHERE e.id_exame = $1
    ORDER BY q.numero ASC
    `,
    [idExame]
  );

  return result.rows;
}

module.exports = {
  findQuestoesByExame,
};