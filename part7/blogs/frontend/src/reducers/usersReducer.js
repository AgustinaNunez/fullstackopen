import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const initialState = []

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(status, action) {
      return action.payload
    },
  },
})

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

export const { setUsers } = usersSlice.actions
export default usersSlice.reducer
