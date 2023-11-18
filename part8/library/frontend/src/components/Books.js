import { useQuery } from "@apollo/client"
import { QUERY_ALL_BOOKS } from "../graphql"

const Books = (props) => {
  const result = useQuery(QUERY_ALL_BOOKS)
  const books = result.loading ? [] : result.data?.allBooks

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      {books?.length
        ? <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {books.map((b) => (
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
        : <p>No books founded</p>
      }
    </div>
  )
}

export default Books
