import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { login } from './reducers/userReducer'
import { Routes, Route } from 'react-router-dom'
import Users from './views/Users'
import User from './views/User'
import Blogs from './views/Blogs'
import Header from './components/Header'

const App = () => {
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    const userStr = localStorage.getItem('user')
    if (userStr) {
      dispatch(login(JSON.parse(userStr)))
    }
  }, [])

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
      <Header />
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