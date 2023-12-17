import { useState } from 'react'
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from '../types'
import diaryService from '../services/diary'
import RadioOptions from './RadioOptions';

type DiaryFormProps = {
  diaryEntires: DiaryEntry[];
  setDiaryEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
}
const DiaryForm = ({diaryEntires, setDiaryEntries}: DiaryFormProps) => {
  const [date, setDate] = useState<string>('')
  const [weather, setWeather] = useState<string>('')
  const [visibility, setVisibility] = useState<string>('')
  const [comment, setComment] = useState<string>('')

  const [notification, setNotification] = useState<string>('')

  const onNewDiaryEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const newDiaryEntry: NewDiaryEntry = {
      date,
      weather: weather as Weather,
      visibility: visibility as Visibility,
      comment,
    }
    try {
      const diaryEntry: DiaryEntry = await diaryService.create(newDiaryEntry)
      setDiaryEntries(diaryEntires.concat(diaryEntry))
    } catch(error) {
      if (error && typeof error === 'object') {
        setNotification(error.toString())
      }
      setTimeout(() => {
        setNotification('')
      }, 5000)
    }
    setDate('')
    setWeather('')
    setVisibility('')
    setComment('')
  }

  return (
    <form onSubmit={onNewDiaryEntry}>
      <h2>Add new</h2>
      {notification && <p>{notification}</p>}
      <div>
        Date <input
          type='date'
          value={date}
          onChange={({ target }) => {setDate(target.value)}}
        />
      </div>
      <div>
        Weather <RadioOptions 
          name='weather'
          options={Object.values(Weather)}
          selectedValue={weather} 
          onChange={setWeather} 
        />
      </div>
      <div>
        Visibility <RadioOptions 
          name='visibility' 
          options={Object.values(Visibility)} 
          selectedValue={visibility} 
          onChange={setVisibility} 
        />
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