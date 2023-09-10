import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeAnecdotes, updateVoteAnecdote } from '../reducers/anecdoteReducer'
import { addNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const {
    anecdotes,
    filter,
  } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes(anecdotes))
  }, [])

  const vote = (anecdote) => {
    dispatch(updateVoteAnecdote(anecdote))
    const notification = `You voted '${anecdote.content}'`
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
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
          )
      }
    </>
  )
}

export default AnecdoteList