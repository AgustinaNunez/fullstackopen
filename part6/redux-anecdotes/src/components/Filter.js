import { useDispatch } from "react-redux"
import { addFilter } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = ({target}) => {
    dispatch(addFilter(target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter