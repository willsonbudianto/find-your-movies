import Main from '../components/layout/Main'
import { MovieListProvider } from '../context/MovieListContext'
import MovieList from './movie-list/MovieList'

const SearchReultIndex = (): JSX.Element => {
  return (
    <MovieListProvider>
      <Main>
        <MovieList />
      </Main>
    </MovieListProvider>
  )
}

export default SearchReultIndex
