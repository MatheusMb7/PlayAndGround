const yup = require('yup')
const mongoose = require('mongoose')

const schema = yup.object().shape(
  {
    texto: yup.string()
    .min(3, "O feedback precisa de pelo menos 3 caracteres")
    .max(500, "O feedback pode ter no máximo 500 caracteres")
    .required("Feedback é obrigatório"),
    data: yup.date().required("Data é obrigatório"),
     jogo: yup.string().required("O genero é obrigatório")
      .test(
        'id-validator',
        'ID do genero é inválido',
        value => mongoose.Types.ObjectId.isValid(value)
      ),
    usuario: yup.string().required("Estúdio é obrigatório")
      .test(
        'id-validator',
        'ID do estudio é inválido',
        value => mongoose.Types.ObjectId.isValid(value)
      ),
    plataforma: yup.string().required("Plataforma é obrigatório")
      .test(
        'id-validator',
        'ID da plataforma é inválido',
        value => mongoose.Types.ObjectId.isValid(value)
      ),
  }
)

async function validarComentario(req, res, next) {
  try {
    await schema.validate(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json({ erros: error.errors })
  }
}

module.exports = { validarComentario }