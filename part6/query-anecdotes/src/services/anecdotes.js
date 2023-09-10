import axios from 'axios'

const BASE_URL = 'http://localhost:3001/anecdotes'

const generateId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(BASE_URL)
  return response.data
}

const create = async (anecdote) => {
  const response = await axios.post(BASE_URL, {
    ...anecdote,
    id: generateId(),
  })
  return response.data
}

export const anecdoteService = {
  getAll,
  create,
}