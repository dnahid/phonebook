const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const personsRouter = require('./controllers/persons')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const morgan = require('morgan')


console.log('connecting to MongoDB')

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const app = express()
app.use(express.static('build'))
app.use(bodyParser.json())
morgan.token('body', (req) => req.body ? JSON.stringify(req.body) : '')
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'))
app.use(middleware.requestLogger)

app.use('/api/persons', personsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app