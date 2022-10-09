import { useState, useEffect } from "react"
import { gql, useMutation } from '@apollo/client'

const LOGIN = gql`
mutation Login(
    $username: String!, 
    $password: String!
) {
    login(
        username: $username,
        password: $password
    ) {
        value
    }
}
`

const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [ login, result ] = useMutation(LOGIN, {
        onError: (error) => {
          console.log(error.graphQLErrors[0].message)
        }
    })

    useEffect(() => {
        if ( result.data ) {
            const token = result.data.login.value;
            props.setToken(token);
            localStorage.setItem("bookapp-user-token", token);
            props.setPage("authors");
        }
    }, [result.data]) 

    const submit = async (event) => {
        event.preventDefault()
        await login({ variables: { username, password } })
    }

    if (!props.show) {
        return null;
      }

    return (
        <form onSubmit={submit}>
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
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
            />
            </div>
            <button type="submit">login</button>
        </form>
    )
}

export default Login