const express = require('express')
const router = express.Router()

const  ConquistasModel= require('../models/ConquistasModel')
const { validarConquista } = require('../validators/ConquistasValidator')
const { validarID } = require('../validators/IDValidator')

router.get('/conquistas', async (req, res, next) => {
  const conquistas = await ConquistasModel.find().populate(['genero','estudio','plataforma'])
  res.json(conquistas)
})

router.get('/conquistas/:id', validarID, async (req, res, next) => {
  const conquistaEncontrada = await ConquistasModel.findById(req.params.id).populate(['genero', 'estudio', 'plataforma'])
  if (!conquistaEncontrada) {
    return res.status(404).json({ erro: "Não encontrado" })
  }
  res.json(conquistaEncontrada)
})

router.post('/conquistas/', validarConquista, async (req, res, next) => {
  const conquistaCadastrada = await ConquistasModel.create(req.body)
  res.status(201).json(conquistaCadastrada)
})

router.put('/conquistas/:id', validarID, async (req, res, next) => {
  const id = req.params.id
  const dados = req.body
  const conquistaAtualizada = await ConquistasModel.findByIdAndUpdate(id, dados, { new: true })
  if (!conquistaAtualizada) {
    return res.status(404).json({ erro: "Não encontrado" })
  }
  res.json(conquistaAtualizada)
})

router.delete('/conquistas/:id', validarID, async (req, res, next) => {
  await ConquistasModel.findByIdAndDelete(req.params.id)
  res.status(204).send()
})

module.exports = router