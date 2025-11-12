const express = require('express')
const router = express.Router()

const FavoritosModel = require('../models/FavoritosModel')
const { validarFavorito } = require('../validators/FavoritosValidator')
const { validarID } = require('../validators/IDValidator')

router.get('/favoritos', async (req, res, next) => {
  const favoritos = await FavoritosModel.find().populate(['genero','estudio','plataforma'])
  res.json(favoritos)
})

router.get('/favoritos/:id', validarID, async (req, res, next) => {
  const favoritoEncontrado = await FavoritosModel.findById(req.params.id).populate(['genero', 'estudio', 'plataforma'])
  if (!favoritoEncontrado) {
    return res.status(404).json({ erro: "Não encontrado" })
  }
  res.json(favoritoEncontrado)
})

router.post('/jogos/', validarFavorito , async (req, res, next) => {
  const favoritoCadastrado = await FavoritosModel.create(req.body)
  res.status(201).json(favoritoCadastrado)
})

router.put('/jogos/:id', validarID, async (req, res, next) => {
  const id = req.params.id
  const dados = req.body
  const favoritoAtualizado = await JFavoritosModel.findByIdAndUpdate(id, dados, { new: true })
  if (!favoritoAtualizado) {
    return res.status(404).json({ erro: "Não encontrado" })
  }
  res.json(favoritoAtualizado)
})

router.delete('/jogos/:id', validarID, async (req, res, next) => {
  await FavoritosModel.findByIdAndDelete(req.params.id)
  res.status(204).send()
})

module.exports = router