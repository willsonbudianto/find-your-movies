import { createContext, useContext, useState } from 'react'
import useMemoState from '../hooks/useMemoState'

export const GlobalContext: React.Context<object | any> = createContext({})

type InitialState = {
  isLoading: boolean
  loadingMessage: string
  genresData: any
}

const initialState: InitialState = {
  isLoading: false,
  loadingMessage: '',
  genresData: [
    { name: 'Action', id: 28 },
    { name: 'Adventure', id: 12 },
    { name: 'Animation', id: 16 },
    { name: 'Comedy', id: 35 },
    { name: 'Crime', id: 80 },
    { name: 'Documentary', id: 99 },
    { name: 'Drama', id: 18 },
    { name: 'Family', id: 10751 },
    { name: 'Fantasy', id: 14 },
    { name: 'History', id: 36 },
    { name: 'Horror', id: 27 },
    { name: 'Music', id: 10402 },
    { name: 'Mystery', id: 9648 },
    { name: 'Romance', id: 10749 },
    { name: 'Science Fiction', id: 878 },
    { name: 'TV Movie', id: 10770 },
    { name: 'Thriller', id: 53 },
    { name: 'War', id: 10752 },
    { name: 'Western', id: 37 },
  ],
}

export const GlobalProvider = ({ children }: ChildrenProps): React.ReactElement => {
  const [state, setState] = useState<InitialState>(initialState)

  const data = useMemoState(state, setState)

  return <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
}

/* eslint-disable react-refresh/only-export-components */
export function useGlobalContext() {
  return useContext(GlobalContext)
}
