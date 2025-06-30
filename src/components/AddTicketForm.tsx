import { useState } from 'react'
import type { TicketType } from '../types/tickets'

const ALL_TICKET_STATUSES: TicketType[] = ['completed', 'in progress', 'failed']

interface AddTicketFormProps {
  handleAddTicket: (type: TicketType) => void
}

export default function AddTicketForm({ handleAddTicket }: AddTicketFormProps) {
  const [formData, setFormData] = useState({
    type: 'completed' as TicketType,
  })

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value as TicketType,
    }))
  }

  return (
    <div>
      <div>Add Ticket:</div>
      <div>
        <select
          name="type"
          id="type"
          onChange={handleChange}
          value={formData.type}
          className="m-1 rounded-lg border-2 border-orange-400 bg-stone-300 px-2 text-base outline-0"
        >
          {ALL_TICKET_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button
          type="button"
          onClick={() => handleAddTicket(formData.type)}
          className="m-2 rounded-xl border-2 border-black bg-blue-700 px-2 py-1 text-base font-bold text-white text-shadow-md text-shadow-stone-800 hover:shadow-sm hover:shadow-stone-800"
        >
          Add Ticket
        </button>
      </div>
    </div>
  )
}
