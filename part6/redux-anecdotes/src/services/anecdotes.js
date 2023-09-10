import axios from 'axios'

const getAnecdotes = async () => {
  const url = 'http://localhost:3001/anecdotes'
  const response = await axios.get(url)
  return response.data
}

export const anecdoteService = {
  getAnecdotes
}