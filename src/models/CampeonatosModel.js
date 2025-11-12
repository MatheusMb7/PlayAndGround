const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    dataInicio: { type: Date, required: true },
    DataFim: { type: Date, required: true },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuarios',
      required: true
    },
    jogo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Jogos',
      required: true
    },
    plataforma: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plataformas',
      required: true
    },
  }
)

const CampeonatosModel = mongoose.model('Campeonatos', schema)

module.exports = CampeonatosModel