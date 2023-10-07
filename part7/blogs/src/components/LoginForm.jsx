import { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import loginService from '../services/login.js'
import { setNotification } from '../reducers/notificationReducer.js'

const LoginForm = ({
  setUser
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      localStorage.setItem('user', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification({ message: 'wrong username or password', type: 'error' }))
    }
  }
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired
}

export default LoginForm