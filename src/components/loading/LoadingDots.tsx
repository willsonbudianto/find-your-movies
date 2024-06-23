export default function LoadingDots(): React.ReactElement {
  return (
    <div className='animate-pulse py-3'>
      <div className='inline-block mr-1 bg-red-500 h-2.5 w-2.5 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
      <div className='inline-block mr-1 bg-blue-500 h-2.5 w-2.5 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
      <div className='inline-block mr-1 bg-green-500 h-2.5 w-2.5 rounded-full animate-bounce [animation-delay:-0.075s]'></div>
      <div className='inline-block mr-1 bg-yellow-500 h-2.5 w-2.5 rounded-full animate-bounce'></div>
    </div>
  )
}
