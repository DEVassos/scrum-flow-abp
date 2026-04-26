const { randomBytes, scryptSync, timingSafeEqual } = require("crypto");

function hashPassword(password) {
  // Gera salt aleatório de 16 bytes
  const salt = randomBytes(16).toString("hex");

  // Aplica scrypt: função de derivação de chave criptográfica
  // Parâmetros: (password, salt, keyLength)
  // keyLength = 64 bytes proporciona segurança robusta
  const hash = scryptSync(password, salt, 64).toString("hex");

  // Retorna no formato "salt:hash" para fácil desempacotar
  return `${salt}:${hash}`;
}

function verifyPassword(password, storedPassword) {
  // Desempacota salt:hash
  const [salt, storedHash] = (storedPassword || "").split(":");

  // Valida se salt e hash estão presentes
  if (!salt || !storedHash) {
    return false;
  }

  // Aplica scrypt usando o salt original
  const hash = scryptSync(password, salt, 64);

  // Converte hash armazenado de hex para Buffer para comparação
  const storedHashBuffer = Buffer.from(storedHash, "hex");

  // Valida comprimento para evitar comparações inválidas
  if (hash.length !== storedHashBuffer.length) {
    return false;
  }

  // Comparação segura contra timing attacks
  // Leva o mesmo tempo independentemente de quando encontra diferença
  return timingSafeEqual(hash, storedHashBuffer);
}

module.exports = {
  hashPassword,
  verifyPassword,
};
