import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { logout } from "../reducers/userReducer"

const Header = () => {
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('user')
  }

  const headerStyles = {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
    background: 'lightgrey',
    padding: '0.5rem',
  }

  return (
    <div style={headerStyles}>
      <Link to={'/'}>blogs</Link>
      <Link to={'/users'}>users</Link>
      <div>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  )
}

export default Header