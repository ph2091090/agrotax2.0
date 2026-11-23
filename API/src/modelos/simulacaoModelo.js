const banco = require('../config/conexaoBanco');

module.exports = {
  criar({ produtoId, valorCentavos, regime, operacao, totalCentavos, resultado }) {
    const info = banco
      .prepare(
        `INSERT INTO simulacoes (produto_id, valor_centavos, regime, operacao, total_centavos, resultado_json)
         VALUES (?, ?, ?, ?, ?, ?)`
      )
      .run(produtoId, valorCentavos, regime, operacao, totalCentavos, JSON.stringify(resultado));
    return Number(info.lastInsertRowid);
  },
  buscarPorId(id) {
    const linha = banco.prepare('SELECT * FROM simulacoes WHERE id = ?').get(id);
    return linha ? { ...linha, resultado: JSON.parse(linha.resultado_json) } : null;
  },
};
