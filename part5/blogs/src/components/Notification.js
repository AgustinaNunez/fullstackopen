const Notification = ({ message, type }) => {
  if (!message) return null

  const styles = {
    color: type === 'error' ? 'tomato' : 'green',
    backgroundColor: '#f1f1f1',
    fontSize: '20px',
    fontWeight: '700',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  return (
    <div style={styles}>
      {message}
    </div>
  )
}

export default Notification