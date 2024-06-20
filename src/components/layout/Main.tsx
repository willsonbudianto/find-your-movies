import { LazyLoadImage } from 'react-lazy-load-image-component'
import Skeleton from 'react-loading-skeleton'
import config from '../../../config'
import { useGlobalContext } from '../../context/GlobalContext'
import LoadingFullScreen from '../loading/LoadingFullScreen'
import SearchBar from '../misc/SearchBar'

const Main = ({ children, additionalClass }: MainProps): React.ReactElement => {
  const { state: globalContext } = useGlobalContext()

  return (
    <div className={`h-screen min-w-[640px] flex flex-col bg-white ${additionalClass || ''}`}>
      <div className='w-full bg-cyan-950 shadow-md z-[1]'>
        <div className='flex items-center py-2 w-[1200px] xl:w-[1280px] mx-auto'>
          <LazyLoadImage
            alt='boom-logo'
            placeholder={<Skeleton width={65} />}
            src={`${config.assetsURL}logo/boom-logo.png`}
            width={65}
          />
          <div className='flex flex-col px-2 w-44'>
            <p className='text-sm font-extrabold text-white'>FIND YOUR MOVIE</p>
            <p className='text-sm font-extrabold text-red-600'>Just For You Guys</p>
          </div>

          <SearchBar />
        </div>
      </div>

      <div className='overflow-y-auto h-full flex flex-col justify-between'>
        {globalContext.isLoading && <LoadingFullScreen message={globalContext.loadingMessage} />}

        <div className='w-[1200px] xl:w-[1280px] mx-auto px-6 py-2'>{children}</div>
      </div>
    </div>
  )
}

export default Main
