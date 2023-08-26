const _ = require('lodash')

const dummy = (blogs) => {
  return blogs.length > 0 
    ? blogs.length / blogs.length 
    : 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.sort((a,b) => b.likes - a.likes)[0]
}

const mostBlogs = (blogs) => {
  const blogsGroupByAuthor = _.groupBy(blogs, 'author')
  return Object.entries(blogsGroupByAuthor)
    .sort((a,b) => b[1].length - a[1].length)[0][0]
}

const mostLikes = (blogs) => {
  const blogsGroupByAuthor = _.groupBy(blogs, 'author')
  return Object.entries(blogsGroupByAuthor)
    .map(author => ({
      author: author[0],
      likes: author[1].reduce((sum, item) => sum + item.likes, 0)
    }))
    .sort((a,b) => b.likes - a.likes)[0].author
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}