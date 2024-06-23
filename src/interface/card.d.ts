interface MovieCardProps {
  title: string
  id: number
  poster_path: string
  release_date: string
  vote_average: number
  size?: string
  movieRank?: number
}

interface CastCardProps {
  id: number
  name: string
  original_name: string
  character: string
  profile_path: string
}
