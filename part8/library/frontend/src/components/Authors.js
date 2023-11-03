import { useQuery } from '@apollo/client'
import EditAuthor from './EditAuthor'
import { QUERY_ALL_AUTHORS } from '../graphql'

const Authors = (props) => {
  const result = useQuery(QUERY_ALL_AUTHORS)
  const authors = result.loading ? [] : result.data.allAuthors
  
  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditAuthor />
    </div>
  )
}

export default Authors
