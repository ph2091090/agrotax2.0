// Monta o Express (sem iniciar o servidor, para poder ser testado).
const path = require('path');
const express = require('express');
const cors = require('cors');
const { origensPermitidas, raizProjeto } = require('./config/ambiente');
const seguranca = require('./middlewares/seguranca');
const registroRequisicoes = require('./middlewares/registroRequisicoes');
const { naoEncontrado, tratadorErros } = require('./middlewares/erros');

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1); // o Render fica atrás de um proxy; sem isso o IP seria sempre o mesmo

app.use(registroRequisicoes);
app.use(seguranca);
app.use(cors({ origin: origensPermitidas.length ? origensPermitidas : false }));
app.use(express.json({ limit: '10kb' }));

app.get('/api/saude', (req, res) => res.json({ sucesso: true, dados: { status: 'ok' } }));
app.use('/api', require('./rotas/calculadoraRotas'));
app.use('/api', require('./rotas/guiaRotas'));
app.use('/api', require('./rotas/leadRotas'));
app.use('/api', naoEncontrado);

// O mesmo servidor entrega o site: uma única URL no Render.
app.use(express.static(path.join(raizProjeto, 'front-end')));

app.use(tratadorErros);

module.exports = app;
