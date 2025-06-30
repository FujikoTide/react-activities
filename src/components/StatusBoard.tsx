import WideContainer from './WideContainer'
import TicketInfo from './TicketInfo'
import type { Ticket, TicketType } from '../types/tickets'
import { useState } from 'react'
import AddTicketForm from './addTicketForm'

export default function StatusBoard() {
  const [tickets, setTickets] = useState<Ticket[]>([
    { type: 'completed', amount: 5 },
    { type: 'in progress', amount: 6 },
    { type: 'failed', amount: 25 },
  ])

  const handleAddTicket = (ticketType: TicketType) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.type === ticketType
          ? { type: ticketType, amount: ticket.amount + 1 }
          : ticket,
      ),
    )
  }

  return (
    <WideContainer>
      <AddTicketForm handleAddTicket={handleAddTicket} />
      <TicketInfo tickets={tickets} />
    </WideContainer>
  )
}
