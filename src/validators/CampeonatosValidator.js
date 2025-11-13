const yup = require('yup');
const mongoose = require('mongoose');

const schema = yup.object().shape({
  nome: yup
    .string()
    .min(3, 'O nome precisa de pelo menos 3 caracteres')
    .max(50, 'O nome pode ter no máximo 50 caracteres')
    .required('O nome é obrigatório'),

  dataInicio: yup
    .date()
    .typeError('Data de início inválida')
    .required('A data de início é obrigatória'),

  dataFim: yup
    .date()
    .typeError('Data de fim inválida')
    .min(yup.ref('dataInicio'), 'A data de fim deve ser posterior à data de início')
    .required('A data de fim é obrigatória'),

  jogoId: yup
    .string()
    .test('is-valid-id', 'ID do jogo inválido', (value) => mongoose.Types.ObjectId.isValid(value))
    .required('O ID do jogo é obrigatório'),

  participantes: yup
    .array()
    .of(
      yup
        .string()
        .test('is-valid-id', 'ID de participante inválido', (value) => mongoose.Types.ObjectId.isValid(value))
    )
    .min(1, 'É necessário pelo menos um participante')
    .required('A lista de participantes é obrigatória')
});

async function validarCampeonato(req, res, next) {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    return res.status(400).json({ erros: error.errors });
  }
}

module.exports = { validarCampeonato };
