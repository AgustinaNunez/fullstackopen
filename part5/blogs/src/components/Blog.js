import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({blog}) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    padding: 10,
    border: '1px solid black',
    marginBottom: 5
  }

  const toggleVisibility = () => setVisible(!visible)

  const likeBlog = async () => {
    const { blog: updatedBlog } = await blogService.update({
      ...blog,
      likes: likes + 1
    })
    setLikes(updatedBlog.likes)
  }

  const removeBlog = async () => {
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)) {
      await blogService.remove(blog.id)
    }
  }

  const isBlogAddedByTheUser = () => {
    const userLogged = JSON.parse(localStorage.getItem('user'))?.username
    return blog.user.some(u => u.username === userLogged)
  }

  return (
    <div style={blogStyle}>
      {blog.title} <button onClick={toggleVisibility}>{visible ? 'hide': 'view'}</button>
      {visible &&
        <>
          <p>{blog.url}</p>
          <p>likes {likes} <button onClick={likeBlog}>like</button></p>
          <p>{blog.author}</p>
          {isBlogAddedByTheUser() &&
            <button style={{color: 'tomato', border: '1px solid tomato'}} onClick={removeBlog}>
              remove
            </button>
          }
        </>
      }
    </div>  
  )
}

export default Blog