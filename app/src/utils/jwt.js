const path = require("path");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

// Carrega variáveis de ambiente (incluindo JWT_SECRET)
dotenv.config({
  quiet: true,
  path: path.resolve(__dirname, "..", "..", ".env"),
});

//Cria um token JWT assinado
function createToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    // Tempo de vida do token (configurado em .env)
    expiresIn: Number(process.env.DEFAULT_EXPIRES_IN_SECONDS),
  });
}

// Verifica e decodifica um token JWT
function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
  createToken,
  verifyToken,
};
