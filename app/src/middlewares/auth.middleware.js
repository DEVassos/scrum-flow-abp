const { verifyToken } = require("../utils/jwt");
const { findUsuarioById } = require("../repositories/usuarios.repositories");

async function authMiddleware(req, res, next) {
  const authorization = req.headers.authorization;

  // Verifica se o header Authorization está presente
  if (!authorization) {
    return res.status(401).json({
      message: "token não informado",
      error: "Authorization header é obrigatório"
    });
  }

  // Extrai tipo de autenticação e token
  // Esperado formato: "Bearer {token}"
  const [type, token] = authorization.split(" ");

  // Valida formato do header Authorization
  if (type !== "Bearer" || !token) {
    return res.status(401).json({
      message: "token inválido",
      error: "Use o formato: Authorization: Bearer {token}"
    });
  }

  try {
    // Verifica e decodifica o JWT
    const payload = verifyToken(token);

    // Busca dados do usuário no banco de dados
    const usuario = await findUsuarioById(payload.id_usuario);

    // Valida se usuário ainda existe no banco
    if (!usuario) {
      return res.status(401).json({
        message: "usuário não identificado",
        error: "O usuário associado ao token não foi encontrado"
      });
    }

    // Injeta dados do usuário na requisição para uso posterior
    req.usuario = usuario;

    // Continua para o próximo middleware/rota
    return next();
  } catch (e) {
    // Token expirado, inválido ou erro na verificação
    return res.status(401).json({
      message: "token inválido ou expirado",
      error: e.message
    });
  }
}

module.exports = authMiddleware;
