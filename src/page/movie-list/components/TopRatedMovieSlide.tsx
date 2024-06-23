import isEmpty from 'lodash/isEmpty'
import { Suspense, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Skeleton from 'react-loading-skeleton'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import config from '../../../../config'
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
        <div className='flex flex-col pt-6 px-3'>
          <div className='flex flex-row items-center gap-3'>
            <LazyLoadImage
              alt='top-rated-icon'
              height={24}
              placeholder={<Skeleton height={24} width={24} />}
              src={`${config.assetsURL}icon/top-rated-icon.svg`}
              width={24}
            />
            <p className='text-secondary-100 text-2xl font-bold'>Top Rated</p>
          </div>
          <p className='text-white font-light pt-1'>Based on Viewers Vote Average</p>
        </div>
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
          {topRatedMovieListData?.results?.map((movie: any, index: number) => {
            const { title, id, poster_path, release_date, vote_average } = movie

            return (
              <SwiperSlide className='flex items-center justify-center h-[400px]' key={id}>
                <MovieCard
                  id={id}
                  movieRank={index + 1}
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
