import { useState } from 'react'

export default function useId(initialValue: number = 0) {
  const [id, setId] = useState(initialValue)

  const incrementID = () => {
    setId((prevId) => prevId + 1)
  }
  const decrementID = () => {
    setId((prevId) => prevId - 1)
  }
  const clearID = () => {
    setId(initialValue)
  }

  return { id, setId, incrementID, decrementID, clearID }
}
