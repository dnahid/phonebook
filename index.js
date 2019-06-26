const express = require('express')
const bodyParse = require('body-parser')
const morgan = require('morgan')

const app = express()
const PORT = 3003
let persons = [
      {
        "name": "Arto Hellas",
        "number": "123",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      }
    ]


app.use(bodyParse.json())
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'))
app.get('/api/persons', (req, res) => {
    return res.json(persons)
})

app.get('/info', (req, res) => {
    return res.send(
        `<p>Phonebook has the info of ${persons.length} persons.</p>
         <p>${new Date()}</p>`
    )
})

app.get('/api/persons/:id', (req, res) => {
    return res.json(persons.find(person => person.id === Number(req.params.id)))
})

app.post('/api/persons', (req, res) => {
    if(!req.body.name)
        return res.status(400).json({error: 'Name is missing'})
    if(!req.body.number)
        return res.status(400).json({error: 'Number is missing'})
    if(persons.find(person => person.name === req.body.name))
        return res.status(400).json({error: 'Name should be unique'})
    persons = [...persons, {...req.body, id: Math.round(Math.random() * 100)}]
    return res.status(204).end()
})

app.delete('/api/persons/:id', (req, res) => {
    persons = persons.filter(person => person.id !== Number(req.params.id))
    return res.status(204).end()
})

const unKnownEndPoint = (req, res) => {
    res.status(404).json({error: 'invalid endpoint.'})
}

app.use(unKnownEndPoint)

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})