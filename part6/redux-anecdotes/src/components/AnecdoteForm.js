import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote as createAnecdoteAction } from '../reducers/anecdoteReducer'
import { addNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const [content, setContent] = useState('')

  const createAnecdote = (event) => {
    event.preventDefault()
    dispatch(createAnecdoteAction(content))
    const notification = `You created '${content}'`
    dispatch(addNotification(notification))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input value={content} onChange={({target}) => setContent(target.value)} />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm