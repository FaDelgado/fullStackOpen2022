const blogsRouter = require('express').Router()
const Blog = require("../models/blog");

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

blogsRouter.put('/:id', (request, response, next) => {
  const body = resquest.body;

  const blog = {
    likes: body.like,
  }

  try {
    const updateBlog = Blog.findoByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updateBlog.toJSON())
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})
  
  module.exports = blogsRouter