import {
  CATEGORY_COLOUR_MAP,
  STATUS_COLOUR_MAP,
  type Job,
  type JobStatus,
} from '../types/jobForm'

interface JobColumProps {
  jobs: Job[]
}

export default function JobColumn({ jobs }: JobColumProps) {
  const titleCase = (text: string) => {
    const casedText = `${text[0].toUpperCase()}${text.slice(1)}`
    return `${casedText.slice(0, 7)}...`
  }
  const currentJobsStatus: JobStatus = jobs[0]?.status ?? 'stopped'

  return (
    <div className="flex flex-col">
      <div className="pb-1">{currentJobsStatus}</div>
      <div className="flex flex-col gap-2">
        {jobs.map((job: Job) => (
          <div
            key={job.id}
            className="flex flex-col rounded-sm border-1 border-black"
          >
            <div className="rounded-t-sm bg-neutral-500 p-2 text-xl text-zinc-800">
              {titleCase(job.title)}
            </div>
            <div
              className={`p-2 text-lg text-zinc-200 ${CATEGORY_COLOUR_MAP[job.category]}`}
            >
              {job.category}
            </div>
            <div
              className={`rounded-b-sm bg-neutral-400 p-2 text-lg ${STATUS_COLOUR_MAP[job.status]} cursor-pointer hover:bg-neutral-300`}
            >
              {job.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
