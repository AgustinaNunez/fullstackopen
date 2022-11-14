const express = require('express')
const morgan = require('morgan')

const app = express()

const unknownEndpoint = (req, res) => {
    res.status(404).send({
        error: 'Unknown endpoint'
    })
}

morgan.token('req-body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))
app.use(express.json())

let persons = [
    { 
      name: 'Arto Hellas', 
      number: '040-123456',
      id: 1
    },
    { 
        name: 'Ada Lovelace', 
        number: '39-44-5323523',
        id: 2
    },
    { 
        name: 'Dan Abramov', 
        number: '12-43-234345',
        id: 3
    },
    { 
        name: 'Mary Poppendieck', 
        number: '39-23-6423122',
        id: 4
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    const now = new Date()
    res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${now}</p>
    `)
})

app.get('/api/persons/:id', (req, res) => {
    const { id } = req.params
    const person = persons.find(person => person.id === Number(id))
    
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const { id } = req.params
    persons = persons.filter(person => person.id === Number(id))
    
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const { body } = req
    if (!body) {
        return res.status(400).json({
            error: 'Content missing'
        })
    }

    const {name, number} = body
    if (!name || !number) {
        return res.status(400).json({
            error: 'Content missing'
        })
    }
    
    const nameAlreadyExists = persons.find(person => person.name === name)
    if (nameAlreadyExists) {
        return res.status(403).json({
            error: 'Name must be unique'
        })
    }
    
    const person = {
        name,
        number,
        id: Math.floor(Math.random() * 1000000)
    }
    persons = persons.concat(person)
    
    res.json(person)
})

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})