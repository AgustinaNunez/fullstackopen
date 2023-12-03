import { useQuery } from "@apollo/client"
import { QUERY_ALL_BOOKS } from "../graphql"
import { useState } from "react"

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const result = useQuery(QUERY_ALL_BOOKS)
  const books = result.loading ? [] : result.data?.allBooks

  if (!props.show) {
    return null
  }

  const getGenres = () => books
    .map(book => book.genres)
    .flat()
    .filter((value, i, self) => self.indexOf(value) === i)

  return (
    <div>
      <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0}}>
        <h2>books</h2>{genre && <p>(in genre <b>{genre}</b>)</p>}
      </div> 
      {getGenres().map(genre =>
        <button key={genre} onClick={() => setGenre(genre)}>
          {genre}
        </button>
      )}
      <button onClick={() => setGenre(null)}>all genres</button>
      {books?.length
        ? <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {books
              .filter(b => genre ? b.genres.includes(genre) : true)
              .map((b) => (
                <tr key={b.title}>
                  <td>{b.title}</td>
                  <td>{b.author.name}</td>
                  <td>{b.published}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        : <p>No books founded</p>
      }
    </div>
  )
}

export default Books
