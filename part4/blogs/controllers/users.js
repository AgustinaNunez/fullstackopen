const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  try {
    const {
      username,
      name,
      password
    } = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    if (password.length < 3) {
      throw new Error('password must have at least 3 characters')
    }

    const user = new User({
      username,
      name,
      passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
  } catch(error) {
    next(error)
  }
})

usersRouter.get('/', async (_request, response) => {
  const users = await User.find({})
  response.status(200).json(users)
})

module.exports = usersRouter