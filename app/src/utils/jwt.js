const path = require("path");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

// Carrega as variáveis de ambiente a partir do arquivo .env localizado na raiz do projeto
dotenv.config({
  quiet: true,
  path: path.resolve(__dirname, "..", "..", ".env"),
});

/**
 * Cria um novo token JWT (JSON Web Token) assinado.
 * 
 * @param {Object} payload - Os dados a serem incluídos no corpo do token.
 * @returns {string} O token JWT gerado e assinado.
 */
function createToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    // Define o tempo de expiração do token baseado na variável de ambiente
    expiresIn: Number(process.env.DEFAULT_EXPIRES_IN_SECONDS),
  });
}

/**
 * Verifica a validade de um token JWT e o decodifica.
 * 
 * @param {string} token - O token JWT a ser verificado.
 * @throws {Error} Lança um erro se o token for inválido ou tiver expirado.
 * @returns {Object} O payload decodificado contido no token.
 */
function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
  createToken,
  verifyToken,
};
