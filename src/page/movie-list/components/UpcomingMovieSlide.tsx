import dayjs from 'dayjs'
import isEmpty from 'lodash/isEmpty'
import { Suspense, useEffect } from 'react'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useGetUpcomingMovieList } from '../../../api/query/movie-list'
import MovieCard from '../../../components/card/MovieCard'
import { useGlobalContext } from '../../../context/GlobalContext'

const UpcomingMovieSlide: React.FC = (): React.ReactElement | null => {
  const { handleChangeState: changeGlobalContext } = useGlobalContext()

  const { data: upcomingMovieListData, isFetching: isFetchingUpcomingMovieList } =
    useGetUpcomingMovieList(
      {
        language: 'en - US',
        page: 2,
      },
      {
        enabled: true,
      },
    )

  useEffect(() => {
    if (isFetchingUpcomingMovieList) {
      changeGlobalContext('isLoading', true)
      changeGlobalContext('loadingMessage', 'Please Wait...')

      return
    }

    changeGlobalContext('isLoading', false)
    changeGlobalContext('loadingMessage', '')
  }, [isFetchingUpcomingMovieList])

  if (isEmpty(upcomingMovieListData?.results)) {
    return null
  }

  return (
    <Suspense fallback={null}>
      <p className='text-2xl font-bold pt-2'>Upcoming Movies</p>
      <p className='text-sm font-medium pb-2'>
        Period Date: {dayjs(upcomingMovieListData?.dates?.minimum).format('DD MMMM YYYY')} -{' '}
        {dayjs(upcomingMovieListData?.dates?.maximum).format('DD MMMM YYYY')}
      </p>
      <Swiper modules={[Navigation]} navigation={true} slidesPerView={6} spaceBetween={35}>
        {upcomingMovieListData?.results?.map((movie: any) => {
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
    </Suspense>
  )
}

export default UpcomingMovieSlide
