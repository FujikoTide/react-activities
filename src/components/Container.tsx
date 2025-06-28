import type { ReactNode } from 'react'

export interface ContainerProps {
  children: ReactNode
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="flex flex-col items-center p-8">
      <div className="flex w-96 flex-col rounded-2xl border-1 border-stone-300 bg-stone-400 text-center text-xl text-stone-700 shadow-lg shadow-stone-900">
        {children}
      </div>
    </div>
  )
}
