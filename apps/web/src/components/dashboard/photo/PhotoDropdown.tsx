import { useEffect, useRef } from 'react';

interface PhotoDropdownProps {
  hasPhoto: boolean;
  onChangePhoto: () => void;
  onEditCrop: () => void;
  onRemovePhoto: () => void;
  onClose: () => void;
}

export default function PhotoDropdown({
  hasPhoto,
  onChangePhoto,
  onEditCrop,
  onRemovePhoto,
  onClose,
}: PhotoDropdownProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        const items = ref.current?.querySelectorAll<HTMLButtonElement>('button');
        const focused = document.activeElement as HTMLElement;
        const idx = Array.from(items ?? []).indexOf(focused as HTMLButtonElement);
        items?.[idx + 1]?.focus();
      }
      if (e.key === 'ArrowUp') {
        const items = ref.current?.querySelectorAll<HTMLButtonElement>('button');
        const focused = document.activeElement as HTMLElement;
        const idx = Array.from(items ?? []).indexOf(focused as HTMLButtonElement);
        items?.[Math.max(0, idx - 1)]?.focus();
      }
    };
    const handleOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleOutside);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleOutside);
    };
  }, [onClose]);

  // Auto-focus first item
  useEffect(() => {
    const first = ref.current?.querySelector<HTMLButtonElement>('button');
    first?.focus();
  }, []);

  return (
    <div
      ref={ref}
      role="menu"
      aria-label="Profile photo options"
      style={{
        position: 'absolute',
        top: '90px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        background: 'rgba(255,255,255,0.33)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '16px',
        border: '1px solid #FFFFFF',
        boxShadow: '0px 10px 30px #00000029',
        minWidth: '160px',
        padding: '6px 0',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <button
        role="menuitem"
        aria-label="Change photo"
        onClick={() => { onChangePhoto(); onClose(); }}
        style={dropdownItemStyle}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.05)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      >
        Change photo
      </button>
      {hasPhoto && (
        <button
          role="menuitem"
          aria-label="Edit or crop photo"
          onClick={() => { onEditCrop(); onClose(); }}
          style={dropdownItemStyle}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.05)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          Edit / Crop
        </button>
      )}
      {hasPhoto && (
        <button
          role="menuitem"
          aria-label="Remove photo"
          onClick={() => { onRemovePhoto(); onClose(); }}
          style={{ ...dropdownItemStyle, color: '#FF2C55' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,44,85,0.06)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          Remove photo
        </button>
      )}
    </div>
  );
}

const dropdownItemStyle: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  padding: '10px 18px',
  textAlign: 'left',
  cursor: 'pointer',
  fontSize: '13px',
  fontFamily: 'Inter, sans-serif',
  color: '#000',
  width: '100%',
  transition: 'background 0.15s',
};
