import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import blogService from '../services/blogs.js'
import { deleteBlog, updateBlog } from '../reducers/blogsReducer.js'

const Blog = () => {
  const blogId = useMatch('/blogs/:id').params.id
  const blogs = useSelector(state => state.blogs)
  const [blog, setBlog] = useState()
  const [likes, setLikes] = useState(blog?.likes)

  const dispatch = useDispatch()

  useEffect(() => {
    const blogFounded = blogs.find(blog => blog.id === blogId)
    if (blogFounded) setBlog(blogFounded)
  }, [])

  const likeBlog = async () => {
    const updatedBlog = {
      ...blog,
      likes: likes + 1
    }
    await blogService.update({...updatedBlog})
    setLikes(updatedBlog.likes)
    dispatch(updateBlog({...updatedBlog}))
  }

  const removeBlog = async () => {
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)) {
      await blogService.remove(blog.id)
      dispatch(deleteBlog(blog.id))
    }
  }

  const isBlogAddedByTheUser = () => {
    const userLogged = JSON.parse(localStorage.getItem('user'))
    return blog.user.some(u => u.username === userLogged?.username)
  }

  const removeButtonStyles = {
    color: 'tomato',
    border: '1px solid tomato',
  }

  if (!blog) return

  return (
    <>
      <h1>{blog.title}</h1>
      <p>{blog.url}</p>
      <p>likes {likes} <button onClick={likeBlog}>like</button></p>
      <p>{blog.author}</p>
      {isBlogAddedByTheUser() &&
        <button style={removeButtonStyles} onClick={removeBlog}>
          remove
        </button>
      }
      <h2>comments</h2>
      {
        blog.comments.length > 0
          ? <ul>
              {blog.comments.map(comment => <li key={Math.random()}>{comment}</li>)}
            </ul>
          : <p style={{background: '#EBEBEB', padding: '1em'}}>no comments</p>
      }
      
    </>
  )
}

export default Blog