require('dotenv').config()
const express = require('express')
const bodyParse = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Person = require('./models/person')
const app = express()
const PORT = process.env.PORT
    
app.use(express.static('build'))   
app.use(bodyParse.json())
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'))


app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        return res.json(persons.map(person => person.toJSON()))
    })
})

app.get('/info', (req, res) => {
    return res.send(
        `<p>Phonebook has the info of ${persons.length} persons.</p>
         <p>${new Date()}</p>`
    )
})

app.get('/api/persons/:id', (req, res) => {
    Person.find({id: req.id}).then(person => {
        return res.json(person.toJSON())
    })
})

app.post('/api/persons', (req, res) => {
    if(!req.body.name)
        return res.status(400).json({error: 'Name is missing'})
    if(!req.body.number)
        return res.status(400).json({error: 'Number is missing'})
    Person.find({name: req.body.name}).then(person => {
        if(person.length === 0) {
            new Person(req.body).save().then(savedPerson => {
                return res.json(savedPerson.toJSON())
            })
        }
        else {
            return res.status(400).json({error: 'Name should be unique'})
        }
    })
})

app.delete('/api/persons/:id', (req, res) => {
    persons = persons.filter(person => person.id !== Number(req.params.id))
    return res.status(204).end()
})

const unKnownEndPoint = (req, res) => {
    return res.status(404).json({error: 'invalid endpoint.'})
}

app.use(unKnownEndPoint)

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})