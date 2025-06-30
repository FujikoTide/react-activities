export type TicketType = 'completed' | 'in progress' | 'failed'

export interface Ticket {
  type: TicketType
  amount: number
}
