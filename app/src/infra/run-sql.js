/**
 * Utilitário de Migração e Inicialização de Banco de Dados.
 * Este script lê e executa uma série de arquivos SQL para configurar o schema
 * e realizar o seed (população) inicial de dados no banco de dados.
 */
const fs = require("fs/promises");
const path = require("path");
const pool = require("../database/db");

// Diretórios base para os arquivos SQL e dados de seed
const projectRoot = path.resolve(__dirname, "..", "..");
const sqlDir = path.resolve(__dirname, "init");
const seedDataDir = path.resolve(sqlDir, "seed-data");

/**
 * ORDEM DE EXECUÇÃO: Define a sequência exata necessária para satisfazer 
 * as restrições de integridade referencial (foreign keys).
 */
const sqlFiles = [
  "01_schema_modulos.sql",   // Estrutura de Módulos
  "02_schema_questoes.sql",  // Estrutura de Questões
  "03_schema_usuarios.sql",  // Estrutura de Usuários
  "04_schema_exames.sql",    // Estrutura de Exames (Trilha de progresso)
  "05_schema_respostas.sql", // Estrutura de Respostas do usuário
  "06_seed_modulos.sql",     // Dados iniciais de Módulos
  "07_seed_questoes.sql",    // Dados iniciais de Questões
  "08_seed_schema_admin.sql", // Estrutura e seed de administrador
];
/**
 * Lê e executa todos os arquivos SQL definidos no array sqlFiles.
 * Realiza o encerramento do pool de conexões após a conclusão.
 * 
 * @async
 * @returns {Promise<void>}
 */
async function runSqlFiles() {
  const files = sqlFiles.map((fileName) => path.join(sqlDir, fileName));

  if (files.length === 0) {
    throw new Error(`Nenhum arquivo .sql encontrado em ${sqlDir}`);
  }

  try {
    // Itera sobre a lista de arquivos e executa cada um de forma sequencial
    for (const file of files) {
      let sql = await fs.readFile(file, "utf8");
      const relativeFile = path.relative(projectRoot, file).replaceAll(path.sep, "/");

      // Prepara o SQL para execução (ajustando paths para o comando COPY)
      sql = prepareSql(sql);

      process.stdout.write(`Executando ${relativeFile}... `);
      await pool.query(sql);
      console.log("ok");
    }
  } finally {
    // Garante o fechamento do pool de conexões
    await pool.end();
  }

  console.log(`${files.length} arquivo(s) SQL executado(s).`);
}

/**
 * Prepara o conteúdo do arquivo SQL substituindo placeholders por caminhos reais.
 * 
 * @param {string} sql - O conteúdo bruto do arquivo SQL.
 * @returns {string} O SQL processado com os caminhos absolutos corretos.
 */
function prepareSql(sql) {
  // O PostgreSQL (COPY) espera caminhos com "/" no estilo UNIX, mesmo no Windows.
  const postgresPath = seedDataDir.replaceAll("\\", "/");

  // Substitui o placeholder __SEED_DATA_DIR__ usado nos scripts .sql pelo caminho real dos arquivos CSV.
  return sql.replace(/__SEED_DATA_DIR__/g, postgresPath);
}

runSqlFiles().catch((error) => {
  console.error("Erro ao executar arquivos SQL:");
  console.error(error.message);
  process.exitCode = 1;
});
