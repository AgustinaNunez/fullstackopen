import { useState, useEffect } from 'react'
import personService from './services/persons'

const removeMessage = (setMessage) => {
  setTimeout(() => {
    setMessage(null)
  }, 3000)
}

const Notification = ({message, type}) => {
  if (message === null) return null

  const styles = {
    color: type === 'error' ? 'tomato' : 'green',
    backgroundColor: '#f1f1f1',
    fontSize: '20px',
    fontWeight: '700',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }

  return (
    <div style={styles}>
      {message}
    </div>
  )
}

const Filter = ({filter, setFilter}) => (
  <div>
    filter shown with: <input type='text' value={filter} onChange={({target}) => setFilter(target.value)} />
  </div>
)

const PersonForm = ({persons, setPersons, setMessage}) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const add = (event) => {
    event.preventDefault()
    const person = persons.find(person => person.name === newName)

    if (person) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(person.id, { ...person, number: newNumber })
          .then(data => setPersons(persons.map(p => p.id === person.id ? data : p)))
          .then(() => setMessage({text: `Updated ${newName}`}))
          .catch(error => {
            const {data, status} = error.response
            const errorMessage = status === 400 
              ? data.error
              : `Information of ${person.name} has already been removed from server`
            setMessage({
              text: errorMessage,
              type: 'error'
            })
          })
          .then(() => removeMessage(setMessage))
      }
      return
    } 
    personService
      .create({ name: newName,  number: newNumber })
      .then(data => setPersons([...persons, data]))
      .then(() => setMessage({text: `Added ${newName}`}))
      .then(() => removeMessage(setMessage))
      .catch(error => {
        setMessage({
          text: error.response.data.error,
          type: 'error'
        })
      })
      .then(() => removeMessage(setMessage))
  }

  return (
    <form>
      <div>
        name: <input type='text' value={newName} onChange={({target}) => setNewName(target.value)} />
      </div>
      <div>
        number: <input type='text' value={newNumber} onChange={({target}) => setNewNumber(target.value)} />
      </div>
      <div>
        <button type="submit" onClick={add}>add</button>
      </div>
    </form>
  )
}

const Person = ({id, number, name, deletePerson, setMessage}) => {
  const onClickDelete = () => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService.deleteById(id)
        .then(() => deletePerson(id))
        .catch(() => {
          setMessage({
            text: `Information of ${name} has already been removed from server`,
            type: 'error'
          })
          removeMessage(setMessage)
        })
    }
  }

  return (
    <p key={number}>{name} {number} {' '}
      <button onClick={onClickDelete}>delete</button>
    </p>
  )
}

const Persons = ({filter, persons, setPersons, setMessage}) => {
  const deletePerson = (id) => {
    setPersons(persons.filter(person => person.id !== id))
  }

  return (
    <>
      {
        persons
          .filter(({name}) => name.toLowerCase().includes(filter.toLowerCase()))
          .map(({id, name, number}) => (
            <Person
              key={id}
              id={id}
              name={name}
              number={number}
              deletePerson={deletePerson}
              setMessage={setMessage}
            />
          ))
      }
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then(data => setPersons(data))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      {message && <Notification message={message.text} type={message.type} />}
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} setMessage={setMessage} />
      <h3>Numbers</h3>
      <Persons filter={filter} persons={persons} setPersons={setPersons} setMessage={setMessage} />
    </div>
  )
}

export default App