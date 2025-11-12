const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true },
    dataCadastro: { type: Date, required: true },
    nickname: { type: String, required: true },
    
  }
)

const UsuariosModel = mongoose.model('Usuarios', schema)

module.exports = UsuariosModel