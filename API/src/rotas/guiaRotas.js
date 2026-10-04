const router = require('express').Router();
const ctrl = require('../controladores/guiaControlador');

router.get('/tributos', ctrl.listarTributos);

module.exports = router;
