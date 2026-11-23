const produtoModelo = require('../modelos/produtoModelo');
const simulacaoModelo = require('../modelos/simulacaoModelo');
const { simular } = require('../servicos/calculadoraServico');
const { validarSimulacao } = require('../utilitarios/validadores');
const { ErroAplicacao } = require('../middlewares/erros');
const { traduzirSimulacao } = require('../utilitarios/i18n');

function listarProdutos(req, res) {
  res.json({ sucesso: true, dados: produtoModelo.listarAtivos() });
}

function calcular(req, res) {
  const { erros, dados } = validarSimulacao(req.body);
  if (erros.length) throw new ErroAplicacao(erros.join(' '), 400);
  res.status(201).json({ sucesso: true, dados: traduzirSimulacao(simular(dados), req?.idioma) });
}

function buscarSimulacao(req, res) {
  const id = Number(req.params.id);
  const simulacao = Number.isInteger(id) ? simulacaoModelo.buscarPorId(id) : null;
  if (!simulacao) throw new ErroAplicacao('Simulação não encontrada.', 404);
  res.json({ sucesso: true, dados: simulacao });
}

module.exports = { listarProdutos, calcular, buscarSimulacao };
