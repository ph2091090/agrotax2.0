const { listarTributosVigentes } = require('../servicos/guiaServico');
const { traduzirTributos } = require('../utilitarios/i18n');

function listarTributos(req, res) {
  res.json({ sucesso: true, dados: traduzirTributos(listarTributosVigentes(), req?.idioma) });
}

module.exports = { listarTributos };
