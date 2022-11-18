require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

morgan.token('req-body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

const Person = require('./models/persons')

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

app.get('/api/persons/:id', (req, res) => {
    const { id } = req.params
    Person.findById(id)
        .then(person => {
            return person 
                ? res.json(person)
                : res.status(404).end
        })
        .catch(error => {
            console.log(error)
            res.status(404).send({
                error: 'Invalid id'
            })
        })
})

app.delete('/api/persons/:id', (req, res, next) => {
    const { id } = req.params
    Person.findByIdAndRemove(id)
        .then(() => res.status(204).end())
        .catch(err => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
    const { id } = req.params
    const { number } = req.body

    Person.findByIdAndUpdate(
        id, 
        { number }, 
        { new: true, runValidators: true, context: 'query' }
    )
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(err => next(err))
})

app.post('/api/persons', async (req, res, next) => {
    const { name, number } = req.body    
    Person.create({ name, number })
        .then(savedNote => res.json(savedNote))
        .catch(err => next(err))
})

app.get('/info', async (req, res) => {
    const now = new Date()
    const totalPeople = await Person.count({})
    res.send(`
    <p>Phonebook has info for ${totalPeople} people</p>
    <p>${now}</p>
    `)
})

const unknownEndpoint = (req, res) => {
    res.status(404).send({
        error: 'Unknown endpoint'
    })
}
app.use(unknownEndpoint)

const errorHandler = (err, req, res, next) => {
    console.error(err.message)

    switch(err.name) {
        case 'CastError': {
            return res.status(400).send({
                error: 'Invalid id'
            }) 
        }
        case 'ValidationError': {
            return res.status(400).send({
                error: err.message.split(': ').slice(1).join(': ').split(', ').map(v => v.split(': ')[1]).join('; ')
            }) 
        }
    }

    next(err)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})