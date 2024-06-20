const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ percentage }) => {
  const size = 34
  const strokeWidth = 3

  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  let percentageColor = 'text-green-500'

  if (percentage < 75) {
    percentageColor = 'text-yellow-500'
  } else if (percentage < 50) {
    percentageColor = 'text-red-500'
  }

  return (
    <div className={`relative flex items-center justify-center w-[${size}px] h-[${size}px]`}>
      <svg className='transform -rotate-90' height={size} width={size}>
        <circle
          className='text-gray-200'
          cx={size / 2}
          cy={size / 2}
          fill='transparent'
          r={radius}
          stroke='currentColor'
          strokeWidth={strokeWidth}
        />
        <circle
          className={percentageColor}
          cx={size / 2}
          cy={size / 2}
          fill='transparent'
          r={radius}
          stroke='currentColor'
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap='round'
          strokeWidth={strokeWidth}
        />
      </svg>
      <div className='absolute inset-0 flex items-center justify-center text-xs font-bold'>
        {percentage}
      </div>
    </div>
  )
}

export default CircularProgressBar
