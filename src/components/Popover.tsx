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
    // Outer div acts as a transparent, full-screen overlay for detecting outside clicks
    <div
      className="fixed inset-0 z-50" // Covers the entire viewport, higher z-index
      onClick={onClose} // Closes the popover when clicking anywhere outside its content
    >
      <div
        ref={contentRef} // Attach the ref to this div to measure its size
        style={{
          position: 'fixed', // Position relative to the viewport
          top: `${y}px`, // Initial top position from click
          left: `${x}px`, // Initial left position from click
        }}
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside popover from bubbling up and closing it
      >
        {children}
      </div>
    </div>,
    popoverRoot, // The target DOM node for the portal
  )
}
