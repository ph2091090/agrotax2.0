// Valores aceitos pela calculadora e textos do Guia Fiscal.
const REGIMES = ['Lucro Presumido', 'Lucro Real', 'Simples Nacional', 'Produtor Rural PF'];
const OPERACOES = ['Compra', 'Venda'];
const ORDEM_TRIBUTOS = ['ICMS', 'IPI', 'PIS', 'COFINS', 'FUNRURAL', 'SENAR'];

const INFO_TRIBUTOS = {
  ICMS: { rotulo: 'ICMS', descricao: 'Tributo considerado pelo sistema conforme a alíquota cadastrada para o produto.' },
  IPI: { rotulo: 'IPI', descricao: 'Incluído no cálculo quando existe alíquota correspondente cadastrada.' },
  PIS: { rotulo: 'PIS', descricao: 'Contribuição calculada conforme o regime tributário informado.' },
  COFINS: { rotulo: 'COFINS', descricao: 'Contribuição calculada conforme o regime tributário informado.' },
  FUNRURAL: { rotulo: 'Funrural', descricao: 'Percentual cadastrado para a simulação de operações de venda do produtor rural.' },
  SENAR: { rotulo: 'SENAR', descricao: 'Considerado de acordo com o regime utilizado pelo sistema.' },
};

module.exports = { REGIMES, OPERACOES, ORDEM_TRIBUTOS, INFO_TRIBUTOS };
