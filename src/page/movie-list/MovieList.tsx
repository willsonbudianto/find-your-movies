import { Suspense } from 'react'
import DiscoverMovieList from './components/DiscoverMovieList'
import NowPlayingMovieSlide from './components/NowPlayingMovieSlide'
import TopRatedMovieSlide from './components/TopRatedMovieSlide'
import UpcomingMovieSlide from './components/UpcomingMovieSlide'

const MovieList: React.FC = (): React.ReactElement => {
  return (
    <Suspense fallback={null}>
      <div className='max-w-full w-full md:w-[768px] lg:w-[1024px] xl:w-[1280px] overflow-hidden'>
        <NowPlayingMovieSlide />

        <TopRatedMovieSlide />

        <UpcomingMovieSlide />

        <DiscoverMovieList />
      </div>
    </Suspense>
  )
}

export default MovieList
