const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Servidor para obtener datos del TSE por cedula')
});

module.exports = router;