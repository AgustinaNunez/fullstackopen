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

  test('validate password', async () => {
    const newUser = {
      name: 'Maria Lopez',
      username: 'maria.lopez',
      password: 'm'
    }
    const responsePost = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(responsePost.body.error).toContain('password must have at least 3 characters')
  
    const responseGet = await api
      .get('/api/users')
      .expect(200)
      
    expect(responseGet.body).toHaveLength(0)
  })

  test('validate username must have 3 characters at least', async () => {
    const newUser = {
      name: 'Maria Lopez',
      username: 'm',
      password: 'mypass123_'
    }
    const responsePost = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    expect(responsePost.body.error)
      .toContain('User validation failed: username: must have 3 characters at least')
  
    const responseGet = await api
      .get('/api/users')
      .expect(200)
      
    expect(responseGet.body).toHaveLength(0)
  })

  test('validate username must be unique', async () => {
    await api
      .post('/api/users')
      .send({
        name: 'Maria Lopez',
        username: 'maria.lopez',
        password: 'mypass123_'
      })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const responsePost = await api
      .post('/api/users')
      .send({
        name: 'Maria',
        username: 'maria.lopez',
        password: 'mypass1234_'
      })
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    expect(responsePost.body.error)
      .toMatch(/duplicate key error collection/)
  
    const responseGet = await api
      .get('/api/users')
      .expect(200)
      
    expect(responseGet.body).toHaveLength(1)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})