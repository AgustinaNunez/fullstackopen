import axios from 'axios'
const baseUrl = '/api/blogs'

let headers = null
const getHeaders = () => {
  if (headers) return headers
  const userJSON = localStorage.getItem('user')
  if (userJSON) {
    const user = JSON.parse(userJSON)
    return {
      headers: {
        Authorization: `Bearer ${user?.token}`
      }
    }
  }
}

const getAll = () => {
  const headers = getHeaders()
  const request = axios.get(baseUrl, headers)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const headers = getHeaders()
  const request = await axios.post(baseUrl, newBlog, headers)
  return request
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create }