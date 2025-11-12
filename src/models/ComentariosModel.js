const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    texto: { type: String, required: true },
    data: { type: Date, required: true },
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
    plataforma: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Plataformas',
      required: true
    },
  }
)

const ComentariosModel = mongoose.model('Comentarios', schema)

module.exports = ComentariosModel