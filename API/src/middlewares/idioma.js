// Descobre o idioma pedido pelo cliente (Accept-Language) e deixa em req.idioma.
// Sem cabeçalho ou sem tradução pronta, o padrão é o português.
const { idiomaRequisicao } = require('../utilitarios/i18n');

function idioma(req, res, next) {
  req.idioma = idiomaRequisicao(req.get('accept-language'));
  next();
}

module.exports = idioma;
