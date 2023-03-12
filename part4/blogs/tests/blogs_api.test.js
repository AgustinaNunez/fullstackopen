const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogs')
const User = require('../models/user')
const {
  initialBlogs,
  newBlog,
  newBlogWithoutLikes,
  newBlogWithoutUrl,
  getLogin
} = require('./blogs_helper')

jest.setTimeout(10000)

const api = supertest(app)

beforeAll(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  const userLogged = await getLogin(api)

  for (const initBlog of initialBlogs) {
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${userLogged.token}`)
      .send(initBlog)
  }
})

describe('get all blogs', () => {
  test('blogs are returned as json', async () => {
    const userLogged = await getLogin(api)
    await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${userLogged.token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('all blogs are returned', async () => {
    const userLogged = await getLogin(api)
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${userLogged.token}`)
    expect(response.body).toHaveLength(initialBlogs.length)
  })
  
  test('all blogs have an id', async () => {
    const userLogged = await getLogin(api)
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${userLogged.token}`)
  
    response.body.map(blog => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('create a new blog', () => {
  test('can create a new blog', async () => {
    const userLogged = await getLogin(api)
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${userLogged.token}`)
      .send(newBlog)
      .expect(201)
  
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${userLogged.token}`)
      .expect(200)
      
    expect(response.body).toHaveLength(initialBlogs.length + 1)
  })
  
  test('if likes property is missing, it will return 0 likes', async () => {
    const userLogged = await getLogin(api)
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${userLogged.token}`)
      .send(newBlogWithoutLikes)
      .expect(201)
  
    const response = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${userLogged.token}`)
      .expect(200)
    
    const blog = response.body
      .filter(blog => blog.title === newBlogWithoutLikes.title)[0]
    expect(blog.likes).toBe(0)
  })
  
  test('if url property is missing, it will return 400', async () => {
    const userLogged = await getLogin(api)
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${userLogged.token}`)
      .send(newBlogWithoutUrl)
      .expect(400)
  })
})

describe('delete a blog', () => {
  test('can delete an existing blog by its id', async () => {
    const userLogged = await getLogin(api)

    const responseBefore = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${userLogged.token}`)
    const blog = responseBefore.body[0]
    
    await api
      .delete('/api/blogs/' + blog.id)
      .set('Authorization', `Bearer ${userLogged.token}`)
      .expect(204)
  
    const responseAfter = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${userLogged.token}`)
    expect(responseAfter.body).toHaveLength(responseBefore.body.length - 1)
  })
})

describe('update a blog', () => {
  test('can update an existing blog by its id', async () => {
    const userLogged = await getLogin(api)
    
    const responseBefore = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${userLogged.token}`)
    const blog = responseBefore.body[0]
    const newLikes = 18
    
    await api
      .put('/api/blogs/' + blog.id)
      .set('Authorization', `Bearer ${userLogged.token}`)
      .send({ likes: newLikes })
      .expect(200)
  
    const responseAfter = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${userLogged.token}`)
    expect(responseAfter.body[0].likes).toBe(newLikes)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})