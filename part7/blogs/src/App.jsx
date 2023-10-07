import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { setBlogs } from './reducers/blogsReducer'

const App = () => {
  const [user, setUser] = useState(null)
  const blogs = useSelector(state => state.blogs)

  const dispatch = useDispatch()

  useEffect(() => {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      setUser(JSON.parse(userStr))
      blogService.getAll().then(blogs =>
        dispatch(setBlogs(blogs))
      )
    }
  }, [blogs])

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm setUser={setUser}/>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

      <Togglable showButtonLabel='new note' hideButtonLabel='hide'>
        <>
          <h2>create new</h2>
          <BlogForm />
        </>
      </Togglable>

      <br/>
      {[...blogs].sort((a,b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App