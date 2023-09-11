import axios from 'axios'

const BASE_URL = 'http://localhost:3001/anecdotes'

const generateId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(BASE_URL)
  return response.data
}

const create = async (anecdote) => {
  if (anecdote?.content?.length < 5) {
    throw new Error('Too short anecdote, must have length 5 or more')
  }
  const response = await axios.post(BASE_URL, {
    ...anecdote,
    id: generateId(),
  })
  return response.data
}

const update = async (anecdote) => {
  const response = await axios.put(`${BASE_URL}/${anecdote.id}`, {
    ...anecdote
  })
  return response.data
}

export const anecdoteService = {
  getAll,
  create,
  update,
}