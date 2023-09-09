import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { anecdoteAction } from './actions/anecdoteAction'

const App = () => {
  const [content, setContent] = useState('')
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(anecdoteAction.voteAnecdote(id))
  }

  const createAnecdote = (event) => {
    event.preventDefault()
    dispatch(anecdoteAction.createAnecdote(content))
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