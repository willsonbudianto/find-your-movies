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

  const getSearchMovieData = (data: any): Promise<ApiResponse<unknown, unknown>> => {
    return tmdbWrapper.get('/search/movie', data, headers())
  }

  return {
    getSearchMovieData,
  }
}

export default {
  create,
}
