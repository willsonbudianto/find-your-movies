import isEmpty from 'lodash/isEmpty'
import { Suspense, useEffect } from 'react'
import { IconContext } from 'react-icons'
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai'
import ReactPaginate from 'react-paginate'
import { useGetSearchMovieData } from '../../api/query/search'
import MovieCard from '../../components/card/MovieCard'
import { useGlobalContext } from '../../context/GlobalContext'
import { useSearchContext } from '../../context/SearchContext'
import UtilGetParam from '../../utils/UtilGetParam'

const SearchResultPage: React.FC = (): React.ReactElement | null => {
  const { handleChangeState: changeGlobalContext } = useGlobalContext()

  const { state: searchContext, handleChangeState: changeSearchContext } = useSearchContext()

  const keyword: string = UtilGetParam('keyword') || ''

  const {
    data: searchResult,
    isFetching: isFetchingSearchData,
    refetch,
  } = useGetSearchMovieData(
    {
      query: keyword,
      page: parseInt(searchContext?.searchPage),
    },
    {
      enabled: true,
    },
  )

  const handleOnChange = (event: any) => {
    changeSearchContext('searchPage', event.selected + 1)
  }

  const renderSearchResultPagination = () => {
    return (
      <div className='flex py-3'>
        <ReactPaginate
          activeClassName='bg-primary-100 text-white rounded-full'
          breakClassName='px-4 py-2'
          breakLabel='...'
          className='flex w-full justify-center items-center text-white'
          containerClassName='list-none p-7 h-7 w-7 flex justify-center items-center'
          forcePage={searchContext?.searchPage - 1}
          nextLabel={
            <IconContext.Provider value={{ color: '#FFFFFF', size: '56px' }}>
              <AiFillRightCircle />
            </IconContext.Provider>
          }
          pageClassName='list-none p-7 h-7 w-7 flex justify-center items-center'
          pageCount={searchResult?.total_pages}
          pageRangeDisplayed={10}
          previousLabel={
            <IconContext.Provider value={{ color: '#FFFFFF', size: '56px' }}>
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
  }, [searchContext?.searchPage])

  useEffect(() => {
    if (isFetchingSearchData) {
      changeGlobalContext('isLoading', true)
      changeGlobalContext('loadingMessage', 'Please Wait...')

      return
    }

    changeGlobalContext('isLoading', false)
    changeGlobalContext('loadingMessage', '')
  }, [isFetchingSearchData])

  if (isEmpty(searchResult?.results)) {
    return null
  }

  return (
    <Suspense fallback={null}>
      <p className='text-2xl text-secondary-100 font-bold py-4'>
        Search Result by Keyword:{' '}
        <span className='text-2xl font-extrabold text-white'>{keyword}</span>
      </p>

      <div className='grid xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-5'>
        {searchResult?.results?.map((movie: any, index: number) => {
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

      {searchResult?.total_pages > 1 && renderSearchResultPagination()}
    </Suspense>
  )
}

export default SearchResultPage
