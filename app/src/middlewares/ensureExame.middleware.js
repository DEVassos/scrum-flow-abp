/**
 * Middleware de Garantia de Exame Inicial.
 * Intercepta as requisições para verificar se o usuário possui pelo menos um exame.
 * Caso não possua (excluído manualmente do banco), recria automaticamente.
 *
 * Este middleware DEVE ser executado APÓS o authMiddleware, pois depende de req.usuario.
 */
const usuariosRepository = require("../repositories/usuarios.repositories");

/**
 * Middleware que garante a existência de um exame inicial para o usuário autenticado.
 *
 * @async
 * @param {import('express').Request} req - Objeto de requisição do Express (req.usuario deve existir).
 * @param {import('express').Response} res - Objeto de resposta do Express.
 * @param {import('express').NextFunction} next - Função para passar o controle ao próximo middleware.
 */
async function ensureExameMiddleware(req, res, next) {
  // Verifica se o usuário foi autenticado previamente (depende do authMiddleware)
  if (!req.usuario || !req.usuario.id_usuario) {
    return next();
  }

  try {
    const { recriou, exame } = await usuariosRepository.ensureExameInicial(
      req.usuario.id_usuario,
    );

    if (recriou) {
      console.log(
        `[ENSURE-EXAME] Exame recriado automaticamente para usuário ${req.usuario.id_usuario}`,
      );
      // Opcional: req.exameRecriado = exame;
    }

    return next();
  } catch (error) {
    console.error(
      `[ENSURE-EXAME] Falha ao verificar/recriar exame para usuário ${req.usuario.id_usuario}:`,
      error.message,
    );
    return next();
  }
}

module.exports = ensureExameMiddleware;
