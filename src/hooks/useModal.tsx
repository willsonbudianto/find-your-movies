import { useEffect } from 'react'

const useModal = (): any => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.body.style.height = '100%'

    return () => {
      const el: Element[] = Array?.from?.(document.querySelectorAll('.modal'))

      if (!el || el?.length < 1) {
        document.body.style.overflow = ''
        document.body.style.height = ''
      }
    }
  }, [])

  return
}

export default useModal
