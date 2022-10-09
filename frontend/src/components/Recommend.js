import { gql, useQuery } from "@apollo/client";

const ME = gql`
  query {
    me {
      username
      
    }
  }
`
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


const Recommend = (props) => {

    const { userData } = useQuery(ME)

    const favoriteGenre = userData

    const booksResult = useQuery(ALL_BOOKS, {
        variables: { genre: favoriteGenre },
      });

    console.log('user',userData);
    console.log('books', booksResult);


    if (!props.show) {
        return null;
      }
      
    return (
        <div>
            <h2>recommendations</h2>
            <div>books in your favorite genre 'x'</div>
        </div>
    )
}

export default Recommend