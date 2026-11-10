const leadServico = require('../servicos/leadServico');
const { traduzir } = require('../utilitarios/i18n');

function criar(req, res) {
  const dados = leadServico.registrar(req.body);
  res.status(201).json({ sucesso: true, dados: { ...dados, mensagem: traduzir(dados.mensagem, req?.idioma) } });
}

function listar(req, res) {
  res.json({ sucesso: true, dados: leadServico.listar() });
}

module.exports = { criar, listar };
