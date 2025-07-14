import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'

export default function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const storedData = localStorage.getItem(key)
      return storedData ? (JSON.parse(storedData) as T) : initialValue
    } catch (error) {
      console.error(`Could not retrieve from local storage ${key}`, error)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error(`Could not save to local storage ${key}`, error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}
