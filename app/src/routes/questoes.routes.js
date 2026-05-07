const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  findProximaQuestaoByUsuario,
  findQuestaoDoExameByUsuario,
  findRespostaByExameEQuestao,
  inserirRespostaQuestao,
} = require("../repositories/questoes.repositories");

const router = Router();

//rota protegida para recuperar a próxima questão a ser respondida pelo usuário logado
router.get("/proxima-questao", authMiddleware, async function (req, res) {
  try {
    const questao = await findProximaQuestaoByUsuario(req.usuario.id_usuario);

    if (!questao) {
      return res
        .status(404)
        .json({ message: "nenhuma questão pendente encontrada" });
    }

    return res.status(200).json({
      ...questao,
      imagem: questao.imagem ? `/imagens/questoes/${questao.imagem}` : null,
    });

  } catch (e) {
    return res.status(500).json({
      message: "erro interno do servidor",
    });
  }
});

//rota para inserir a resposta de uma questão na tabela de respostas
router.post("/responder", authMiddleware, async function (req, res) {
  try {
    console.log("body", req.body);
    const { id_exame, id_questao, resposta } = req.body;

    const respostaNormalizada = resposta.trim().toLowerCase();

    const questao = await findQuestaoDoExameByUsuario(req.usuario.id_usuario, id_exame, id_questao);

    if (!questao) {
      return res.status(404).json({
        message: "questão não encontrada para este exame",
      });
    }

    const respostaExistente = await findRespostaByExameEQuestao(
      id_exame,
      id_questao,
    );

    if (respostaExistente) {
      return res.status(409).json({
        message: "questão já respondida",
      });
    }

    const nota = questao.alternativa_correta === respostaNormalizada ? 1 : 0;

    const respostaInserida = await inserirRespostaQuestao(id_exame, id_questao, res-postaNormalizada,nota);

    return res.status(201).json(respostaInserida);
  } catch (e) {
    return res.status(500).json({
      message: "erro interno do servidor",
    });
  }
});

module.exports = router;