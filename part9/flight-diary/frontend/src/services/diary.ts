import axios from 'axios'
import { DiaryEntry } from '../types'

const diaryUrl = 'http://localhost:3000/api/diaries'

const getAll = async (): Promise<DiaryEntry[]> => {
  const response = await axios.get<DiaryEntry[]>(diaryUrl)
  return response.data
}

export default {
  getAll,
}