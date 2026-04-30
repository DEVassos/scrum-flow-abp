// Remove pontos, traços e espaços, deixando apenas números
function sanitizeCpf(cpf) {
  return cpf.replace(/\D/g, "");
}

// Valida se o CPF tem 11 dígitos e passa no cálculo dos dígitos verificadores
function isValidCpf(cpf) {
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
  
  let add = 0;
  for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
  let rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(9))) return false;
  
  add = 0;
  for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(cpf.charAt(10))) return false;
  
  return true;
}

module.exports = { sanitizeCpf, isValidCpf };