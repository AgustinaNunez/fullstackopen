const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogs')
const { initialBlogs, newBlog, newBlogWithoutLikes, newBlogWithoutUrl } = require('./blogs_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (const initBlog of initialBlogs) {
    const blog = new Blog(initBlog)
    await blog.save()
  }
})

describe('get all blogs', () => {
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
})

describe('create a new blog', () => {
  test('can create a new blog', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
  
    const response = await api
      .get('/api/blogs')
      .expect(200)
      
    expect(response.body).toHaveLength(initialBlogs.length + 1)
  })
  
  test('if likes property is missing, it will return 0 likes', async () => {
    await api
      .post('/api/blogs')
      .send(newBlogWithoutLikes)
      .expect(201)
  
    const response = await api
      .get('/api/blogs')
      .expect(200)
    
    const blog = response.body
      .filter(blog => blog.title === newBlogWithoutLikes.title)[0]
    expect(blog.likes).toBe(0)
  })
  
  test('if url property is missing, it will return 400', async () => {
    await api
      .post('/api/blogs')
      .send(newBlogWithoutUrl)
      .expect(400)
  })
})

describe('delete a blog', () => {
  test('can delete an existing blog by its id', async () => {
    const responseBeforeDeleting = await api.get('/api/blogs')
    const blog = responseBeforeDeleting.body[0]
    
    await api
      .delete('/api/blogs/' + blog.id)
      .expect(204)
  
    const responseAfterDeleting = await api.get('/api/blogs')
    expect(responseAfterDeleting.body).toHaveLength(initialBlogs.length - 1)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})