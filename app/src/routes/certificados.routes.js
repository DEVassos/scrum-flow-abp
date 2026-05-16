//rota para obter os dados do certificado
const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  findHashByUsuario,
  findCertificadoByHash,
} = require("../repositories/certificados.repositories");

const router = Router();

/*
curl -X POST http://localhost:3000/api/certificados \
  -H "Authorization: Bearer TOKEN"
*/
router.post("/", authMiddleware, async function (req, res) {
  try {
    const hash = await findHashByUsuario(req.usuario.id_usuario);

    if (!hash) {
      return res.status(404).json({ message: "usuário não encontrado" });
    }

    return res.status(200).json({ hash });
  } catch (e) {
    return res.status(500).json({ message: "erro interno do servidor" });
  }
});

/*
curl -X GET http://localhost:3000/api/certificados/hash/HASH_DO_CERTIFICADO
*/
router.get("/hash/:hash", async function (req, res) {
  const certificadoHash = String(req.params.hash || "").trim();

  if (!certificadoHash) {
    return res.status(400).json({
      message: "hash do certificado obrigatório",
    });
  }

  try {
    const certificado = await findCertificadoByHash(certificadoHash);

    if (!certificado) {
      return res.status(404).json({
        message: "certificado inexistente para o hash informado",
      });
    }

    if (certificado.indisponivel) {
      return res.status(409).json({
        message: certificado.motivo,
      });
    }

    return res.status(200).json(certificado);
  } catch (e) {
    return res.status(500).json({
      message: "erro interno do servidor",
    });
  }
});

module.exports = router;
