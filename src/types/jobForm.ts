export type JobCategories = 'Read Email' | 'Web Parsing' | 'Send Emails'
export type JobStatus = 'start' | 'running' | 'completed' | 'stopped'

export const ALL_JOB_CATEGORIES: JobCategories[] = [
  'Read Email',
  'Web Parsing',
  'Send Emails',
]

export interface Job {
  id: number
  title: string
  categories: JobCategories[]
  status: JobStatus
}

export const CATEGORY_COLOUR_MAP: Record<JobCategories, string> = {
  'Read Email': 'bg-green-600/70',
  'Send Emails': 'bg-red-500/70',
  'Web Parsing': 'bg-blue-700/70',
}
export const STATUS_COLOUR_MAP: Record<JobStatus, string> = {
  completed: 'text-blue-700',
  running: 'text-orange-500',
  start: 'text-green-700',
  stopped: 'text-red-500',
}
