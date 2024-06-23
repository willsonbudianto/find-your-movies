export default function ButtonOutline({
  additionalClass,
  id,
  onClick,
  title,
}: ButtonProps): React.ReactElement {
  return (
    <button
      {...(id ? { id } : {})}
      className={`border border-secondary-100 text-secondary-100 rounded-full ${additionalClass || ''} cursor-pointer
        }`}
      type='button'
      onClick={onClick}
    >
      {title}
    </button>
  )
}
