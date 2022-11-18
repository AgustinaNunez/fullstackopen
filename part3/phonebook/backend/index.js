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
        .then(result => {
            res.status(204).end()
        })
        .catch(err => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
    const { id } = req.params
    const { number } = req.body

    Person.findByIdAndUpdate(id, { number }, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(err => next(err))
})

app.post('/api/persons', async (req, res) => {
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
    
    const nameAlreadyExists = await Person.find({ name: name })
    if (nameAlreadyExists.length > 0) {
        return res.status(403).json({
            error: 'Name must be unique'
        })
    }
    
    const person = new Person({ name, number })
    person.save().then(savedNote => 
        res.json(savedNote)
    )
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
    if (err.name === 'CastError') {
        return res.status(400).send({
            error: 'Invalid id'
        })
    }
    next(err)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})