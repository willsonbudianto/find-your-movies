import { isEmpty } from 'lodash'
import { UseQueryResult, useQuery } from 'react-query'
import { useMovieDetailContext } from '../../context/MovieDetailContext'
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

export const getMovieCastData = 'GetMovieCastData'

export function useGetMovieCastData(params: any, options: any): UseQueryResult<any, unknown> {
  const { handleChangeState: changeMovieDetailContext } = useMovieDetailContext()

  return useQuery(
    [getMovieCastData, params],
    queryWrapper(movieDetailAPI.getMovieCastData, (res: ApiResponse) => res.data),
    {
      ...options,
      onSettled: (res: ApiResponse) => {
        if (!isEmpty(res.cast)) {
          changeMovieDetailContext('cast', res.cast)
          changeMovieDetailContext('crew', res.crew)
        }
      },
    },
  )
}
