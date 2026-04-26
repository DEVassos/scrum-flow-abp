const { Router } = require('express');
const { findUsuarioByCpfAndSenha } = require('../repositories/usuarios.repositories');
const { createToken } = require('../utils/jwt');

const router = Router();

// POST /api/auth/login
router.post("/login", async function (req, res) {
    const { cpf, senha } = req.body;

    // Valida campos obrigatórios
    if (!cpf || !senha) {
        return res.status(400).json({
            error: "CPF e senha são obrigatórios"
        });
    }

    try {
        // Busca usuário e valida senha
        const usuario = await findUsuarioByCpfAndSenha(cpf, senha);

        // Gera token JWT válido por DEFAULT_EXPIRES_IN_SECONDS (configurado em .env)
        const token = createToken({ id_usuario: usuario.id_usuario });

        // Retorna token e nome do usuário
        return res.status(200).json({
            token,
            nome: usuario.nome
        });
    } catch (e) {
        // Erro na autenticação (usuário não encontrado ou senha incorreta)
        return res.status(401).json({
            message: e.message || "Usuário ou senha inválidos"
        });
    }
});

module.exports = router;