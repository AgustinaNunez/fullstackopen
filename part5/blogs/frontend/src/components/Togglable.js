import { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = ({
  showButtonLabel = 'show',
  hideButtonLabel = 'hide',
  children
}) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  return (
    <div>
      {visible && children}
      <button onClick={toggleVisibility}>
        {visible ? hideButtonLabel : showButtonLabel}
      </button>
    </div>
  )
}

Togglable.propTypes = {
  showButtonLabel: PropTypes.string,
  hideButtonLabel: PropTypes.string,
  children: PropTypes.element.isRequired,
}

export default Togglable