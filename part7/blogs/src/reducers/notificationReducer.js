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
    },
  },
})

export const setNotification = (notification, timeoutInSeconds = 3) => {
  return async (dispatch) => {
    dispatch(addNotification(notification))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeoutInSeconds * 1000)
  }
}

export const { addNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
