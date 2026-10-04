// Limitador simples em memória por IP (suficiente para uma única instância).
function limitadorRequisicoes({ janelaMs = 60_000, maximo = 60 } = {}) {
  const contagem = new Map();
  setInterval(() => contagem.clear(), janelaMs).unref();

  return (req, res, next) => {
    const total = (contagem.get(req.ip) || 0) + 1;
    contagem.set(req.ip, total);
    if (total > maximo) {
      res.set('Retry-After', String(Math.ceil(janelaMs / 1000)));
      return res.status(429).json({ sucesso: false, erro: 'Muitas requisições. Aguarde um instante.' });
    }
    next();
  };
}

module.exports = limitadorRequisicoes;
