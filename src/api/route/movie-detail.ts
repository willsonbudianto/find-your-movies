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

  const getMovieDetailData = (data: { id: number }): Promise<ApiResponse<unknown, unknown>> => {
    return tmdbWrapper.get(`movie/${data.id}`, {}, headers())
  }

  return {
    getMovieDetailData,
  }
}

export default {
  create,
}
