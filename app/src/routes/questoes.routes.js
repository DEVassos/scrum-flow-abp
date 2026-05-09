const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  findProximaQuestaoByUsuario,
  findQuestaoDoExameByUsuario,
  findRespostaByExameEQuestao,
  inserirRespostaQuestao,
  usuarioConcluiuModuloAtual,
  findModuloAtualByUsuario,
  findOutroGrupoAleatorio,
  updateProximaTentativa,
  findProximoModuloByUsuario,
  updateProximoModulo,
  findModulosRespondidosByUsuario
} = require("../repositories/questoes.repositories")
//cria objeto
const router = Router();

/*
curl -X GET http://localhost:3000/api/questoes/proxima-questao \
  -H "Authorization: Bearer SEU_TOKEN"
*/

router.get("/proxima-questao", authMiddleware, async function (req, res) {
  try {
    const questao = await findProximaQuestaoByUsuario(req.usuario.id_usuario);

    if (!questao) {
      return res
        .status(404)
        .json({ message: "nenhuma questão pendente encontrada" });
    }

    return res.status(200).json(questao);
  } catch (e) {
    return res.status(500).json({
      message: "erro interno do servidor",
    });
  }
});

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

    const respostaInserida = await inserirRespostaQuestao(id_exame, id_questao, respostaNormalizada,nota);

    return res.status(201).json(respostaInserida);
  } catch (e) {
    return res.status(500).json({
      message: "erro interno do servidor",
    });
  }
});

//rota para criar a próxima tentativa
router.patch("/proxima-tentativa", authMiddleware, async function (req, res) {
  try {
    const concluido = await usuarioConcluiuModuloAtual(req.usuario.id_usuario);
    if (!concluido) {
      return res.status(409).json({
        message: "você ainda não concluiu todas as questões do módulo atual",
      });
    }

    const modulo = await findModuloAtualByUsuario(req.usuario.id_usuario);
    if (!modulo) {
      return res.status(404).json({
        message: "módulo atual não encontrado",
      });
    }

    if( modulo.tentativa >= 2 ){
      return res.status(409).json({
        message: "limite de 2 tentativas atingido",
      });
    }

    const grupo = await findOutroGrupoAleatorio(req.usuario.id_usuario, modulo.id_modulo);
    if( !grupo ){
      return res.status(404).json({
        message: "nenhum grupo alternativo disponível para este módulo",
      });
    }

    const exame = await updateProximaTentativa(modulo.id_exame,grupo,modulo.tentativa+1);
    if (!exame) {
      return res.status(404).json({
        message: "exame não encontrado para atualização",
      });
    }

    return res.status(200).json(exame);
  } catch (e) {
    return res.status(500).json({
      message: "erro interno do servidor",
    });
  }
});

//rota para mudar para o próximo módulo
router.patch("/proximo-modulo", authMiddleware, async function (req, res) {
  try {
    const concluido = await usuarioConcluiuModuloAtual(req.usuario.id_usuario);
    if (!concluido) {
      return res.status(409).json({
        message: "você ainda não concluiu todas as questões do módulo atual",
      });
    }

    const moduloAtual = await findModuloAtualByUsuario(req.usuario.id_usuario);
    if (!moduloAtual) {
      return res.status(404).json({
        message: "módulo atual não encontrado",
      });
    }

    const modulo = await findProximoModuloByUsuario(req.usuario.id_usuario);
    if (!modulo) {
      return res.status(404).json({
        message: "você concluiu todos os módulos",
      });
    }

    const grupo = await findOutroGrupoAleatorio(req.usuario.id_usuario, modulo);
    if( !grupo ){
      return res.status(404).json({
        message: "nenhum grupo disponível para o próximo módulo",
      });
    }

    const exame = await updateProximoModulo(moduloAtual.id_exame, modulo, grupo, 1);
    if (!exame) {
      return res.status(404).json({
        message: "exame não encontrado para atualização",
      });
    }

    return res.status(200).json(exame);
  } catch (e) {
    return res.status(500).json({
      message: "erro interno do servidor",
    });
  }
});

//mudar para o próximo módulo
router.get("/modulos-respondidos", authMiddleware, async function (req, res) {
  try {
    const modulos = await findModulosRespondidosByUsuario(req.usuario.id_usuario);

    return res.status(200).json(modulos);
  } catch (e) {
    return res.status(500).json({
      message: "erro interno do servidor",
    });
  }
});

module.exports = router;
