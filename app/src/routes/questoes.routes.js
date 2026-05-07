const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  findQuestoesByExame,
} = require("../repositories/questoes.repositories");

const router = Router();

router.get("/:idExame/questoes", authMiddleware, async function (req, res) {
  try {
    const idExame = Number(req.params.idExame);

    const questoes = await findQuestoesByExame(idExame);

    return res.status(200).json(questoes);
  } catch (e) {
    return res.status(500).json({
      message: "erro interno do servidor",
    });
  }
});

module.exports = router;