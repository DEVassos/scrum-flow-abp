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
/**
 * Rotas para o sistema de questões e exames.
 * Controla o fluxo de progresso do usuário pelos módulos.
 */
const router = Router();

/**
 * ROTA: GET /proxima-questao
 * DESCRIÇÃO: Busca a próxima questão disponível para o usuário autenticado no seu módulo atual.
 * ACESSO: Privado (Requer Token JWT).
 */
router.get("/proxima-questao", authMiddleware, async function (req, res) {
  try {
    // Busca no repositório a primeira questão ainda não respondida no exame ativo
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
});

/**
 * ROTA: POST /responder
 * DESCRIÇÃO: Registra a resposta do usuário para uma questão específica de um exame.
 * ACESSO: Privado (Requer Token JWT).
 */
router.post("/responder", authMiddleware, async function (req, res) {
  try {
    const { id_exame, id_questao, resposta } = req.body;

    // Normaliza a resposta para garantir consistência na comparação (trim e lowercase)
    const respostaNormalizada = (resposta || "").trim().toLowerCase();

    // Verifica se a questão pertence ao exame e módulo atual do usuário
    const questao = await findQuestaoDoExameByUsuario(req.usuario.id_usuario, id_exame, id_questao);

    if (!questao) {
      return res.status(404).json({
        message: "questão não encontrada para este exame",
      });
    }

    // Impede que a mesma questão seja respondida mais de uma vez no mesmo exame
    const respostaExistente = await findRespostaByExameEQuestao(
      id_exame,
      id_questao,
    );

    if (respostaExistente) {
      return res.status(409).json({
        message: "questão já respondida",
      });
    }

    // Calcula a nota (1 para correta, 0 para incorreta)
    const nota = questao.alternativa_correta === respostaNormalizada ? 1 : 0;

    // Insere a resposta e a nota no banco de dados
    const respostaInserida = await inserirRespostaQuestao(id_exame, id_questao, respostaNormalizada, nota);

    return res.status(201).json(respostaInserida);
  } catch (e) {
    console.error("Erro ao responder questão:", e);
    return res.status(500).json({
      message: "erro interno do servidor",
    });
  }
});

/**
 * ROTA: PATCH /proxima-tentativa
 * DESCRIÇÃO: Reinicia o módulo atual gerando uma nova tentativa (máximo 2) com questões de um grupo diferente.
 * ACESSO: Privado (Requer Token JWT).
 */
router.patch("/proxima-tentativa", authMiddleware, async function (req, res) {
  try {
    // Só permite nova tentativa se o usuário tiver respondido todas as questões do módulo atual
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

    // Limite de regras de negócio: apenas 2 tentativas por módulo
    if( modulo.tentativa >= 2 ){
      return res.status(409).json({
        message: "limite de 2 tentativas atingido",
      });
    }

    // Busca um grupo de questões diferente do que o usuário acabou de responder
    const grupo = await findOutroGrupoAleatorio(req.usuario.id_usuario, modulo.id_modulo);
    if( !grupo ){
      return res.status(404).json({
        message: "nenhum grupo alternativo disponível para este módulo",
      });
    }

    // Atualiza o exame para a nova tentativa e novo grupo
    const exame = await updateProximaTentativa(modulo.id_exame, grupo, modulo.tentativa + 1);
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
});

/**
 * ROTA: PATCH /proximo-modulo
 * DESCRIÇÃO: Avança o usuário para o próximo módulo da trilha de aprendizagem.
 * ACESSO: Privado (Requer Token JWT).
 */
router.patch("/proximo-modulo", authMiddleware, async function (req, res) {
  try {
    // Verifica se o módulo atual foi finalizado
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

    // Busca qual o próximo módulo na sequência definida
    const modulo = await findProximoModuloByUsuario(req.usuario.id_usuario);
    if (!modulo) {
      return res.status(404).json({
        message: "você concluiu todos os módulos",
      });
    }

    // Seleciona um grupo de questões aleatório para o novo módulo
    const grupo = await findOutroGrupoAleatorio(req.usuario.id_usuario, modulo);
    if( !grupo ){
      return res.status(404).json({
        message: "nenhum grupo disponível para o próximo módulo",
      });
    }

    // Atualiza o exame para o novo módulo
    const exame = await updateProximoModulo(moduloAtual.id_exame, modulo, grupo, 1);
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
});

/**
 * ROTA: GET /modulos-respondidos
 * DESCRIÇÃO: Lista todos os módulos que o usuário já concluiu ou está cursando.
 * ACESSO: Privado (Requer Token JWT).
 */
router.get("/modulos-respondidos", authMiddleware, async function (req, res) {
  try {
    const modulos = await findModulosRespondidosByUsuario(req.usuario.id_usuario);

    return res.status(200).json(modulos);
  } catch (e) {
    console.error("Erro ao buscar módulos respondidos:", e);
    return res.status(500).json({
      message: "erro interno do servidor",
    });
  }
});

module.exports = router;
