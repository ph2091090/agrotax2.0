// Lê o .env e entrega as configurações já tratadas para o resto do sistema.
require('dotenv').config();
const path = require('path');

const raizApi = path.resolve(__dirname, '..', '..');
const raizProjeto = path.resolve(raizApi, '..');
const producao = process.env.NODE_ENV === 'production';

const arquivo = process.env.ARQUIVO_BANCO || 'dados/agrotax.db';

const origensPadraoDev = ['http://127.0.0.1:5500', 'http://localhost:5500'];
const origensEnv = (process.env.CORS_ORIGIN || '').split(',').map((s) => s.trim()).filter(Boolean);

module.exports = {
  porta: Number(process.env.PORT) || 3000,
  producao,
  raizApi,
  raizProjeto,
  arquivoBanco: arquivo === ':memory:' ? arquivo : path.resolve(raizApi, arquivo),
  origensPermitidas: origensEnv.length ? origensEnv : producao ? [] : origensPadraoDev,
  tokenAdmin: process.env.TOKEN_ADMIN || '',
};
