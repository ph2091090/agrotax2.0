const { listarTributosVigentes } = require('../servicos/guiaServico');

function listarTributos(req, res) {
  res.json({ sucesso: true, dados: listarTributosVigentes() });
}

module.exports = { listarTributos };
