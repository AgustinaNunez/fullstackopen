import { useState } from 'react'

const StatisticLine = ({name, value}) => (
  <tr>
    <td>{name}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (good - bad)/all
  const positive = good*100/all

  return (
    <>
      {
        all > 0 ?
        <>
          <table>
          <tbody>
            <StatisticLine name='good' value={good} />
            <StatisticLine name='neutral' value={neutral} />
            <StatisticLine name='bad' value={bad} />
            <StatisticLine name='all' value={all} />
            <StatisticLine name='average' value={average} />
            <StatisticLine name='positive' value={`${positive} %`} />
          </tbody>
          </table>
        </> :
        <p>No feedback given</p>
      }
    </>
  )
}

const Button = ({name, onClick}) => <button onClick={onClick}>{name}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button name='good' onClick={() => setGood(good + 1)} />
      <Button name='neutral' onClick={() => setNeutral(neutral + 1)} />
      <Button name='bad' onClick={() => setBad(bad + 1)} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App