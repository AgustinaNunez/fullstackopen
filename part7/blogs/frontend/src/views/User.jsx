import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useMatch } from "react-router-dom"

const User = () => {
  const [user, setUser] = useState()
  const users = useSelector(state => state.users)
  const userId = useMatch('/users/:id').params.id
  
  useEffect(() => {
    const userFounded = users.find(user => user.id === userId)
    if (userFounded) setUser(userFounded)
  }, [])

  if (!user) return

  return (
    <>
      <h1>{user.name}</h1>
      <b>added blogs</b>
      <ul>
        {
          user.blogs?.map(blog => <li key={blog.id}>{blog.title}</li>)
        }
      </ul>
    </>
  )
}

export default User