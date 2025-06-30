import { useState } from 'react'
import type { JobCategories, JobStatus } from '../types/jobForm'
import Container from './Container'

export interface JobFormTypes {
  title: string
  category: JobCategories
  status: JobStatus
}

const JOB_STATUS_MAP: Record<JobStatus, string> = {
  start: 'Start Process',
  running: 'Running',
  completed: 'Completed',
  stopped: 'Stopped',
}

const JOB_STATUS_VALUES: JobStatus[] = Object.keys(
  JOB_STATUS_MAP,
) as JobStatus[]

export default function JobForm() {
  const [formData, setFormData] = useState<JobFormTypes>({
    title: '',
    category: 'Read Email' as JobCategories,
    status: 'stopped',
  })
  const [isValid, setIsValid] = useState(false)

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
      | { target: { name: string; value: string } },
  ) => {
    const { name, value } = e.target
    if (formData.title.length > 0) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }))
  }

  const handleAddJob = () => {
    if (isValid) {
      console.log(formData)
      setFormData((prevFormData) => ({ ...prevFormData, title: '' }))
      setIsValid(false)
    }
  }

  return (
    <Container>
      <div>
        <div>Job Form</div>
        <form>
          <div>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              value={formData.title}
              className="m-1 rounded-lg border-2 border-orange-400 bg-stone-300 px-2 text-base outline-0"
              placeholder="enter job..."
            />
            <div className="text-sm font-bold text-red-600" hidden={isValid}>
              Please enter a job title.
            </div>
          </div>
          <div className="text-sm">
            <button
              type="button"
              name="status"
              id="Read Email"
              value="Read Email"
              onClick={() =>
                handleChange({
                  target: { name: 'category', value: 'Read Email' },
                })
              }
              className={`m-1 rounded-md border-2 border-black bg-green-600 px-1 text-xs text-white text-shadow-md text-shadow-stone-800 ${formData.category === 'Read Email' ? 'shadow-md shadow-stone-100' : null}`}
            >
              Read Email
            </button>
            <button
              type="button"
              name="status"
              id="Send Emails"
              value="Send Emails"
              onClick={() =>
                handleChange({
                  target: { name: 'category', value: 'Send Emails' },
                })
              }
              className={`m-1 rounded-md border-2 border-black bg-red-500 px-1 text-xs text-white text-shadow-md text-shadow-stone-800 ${formData.category === 'Send Emails' ? 'shadow-md shadow-stone-100' : null}`}
            >
              Send Emails
            </button>
            <button
              type="button"
              name="status"
              id="Web Parsing"
              value="Web Parsing"
              onClick={() =>
                handleChange({
                  target: { name: 'category', value: 'Web Parsing' },
                })
              }
              className={`m-1 rounded-md border-2 border-black bg-blue-700 px-1 text-xs text-white text-shadow-md text-shadow-stone-800 ${formData.category === 'Web Parsing' ? 'shadow-md shadow-stone-100' : null}`}
            >
              Web Parsing
            </button>
          </div>
          <div>
            <select
              name="status"
              id="status"
              onChange={handleChange}
              value={formData.status}
              className="m-1 rounded-lg border-2 border-orange-400 bg-stone-300 px-2 text-base outline-0"
            >
              {JOB_STATUS_VALUES.map((value) => (
                <option key={value} value={value}>
                  {JOB_STATUS_MAP[value]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button
              type="button"
              onClick={handleAddJob}
              className="m-2 rounded-xl border-2 border-black bg-blue-700 px-2 py-1 text-base font-bold text-white text-shadow-md text-shadow-stone-800 hover:shadow-sm hover:shadow-stone-800"
            >
              Add Job
            </button>
          </div>
        </form>
      </div>
    </Container>
  )
}
