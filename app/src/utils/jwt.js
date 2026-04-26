/**
 * @fileoverview Utilitários de JWT (JSON Web Token)
 *
 * Fornece funções para:
 * - Criar tokens JWT assinados
 * - Verificar e decodificar tokens JWT
 *
 * O JWT é usado para autenticação stateless na API.
 * Após login bem-sucedido, o cliente recebe um token que deve
 * ser enviado em cada requisição autenticada.
 *
 * @module utils/jwt
 * @requires path - Manipulação de caminhos de arquivo
 * @requires dotenv - Carregamento de variáveis de ambiente
 * @requires jsonwebtoken - Criar e verificar JWTs
 *
 * @env {string} JWT_SECRET - Chave secreta para assinar tokens (deve ser segura!)
 * @env {number} DEFAULT_EXPIRES_IN_SECONDS - Tempo de vida do token em segundos
 *
 * @example
 * const { createToken, verifyToken } = require('./utils/jwt');
 *
 * // Criar token
 * const token = createToken({ id_usuario: 123 });
 *
 * // Verificar token
 * const payload = verifyToken(token);
 * console.log(payload.id_usuario); // 123
 */

const path = require("path");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

// Carrega variáveis de ambiente (incluindo JWT_SECRET)
dotenv.config({
  quiet: true,
  path: path.resolve(__dirname, "..", "..", ".env"),
});

/**
 * Cria um token JWT assinado
 *
 * O token contém o payload (dados) e é assinado com a chave secreta.
 * O cliente pode descriptografar o payload, mas não pode forjar a assinatura
 * sem conhecer a chave secreta.
 *
 * Estrutura do JWT:
 * - Header: tipo de token e algoritmo (HS256)
 * - Payload: dados codificados em Base64
 * - Signature: assinatura digital (HMAC-SHA256)
 *
 * @function createToken
 * @param {Object} payload - Dados a serem incluídos no token
 * @param {number} payload.id_usuario - ID do usuário autenticado
 * @returns {string} Token JWT assinado (pronto para enviar ao cliente)
 *
 * @example
 * const token = createToken({ id_usuario: 42 });
 * // Resultado: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF9..."
 */
function createToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    // Tempo de vida do token (configurado em .env)
    expiresIn: Number(process.env.DEFAULT_EXPIRES_IN_SECONDS),
  });
}

/**
 * Verifica e decodifica um token JWT
 *
 * Valida a assinatura do token usando a chave secreta e retorna o payload.
 * Se o token for inválido, expirado ou malformado, lança um erro.
 *
 * Validações realizadas:
 * - Assinatura é válida (usando JWT_SECRET)
 * - Token não expirou
 * - Formato do token é válido
 *
 * @function verifyToken
 * @param {string} token - Token JWT a ser verificado
 * @returns {Object} Payload decodificado (contém id_usuario e exp)
 * @throws {Error} Se token é inválido, expirado ou malformado
 *
 * @example
 * try {
 *   const payload = verifyToken('eyJhbGciOi...');
 *   console.log(payload.id_usuario); // ID do usuário
 * } catch (error) {
 *   console.error('Token inválido:', error.message);
 * }
 */
function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
  createToken,
  verifyToken,
};
