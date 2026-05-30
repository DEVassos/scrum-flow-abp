const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");

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
