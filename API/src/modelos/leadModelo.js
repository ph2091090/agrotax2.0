const banco = require('../config/conexaoBanco');

module.exports = {
  criar({ nome, email, mensagem }) {
    const info = banco.prepare('INSERT INTO leads (nome, email, mensagem) VALUES (?, ?, ?)').run(nome, email, mensagem);
    return Number(info.lastInsertRowid);
  },
  listar(limite = 100) {
    return banco.prepare('SELECT id, nome, email, mensagem, criado_em FROM leads ORDER BY id DESC LIMIT ?').all(limite);
  },
};
