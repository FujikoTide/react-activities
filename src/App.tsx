import AdvancedJobCounter from './components/AdvancedJobCounter'
import BotListManager from './components/BotListManager'
import Button from './components/Button'
import DynamicForm from './components/DynamicForm'
import JobBoard from './components/JobBoard'
import JobCounter from './components/JobCounter'
import JobForm from './components/JobForm'
import ModularJobBoard from './components/ModularJobBoard'
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
    </div>
  )
}

export default App
