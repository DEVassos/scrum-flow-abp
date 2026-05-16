const fs = require("fs/promises");
const path = require("path");
const pool = require("../database/db");

async function run() {
  const cpf = (process.argv[2] || "").replace(/\D/g, "");

  if (!cpf) {
    console.error("Uso: npm run db:dev-cert -- <CPF>");
    console.error("Exemplo: npm run db:dev-cert -- 37518200864");
    process.exitCode = 1;
    return;
  }

  // Busca o id_exame mais recente do usuário com esse CPF
  const result = await pool.query(
    `SELECT e.id_exame
     FROM exames e
     INNER JOIN usuarios u ON u.id_usuario = e.id_usuario
     WHERE u.cpf = $1
     ORDER BY e.id_exame DESC
     LIMIT 1`,
    [cpf],
  );

  if (!result.rows[0]) {
    console.error(`Nenhum exame encontrado para o CPF ${cpf}.`);
    process.exitCode = 1;
    await pool.end();
    return;
  }

  const idExame = result.rows[0].id_exame;
  console.log(`CPF ${cpf} → id_exame = ${idExame}`);

  const template = await fs.readFile(
    path.join(__dirname, "seed-dev-cert.sql"),
    "utf8",
  );

  const sql = template.replaceAll("__ID_EXAME__", idExame);

  try {
    await pool.query(sql);
    console.log("seed-dev-cert: respostas inseridas e exame atualizado para módulo 5.");
  } finally {
    await pool.end();
  }
}

run().catch((err) => {
  console.error("Erro ao executar seed-dev-cert:", err.message);
  process.exitCode = 1;
});
