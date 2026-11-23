const banco = require('../config/conexaoBanco');

module.exports = {
  todas() {
    return banco.prepare('SELECT * FROM regras_tributarias').all();
  },
};
