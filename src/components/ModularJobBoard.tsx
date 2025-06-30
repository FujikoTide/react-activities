import { useState } from 'react'
import type { Job, JobStatus } from '../types/jobs'
import Container from './Container'
import Footer from './Footer'
import Header from './Header'
import JobList from './JobList'

export default function ModularJobBoard() {
  const [jobs, setJobs] = useState<Job[]>([
    { id: 1, name: 'Email Extractor', status: 'running' },
    { id: 2, name: 'Data Analyzer', status: 'completed' },
    { id: 3, name: 'Report Generator', status: 'running' },
  ])
  const [filterBy, setFilterBy] = useState('All')
  const [id, setId] = useState(jobs.length + 1)
  const [formData, setFormData] = useState({
    name: '',
    status: 'stopped' as JobStatus,
  })

  const handleDelete = (jobIdToDelete: number) => {
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobIdToDelete))
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value as JobStatus,
    }))
  }

  const handleAddJob = () => {
    const newJob: Job = {
      id: id,
      name: formData.name,
      status: formData.status,
    }
    setJobs((prevJobs) => [...prevJobs, newJob])
    setId((prevId) => prevId + 1)
    setFormData({
      name: '',
      status: 'stopped' as JobStatus,
    })
  }

  return (
    <Container>
      <Header />
      <JobList
        setFilterBy={setFilterBy}
        filterBy={filterBy}
        onDeleteJob={handleDelete}
        formData={formData}
        onChange={handleChange}
        onAddJob={handleAddJob}
        jobs={jobs}
      />
      <Footer />
    </Container>
  )
}
