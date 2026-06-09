const { Router } = require('express');
const {
  createUsuario,
  findUsuarioById,
  findSenhaHashById,
  updateUsuarioNome,
  updateUsuarioMail,
  updateUsuarioCpf,
  updateUsuarioSenha,
} = require('../repositories/usuarios.repositories');
const { sanitizeCpf, isValidCpf } = require('../utils/cpf');
const { verifyPassword } = require('../utils/password');
const authMiddleware = require('../middlewares/auth.middleware');

/**
 * Rotas para gestão de usuários.
 * Este módulo lida com o registro de novos usuários no sistema.
 */
const router = Router();

/**
 * ROTA: POST /
 * DESCRIÇÃO: Cadastra um novo usuário no sistema.
 * REQUISITOS: RF01 (Cadastro de Usuário).
 * ACESSO: Público.
 */
router.post("/", async function (req, res) {
    const { nome, email, cpf, senha } = req.body;

    // 1. Validação de campos obrigatórios (RF01)
    // Impedimos o processamento se qualquer campo estiver ausente ou vazio
    if (!nome || !email || !cpf || !senha) {
        return res.status(400).json({
            error: "Nome, email, CPF e senha são obrigatórios."
        });
    }

    // 2. Sanitização e Validação de CPF (RF01 / T14)
    // Remove caracteres especiais e valida a integridade matemática do CPF
    const cpfLimpo = sanitizeCpf(cpf);
    if (!isValidCpf(cpfLimpo)) {
        return res.status(400).json({
            error: "O CPF informado é inválido. Verifique os dígitos."
        });
    }

    // 3. Validação de Regras de Negócio (Senha)
    // A senha deve possuir um nível mínimo de complexidade (comprimento)
    if (senha.trim().length < 8) {
        return res.status(400).json({
            error: "A senha deve conter pelo menos 8 caracteres para sua segurança."
        });
    }

    // 4. Persistência de Dados (SÓ APÓS TODAS AS VALIDAÇÕES)
    try {
        // O createUsuario já lida com o hash da senha internamente no repository antes de salvar
        const result = await createUsuario(nome, email, cpfLimpo, senha);

        // Retorno de sucesso (201 Created) com os dados do usuário criado (exceto senha)
        return res.status(201).json(result);

    } catch (e) {
        // Tratamento de erro: CPF ou Email duplicado (Constraint UNIQUE no Banco de Dados)
        if (e && e.code === '23505') {
            return res.status(409).json({
                message: "Não foi possível realizar o cadastro. O e-mail ou CPF informado já está em uso."
            });
        }

        // Erro genérico e inesperado (500 Internal Server Error)
        console.error("Erro no cadastro:", e);
        return res.status(500).json({
            message: "Erro interno do servidor ao processar o cadastro."
        });
    }
});

/**
 * ROTA: GET /me
 * DESCRIÇÃO: Retorna os dados do usuário autenticado (nome, e-mail, CPF).
 * ACESSO: Privado (Requer Token JWT).
 */
router.get("/me", authMiddleware, async function (req, res) {
  try {
    const usuario = await findUsuarioById(req.usuario.id_usuario);
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
    return res.status(200).json(usuario);
  } catch (e) {
    console.error("Erro ao buscar dados do usuário:", e);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
});

/**
 * ROTA: PATCH /me
 * DESCRIÇÃO: Atualiza nome, e-mail e/ou CPF do usuário autenticado.
 * ACESSO: Privado (Requer Token JWT).
 */
router.patch("/me", authMiddleware, async function (req, res) {
  const { nome, email, cpf } = req.body;
  const id_usuario = req.usuario.id_usuario;

  if (!nome || !email) {
    return res.status(400).json({ message: "Nome e e-mail são obrigatórios." });
  }

  try {
    await updateUsuarioNome(id_usuario, nome.trim());
    await updateUsuarioMail(id_usuario, email.trim());

    if (cpf) {
      const cpfLimpo = sanitizeCpf(cpf);
      if (!isValidCpf(cpfLimpo)) {
        return res.status(400).json({ message: "CPF inválido." });
      }
      await updateUsuarioCpf(id_usuario, cpfLimpo);
    }

    return res.status(200).json({ message: "Dados atualizados com sucesso." });
  } catch (e) {
    if (e.code === "23505") {
      return res.status(409).json({ message: "E-mail ou CPF já está em uso por outro usuário." });
    }
    console.error("Erro ao atualizar dados:", e);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
});

/**
 * ROTA: PATCH /me/senha
 * DESCRIÇÃO: Altera a senha do usuário autenticado após verificar a senha atual.
 * ACESSO: Privado (Requer Token JWT).
 */
router.patch("/me/senha", authMiddleware, async function (req, res) {
  const { senha_atual, nova_senha } = req.body;
  const id_usuario = req.usuario.id_usuario;

  if (!senha_atual || !nova_senha) {
    return res.status(400).json({ message: "Senha atual e nova senha são obrigatórias." });
  }

  if (nova_senha.trim().length < 8) {
    return res.status(400).json({ message: "A nova senha deve ter no mínimo 8 caracteres." });
  }

  try {
    const senhaHash = await findSenhaHashById(id_usuario);
    if (!senhaHash) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    if (!verifyPassword(senha_atual, senhaHash)) {
      return res.status(401).json({ message: "Senha atual incorreta." });
    }

    await updateUsuarioSenha(id_usuario, nova_senha.trim());
    return res.status(200).json({ message: "Senha alterada com sucesso." });
  } catch (e) {
    console.error("Erro ao alterar senha:", e);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
});

module.exports = router;
