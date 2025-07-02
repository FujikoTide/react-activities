import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

interface PopoverProps {
  children: React.ReactNode
  onClose: () => void
  x: number
  y: number
}

export default function Popover({ children, onClose, x, y }: PopoverProps) {
  const popoverRoot = document.getElementById('popover-root')
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  useEffect(() => {
    if (contentRef.current) {
      const { clientWidth, clientHeight } = document.documentElement
      const { offsetWidth, offsetHeight } = contentRef.current

      let newX = x
      let newY = y

      if (x + offsetWidth > clientWidth) {
        newX = clientWidth - offsetWidth - 10
      }
      if (y + offsetHeight > clientHeight) {
        newY = clientHeight - offsetHeight - 10
      }

      if (newX < 10) newX = 10
      if (newY < 10) newY = 10

      if (contentRef.current.style.left !== `${newX}px`) {
        contentRef.current.style.left = `${newX}px`
      }

      if (contentRef.current.style.top !== `${newY}px`) {
        contentRef.current.style.top = `${newY}px`
      }
    }
  }, [x, y])

  if (!popoverRoot) {
    console.error("No 'popover-root' element found in the DOM.")
    return null
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div
        ref={contentRef}
        style={{
          position: 'fixed',
          top: `${y}px`,
          left: `${x}px`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    popoverRoot,
  )
}
