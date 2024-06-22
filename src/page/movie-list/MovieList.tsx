import { Suspense } from 'react'
import DiscoverMovieList from './components/DiscoverMovieList'
import NowPlayingMovieSlide from './components/NowPlayingMovieSlide'
import TopRatedMovieSlide from './components/TopRatedMovieSlide'
import UpcomingMovieSlide from './components/UpcomingMovieSlide'

const MovieList: React.FC = (): React.ReactElement | null => {
  return (
    <Suspense fallback={null}>
      <NowPlayingMovieSlide />

      <TopRatedMovieSlide />

      <UpcomingMovieSlide />

      <DiscoverMovieList />
    </Suspense>
  )
}

export default MovieList
