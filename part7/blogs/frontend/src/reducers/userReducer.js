import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(status, action) {
      return action.payload
    },
    logout(status, action) {
      return initialState
    },
  },
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer
