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

const create = async (newBlog) => {
  const headers = getHeaders()
  const response = await axios.post(baseUrl, newBlog, headers)
  return response.data
}

const update = async (blog) => {
  const headers = getHeaders()
  const url = `${baseUrl}/${blog.id}`
  const response = await axios.put(url, blog, headers)
  return response.data
}

const remove = async (id) => {
  const headers = getHeaders()
  const url = `${baseUrl}/${id}`
  const response = await axios.delete(url, headers)
  return response.data
}

export default { getAll, create, update, remove }
