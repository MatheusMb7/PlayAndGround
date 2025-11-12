const mongoose = require('mongoose');

const AvaliacaoSchema = new mongoose.Schema({
  nota: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
    validate: { validator: Number.isInteger, msg: 'Nota deve ser um número inteiro' }
  },
  data: {
    type: Date,
    default: Date.now
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


AvaliacaoSchema.index({ jogo: 1, usuario: 1 }, { unique: true });

module.exports = mongoose.model('Avaliacao', AvaliacaoSchema);