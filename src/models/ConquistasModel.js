const mongoose = require('mongoose');

const ConquistaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true
  },
  descricao: {
    type: String,
    required: true,
    trim: true
  },
  pontos: {
    type: Number,
    required: true,
    min: 0
  },
  jogo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Jogo',
    required: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }
}, { timestamps: true });


ConquistaSchema.index({ jogo: 1, usuario: 1, nome: 1 }, { unique: true });

module.exports = mongoose.model('Conquista', ConquistaSchema);
