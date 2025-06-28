import Container from './Container'

export default function JobBoard() {
  const numberOfJobs: number = 3
  const companyName = 'Big Company'

  function getJobMessage() {
    return numberOfJobs === 0
      ? 'No jobs to schedule today.'
      : `Jobs running today from bot: ${numberOfJobs}`
  }

  return (
    <Container>
      <div className="text-lg font-bold">{companyName}</div>
      <div className="text-base italic">{getJobMessage()}</div>
    </Container>
  )
}
