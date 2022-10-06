import { gql, useQuery, useMutation } from '@apollo/client'
import { useState } from 'react'


const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name,
      born,
      bookCount
    }
  }
`

const EDIT_AUTHOR = gql`
mutation EditAuthor(
  $name: String!,
  $setBornTo: Int!

) {
  editAuthor(
    name: $name,
    setBornTo: $setBornTo
  ) {
      name
      born
  }
}
`


const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('')
  const [ born, setBorn ] = useState('') 

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
  })
  
    if (!props.show) {
      return null
    }

    if (authors.loading)  {
      return <div>loading...</div>
    }

    const submit = async (event) => {
      event.preventDefault()
      console.log('test', name, born );
  
      editAuthor({  variables: { name, setBornTo: Number(born) } })
  
      setName('')
      setBorn('')
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
            {authors.data.allAuthors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td> 
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Set birthyear</h3>
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
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type="submit">update author</button>
        </form>

      </div>
    )
  }
  
  export default Authors