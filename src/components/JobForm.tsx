import { useEffect, useMemo, useState } from 'react'
import {
  type JobCategories,
  type JobStatus,
  type Job,
  ALL_JOB_CATEGORIES,
} from '../types/jobForm'
import WideContainer from './WideContainer'

import useMultiSelect from '../hooks/useMultiSelect'
import JobColumn from './JobColumn'

const JOB_STATUS_MAP: Record<JobStatus, string> = {
  start: 'Start Process',
  running: 'Running',
  completed: 'Completed',
  stopped: 'Stopped',
}

const STORAGE_KEY = 'itol-jobs'

export type FormDataType = Omit<Job, 'id'>

const JOB_STATUS_VALUES: JobStatus[] = Object.keys(
  JOB_STATUS_MAP,
) as JobStatus[]

const isTitleValid = (title: string) => {
  return title.length > 0
}

export default function JobForm() {
  const [formData, setFormData] = useState<FormDataType>({
    title: '',
    categories: ['Read Email'],
    status: 'stopped',
  })

  const [jobs, setJobs] = useState<Job[]>(() => {
    try {
      const storedJobs = localStorage.getItem(STORAGE_KEY)
      return storedJobs ? JSON.parse(storedJobs) : []
    } catch (err) {
      console.error('Error parsing stored jobs:', err)
      return []
    }
  })

  const {
    selectedItems: currentCategories,
    toggleItem: toggleCategorySelection,
    isSelected: isCategoryCurrentlySelected,
    areNoItemsSelected: areNoCategoriesSelectedByHook,
  } = useMultiSelect<JobCategories>(formData.categories)

  const [id, setId] = useState(0)

  useEffect(() => {
    if (id === 0) {
      const maxId = jobs.reduce((acc, job) => (job.id > acc ? job.id : acc), 0)
      setId(maxId + 1)
    }
  }, [jobs, id])

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      categories: currentCategories,
    }))
  }, [currentCategories])

  const [titleTouched, setTitleTouched] = useState(false)
  const groupedJobs = useMemo(() => {
    const grouped = jobs.reduce(
      (acc, job) => {
        if (!acc[job.status]) {
          acc[job.status] = []
        }
        acc[job.status].push(job)
        return acc
      },
      {} as Record<JobStatus, Job[]>,
    )

    const sortedGroupedJobs: Partial<Record<JobStatus, Job[]>> = {}
    for (const status in grouped) {
      if (Object.prototype.hasOwnProperty.call(grouped, status)) {
        const currentStatus = status as JobStatus
        sortedGroupedJobs[currentStatus] = [...grouped[currentStatus]].sort(
          (a, b) => a.id - b.id,
        )
      }
    }
    return sortedGroupedJobs
  }, [jobs])

  const areNoCategoriesSelected = areNoCategoriesSelectedByHook

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs))
    } catch (err) {
      console.error('Failed to save jobs to local storage:', err)
    }
  }, [jobs])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target

    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData }
      switch (name) {
        case 'title':
          newFormData.title = value
          break
        case 'status':
          newFormData.status = value as JobStatus
          break
        default:
          console.warn(`Unhandled form field ${name}`)
          break
      }
      return newFormData
    })

    if (name === 'title') {
      setTitleTouched(true)
    }
  }

  const handleAddJob = () => {
    const isFormCurrentlyValid = isTitleValid(formData.title)
    const jobId = id
    if (!isFormCurrentlyValid) {
      setTitleTouched(true)
      return
    }
    if (areNoCategoriesSelected) {
      return
    }

    setJobs((prevJobs) => [...prevJobs, { id: jobId, ...formData }])
    setId((prevId) => prevId + 1)
    console.log(formData)
    console.log(groupedJobs)
    setFormData({
      title: '',
      categories: ['Read Email'],
      status: 'stopped',
    })
    setTitleTouched(false)
  }

  const handleChangeStatus = (jobId: number, jobStatus: JobStatus) => {
    console.log(jobId, jobStatus)
    setJobs((prevJobs) => {
      return prevJobs.map((job) => {
        if (job.id === jobId) {
          return { ...job, status: jobStatus }
        }
        return job
      })
    })
  }

  const handleDeleteJob = (jobId: number) => {
    setJobs((prevJobs) => {
      return prevJobs.filter((job) => job.id !== jobId)
    })
  }

  const showTitleError = titleTouched && !isTitleValid(formData.title)

  return (
    <WideContainer>
      <div>
        <div>Job Form</div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              onBlur={() => setTitleTouched(true)}
              value={formData.title}
              className="m-1 rounded-lg border-2 border-orange-400 bg-stone-300 px-2 text-base outline-0"
              placeholder="enter job..."
            />
            {showTitleError && (
              <div className="text-sm font-bold text-red-600">
                Please enter a job title.
              </div>
            )}
          </div>
          <div className="text-sm">
            {ALL_JOB_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                name="status"
                id="Read Email"
                value="Read Email"
                onClick={() => {
                  toggleCategorySelection(category)
                  setTitleTouched(true)
                }}
                className={`m-1 rounded-md border-2 border-black ${category === 'Read Email' ? 'bg-green-600' : category === 'Send Emails' ? 'bg-red-500' : 'bg-blue-700'} px-1 text-xs text-white text-shadow-md text-shadow-stone-800 ${isCategoryCurrentlySelected(category) ? 'shadow-md shadow-stone-100' : ''}`}
              >
                {category}
              </button>
            ))}

            {areNoCategoriesSelected && (
              <div className="text-sm font-bold text-red-600">
                Please select a category.
              </div>
            )}
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
      {jobs.length > 0 && (
        <div className="flex flex-row justify-center gap-2 p-4">
          {Object.keys(JOB_STATUS_MAP).map((statuskey) => {
            const status = statuskey as JobStatus
            const jobsForStatus = groupedJobs[status] || []
            // if (jobsForStatus.length === 0) {
            //   return null
            // }
            return (
              <JobColumn
                key={status}
                statusType={status}
                jobs={jobsForStatus}
                handleChangeStatus={handleChangeStatus}
                handleDeleteJob={handleDeleteJob}
              />
            )
          })}
        </div>
      )}
    </WideContainer>
  )
}
