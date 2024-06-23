import isEmpty from 'lodash/isEmpty'
import { Suspense, useEffect } from 'react'
import { IconContext } from 'react-icons'
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Skeleton from 'react-loading-skeleton'
import ReactPaginate from 'react-paginate'
import config from '../../../config'
import { useGetSearchMovieData } from '../../api/query/search'
import ButtonOutline from '../../components/button/ButtonOutline'
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

  const handleBackHomepage = () => {
    window.location.href = '/'
  }

  const renderSearchResultPagination = () => {
    return (
      <div className='flex py-3'>
        <ReactPaginate
          activeClassName='bg-primary-100 text-white rounded-full'
          breakClassName='px-4 py-2'
          breakLabel='...'
          className='flex flex-grow flex-wrap justify-center items-center text-white'
          containerClassName='flex flex-wrap justify-center items-center'
          forcePage={searchContext?.searchPage - 1}
          nextLabel={
            <IconContext.Provider value={{ color: '#FFFFFF', size: '34px' }}>
              <AiFillRightCircle />
            </IconContext.Provider>
          }
          pageClassName='p-4 h-4 w-4 flex justify-center items-center'
          pageCount={searchResult?.total_pages}
          pageRangeDisplayed={10}
          previousLabel={
            <IconContext.Provider value={{ color: '#FFFFFF', size: '34px' }}>
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

  if (isFetchingSearchData) {
    return null
  }

  if (isEmpty(searchResult?.results)) {
    return (
      <div className='flex flex-col justify-center items-center text-2xl text-white p-6'>
        <LazyLoadImage
          alt='search-not-found-icon'
          height={250}
          placeholder={<Skeleton height={250} width={250} />}
          src={`${config?.assetsURL}icon/search-not-found.svg`}
          width={250}
        />
        <p className='text-2xl font-bold'>Cannot Found Any Result</p>
        <p className='text-2xl font-bold pb-2'>Keyword: '{keyword}' Not Found</p>

        <ButtonOutline
          additionalClass='w-full py-2.5 rounded-full font-semibold'
          title='Back to Homepage'
          onClick={() => handleBackHomepage()}
        />
      </div>
    )
  }

  return (
    <Suspense fallback={null}>
      <p className='text-base min-[400px]:text-2xl text-secondary-100 font-bold py-4'>
        Search Result by Keyword:{' '}
        <span className='text-base min-[400px]:text-2xl font-extrabold text-white'>{keyword}</span>
      </p>

      <div className='grid xl:grid-cols-5 min-[1048px]:grid-cols-4 min-[570px]:grid-cols-3 grid-cols-2 gap-5'>
        {searchResult?.results?.map((movie: any, index: number) => {
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

      {searchResult?.total_pages > 1 && renderSearchResultPagination()}
    </Suspense>
  )
}

export default SearchResultPage
