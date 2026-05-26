import { useState } from 'react';

interface ProfileInputProps {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  tooltip?: string;
  error?: string;
  type?: string;
}

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="21.5" height="21.5" viewBox="0 0 21.5 21.5">
    <path
      d="M12.167,12.167l.046-.022a.833.833,0,0,1,1.181.947l-.787,3.151a.833.833,0,0,0,1.181.948l.046-.023M23,13A10,10,0,1,1,13,3,10,10,0,0,1,23,13ZM13,8.833h.009v.009H13Z"
      transform="translate(-2.25 -2.25)"
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </svg>
);

const PointerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="5" viewBox="0 0 16 5">
    <path
      d="M6.94,4.672,0,0H16L9.06,4.672a1.881,1.881,0,0,1-2.12,0"
      transform="translate(0 0.001)"
      fill="#fff"
    />
  </svg>
);

export default function ProfileInput({
  label,
  required,
  value,
  onChange,
  tooltip,
  error,
  type = 'text',
}: ProfileInputProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="pi-wrap">
      <input
        className={`pi-input${error ? ' pi-input-error' : ''}`}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
      />

      {tooltip && (
        <div
          className="pi-info"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <InfoIcon />
          {showTooltip && (
            <div className="pi-tooltip">
              <div className="pi-tooltip-box">
                <p>{tooltip}</p>
              </div>
              <div className="pi-tooltip-pointer">
                <PointerIcon />
              </div>
            </div>
          )}
        </div>
      )}

      <div className={`pi-line${error ? ' pi-line-error' : ''}`} />

      <div className="pi-footer">
        {required && <span className="pi-asterisk">*</span>}
        <span className="pi-label-text">{label}</span>
      </div>
    </div>
  );
}
