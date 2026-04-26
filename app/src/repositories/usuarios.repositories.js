const pool = require('../database/db');
const { randomBytes } = require('crypto');
const { hashPassword, verifyPassword } = require('../utils/password');

// Insere um novo usuário no banco de dados
async function insertUsuario(client, nome, email, cpf, senha) {
  // Gera hash único para certificação do usuário (24 bytes = 48 caracteres hex)
  const certificado_hash = randomBytes(24).toString('hex');

  // Codifica a senha com salt único usando scrypt
  const senhaCodificada = hashPassword(senha);

  // Insere usuário e retorna dados inseridos
  const result = await client.query(
    `INSERT INTO usuarios (nome, email, cpf, senha, certificado_hash)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id_usuario, nome, email, cpf, certificado_hash`,
    [nome, email, cpf, senhaCodificada, certificado_hash]
  );

  return result.rows[0] || null;
}

// Busca o ID do primeiro módulo disponível (por ordem de ID)
async function findPrimeiroModuloId(client) {
  const result = await client.query(
    `SELECT id_modulo FROM modulos ORDER BY id_modulo ASC LIMIT 1`
  );
  return result.rows[0] || null;
}

// Busca um grupo de questões aleatório de um módulo
async function findGrupoAleatorio(client, idModulo) {
  const result = await client.query(
    `SELECT grupo
    FROM questoes
    WHERE id_modulo = $1 AND grupo IS NOT NULL
    GROUP BY grupo
    ORDER BY RANDOM()
    LIMIT 1`,
    [idModulo]
  );

  return result.rows[0] || null;
}

//Insere um novo exame para o usuário (prova inicial)
async function insertExame(client, idModulo, idUsuario, grupo, tentativa) {
  await client.query(
    `INSERT INTO exames (id_modulo, id_usuario, grupo, tentativa)
     VALUES ($1, $2, $3, $4)
     RETURNING id_exame`,
    [idModulo, idUsuario, grupo, tentativa],
  );
}

// Cria um novo usuário com configuração inicial (transação)
async function createUsuario(nome, email, cpf, senha) {
  // Obtém uma conexão do pool para usar na transação
  const client = await pool.connect();

  try {
    // Inicia transação (agrupa operações em uma unidade atômica)
    await client.query('BEGIN');

    // 1. Cria o novo usuário
    const usuario = await insertUsuario(client, nome, email, cpf, senha);

    // 2. Busca o primeiro módulo disponível
    const modulo = await findPrimeiroModuloId(client);
    if (!modulo) {
      throw new Error("Nenhum módulo encontrado para inicializar exame do usuário");
    }

    // 3. Seleciona um grupo de questões aleatório
    const grupo = await findGrupoAleatorio(client, modulo.id_modulo);
    if (!grupo) {
      throw new Error("Nenhum grupo encontrado para inicializar exame do usuário");
    }

    // 4. Cria exame inicial para o usuário
    await insertExame(
      client,
      modulo.id_modulo,
      usuario.id_usuario,
      grupo.grupo,
      1 // primeira tentativa
    );

    // Confirma a transação (faz o COMMIT de todas as operações)
    await client.query("COMMIT");

    // Retorna dados do usuário criado (sem senha)
    return {
      id_usuario: usuario.id_usuario,
      nome: usuario.nome,
      email: usuario.email,
      cpf: usuario.cpf
    };
  } catch (e) {
    // Em caso de erro, desfaz todas as operações (ROLLBACK)
    client.query('ROLLBACK');
    throw e;
  } finally {
    // Sempre libera a conexão de volta ao pool
    client.release();
  }
}

// Atualiza o CPF de um usuário
async function updateUsuarioCpf(idUsuario, cpf) {
  const result = await pool.query(
    `UPDATE usuarios
       SET cpf = $1
       WHERE id_usuario = $2
       RETURNING id_usuario`,
    [cpf, idUsuario]
  );
  return result.rows[0] || null;
}

// Atualiza o nome de um usuário
async function updateUsuarioNome(idUsuario, nome) {
  const result = await pool.query(
    `UPDATE usuarios
       SET nome = $1
       WHERE id_usuario = $2
       RETURNING id_usuario`,
    [nome, idUsuario]
  );
  return result.rows[0] || null;
}

// Atualiza o email de um usuário

async function updateUsuarioEmail(idUsuario, email) {
  const result = await pool.query(
    `UPDATE usuarios
       SET email = $1
       WHERE id_usuario = $2
       RETURNING id_usuario`,
    [email, idUsuario]
  );
  return result.rows[0] || null;
}

// Atualiza a senha de um usuário (com hash)
async function updateUsuarioSenha(idUsuario, senha) {
  // Codifica a nova senha com scrypt
  const senhaCodificada = hashPassword(senha);

  const result = await pool.query(
    `UPDATE usuarios
       SET senha = $1
       WHERE id_usuario = $2
       RETURNING id_usuario`,
    [senhaCodificada, idUsuario]
  );
  return result.rows[0] || null;
}

// Busca um usuário por ID

async function findUsuarioById(idUsuario) {
  const result = await pool.query(
    `SELECT id_usuario, nome, email, cpf
     FROM usuarios
     WHERE id_usuario = $1`,
    [idUsuario]
  );
  return result.rows[0] || null;
}

// Autenticação: busca e valida usuário por CPF e senha
async function findUsuarioByCpfAndSenha(cpf, senha) {
  // Busca usuário pelo CPF (junto com hash de senha para validar)
  const result = await pool.query(
    `SELECT id_usuario, nome, email, cpf, senha
     FROM usuarios
     WHERE cpf = $1`,
    [cpf]
  );

  const usuario = result.rows[0];

  // Valida se usuário existe
  if (!usuario) {
    throw new Error("Usuário não encontrado");
  }

  // Valida se a senha corresponde ao hash armazenado
  const senhaValida = verifyPassword(senha, usuario.senha);
  if (!senhaValida) {
    throw new Error("Senha incorreta");
  }

  // Retorna dados do usuário (sem expor a senha)
  return {
    id_usuario: usuario.id_usuario,
    nome: usuario.nome,
    email: usuario.email,
    cpf: usuario.cpf
  };
}

module.exports = {
  createUsuario,
  updateUsuarioCpf,
  updateUsuarioNome,
  updateUsuarioEmail,
  updateUsuarioSenha,
  findUsuarioById,
  findUsuarioByCpfAndSenha
};