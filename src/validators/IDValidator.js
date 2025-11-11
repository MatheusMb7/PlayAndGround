const mongoose = require('mongoose')

// Middlware que valida se o ID está no formato
// que o mongo espera
function validarID(req, res, next) {
  const id = req.params.id
  const valido = mongoose.Types.ObjectId.isValid(id)
  if (!valido) {
    return res.status(400).json({ erro: "ID inválido!" })
  }
  next()
}

// exportar
module.exports = {
  validarID
}