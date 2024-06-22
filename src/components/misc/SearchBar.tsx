import { Suspense, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Skeleton from 'react-loading-skeleton'
import config from '../../../config'
import UtilSnackBarError from '../../utils/UtilSnackBarError'

const SearchBar: React.FunctionComponent = () => {
  const [keyword, setKeyword] = useState<string>('')

  const handleSearchMovie = () => {
    if (!keyword) {
      UtilSnackBarError('keywordError', 'top-center', 'Please enter keyword before searching')

      return
    }

    window.location.href = `/search?keyword=${keyword}`
  }

  return (
    <Suspense fallback={null}>
      <div className='flex flex-col flex-grow w-full'>
        <div className='relative rounded-xl'>
          <input
            className='bg-white hover:bg-gray-200 focus:ring-blue-500 focus:ring-2 focus:outline-none transition duration-300 ease-out block w-full rounded-3xl pl-5 pr-6 py-2'
            placeholder='Search Your Movie Title...'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearchMovie()
              }
            }}
          />
          <div className='absolute rounded-xl right-0 top-0 h-full p-1 text-white'>
            <button
              className='flex items-center h-full p-2 rounded-full bg-primary-100 hover:bg-primary-80 active:bg-primary-60 transition duration-300'
              onClick={() => handleSearchMovie()}
            >
              <LazyLoadImage
                alt='search-icon'
                height={16}
                placeholder={<Skeleton height={16} width={16} />}
                src={`${config?.assetsURL}icon/search.svg`}
                width={16}
              />
            </button>
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default SearchBar
