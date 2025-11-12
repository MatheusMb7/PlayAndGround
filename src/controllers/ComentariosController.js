const Comentario = require('../models/ComentariosModel');
 

const Jogo = require('../models/JogosModel'); 
const { validationResult } = require('express-validator');


const { validarComentario } = require('../validators/ComentariosValidator');
const { validarID } = require('../validators/IDValidator');
const { autenticar } = require('../middlewares/auth');

router.post('/jogos/:jogoId/comentarios', autenticar, validarID('jogoId'), validarComentario, criar);
router.get('/jogos/:jogoId/comentarios', validarID('jogoId'), listarPorJogo);

const criar = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ erro: 'Dados inválidos', detalhes: errors.array() });
  }

  const { texto, jogoId } = req.body;
  const usuarioId = req.user?._id; 

  if (!usuarioId) {
    return res.status(401).json({ erro: 'Usuário não autenticado' });
  }

  try {
    
    const jogoExiste = await Jogo.exists({ _id: jogoId });
    if (!jogoExiste) {
      return res.status(404).json({ erro: 'Jogo não encontrado' });
    }

  
    const comentario = await Comentario.create({
      texto: texto.trim(),
      jogo: jogoId,
      usuario: usuarioId,
    });

    const populated = await Comentario.findById(comentario._id)
      .populate('usuario', 'nickname')
      .populate('jogo', 'titulo')
      .lean(); 

    return res.status(201).json(populated);
  } catch (error) {
    console.error('Erro ao criar comentário:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ erro: 'Dados inválidos', detalhes: error.errors });
    }
    return res.status(500).json({ erro: 'Erro interno ao criar comentário' });
  }
};


const listarPorJogo = async (req, res) => {
  const { jogoId } = req.params;
  const pagina = Math.max(1, parseInt(req.query.pagina) || 1);
  const limite = 10;
  const skip = (pagina - 1) * limite;

  try {
    // Valida formato do ID (opcional: use middleware validarID)
    if (!jogoId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ erro: 'ID do jogo inválido' });
    }

    const [comentarios, total] = await Promise.all([
      Comentario.find({ jogo: jogoId })
        .select('texto createdAt') // Seleciona apenas campos necessários
        .populate('usuario', 'nickname')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limite)
        .lean(),

      Comentario.countDocuments({ jogo: jogoId }),
    ]);

    return res.json({
      comentarios,
      pagina,
      totalPaginas: Math.ceil(total / limite),
      total,
      temMais: pagina < Math.ceil(total / limite),
    });
  } catch (error) {
    console.error('Erro ao listar comentários:', error);
    return res.status(500).json({ erro: 'Erro ao carregar comentários' });
  }
};

module.exports = { criar, listarPorJogo };