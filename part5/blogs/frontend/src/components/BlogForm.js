import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs.js'

const BlogForm = ({
  blogs,
  setBlogs,
  setNotification,
  clearNotification,
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()

    try {
      const newBlog = await blogService.create({
        title,
        author,
        url,
      })
      const message = `a new blog '${title}' by ${author} added`
      setNotification({ message })
      clearNotification()
      setBlogs([...blogs, newBlog])
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      setNotification({ message: 'Wrong credentials', type: 'error' })
      clearNotification()
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        title
        <input
          type="text"
          value={title}
          id="title"
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          id="author"
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={url}
          id="url"
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id="create-button" type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  setNotification: PropTypes.func.isRequired,
  clearNotification: PropTypes.func.isRequired,
}

export default BlogForm