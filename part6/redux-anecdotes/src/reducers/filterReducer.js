const initialState = ''

const ACTION = {
  ADD_FILTER: 'ADD_FILTER',
}

export const addFilter = (filter) => ({
  type: ACTION.ADD_FILTER,
  payload: filter,
})

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case ACTION.ADD_FILTER:
      return action.payload
    default:
      return state
  }
}

export default reducer