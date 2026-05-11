/**
 * Remove todos os caracteres não numéricos de uma string de CPF.
 * 
 * @param {string} cpf - O CPF original (pode conter pontos, traços, etc).
 * @returns {string} Apenas os dígitos numéricos do CPF.
 */
function sanitizeCpf(cpf) {
  return cpf.replace(/\D/g, "");
}

/**
 * Valida se um CPF é matematicamente válido.
 * Verifica o comprimento, sequências repetidas e os dígitos verificadores.
 * 
 * @param {string} cpf - O CPF (somente números) a ser validado.
 * @returns {boolean} Verdadeiro se o CPF for válido, falso caso contrário.
 */
function isValidCpf(cpf) {
  // Verifica se possui 11 dígitos ou se é uma sequência de números repetidos (ex: 111.111.111-11)
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
  
  // Cálculo do primeiro dígito verificador
  let add = 0;
  for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
  let rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(9))) return false;
  
  // Cálculo do segundo dígito verificador
  add = 0;
  for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(10))) return false;
  
  return true;
}

module.exports = { sanitizeCpf, isValidCpf };