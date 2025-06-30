import fail from '../assets/images/fail.svg'
import success from '../assets/images/success.svg'
import inProgress from '../assets/images/progress.svg'
import type { Ticket, TicketType } from '../types/tickets'
import { useState } from 'react'

interface ShowTicketProps {
  ticket: Ticket
}

const IMAGEMAP: Record<TicketType, string> = {
  completed: success,
  'in progress': inProgress,
  failed: fail,
}

export default function ShowTicket({ ticket }: ShowTicketProps) {
  const [isHidden, setIsHidden] = useState(true)

  const titleCase = (text: string) => {
    let words = ''
    if (text.length > 0) {
      const wordArray = text.split(' ')
      words = wordArray
        .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
        .join(' ')
    }
    return words
  }

  const toggleDetails = () => {
    setIsHidden(!isHidden)
  }

  return (
    <div
      onClick={toggleDetails}
      className="m-2 rounded-2xl border-2 border-black bg-stone-800 px-4 py-2 text-stone-300"
    >
      <div className="flex items-center justify-between gap-2">
        <div>
          <img
            className="h-20 min-h-20 w-20 min-w-20"
            src={IMAGEMAP[ticket.type]}
            alt=""
          />
        </div>
        <div className="text-4xl">{ticket.amount}</div>
      </div>
      <div className="my-2" hidden={isHidden}>
        <div className="text-xl font-bold">{titleCase(ticket.type)}</div>
        <div className="text-base italic">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur,
          distinctio!
        </div>
      </div>
    </div>
  )
}
