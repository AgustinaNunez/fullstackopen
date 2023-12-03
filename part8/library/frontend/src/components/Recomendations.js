import { useQuery } from "@apollo/client"
import { QUERY_ALL_BOOKS, QUERY_ME } from "../graphql"

const Recommendations = (props) => {
  const user = useQuery(QUERY_ME)
  const favoriteGenre = user.loading ? null : user.data?.me?.favoriteGenre

  const result = useQuery(QUERY_ALL_BOOKS, {
    variables: { genre: favoriteGenre },
  })
  const books = result.loading ? [] : result.data?.allBooks

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      {favoriteGenre && <p>books in your favorite genre <b>{favoriteGenre}</b></p>}
      {(favoriteGenre && books?.length)
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
        : <p>No books recommended</p>
      }
    </div>
  )
}

export default Recommendations
