import {
  CATEGORY_COLOUR_MAP,
  STATUS_COLOUR_MAP,
  type Job,
  type JobStatus,
} from '../types/jobForm'
import React, { useState } from 'react'
import Popover from './Popover'

interface ClickCoordinates {
  x: number
  y: number
}

interface JobColumProps {
  jobs: Job[]
  handleChangeStatus: (jobId: number, jobStatus: JobStatus) => void
}

export default function JobColumn2({
  jobs,
  handleChangeStatus,
}: JobColumProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [popoverCoords, setPopoverCoords] = useState<ClickCoordinates | null>(
    null,
  )
  const [popoverData, setPopoverData] = useState<Job | null>(null)

  const titleCase = (text: string) => {
    const casedText = `${text[0].toUpperCase()}${text.slice(1)}`
    return `${casedText.slice(0, 7)}...`
  }

  const currentJobsStatus: JobStatus = jobs[0]?.status ?? 'stopped'

  const handleClickToOpenPopover = (e: React.MouseEvent, job: Job) => {
    setPopoverCoords({ x: e.clientX, y: e.clientY })
    setPopoverData(job)
    setIsPopoverOpen(true)
  }

  const handleClosePopover = () => {
    setIsPopoverOpen(false)
    setPopoverCoords(null)
  }

  return (
    <div className="flex flex-col">
      <div className="pb-1">{currentJobsStatus}</div>
      <div className="flex flex-col gap-2">
        {jobs.map((job: Job) => (
          <div
            key={job.id}
            className="flex flex-col rounded-sm border-1 border-black shadow-xs shadow-stone-600"
          >
            <div className="rounded-t-sm bg-neutral-500 p-2 text-xl text-zinc-800">
              {`${job.id} ${titleCase(job.title)}`}
            </div>
            <div
              className={`p-2 text-lg text-zinc-200 ${CATEGORY_COLOUR_MAP[job.category]}`}
            >
              {job.category}
            </div>
            <div
              className={`rounded-b-sm bg-neutral-400 p-2 text-lg ${STATUS_COLOUR_MAP[job.status]} cursor-pointer hover:bg-neutral-300`}
              onClick={(e) => handleClickToOpenPopover(e, job)}
            >
              {job.status}
            </div>
          </div>
        ))}
      </div>
      {isPopoverOpen &&
        popoverCoords &&
        popoverData && ( // Ensure popoverCoords exist before rendering
          <Popover
            onClose={handleClosePopover}
            x={popoverCoords.x}
            y={popoverCoords.y}
          >
            <div className="flex flex-col gap-2">
              <div className="flex flex-col rounded-sm border-1 border-black shadow-xs shadow-stone-600">
                {Object.keys(STATUS_COLOUR_MAP).map((statuskey, index) => {
                  const status = statuskey as JobStatus
                  const statusArraySize = Object.keys(STATUS_COLOUR_MAP).length
                  const firstStatus = Object.keys(STATUS_COLOUR_MAP)[0]
                  const lastStatus =
                    Object.keys(STATUS_COLOUR_MAP)[statusArraySize - 1]
                  const secondIndex = 1
                  const secondLastIndex = statusArraySize - 2
                  const lastIndex = statusArraySize - 1
                  if (status === popoverData.status) {
                    return null
                  }
                  return (
                    <div
                      key={status}
                      className={`${index === 0 || (popoverData.status === firstStatus && index === secondIndex) ? 'rounded-t-sm' : ''} ${(popoverData.status === lastStatus && index === secondLastIndex) || index === lastIndex ? 'rounded-b-sm' : ''} bg-neutral-400 p-2 text-lg ${STATUS_COLOUR_MAP[status]} cursor-pointer hover:bg-neutral-300`}
                      onClick={() => {
                        handleChangeStatus(popoverData.id, status)
                        handleClosePopover()
                      }}
                    >
                      {status}
                    </div>
                  )
                })}
              </div>
            </div>
          </Popover>
        )}
    </div>
  )
}
