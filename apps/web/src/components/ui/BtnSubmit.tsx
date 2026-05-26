import React from 'react'
import { Loader2 } from 'lucide-react'

interface BtnSubmitProps {
  label: string
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  type?: 'submit' | 'button'
  className?: string
}

const BtnSubmit: React.FC<BtnSubmitProps> = ({
  label,
  onClick,
  disabled = false,
  loading = false,
  type = 'submit',
  className = '',
}) => {
  return (
    <button
      type={type}
      className={`btn-submit${className ? ` ${className}` : ''}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {/* Pill — absolute, z-index 0, grows leftward from circle position on hover */}
      <span className="btn-submit-pill" aria-hidden="true" />

      {/* Text — does NOT move in any state */}
      <span className="btn-submit-text">{label}</span>

      {/* Dash — grows rightward 10→30px on hover toward the circle */}
      <span className="btn-submit-dash" aria-hidden="true" />

      {/* Circle — stays fixed, border fades on hover */}
      <span className="btn-submit-circle">
        {loading ? (
          <Loader2 className="btn-submit-spinner" aria-label="Loading" />
        ) : (
          <svg
            viewBox="0 0 9 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M1 1L8 8L1 15"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    </button>
  )
}

export default BtnSubmit
