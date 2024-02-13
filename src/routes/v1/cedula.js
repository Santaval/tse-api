const { scrapeLogic } = require('../../scrapeLogic');

const router = require('express').Router();

router.get('/cedula=:cedula', (req, res) => {
  scrapeLogic(res, req.params.cedula);
});

module.exports = router;