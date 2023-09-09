import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  voteAnecdote as voteAnecdoteAction,
  createAnecdote as createAnecdoteAction,
} from './reducers/anecdoteReducer'

const App = () => {
  const [content, setContent] = useState('')
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdoteAction(id))
  }

  const createAnecdote = (event) => {
    event.preventDefault()
    dispatch(createAnecdoteAction(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input value={content} onChange={({target}) => setContent(target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App