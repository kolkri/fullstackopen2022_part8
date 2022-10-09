import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'


const ALL_BOOKS = gql`
query allBooks($genre: String) {
  allBooks(genre: $genre) {
    title
    author 
    published
    genres
  }
}
`

const ALL_GENRES = gql`
query allGenres {
  allGenres
}
`
const Books = (props) => {

    const [genre, setGenre] = useState('')

    const books = useQuery(ALL_BOOKS, {
      variables: { genre },
    })

    const genreResult = useQuery(ALL_GENRES)


    if (!props.show) {
      return null
    }


    if (books.loading)  {
      return <div>loading...</div>
    }
  
    return (
      <div>
        <h2>books</h2>
        {genre ==='' ? <div>all genres</div> :<div>in genre '{genre}'</div>}
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {books.data.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          {genreResult.data.allGenres.map((g) => (
            <button
              key={g}
              onClick={() => setGenre(g)}
            >{g}</button>
          ))}
          <button
            onClick={() => setGenre("")}
          >
            All genres
          </button>
    </div>
      </div>
    )
  }
  
  export default Books