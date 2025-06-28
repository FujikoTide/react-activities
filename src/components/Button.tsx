import { useState } from 'react'
import Container from './Container'

export default function Button() {
  const [isActive, setIsActive] = useState(true)

  function handleClick() {
    setIsActive(!isActive)
  }

  return (
    <Container>
      <div>
        <h1>Some Heading !</h1>
      </div>
      <div className="p-4">
        <button
          type="button"
          disabled={isActive}
          className="rounded-2xl border-2 border-black bg-blue-500 px-8 py-2 text-2xl font-bold text-white text-shadow-md text-shadow-stone-800 hover:shadow-sm hover:shadow-stone-800"
        >
          {isActive ? 'Active' : 'Not Active'}
        </button>
      </div>
      <div className="p-4">
        <button
          type="button"
          onClick={handleClick}
          className="rounded-2xl border-2 border-black bg-orange-500 px-8 py-2 text-2xl font-bold text-white text-shadow-md text-shadow-stone-800 hover:shadow-sm hover:shadow-stone-800"
        >
          Toggle other button !
        </button>
      </div>
    </Container>
  )
}
