import { NotificationType, useNotificationDispatch, useNotificationValue } from "../contexts/NotificationContext"

const Notification = () => {
  const notification = useNotificationValue()
  const dispatchNotification = useNotificationDispatch()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (!notification) return null

  setTimeout(() => {
    dispatchNotification({ type: NotificationType.CLEAR_NOTIFICATION })
  }, 5000)

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
