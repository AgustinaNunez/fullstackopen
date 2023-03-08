const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
})

describe('create a new user', () => {
  test('can create a new user', async () => {
    const newUser = {
      name: 'Maria Lopez',
      username: 'maria.lopez',
      password: 'mypass123_'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api
      .get('/api/users')
      .expect(200)
      
    expect(response.body).toHaveLength(1)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})