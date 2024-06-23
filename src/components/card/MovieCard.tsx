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
  movieRank,
}: MovieCardProps): React.ReactElement => {
  let cardSize = 'max-[715px]:w-36 w-48'
  let imageWidth = 192

  if (size === 'x-large') {
    cardSize = 'max-[400px]:w-[156px] max-[715px]:w-44 w-56'
    imageWidth = 224
  }

  const redirectTitle = title.toLowerCase().replace(/[^a-z0-9-]/g, '-')

  return (
    <Suspense fallback={null}>
      <div
        className={`flex flex-col rounded-xl shadow-md ${cardSize} cursor-pointer flex-grow transform transition-transform duration-300 hover:scale-110 hover:shadow-lg`}
        key={id}
        onClick={() => (window.location.href = `/detail?id=${id}&title=${redirectTitle}`)}
      >
        {movieRank && (
          <div className='absolute text-2xl text-primary-100 bg-gradient-to-br from-secondary-200 to-yellow-100 rounded-tl-xl rounded-br-3xl p-5 font-extrabold'>
            {movieRank}
          </div>
        )}
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
