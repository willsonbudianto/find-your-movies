import { UseQueryResult, useQuery } from 'react-query'
import queryWrapper from '../base'
import { searchAPI } from '../route'

export const getSearchMovieData = 'GetSearchMovieData'

export function useGetSearchMovieData(params: any, options: any): UseQueryResult<any, unknown> {
  return useQuery(
    [getSearchMovieData, params],
    queryWrapper(searchAPI.getSearchMovieData, (res: ApiResponse) => res.data),
    options,
  )
}
