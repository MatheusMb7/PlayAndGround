const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    dercricao: { type: String, required: true },
    dataLancamento: { type: Date, required: true },
    genero: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Generos',
      required: true
    },
    estudio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Estudios',
      required: true
    },
    plataforma: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plataformas',
      required: true
    },
  }
)

const JogosModel = mongoose.model('Jogos', schema)

module.exports = JogosModel