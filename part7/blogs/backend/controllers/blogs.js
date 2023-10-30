const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/user')

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

    const {
      name: userName,
      _id: userId
    } = request.user

    const blog = new Blog({
      title,
      author: userName,
      url,
      likes,
      user: userId
    })
    const savedBlog = await blog.save()
    request.user.blogs.push(savedBlog.id)
    await request.user.save()

    response.status(201).send(savedBlog)
  } catch(error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params

  const blogToRemove = await Blog.findById(id)
  if (!blogToRemove) {
    return response.status(404).send({
      error: 'Blog not found'
    })
  }
  if (blogToRemove.user.toString() !== request.user._id.toString()) {
    return response.status(401).send({
      error: 'user unauthorized'
    })
  }

  await Blog.findByIdAndRemove(id)
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

blogsRouter.post('/:id/comments', async (request, response, next) => {
  const { id } = request.params
  const { text } = request.body

  const blog = await Blog.findOneAndUpdate(
    { _id: id }, 
    { $push: { comments: text } },
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