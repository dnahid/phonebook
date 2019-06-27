// import required libraries and files

require('dotenv').config()
const express = require('express')
const bodyParse = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Person = require('./models/person')
const app = express()

// declare constansts
const PORT = process.env.PORT
    
app.use(express.static('build'))   
app.use(bodyParse.json())
morgan.token('body', (req, res) => req.body ? JSON.stringify(req.body) : '')
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'))

// routes

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons.map(person => person.toJSON()))
    })
})

app.get('/api/persons/:id', (req, res) => {
    Person
        .findById(req.params.id)
        .then(person => person ? res.json(person.toJSON()) : res.status(404).end())
        .catch(error => res.status(400).json({error: 'Malformed ID Provided.'}))
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

app.put('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndUpdate(req.params.id, {name: req.body.name, number: req.body.number}, {new: true})
        .then(person => res.json(person.toJSON()))
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res) => {
    Person.deleteOne({_id: req.params.id}, (error, result) => {
        if(error) {
            return res.json({message: `${id} is already removed from the server.`})
        }
        else {
            return res.json(result)
        }
    })
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError' && error.kind == 'ObjectId') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
  }
  
app.use(errorHandler)

const unKnownEndPoint = (req, res) => {
    return res.status(404).json({error: 'invalid endpoint.'})
}

app.use(unKnownEndPoint)

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})