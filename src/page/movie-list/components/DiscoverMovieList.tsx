import isEmpty from 'lodash/isEmpty'
import { Suspense, useEffect, useState } from 'react'
import { IconContext } from 'react-icons'
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai'
import ReactPaginate from 'react-paginate'
import { useLoadMoreDiscoverMovieData } from '../../../api/mutation/movie-list'
import { useGetDiscoverMovieList } from '../../../api/query/movie-list'
import ButtonOutline from '../../../components/button/ButtonOutline'
import MovieCard from '../../../components/card/MovieCard'
import DropdownBase from '../../../components/dropdown/DropdownBase'
import ErrorNoResult from '../../../components/error/ErrorNoResult'
import { useGlobalContext } from '../../../context/GlobalContext'
import { useMovieListContext } from '../../../context/MovieListContext'
import UtilSnackBarError from '../../../utils/UtilSnackBarError'

const DiscoverMovieList: React.FC = (): React.ReactElement | null => {
  const { state: globalContext, handleChangeState: changeGlobalContext } = useGlobalContext()

  const genresData = globalContext?.genresData

  const { state: movieListContext, handleChangeState: changeMovieListContext } =
    useMovieListContext()

  const [page, setPage] = useState<number>(1)
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true)

  const [isOpenFilterGenres, setIsOpenFilterGenres] = useState<boolean>(false)

  const {
    isFetching: isFetchingDiscoverMovieList,
    refetch,
    isRefetching,
  } = useGetDiscoverMovieList(
    {
      language: 'en - US',
      page: parseInt(movieListContext?.page),
      with_genres: movieListContext?.genres?.id,
    },
    {
      enabled: true,
    },
  )

  const { mutate: loadMoreDiscoverMovie, isLoading }: any = useLoadMoreDiscoverMovieData({
    onSuccess: (res: any) => {
      if (res?.data && res?.data?.results) {
        changeMovieListContext('movieListResult', [
          ...movieListContext.movieListResult,
          ...res.data.results,
        ])

        return
      }

      UtilSnackBarError('searchMovieError', 'top-center')
    },
  })

  const handleOnChange = (event: any) => {
    changeMovieListContext('page', event.selected + 1)
  }

  const handleLoadMoreData = () => {
    const paginationPage = movieListContext?.page

    let currentPage = paginationPage + 1

    if (page >= paginationPage && !isFirstLoad) {
      currentPage = page + 1
    }

    setIsFirstLoad(false)
    loadMoreDiscoverMovie({
      page: currentPage,
      language: 'en - US',
      with_genres: movieListContext?.genres?.id,
    })
    setPage(currentPage)
  }

  const renderDiscoverMoviePagination = () => {
    return (
      <div className='flex justify-items-center items-center py-3'>
        <ReactPaginate
          activeClassName='bg-primary-100 text-white rounded-full'
          breakLabel='...'
          className='flex flex-grow flex-wrap justify-between items-center text-white'
          containerClassName='flex flex-wrap justify-center items-center'
          forcePage={movieListContext?.page - 1}
          nextLabel={
            <IconContext.Provider value={{ color: '#FFFFFF', size: '44px' }}>
              <AiFillRightCircle />
            </IconContext.Provider>
          }
          pageClassName='p-4 h-4 w-4 flex justify-center items-center'
          pageCount={500}
          previousLabel={
            <IconContext.Provider value={{ color: '#FFFFFF', size: '44px' }}>
              <AiFillLeftCircle />
            </IconContext.Provider>
          }
          onPageChange={handleOnChange}
        />
      </div>
    )
  }

  useEffect(() => {
    refetch()
  }, [movieListContext?.page, movieListContext?.genres])

  useEffect(() => {
    setIsFirstLoad(true)
  }, [isRefetching])

  useEffect(() => {
    if (isFetchingDiscoverMovieList || isLoading) {
      changeGlobalContext('isLoading', true)
      changeGlobalContext('loadingMessage', 'Please Wait...')

      return
    }

    changeGlobalContext('isLoading', false)
    changeGlobalContext('loadingMessage', '')
  }, [isFetchingDiscoverMovieList, isLoading])

  if (isFetchingDiscoverMovieList || isLoading) {
    return null
  }

  if (isEmpty(movieListContext?.movieListResult)) {
    return <ErrorNoResult />
  }

  return (
    <Suspense fallback={null}>
      <div className='flex flex-row items-center pt-6 gap-1'>
        <p className='text-xl text-white font-bold'>Discover</p>
        <div className='flex flex-row flex-grow items-center justify-end'>
          <p className='max-[550px]:hidden text-sm text-secondary-100 font-bold pr-4'>
            Filter By Genres
          </p>
          <DropdownBase
            title={!isEmpty(movieListContext?.genres) ? `${movieListContext?.genres?.name}` : 'All'}
            onClick={() => setIsOpenFilterGenres(!isOpenFilterGenres)}
          >
            {isOpenFilterGenres && (
              <div className='absolute top-12 left-1 z-30 w-[95%]'>
                <div className='flex flex-col flex-grow px-4 bg-white shadow-md w-full rounded-lg fade-in-effect z-10 overflow-y-auto max-h-44'>
                  {!isEmpty(movieListContext?.genres) && (
                    <div
                      className='flex flex-grow gap-1 py-3 cursor-pointer text-xs font-medium hover:text-base'
                      onClick={() => {
                        changeMovieListContext('genres', '')
                        setIsOpenFilterGenres(false)
                      }}
                    >
                      Clear Filter
                    </div>
                  )}
                  {genresData?.map((genres: any, index: number) => {
                    const { name } = genres

                    return (
                      <div
                        className='flex flex-col flex-grow gap-1 py-3 cursor-pointer text-xs font-medium hover:text-base'
                        key={`genres-${index}`}
                        onClick={() => {
                          changeMovieListContext('genres', genres)
                          setIsOpenFilterGenres(false)
                        }}
                      >
                        {name}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </DropdownBase>
        </div>
      </div>

      {renderDiscoverMoviePagination()}

      <div className='grid xl:grid-cols-5 min-[1048px]:grid-cols-4 min-[570px]:grid-cols-3 grid-cols-2 gap-5'>
        {movieListContext?.movieListResult?.map((movie: any, index: number) => {
          const { title, id, poster_path, release_date, vote_average } = movie

          if (!title || !poster_path || !release_date) {
            return
          }

          return (
            <MovieCard
              id={id}
              key={`${index}-${id}`}
              poster_path={poster_path}
              release_date={release_date}
              size='x-large'
              title={title}
              vote_average={vote_average}
            />
          )
        })}
      </div>

      {movieListContext?.page !== 500 && (
        <div className='pt-5'>
          <ButtonOutline
            additionalClass='w-full py-3 px-6 font-bold'
            title='Load More'
            onClick={handleLoadMoreData}
          />
        </div>
      )}

      {renderDiscoverMoviePagination()}
    </Suspense>
  )
}

export default DiscoverMovieList
