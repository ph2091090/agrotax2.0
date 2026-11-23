const router = require('express').Router();
const ctrl = require('../controladores/calculadoraControlador');
const limitador = require('../middlewares/limitadorRequisicoes');

router.get('/produtos', ctrl.listarProdutos);
router.post('/calculos', limitador({ maximo: 60 }), ctrl.calcular);
router.get('/calculos/:id', ctrl.buscarSimulacao);

module.exports = router;
