// Validações do servidor. O navegador também valida, mas NUNCA confiamos nele.
const { REGIMES, OPERACOES } = require('../config/constantes');

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const texto = (v) => (typeof v === 'string' ? v.trim() : '');

function validarSimulacao(corpo) {
  const { produtoId, valor, regime, operacao } = corpo || {};
  const erros = [];

  if (!Number.isInteger(produtoId) || produtoId <= 0) erros.push('Selecione um produto válido.');
  if (typeof valor !== 'number' || !Number.isFinite(valor) || valor < 0.01 || valor > 1e12)
    erros.push('Informe um valor da operação entre R$ 0,01 e R$ 1 trilhão.');
  if (!REGIMES.includes(regime)) erros.push('Regime tributário inválido.');
  if (!OPERACOES.includes(operacao)) erros.push('Tipo de operação inválido.');

  return { erros, dados: { produtoId, valor, regime, operacao } };
}

function validarLead(corpo) {
  const c = corpo || {};
  const dados = { nome: texto(c.nome), email: texto(c.email).toLowerCase(), mensagem: texto(c.mensagem) };
  const erros = [];

  if (dados.nome.length < 2 || dados.nome.length > 100) erros.push('Informe seu nome (2 a 100 caracteres).');
  if (dados.email.length > 254 || !EMAIL.test(dados.email)) erros.push('Informe um e-mail válido.');
  if (dados.mensagem.length < 5 || dados.mensagem.length > 1000) erros.push('A mensagem deve ter de 5 a 1000 caracteres.');

  // Campo "site" fica escondido na tela: pessoa de verdade não preenche, robô sim (honeypot).
  const robo = texto(c.site) !== '';
  return { erros, dados, robo };
}

module.exports = { validarSimulacao, validarLead };
