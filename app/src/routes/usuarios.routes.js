const { Router } = require('express');
const { createUsuario } = require('../repositories/usuarios.repositories');
const { sanitizeCpf, isValidCpf } = require('../utils/cpf');

const router = Router();

// POST /api/usuarios

router.post("/", async function (req, res) {
    const { nome, email, cpf, senha } = req.body;

    // 1. Validação de campos obrigatórios (RF01)
    // Impedimos o processamento se qualquer campo estiver ausente
    if (!nome || !email || !cpf || !senha) {
        return res.status(400).json({
            error: "Nome, email, CPF e senha são obrigatórios."
        });
    }

    // 2. Sanitização e Validação de CPF (RF01 / T14)
    const cpfLimpo = sanitizeCpf(cpf);
    if (!isValidCpf(cpfLimpo)) {
        return res.status(400).json({
            error: "O CPF informado é inválido. Verifique os dígitos."
        });
    }

    // 3. Validação de Regras de Negócio (Senha)
    if (senha.trim().length < 8) {
        return res.status(400).json({
            error: "A senha deve conter pelo menos 8 caracteres para sua segurança."
        });
    }

    // 4. Persistência de Dados (SÓ APÓS TODAS AS VALIDAÇÕES)
    try {
        // O createUsuario já lida com o hash da senha internamente no repository
        const result = await createUsuario(nome, email, cpfLimpo, senha);

        // Retorno de sucesso (201 Created)
        return res.status(201).json(result);

    } catch (e) {
        // Tratamento de erro: CPF ou Email duplicado (Constraint UNIQUE no Banco)
        if (e && e.code === '23505') {
            return res.status(409).json({
                message: "Não foi possível realizar o cadastro. O e-mail ou CPF informado já está em uso."
            });
        }

        // Erro genérico (500 Internal Server Error)
        console.error("Erro no cadastro:", e);
        return res.status(500).json({
            message: "Erro interno do servidor ao processar o cadastro."
        });
    }
});

module.exports = router;
