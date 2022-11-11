import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    try {
        return axios.get(baseUrl).then(response => response.data)
    } catch(err) {
        return err.message
    }
}

const create = (person) => {
    try {
        return axios.post(baseUrl, person).then(response => response.data)
    } catch(err) {
        return err.message
    }
}

const update = (id, newDataPerson) => {
    try {
        return axios.put(`${baseUrl}/${id}`, newDataPerson).then(response => response.data)
    } catch(err) {
        return err.message
    }
}

const deleteById = (id) => {
    console.log('id', id)
    try {
        return axios.delete(`${baseUrl}/${id}`)
    } catch(err) {
        return err.message
    }
}

const personService = {
    getAll,
    create,
    update,
    deleteById,
}
export default personService