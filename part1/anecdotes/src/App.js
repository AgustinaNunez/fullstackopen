import { useState } from 'react'

const Anecdote = ({text, points}) => (
  <>
    <p>{text}</p>
    <p>has {points} votes</p>
  </>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [mostVoted, setMostVoted] = useState(-1)
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const vote = () => {
    const newPoints = [...points]
    newPoints[selected] += 1
    setPoints(newPoints)
    setMostVoted(getMostVoted(newPoints))
  }

  const nextAnecdote = () => {
    const totalAnecdotes = anecdotes.length - 1
    const randomNumber = Math.floor(Math.random() * totalAnecdotes)
    setSelected(randomNumber)
  }

  const getMostVoted = (points) => {
    const maxPoint = points.reduce((a, b) => Math.max(a, b), -Infinity)
    return points.findIndex(point => point === maxPoint)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} points={points[selected]} />
      <button onClick={vote}>vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>
      {
        mostVoted >= 0 &&
        <>
          <h1>Anecdote with most votes</h1>
          <Anecdote text={anecdotes[mostVoted]} points={points[mostVoted]} />
        </>
      }
    </div>
  )
}

export default App