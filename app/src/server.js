/**
 * SCRUM FLOW - PONTO DE ENTRADA DO SERVIDOR
 * Este arquivo configura e inicializa o servidor Express, define middlewares globais,
 * gerencia arquivos estáticos e mapeia as rotas da API.
 */
const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const router = require("./routes");

// Carrega as variáveis de ambiente (Configurações de Banco de Dados, Segredos JWT, Porta, etc.)
// O arquivo .env deve estar localizado na raiz do projeto.
dotenv.config({
  quiet: true,
  path: path.resolve(__dirname, "..", ".env"),
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
const imagensQuestoesPath = path.join(
  __dirname,
  "infra",
  "init",
  "seed-data",
  "imagens",
);

// Servir página inicial (HTML)
app.use("/", express.static(pagesPath));

// Servir assets (CSS, JS, imagens, etc)
app.use("/assets", express.static(assetsPath));
app.use("/imagens/questoes", express.static(imagensQuestoesPath));

// ===== ROTAS DA API =====

/**
 * Todas as rotas da API são prefixadas com /api
 * Exemplo: http://localhost:3000/api/usuarios
 *
 * ATENÇÃO: Os middlewares de autenticação (authMiddleware) e
 * garantia de exame (ensureExameMiddleware) foram removidos daqui
 * e agora são aplicados individualmente em cada rota que precisa.
 *
 * Isso permite que rotas públicas (login, cadastro) funcionem
 * sem exigir token, enquanto rotas protegidas aplicam os
 * middlewares necessários.
 */
app.use("/api", router);

// ===== TRATAMENTO DE ROTAS NÃO ENCONTRADAS =====

/**
 * Middleware para rotas não definidas
 * Redireciona para página not-found.html
 */
app.use(function (_req, res) {
  res.redirect("not-found.html");
});

// ===== INICIALIZAÇÃO DO SERVIDOR =====

/**
 * Inicia o servidor HTTP na porta configurada
 */
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
});
