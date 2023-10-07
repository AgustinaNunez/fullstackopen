import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs.js'

const Blog = ({ blog }) => {
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
    const userLogged = JSON.parse(localStorage.getItem('user'))
    return blog.user.some(u => u.username === userLogged?.username)
  }

  return (
    <div className='blog' style={blogStyle}>
      {blog.title} <button onClick={toggleVisibility}>{visible ? 'hide': 'view'}</button>
      {visible &&
        <>
          <p>{blog.url}</p>
          <p>likes {likes} <button id="like-button" onClick={likeBlog}>like</button></p>
          <p>{blog.author}</p>
          {isBlogAddedByTheUser() &&
            <button id="remove-button" style={{ color: 'tomato', border: '1px solid tomato' }} onClick={removeBlog}>
              remove
            </button>
          }
        </>
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog