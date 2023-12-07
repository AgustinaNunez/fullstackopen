import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommendations from './components/Recomendations'
import { useApolloClient, useMutation, useSubscription } from '@apollo/client'
import { BOOK_ADDED, LOGIN, QUERY_ALL_BOOKS } from './graphql'

export const updateCache = (cache, query, bookAdded) => {
  const uniqByTitle = (a) => {
    const seen = new Set()
    return a.filter((item) => {
      const k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }
  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(bookAdded)),
    }
  })
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const { bookAdded } = data.data
      window.alert(`New book '${bookAdded.title}' from '${bookAdded.author.name}' added!`)
      updateCache(client.cache, { query: QUERY_ALL_BOOKS }, bookAdded)
    },
  })

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })
  
  useEffect(() => {
    const localToken = localStorage.getItem('token')
    if (localToken) {
      setToken(localToken)
    }
  }, [])

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('token', token)
    }
  }, [result.data])

  const onLogin = async (event) => {
    event.preventDefault()
    setPage('authors')
    login({ variables: { username, password } })
  }

  const onLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  const PAGE = {
    AUTHORS: 'authors',
    BOOKS: 'books',
    ADD: 'add',
    RECOMMENDATIONS: 'recommendations',
    LOGIN: 'login',
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage(PAGE.AUTHORS)}>authors</button>
        <button onClick={() => setPage(PAGE.BOOKS)}>books</button>
        {token
          ? <>
              <button onClick={() => setPage(PAGE.ADD)}>add book</button>
              <button onClick={() => setPage(PAGE.RECOMMENDATIONS)}>recommendations</button>
              <button onClick={onLogout}>logout</button>
            </>
          : <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors show={page === PAGE.AUTHORS} />
      <Books show={page === PAGE.BOOKS} />
      <NewBook show={page === PAGE.ADD} />
      <Recommendations show={page === PAGE.RECOMMENDATIONS} />
      {page === 'login' &&
        <form onSubmit={onLogin}>
          <div>
            username
            <input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              value={password}
              type="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      }
    </div>
  )
}

export default App
