const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  findProximaQuestaoByUsuario,
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


module.exports = router;