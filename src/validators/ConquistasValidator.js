const yup = require('yup');
const mongoose = require('mongoose');

const schema = yup.object().shape({
  nome: yup
    .string()
    .min(3, 'O nome precisa de pelo menos 3 caracteres')
    .max(50, 'O nome pode ter no máximo 50 caracteres')
    .required('O nome é obrigatório'),

  descricao: yup
    .string()
    .min(5, 'A descrição precisa de pelo menos 5 caracteres')
    .max(200, 'A descrição pode ter no máximo 200 caracteres')
    .required('A descrição é obrigatória'),

  pontos: yup
    .number()
    .min(0, 'Os pontos devem ser no mínimo 0')
    .required('Os pontos são obrigatórios'),

  jogoId: yup
    .string()
    .test('is-valid-id', 'ID do jogo inválido', (value) => mongoose.Types.ObjectId.isValid(value))
    .required('O ID do jogo é obrigatório')
});

async function validarConquista(req, res, next) {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return res.status(400).json({ erros: error.errors });
  }
}

module.exports = { validarConquista };
