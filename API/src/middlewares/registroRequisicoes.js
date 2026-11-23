const crypto = require('crypto');

// Um log por requisição: id, método, rota, status e tempo. Não registra corpo (pode ter dado pessoal).
function registroRequisicoes(req, res, next) {
  const id = crypto.randomBytes(4).toString('hex');
  const inicio = process.hrtime.bigint();
  res.set('X-Request-Id', id);
  res.on('finish', () => {
    const ms = Number(process.hrtime.bigint() - inicio) / 1e6;
    console.log(`[${new Date().toISOString()}] ${id} ${req.method} ${req.originalUrl.split('?')[0]} ${res.statusCode} ${ms.toFixed(0)}ms`);
  });
  next();
}

module.exports = registroRequisicoes;
