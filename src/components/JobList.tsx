import { useState } from 'react'
import type { Job, JobStatus } from '../types/jobs'
import JobItem from './JobItem'

const ALL_JOB_STATUSES: JobStatus[] = ['stopped', 'running', 'completed']

interface JobListProps {
  jobs: Job[]
  onDeleteJob: (id: number) => void
  filterBy: string
  setFilterBy: React.Dispatch<React.SetStateAction<string>>
  formData: { name: string; status: JobStatus }
  onAddJob: () => void
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

export default function JobList({
  jobs,
  onDeleteJob,
  filterBy,
  setFilterBy,
  formData,
  onAddJob,
  onChange,
}: JobListProps) {
  const [isHidden, setIsHidden] = useState(false)

  const handleHide = () => {
    setIsHidden(!isHidden)
  }

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterText = e.target.value.toLowerCase()
    setFilterBy(filterText)
  }

  return (
    <>
      <div className="text-sm">
        Filter by:
        <button
          type="button"
          onClick={() => setFilterBy('running')}
          className={`m-1 rounded-md border-2 border-black bg-green-600 px-1 text-xs text-white text-shadow-md text-shadow-stone-800 ${filterBy === 'Running' ? 'shadow-md shadow-stone-100' : null}`}
        >
          Running
        </button>
        <button
          type="button"
          onClick={() => setFilterBy('stopped')}
          className={`m-1 rounded-md border-2 border-black bg-red-500 px-1 text-xs text-white text-shadow-md text-shadow-stone-800 ${filterBy === 'Stopped' ? 'shadow-md shadow-stone-100' : null}`}
        >
          Stopped
        </button>
        <button
          type="button"
          onClick={() => setFilterBy('completed')}
          className={`m-1 rounded-md border-2 border-black bg-blue-700 px-1 text-xs text-white text-shadow-md text-shadow-stone-800 ${filterBy === 'Completed' ? 'shadow-md shadow-stone-100' : null}`}
        >
          Complete
        </button>
        <button
          type="button"
          onClick={() => setFilterBy('All')}
          className={`m-1 rounded-md border-2 border-black bg-orange-500 px-1 text-xs text-white text-shadow-md text-shadow-stone-800 ${filterBy === 'All' ? 'shadow-md shadow-stone-100' : null}`}
        >
          All
        </button>
      </div>
      <div>
        <input
          type="text"
          name="filterBy"
          onChange={handleFilter}
          value={filterBy}
          className="m-1 rounded-lg border-2 border-orange-400 bg-stone-300 px-2 text-base outline-0"
          placeholder="enter filter text..."
        />
      </div>
      <div hidden={isHidden}>
        <ul>
          {jobs
            .filter(
              (job) =>
                job.status === filterBy ||
                filterBy === 'All' ||
                job.name.toLowerCase().includes(filterBy),
            )
            .map((job: Job) => (
              <li key={job.id}>
                <JobItem onDelete={() => onDeleteJob(job.id)} job={job} />
              </li>
            ))}
        </ul>
      </div>
      <div>
        <button
          type="button"
          onClick={handleHide}
          className="m-2 rounded-xl border-2 border-black bg-blue-700 px-2 py-1 text-base font-bold text-white text-shadow-md text-shadow-stone-800 hover:shadow-sm hover:shadow-stone-800"
        >
          Toggle Job Visibility
        </button>
      </div>
      <div>
        <div>Add Job:</div>
        <div>
          <input
            type="text"
            name="name"
            onChange={onChange}
            value={formData.name}
            className="m-1 rounded-lg border-2 border-orange-400 bg-stone-300 px-2 text-base outline-0"
            placeholder="enter name..."
          />
        </div>
        <div>
          <select
            name="status"
            id="status"
            onChange={onChange}
            value={formData.status}
            className="m-1 rounded-lg border-2 border-orange-400 bg-stone-300 px-2 text-base outline-0"
          >
            {ALL_JOB_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            type="button"
            onClick={onAddJob}
            className="m-2 rounded-xl border-2 border-black bg-blue-700 px-2 py-1 text-base font-bold text-white text-shadow-md text-shadow-stone-800 hover:shadow-sm hover:shadow-stone-800"
          >
            Add Job
          </button>
        </div>
      </div>
    </>
  )
}
