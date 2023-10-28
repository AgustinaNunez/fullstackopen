import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { initializeBlogs } from '../reducers/blogsReducer'
import Notification from '../components/Notification'
import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)

  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(initializeBlogs(blogs))
  }, [])

  const blogStyle = {
    padding: 10,
    border: '1px solid black',
    marginBottom: 5
  }

  return (
    <>
      <h2>blogs</h2>
      <Notification />
      <Togglable showButtonLabel='new note' hideButtonLabel='hide'>
        <>
          <h2>create new</h2>
          <BlogForm />
        </>
      </Togglable>

      {[...blogs].sort((a,b) => b.likes - a.likes).map(blog =>
        <div key={blog.id} className='blog' style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      )}
    </>
  )
}

export default Blogs