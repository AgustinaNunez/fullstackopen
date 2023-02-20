const dummy = (blogs) => {
  return blogs.length > 0 
    ? blogs.length / blogs.length 
    : 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => sum + item.likes, 0)
}

module.exports = {
  dummy,
  totalLikes
}