import { useMutation } from 'react-query'
import { movieListAPI } from '../route'

export const useLoadMoreDiscoverMovieData = (config: any) => {
  const defaultConfig = {
    ...config,
  }

  return useMutation(movieListAPI.getDiscoverMovieList, defaultConfig)
}
