import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { EDIT_AUTHOR, QUERY_ALL_AUTHORS } from "../graphql"

const EditAuthor = () => {
  const [born, setBorn] = useState('')
  const [name, setName] = useState('')

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
    
    setName('')
    setBorn('')
  }

  return (
    <>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
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