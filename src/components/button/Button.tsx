export default function Button({
  additionalClass,
  id,
  onClick,
  title,
}: ButtonProps): React.ReactElement {
  return (
    <button
      {...(id ? { id } : {})}
      className={`bg-primary-100 rounded-full ${additionalClass || ''} text-white cursor-pointer
      }`}
      type='button'
      onClick={onClick}
    >
      {title}
    </button>
  )
}
