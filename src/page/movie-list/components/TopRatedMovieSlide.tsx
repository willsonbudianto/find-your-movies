import isEmpty from 'lodash/isEmpty'
import { Suspense, useEffect } from 'react'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useGetTopRatedMovieList } from '../../../api/query/movie-list'
import MovieCard from '../../../components/card/MovieCard'
import { useGlobalContext } from '../../../context/GlobalContext'

const TopRatedMovieSlide: React.FC = (): React.ReactElement | null => {
  const { handleChangeState: changeGlobalContext } = useGlobalContext()

  const { data: topRatedMovieListData, isFetching: isFetchingTopRatedMovieList } =
    useGetTopRatedMovieList(
      {
        language: 'en - US',
        page: 1,
      },
      {
        enabled: true,
      },
    )

  useEffect(() => {
    if (isFetchingTopRatedMovieList) {
      changeGlobalContext('isLoading', true)
      changeGlobalContext('loadingMessage', 'Please Wait...')

      return
    }

    changeGlobalContext('isLoading', false)
    changeGlobalContext('loadingMessage', '')
  }, [isFetchingTopRatedMovieList])

  if (isEmpty(topRatedMovieListData?.results)) {
    return null
  }

  return (
    <Suspense fallback={null}>
      <div className='custom-swiper-container'>
        <p className='text-2xl font-bold pt-2'>Top Rated Movies</p>
        <p className='text-sm font-medium pb-2'>Based on Viewers Vote Average</p>
        <Swiper modules={[Navigation]} navigation={true} slidesPerView={6} spaceBetween={50}>
          {topRatedMovieListData?.results?.map((movie: any) => {
            const { title, id, poster_path, release_date, vote_average } = movie

            return (
              <SwiperSlide key={movie.id} style={{ height: '350px' }}>
                <MovieCard
                  id={id}
                  poster_path={poster_path}
                  release_date={release_date}
                  title={title}
                  vote_average={vote_average}
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </Suspense>
  )
}

export default TopRatedMovieSlide
