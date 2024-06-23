import { LazyLoadImage } from 'react-lazy-load-image-component'
import Skeleton from 'react-loading-skeleton'
import config from '../../../config'

export default function ErrorNoResult(): React.ReactElement {
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
    </div>
  )
}
