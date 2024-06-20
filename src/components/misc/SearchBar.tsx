import { Suspense, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Skeleton from 'react-loading-skeleton'
import config from '../../../config'
import { useSearchMovieData } from '../../api/mutation/movie-list'
import UtilSnackBarError from '../../utils/UtilSnackBarError'

const SearchBar: React.FunctionComponent = () => {
  const [keyword, setKeyword] = useState<string>('')

  const { mutate: searchMovie }: any = useSearchMovieData({
    onSuccess: (res: any) => {
      if (res?.data && res?.data?.results) {
        // window.location.href = `/search/${keyword}`

        return
      }

      UtilSnackBarError('searchMovieError', 'top-center')
    },
  })

  const handleSearchMovie = () => {
    if (!keyword) {
      UtilSnackBarError('keywordError', 'top-center', 'Please enter keyword before searching')

      return
    }

    searchMovie({ query: keyword })
  }

  return (
    <Suspense fallback={null}>
      <div className='flex flex-col flex-grow w-full'>
        <div className='relative rounded-xl'>
          <input
            className='bg-white hover:bg-gray-200 focus:ring-blue-500 focus:ring-2 focus:outline-none transition duration-300 ease-out block w-full rounded-sm pr-10 py-1.5 pl-4'
            placeholder='Search Your Movie Title...'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <div className='absolute rounded-xl right-0 top-0 h-full p-1 text-white'>
            <button
              className='flex items-center h-full px-4 rounded-sm bg-cyan-950 hover:bg-cyan-900 active:bg-cyan-800 transition duration-300'
              onClick={() => handleSearchMovie()}
            >
              <LazyLoadImage
                alt='search-icon'
                height={14}
                placeholder={<Skeleton height={14} width={14} />}
                src={`${config?.assetsURL}icon/search.svg`}
                width={14}
              />
            </button>
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default SearchBar
