import { useState } from "react"

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

export default Togglable