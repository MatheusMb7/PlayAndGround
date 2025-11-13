const Conquista = require('../models/ConquistasModel');
const Jogo = require('../models/JogosModel');
const Usuario = require('../models/UsuariosModel');

const { validationResult } = require('express-validator');
const { validarConquista } = require('../validators/ConquistasValidator');
const { validarID } = require('../validators/IDValidator');
const { autenticar } = require('../middlewares/auth');


const criar = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ erro: 'Dados inválidos', detalhes: errors.array() });
  }

  const { nome, descricao, pontos, jogoId } = req.body;
  const usuarioId = req.user?._id;

  if (!usuarioId) {
    return res.status(401).json({ erro: 'Usuário não autenticado' });
  }

  try {
    // Verifica se o jogo existe
    const jogoExiste = await Jogo.exists({ _id: jogoId });
    if (!jogoExiste) {
      return res.status(404).json({ erro: 'Jogo não encontrado' });
    }

    // Cria a conquista
    const conquista = await Conquista.create({
      nome: nome.trim(),
      descricao: descricao.trim(),
      pontos,
      jogo: jogoId,
      usuario: usuarioId,
    });

    // Popula com os dados do jogo e usuário
    const populated = await Conquista.findById(conquista._id)
      .populate('usuario', 'nickname')
      .populate('jogo', 'titulo')
      .lean();

    return res.status(201).json(populated);
  } catch (error) {
    console.error('Erro ao criar conquista:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ erro: 'Dados inválidos', detalhes: error.errors });
    }
    return res.status(500).json({ erro: 'Erro interno ao criar conquista' });
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

    const [conquistas, total] = await Promise.all([
      Conquista.find({ jogo: jogoId })
        .select('nome descricao pontos createdAt')
        .populate('usuario', 'nickname')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limite)
        .lean(),

      Conquista.countDocuments({ jogo: jogoId }),
    ]);

    return res.json({
      conquistas,
      pagina,
      totalPaginas: Math.ceil(total / limite),
      total,
      temMais: pagina < Math.ceil(total / limite),
    });
  } catch (error) {
    console.error('Erro ao listar conquistas:', error);
    return res.status(500).json({ erro: 'Erro ao carregar conquistas' });
  }
};

module.exports = { criar, listarPorJogo };
