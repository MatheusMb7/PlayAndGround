const express = require('express')
const router = express.Router()

const EstudiosModel = require('../models/EstudiosModel')
const { validarEstudio } = require('../validators/EstudiosValidator')
const { validarID } = require('../validators/IDValidator')

router.get('/estudios', async (req, res, next) => {
  const estudios = await EstudiosModel.find()
  res.json(estudios)
})

router.get('/estudios/:id', validarID, async (req, res, next) => {
  const estudioEncontrado = await EstudiosModel.findById(req.params.id)
  if (!estudioEncontrado) {
    return res.status(404).json({ erro: "Não encontrado" })
  }
  res.json(jestudioEncontrado)
})

router.post('/estudios/', validarEstudio, async (req, res, next) => {
  const estudioCadastrado = await EstudiosModel.create(req.body)
  res.status(201).json(estudioCadastrado)
})

router.put('/estudios/:id', validarID, async (req, res, next) => {
  const id = req.params.id
  const dados = req.body
  const estudiotualizado = await EstudiosModel.findByIdAndUpdate(id, dados, { new: true })
  if (!estudioAtualizado) {
    return res.status(404).json({ erro: "Não encontrado" })
  }
  res.json(estudioAtualizado)
})

router.delete('/estudios/:id', validarID, async (req, res, next) => {
  await EstudiosModel.findByIdAndDelete(req.params.id)
  res.status(204).send()
})

module.exports = router