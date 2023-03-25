function verificaElementosDoCPF(cpf) {
   return /^\d+$/.test(cpf); 
}

// Essa função segue o algoritmo de validação de CPF descrito na página oficial da Receita Federal do Brasil
function validaDigitosVerificadoresDoCPF(cpf) {
   const cpfNumerico = cpf.replace(/\D/g, '');
 
   if (cpfNumerico.length !== 11) {
     return false;
   }
 
   const digitosIguais = /^(\d)\1+$/.test(cpfNumerico);

   if (digitosIguais) return false;

   // Valida o primeiro dígito verificador
   let soma = 0;

   for (let i = 0; i < 9; i++) {
     soma += parseInt(cpfNumerico.charAt(i)) * (10 - i);
   }
 
   let digitoVerificador1 = 11 - (soma % 11);
   if (digitoVerificador1 > 9) digitoVerificador1 = 0;
 
   if (digitoVerificador1 !== parseInt(cpfNumerico.charAt(9))) return false;
 
   // Valida o segundo dígito verificador
   soma = 0;

   for (let i = 0; i < 10; i++) {
     soma += parseInt(cpfNumerico.charAt(i)) * (11 - i);
   }
 
   let digitoVerificador2 = 11 - (soma % 11);
   if (digitoVerificador2 > 9) digitoVerificador2 = 0;
   
   if (digitoVerificador2 !== parseInt(cpfNumerico.charAt(10))) return false;
 
   // Se chegou até aqui, o CPF é válido
   return true;
}

const validarEntradaDeDados = (lancamento) => {
   let entradaValida = true;
   let mensagemValidacao = "O lançamento não foi efetuado pela(s) seguinte(s) divergência(s): \n";

   if (!verificaElementosDoCPF(lancamento.cpf)) { 
      entradaValida = false;
      mensagemValidacao += "- CPF contém caracteres inválidos. \n";
   } 
   else if (!validaDigitosVerificadoresDoCPF(lancamento.cpf)) {
      entradaValida = false;
      mensagemValidacao += "- CPF contém digitos verificadores inválidos. \n";      
   }

   

   return entradaValida ? null : mensagemValidacao;
}

const recuperarSaldosPorConta = (lancamentos) => {
   const saldosPorCPF = new Map();

   for (const lancamento of lancamentos) {
      const cpf = lancamento.cpf;
      const valor = lancamento.valor;

      if (!saldosPorCPF.has(cpf)) saldosPorCPF.set(cpf, 0); 
      
      saldosPorCPF.set(cpf, saldosPorCPF.get(cpf) + valor);
   }

   // Transforma o Map saldosPorCPF em um array de objetos com formato {cpf, valor}
   const resultado = Array.from(saldosPorCPF, ([cpf, valor]) => ({cpf, valor}));

   return resultado;
}

const recuperarMaiorMenorLancamentos = (cpf, lancamentos) => {
   // For simplezao O(n)
   return []

}

const recuperarMaioresSaldos = (lancamentos) => {
   return [] // 1 for que pega tudo
}

const recuperarMaioresMedias = (lancamentos) => {

   
    return []
}