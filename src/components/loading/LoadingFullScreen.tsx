import { createPortal } from 'react-dom'
import useModal from '../../hooks/useModal'
import LoadingDots from './LoadingDots'

const LoadingFullScreen: React.FC<LoadingProps> = ({
  message,
}: LoadingProps): React.ReactElement => {
  useModal()

  return createPortal(
    <div className='fade-in-effect flex w-full h-full fixed inset-0 bg-black/50 z-50'>
      <div className='flex items-center m-auto w-full h-full'>
        <div className='flex flex-col items-center text-center text-sm bg-white m-auto rounded-lg px-6 py-5 w-1/5'>
          <LoadingDots />
          <p>{message || 'Loading...'}</p>
        </div>
      </div>
    </div>,
    document.getElementById('root') as HTMLElement,
  )
}

export default LoadingFullScreen
