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

  return (
    <div style={blogStyle}>
      {blog.title} <button onClick={toggleVisibility}>{visible ? 'hide': 'view'}</button>
      {visible &&
        <>
          <p>{blog.url}</p>
          <p>likes {likes} <button onClick={likeBlog}>like</button></p>
          <p>{blog.author}</p>
        </>
      }
    </div>  
  )
}

export default Blog