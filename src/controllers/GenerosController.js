const express = require('express')
const router = express.Router()

const GenerosModel = require('../models/GenerosModel')
const { validarGenero } = require('../validators/GenerosValidator')
const { validarID } = require('../validators/IDValidator')

router.get('/generos', async (req, res, next) => {
  const generos= await GenerosModel.find()
  res.json(generos)
})

router.get('/generos/:id', validarID, async (req, res, next) => {
  const generoEncontrado = await GenerosModel.findById(req.params.id)
  if (generoEncontrado) {
    return res.status(404).json({ erro: "Não encontrado" })
  }
  res.json(generoEncontrado)
})

router.post('/generos/', validarGenero, async (req, res, next) => {
  const generoCadastrado = await GenerosModel.create(req.body)
  res.status(201).json(generoCadastrado)
})

router.put('/generos/:id', validarID, async (req, res, next) => {
  const id = req.params.id
  const dados = req.body
  const generoAtualizado = await GenerosModel.findByIdAndUpdate(id, dados, { new: true })
  if (!generoAtualizado) {
    return res.status(404).json({ erro: "Não encontrado" })
  }
  res.json(generoAtualizado)
})

router.delete('/generos/:id', validarID, async (req, res, next) => {
  await GenerosModel.findByIdAndDelete(req.params.id)
  res.status(204).send()
})

module.exports = router