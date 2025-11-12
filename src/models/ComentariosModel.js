const mongoose = require('mongoose');

const ComentarioSchema = new mongoose.Schema({
  texto: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
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

ComentarioSchema.index({ jogo: 1, createdAt: -1 });

module.exports = mongoose.model('Comentario', ComentarioSchema);