const CedulaModel = require('../model/Cedula');

class CedulaController {
  static async get(req, res, next) {
    try {
      const { cedula } = req.params;
      if (!cedula || cedula.length !== 9)
        throw new Error('Cedula no válida | 400');
      const info = await CedulaModel.get(cedula);
      res.send(info);
    } catch (error) {
        next(error);
    }
  }
}

module.exports = CedulaController;
