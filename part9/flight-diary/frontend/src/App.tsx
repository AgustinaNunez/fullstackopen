import { useState, useEffect } from 'react'
import diaryService from './services/diary'
import { DiaryEntry } from './types'

const App = () => {
  const [diaryEntires, setDiaryEntries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    diaryService.getAll().then(data => setDiaryEntries(data))
  }, [])

  return (
    <div>
      <h1>Daity entries</h1>
      {
        diaryEntires.map(d => (
          <section key={d.id}>
            <h4>{d.date}</h4>
            <p>Visibility: {d.visibility}</p>
            <p>Weather: {d.weather}</p>
          </section>
        ))
      }
    </div>
  )
}

export default App