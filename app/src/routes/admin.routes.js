const { Router } = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const adminMiddleware = require("../middlewares/admin.middleware");

const {
  updateUsuarioSenhaById,
  findUsuarioById,
} = require("../repositories/usuarios.repositories");
const { hashPassword } = require("../utils/password");

const {
  listarQuestoes,
  buscarQuestaoPorId,
  criarQuestao,
  atualizarQuestao,
  removerQuestao,
} = require("../repositories/adminQuestoes.repositories");

const {
  listarModulos,
  buscarModuloPorId,
  criarModulo,
  atualizarModulo,
  removerModulo,
} = require("../repositories/adminModulos.repositories");

const router = Router();

router.use(authMiddleware, adminMiddleware);

// ================================
//   USUÁRIOS
// ================================

router.patch("/usuarios/:idUsuario/reset-senha", async (req, res) => {
  const { idUsuario } = req.params;

  try {
    const usuario = await findUsuarioById(idUsuario);
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const senhaTemporaria = Math.random().toString(36).slice(-8);
    const senhaHash = hashPassword(senhaTemporaria);
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
    return res.status(500).json({ message: "Erro interno ao redefinir senha" });
  }
});

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
    return res.status(500).json({ message: "Erro interno ao listar usuários" });
  }
});

// ================================
//   PROGRESSO DE USUÁRIOS
// ================================

router.get("/usuarios-progresso", async (req, res) => {
  try {
    const pool = require("../database/db");
    const result = await pool.query(`
      SELECT
        u.id_usuario,
        u.nome,
        u.email,
        e.id_exame,
        e.id_modulo,
        m.titulo AS modulo_titulo,
        e.tentativa AS tentativa_atual,
        COALESCE((
          SELECT COUNT(DISTINCT q2.grupo)::INTEGER
          FROM respostas r2
          INNER JOIN questoes q2 ON q2.id_questao = r2.id_questao
          WHERE r2.id_exame = e.id_exame
            AND q2.id_modulo = e.id_modulo
        ), 0) AS tentativas_modulo_atual
      FROM usuarios u
      LEFT JOIN exames e ON e.id_usuario = u.id_usuario
      LEFT JOIN modulos m ON m.id_modulo = e.id_modulo
      ORDER BY u.nome ASC
    `);
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erro ao listar progresso:", error);
    return res.status(500).json({ message: "Erro interno ao listar progresso" });
  }
});

// Zera tentativas do módulo atual: apaga respostas do módulo e reseta tentativa para 1
router.patch("/usuarios/:id/zerar-modulo", async (req, res) => {
  try {
    const pool = require("../database/db");
    const idUsuario = Number(req.params.id);
    if (!idUsuario) return res.status(400).json({ message: "id inválido" });

    const exameRes = await pool.query(
      `SELECT id_exame, id_modulo FROM exames WHERE id_usuario = $1 ORDER BY id_exame DESC LIMIT 1`,
      [idUsuario]
    );
    if (!exameRes.rows[0]) return res.status(404).json({ message: "Exame não encontrado" });

    const { id_exame, id_modulo } = exameRes.rows[0];

    await pool.query(
      `DELETE FROM respostas
       WHERE id_exame = $1
         AND id_questao IN (SELECT id_questao FROM questoes WHERE id_modulo = $2)`,
      [id_exame, id_modulo]
    );

    await pool.query(`UPDATE exames SET tentativa = 1 WHERE id_exame = $1`, [id_exame]);

    return res.status(200).json({ message: "Tentativas do módulo zeradas com sucesso" });
  } catch (error) {
    console.error("Erro ao zerar módulo:", error);
    return res.status(500).json({ message: "Erro interno" });
  }
});

// Reinicia completamente: apaga todas as respostas e volta ao Módulo 1
router.patch("/usuarios/:id/reiniciar", async (req, res) => {
  try {
    const pool = require("../database/db");
    const idUsuario = Number(req.params.id);
    if (!idUsuario) return res.status(400).json({ message: "id inválido" });

    const exameRes = await pool.query(
      `SELECT id_exame FROM exames WHERE id_usuario = $1 ORDER BY id_exame DESC LIMIT 1`,
      [idUsuario]
    );
    if (!exameRes.rows[0]) return res.status(404).json({ message: "Exame não encontrado" });

    const { id_exame } = exameRes.rows[0];

    await pool.query(`DELETE FROM respostas WHERE id_exame = $1`, [id_exame]);

    const grupoRes = await pool.query(
      `SELECT grupo FROM questoes WHERE id_modulo = 1 AND grupo IS NOT NULL GROUP BY grupo ORDER BY grupo LIMIT 1`
    );
    const grupo = grupoRes.rows[0]?.grupo || 1;

    await pool.query(
      `UPDATE exames SET id_modulo = 1, grupo = $1, tentativa = 1 WHERE id_exame = $2`,
      [grupo, id_exame]
    );

    return res.status(200).json({ message: "Usuário reiniciado para o Módulo 1 com sucesso" });
  } catch (error) {
    console.error("Erro ao reiniciar usuário:", error);
    return res.status(500).json({ message: "Erro interno" });
  }
});

// ================================
//   QUESTÕES
// ================================

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

// ================================
//   NÍVEIS
// ================================

router.get("/niveis", async function (req, res) {
  try {
    const niveis = await listarModulos();
    return res.status(200).json(niveis);
  } catch (e) {
    console.error("Erro ao listar níveis:", e);
    return res.status(500).json({ message: "erro interno do servidor" });
  }
});

router.get("/niveis/:id", async function (req, res) {
  try {
    const idModulo = Number(req.params.id);

    if (!idModulo || idModulo < 1) {
      return res.status(400).json({ message: "id de nível inválido" });
    }

    const nivel = await buscarModuloPorId(idModulo);

    if (!nivel) {
      return res.status(404).json({ message: "nível não encontrado" });
    }

    return res.status(200).json(nivel);
  } catch (e) {
    console.error("Erro ao buscar nível:", e);
    return res.status(500).json({ message: "erro interno do servidor" });
  }
});

router.post("/niveis", async function (req, res) {
  try {
    const { titulo } = req.body;

    if (!titulo || titulo.trim() === "") {
      return res.status(400).json({
        message: "o título do nível é obrigatório",
      });
    }

    const nivel = await criarModulo(titulo.trim());

    return res.status(201).json(nivel);
  } catch (e) {
    console.error("Erro ao criar nível:", e);
    return res.status(500).json({ message: "erro interno do servidor" });
  }
});

router.put("/niveis/:id", async function (req, res) {
  try {
    const idModulo = Number(req.params.id);
    const { titulo } = req.body;

    if (!idModulo || idModulo < 1) {
      return res.status(400).json({ message: "id de nível inválido" });
    }

    if (!titulo || titulo.trim() === "") {
      return res.status(400).json({
        message: "o título do nível é obrigatório",
      });
    }

    const nivel = await atualizarModulo(idModulo, titulo.trim());

    if (!nivel) {
      return res.status(404).json({
        message: "nível não encontrado",
      });
    }

    return res.status(200).json(nivel);
  } catch (e) {
    console.error("Erro ao atualizar nível:", e);
    return res.status(500).json({ message: "erro interno do servidor" });
  }
});

router.delete("/niveis/:id", async function (req, res) {
  try {
    const idModulo = Number(req.params.id);

    if (!idModulo || idModulo < 1) {
      return res.status(400).json({
        message: "id de nível inválido",
      });
    }

    const resultado = await removerModulo(idModulo);

    if (!resultado.removido) {
      if (resultado.motivo === "MODULO_COM_QUESTOES") {
        return res.status(400).json({
          message:
            "Não é possível remover um nível que possui questões vinculadas",
        });
      }

      return res.status(404).json({
        message: "nível não encontrado",
      });
    }

    return res.status(200).json({
      message: "nível removido com sucesso",
      modulo: resultado.modulo,
    });
  } catch (e) {
    console.error("Erro ao remover nível:", e);
    return res.status(500).json({ message: "erro interno do servidor" });
  }
});

module.exports = router;
