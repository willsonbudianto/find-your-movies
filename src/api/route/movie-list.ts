import apisauce, { ApiResponse, ApisauceInstance } from 'apisauce'
import config from '../../../config'

const create = (): any => {
  const tmdbWrapper: ApisauceInstance = apisauce.create({
    baseURL: config.apiURL,
    timeout: 45000,
  })

  const headers = () => {
    return {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.tmdbToken}`,
      },
    }
  }

  const getNowPlayingMovieList = (data: any): Promise<ApiResponse<unknown, unknown>> => {
    return tmdbWrapper.get('/movie/now_playing', data, headers())
  }

  const getPopularMovieList = (data: any): Promise<ApiResponse<unknown, unknown>> => {
    return tmdbWrapper.get('/movie/popular', data, headers())
  }

  const getTopRatedMovieList = (data: any): Promise<ApiResponse<unknown, unknown>> => {
    return tmdbWrapper.get('/movie/top_rated', data, headers())
  }

  const getUpcomingMovieList = (data: any): Promise<ApiResponse<unknown, unknown>> => {
    return tmdbWrapper.get('/movie/upcoming', data, headers())
  }

  const getSearchMovieData = (data: any): Promise<ApiResponse<unknown, unknown>> => {
    return tmdbWrapper.get('/search/movie', data, headers())
  }

  return {
    getNowPlayingMovieList,
    getPopularMovieList,
    getTopRatedMovieList,
    getUpcomingMovieList,
    getSearchMovieData,
  }
}

export default {
  create,
}
