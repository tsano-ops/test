import React from 'react'

interface BtnBackProps {
  label?: string
  onClick?: () => void
  disabled?: boolean
  type?: 'submit' | 'button'
  className?: string
}

const BtnBack: React.FC<BtnBackProps> = ({
  label = 'Back',
  onClick,
  disabled = false,
  type = 'button',
  className = '',
}) => {
  return (
    <button
      type={type}
      className={`btn-back${className ? ` ${className}` : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {/* Pad — circle that reveals white bg on hover */}
      <span className="btn-back-pad">
        {/* Arrow — 9×16, left-facing, always visible */}
        <svg
          viewBox="0 0 9 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M8 1L1 8L8 15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      {/* Text — shifts 20px right on hover */}
      <span className="btn-back-text">{label}</span>
    </button>
  )
}

export default BtnBack
