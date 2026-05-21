const { Router } = require('express');
const usuarios = require('./usuarios.routes');
const questoes = require("./questoes.routes");
const auth = require('./auth.routes');
const certificados = require("./certificados.routes");

/**
 * Roteador Central da API.
 * Aqui são agregadas todas as rotas específicas da aplicação.
 */
const router = Router();

// ===== MAPEAMENTO DE ROTAS =====

// Agrupa as rotas relacionadas a usuários sob o prefixo /usuarios
router.use("/usuarios", usuarios);

// Agrupa as rotas relacionadas a questões e exames sob o prefixo /questoes
router.use("/questoes", questoes);

// Agrupa as rotas de autenticação (login) sob o prefixo /auth
router.use("/auth", auth);

// Agrupa as rotas relacionadas aos certificados
router.use("/certificados", certificados);

// ===== TRATAMENTO DE ROTAS NÃO ENCONTRADAS =====

/**
 * Middleware para rotas não definidas
 * Retorna erro 404 em formato JSON
 */
router.use(function(_req, res) {
    res.status(404).json({
        error: "Endpoint não encontrado",
        message: "A rota solicitada não existe. Verifique a URL.",
        timestamp: new Date().toISOString()
    });
});

module.exports = router;