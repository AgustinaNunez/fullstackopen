import { useState } from "react"

const Blog = ({blog}) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    padding: 10,
    border: '1px solid black',
    marginBottom: 5
  }

  const toggleVisibility = () => setVisible(!visible)

  return (
    <div style={blogStyle}>
      {blog.title} <button onClick={toggleVisibility}>{visible ? 'hide': 'view'}</button>
      {visible &&
        <>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button>like</button></p>
          <p>{blog.author}</p>
        </>
      }
    </div>  
  )
}

export default Blog