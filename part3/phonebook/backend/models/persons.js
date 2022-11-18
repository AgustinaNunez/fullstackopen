const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
mongoose.connect(url)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch(error => {
        console.log(`Error connecting to MongoDB: ${error.message}`)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'Name must be unique'],
        minLength: [2, 'Name must have at least 2 characters'],
        required: [true, 'Name is required'],
    },
    number: {
        type: String,
        validate: {
            validator: v => /(\d{2}-\d{7})|(\d{3}-\d{8})/.test(v),
            message: props => `${props.value} is not a valid phone number`
        },
        minLength: [8, 'Phone number must have at least 8 characters'],
        required: [true, 'Phone number is required'],
    },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)