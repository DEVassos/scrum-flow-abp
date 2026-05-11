const { randomBytes, scryptSync, timingSafeEqual } = require("crypto");

/**
 * Gera um hash seguro para uma senha utilizando o algoritmo scrypt.
 * 
 * @param {string} password - A senha em texto plano a ser hasheada.
 * @returns {string} O hash resultante no formato "salt:hash" em hexadecimal.
 */
function hashPassword(password) {
  // Gera salt aleatório de 16 bytes para garantir que hashes de senhas iguais sejam diferentes
  const salt = randomBytes(16).toString("hex");

  // Aplica scrypt: função de derivação de chave criptográfica (KDF)
  // Parâmetros: (password, salt, keyLength)
  // keyLength = 64 bytes proporciona segurança robusta contra força bruta
  const hash = scryptSync(password, salt, 64).toString("hex");

  // Retorna no formato "salt:hash" para fácil armazenamento e desempacotamento posterior
  return `${salt}:${hash}`;
}

/**
 * Verifica se uma senha corresponde a um hash armazenado.
 * 
 * @param {string} password - A senha em texto plano a ser verificada.
 * @param {string} storedPassword - O hash armazenado no formato "salt:hash".
 * @returns {boolean} Verdadeiro se a senha coincidir, falso caso contrário.
 */
function verifyPassword(password, storedPassword) {
  // Desempacota a string armazenada para obter o salt e o hash original
  const [salt, storedHash] = (storedPassword || "").split(":");

  // Valida se salt e hash estão presentes no formato esperado
  if (!salt || !storedHash) {
    return false;
  }

  // Aplica scrypt à senha fornecida usando o mesmo salt original
  const hash = scryptSync(password, salt, 64);

  // Converte o hash armazenado de hexadecimal para Buffer para comparação binária
  const storedHashBuffer = Buffer.from(storedHash, "hex");

  // Valida o comprimento dos buffers para evitar comparações de tamanhos distintos
  if (hash.length !== storedHashBuffer.length) {
    return false;
  }

  // Realiza uma comparação segura contra timing attacks (ataques de tempo)
  // O tempo de execução é constante independentemente do ponto de divergência
  return timingSafeEqual(hash, storedHashBuffer);
}

module.exports = {
  hashPassword,
  verifyPassword,
};
