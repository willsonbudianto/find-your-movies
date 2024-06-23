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

  const getDiscoverMovieList = (data: any): Promise<ApiResponse<unknown, unknown>> => {
    return tmdbWrapper.get('/discover/movie', data, headers())
  }

  const getTopRatedMovieList = (data: any): Promise<ApiResponse<unknown, unknown>> => {
    return tmdbWrapper.get('/movie/top_rated', data, headers())
  }

  const getUpcomingMovieList = (data: any): Promise<ApiResponse<unknown, unknown>> => {
    return tmdbWrapper.get('/movie/upcoming', data, headers())
  }

  return {
    getNowPlayingMovieList,
    getDiscoverMovieList,
    getTopRatedMovieList,
    getUpcomingMovieList,
  }
}

export default {
  create,
}
