import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogs(status, action) {
      return action.payload
    },
    addBlog(status, action) {
      return [...status, action.payload]
    },
    updateBlog(status, action) {
      return [...status].map((blog) =>
        blog.id === action.payload.id ? action.payload : blog,
      )
    },
    deleteBlog(status, action) {
      return [...status].filter((blog) => blog.id !== action.payload.id)
    },
  },
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const { setBlogs, addBlog, updateBlog, deleteBlog } = blogSlice.actions
export default blogSlice.reducer
