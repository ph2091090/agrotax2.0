const leadServico = require('../servicos/leadServico');

function criar(req, res) {
  res.status(201).json({ sucesso: true, dados: leadServico.registrar(req.body) });
}

function listar(req, res) {
  res.json({ sucesso: true, dados: leadServico.listar() });
}

module.exports = { criar, listar };
