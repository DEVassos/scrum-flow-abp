/**
 * @fileoverview Rotas de Autenticação
 *
 * Endpoints para autenticação de usuários e geração de tokens JWT.
 * Realiza login dos usuários com CPF e senha.
 *
 * @module routes/auth
 * @requires express - Framework web
 * @requires ../repositories/usuarios.repositories - Acesso a dados de usuários
 * @requires ../utils/jwt - Utilitários para criar JWT
 *
 * @path /api/auth
 *
 * @example
 * // URL completa: http://localhost:3000/api/auth
 * // Veja os endpoints específicos abaixo
 */

const { Router } = require('express');
const { findUsuarioByCpfAndSenha } = require('../repositories/usuarios.repositories');
const { createToken } = require('../utils/jwt');

const router = Router();

/**
 * @route POST /api/auth/login
 * @group Autenticação
 * @summary Login de usuário com CPF e senha
 * @description
 * Autentica um usuário com base em CPF e senha.
 * Se válido, retorna um token JWT que deve ser usado em requisições autenticadas.
 *
 * @param {string} cpf.body.required - CPF do usuário (11 dígitos)
 * @param {string} senha.body.required - Senha do usuário em texto puro
 *
 * @returns {object} 200 - Login bem-sucedido
 * @returns {string} 200.token - JWT token para incluir em requisições futuras
 * @returns {string} 200.nome - Nome do usuário autenticado
 *
 * @returns {Error} 400 - CPF ou senha ausentes
 * @returns {Error} 500 - Usuário não encontrado ou senha incorreta
 *
 * @example request - Exemplo de requisição
 * POST /api/auth/login HTTP/1.1
 * Content-Type: application/json
 *
 * {
 *   "cpf": "12345678900",
 *   "senha": "senha123"
 * }
 *
 * @example response - Resposta de sucesso (200)
 * {
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
 *   "nome": "João da Silva"
 * }
 *
 * @example response - Erro: campos ausentes (400)
 * {
 *   "error": "CPF e senha são obrigatórios"
 * }
 *
 * @example response - Erro: credenciais inválidas (500)
 * {
 *   "message": "Usuário não encontrado"
 * }
 */
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