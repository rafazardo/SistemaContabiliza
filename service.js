// ctrl t para dar imprimir dados
const validarEntradaDeDados = (lancamento) => {
   let entradaValida = true;
   let mensagemValidacao = "O lançamento não foi efetuado pela(s) seguinte(s) divergência(s): \n";

   // A expressão regular /^\d+$/ verifica se a string contém apenas dígitos.
   if (!/^\d+$/.test(lancamento.cpf)) { 
      entradaValida = false;
      mensagemValidacao += "- CPF contém caracteres inválidos. \n";
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