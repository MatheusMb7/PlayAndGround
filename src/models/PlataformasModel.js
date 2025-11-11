const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    fabricante: { type: String, required: true },
    anoFundacao: { type: Number, required: true },
    site: { type: String, required: true}
  }
)

const PlataformasModel = mongoose.model('Plataformas', schema)

module.exports = PlataformasModel