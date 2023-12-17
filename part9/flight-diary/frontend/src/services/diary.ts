import axios from 'axios'
import { DiaryEntry, NewDiaryEntry } from '../types'

const diaryUrl = 'http://localhost:3000/api/diaries'

const getAll = async (): Promise<DiaryEntry[]> => {
  const response = await axios.get<DiaryEntry[]>(diaryUrl)
  return response.data
}

const getById = async (id: string) => {
  const response = await axios.get<DiaryEntry>(`${diaryUrl}/${id}`)
  return response.data
}

const create = async (newDiaryEntry: NewDiaryEntry) => {
  try {
    const response = await axios.post<DiaryEntry>(diaryUrl, newDiaryEntry)
    return response.data
  } catch(error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message)
    } else {
      throw new Error('Unknown error')
    }
  }
}

export default {
  getAll,
  getById,
  create,
}