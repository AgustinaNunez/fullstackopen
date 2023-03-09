const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/user')
const { getTokenFrom } = require('../utils/auth')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {username: 1, name: 1, id: 1})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const {
      title,
      url,
      likes
    } = request.body

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title,
      author: user.name,
      url,
      likes,
      user: user.id
    })
    const savedBlog = await blog.save()
    user.blogs.push(savedBlog.id)
    await user.save()

    response.status(201).send(savedBlog)
  } catch(error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params
  const blog = await Blog.findByIdAndRemove(id)
  if (!blog) {
    return response.status(404).send({
      error: 'Blog not found'
    })
  }

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { id } = request.params
  const { likes } = request.body

  const blog = await Blog.findOneAndUpdate(
    { _id: id }, 
    { likes },
    { new: true }
  )
  if (!blog) {
    return response.status(400).end()
  }

  response.status(200).send({
    blog
  })
})

module.exports = blogsRouter