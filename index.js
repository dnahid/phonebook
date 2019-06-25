const express = require('express')
const bodyParse = require('body-parser')

const app = express()
const PORT = 3003
const persons = [
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
      },
      {
        "name": "Artho Hellas",
        "number": "451",
        "id": 4
      },
      {
        "name": "Nahidul Islam",
        "number": "123456",
        "id": 5
      },
      {
        "name": "Ashraful Alam",
        "number": "123456",
        "id": 6
      },
      {
        "name": "Kamal Ahmed",
        "number": "123456",
        "id": 7
      },
      {
        "name": "Alif",
        "number": "1244",
        "id": 8
      },
      {
        "name": "rajon",
        "number": "2343",
        "id": 9
      },
      {
        "name": "Ash",
        "number": "123",
        "id": 10
      },
      {
        "name": "Km",
        "number": "2343",
        "id": 11
      },
      {
        "name": "Hii",
        "number": "1234",
        "id": 12
      }
    ]
app.use(bodyParse.json())

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    res.send(
        `<p>Phonebook has the info of ${persons.length} persons.</p>
         <p>${new Date()}</p>`
    )
})

app.get('/api/persons/:id', (req, res) => {
    res.json(persons.find(person => person.id === Number(req.params.id)))
})

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})