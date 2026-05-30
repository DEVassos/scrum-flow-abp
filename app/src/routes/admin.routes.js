const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");
const {
  updateUsuarioSenhaById,
  findUsuarioById,
} = require("../repositories/usuarios.repositories");
const { hashPassword } = require("../utils/password");

const router = Router();

// Todas as rotas aqui exigem autenticação e perfil de admin
router.use(authMiddleware, adminMiddleware);

/**
 * ROTA: PATCH /admin/usuarios/:idUsuario/reset-senha
 * DESCRIÇÃO: Redefine a senha de um usuário para uma senha temporária
 * ACESSO: Apenas administradores
 */
router.patch("/usuarios/:idUsuario/reset-senha", async (req, res) => {
  const { idUsuario } = req.params;

  try {
    // Verifica se o usuário existe
    const usuario = await findUsuarioById(idUsuario);
    if (!usuario) {
      return res.status(404).json({
        message: "Usuário não encontrado",
      });
    }

    // Gera senha temporária (8 caracteres alfanuméricos)
    const senhaTemporaria = Math.random().toString(36).slice(-8);

    // Gera hash da senha temporária
    const senhaHash = hashPassword(senhaTemporaria);

    // Atualiza a senha no banco
    await updateUsuarioSenhaById(idUsuario, senhaHash);

    return res.status(200).json({
      message: "Senha redefinida com sucesso",
      senha_temporaria: senhaTemporaria,
      usuario: {
        id: usuario.id_usuario,
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  } catch (error) {
    console.error("Erro ao resetar senha:", error);
    return res.status(500).json({
      message: "Erro interno ao redefinir senha",
    });
  }
});

/**
 * ROTA: GET /admin/usuarios
 * DESCRIÇÃO: Lista todos os usuários do sistema (para admin)
 * ACESSO: Apenas administradores
 */
router.get("/usuarios", async (req, res) => {
  try {
    const pool = require("../database/db");
    const result = await pool.query(`
      SELECT id_usuario, nome, email, cpf, is_admin, certificado_hash
      FROM usuarios
      ORDER BY id_usuario
    `);

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    return res.status(500).json({
      message: "Erro interno ao listar usuários",
    });

const {
  listarQuestoes,
  buscarQuestaoPorId,
  criarQuestao,
  atualizarQuestao,
  removerQuestao,
} = require("../repositories/adminQuestoes.repositories");

const router = Router();

router.use(authMiddleware);
router.use(adminMiddleware);

function alternativaCorretaValida(alternativa) {
  return ["a", "b", "c", "d"].includes(String(alternativa || "").toLowerCase());
}

function validarDadosQuestao(dados) {
  const camposObrigatorios = [
    "id_modulo",
    "grupo",
    "numero",
    "dificuldade",
    "enunciado",
    "alternativa_a",
    "alternativa_b",
    "alternativa_c",
    "alternativa_d",
    "alternativa_correta",
  ];

  for (const campo of camposObrigatorios) {
    if (
      dados[campo] === undefined ||
      dados[campo] === null ||
      dados[campo] === ""
    ) {
      return `Campo obrigatório ausente: ${campo}`;
    }
  }

  if (!alternativaCorretaValida(dados.alternativa_correta)) {
    return "A alternativa correta deve ser exatamente uma entre: a, b, c ou d";
  }

  return null;
}

router.get("/questoes", async function (req, res) {
  try {
    const questoes = await listarQuestoes();
    return res.status(200).json(questoes);
  } catch (e) {
    console.error("Erro ao listar questões:", e);
    return res.status(500).json({ message: "erro interno do servidor" });
  }
});

router.get("/questoes/:id", async function (req, res) {
  try {
    const idQuestao = Number(req.params.id);

    if (!idQuestao || idQuestao < 1) {
      return res.status(400).json({ message: "id de questão inválido" });
    }

    const questao = await buscarQuestaoPorId(idQuestao);

    if (!questao) {
      return res.status(404).json({ message: "questão não encontrada" });
    }

    return res.status(200).json(questao);
  } catch (e) {
    console.error("Erro ao buscar questão:", e);
    return res.status(500).json({ message: "erro interno do servidor" });
  }
});

router.post("/questoes", async function (req, res) {
  try {
    const erroValidacao = validarDadosQuestao(req.body);

    if (erroValidacao) {
      return res.status(400).json({ message: erroValidacao });
    }

    const questao = await criarQuestao({
      ...req.body,
      alternativa_correta: req.body.alternativa_correta.toLowerCase(),
    });

    return res.status(201).json(questao);
  } catch (e) {
    console.error("Erro ao criar questão:", e);
    return res.status(500).json({ message: "erro interno do servidor" });
  }
});

router.put("/questoes/:id", async function (req, res) {
  try {
    const idQuestao = Number(req.params.id);

    if (!idQuestao || idQuestao < 1) {
      return res.status(400).json({ message: "id de questão inválido" });
    }

    const erroValidacao = validarDadosQuestao(req.body);

    if (erroValidacao) {
      return res.status(400).json({ message: erroValidacao });
    }

    const questao = await atualizarQuestao(idQuestao, {
      ...req.body,
      alternativa_correta: req.body.alternativa_correta.toLowerCase(),
    });

    if (!questao) {
      return res.status(404).json({ message: "questão não encontrada" });
    }

    return res.status(200).json(questao);
  } catch (e) {
    console.error("Erro ao atualizar questão:", e);
    return res.status(500).json({ message: "erro interno do servidor" });
  }
});

router.delete("/questoes/:id", async function (req, res) {
  try {
    const idQuestao = Number(req.params.id);

    if (!idQuestao || idQuestao < 1) {
      return res.status(400).json({ message: "id de questão inválido" });
    }

    const questao = await removerQuestao(idQuestao);

    if (!questao) {
      return res.status(404).json({ message: "questão não encontrada" });
    }

    return res.status(200).json({
      message: "questão removida com sucesso",
      id_questao: questao.id_questao,
    });
  } catch (e) {
    console.error("Erro ao remover questão:", e);
    return res.status(500).json({ message: "erro interno do servidor" });
  }
});

module.exports = router;
