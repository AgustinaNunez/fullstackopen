import axios from 'axios'

const baseUrl = '/api/persons'

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