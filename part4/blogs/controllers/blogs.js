const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const {
    title,
    author,
    url,
    likes
  } = request.body

  if (!title || !url) {
    return response.status(400).send({
      error: 'Missing values required'
    })
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes
  })

  const result = await blog.save()
  response.status(201).send(result)
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