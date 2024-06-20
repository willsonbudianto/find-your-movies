import { createContext, useContext, useState } from 'react'
import useMemoState from '../hooks/useMemoState'

export const GlobalContext: React.Context<object | any> = createContext({})

type InitialState = {
  isLoading: boolean
  loadingMessage: string
}

const initialState: InitialState = {
  isLoading: false,
  loadingMessage: '',
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
