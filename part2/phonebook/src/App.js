import { useState, useEffect } from 'react'
import axios from 'axios'

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
    persons.some(person => person.name === newName)
      ? alert(`${newName} is already added to phonebook`)
      : setPersons([
          ...persons,
          {
            name: newName, 
            number: newNumber
          }
        ])
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

const Persons = ({filter, persons}) => (
  <>
  {
    persons
      .filter(({name}) => name.includes(filter))
      .map(({name, number}) => <p key={number}>{name} {number}</p>)
  }
  </>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h3>Numbers</h3>
      <Persons filter={filter} persons={persons} />
    </div>
  )
}

export default App