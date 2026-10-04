const produtoModelo = require('../modelos/produtoModelo');
const regraModelo = require('../modelos/regraModelo');
const simulacaoModelo = require('../modelos/simulacaoModelo');
const { calcularTributos } = require('../utilitarios/calculadoraTributaria');
const { ErroAplicacao } = require('../middlewares/erros');

const hoje = () => new Date().toISOString().slice(0, 10);

function simular({ produtoId, valor, regime, operacao }) {
  const produto = produtoModelo.buscarPorId(produtoId);
  if (!produto) throw new ErroAplicacao('Produto não encontrado.', 404);

  const resultado = calcularTributos({
    valorCentavos: Math.round(valor * 100),
    produtoId: produto.id,
    regime,
    operacao,
    data: hoje(),
    regras: regraModelo.todas(),
  });

  const id = simulacaoModelo.criar({
    produtoId: produto.id,
    valorCentavos: resultado.valorCentavos,
    regime,
    operacao,
    totalCentavos: resultado.totalCentavos,
    resultado,
  });

  return { id, produto, regimeTributario: regime, tipoOperacao: operacao, ...resultado };
}

module.exports = { simular, hoje };
