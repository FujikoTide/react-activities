export interface ProfileCardProps {
  image: string
  name: string
  company?: string
  jobTitle: string
  bio: string
  skills: string[]
}

export default function ProfileCard({ ...props }: ProfileCardProps) {
  return (
    <div className="flex w-96 flex-col rounded-2xl border-1 border-stone-300 bg-stone-400 text-center text-xl text-stone-700">
      <div className="grid grid-cols-4">
        <div className="">
          <img
            src={props.image}
            alt="image of person"
            className="rounded-tl-2xl border-r-1 border-stone-300"
          />
        </div>
        <div className="col-span-3 p-2 text-left">
          <div className="text-base font-bold">{props.name}</div>
          <div className="text-sm">
            {(props.company && props.company) || '-'}
          </div>
          <div className="text-sm">{props.jobTitle}</div>
        </div>
      </div>

      <div className="border-y-1 border-stone-300 p-3 text-left">
        {props.bio}
        <ul className="list-disc pl-4">
          {props.skills.map((entry) => (
            <li>{entry}</li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-2">
        <div className="px-2 py-1 text-left text-sm italic">created:</div>
        <div className="px-2 py-1 text-right text-sm italic">26/06/2025</div>
      </div>
    </div>
  )
}
