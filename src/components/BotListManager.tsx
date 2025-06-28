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

  const [filterBy, SetFilterBy] = useState('')

  function displayBot(bot: BotListTypes) {
    return (
      <div className="m-2 rounded-2xl border-2 border-black bg-stone-600 px-4 py-2 text-stone-300">
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

  function handleTask(botId: BotListTypes['id'], newStatus: BotStatusString) {
    setBots((prevBots) => {
      return prevBots.map((bot) => {
        if (bot.id === botId) {
          return { ...bot, status: newStatus }
        }
        return bot
      })
    })
  }

  return (
    <Container>
      <div className="p-4">
        <div>Bots:</div>
        <div className="text-sm">
          Filter by:
          <button
            type="button"
            onClick={() => SetFilterBy('Running')}
            className={`m-1 rounded-md border-2 border-black bg-green-600 px-1 text-xs text-white text-shadow-md text-shadow-stone-800 ${filterBy === 'Running' ? 'shadow-md shadow-stone-100' : null}`}
          >
            Running
          </button>
          <button
            type="button"
            onClick={() => SetFilterBy('Stopped')}
            className={`m-1 rounded-md border-2 border-black bg-red-500 px-1 text-xs text-white text-shadow-md text-shadow-stone-800 ${filterBy === 'Stopped' ? 'shadow-md shadow-stone-100' : null}`}
          >
            Stopped
          </button>
          <button
            type="button"
            onClick={() => SetFilterBy('Completed')}
            className={`m-1 rounded-md border-2 border-black bg-blue-700 px-1 text-xs text-white text-shadow-md text-shadow-stone-800 ${filterBy === 'Complete' ? 'shadow-md shadow-stone-100' : null}`}
          >
            Complete
          </button>
          <button
            type="button"
            onClick={() => SetFilterBy('')}
            className={`m-1 rounded-md border-2 border-black bg-orange-500 px-1 text-xs text-white text-shadow-md text-shadow-stone-800 ${filterBy === '' ? 'shadow-md shadow-stone-100' : null}`}
          >
            All
          </button>
        </div>
        <div>
          <ul>
            {bots.map((bot) => {
              {
                if (bot.status === filterBy || !filterBy) {
                  return <li key={bot.id}>{displayBot(bot)}</li>
                }
              }
            })}
          </ul>
        </div>
      </div>
    </Container>
  )
}
