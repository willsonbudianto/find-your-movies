import { LazyLoadImage } from 'react-lazy-load-image-component'
import Skeleton from 'react-loading-skeleton'
import config from '../../../config'
import { useGlobalContext } from '../../context/GlobalContext'
import LoadingFullScreen from '../loading/LoadingFullScreen'
import SearchBar from '../misc/SearchBar'

const Main = ({ children, additionalClass }: MainProps): React.ReactElement => {
  const { state: globalContext } = useGlobalContext()

  return (
    <div className={`h-screen min-w-[640px] flex flex-col ${additionalClass || ''}`}>
      <div className='w-full bg-primary-100 shadow-md z-[1] py-5'>
        <div className='flex items-center py-2 w-[1200px] xl:w-[1280px] mx-auto gap-9'>
          <LazyLoadImage
            alt='logo'
            className='cursor-pointer'
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

        <div className='w-[1200px] xl:w-[1280px] mx-auto px-6 pb-4'>{children}</div>

        <footer className='border-t border-rr-grey-20 bg-white w-full'>
          <div className='py-2.5 w-[1200px] xl:w-[1280px] mx-auto'>
            <p className='text-sm text-rr-grey-40 text-center'>© 2024. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Main
