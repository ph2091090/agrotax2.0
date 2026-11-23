// Cria as tabelas e carrega os dados iniciais. Seguro rodar várias vezes.
// Uso manual: npm run banco   (o servidor também chama isto ao iniciar)
const fs = require('fs');
const path = require('path');
const banco = require('./src/config/conexaoBanco');

function iniciarBanco() {
  for (const arquivo of ['schema.sql', 'dados_iniciais.sql']) {
    banco.exec(fs.readFileSync(path.join(__dirname, 'banco', arquivo), 'utf8'));
  }
}

module.exports = { iniciarBanco };

if (require.main === module) {
  iniciarBanco();
  const n = banco.prepare('SELECT COUNT(*) AS n FROM produtos').get().n;
  console.log(`Banco pronto. Produtos cadastrados: ${n}`);
}
