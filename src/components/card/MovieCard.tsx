import dayjs from 'dayjs'
import { Suspense } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Skeleton from 'react-loading-skeleton'
import config from '../../../config'
import CircularProgressBar from '../misc/CircularProgressBar'

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  id,
  poster_path,
  release_date,
  vote_average,
  size = 'large',
}: MovieCardProps): React.ReactElement | null => {
  const cardSize = size === 'x-large' ? 'w-56' : 'w-48'
  const imageWidth = size === 'x-large' ? 224 : 192

  return (
    <Suspense fallback={null}>
      <div
        className={`flex flex-col rounded-xl shadow-md ${cardSize} cursor-pointer flex-grow`}
        key={id}
      >
        <LazyLoadImage
          alt={`${title} poster`}
          className='rounded-t-xl'
          height={96}
          placeholder={<Skeleton height={300} width={imageWidth} />}
          src={`${config.movieImageURL}${poster_path}`}
          width={imageWidth}
        />
        <div className='flex flex-row items-center py-3 px-2 justify-between bg-white rounded-b-xl'>
          <div className='flex flex-col'>
            <p className='text-xs font-bold line-clamp-1'>{title}</p>
            <p className='text-xs font-light'>{dayjs(release_date).format('DD MMMM, YYYY')}</p>
          </div>

          <CircularProgressBar percentage={Math?.floor(vote_average * 10)} />
        </div>
      </div>
    </Suspense>
  )
}

export default MovieCard
