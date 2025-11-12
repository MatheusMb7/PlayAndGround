const express = require('express');
const router = express.Router({ mergeParams: true }); 


const Avaliacao = require('../models/AvaliacoesModel');
const Jogo = require('../models/JogosModel');


const { validarAvaliacao } = require('../validators/AvaliacoesValidator');
const { validarID } = require('../validators/IDValidator');


const { autenticar } = require('../middlewares/auth');


const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);


const criar = asyncHandler(async (req, res) => {
  const { nota, jogoId } = req.body;
  const usuarioId = req.user?._id;

  if (!usuarioId) {
    return res.status(401).json({ erro: 'Usuário não autenticado' });
  }

  const jogoExiste = await Jogo.exists({ _id: jogoId });
  if (!jogoExiste) {
    return res.status(404).json({ erro: 'Jogo não encontrado' });
  }

 
  const avaliacao = await Avaliacao.create({
    nota,
    jogo: jogoId,
    usuario: usuarioId,
  });

  const populated = await Avaliacao.findById(avaliacao._id)
    .populate('usuario', 'nickname')
    .populate('jogo', 'titulo')
    .lean();

  res.status(201).json(populated);
});

const listarPorJogo = asyncHandler(async (req, res) => {
  const { jogoId } = req.params;
  const pagina = Math.max(1, parseInt(req.query.pagina, 10) || 1);
  const limite = 10;
  const skip = (pagina - 1) * limite;

  const [avaliacoes, total] = await Promise.all([
    Avaliacao.find({ jogo: jogoId })
      .select('nota createdAt')
      .populate('usuario', 'nickname')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limite)
      .lean(),

    Avaliacao.countDocuments({ jogo: jogoId }),
  ]);

  const soma = avaliacoes.reduce((acc, a) => acc + a.nota, 0);
  const media = avaliacoes.length ? Number((soma / avaliacoes.length).toFixed(1)) : 0;

  res.json({
    avaliacoes,
    media,
    pagina,
    totalPaginas: Math.ceil(total / limite),
    total,
    temMais: pagina < Math.ceil(total / limite),
  });
});


router.post( '/',
  autenticar,           
  validarID('jogoId'),  
  validarAvaliacao,     
  criar
);

router.get(
  '/',
  validarID('jogoId'),  // valida :jogoId
  listarPorJogo
);

module.exports = router;