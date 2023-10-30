import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { initializeUsers } from "../reducers/usersReducer"

const Users = () => {
  const users = useSelector(state => state.users)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers(users))
  }, [])

  return (
    <>
      <h1>Users</h1>
      <div style={{display: 'flex', flexDirection: 'column', width: '13rem'}}>
        <div style={{display: 'flex', alignSelf: 'flex-end'}}>
          <b>blogs created</b>
        </div>
        <>
          {users?.map(user =>
            <div key={user.username} style={{display: 'flex', gap: '1em', alignItems: 'center'}}>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
              <div>{user.blogs.length}</div>
            </div>
          )}
        </>
      </div>
    </>
  )
}

export default Users