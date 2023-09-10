import { createSlice } from '@reduxjs/toolkit'
import { anecdoteService } from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return [...action.payload]
    },
    addAnecdote(state, action) {
      return [
        ...state,
        {...action.payload}
      ]
    },
    voteAnecdote(state, action) {
      return state.map(anecdote => {
        if (anecdote.id === action.payload) {
          return {
            ...anecdote,
            votes: anecdote.votes + 1
          }
        }
        return anecdote
      })
    },
  }
})

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAnecdotes()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.addAnecdote(content)
    dispatch(addAnecdote(anecdote))
  }
}

export const { addAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer