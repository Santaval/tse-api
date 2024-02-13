const CedulaModel = require('../model/Cedula');

class CedulaController {
  static async get(req, res) {
    const { cedula } = req.params;
    const info = await CedulaModel.get(cedula);
    res.send(info);
  }
}

module.exports = CedulaController;