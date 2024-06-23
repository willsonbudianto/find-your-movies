import MovieDetailAPI from './movie-detail'
import MovieListAPI from './movie-list'
import SearchAPI from './search'

const movieDetailAPI = MovieDetailAPI.create()
const movieListAPI = MovieListAPI.create()
const searchAPI = SearchAPI.create()

export { movieDetailAPI, movieListAPI, searchAPI }
