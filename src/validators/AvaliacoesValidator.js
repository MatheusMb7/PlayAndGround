const yup = require('yup')
const mongoose = require('mongoose')

const schema = yup.object().shape({
  jogo: yup.string().required('O jogo é obrigatório').test(
    'id-validator',
    'ID do jogo é inválido',
    value => mongoose.Types.ObjectId.isValid(value)
  ),
  usuario: yup.string().required('O usuário é obrigatório').test(
    'id-validator',
    'ID do usuário é inválido',
    value => mongoose.Types.ObjectId.isValid(value)
  ),
  nota: yup.number()
    .required('A nota é obrigatória')
    .min(1, 'A nota mínima é 1')
    .max(5, 'A nota máxima é 5'),
  comentario: yup.string()
    .max(500, 'O comentário pode ter no máximo 500 caracteres')
})

async function validarAvaliacao(req, res, next) {
  try {
    await schema.validate(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json({ erros: error.errors })
  }
}

module.exports = { validarAvaliacao }