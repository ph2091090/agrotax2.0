const crypto = require('crypto');
const { tokenAdmin } = require('../config/ambiente');
const { ErroAplicacao } = require('./erros');

// Protege rotas internas com "Authorization: Bearer <TOKEN_ADMIN>".
function autenticacaoAdmin(req, res, next) {
  if (!tokenAdmin) return next(new ErroAplicacao('Área administrativa desativada.', 404));

  const enviado = (req.get('Authorization') || '').replace(/^Bearer\s+/i, '');
  const a = crypto.createHash('sha256').update(enviado).digest();
  const b = crypto.createHash('sha256').update(tokenAdmin).digest();
  // timingSafeEqual: comparação em tempo constante (evita descobrir a senha pelo tempo de resposta)
  if (!crypto.timingSafeEqual(a, b)) return next(new ErroAplicacao('Não autorizado.', 401));
  next();
}

module.exports = autenticacaoAdmin;
