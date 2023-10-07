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
      return [
        ...status,
        action.payload
      ]
    }
  }
})

export const { setBlogs, addBlog } = blogSlice.actions
export default blogSlice.reducer
