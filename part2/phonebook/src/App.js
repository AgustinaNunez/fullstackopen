import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({filter, setFilter}) => (
  <div>
    filter shown with: <input type='text' value={filter} onChange={({target}) => setFilter(target.value)} />
  </div>
)

const PersonForm = ({persons, setPersons}) => {
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
      }
      return
    } 
    personService
      .create({ name: newName,  number: newNumber })
      .then(data => setPersons([...persons, data]))
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

const Person = ({id, number, name, deletePerson}) => {
  const onClickDelete = () => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService.deleteById(id).then(() => deletePerson(id))
    }
  }

  return (
    <p key={number}>{name} {number} {' '}
      <button onClick={onClickDelete}>delete</button>
    </p>
  )
}

const Persons = ({filter, persons, setPersons}) => {
  const deletePerson = (id) => {
    setPersons(persons.filter(person => person.id !== id))
  }

  return (
    <>
      {
        persons
          .filter(({name}) => name.includes(filter))
          .map(({id, name, number}) => (
            <Person
              key={id}
              id={id}
              name={name}
              number={number}
              deletePerson={deletePerson}
            />
          ))
      }
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService.getAll().then(data => setPersons(data))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h3>Numbers</h3>
      <Persons filter={filter} persons={persons} setPersons={setPersons} />
    </div>
  )
}

export default App