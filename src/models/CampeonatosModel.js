const mongoose = require('mongoose');

const CampeonatoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true
  },
  dataInicio: {
    type: Date,
    required: true
  },
  dataFim: {
    type: Date,
    required: true
  },
  jogo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Jogo',
    required: true
  },
  participantes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  }]
}, { timestamps: true });

CampeonatoSchema.index({ nome: 1, jogo: 1 }, { unique: true });

module.exports = mongoose.model('Campeonato', CampeonatoSchema);
