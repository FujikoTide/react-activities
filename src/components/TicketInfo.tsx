import type { Ticket } from '../types/tickets'
import ShowTicket from './ShowTicket'

export interface TicketInfoProps {
  tickets: Ticket[]
}

export default function TicketInfo({ tickets }: TicketInfoProps) {
  return (
    <div className="flex flex-row justify-between">
      {tickets.map((ticket: Ticket) => (
        <ShowTicket key={ticket.type} ticket={ticket} />
      ))}
    </div>
  )
}
