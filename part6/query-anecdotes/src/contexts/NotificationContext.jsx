import { useReducer, createContext, useContext } from "react";

const NotificationContext = createContext()
const initialValue = null

const notificationReducer = (state, action) => {
  switch(action.type) {
    case NotificationType.SET_NOTIFICATION:
      return action.payload
    case NotificationType.CLEAR_NOTIFICATION:
      return initialValue
    default:
      return state
  }
}

export const NotificationType = {
  SET_NOTIFICATION: 'SET_NOTIFICATION',
  CLEAR_NOTIFICATION: 'CLEAR_NOTIFICATION',
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, initialValue)
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notification = useContext(NotificationContext)
  if (notification) return notification[0]
}

export const useNotificationDispatch = () => {
  const notification = useContext(NotificationContext)
  if (notification) return notification[1]
}

export default NotificationContext