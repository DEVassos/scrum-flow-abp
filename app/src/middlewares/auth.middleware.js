/**
 * Middleware de Autenticação JWT.
 * Intercepta as requisições para verificar se o usuário possui um token válido
 * e se está autorizado a acessar o recurso solicitado.
 */
const { verifyToken } = require("../utils/jwt");
const { findUsuarioById } = require("../repositories/usuarios.repositories");

/**
 * Lista de rotas que NÃO exigem autenticação (públicas)
 * Formato: "caminho:metodo" ou apenas "caminho" para todos os métodos
 */
const ROTAS_PUBLICAS = [
  "/api/auth/login", // POST - login
  "/api/usuarios", // POST - cadastro de novo usuário
];

/**
 * Verifica se a rota atual é pública (não exige autenticação)
 * @param {string} path - Caminho da requisição (ex: /api/auth/login)
 * @param {string} method - Método HTTP (ex: POST, GET)
 * @returns {boolean}
 */
function isRotaPublica(path, method) {
  // Verifica se o path está na lista de rotas públicas
  return ROTAS_PUBLICAS.some((rotaPublica) => {
    // Se a rota na lista não especifica método, vale para todos
    return path === rotaPublica;
  });
}

/**
 * Middleware que valida o Token Bearer enviado no cabeçalho Authorization.
 * Se o token for válido, os dados do usuário são injetados no objeto 'req.usuario'.
 *
 * @async
 * @param {import('express').Request} req - Objeto de requisição do Express.
 * @param {import('express').Response} res - Objeto de resposta do Express.
 * @param {import('express').NextFunction} next - Função para passar o controle ao próximo middleware.
 */
async function authMiddleware(req, res, next) {
  // 🔓 Rotas públicas não precisam de autenticação
  if (isRotaPublica(req.path, req.method)) {
    return next();
  }

  const authorization = req.headers.authorization;

  // Verifica se o cabeçalho Authorization foi fornecido na requisição
  if (!authorization) {
    return res.status(401).json({
      message: "token não informado",
      error: "Authorization header é obrigatório",
    });
  }

  // Extrai o tipo (Bearer) e o token propriamente dito
  const [type, token] = authorization.split(" ");

  // Valida o formato padrão de autenticação Bearer
  if (type !== "Bearer" || !token) {
    return res.status(401).json({
      message: "token inválido",
      error: "Use o formato: Authorization: Bearer {token}",
    });
  }

  try {
    // Verifica a assinatura e validade (expiração) do JWT
    const payload = verifyToken(token);

    // Recupera os dados atualizados do usuário a partir do ID contido no payload
    const usuario = await findUsuarioById(payload.id_usuario);

    // Garante que o usuário ainda existe no sistema (não foi deletado)
    if (!usuario) {
      return res.status(401).json({
        message: "usuário não identificado",
        error: "O usuário associado ao token não foi encontrado",
      });
    }

    // Disponibiliza o objeto usuário para os controladores e middlewares seguintes
    req.usuario = usuario;

    // Autoriza o prosseguimento da requisição
    return next();
  } catch (e) {
    // Captura erros de expiração, assinatura ou tokens malformados
    return res.status(401).json({
      message: "token inválido ou expirado",
      error: e.message,
    });
  }
}

module.exports = authMiddleware;
