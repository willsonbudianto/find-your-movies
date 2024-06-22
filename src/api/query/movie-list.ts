import isEmpty from 'lodash/isEmpty'
import { UseQueryResult, useQuery } from 'react-query'
import { useMovieListContext } from '../../context/MovieListContext'
import queryWrapper from '../base'
import { movieListAPI } from '../route'

export const getNowPlayingMovieList = 'GetNowPlayingMovieList'

export function useGetNowPlayingMovieList(params: any, options: any): UseQueryResult<any, unknown> {
  return useQuery(
    [getNowPlayingMovieList, params],
    queryWrapper(movieListAPI.getNowPlayingMovieList, (res: ApiResponse) => res.data),
    options,
  )
}

export const getDiscoverMovieList = 'GetDiscoverMovieList'

export function useGetDiscoverMovieList(params: any, options: any): UseQueryResult<any, unknown> {
  const { handleChangeState: changeMovieListContext } = useMovieListContext()

  return useQuery(
    [getDiscoverMovieList, params],
    queryWrapper(movieListAPI.getDiscoverMovieList, (res: ApiResponse) => res.data),
    {
      ...options,
      onSettled: (res: ApiResponse) => {
        if (!isEmpty(res?.results)) {
          changeMovieListContext('movieListResult', res?.results)
        }
      },
    },
  )
}

export const getTopRatedMovieList = 'GetTopRatedMovieList'

export function useGetTopRatedMovieList(params: any, options: any): UseQueryResult<any, unknown> {
  return useQuery(
    [getTopRatedMovieList, params],
    queryWrapper(movieListAPI.getTopRatedMovieList, (res: ApiResponse) => res.data),
    options,
  )
}

export const getUpcomingMovieList = 'GetUpcomingMovieList'

export function useGetUpcomingMovieList(params: any, options: any): UseQueryResult<any, unknown> {
  return useQuery(
    [getUpcomingMovieList, params],
    queryWrapper(movieListAPI.getUpcomingMovieList, (res: ApiResponse) => res.data),
    options,
  )
}
