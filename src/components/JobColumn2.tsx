import {
  CATEGORY_COLOUR_MAP,
  STATUS_COLOUR_MAP,
  type Job,
  type JobCategories,
  type JobStatus,
} from '../types/jobForm'
import React, { useState } from 'react'
import Popover from './Popover'
import DeleteButton from './DeleteButton'

interface ClickCoordinates {
  x: number
  y: number
}

interface JobColumProps {
  jobs: Job[]
  statusType: JobStatus
  handleChangeStatus: (jobId: number, jobStatus: JobStatus) => void
  handleDeleteJob: (jobId: number) => void
}

export default function JobColumn2({
  jobs,
  statusType,
  handleChangeStatus,
  handleDeleteJob,
}: JobColumProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [popoverCoords, setPopoverCoords] = useState<ClickCoordinates | null>(
    null,
  )
  const [popoverData, setPopoverData] = useState<Job | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  const titleCase = (text: string) => {
    const casedText = `${text[0].toUpperCase()}${text.slice(1)}`
    return `${casedText.slice(0, 7)}...`
  }

  const handleClickToOpenPopover = (e: React.MouseEvent, job: Job) => {
    setPopoverCoords({ x: e.clientX, y: e.clientY })
    setPopoverData(job)
    setIsPopoverOpen(true)
  }

  const handleClosePopover = () => {
    setIsPopoverOpen(false)
    setPopoverCoords(null)
    setPopoverData(null)
  }

  const handleDragStart = (e: React.DragEvent, job: Job) => {
    e.dataTransfer.setData('text/plain', String(job.id))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const jobId = Number(e.dataTransfer.getData('text/plain'))
    handleChangeStatus(jobId, statusType)
  }

  const handleDragEnd = () => {
    setIsDragOver(false)
  }

  return (
    <div
      className={`flex min-w-[130px] flex-col p-2 ${isDragOver ? 'rounded-2xl bg-neutral-500/50 p-2' : ''}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
    >
      <div className="pb-1">{statusType}</div>
      <div className="flex flex-col gap-2">
        <div className="min-w-[130px]">
          {jobs.length === 0 && (
            <p className="text-center text-sm text-gray-500 italic">
              No jobs here
            </p>
          )}
        </div>

        {jobs.map((job: Job) => (
          <div
            key={job.id}
            className="flex flex-col overflow-hidden rounded-sm border-1 border-black shadow-xs shadow-stone-600"
            draggable
            onDragStart={(e) => handleDragStart(e, job)}
            onDragEnd={handleDragEnd}
          >
            <div className="flex cursor-pointer flex-row justify-between bg-neutral-500">
              <div className="p-2 text-xl text-zinc-800">{`${titleCase(job.title)}`}</div>
              <DeleteButton
                className="m-1"
                size="sm"
                onClick={() => handleDeleteJob(job.id)}
              />
            </div>
            {job.categories.map((category: JobCategories) => {
              return (
                <div
                  key={category}
                  className={`p-2 text-lg text-zinc-200 ${CATEGORY_COLOUR_MAP[category]}`}
                >
                  {category}
                </div>
              )
            })}
            <div
              className={`bg-neutral-400 p-2 text-lg ${STATUS_COLOUR_MAP[job.status]} cursor-pointer hover:bg-neutral-300`}
              onClick={(e) => handleClickToOpenPopover(e, job)}
            >
              {job.status}
            </div>
          </div>
        ))}
      </div>
      {isPopoverOpen && popoverCoords && popoverData && (
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
