import isEmpty from 'lodash/isEmpty'
import { Suspense, useEffect } from 'react'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useGetNowPlayingMovieList } from '../../../api/query/movie-list'
import MovieCard from '../../../components/card/MovieCard'
import { useGlobalContext } from '../../../context/GlobalContext'

const NowPlayingMovieSlide: React.FC = (): React.ReactElement | null => {
  const { handleChangeState: changeGlobalContext } = useGlobalContext()

  const { data: nowPlayingMovieListData, isFetching: isFetchingMovieList } =
    useGetNowPlayingMovieList(
      {
        language: 'en - US',
        page: 1,
      },
      {
        enabled: true,
      },
    )

  useEffect(() => {
    if (isFetchingMovieList) {
      changeGlobalContext('isLoading', true)
      changeGlobalContext('loadingMessage', 'Please Wait...')

      return
    }

    changeGlobalContext('isLoading', false)
    changeGlobalContext('loadingMessage', '')
  }, [isFetchingMovieList])

  if (isEmpty(nowPlayingMovieListData?.results)) {
    return null
  }

  return (
    <Suspense fallback={null}>
      <p className='text-2xl text-white font-bold pt-6 px-3'>Now Playing</p>
      <Swiper
        breakpoints={{
          445: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          660: {
            slidesPerView: 4,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 6,
            spaceBetween: 35,
          },
        }}
        className='z-0'
        modules={[Navigation]}
        navigation={true}
        slidesPerView={2}
        spaceBetween={15}
      >
        {nowPlayingMovieListData?.results?.map((movie: any) => {
          const { title, id, poster_path, release_date, vote_average } = movie

          return (
            <SwiperSlide className='flex items-center justify-center h-[400px]' key={id}>
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

export default NowPlayingMovieSlide
