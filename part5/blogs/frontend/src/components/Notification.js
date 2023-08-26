import PropTypes from 'prop-types'

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
    <div className={type ?? 'info'} style={styles}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string,
}

export default Notification