const yup = require('yup')
const mongoose = require('mongoose')

const schema = yup.object().shape(
  {
    titulo: yup.string()
    .min(3, "o título precisa de pelo menos 3 caracteres")
    .max(50, "O título precisa de no máximo 50 caracteres")
    .required("Título é obrigatório"),
    descricao: yup.string()
    .min(3, "A descrição precisa de pelo menos 3 caracteres")
    .max(500, "A descrição pode ter no máximo 500 caracteres")
    .required("Descrição é obrigatório"),
    dataLancamento: yup.date().required("Data de Lançamento é obrigatório"),
     genero: yup.string().required("O genero é obrigatório")
      .test(
        'id-validator',
        'ID do genero é inválido',
        value => mongoose.Types.ObjectId.isValid(value)
      ),
    estudio: yup.string().required("Estúdio é obrigatório")
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

async function validarJogo(req, res, next) {
  try {
    await schema.validate(req.body, { abortEarly: false })
    next()
  } catch (error) {
    return res.status(400).json({ erros: error.errors })
  }
}

module.exports = { validarJogo }