import clsx from 'clsx'

import CrossSymbol from '../assets/images/cross.svg?react'

interface DeleteButtonProps {
  size: 'sm' | 'md' | 'lg'
  onClick: () => void
  className?: string
}

export default function DeleteButton({
  size = 'lg',
  onClick,
  className,
}: DeleteButtonProps) {
  const buttonBaseClasses =
    'm-1 flex cursor-pointer items-center justify-center rounded-sm border-2 border-black bg-red-500 text-white'
  let buttonClasses = ''
  let crossSizeClasses = ''

  switch (size) {
    case 'sm':
      buttonClasses = 'h-4 w-4'
      crossSizeClasses = 'h-4 w-4'
      break
    case 'md':
      buttonClasses = 'h-6 w-6'
      crossSizeClasses = 'h-6 w-6'
      break
    case 'lg':
      buttonClasses = 'h-8 w-8'
      crossSizeClasses = 'h-8 w-8'
      break
  }

  return (
    <div
      onClick={onClick}
      className={clsx(buttonBaseClasses, buttonClasses, className)}
    >
      <CrossSymbol className={crossSizeClasses} />
    </div>
  )
}
