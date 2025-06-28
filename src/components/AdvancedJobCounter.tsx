import { useState } from 'react'
import Container from './Container'

export default function AdvancedJobCounter() {
  const [jobCount, setJobCount] = useState(0)

  function handleIncrement() {
    setJobCount((prevCount) => prevCount + 1)
  }

  function handleDecrement() {
    if (jobCount > 0) {
      setJobCount((prevCount) => prevCount - 1)
    }
  }

  function handleReset() {
    setJobCount(0)
  }

  function jobMessage() {
    if (jobCount === 0) {
      return 'No jobs available'
    } else if (jobCount < 6) {
      return 'Few jobs available'
    }
    return 'Many jobs available'
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
          <p>{jobMessage()}</p>
        </div>
        <div className="p-1">
          <button
            type="button"
            onClick={handleIncrement}
            className="rounded-2xl border-2 border-black bg-orange-500 px-8 py-2 text-2xl font-bold text-white text-shadow-md text-shadow-stone-800 hover:shadow-sm hover:shadow-stone-800"
          >
            Add Job
          </button>
          <button
            type="button"
            onClick={handleDecrement}
            className="m-2 rounded-2xl border-2 border-black bg-orange-500 px-8 py-2 text-2xl font-bold text-white text-shadow-md text-shadow-stone-800 hover:shadow-sm hover:shadow-stone-800"
          >
            Remove Job
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-2xl border-2 border-black bg-orange-500 px-8 py-2 text-2xl font-bold text-white text-shadow-md text-shadow-stone-800 hover:shadow-sm hover:shadow-stone-800"
          >
            Reset Job
          </button>
        </div>
      </div>
    </Container>
  )
}
