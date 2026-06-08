/**
 * Configuração de Conexão com o Banco de Dados PostgreSQL.
 * Este módulo utiliza o pacote 'pg' para criar um pool de conexões gerenciado.
 */
const dotenv = require("dotenv");
const path = require("path");

// Carrega variáveis de ambiente do arquivo .env (localizado 2 níveis acima do diretório atual)
dotenv.config({
  quiet: true,
  path: path.resolve(__dirname, "..", "..", ".env"),
});

const { Pool } = require("pg");

/**
 * Objeto de configuração da conexão obtido das variáveis de ambiente.
 */

const config = {
  // host: process.env.POSTGRES_HOST,
  // user: process.env.POSTGRES_USER,
  // password: process.env.POSTGRES_PASSWORD,
  // database: process.env.POSTGRES_DB,
  // port: process.env.POSTGRES_PORT,
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? true : false

};

const pool = new Pool(config);

module.exports = pool;