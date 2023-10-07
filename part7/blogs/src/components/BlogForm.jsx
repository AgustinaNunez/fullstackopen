import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer.js'
import blogService from '../services/blogs.js'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const onSubmit = async (event) => {
    event.preventDefault()

    try {
      await blogService.create({
        title,
        author,
        url,
      })
      const message = `a new blog '${title}' by ${author} added`
      dispatch(setNotification({ message }))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      dispatch(setNotification({ message: 'Wrong credentials', type: 'error' }))
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

export default BlogForm