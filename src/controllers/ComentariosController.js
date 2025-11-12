const express = require('express')
const router = express.Router()

const ComentariosModel = require('../models/ComentariosModel')
const { validarComentario } = require('../validators/ComentariosValidator')
const { validarID } = require('../validators/IDValidator')

router.get('/comentarios', async (req, res, next) => {
  const comentarios = await ComentariosModel.find().populate(['genero','estudio','plataforma'])
  res.json(comentarios)
})

router.get('/comentarios/:id', validarID, async (req, res, next) => {
  const comentarioEncontrado = await ComentariosModel.findById(req.params.id).populate(['genero', 'estudio', 'plataforma'])
  if (!comentarioEncontrado) {
    return res.status(404).json({ erro: "Não encontrado" })
  }
  res.json(comentarioEncontrado)
})

router.post('/comentario/', validarComentario, async (req, res, next) => {
  const comentarioCadastrado = await ComentariosModel.create(req.body)
  res.status(201).json(comentarioCadastrado)
})

router.put('/comentario/:id', validarID, async (req, res, next) => {
  const id = req.params.id
  const dados = req.body
  const comentarioAtualizado = await ComentariosModel.findByIdAndUpdate(id, dados, { new: true })
  if (!comentarioAtualizado) {
    return res.status(404).json({ erro: "Não encontrado" })
  }
  res.json(comentarioAtualizado)
})

router.delete('/comentario/:id', validarID, async (req, res, next) => {
  await ComentariosModel.findByIdAndDelete(req.params.id)
  res.status(204).send()
})

module.exports = router