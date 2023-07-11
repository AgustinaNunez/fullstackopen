import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const BlogForm = ({
  setNotification,
  clearNotification,
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()

    try {
      await blogService.create({
        title,
        author,
        url,
      })
      const message = `a new blog '${title}' by ${author} added`
      setNotification({ message })
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
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  setNotification: PropTypes.func.isRequired,
  clearNotification: PropTypes.func.isRequired,
}

export default BlogForm