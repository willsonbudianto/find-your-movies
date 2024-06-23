export default function UtilGetMovieDuration(duration: number): string {
  const hours = Math.floor(duration / 60)
  const remainingMinutes = duration % 60

  return `${hours}h ${remainingMinutes}m`
}
