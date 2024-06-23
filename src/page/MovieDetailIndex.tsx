import Main from '../components/layout/Main'
import { MovieDetailProvider } from '../context/MovieDetailContext'
import MovieDetail from './movie-detail/MovieDetail'

const MovieListIndex = (): JSX.Element => {
  return (
    <MovieDetailProvider>
      <Main>
        <MovieDetail />
      </Main>
    </MovieDetailProvider>
  )
}

export default MovieListIndex
