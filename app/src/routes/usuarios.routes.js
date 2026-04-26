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

    if (!nome || !cpf || !senha) {
        return res.status(400).send({ message: "Nome, cpf e senha são obrigatórios" });
    }

    if (senha.trim().length < 6) {
        return res.status(400)
            .json({ message: "A senha deve conter pelo menos 6 caracteres" });
    }

    try {
        const result = await createUsuario(nome, email, cpf, senha);
        res.send(result);
    } catch (e) {
        if (e && e.code === '23505') {
            return res.status(409).json({
                message: "Usuário já existe com os dados informados"
            });
        }
        return res.status(409).json({
            message: "erro interno do servidor"
        });
    }
});

module.exports = router;
