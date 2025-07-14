import React from 'react'
import ReactDOM from 'react-dom'

interface ModalProps {
  children: React.ReactNode
  onClose: () => void
}

export default function Modal({ children, onClose }: ModalProps) {
  const modalRoot = document.getElementById('modal-root')
  if (!modalRoot) {
    console.error("'modal-root' not found in DOM")
    return null
  }

  return ReactDOM.createPortal(
    <div
      className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    modalRoot,
  )
}
