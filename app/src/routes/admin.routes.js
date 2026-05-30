const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");
const {
  updateUsuarioSenhaById,
  findUsuarioById,
} = require("../repositories/usuarios.repositories");
const { hashPassword } = require("../utils/password");

const router = Router();

// Todas as rotas aqui exigem autenticação e perfil de admin
router.use(authMiddleware, adminMiddleware);

/**
 * ROTA: PATCH /admin/usuarios/:idUsuario/reset-senha
 * DESCRIÇÃO: Redefine a senha de um usuário para uma senha temporária
 * ACESSO: Apenas administradores
 */
router.patch("/usuarios/:idUsuario/reset-senha", async (req, res) => {
  const { idUsuario } = req.params;

  try {
    // Verifica se o usuário existe
    const usuario = await findUsuarioById(idUsuario);
    if (!usuario) {
      return res.status(404).json({
        message: "Usuário não encontrado",
      });
    }

    // Gera senha temporária (8 caracteres alfanuméricos)
    const senhaTemporaria = Math.random().toString(36).slice(-8);

    // Gera hash da senha temporária
    const senhaHash = hashPassword(senhaTemporaria);

    // Atualiza a senha no banco
    await updateUsuarioSenhaById(idUsuario, senhaHash);

    return res.status(200).json({
      message: "Senha redefinida com sucesso",
      senha_temporaria: senhaTemporaria,
      usuario: {
        id: usuario.id_usuario,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (error) {
    console.error("Erro ao resetar senha:", error);
    return res.status(500).json({
      message: "Erro interno ao redefinir senha",
    });
  }
});

/**
 * ROTA: GET /admin/usuarios
 * DESCRIÇÃO: Lista todos os usuários do sistema (para admin)
 * ACESSO: Apenas administradores
 */
router.get("/usuarios", async (req, res) => {
  try {
    const pool = require("../database/db");
    const result = await pool.query(`
      SELECT id_usuario, nome, email, cpf, is_admin, certificado_hash
      FROM usuarios
      ORDER BY id_usuario
    `);

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    return res.status(500).json({
      message: "Erro interno ao listar usuários",
    });
  }
});

module.exports = router;
