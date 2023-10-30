import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'

let headers = null
const getHeaders = () => {
  if (headers) return headers
  const userJSON = localStorage.getItem('user')
  if (userJSON) {
    const user = JSON.parse(userJSON)
    return {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }
  }
}

const getAll = async () => {
  const headers = getHeaders()
  const response = await axios.get(baseUrl, headers)
  return response.data
}

export default { getAll }
