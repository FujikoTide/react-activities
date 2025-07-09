import type { Job, JobStatus } from '../types/jobs'
import DeleteButton from './DeleteButton'

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
      <DeleteButton size="md" onClick={onDelete} />

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
