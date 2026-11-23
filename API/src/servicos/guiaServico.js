const regraModelo = require('../modelos/regraModelo');
const { ORDEM_TRIBUTOS, INFO_TRIBUTOS } = require('../config/constantes');
const { hoje } = require('./calculadoraServico');

// Para cada tributo: descrição + menor e maior alíquota entre as regras vigentes hoje.
function listarTributosVigentes() {
  const data = hoje();
  const vigentes = regraModelo.todas().filter((r) => r.vigente_desde <= data && (!r.vigente_ate || data <= r.vigente_ate));

  return ORDEM_TRIBUTOS.map((tributo) => {
    const aliquotas = vigentes.filter((r) => r.tributo === tributo).map((r) => r.aliquota);
    return {
      tributo,
      rotulo: INFO_TRIBUTOS[tributo].rotulo,
      descricao: INFO_TRIBUTOS[tributo].descricao,
      aliquotaMinima: aliquotas.length ? Math.min(...aliquotas) : null,
      aliquotaMaxima: aliquotas.length ? Math.max(...aliquotas) : null,
    };
  });
}

module.exports = { listarTributosVigentes };
