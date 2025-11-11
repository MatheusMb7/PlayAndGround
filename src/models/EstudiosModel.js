const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    pais: { type: String, required: true },
    anoFundacao: { type: Number, required: true },
    site: { type: String, required: true}
  }
)

const EstudiosModel = mongoose.model('Estudios', schema)

module.exports = EstudiosModel