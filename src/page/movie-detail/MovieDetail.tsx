import dayjs from 'dayjs'
import isEmpty from 'lodash/isEmpty'
import { Suspense, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Skeleton from 'react-loading-skeleton'
import config from '../../../config'
import { useGetMovieCastData, useGetMovieDetailData } from '../../api/query/movie-detail'
import ErrorNoResult from '../../components/error/ErrorNoResult'
import CircularProgressBar from '../../components/misc/CircularProgressBar'
import { useGlobalContext } from '../../context/GlobalContext'
import UtilDollarCurrencyFormat from '../../utils/UtilDollarCurencyFormat'
import UtilGetMovieDuration from '../../utils/UtilGetMovieDuration'
import UtilGetParam from '../../utils/UtilGetParam'
import MovieDetailCastSlider from './components/MovieDetailCastSlider'

const MovieDetail: React.FC = (): React.ReactElement | null => {
  const { handleChangeState: changeGlobalContext } = useGlobalContext()

  const id = UtilGetParam('id')

  const { data: movieDetailData, isFetching: isFetchingMovieDetailData } = useGetMovieDetailData(
    {
      id,
    },
    {
      enabled: true,
    },
  )

  const { data: movieMovieCastData, isFetching: isFetchingMovieCastData } = useGetMovieCastData(
    {
      movie_id: id,
    },
    {
      enabled: true,
    },
  )

  const handleBackNavigation = () => {
    const currentUrl = window.location.href
    const savedUrl = localStorage.getItem('savedUrl')

    if (savedUrl && savedUrl !== currentUrl) {
      window.history.back()
    } else {
      window.location.href = '/'
    }
  }

  const dotSeparator = () => {
    return (
      <LazyLoadImage
        alt='dots-separator'
        className='rounded-t-xl'
        height={24}
        placeholder={<Skeleton height={24} width={24} />}
        src={`${config.assetsURL}icon/dot-icon.svg`}
        width={24}
      />
    )
  }

  useEffect(() => {
    localStorage.setItem('savedUrl', window.location.href)
  }, [])

  useEffect(() => {
    if (isFetchingMovieDetailData || isFetchingMovieCastData) {
      changeGlobalContext('isLoading', true)
      changeGlobalContext('loadingMessage', 'Please Wait...')

      return
    }

    changeGlobalContext('isLoading', false)
    changeGlobalContext('loadingMessage', '')
  }, [isFetchingMovieDetailData, isFetchingMovieCastData])

  if (isFetchingMovieDetailData || isFetchingMovieCastData) {
    return null
  }

  if (isEmpty(movieDetailData) || isEmpty(movieMovieCastData)) {
    return <ErrorNoResult />
  }

  return (
    <Suspense fallback={null}>
      <div className='flex flex-row py-4 items-center'>
        <LazyLoadImage
          alt='back-button-cursor'
          className='cursor-pointer'
          height={10}
          placeholder={<Skeleton height={10} width={50} />}
          src={`${config.assetsURL}icon/arrow-sm-left-yellow.svg`}
          width={50}
          onClick={() => handleBackNavigation()}
        />

        <p
          className='text-base min-[400px]:text-2xl text-secondary-100 font-bold cursor-pointer'
          onClick={() => handleBackNavigation()}
        >
          Back
        </p>
      </div>
      <div className='flex flex-col'>
        <div className='flex flex-col md:flex-row p-4 text-white font-semibold gap-4 items-start'>
          <div className='flex flex-shrink-0 !h-[400px] !w-[250px]'>
            <LazyLoadImage
              alt='movie-detail-poster'
              className='rounded-xl'
              height={400}
              placeholder={<Skeleton height={400} width={250} />}
              src={`${config.movieImageURL}${movieDetailData?.poster_path}`}
              width={250}
            />
          </div>

          <div className='flex flex-col flex-wrap w-full'>
            <p className='text-4xl font-extrabold text-secondary-100'>
              {movieDetailData?.title}{' '}
              <span className='text-white'>
                ({dayjs(movieDetailData?.release_date).format('YYYY')})
              </span>
            </p>

            <p className='text-base font-light italic'>{movieDetailData?.tagline}</p>

            <div className='flex flex-row'>
              <p className='text-md text-white'>
                {dayjs(movieDetailData?.release_date).format('DD MMMM YYYY')}
              </p>

              {dotSeparator()}

              <p className='text-md text-white'>{UtilGetMovieDuration(movieDetailData?.runtime)}</p>
            </div>

            <div className='flex flex-col py-6'>
              <p className='text-xl font-semibold text-secondary-100'>Overview</p>
              <p className='text-lg font-light text-white'>{movieDetailData?.overview}</p>
            </div>

            <div className='flex flex-row gap-5'>
              <div className='flex flex-col'>
                <p className='text-md font-semibold text-secondary-100'>Status</p>
                <p className='text-sm font-light text-white'>{movieDetailData?.status}</p>
              </div>

              <div className='flex flex-col'>
                <p className='text-md font-semibold text-secondary-100'>Budget</p>
                <p className='text-sm font-light text-white'>
                  {UtilDollarCurrencyFormat(movieDetailData?.budget)}
                </p>
              </div>

              <div className='flex flex-col'>
                <p className='text-md font-semibold text-secondary-100'>Revenue</p>
                <p className='text-sm font-light text-white'>
                  {UtilDollarCurrencyFormat(movieDetailData?.revenue)}
                </p>
              </div>
            </div>
          </div>

          <div className='flex flex-row justify-center items-center gap-3'>
            <p className='text-sm text-white text-center'>Viewer Vote</p>
            <CircularProgressBar
              percentage={Math?.floor(movieDetailData?.vote_average * 10)}
              percentageFontClassName='text-xl'
              size={80}
            />
          </div>
        </div>

        <div className='flex flex-row flex-wrap gap-3 py-2 px-4'>
          {movieDetailData?.genres?.map((genre: any) => {
            const { id, name } = genre

            return (
              <div className='border border-solid border-secondary-100 rounded-full' key={id}>
                <p className='text-sm font-bold text-secondary-100 p-2'>{name}</p>
              </div>
            )
          })}
        </div>

        <MovieDetailCastSlider />
      </div>
    </Suspense>
  )
}

export default MovieDetail
