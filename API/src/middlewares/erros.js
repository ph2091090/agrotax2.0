class ErroAplicacao extends Error {
  constructor(mensagem, status = 400) {
    super(mensagem);
    this.status = status;
  }
}

function naoEncontrado(req, res) {
  res.status(404).json({ sucesso: false, erro: 'Rota não encontrada.' });
}

// eslint-disable-next-line no-unused-vars
function tratadorErros(err, req, res, next) {
  if (err.type === 'entity.parse.failed') return res.status(400).json({ sucesso: false, erro: 'JSON inválido.' });
  if (err.type === 'entity.too.large') return res.status(413).json({ sucesso: false, erro: 'Requisição grande demais.' });
  const status = err.status || 500;
  if (status === 500) console.error(err); // detalhes só no log, nunca para o usuário
  res.status(status).json({ sucesso: false, erro: status === 500 ? 'Erro interno do servidor.' : err.message });
}

module.exports = { ErroAplicacao, naoEncontrado, tratadorErros };
