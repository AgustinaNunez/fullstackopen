const initialBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    url: 'blogs/dijkstra/1',
    likes: 15
  },
  {
    title: "Canonical string reduction",
    url: 'blogs/dijkstra/2',
    likes: 121
  },
  {
    title: "Photon",
    url: 'blogs/einstein/1',
    likes: 312
  },
  {
    title: 'Relativity',
    url: 'blogs/einstein/2',
    likes: 72
  },
  {
    title: "Physics",
    url: 'blogs/einstein/3',
    likes: 128
  }
]

const newBlog = {
  title: "Sérum de Quinton",
  url: 'blogs/quinton/1',
  likes: 9124
}

const newBlogWithoutLikes = {
  title: "Vitamin C",
  url: 'blogs/pauling/1'
}

const newBlogWithoutUrl = {
  title: "Vitamin D",
}

let _login
const getLogin = async (api) => {
  if (!_login) {
    const userData = {
      username: 'harry.potter',
      name: 'Harry Potter',
      password: 'harry123_'
    }
    const user = await api.post('/api/users').send(userData)

    const login = await api.post('/api/login').send({
      username: userData.username,
      password: userData.password
    })
    _login = {
      ...user._body,
      token: login._body.token
    }
  }
  return _login
}

module.exports = {
  initialBlogs,
  newBlog,
  newBlogWithoutLikes,
  newBlogWithoutUrl,
  getLogin
}