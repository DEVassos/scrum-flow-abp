const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const {
  findProximaQuestaoByUsuario,
  findQuestaoDoExameByUsuario,
  findRespostaByExameEQuestao,
  inserirRespostaQuestao,
  usuarioConcluiuModuloAtual,
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

//rota para criar a próxima tentativa
/*
curl -X PATCH http://localhost:3000/api/questoes/proxima-tentativa \
  -H "Authorization: Bearer SEU_TOKEN"
*/
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

    const grupo = await findOutroGrupoAleatorio(req.usuario.id_usuario, modu-lo.id_modulo);
    if( !grupo ){
      return res.status(404).json({
        message: "nenhum grupo alternativo disponível para este módulo",
      });
    }

    const exame = await updateProximaTentati-va(modulo.id_exame,grupo,modulo.tentativa+1);
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


module.exports = router;