export default function ButtonOutline({
  additionalClass,
  disabled,
  id,
  onClick,
  title,
  type = 'button',
}: ButtonProps): React.ReactElement {
  return (
    <button
      {...(id ? { id } : {})}
      className={`border rounded-lg ${additionalClass || ''} ${
        disabled
          ? 'bg-gray-400 text-gray-400 border-grey-400 cursor-not-allowed'
          : 'border-cyan-950 text-cyan-950 cursor-pointer'
      }`}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {title}
    </button>
  )
}
