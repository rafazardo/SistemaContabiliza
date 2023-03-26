function validarElementosDoCPF(cpf) {
   return /^\d+$/.test(cpf);  // A expressão regular /^\d+$/ verifica se a string contém apenas dígitos.
}

// Essa função segue o algoritmo de validação de CPF descrito na página oficial da Receita Federal do Brasil
function validarDigitosVerificadoresDoCPF(cpf) {
   const cpfNumerico = cpf.replace(/\D/g, '');

   if (cpfNumerico.length !== 11) return false;

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

function validarTipoDoValor(valor) {
   // O operador typeof retorna 'number' para NaN, por isso é necessário usar o método isNaN.
   return typeof valor === 'number' && !isNaN(valor); 
}

function validarValorMaximo(valor) {
   return valor <= 15000.00;
}

function validarValorMinimo(valor) {
   return valor >= -2000.00;
}

function calcularSaldoPorCPF(lancamentos) {
   const saldosPorCPF = new Map();

   for (const lancamento of lancamentos) {
      const cpf = lancamento.cpf;
      const valor = lancamento.valor;

      if (!saldosPorCPF.has(cpf)) saldosPorCPF.set(cpf, 0); 

      saldosPorCPF.set(cpf, saldosPorCPF.get(cpf) + valor);
   }

   return saldosPorCPF;
}

const encontrarMenorMaiorValorPorCpf = (cpf, lancamentos) => {
   const lancamentosPorCpf = new Map();

   for (let lancamento of lancamentos) {
      if (lancamento.cpf === cpf) {
         const valor = lancamento.valor;
         // Se o CPF não tiver sido registrado anteriormente, valores iniciais infinitos são usados para que possam ser atualizados durante o loop.
         const [menorValor, maiorValor] = lancamentosPorCpf.has(cpf) ? lancamentosPorCpf.get(cpf) : [Infinity, -Infinity];

         lancamentosPorCpf.set(cpf, [Math.min(menorValor, valor), Math.max(maiorValor, valor)]);
         }
   }

   return lancamentosPorCpf.get(cpf);
}

function ordenarPorMaiorValor(mapa) {
   // Transforma o mapa em um array de pares chave-valor, onde cada par é representado por um array interno contendo o cpf e o valor correspondente
   return [...mapa.entries()] 
      .sort(([, valorA], [, valorB]) => valorB - valorA)
      .slice(0, 3) 
      .map(([cpf, valor]) => ({ cpf, valor }));
}

function calcularMediasPorCPF(lancamentos) {
   const saldosPorCPF = calcularSaldoPorCPF(lancamentos);
   const mediasPorCPF = new Map();

   for (const [cpf, saldo] of saldosPorCPF.entries()) {
      const numLancamentos = lancamentos.filter((lancamento) => lancamento.cpf === cpf).length;
      const media = saldo / numLancamentos;
      
      mediasPorCPF.set(cpf, media);
   }

   return mediasPorCPF;
}

const validarEntradaDeDados = (lancamento) => {
   let entradaValida = true;
   let mensagemValidacao = "O lançamento não foi efetuado pela(s) seguinte(s) divergência(s):\n";

   if (!validarElementosDoCPF(lancamento.cpf)) { 
      entradaValida = false;
      mensagemValidacao += "- CPF contém caracteres inválidos.\n";
   } else if (!validarDigitosVerificadoresDoCPF(lancamento.cpf)) {
      entradaValida = false;
      mensagemValidacao += "- CPF contém digitos verificadores inválidos.\n";      
   }

   if (!validarTipoDoValor(lancamento.valor)) {
      entradaValida = false;
      mensagemValidacao += "- Valor contém caracteres não numéricos.\n"; 
   }

   if (!validarValorMaximo(lancamento.valor)) {
      entradaValida = false;
      mensagemValidacao += "- Valor ultrapassou o máximo de 15000,00.\n";  
   }

   if (!validarValorMinimo(lancamento.valor)) {
      entradaValida = false;
      mensagemValidacao += "- Valor ultrapassou o mínimo de -2000,00.\n";  
   }   

   return entradaValida ? null : mensagemValidacao;
}

const recuperarSaldosPorConta = (lancamentos) => {
   const saldosPorCPF = calcularSaldoPorCPF(lancamentos);

   // Transforma o Map saldosPorCPF em um array de objetos com formato {cpf, valor}
   const saldosPorConta = Array.from(saldosPorCPF, ([cpf, valor]) => ({cpf, valor})); 

   return saldosPorConta;
}

const recuperarMaiorMenorLancamentos = (cpf, lancamentos) => {
   const [menorValor, maiorValor] = encontrarMenorMaiorValorPorCpf(cpf, lancamentos) ?? [null, null];

   if (menorValor !== null && maiorValor !== null) return [{ cpf, valor: menorValor }, { cpf, valor: maiorValor }];
   else return [];
}

const recuperarMaioresSaldos = (lancamentos) => {
   const saldosPorCPF = calcularSaldoPorCPF(lancamentos);
  
   const maioresSaldos = ordenarPorMaiorValor(saldosPorCPF);
  
   return maioresSaldos;
}
 
function recuperarMaioresMedias(lancamentos) {
   const mediasPorCPF = calcularMediasPorCPF(lancamentos);

   const maioresMedias = ordenarPorMaiorValor(mediasPorCPF);

   return maioresMedias;
}

 
 
 
 
 
 