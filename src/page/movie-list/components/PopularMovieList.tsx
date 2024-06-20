import isEmpty from 'lodash/isEmpty'
import { Suspense, useEffect, useState } from 'react'
import { IconContext } from 'react-icons'
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai'
import ReactPaginate from 'react-paginate'
import { useLoadMorePopularMovieData } from '../../../api/mutation/movie-list'
import { useGetPopularMovieList } from '../../../api/query/movie-list'
import ButtonOutline from '../../../components/button/ButtonOutline'
import MovieCard from '../../../components/card/MovieCard'
import { useGlobalContext } from '../../../context/GlobalContext'
import { useMovieListContext } from '../../../context/MovieListContext'
import UtilSnackBarError from '../../../utils/UtilSnackBarError'

const PopularMovieList: React.FC = (): React.ReactElement | null => {
  const { handleChangeState: changeGlobalContext } = useGlobalContext()

  const { state: movieListContext, handleChangeState: changeMovieListContext } =
    useMovieListContext()

  const [page, setPage] = useState<number>(1)
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true)

  // First fetching popular movie list
  const {
    isFetching: isFetchingPopularMovieList,
    refetch,
    isRefetching,
  } = useGetPopularMovieList(
    {
      language: 'en - US',
      page: parseInt(movieListContext?.page),
    },
    {
      enabled: true,
    },
  )

  const { mutate: loadMorePopularMovie, isLoading }: any = useLoadMorePopularMovieData({
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
    loadMorePopularMovie({ page: currentPage })
    setPage(currentPage)
  }

  const renderPopularMoviePagination = () => {
    return (
      <div className='flex justify-items-center items-center py-3'>
        <ReactPaginate
          activeClassName='bg-cyan-950 text-white rounded-full'
          breakClassName='px-4 py-2'
          breakLabel='...'
          className='flex w-full justify-between items-center'
          containerClassName='list-none p-7 h-7 w-7 flex justify-center items-center'
          forcePage={movieListContext?.page - 1}
          nextLabel={
            <IconContext.Provider value={{ color: '#B8C1CC', size: '56px' }}>
              <AiFillRightCircle />
            </IconContext.Provider>
          }
          pageClassName='list-none p-7 h-7 w-7 flex justify-center items-center'
          pageCount={500}
          pageRangeDisplayed={10}
          previousLabel={
            <IconContext.Provider value={{ color: '#B8C1CC', size: '56px' }}>
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
  }, [movieListContext?.page])

  useEffect(() => {
    setIsFirstLoad(true)
  }, [isRefetching])

  useEffect(() => {
    if (isFetchingPopularMovieList || isLoading) {
      changeGlobalContext('isLoading', true)
      changeGlobalContext('loadingMessage', 'Please Wait...')

      return
    }

    changeGlobalContext('isLoading', false)
    changeGlobalContext('loadingMessage', '')
  }, [isFetchingPopularMovieList, isLoading])

  if (isEmpty(movieListContext?.movieListResult)) {
    return null
  }

  return (
    <Suspense fallback={null}>
      <p className='text-2xl font-bold pt-6'>Popular Movies</p>
      {renderPopularMoviePagination()}
      <div className='grid xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-5'>
        {movieListContext?.movieListResult?.map((movie: any, index: number) => {
          const { title, id, poster_path, release_date, vote_average } = movie

          if (!title || !poster_path || !release_date || !vote_average) {
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
            additionalClass='w-full py-3 px-6 font'
            title='Load More'
            onClick={handleLoadMoreData}
          />
        </div>
      )}
      {renderPopularMoviePagination()}
    </Suspense>
  )
}

export default PopularMovieList
