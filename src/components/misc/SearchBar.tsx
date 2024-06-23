import { Suspense, useEffect, useRef, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Skeleton from 'react-loading-skeleton'
import config from '../../../config'
import UtilSnackBarError from '../../utils/UtilSnackBarError'

const SearchBar: React.FunctionComponent = () => {
  const [isShowSearchMobile, setIsShowSearchMobile] = useState<boolean>(false)
  const [keyword, setKeyword] = useState<string>('')

  const searchContainerRef: any = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsShowSearchMobile(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [searchContainerRef])

  const handleSearchMovie = () => {
    if (!keyword) {
      UtilSnackBarError('keywordError', 'top-center', 'Please enter keyword before searching')

      return
    }

    window.location.href = `/search?keyword=${keyword}`
  }

  return (
    <Suspense fallback={null}>
      {/* For Desktop Above 500px */}
      <div className='hidden min-[500px]:flex flex-row w-full pl-9'>
        <div className='relative rounded-xl flex w-full'>
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

      {/* For Mobile Below 500px */}
      <div ref={searchContainerRef}>
        <div className='flex items-end justify-end min-[500px]:hidden'>
          <button
            className='flex items-center h-full p-2 rounded-full bg-primary-100 transition duration-300'
            onClick={() => setIsShowSearchMobile(!isShowSearchMobile)}
          >
            <LazyLoadImage
              alt='search-icon'
              height={20}
              placeholder={<Skeleton height={20} width={20} />}
              src={`${config?.assetsURL}icon/search.svg`}
              width={20}
            />
          </button>
        </div>
        {isShowSearchMobile && (
          <div className='absolute left-0 top-20 w-full z-10'>
            <input
              className='bg-white hover:bg-gray-200 focus:ring-blue-500 focus:ring-2 focus:outline-none transition duration-300 ease-out w-full px-3 py-4'
              placeholder='Search Your Movie Title...'
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearchMovie()
                }
              }}
            />
          </div>
        )}
      </div>
    </Suspense>
  )
}

export default SearchBar
