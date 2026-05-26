import { useEffect } from 'react';

interface RemovePhotoConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function RemovePhotoConfirmModal({ onConfirm, onCancel, isLoading }: RemovePhotoConfirmModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onCancel]);

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.35)',
      }}
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Remove profile photo confirmation"
        onClick={e => e.stopPropagation()}
        style={{
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          boxShadow: '0px 10px 30px #00000029',
          padding: '32px 28px 24px',
          maxWidth: '340px',
          width: '100%',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <p style={{ margin: '0 0 24px', fontSize: '14px', lineHeight: '1.6', color: '#000', textAlign: 'center' }}>
          Are you sure you want to remove your profile photo?
          <br />
          This cannot be undone.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={onCancel}
            disabled={isLoading}
            style={{
              flex: 1, padding: '10px', borderRadius: '10px',
              border: '1px solid #ccc', background: '#fff',
              fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            style={{
              flex: 1, padding: '10px', borderRadius: '10px',
              border: 'none', background: '#FF2C55', color: '#fff',
              fontSize: '14px', cursor: isLoading ? 'not-allowed' : 'pointer',
              fontFamily: 'Inter, sans-serif', opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? 'Removing...' : 'Remove'}
          </button>
        </div>
      </div>
    </div>
  );
}
