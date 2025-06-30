import { useState } from 'react'
import Container from './Container'

export type BotStatusString = 'Running' | 'Completed' | 'Stopped'

export interface BotListTypes {
  id: number
  name: string
  status: BotStatusString
  task: string
}

export default function BotListManager() {
  const [bots, setBots] = useState<BotListTypes[]>([
    {
      id: 1,
      name: 'Email Extractor',
      status: 'Running',
      task: 'Extracting emails',
    },
    {
      id: 2,
      name: 'Notification Sender',
      status: 'Completed',
      task: 'Sending notifications',
    },
    { id: 3, name: 'Data Analyzer', status: 'Stopped', task: 'Analyzing data' },
  ])

  const [filterBy, setFilterBy] = useState('All')
  const [id, setId] = useState(bots.length + 1)
  const [formData, setFormData] = useState({
    name: '',
    task: '',
  })

  const displayBot = (bot: BotListTypes) => {
    return (
      <div className="m-2 rounded-2xl border-2 border-black bg-stone-600 px-4 py-2 text-stone-300">
        <div
          onClick={() => handleDeleteBot(bot.id)}
          className="text-md my-1 w-8 cursor-pointer rounded-sm border-2 border-black bg-red-500 px-2 text-right text-white text-shadow-md text-shadow-stone-800"
        >
          X
        </div>
        <div className="flex justify-between">
          <div>ID: </div>
          <div>{bot.id}</div>
        </div>
        <div className="flex justify-between">
          <div>Name: </div>
          <div>{bot.name}</div>
        </div>
        <div className="flex justify-between">
          <div>Status: </div>
          <div>{bot.status}</div>
        </div>
        <div className="flex justify-between">
          <div>Task: </div>
          <div>{bot.task}</div>
        </div>
        <div>
          <button
            type="button"
            onClick={() => handleTask(bot.id, 'Running')}
            className="m-2 rounded-xl border-2 border-black bg-green-600 px-2 py-1 text-base font-bold text-white text-shadow-md text-shadow-stone-800 hover:shadow-sm hover:shadow-stone-800"
          >
            Run Task
          </button>
          <button
            type="button"
            onClick={() => handleTask(bot.id, 'Stopped')}
            className="m-2 rounded-xl border-2 border-black bg-red-500 px-2 py-1 text-base font-bold text-white text-shadow-md text-shadow-stone-800 hover:shadow-sm hover:shadow-stone-800"
          >
            Stop Task
          </button>
          <button
            type="button"
            onClick={() => handleTask(bot.id, 'Completed')}
            className="m-2 rounded-xl border-2 border-black bg-blue-700 px-2 py-1 text-base font-bold text-white text-shadow-md text-shadow-stone-800 hover:shadow-sm hover:shadow-stone-800"
          >
            Complete Task
          </button>
        </div>
      </div>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleTask = (
    botId: BotListTypes['id'],
    newStatus: BotStatusString,
  ) => {
    setBots((prevBots) => {
      return prevBots.map((bot) => {
        if (bot.id === botId) {
          return { ...bot, status: newStatus }
        }
        return bot
      })
    })
  }

  const handleAddBot = () => {
    const newBot: BotListTypes = {
      id: id,
      name: formData.name,
      status: 'Stopped',
      task: formData.task,
    }
    setBots((prevBots) => [...prevBots, newBot])
    setId((prevId) => prevId + 1)
    setFormData({
      name: '',
      task: '',
    })
  }

  const handleDeleteBot = (botId: number) => {
    const newBots = bots.filter((bot) => bot.id !== botId)
    setBots(newBots)
  }

  return (
    <Container>
      <div className="p-4">
        <div>Bots:</div>
        <div className="text-sm">
          Filter by:
          <button
            type="button"
            onClick={() => setFilterBy('Running')}
            className={`m-1 rounded-md border-2 border-black bg-green-600 px-1 text-xs text-white text-shadow-md text-shadow-stone-800 ${filterBy === 'Running' ? 'shadow-md shadow-stone-100' : null}`}
          >
            Running
          </button>
          <button
            type="button"
            onClick={() => setFilterBy('Stopped')}
            className={`m-1 rounded-md border-2 border-black bg-red-500 px-1 text-xs text-white text-shadow-md text-shadow-stone-800 ${filterBy === 'Stopped' ? 'shadow-md shadow-stone-100' : null}`}
          >
            Stopped
          </button>
          <button
            type="button"
            onClick={() => setFilterBy('Completed')}
            className={`m-1 rounded-md border-2 border-black bg-blue-700 px-1 text-xs text-white text-shadow-md text-shadow-stone-800 ${filterBy === 'Completed' ? 'shadow-md shadow-stone-100' : null}`}
          >
            Complete
          </button>
          <button
            type="button"
            onClick={() => setFilterBy('All')}
            className={`m-1 rounded-md border-2 border-black bg-orange-500 px-1 text-xs text-white text-shadow-md text-shadow-stone-800 ${filterBy === 'All' ? 'shadow-md shadow-stone-100' : null}`}
          >
            All
          </button>
        </div>
        <div>
          <ul>
            {bots
              .filter((bot) => bot.status === filterBy || filterBy === 'All')
              .map((bot) => (
                <li key={bot.id}>{displayBot(bot)}</li>
              ))}
          </ul>
        </div>
        <div>
          <div>Add Bot:</div>
          <div>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={formData.name}
              className="m-1 rounded-lg border-2 border-orange-400 bg-stone-300 px-2 text-base outline-0"
              placeholder="enter name..."
            />
          </div>
          <div>
            <input
              type="text"
              name="task"
              onChange={handleChange}
              value={formData.task}
              className="m-1 rounded-lg border-2 border-orange-400 bg-stone-300 px-2 text-base outline-0"
              placeholder="enter task..."
            />
          </div>
          <div>
            <button
              type="button"
              onClick={handleAddBot}
              className="m-2 rounded-xl border-2 border-black bg-blue-700 px-2 py-1 text-base font-bold text-white text-shadow-md text-shadow-stone-800 hover:shadow-sm hover:shadow-stone-800"
            >
              Add Bot
            </button>
          </div>
        </div>
      </div>
    </Container>
  )
}
