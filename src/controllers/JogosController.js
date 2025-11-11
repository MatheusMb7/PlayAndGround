const express = require('express')
const router = express.Router()

const JogosModel = require('../models/JogosModel')
const { validarJogo } = require('../validators/JogosValidator')
const { validarID } = require('../validators/IDValidator')

router.get('/jogos', async (req, res, next) => {
  const jogos = await JogosModel.find().populate(['genero','estudio','plataforma'])
  res.json(jogos)
})

router.get('/jogos/:id', validarID, async (req, res, next) => {
  const jogoEncontrado = await JogosModel.findById(req.params.id).populate(['genero', 'estudio', 'plataforma'])
  if (!jogoEncontrado) {
    return res.status(404).json({ erro: "Não encontrado" })
  }
  res.json(jogoEncontrado)
})

router.post('/jogos/', validarJogo, async (req, res, next) => {
  const jogoCadastrado = await JogosModel.create(req.body)
  res.status(201).json(jogoCadastrado)
})

router.put('/jogos/:id', validarID, async (req, res, next) => {
  const id = req.params.id
  const dados = req.body
  const jogoAtualizado = await JogosModel.findByIdAndUpdate(id, dados, { new: true })
  if (!jogoAtualizado) {
    return res.status(404).json({ erro: "Não encontrado" })
  }
  res.json(jogoAtualizado)
})

router.delete('/jogos/:id', validarID, async (req, res, next) => {
  await JogosModel.findByIdAndDelete(req.params.id)
  res.status(204).send()
})

module.exports = router