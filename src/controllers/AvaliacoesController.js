const express = require('express')
const router = express.Router()

const AvaliacoesModel = require('../models/AvaliacoesModel')
const { validarAvaliacao } = require('../validators/AvaliacoesValidator')
const { validarID } = require('../validators/IDValidator')

// Listar todas as avaliações
router.get('/avaliacoes', async (req, res, next) => {
  const avaliacoes = await AvaliacoesModel.find()
    .populate(['jogo', 'usuario'])
  res.json(avaliacoes)
})

// Buscar avaliação específica
router.get('/avaliacoes/:id', validarID, async (req, res, next) => {
  const avaliacao = await AvaliacoesModel.findById(req.params.id)
    .populate(['jogo', 'usuario'])
  if (!avaliacao) {
    return res.status(404).json({ erro: 'Não encontrado' })
  }
  res.json(avaliacao)
})

// Criar nova avaliação
router.post('/avaliacoes', validarAvaliacao, async (req, res, next) => {
  const novaAvaliacao = await AvaliacoesModel.create(req.body)
  res.status(201).json(novaAvaliacao)
})

// Atualizar avaliação existente
router.put('/avaliacoes/:id', validarID, async (req, res, next) => {
  const id = req.params.id
  const dados = req.body
  const avaliacaoAtualizada = await AvaliacoesModel.findByIdAndUpdate(id, dados, { new: true })
  if (!avaliacaoAtualizada) {
    return res.status(404).json({ erro: 'Não encontrado' })
  }
  res.json(avaliacaoAtualizada)
})

// Deletar avaliação
router.delete('/avaliacoes/:id', validarID, async (req, res, next) => {
  await AvaliacoesModel.findByIdAndDelete(req.params.id)
  res.status(204).send()
})

module.exports = router