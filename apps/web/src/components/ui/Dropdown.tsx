import { useState, useRef, useEffect } from 'react';

interface DropdownProps {
  placeholder: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  width?: string;
  className?: string;
  searchable?: boolean;
}

export default function Dropdown({ placeholder, options, value, onChange, width, className = '', searchable = false }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Esc
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        setSearch('');
      }
    }
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open && searchable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open, searchable]);

  const filtered = search
    ? options.filter((opt) => opt.toLowerCase().includes(search.toLowerCase()))
    : options;

  function handleTriggerClick() {
    setOpen(!open);
    if (open) setSearch('');
  }

  function handleSelect(opt: string) {
    onChange(opt);
    setOpen(false);
    setSearch('');
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    if (!open) setOpen(true);
  }

  return (
    <div
      ref={ref}
      className={`onboarding-q-dropdown ${open ? 'open' : ''} ${className}`}
      style={width ? { width } : undefined}
    >
      {searchable ? (
        <div className="onboarding-q-dropdown-trigger" onClick={handleTriggerClick}>
          <input
            ref={inputRef}
            type="text"
            className="onboarding-q-dropdown-input"
            placeholder={placeholder}
            value={open ? search : value}
            onChange={handleInputChange}
            onClick={(e) => { e.stopPropagation(); if (!open) setOpen(true); }}
          />
          <img src="/icons/drop-arrow.png" alt="" className="onboarding-q-dropdown-arrow" />
        </div>
      ) : (
        <button
          type="button"
          className="onboarding-q-dropdown-trigger"
          onClick={handleTriggerClick}
        >
          <span className={value ? 'onboarding-q-dropdown-value' : 'onboarding-q-dropdown-placeholder'}>
            {value || placeholder}
          </span>
          <img src="/icons/drop-arrow.png" alt="" className="onboarding-q-dropdown-arrow" />
        </button>
      )}

      {open && (
        <div className="onboarding-q-dropdown-panel">
          {filtered.length > 0 ? (
            filtered.map((opt) => (
              <button
                key={opt}
                type="button"
                className={`onboarding-q-dropdown-item ${opt === value ? 'selected' : ''}`}
                onClick={() => handleSelect(opt)}
              >
                {opt}
              </button>
            ))
          ) : (
            <div className="onboarding-q-dropdown-empty">No results</div>
          )}
        </div>
      )}
    </div>
  );
}
