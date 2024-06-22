import { createContext, useContext, useState } from 'react'
import useMemoState from '../hooks/useMemoState'

export const MovieDetailContext: React.Context<object | any> = createContext({})

type InitialState = {
  page: number
  movieListResult: any
  genres: any
  searchPage: number
}

const initialState: InitialState = {
  page: 1,
  movieListResult: [],
  genres: {},
  searchPage: 1,
}

export const MovieDetailProvider = ({ children }: ChildrenProps): React.ReactElement => {
  const [state, setState] = useState<InitialState>(initialState)

  const data = useMemoState(state, setState)

  return <MovieDetailContext.Provider value={data}>{children}</MovieDetailContext.Provider>
}

/* eslint-disable react-refresh/only-export-components */
export function useMovieDetailContext() {
  return useContext(MovieDetailContext)
}
