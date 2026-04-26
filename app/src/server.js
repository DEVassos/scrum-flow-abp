const dotenv = require("dotenv");
const express = require('express');
const path = require('path');
const router = require('./routes');

// Carrega variáveis de ambiente do arquivo .env (configurações de banco de dados, JWT, etc)
dotenv.config({
    quiet: true,
    path: path.resolve(__dirname, '..', '.env'),
});

// Porta do servidor (padrão: 3000)
const PORT = process.env.PORT || 3000;

// Instancia a aplicação Express
const app = express();

// ===== MIDDLEWARES GLOBAIS =====

// Parser JSON para requisições com body em JSON
app.use(express.json());

// ===== CONFIGURAÇÃO DE ARQUIVOS ESTÁTICOS =====

const publicPath = path.join(__dirname, "..", "public");
const pagesPath = path.join(publicPath, "pages");
const assetsPath = path.join(publicPath, "assets");

// Servir página inicial (HTML)
app.get("/", express.static(pagesPath));

// Servir assets (CSS, JS, imagens, etc)
app.use("/assets", express.static(assetsPath));

// ===== ROTAS DA API =====

/**
 * Todas as rotas da API são prefixadas com /api
 * Exemplo: http://localhost:3000/api/usuarios
 */
app.use("/api", router);

// ===== TRATAMENTO DE ROTAS NÃO ENCONTRADAS =====

/**
 * Middleware para rotas não definidas
 * Redireciona para página not-found.html
 */
app.use(function(_req, res) {
    res.redirect("not-found.html");
});

// ===== INICIALIZAÇÃO DO SERVIDOR =====

/**
 * Inicia o servidor HTTP na porta configurada
 */
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
});