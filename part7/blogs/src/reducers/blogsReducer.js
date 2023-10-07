import { createSlice } from '@reduxjs/toolkit'

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

export const { setBlogs, addBlog, updateBlog, deleteBlog } = blogSlice.actions
export default blogSlice.reducer
