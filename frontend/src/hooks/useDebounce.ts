import { useCallback, useEffect, useState, useRef } from 'react'
import { debounce } from 'lodash'
import { Cancelable, DebounceSettings } from 'lodash'

export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 0,
  options?: DebounceSettings
): T & Cancelable {
  return useCallback(debounce(callback, delay, options), [
    callback,
    delay,
    options,
  ])
}

export function useDebounce<T>(
  value: T,
  delay: number = 0,
  options?: DebounceSettings
): T {
  const previousValue = useRef(value)
  const [current, setCurrent] = useState(value)
  const debouncedCallback = useDebouncedCallback(
    (value: T) => setCurrent(value),
    delay,
    options
  )
  useEffect(() => {
    if (value !== previousValue.current) {
      debouncedCallback(value)
      previousValue.current = value
      return debouncedCallback.cancel
    }
  }, [debouncedCallback, value])

  return current
}
