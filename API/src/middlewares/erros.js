const { traduzir } = require('../utilitarios/i18n');

class ErroAplicacao extends Error {
  constructor(mensagem, status = 400) {
    super(mensagem);
    this.status = status;
  }
}

function naoEncontrado(req, res) {
  res.status(404).json({ sucesso: false, erro: traduzir('Rota não encontrada.', req?.idioma) });
}

// eslint-disable-next-line no-unused-vars
function tratadorErros(err, req, res, next) {
  if (err.type === 'entity.parse.failed')
    return res.status(400).json({ sucesso: false, erro: traduzir('JSON inválido.', req?.idioma) });
  if (err.type === 'entity.too.large')
    return res.status(413).json({ sucesso: false, erro: traduzir('Requisição grande demais.', req?.idioma) });
  const status = err.status || 500;
  if (status === 500) console.error(err); // detalhes só no log, nunca para o usuário
  res
    .status(status)
    .json({ sucesso: false, erro: traduzir(status === 500 ? 'Erro interno do servidor.' : err.message, req?.idioma) });
}

module.exports = { ErroAplicacao, naoEncontrado, tratadorErros };
