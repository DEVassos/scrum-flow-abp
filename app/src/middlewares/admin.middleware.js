/**
 * Middleware de Autorização Administrativa.
 * Verifica se o usuário autenticado possui perfil de administrador.
 * Deve ser executado APÓS o authMiddleware.
 */
async function adminMiddleware(req, res, next) {
  // Verifica se o usuário está autenticado
  if (!req.usuario) {
    return res.status(401).json({
      message: "Usuário não autenticado",
      error: "Token não informado ou inválido",
    });
  }

  // Verifica se é admin
  if (!req.usuario.is_admin) {
    return res.status(403).json({
      message: "Acesso negado",
      error: "Você não possui permissão de administrador",
    });
  }

  next();
}

module.exports = adminMiddleware;
