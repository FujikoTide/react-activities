export interface ListProps {
  data: unknown[]
}

export default function List({ data }: ListProps) {
  return (
    <ul>
      {data.map((entry, index) => (
        <li key={index}>{String(entry)}</li>
      ))}
    </ul>
  )
}
