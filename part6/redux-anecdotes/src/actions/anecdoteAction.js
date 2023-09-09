const createAnecdote = (content) => ({
  type: 'ADD_ANECDOTE',
  payload: {
    content
  }
})

const voteAnecdote = (id) => ({
  type: 'VOTE',
  payload: {
    id
  }
})

export const anecdoteAction = {
  createAnecdote,
  voteAnecdote,
}