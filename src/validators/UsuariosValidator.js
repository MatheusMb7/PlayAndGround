const yup = require('yup')
const mongoose = require('mongoose')

const schema = yup.object().shape(
  {
    nome: yup.string()
    .min(3, "O nome precisa de pelo menos 3 caracteres")
    .max(50, "O nome precisa de no máximo 50 caracteres")
    .required("O nome é obrigatório"),
    senha: yup.string()
    .min(8, "A senha precisa de pelo menos 3 caracteres")
    .max(20, "A senha precisa de no máximo 20 caracteres")
    .required("A senha é obrigatória"),
    email: yup.string().email("email inválido").required("email é obrigatório"),
    dataCadastro: yup.date().required("Data de Lançamento é obrigatório"),
    nickname: yup.string()
    .min(3, "O nickname precisa de pelo menos 3 caracteres")
    .max(16, "O nickname precisa de no máximo 16 caracteres")
    .required("O nickname é obrigatório"),
  }
)

async function validarUsuario(req, res, next) {
  try {
    await schema.validate(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json({ erros: error.errors })
  }
}

module.exports = { validarUsuario }