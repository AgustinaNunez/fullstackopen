import { useQuery, useSubscription } from "@apollo/client"
import { BOOK_ADDED, QUERY_ALL_BOOKS } from "../graphql"
import { useState } from "react"

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const {
    loading: loadingFiltered,
    data: dataFiltered,
    refetch: refetchFiltered,
  } = useQuery(QUERY_ALL_BOOKS, {
    variables: { genre }
  })
  const booksFiltered = loadingFiltered ? [] : dataFiltered?.allBooks

  const {loading, data, refetch} = useQuery(QUERY_ALL_BOOKS)
  const allBooks = loading ? [] : data?.allBooks

  const { data: newBookData } = useSubscription(BOOK_ADDED);
  if (newBookData) {
    refetchFiltered()
    refetch()
  }
  
  if (!props.show) {
    return null
  }

  const genres = allBooks
    .map(book => book.genres)
    .flat()
    .filter((value, i, self) => self.indexOf(value) === i)

  return (
    <div>
      <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0}}>
        <h2>books</h2>{genre && <p>(in genre <b>{genre}</b>)</p>}
      </div> 
      {genres.map(genre =>
        <button key={genre} onClick={() => setGenre(genre)}>
          {genre}
        </button>
      )}
      <button onClick={() => setGenre(null)}>all genres</button>
      {booksFiltered?.length
        ? <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {booksFiltered.map((b) => (
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
