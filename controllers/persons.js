const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  })
})

personsRouter.get('/:id', (req, res) => {
  Person
    .findById(req.params.id)
    .then(person => person ? res.json(person.toJSON()) : res.status(404).end())
    .catch(error => res.status(400).json({ error: error }))
})

personsRouter.post('/', (req, res, next) => {
  new Person(req.body).save()
    .then(savedPerson => res.json(savedPerson.toJSON()))
    .catch(error => next(error))
})

personsRouter.put('/:id', (req, res, next) => {
  Person.findByIdAndUpdate(req.params.id, { name: req.body.name, number: req.body.number }, { new: true })
    .then(person => res.json(person.toJSON()))
    .catch(error => next(error))
})

personsRouter.delete('/:id', (req, res) => {
  Person.deleteOne({ _id: req.params.id }, (error, result) => {
    if (error) {
      return res.json({ message: `${req.params.id} is already removed from the server.` })
    }
    else {
      return res.json(result)
    }
  })
})

module.exports = personsRouter