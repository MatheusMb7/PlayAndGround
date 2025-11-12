const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    jogo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Jogos',
      required: true
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuarios',
      required: true
    },
    nota: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comentario: {
      type: String,
      maxlength: 500
    },
    dataAvaliacao: {
      type: Date,
      default: Date.now
    }
  }
)

const AvaliacoesModel = mongoose.model('Avaliacoes', schema)

module.exports = AvaliacoesModel
