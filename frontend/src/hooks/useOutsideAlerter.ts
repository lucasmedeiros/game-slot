import { useEffect, MutableRefObject } from 'react'

const useOutsideAlert = (ref: MutableRefObject<any>, func: Function) => {
  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      if (ref.current && ref.current.contains(e.target)) {
        func()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [func, ref])
}

export default useOutsideAlert
