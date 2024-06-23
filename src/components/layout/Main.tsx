import { LazyLoadImage } from 'react-lazy-load-image-component'
import Skeleton from 'react-loading-skeleton'
import config from '../../../config'
import { useGlobalContext } from '../../context/GlobalContext'
import LoadingFullScreen from '../loading/LoadingFullScreen'
import SearchBar from '../misc/SearchBar'

const Main = ({ children, additionalClass }: MainProps): React.ReactElement => {
  const { state: globalContext } = useGlobalContext()

  return (
    <div
      className={`h-screen min-w-[320x] sm:min-w-[640px] flex flex-col ${additionalClass || ''}`}
    >
      <div className='w-full bg-primary-100 shadow-md z-[1] py-2 md:py-3 lg:py-4 xl:py-5 px-4 lg:px-0 max-[500px]:relative'>
        <div className='flex flex-row flex-grow items-center justify-between py-2 max-w-full w-full md:w-[768px] lg:w-[1024px] xl:w-[1280px] mx-auto'>
          <LazyLoadImage
            alt='logo'
            className='flex cursor-pointer'
            height={48}
            placeholder={<Skeleton height={48} width={120} />}
            src={`${config.assetsURL}logo/find-your-movie-logo.svg`}
            width={120}
            onClick={() => (window.location.href = '/')}
          />

          <SearchBar />
        </div>
      </div>

      <div className='overflow-y-auto h-full flex flex-col justify-between'>
        {globalContext.isLoading && <LoadingFullScreen message={globalContext.loadingMessage} />}

        <div className='max-w-full w-full md:w-[768px] lg:w-[1024px] xl:w-[1280px] mx-auto px-4 pb-4'>
          {children}
        </div>

        <footer className='border-t border-rr-grey-20 bg-white min-w-[320px] sm:min-w-[640px]'>
          <div className='py-2.5 max-w-full w-full md:w-[768px] lg:w-[1024px] xl:w-[1280px] mx-auto'>
            <p className='text-sm text-rr-grey-40 text-center'>
              © 2024, Find Your Movie by Willson Budianto
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Main
