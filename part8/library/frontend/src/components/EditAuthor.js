import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import Select from 'react-select'
import { EDIT_AUTHOR, QUERY_ALL_AUTHORS } from "../graphql"

const EditAuthor = ({authors}) => {
  const [born, setBorn] = useState('')
  const [name, setName] = useState(null)
  const token = localStorage.getItem('token')

  const nameOptions = authors.map(author => ({
    label: author.name,
    value: author.name
  }))

  const [editAuthor, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [  {query: QUERY_ALL_AUTHORS } ],
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      console.log(messages)
    }
  })

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log('author not found')
    }
  }, [result.data])

  const submit = async (e) => {
    e.preventDefault()

    await editAuthor({
      variables: {
        name,
        setBornTo: Number(born)
      }
    })
    
    setName(null)
    setBorn('')
  }

  if (!token) return null

  return (
    <>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <Select
            defaultValue={name}
            onChange={({ value }) => setName(value)}
            options={nameOptions}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </>
  )
}

export default EditAuthor