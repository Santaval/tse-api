const CedulaController = require('../../controllers/Cedula');

const router = require('express').Router();

router.get('/:cedula', CedulaController.get);

module.exports = router;