const yup = require('yup')
const mongoose = require('mongoose')

const schema = yup.object().shape(
  {
    nome: yup.string()
    .min(3, "o nome precisa de pelo menos 3 caracteres")
    .max(50, "O nome precisa de no máximo 50 caracteres")
    .required("nome é obrigatório"),
    descricao: yup.string()
    .min(3, "A descroção precisa de pelo menos 3 caracteres")
    .max(300, "A descroção pode ter no máximo 300 caracteres")
    .required("A descroção é obrigatório")
  }
)

async function validarGenero(req, res, next) {
  try {
    await schema.validate(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json({ erros: error.errors })
  }
}

module.exports = { validarGenero }