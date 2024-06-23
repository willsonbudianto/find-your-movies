import { Suspense } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Skeleton from 'react-loading-skeleton'
import config from '../../../config'

const CastCard: React.FC<CastCardProps> = ({
  id,
  name,
  original_name,
  character,
  profile_path,
}: CastCardProps): React.ReactElement => {
  return (
    <Suspense fallback={null}>
      <div
        className='flex flex-col rounded-xl shadow-md max-[715px]:w-36 w-48 cursor-pointer flex-grow transform transition-transform duration-300 hover:scale-110 hover:shadow-lg'
        key={id}
      >
        <LazyLoadImage
          alt={`${character}-poster`}
          className='rounded-t-xl'
          height={96}
          placeholder={<Skeleton height={300} width={192} />}
          src={`${config.movieImageURL}${profile_path}`}
          width={192}
        />
        <div className='flex flex-row items-center py-3 px-2 justify-between bg-white rounded-b-xl'>
          <div className='flex flex-col'>
            <p className='text-sm font-bold line-clamp-1'>{name}</p>
            <p className='text-xs font-bold line-clamp-1 text-gray-400'>{original_name}</p>
            <p className='text-sm pt-3'>
              As <span className='font-extrabold'>{character}</span>
            </p>
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default CastCard
