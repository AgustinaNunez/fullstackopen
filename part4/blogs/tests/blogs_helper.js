const initialBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'blogs/dijkstra/1',
    likes: 15
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: 'blogs/dijkstra/2',
    likes: 121
  },
  {
    title: "Photon",
    author: "Einstein",
    url: 'blogs/einstein/1',
    likes: 312
  },
  {
    title: 'Relativity',
    author: 'Einstein',
    url: 'blogs/einstein/2',
    likes: 72
  },
  {
    title: "Physics",
    author: "Einstein",
    url: 'blogs/einstein/3',
    likes: 128
  }
]

const newBlog = {
  title: "Sérum de Quinton",
  author: "René Quinton",
  url: 'blogs/quinton/1',
  likes: 9124
}

const newBlogWithoutLikes = {
  title: "Vitamin C",
  author: "Linus Pauling",
  url: 'blogs/pauling/1'
}

const newBlogWithoutUrl = {
  title: "Vitamin D",
  author: "Anonym"
}

module.exports = {
  initialBlogs,
  newBlog,
  newBlogWithoutLikes,
  newBlogWithoutUrl
}