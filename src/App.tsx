import AdvancedJobCounter from './components/AdvancedJobCounter'
import BotListManager from './components/BotListManager'
import Button from './components/Button'
import DynamicForm from './components/DynamicForm'
import InvestMentCalculator from './components/InvestMentCalculator'
import JobBoard from './components/JobBoard'
import JobCounter from './components/JobCounter'
import JobForm from './components/JobForm'
import ModularJobBoard from './components/ModularJobBoard'
import MovieReview from './components/MovieReview'
import PasswordGenerator from './components/PasswordGenerator'
import StatusBoard from './components/StatusBoard'
import VariableDisplay from './components/VariableDisplay'
import ProfileCards from './pages/ProfileCards'

function App() {
  return (
    <div>
      <ProfileCards />
      <VariableDisplay />
      <JobBoard />
      <Button />
      <JobCounter />
      <AdvancedJobCounter />
      <DynamicForm />
      <BotListManager />
      <ModularJobBoard />
      <StatusBoard />
      <JobForm />
      <InvestMentCalculator />
      <PasswordGenerator />
      <MovieReview />
    </div>
  )
}

export default App
