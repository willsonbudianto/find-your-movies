import { UseQueryResult, useQuery } from 'react-query'
import queryWrapper from '../base'
import { movieDetailAPI } from '../route'

export const getMovieDetailData = 'GetMovieDetailData'

export function useGetMovieDetailData(params: any, options: any): UseQueryResult<any, unknown> {
  return useQuery(
    [getMovieDetailData, params],
    queryWrapper(movieDetailAPI.getMovieDetailData, (res: ApiResponse) => res.data),
    options,
  )
}
