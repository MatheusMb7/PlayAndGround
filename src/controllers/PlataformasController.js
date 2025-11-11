const express = require('express')
const router = express.Router()

const PlataformasModel = require('../models/PlataformasModel')
const { validarPlataforma } = require('../validators/PlataformasValidator')
const { validarID } = require('../validators/IDValidator')

router.get('/plataformas', async (req, res, next) => {
  const plataformas = await PlataformasModel.find()
  res.json(plataformas)
})

router.get('/plataformas/:id', validarID, async (req, res, next) => {
  const plataformaEncontrada = await EPlataformasModel.findById(req.params.id)
  if (plataformaEncontrada) {
    return res.status(404).json({ erro: "Não encontrado" })
  }
  res.json(plataformaEncontrado)
})

router.post('/plataformas/', validarPlataforma, async (req, res, next) => {
  const plataformaCadastrada = await PlataformasModel.create(req.body)
  res.status(201).json(plataformaCadastrada)
})

router.put('/plataformas/:id', validarID, async (req, res, next) => {
  const id = req.params.id
  const dados = req.body
  const plataformatualizada = await PlataformasModel.findByIdAndUpdate(id, dados, { new: true })
  if (!plataformaAtualizada) {
    return res.status(404).json({ erro: "Não encontrado" })
  }
  res.json(plataformaAtualizada)
})

router.delete('/plataformas/:id', validarID, async (req, res, next) => {
  await PlataformasModel.findByIdAndDelete(req.params.id)
  res.status(204).send()
})

module.exports = router