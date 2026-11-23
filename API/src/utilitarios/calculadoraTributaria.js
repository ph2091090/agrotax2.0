// Motor tributário: funções puras (sem banco, sem Express). Por isso é fácil de testar.
const { ORDEM_TRIBUTOS } = require('../config/constantes');

const vigente = (regra, data) => regra.vigente_desde <= data && (!regra.vigente_ate || data <= regra.vigente_ate);
const combina = (valorRegra, desejado) => valorRegra === '*' || valorRegra === desejado;

// Escolhe a regra mais específica (produto > regime > operação); empate = a mais recente.
function escolherRegra(regras, tributo, ctx) {
  const candidatas = regras.filter(
    (r) =>
      r.tributo === tributo &&
      vigente(r, ctx.data) &&
      (r.produto_id === 0 || r.produto_id === ctx.produtoId) &&
      combina(r.regime, ctx.regime) &&
      combina(r.operacao, ctx.operacao)
  );
  const pontos = (r) => (r.produto_id !== 0 ? 4 : 0) + (r.regime !== '*' ? 2 : 0) + (r.operacao !== '*' ? 1 : 0);
  candidatas.sort((a, b) => pontos(b) - pontos(a) || b.vigente_desde.localeCompare(a.vigente_desde));
  return candidatas[0] || null;
}

// Tudo em centavos (inteiros) para não acumular erro de ponto flutuante.
function calcularTributos({ valorCentavos, produtoId, regime, operacao, data, regras }) {
  const ctx = { produtoId, regime, operacao, data };
  const tributos = ORDEM_TRIBUTOS.map((tributo) => {
    const regra = escolherRegra(regras, tributo, ctx);
    const aliquota = regra ? regra.aliquota : 0;
    return {
      tributo,
      aliquota,
      valorCentavos: Math.round((valorCentavos * aliquota) / 100),
      observacao: regra ? regra.observacao || null : 'Sem regra cadastrada',
    };
  });
  const totalCentavos = tributos.reduce((soma, t) => soma + t.valorCentavos, 0);
  return {
    valorCentavos,
    tributos,
    totalCentavos,
    liquidoCentavos: valorCentavos - totalCentavos,
    cargaTributaria: valorCentavos ? Math.round((totalCentavos / valorCentavos) * 10000) / 100 : 0,
  };
}

module.exports = { calcularTributos, escolherRegra };
