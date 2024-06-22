import { LazyLoadImage } from 'react-lazy-load-image-component'
import Skeleton from 'react-loading-skeleton'
import config from '../../../config'

export default function DropdownBase({
  title,
  onClick,
  children,
}: DropdownProps): React.ReactElement {
  return (
    <div className='relative w-[15%] '>
      <div
        className='flex flex-row items-center justify-between rounded-full bg-white px-3 py-1.5 cursor-pointer'
        onClick={() => onClick?.()}
      >
        <p className='text-sm line-clamp-1 font-bold pl-1'>{title}</p>

        <button
          className='flex items-center h-full p-2 rounded-full bg-primary-100 hover:bg-primary-80 active:bg-primary-60 transition duration-300'
          onClick={() => onClick?.()}
        >
          <LazyLoadImage
            alt='arrow-chevron-down-icon'
            height={24}
            placeholder={<Skeleton height={24} width={24} />}
            src={`${config.assetsURL}icon/arrow-chevron-down-icon.svg`}
            width={24}
            onClick={() => onClick?.()}
          />
        </button>
      </div>

      {children}
    </div>
  )
}
