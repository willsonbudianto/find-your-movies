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
        page: 1,
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
      <div className='custom-swiper-container-2'>
        <div className='flex flex-col text-white pt-6 px-3'>
          <p className='text-2xl font-bold'>Upcoming</p>
          <p className='font-light pt-1'>
            Period Date: {dayjs(upcomingMovieListData?.dates?.minimum).format('DD MMMM YYYY')} -{' '}
            {dayjs(upcomingMovieListData?.dates?.maximum).format('DD MMMM YYYY')}
          </p>
        </div>
        <Swiper modules={[Navigation]} navigation={true} slidesPerView={6} spaceBetween={35}>
          {upcomingMovieListData?.results?.map((movie: any) => {
            const { title, id, poster_path, release_date, vote_average } = movie

            return (
              <SwiperSlide key={movie.id} style={{ height: '400px', alignContent: 'center' }}>
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

export default UpcomingMovieSlide
