const { Router } = require('express');
const usuarios = require('./usuarios.routes');
const auth = require('./auth.routes');

const router = Router();

// ===== MAPEAMENTO DE ROTAS =====

// Rotas de usuários e questões
router.use("/usuarios", usuarios);
router.use("/questoes", questoes);

// Rotas de autenticação
router.use("/auth", auth);

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