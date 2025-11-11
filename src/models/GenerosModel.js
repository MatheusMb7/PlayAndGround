const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    descricao: { type: String, required: true }
  }
)

const GenerosModel = mongoose.model('Generos', schema)

module.exports = GenerosModel