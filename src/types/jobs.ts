export type JobStatus = 'stopped' | 'running' | 'completed'

export interface Job {
  id: number
  name: string
  status: JobStatus
}
