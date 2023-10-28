import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { initializeBlogs } from '../reducers/blogsReducer'

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
      {[...blogs].sort((a,b) => b.likes - a.likes).map(blog =>
        <div key={blog.id} className='blog' style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      )}
    </>
  )
}

export default Blogs