import axios from 'axios'

const BASE_URL = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAnecdotes = async () => {
  const response = await axios.get(BASE_URL)
  return response.data
}

const addAnecdote = async (content) => {
  const response = await axios.post(BASE_URL, {
    id: getId(),
    content,
    votes: 0
  })
  return response.data
}

const updateAnecdote = async (id, anecdote) => {
  const response = await axios.put(`${BASE_URL}/${id}`, anecdote)
  return response.data
}

export const anecdoteService = {
  getAnecdotes,
  addAnecdote,
  updateAnecdote,
}