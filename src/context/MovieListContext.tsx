import { createContext, useContext, useState } from 'react'
import useMemoState from '../hooks/useMemoState'

export const MovieListContext: React.Context<object | any> = createContext({})

type InitialState = {
  page: number
  movieListResult: any
  genres: any
}

const initialState: InitialState = {
  page: 1,
  movieListResult: [],
  genres: {},
}

export const MovieListProvider = ({ children }: ChildrenProps): React.ReactElement => {
  const [state, setState] = useState<InitialState>(initialState)

  const data = useMemoState(state, setState)

  return <MovieListContext.Provider value={data}>{children}</MovieListContext.Provider>
}

/* eslint-disable react-refresh/only-export-components */
export function useMovieListContext() {
  return useContext(MovieListContext)
}
