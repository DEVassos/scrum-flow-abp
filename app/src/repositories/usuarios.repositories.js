//criação de usuários

//importa bibliotecas banco de dados e hash string
const pool = require("../database/db");
const { randomBytes } = require("crypto");
const { hashPassword, verifyPassword } = require("../utils/password");

//insere usuário no banco
async function insertUsuario(client, nome, email, cpf, senha) {
  const certificado_hash = randomBytes(24).toString("hex");
  const senhaCodificada = hashPassword(senha);

  const result = await client.query(
    `INSERT INTO usuarios (nome,email,cpf,senha,certificado_hash)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id_usuario,nome,email,cpf,certificado_hash
        `,
    [nome, email, cpf, senhaCodificada, certificado_hash],
  );
  return result.rows[0] || null;
}

//localiza módulo
async function findPrimeiroModuloId(client) {
  const result = await client.query(
    `SELECT id_modulo 
        FROM modulos
        ORDER BY id_modulo
        LIMIT 1
        `,
  );
  return result.rows[0] || null;
}

//localiza grupo
async function findGrupoAleatorio(client, id_modulo) {
  const result = await client.query(
    `
        SELECT grupo 
        FROM questoes
        WHERE id_modulo = $1 AND grupo IS NOT NULL
        GROUP BY grupo
        ORDER BY RANDOM()
        LIMIT 1
        `,
    [id_modulo],
  );
  return result.rows[0] || null;
}

//localiza exame
async function insertExame(client, id_modulo, id_usuario, grupo, tentativa) {
  const result = await client.query(
    `INSERT INTO exames (id_modulo,id_usuario,grupo,tentativa)
            VALUES ($1, $2, $3, $4)
            RETURNING id_modulo,id_usuario,grupo,tentativa
        `,
    [id_modulo, id_usuario, grupo, tentativa],
  );
}

//cria usuário
async function createUsuario(nome, email, cpf, senha) {
  //inicializa entrada no banco
  const client = await pool.connect();
  await client.query("BEGIN");

  try {
    //testa se info de usuário é válido
    const usuario = await insertUsuario(client, nome, email, cpf, senha);

    //testa se módulo foi inicializado
    const modulo = await findPrimeiroModuloId(client);
    if (!modulo) {
      throw new Error(
        "Nenhum módulo cadastrado para inicializar exame do usuário",
      );
    }

    //testa se grupo de questões foi alocado
    const grupo = await findGrupoAleatorio(client, modulo.id_modulo);
    if (!grupo) {
      throw new Error(
        "Nenhum grupo de questões cadastrado para inicialização do exame do usuário",
      );
    }

    //testa se exame foi criado
    const exame = await insertExame(
      client,
      modulo.id_modulo,
      usuario.id_usuario,
      grupo.grupo,
      1,
    );

    //após validação, finaliza criação do usuário
    await client.query("COMMIT");
    return {
      id_usuario: usuario.id_usuario,
      nome: usuario.id_usuario,
      email: usuario.email,
      cpf: usuario.cpf,
    };
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

//atualiza CPF do usuário
async function updateUsuarioCpf(id_usuario, cpf) {
  const result = await pool.query(
    `
        UPDATE usuarios
        SET cpf = $1
        WHERE id_usuario = $2
        RETURNING id_usuario
        `,
    [cpf, id_usuario],
  );
  return result.rows[0] || null;
}

//atualiza NOME do usuário
async function updateUsuarioNome(id_usuario, nome) {
  const result = await pool.query(
    `
        UPDATE usuarios
        SET nome = $1
        WHERE id_usuario = $2
        RETURNING id_usuario
        `,
    [nome, id_usuario],
  );
  return result.rows[0] || null;
}

//atualiza EMAIL do usuário
async function updateUsuarioMail(id_usuario, email) {
  const result = await pool.query(
    `
        UPDATE usuarios
        SET email = $1
        WHERE id_usuario = $2
        RETURNING id_usuario
        `,
    [email, id_usuario],
  );
  return result.rows[0] || null;
}

//atualiza SENHA do usuário
async function updateUsuarioSenha(id_usuario, senha) {
  const senhaCodificada = hashPassword(senha);
  const result = await pool.query(
    `
        UPDATE usuarios
        SET senha = $1
        WHERE id_usuario = $2
        RETURNING id_usuario
        `,
    [senhaCodificada, id_usuario],
  );
  return result.rows[0] || null;
}

//localiza usuário por ID
async function findUsuarioById(id_usuario) {
  const result = await pool.query(
    `
        SELECT id_usuario, nome, email, cpf
        FROM usuarios
        WHERE id_usuario = $1
        `,
    [id_usuario],
  );
  return result.rows[0] || null;
}

//localiza usuário por login
async function findUsuarioByCpfAndSenha(cpf, senha) {
  const result = await pool.query(
    `
        SELECT id_usuario, nome, email, cpf, senha
        FROM usuarios
        WHERE cpf = $1
        `,
    [cpf],
  );
  const usuario = result.rows[0];
  if (!usuario) {
    throw new Error("Usuário inexistente");
  }

  const senhaValida = verifyPassword(senha, usuario.senha);
  if (!senhaValida) {
    throw new Error("Dados de login incorretos");
  }

  return {
    id_usuario: usuario.id_usuario,
    nome: usuario.nome,
    email: usuario.email,
    cpf: usuario.cpf,
  };
}

// ========== Recriação automática de exame inicial ==========

/**
 * Verifica se o usuário tem pelo menos um exame registrado
 * @param {number} id_usuario
 * @returns {Promise<boolean>}
 */
async function usuarioTemExame(id_usuario) {
  const result = await pool.query(
    `SELECT COUNT(*) as total FROM exames WHERE id_usuario = $1`,
    [id_usuario],
  );
  return parseInt(result.rows[0].total) > 0;
}

/**
 * Recria o exame inicial para um usuário que está sem nenhum exame
 * (caso de remoção manual do banco ou inconsistência)
 * @param {number} id_usuario
 * @returns {Promise<{id_modulo: number, grupo: number, tentativa: number}>}
 */
async function recriarExameInicial(id_usuario) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1. Verifica se o usuário existe
    const usuario = await findUsuarioById(id_usuario);
    if (!usuario) {
      throw new Error(`Usuário ${id_usuario} não encontrado`);
    }

    // 2. Busca o primeiro módulo (id_modulo mais baixo)
    const modulo = await findPrimeiroModuloId(client);
    if (!modulo) {
      throw new Error("Nenhum módulo cadastrado no sistema");
    }

    // 3. Sorteia um grupo de questões para o módulo
    const grupo = await findGrupoAleatorio(client, modulo.id_modulo);
    if (!grupo) {
      throw new Error(
        `Nenhum grupo de questões encontrado para o módulo ${modulo.id_modulo}`,
      );
    }

    // 4. Verifica quantas tentativas o usuário já teve para este módulo
    const tentativaResult = await client.query(
      `SELECT COALESCE(MAX(tentativa), 0) + 1 as proxima_tentativa
             FROM exames 
             WHERE id_usuario = $1 AND id_modulo = $2`,
      [id_usuario, modulo.id_modulo],
    );
    const tentativa = parseInt(tentativaResult.rows[0].proxima_tentativa);

    // 5. Cria o novo exame
    const exameResult = await client.query(
      `INSERT INTO exames (id_modulo, id_usuario, grupo, tentativa)
             VALUES ($1, $2, $3, $4)
             RETURNING id_exame, id_modulo, grupo, tentativa`,
      [modulo.id_modulo, id_usuario, grupo.grupo, tentativa],
    );

    await client.query("COMMIT");

    console.log(
      `[T05] Exame recriado para usuário ${id_usuario}:`,
      exameResult.rows[0],
    );
    return exameResult.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(
      `[T05] Erro ao recriar exame para usuário ${id_usuario}:`,
      error.message,
    );
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Garante que o usuário tenha um exame inicial (verifica e recria se necessário)
 * Função principal a ser chamada antes de qualquer operação que precise do exame
 * @param {number} id_usuario
 * @returns {Promise<{recriou: boolean, exame: object | null}>}
 */
async function ensureExameInicial(id_usuario) {
  const temExame = await usuarioTemExame(id_usuario);

  if (!temExame) {
    console.log(`[T05] Usuário ${id_usuario} sem exames. Recriando...`);
    const novoExame = await recriarExameInicial(id_usuario);
    return { recriou: true, exame: novoExame };
  }

  return { recriou: false, exame: null };
}

module.exports = {
  createUsuario,
  updateUsuarioCpf,
  updateUsuarioNome,
  updateUsuarioMail,
  updateUsuarioSenha,
  findUsuarioById,
  findUsuarioByCpfAndSenha,
  usuarioTemExame,
  recriarExameInicial,
  ensureExameInicial,
};
