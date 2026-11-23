const banco = require('../config/conexaoBanco');

module.exports = {
  listarAtivos() {
    return banco.prepare('SELECT id, nome, ncm FROM produtos WHERE ativo = 1 ORDER BY nome').all();
  },
  buscarPorId(id) {
    return banco.prepare('SELECT id, nome, ncm FROM produtos WHERE id = ? AND ativo = 1').get(id);
  },
};
