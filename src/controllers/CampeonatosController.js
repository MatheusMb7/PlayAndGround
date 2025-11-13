const Campeonato = require('../models/CampeonatosModel');
const Jogo = require('../models/JogosModel');
const { validationResult } = require('express-validator');

const { validarCampeonato } = require('../validators/CampeonatosValidator');
const { validarID } = require('../validators/IDValidator');
const { autenticar } = require('../middlewares/auth');

router.post('/jogos/:jogoId/campeonatos', autenticar, validarID('jogoId'), validarCampeonato, criar);
router.get('/jogos/:jogoId/campeonatos', validarID('jogoId'), listarPorJogo);

const criar = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ erro: 'Dados inválidos', detalhes: errors.array() });
  }

  const { nome, dataInicio, dataFim, jogoId, participantes } = req.body;

  try {
    const jogoExiste = await Jogo.exists({ _id: jogoId });
    if (!jogoExiste) {
      return res.status(404).json({ erro: 'Jogo não encontrado' });
    }

    const campeonato = await Campeonato.create({
      nome: nome.trim(),
      dataInicio,
      dataFim,
      jogo: jogoId,
      participantes,
    });

    const populated = await Campeonato.findById(campeonato._id)
      .populate('jogo', 'titulo')
      .populate('participantes', 'nickname')
      .lean();

    return res.status(201).json(populated);
  } catch (error) {
    console.error('Erro ao criar campeonato:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ erro: 'Dados inválidos', detalhes: error.errors });
    }
    return res.status(500).json({ erro: 'Erro interno ao criar campeonato' });
  }
};

const listarPorJogo = async (req, res) => {
  const { jogoId } = req.params;
  const pagina = Math.max(1, parseInt(req.query.pagina) || 1);
  const limite = 10;
  const skip = (pagina - 1) * limite;

  try {
    if (!jogoId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ erro: 'ID do jogo inválido' });
    }

    const [campeonatos, total] = await Promise.all([
      Campeonato.find({ jogo: jogoId })
        .select('nome dataInicio dataFim createdAt')
        .populate('participantes', 'nickname')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limite)
        .lean(),

      Campeonato.countDocuments({ jogo: jogoId }),
    ]);

    return res.json({
      campeonatos,
      pagina,
      totalPaginas: Math.ceil(total / limite),
      total,
      temMais: pagina < Math.ceil(total / limite),
    });
  } catch (error) {
    console.error('Erro ao listar campeonatos:', error);
    return res.status(500).json({ erro: 'Erro ao carregar campeonatos' });
  }
};

module.exports = { criar, listarPorJogo };
