import { useState } from 'react'
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from '../types'
import diaryService from '../services/diary'

type DiaryFormProps = {
  diaryEntires: DiaryEntry[];
  setDiaryEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
}
const DiaryForm = ({diaryEntires, setDiaryEntries}: DiaryFormProps) => {
  const [date, setDate] = useState<string>('')
  const [weather, setWeather] = useState<string>('')
  const [visibility, setVisibility] = useState<string>('')
  const [comment, setComment] = useState<string>('')

  const onNewDiaryEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const newDiaryEntry: NewDiaryEntry = {
      date,
      weather: weather as Weather,
      visibility: visibility as Visibility,
      comment,
    }
    const diaryEntry: DiaryEntry = await diaryService.create(newDiaryEntry)
    setDiaryEntries(diaryEntires.concat(diaryEntry))
    setDate('')
    setWeather('')
    setVisibility('')
    setComment('')
  }

  return (
    <form onSubmit={onNewDiaryEntry}>
      <h2>Add new</h2>
      <div>
        Date <input
          type='date'
          value={date}
          onChange={({ target }) => {setDate(target.value)}}
        />
      </div>
      <div>
        Weather <select name='weather' onChange={({ target }) => {setWeather(target.value)}}>
          <option>- Choose weather -</option>
          {
            Object.values(Weather).map(weather => 
              <option key={weather} value={weather}>{weather}</option>
            )
          }
        </select>
      </div>
      <div>
        Visibility <select name='visibility' onChange={({ target }) => {setVisibility(target.value)}}>
          <option>- Choose visibility -</option>
          {
            Object.values(Visibility).map(visibility => 
              <option key={visibility} value={visibility}>{visibility}</option>
            )
          }
        </select>
      </div>
      <div>
        Comment <input
          type='text'
          value={comment}
          onChange={({ target }) => {setComment(target.value)}}
          style={{width: '50%'}}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  )
}

export default DiaryForm