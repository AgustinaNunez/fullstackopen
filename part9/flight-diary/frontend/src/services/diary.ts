import axios from 'axios'
import { DiaryEntry, NewDiaryEntry } from '../types'

const diaryUrl = 'http://localhost:3000/api/diaries'

const getAll = async (): Promise<DiaryEntry[]> => {
  const response = await axios.get<DiaryEntry[]>(diaryUrl)
  return response.data
}

const create = async (newDiaryEntry: NewDiaryEntry) => {
  const response = await axios.post<DiaryEntry>(diaryUrl, newDiaryEntry)
  return response.data
}

export default {
  getAll,
  create,
}