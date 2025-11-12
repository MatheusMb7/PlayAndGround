const express = require('express')
const router = express.Router()

const UsuariosModel = require('../models/UsuariosModel')
const { validarUsuario } = require('../validators/UsuariosValidator')
const { validarID } = require('../validators/IDValidator')

router.get('/usuarios', async (req, res, next) => {
  const usuarios = await JogosModel.find().populate(['genero','estudio','plataforma'])
  res.json(usuarios)
})

router.get('/usuarios/:id', validarID, async (req, res, next) => {
  const usuarioEncontrado = await UsuariossModel.findById(req.params.id).populate(['genero', 'estudio', 'plataforma'])
  if (!usuariocontrado) {
    return res.status(404).json({ erro: "Não encontrado" })
  }
  res.json(usuarioEncontrado)
})

router.post('/usuarios/', validarUsuario, async (req, res, next) => {
  const usuarioCadastrado = await UsuariosModel.create(req.body)
  res.status(201).json(usuarioCadastrado)
})

router.put('/usuarios/:id', validarID, async (req, res, next) => {
  const id = req.params.id
  const dados = req.body
  const usuarioAtualizado = await UsuariosModel.findByIdAndUpdate(id, dados, { new: true })
  if (!usuarioAtualizado) {
    return res.status(404).json({ erro: "Não encontrado" })
  }
  res.json(usuarioAtualizado)
})

router.delete('/usuarios/:id', validarID, async (req, res, next) => {
  await UsuariosModel.findByIdAndDelete(req.params.id)
  res.status(204).send()
})

module.exports = router