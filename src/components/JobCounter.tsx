import { useState } from 'react'
import Container from './Container'

export default function JobCounter() {
  const [jobCount, setJobCount] = useState(0)

  function handleClick() {
    setJobCount((prevCount) => prevCount + 1)
  }

  return (
    <Container>
      <div className="p-2">
        <div className="p-1">
          <h1>Job Counter</h1>
        </div>
        <div className="p-1">
          <p>Job Count: {jobCount}</p>
        </div>
        <div className="p-1">
          <button
            type="button"
            onClick={handleClick}
            className="rounded-2xl border-2 border-black bg-orange-500 px-8 py-2 text-2xl font-bold text-white text-shadow-md text-shadow-stone-800 hover:shadow-sm hover:shadow-stone-800"
          >
            Add Job
          </button>
        </div>
      </div>
    </Container>
  )
}
