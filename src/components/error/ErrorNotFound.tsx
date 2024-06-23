import { LazyLoadImage } from 'react-lazy-load-image-component'
import Skeleton from 'react-loading-skeleton'
import config from '../../../config'
import Button from '../button/Button'
import Main from '../layout/Main'

const ErrorNotFound: React.FC = (): React.ReactElement => {
  const handleBackHomepage = () => {
    window.location.href = '/'
  }

  return (
    <Main additionalClass='bg-white'>
      <div className='flex flex-col items-center justify-start flex-grow p-6 gap-4 bg-white'>
        <LazyLoadImage
          alt='error-not-found'
          height={225}
          placeholder={<Skeleton height={225} width={450} />}
          src={`${config.assetsURL}gif/error-not-found.gif`}
          width={450}
        />

        <p className='font-semibold text-center text-lg'>Error Not Found</p>

        <Button
          additionalClass='py-2.5 rounded-full font-semibold'
          title='Back to Homepage'
          onClick={() => handleBackHomepage()}
        />
      </div>
    </Main>
  )
}

export default ErrorNotFound
