const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    dataLancamento: { type: Date, required: true },
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

const FavoritosModel = mongoose.model('Favoritos', schema)

module.exports = FavoritosModel