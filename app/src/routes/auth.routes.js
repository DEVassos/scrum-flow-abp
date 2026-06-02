const { Router } = require("express");
const {
  findUsuarioByCpfAndSenha,
  ensureExameInicial,
} = require("../repositories/usuarios.repositories");
const { createToken } = require("../utils/jwt");

/**
 * Rotas de Autenticação.
 * Este módulo é responsável por validar as credenciais e emitir tokens de acesso.
 */
const router = Router();

/**
 * ROTA: POST /login
 * DESCRIÇÃO: Autentica um usuário via CPF e Senha e retorna um token JWT.
 * ACESSO: Público.
 */
router.post("/login", async function (req, res) {
  const { cpf, senha } = req.body;

  if (!cpf || !senha) {
    return res.status(400).json({
      error: "CPF e senha são obrigatórios",
    });
  }

  try {
    const usuario = await findUsuarioByCpfAndSenha(cpf, senha);

    await ensureExameInicial(usuario.id_usuario);

    const token = createToken({
      id_usuario: usuario.id_usuario,
      is_admin: usuario.is_admin,
      perfil: usuario.is_admin ? "admin" : "user",
    });

    return res.status(200).json({
      token,
      nome: usuario.nome,
      is_admin: usuario.is_admin,
    });
  } catch (e) {
    return res.status(401).json({
      message: e.message || "Usuário ou senha inválidos",
    });
  }
});

module.exports = router;
