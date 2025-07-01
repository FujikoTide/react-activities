export type JobCategories = 'Read Email' | 'Web Parsing' | 'Send Emails'
export type JobStatus = 'start' | 'running' | 'completed' | 'stopped'

export interface Job {
  title: string
  category: JobCategories
  status: JobStatus
}
