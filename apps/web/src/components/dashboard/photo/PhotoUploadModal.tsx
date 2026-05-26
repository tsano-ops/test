import { useEffect, useRef, useState } from 'react';

interface PhotoUploadModalProps {
  onFileSelected: (dataUrl: string, file: File) => void;
  onClose: () => void;
}

const MAX_SIZE = 10 * 1024 * 1024;
const MIN_DIM = 100;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

function validateFile(file: File): Promise<string | null> {
  return new Promise((resolve) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      resolve('Only JPG, PNG or WEBP accepted');
      return;
    }
    if (file.size > MAX_SIZE) {
      resolve('Please use an image under 10MB');
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      if (img.naturalWidth < MIN_DIM || img.naturalHeight < MIN_DIM) {
        resolve('Image must be at least 100×100px');
      } else {
        resolve(null);
      }
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve('Could not read image'); };
    img.src = url;
  });
}

export default function PhotoUploadModal({ onFileSelected, onClose }: PhotoUploadModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { stopCamera(); onClose(); } };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Attach stream to video element
  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [cameraStream, showCamera]);

  const stopCamera = () => {
    cameraStream?.getTracks().forEach(t => t.stop());
    setCameraStream(null);
    setShowCamera(false);
  };

  const handleFile = async (file: File) => {
    setError(null);
    const err = await validateFile(file);
    if (err) { setError(err); return; }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      onFileSelected(dataUrl, file);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const openCamera = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      setCameraStream(stream);
      setShowCamera(true);
    } catch {
      setError('Camera access denied. Please allow camera access in your browser settings.');
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
      stopCamera();
      handleFile(file);
    }, 'image/jpeg', 0.95);
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.45)',
      }}
      onClick={() => { stopCamera(); onClose(); }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Upload profile photo"
        onClick={e => e.stopPropagation()}
        style={{
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(10px)',
          borderRadius: '24px',
          boxShadow: '0px 10px 40px #00000040',
          padding: '28px',
          width: '340px',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {showCamera ? (
          <>
            <p style={{ margin: '0 0 12px', fontWeight: 600, fontSize: '15px' }}>Take a photo</p>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{ width: '100%', borderRadius: '12px', background: '#000' }}
            />
            <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
              <button onClick={() => { stopCamera(); }} style={btnSecondary}>Cancel</button>
              <button onClick={capturePhoto} style={btnPrimary}>Capture</button>
            </div>
          </>
        ) : (
          <>
            <p style={{ margin: '0 0 16px', fontWeight: 600, fontSize: '15px' }}>Upload photo</p>

            {/* Drag & Drop Zone */}
            <div
              onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              style={{
                border: isDragging ? '2px dashed #000' : '2px dashed #ccc',
                borderRadius: '14px',
                padding: '28px 16px',
                textAlign: 'center',
                marginBottom: '16px',
                transition: 'border-color 0.2s',
                background: isDragging ? 'rgba(0,0,0,0.03)' : 'transparent',
                cursor: 'pointer',
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '8px' }}>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>
                Drag & drop or <strong style={{ color: '#000' }}>click to upload</strong>
              </p>
              <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#999' }}>JPG, PNG or WEBP · Max 10MB</p>
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              style={{ display: 'none' }}
              onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }}
            />

            {/* Camera capture (mobile uses native camera) */}
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="user"
              style={{ display: 'none' }}
              onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }}
            />

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => {
                  // On mobile use native camera via capture input, on desktop open webcam
                  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
                  if (isMobile) cameraInputRef.current?.click();
                  else openCamera();
                }}
                style={btnSecondary}
              >
                Take photo
              </button>
              <button onClick={() => fileInputRef.current?.click()} style={btnPrimary}>
                Choose file
              </button>
            </div>

            {error && (
              <p style={{ margin: '12px 0 0', fontSize: '12px', color: '#FF2C55', background: 'rgba(255,44,85,0.07)', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(255,44,85,0.2)' }}>
                {error}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const btnPrimary: React.CSSProperties = {
  flex: 1, padding: '10px', borderRadius: '10px',
  border: 'none', background: '#000', color: '#fff',
  fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
};

const btnSecondary: React.CSSProperties = {
  flex: 1, padding: '10px', borderRadius: '10px',
  border: '1px solid #ccc', background: '#fff', color: '#000',
  fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
};
