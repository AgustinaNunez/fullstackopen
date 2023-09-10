import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote, setAnecdotes } from '../reducers/anecdoteReducer'
import { addNotification, clearNotification } from '../reducers/notificationReducer'
import { anecdoteService } from '../services/anecdotes'

const AnecdoteList = () => {
  const {
    anecdotes,
    filter,
  } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService.getAnecdotes()
      .then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [])

  const vote = (id) => {
    dispatch(voteAnecdote(id))
    const notification = `You voted '${anecdotes.find(a => a.id === id)?.content}'`
    dispatch(addNotification(notification))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return (
    <>
      {
        anecdotes
          .filter(a => a.content?.includes(filter))
          .sort((a,b) => b.votes - a.votes)
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