import { Suspense } from 'react'
import NowPlayingMovieSlide from './components/NowPlayingMovieSlide'
import PopularMovieList from './components/PopularMovieList'
import TopRatedMovieSlide from './components/TopRatedMovieSlide'
import UpcomingMovieSlide from './components/UpcomingMovieSlide'

const MovieList: React.FC = (): React.ReactElement | null => {
  return (
    <Suspense fallback={null}>
      <NowPlayingMovieSlide />

      <TopRatedMovieSlide />

      <UpcomingMovieSlide />

      <PopularMovieList />
    </Suspense>
  )
}

export default MovieList
