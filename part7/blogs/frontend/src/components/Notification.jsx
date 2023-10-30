import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (!notification?.message) return null

  const styles = {
    color: notification.type === 'error' ? 'tomato' : 'green',
    backgroundColor: '#f1f1f1',
    fontSize: '20px',
    fontWeight: '700',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  return (
    <div className={notification.type ?? 'info'} style={styles}>
      {notification.message}
    </div>
  )
}

export default Notification