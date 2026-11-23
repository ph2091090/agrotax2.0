const leadModelo = require('../modelos/leadModelo');
const { validarLead } = require('../utilitarios/validadores');
const { ErroAplicacao } = require('../middlewares/erros');

const MENSAGEM_OK = 'Mensagem enviada! Entraremos em contato.';

function registrar(corpo) {
  const { erros, dados, robo } = validarLead(corpo);
  if (robo) return { mensagem: 'Recebido.' }; // finge sucesso e NÃO salva (honeypot)
  if (erros.length) throw new ErroAplicacao(erros.join(' '), 400);
  leadModelo.criar(dados);
  return { mensagem: MENSAGEM_OK };
}

function listar() {
  return leadModelo.listar();
}

module.exports = { registrar, listar };
