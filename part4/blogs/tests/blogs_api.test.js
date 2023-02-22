const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogs')
const { initialBlogs, newBlog } = require('./blogs_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  Promise.all(initialBlogs.map(async (initBlog) => {
    const blog = new Blog(initBlog)
    await blog.save()
  }))
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('all blogs have an id', async () => {
  const response = await api.get('/api/blogs')

  response.body.map(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('all blogs have an id', async () => {
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const response = api
    .get('/api/blogs')
    .expect(200)
    
  expect(response.body).toHaveLength(initialBlogs.length + 1)
})

afterAll(async () => {
  await mongoose.connection.close()
})