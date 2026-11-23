// Cabeçalhos de segurança HTTP (o que a biblioteca "helmet" faria, de forma explícita).
const { producao } = require('../config/ambiente');

const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' https://fonts.googleapis.com",
  "font-src https://fonts.gstatic.com",
  "img-src 'self' data:",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

function seguranca(req, res, next) {
  res.set({
    'Content-Security-Policy': CSP,
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'no-referrer',
    'Permissions-Policy': 'geolocation=(), camera=(), microphone=()',
  });
  if (producao) res.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
}

module.exports = seguranca;
