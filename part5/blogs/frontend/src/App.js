import { useState, useEffect } from 'react'
import Blog from './components/Blog.js'
import blogService from './services/blogs.js'
import Notification from './components/Notification.js'
import LoginForm from './components/LoginForm.js'
import BlogForm from './components/BlogForm.js'
import Togglable from './components/Togglable.js'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      setUser(JSON.parse(userStr))
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const clearNotification = () => {
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification {...notification} />
        <LoginForm
          setUser={setUser}
          setNotification={setNotification}
          clearNotification={clearNotification}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification {...notification} />
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

      <Togglable showButtonLabel='new note' hideButtonLabel='hide'>
        <h2>create new</h2>
        <BlogForm
          setNotification={setNotification}
          clearNotification={clearNotification}
        />
      </Togglable>

      <br/>
      {blogs.toSorted((a,b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App