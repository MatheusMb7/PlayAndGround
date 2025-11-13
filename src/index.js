const express = require('express')
const app = express()

app.use(express.json())

// conexão com o banco
const mongoose = require('mongoose')
require('dotenv').config()

const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_NAME = process.env.DB_NAME

const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(url)
  .then(() => {
    console.log("Conectado ao banco MongoDB!!!!")
  })
  .catch(erro => {
    console.log("Erro ao conectar no banco MongoDB: ", erro)
  })

// rotas
const JogosController = require('./controllers/JogosController')
app.use(JogosController)

const EstudiosController = require('./controllers/EstudiosController')
app.use(EstudiosController)

const PlataformasController = require('./controllers/PlataformasController')
app.use(PlataformasController)

const GenerosController = require('./controllers/GenerosController')
app.use(GenerosController)


const AvaliacaoesController = require('./controllers/AvaliacoesController') 
app.use(AvaliacaoesController)

const ComentariosController = require('./controllers/ComentariosController')
app.use(ComentariosController)

const ConquistasController = require('./controllers/ConquistasController')
app.use(ConquistasController)

const CampeonatosController = require('./controllers/CampeonatosController')
app.use(CampeonatosController)


app.listen(3000, () => {
  console.log("Aplicação rodando -> http://localhost:3000")
})