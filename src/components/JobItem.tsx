import type { Job, JobStatus } from '../types/jobs'

interface JobItemProps {
  job: Job
  onDelete: () => void
}

const STATUSMAP: Record<JobStatus, string> = {
  completed: 'text-blue-500',
  stopped: 'text-red-500',
  running: 'text-green-500',
}

export default function JobItem({ job, onDelete }: JobItemProps) {
  return (
    <div className="m-2 rounded-2xl border-2 border-black bg-stone-600 px-4 py-2 text-stone-300">
      <div
        onClick={onDelete}
        className="text-md my-1 w-8 cursor-pointer rounded-sm border-2 border-black bg-red-500 px-2 text-right text-white text-shadow-md text-shadow-stone-800"
      >
        X
      </div>
      <div className="flex justify-between">
        <div>ID: </div>
        <div>{job.id}</div>
      </div>
      <div className="flex justify-between">
        <div>Name: </div>
        <div>{job.name}</div>
      </div>
      <div className="flex justify-between">
        <div>Status: </div>
        <div className={STATUSMAP[job.status]}>{job.status}</div>
      </div>
    </div>
  )
}
