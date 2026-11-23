const router = require('express').Router();
const ctrl = require('../controladores/leadControlador');
const limitador = require('../middlewares/limitadorRequisicoes');
const autenticacaoAdmin = require('../middlewares/autenticacaoAdmin');

// Contato: no máximo 5 envios por hora por IP (evita spam).
router.post('/leads', limitador({ janelaMs: 3_600_000, maximo: 5 }), ctrl.criar);
router.get('/leads', autenticacaoAdmin, ctrl.listar);

module.exports = router;
