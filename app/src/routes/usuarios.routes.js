const { Router } = require('express');
const { createUsuario } = require('../repositories/usuarios.repositories');

const router = Router();

// POST /api/usuarios
/*
curl -X POST http://localhost:3004/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{"cpf":"11122233300","nome":"Pedro","email":"pedro@teste.com","senha":"123456"}'
*/
router.post("/", async function (req, res) {
    const { nome, email, cpf, senha } = req.body;

    // Validação: campos obrigatórios
    if (!nome || !email || !senha) {
        return res.status(400).json({
            error: "Nome, email e senha são obrigatórios"
        });
    }

    // Validação: senha com comprimento mínimo
    if (senha.trim().length < 6) {
        return res.status(400).json({
            error: "A senha deve conter pelo menos 6 caracteres"
        });
    }

    try {
        // Cria usuário e seu exame inicial (transação)
        const result = await createUsuario(nome, email, cpf, senha);

        // Retorna dados do usuário criado
        res.status(201).send(result);
    } catch (e) {
        // Tratamento de erro: constraint única violada (email/cpf duplicado)
        if (e && e.code === '23505') {
            return res.status(409).json({
                message: "Email ou CPF já cadastrado"
            });
        }

        // Erro genérico do servidor
        return res.status(500).json({
            message: "Erro interno do servidor"
        });
    }
});
module.exports = router;
