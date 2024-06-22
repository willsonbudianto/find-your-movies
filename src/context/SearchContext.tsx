import { createContext, useContext, useState } from 'react'
import useMemoState from '../hooks/useMemoState'

export const SearchContext: React.Context<object | any> = createContext({})

type InitialState = {
  searchPage: number
}

const initialState: InitialState = {
  searchPage: 1,
}

export const SearchProvider = ({ children }: ChildrenProps): React.ReactElement => {
  const [state, setState] = useState<InitialState>(initialState)

  const data = useMemoState(state, setState)

  return <SearchContext.Provider value={data}>{children}</SearchContext.Provider>
}

/* eslint-disable react-refresh/only-export-components */
export function useSearchContext() {
  return useContext(SearchContext)
}
