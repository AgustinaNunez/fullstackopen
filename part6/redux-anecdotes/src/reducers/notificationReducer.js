import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(status, action) {
      return action.payload
    },
    clearNotification(status, action) {
      return initialState
    }
  }
})

export const { addNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer

