import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { login, logout } from './reducers/userReducer'
import { Routes, Route } from 'react-router-dom'
import Users from './views/Users'
import User from './views/User'
import Blogs from './views/Blogs'

const App = () => {
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      dispatch(login(JSON.parse(userStr)))
    }
  }, [])

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('user')
  }

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <LoginForm />
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

      <Routes>
        <Route path='/' element={<Blogs />} />
        <Route path='/blogs/:id' element={<Blog />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<User />} />
      </Routes>
    </div>
  )
}

export default App