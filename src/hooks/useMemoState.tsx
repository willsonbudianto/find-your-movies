import { useCallback, useMemo } from 'react'

export default function useMemoState(state: any, setState: Function): any {
  const handleChangeState = useCallback(
    (key: any, value: any) => {
      setState((prev: any) => {
        if (prev[key] === value) {
          return prev
        }

        return { ...prev, [key]: value }
      })
    },
    [setState],
  )

  return useMemo(
    () => ({
      state,
      handleChangeState,
      setState,
    }),
    [handleChangeState, state, setState],
  )
}
