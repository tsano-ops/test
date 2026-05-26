import { useCallback, useEffect, useRef, useState } from 'react';
import { photoApi, CropData } from '@/lib/api';
import { useAuthStore } from '@/stores/auth.store';

interface CropModalProps {
  imageSrc: string;
  imageFile: File;
  onSaved: (thumbnailUrl: string, mediumUrl: string) => void;
  onCancel: () => void;
}

export default function CropModal({ imageSrc, imageFile, onSaved, onCancel }: CropModalProps) {
  const { setPhotoUrls } = useAuthStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imgNaturalSize, setImgNaturalSize] = useState({ w: 0, h: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const CANVAS_SIZE = 240;
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Load image
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImgNaturalSize({ w: img.naturalWidth, h: img.naturalHeight });
      imgRef.current = img;
      draw(img, 1, { x: 0, y: 0 });
    };
    img.src = imageSrc;
  }, [imageSrc]);

  const draw = useCallback((img: HTMLImageElement, z: number, off: { x: number; y: number }) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Clipping circle
    ctx.save();
    ctx.beginPath();
    ctx.arc(CANVAS_SIZE / 2, CANVAS_SIZE / 2, CANVAS_SIZE / 2, 0, Math.PI * 2);
    ctx.clip();

    // Fill background
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw image with zoom and offset
    const scale = (CANVAS_SIZE / Math.min(img.naturalWidth, img.naturalHeight)) * z;
    const drawW = img.naturalWidth * scale;
    const drawH = img.naturalHeight * scale;
    const x = (CANVAS_SIZE - drawW) / 2 + off.x;
    const y = (CANVAS_SIZE - drawH) / 2 + off.y;
    ctx.drawImage(img, x, y, drawW, drawH);
    ctx.restore();

    // Dim overlay outside circle
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.arc(CANVAS_SIZE / 2, CANVAS_SIZE / 2, CANVAS_SIZE / 2, 0, Math.PI * 2, true);
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.fill();
    ctx.restore();

    // Circle border
    ctx.beginPath();
    ctx.arc(CANVAS_SIZE / 2, CANVAS_SIZE / 2, CANVAS_SIZE / 2 - 1, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0,0,0,0.15)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }, []);

  useEffect(() => {
    if (imgRef.current) draw(imgRef.current, zoom, offset);
  }, [zoom, offset, draw]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };
  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: t.clientX - offset.x, y: t.clientY - offset.y });
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const t = e.touches[0];
    setOffset({ x: t.clientX - dragStart.x, y: t.clientY - dragStart.y });
  };

  // Calculate crop coordinates in original image space
  const getCropData = (): CropData => {
    const img = imgRef.current;
    if (!img) return { cropX: 0, cropY: 0, cropWidth: img?.naturalWidth ?? 0, cropHeight: img?.naturalHeight ?? 0 };
    const scale = (CANVAS_SIZE / Math.min(img.naturalWidth, img.naturalHeight)) * zoom;
    const drawW = img.naturalWidth * scale;
    const drawH = img.naturalHeight * scale;
    const imgX = (CANVAS_SIZE - drawW) / 2 + offset.x;
    const imgY = (CANVAS_SIZE - drawH) / 2 + offset.y;
    const cropX = Math.max(0, -imgX / scale);
    const cropY = Math.max(0, -imgY / scale);
    const cropW = Math.min(img.naturalWidth - cropX, CANVAS_SIZE / scale);
    const cropH = Math.min(img.naturalHeight - cropY, CANVAS_SIZE / scale);
    return {
      cropX: Math.round(cropX),
      cropY: Math.round(cropY),
      cropWidth: Math.round(cropW),
      cropHeight: Math.round(cropH),
    };
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const cropData = getCropData();
      const response = await photoApi.upload(imageFile, cropData);
      const { thumbnailUrl, mediumUrl } = response.data;
      setPhotoUrls(thumbnailUrl, mediumUrl);
      onSaved(thumbnailUrl, mediumUrl);
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? 'Upload failed. Tap to retry.';
      setError(Array.isArray(msg) ? msg[0] : msg);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
      if (e.key === 'Enter' && !isLoading) handleSave();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onCancel, isLoading]);

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.5)',
      }}
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Crop your photo"
        onClick={e => e.stopPropagation()}
        style={{
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(10px)',
          borderRadius: '24px',
          boxShadow: '0px 10px 40px #00000040',
          padding: '28px',
          width: '320px',
          fontFamily: 'Inter, sans-serif',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        <p style={{ margin: 0, fontWeight: 600, fontSize: '15px', alignSelf: 'flex-start' }}>
          Edit & Crop
        </p>

        {/* Circular crop canvas */}
        <div
          ref={containerRef}
          style={{ cursor: isDragging ? 'grabbing' : 'grab', userSelect: 'none', borderRadius: '50%', overflow: 'hidden' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={() => setIsDragging(false)}
        >
          <canvas
            ref={canvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            style={{ display: 'block', borderRadius: '50%' }}
          />
        </div>

        <p style={{ margin: 0, fontSize: '11px', color: '#999', textAlign: 'center' }}>
          Drag to reposition · Use slider to zoom
        </p>

        {/* Zoom slider */}
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '11px', color: '#999' }}>–</span>
          <input
            type="range"
            min={0.5}
            max={3}
            step={0.05}
            value={zoom}
            onChange={e => setZoom(Number(e.target.value))}
            style={{ flex: 1, accentColor: '#000' }}
            aria-label="Zoom level"
          />
          <span style={{ fontSize: '11px', color: '#999' }}>+</span>
        </div>

        {error && (
          <p style={{ margin: 0, fontSize: '12px', color: '#FF2C55', background: 'rgba(255,44,85,0.07)', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(255,44,85,0.2)', width: '100%', boxSizing: 'border-box' }}>
            {error}
            {error.includes('retry') && (
              <button onClick={handleSave} style={{ marginLeft: '8px', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontSize: '12px', color: '#FF2C55' }}>
                Retry
              </button>
            )}
          </p>
        )}

        <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
          <button onClick={onCancel} disabled={isLoading} style={btnSecondary}>Cancel</button>
          <button onClick={handleSave} disabled={isLoading} style={{ ...btnPrimary, opacity: isLoading ? 0.7 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}>
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
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
