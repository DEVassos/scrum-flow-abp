const { Router } = require('express');
const { findUsuarioByCpfAndSenha } = require('../repositories/usuarios.repositories');
const { createToken } = require('../utils/jwt');

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

    // Validação básica de presença de campos obrigatórios
    if (!cpf || !senha) {
        return res.status(400).json({
            error: "CPF e senha são obrigatórios"
        });
    }

    try {
        // Busca o usuário no banco, valida a senha (hash) e retorna os dados básicos
        const usuario = await findUsuarioByCpfAndSenha(cpf, senha);

        // Gera um token JWT assinado contendo o ID do usuário como payload
        // O tempo de expiração é lido do arquivo .env
        const token = createToken({ id_usuario: usuario.id_usuario });

        // Retorna o token de acesso e o nome do usuário para exibição no frontend
        return res.status(200).json({
            token,
            nome: usuario.nome
        });
    } catch (e) {
        // Em caso de credenciais incorretas ou usuário não encontrado
        // Retorna erro 401 (Não autorizado)
        return res.status(401).json({
            message: e.message || "Usuário ou senha inválidos"
        });
    }
});

module.exports = router;