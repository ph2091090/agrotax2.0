const { porta } = require('./config/ambiente');
const { iniciarBanco } = require('../iniciarBanco');

iniciarBanco(); // garante tabelas e dados iniciais antes de aceitar requisições
const app = require('./app');

app.listen(porta, () => console.log(`AgroTax rodando em http://localhost:${porta}`));
