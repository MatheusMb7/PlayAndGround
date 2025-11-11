const yup = require('yup')
const mongoose = require('mongoose')

const schema = yup.object().shape(
  {
    nome: yup.string()
    .min(3, "o nome precisa de pelo menos 3 caracteres")
    .max(50, "O nome precisa de no máximo 50 caracteres")
    .required("nome é obrigatório"),
    fabricante: yup.string()
    .min(3, "O fabricante precisa de pelo menos 3 caracteres")
    .max(30, "O fabricante pode ter no máximo 30 caracteres")
    .required("O fabricante é obrigatório"),
    anoFundacao: yup.number().required("Data de fundação é obrigatório"),
    site: yup.string().required("O site é obrigatório")
  }
)

async function validarPlataforma(req, res, next) {
  try {
    await schema.validate(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json({ erros: error.errors })
  }
}

module.exports = { validarPlataforma }