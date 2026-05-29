const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const ensureExameMiddleware = require("../middlewares/ensureExame.middleware"); // <-- NOVO para T05
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
  findModulosRespondidosByUsuario,
  findProgressoModulosByUsuario,
  findHistoricoQuestoesByModulo,
} = require("../repositories/questoes.repositories");

const router = Router();

/**
 * ROTA: GET /proxima-questao
 * DESCRIÇÃO: Busca a próxima questão disponível para o usuário autenticado no seu módulo atual.
 * ACESSO: Privado (Requer Token JWT).
 * T05: Garante que o usuário tenha um exame inicial antes de prosseguir.
 */
router.get(
  "/proxima-questao",
  authMiddleware,
  ensureExameMiddleware,
  async function (req, res) {
    try {
      const questao = await findProximaQuestaoByUsuario(req.usuario.id_usuario);

      if (!questao) {
        return res
          .status(404)
          .json({ message: "nenhuma questão pendente encontrada" });
      }

      return res.status(200).json(questao);
    } catch (e) {
      console.error("Erro ao buscar próxima questão:", e);
      return res.status(500).json({
        message: "erro interno do servidor",
      });
    }
  },
);

/**
 * ROTA: POST /responder
 * DESCRIÇÃO: Registra a resposta do usuário para uma questão específica de um exame.
 * ACESSO: Privado (Requer Token JWT).
 * T05: Garante que o usuário tenha um exame inicial antes de prosseguir.
 */
router.post(
  "/responder",
  authMiddleware,
  ensureExameMiddleware,
  async function (req, res) {
    try {
      const { id_exame, id_questao, resposta } = req.body;

      const respostaNormalizada = (resposta || "").trim().toLowerCase();

      const questao = await findQuestaoDoExameByUsuario(
        req.usuario.id_usuario,
        id_exame,
        id_questao,
      );

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
      const respostaInserida = await inserirRespostaQuestao(
        id_exame,
        id_questao,
        respostaNormalizada,
        nota,
      );

      return res.status(201).json(respostaInserida);
    } catch (e) {
      console.error("Erro ao responder questão:", e);
      return res.status(500).json({
        message: "erro interno do servidor",
      });
    }
  },
);

/**
 * ROTA: PATCH /proxima-tentativa
 * DESCRIÇÃO: Reinicia o módulo atual gerando uma nova tentativa (máximo 2) com questões de um grupo diferente.
 * ACESSO: Privado (Requer Token JWT).
 * T05: Garante que o usuário tenha um exame inicial antes de prosseguir.
 */
router.patch(
  "/proxima-tentativa",
  authMiddleware,
  ensureExameMiddleware,
  async function (req, res) {
    try {
      const concluido = await usuarioConcluiuModuloAtual(
        req.usuario.id_usuario,
      );
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

      if (modulo.tentativa >= 2) {
        return res.status(409).json({
          message: "limite de 2 tentativas atingido",
        });
      }

      const grupo = await findOutroGrupoAleatorio(
        req.usuario.id_usuario,
        modulo.id_modulo,
      );
      if (!grupo) {
        return res.status(404).json({
          message: "nenhum grupo alternativo disponível para este módulo",
        });
      }

      const exame = await updateProximaTentativa(
        modulo.id_exame,
        grupo,
        modulo.tentativa + 1,
      );
      if (!exame) {
        return res.status(404).json({
          message: "exame não encontrado para atualização",
        });
      }

      return res.status(200).json(exame);
    } catch (e) {
      console.error("Erro ao gerar próxima tentativa:", e);
      return res.status(500).json({
        message: "erro interno do servidor",
      });
    }
  },
);

/**
 * ROTA: PATCH /proximo-modulo
 * DESCRIÇÃO: Avança o usuário para o próximo módulo da trilha de aprendizagem.
 * ACESSO: Privado (Requer Token JWT).
 * T05: Garante que o usuário tenha um exame inicial antes de prosseguir.
 */
router.patch(
  "/proximo-modulo",
  authMiddleware,
  ensureExameMiddleware,
  async function (req, res) {
    try {
      const concluido = await usuarioConcluiuModuloAtual(
        req.usuario.id_usuario,
      );
      if (!concluido) {
        return res.status(409).json({
          message: "você ainda não concluiu todas as questões do módulo atual",
        });
      }

      const moduloAtual = await findModuloAtualByUsuario(
        req.usuario.id_usuario,
      );
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

      const grupo = await findOutroGrupoAleatorio(
        req.usuario.id_usuario,
        modulo,
      );
      if (!grupo) {
        return res.status(404).json({
          message: "nenhum grupo disponível para o próximo módulo",
        });
      }

      const exame = await updateProximoModulo(
        moduloAtual.id_exame,
        modulo,
        grupo,
        1,
      );
      if (!exame) {
        return res.status(404).json({
          message: "exame não encontrado para atualização",
        });
      }

      return res.status(200).json(exame);
    } catch (e) {
      console.error("Erro ao avançar de módulo:", e);
      return res.status(500).json({
        message: "erro interno do servidor",
      });
    }
  },
);

/**
 * ROTA: GET /modulos-respondidos
 * DESCRIÇÃO: Lista todos os módulos que o usuário já concluiu ou está cursando.
 * ACESSO: Privado (Requer Token JWT).
 * T05: Garante que o usuário tenha um exame inicial antes de prosseguir.
 */
router.get(
  "/modulos-respondidos",
  authMiddleware,
  ensureExameMiddleware,
  async function (req, res) {
    try {
      const modulos = await findModulosRespondidosByUsuario(
        req.usuario.id_usuario,
      );

      return res.status(200).json(modulos);
    } catch (e) {
      console.error("Erro ao buscar módulos respondidos:", e);
      return res.status(500).json({
        message: "erro interno do servidor",
      });
    }
  },
);

/**
 * ROTA: GET /modulos
 * DESCRIÇÃO: Lista todos os módulos com o progresso real do usuário autenticado.
 * ACESSO: Privado (Requer Token JWT).
 * T05: Garante que o usuário tenha um exame inicial antes de prosseguir.
 */
router.get(
  "/modulos",
  authMiddleware,
  ensureExameMiddleware,
  async function (req, res) {
    try {
      const modulos = await findProgressoModulosByUsuario(
        req.usuario.id_usuario,
      );

      return res.status(200).json(modulos);
    } catch (e) {
      console.error("Erro ao buscar progresso dos módulos:", e);
      return res.status(500).json({
        message: "erro interno do servidor",
      });
    }
  },
);

/**
 * ROTA: GET /historico/:idModulo
 * DESCRIÇÃO: Retorna as questões e respostas do usuário para a última tentativa de um módulo específico.
 * ACESSO: Privado (Requer Token JWT).
 * T05: Garante que o usuário tenha um exame inicial antes de prosseguir.
 */
router.get(
  "/historico/:idModulo",
  authMiddleware,
  ensureExameMiddleware,
  async function (req, res) {
    try {
      const idModulo = Number(req.params.idModulo);

      if (!idModulo || idModulo < 1) {
        return res.status(400).json({ message: "id de módulo inválido" });
      }

      const questoes = await findHistoricoQuestoesByModulo(
        req.usuario.id_usuario,
        idModulo,
      );

      if (!questoes.length) {
        return res
          .status(404)
          .json({ message: "nenhuma resposta encontrada para este módulo" });
      }

      return res.status(200).json(questoes);
    } catch (e) {
      console.error("Erro ao buscar histórico do módulo:", e);
      return res.status(500).json({
        message: "erro interno do servidor",
      });
    }
  },
);

module.exports = router;
