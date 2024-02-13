const CedulaModel = require('../model/Cedula');

class CedulaController {
  static async get(req, res) {
    const { cedula } = req.params;
    if (!cedula || cedula.length !== 9) throw new Error('Cedula no válida | 400');
    const info = await CedulaModel.get(cedula);
    res.send(info);
  }
}

module.exports = CedulaController;