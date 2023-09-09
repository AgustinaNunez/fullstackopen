import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote as voteAnecdoteAction } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const {
    anecdotes,
    filter,
  } = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdoteAction(id))
  }

  return (
    <>
      {
        anecdotes
          .filter(a => a.content.includes(filter))
          .map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
          )
      }
    </>
  )
}

export default AnecdoteList