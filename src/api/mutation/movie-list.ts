import { useMutation } from 'react-query'
import { movieListAPI } from '../route'

export const useSearchMovieData = (config: any) => {
  const defaultConfig = {
    ...config,
  }

  return useMutation(movieListAPI.getSearchMovieData, defaultConfig)
}

export const useLoadMorePopularMovieData = (config: any) => {
  const defaultConfig = {
    ...config,
  }

  return useMutation(movieListAPI.getPopularMovieList, defaultConfig)
}
