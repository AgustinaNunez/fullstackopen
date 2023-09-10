import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote as createAnecdoteAction } from '../reducers/anecdoteReducer'
import { addNotification, clearNotification } from '../reducers/notificationReducer'
import { anecdoteService } from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const [content, setContent] = useState('')

  const createAnecdote = async (event) => {
    event.preventDefault()
    const newAnecdote = await anecdoteService.addAnecdote(content)
    dispatch(createAnecdoteAction(newAnecdote))
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