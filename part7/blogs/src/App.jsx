import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

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
          blogs={blogs}
          setBlogs={setBlogs}
          setNotification={setNotification}
          clearNotification={clearNotification}
        />
      </Togglable>

      <br/>
      {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App