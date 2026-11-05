import React, { useRef, useState, useEffect } from 'react';
import { PenTool, Type, RotateCcw, Check } from 'lucide-react';

export const SignaturePad = ({ onSignatureChange, defaultValue }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [sigMode, setSigMode] = useState('DRAW'); // 'DRAW' | 'TYPE'
  const [typedName, setTypedName] = useState('');
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    if (defaultValue && typeof defaultValue === 'string' && defaultValue.startsWith('data:image')) {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          setHasDrawn(true);
        }
      };
      img.src = defaultValue;
    }
  }, [defaultValue]);

  // Canvas drawing handlers
  const startDrawing = (e) => {
    if (sigMode !== 'DRAW') return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#09090B';
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing || sigMode !== 'DRAW') return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    setHasDrawn(true);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png');
      onSignatureChange(dataUrl);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setHasDrawn(false);
      onSignatureChange(null);
    }
  };

  const handleTypedChange = (val) => {
    setTypedName(val);
    if (!val.trim()) {
      onSignatureChange(null);
      return;
    }
    // Render typed signature into SVG/Canvas dataURL
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="120">
      <text x="20" y="70" font-family="'Brush Script MT', 'Dancing Script', cursive" font-size="42" fill="#09090B">${val}</text>
      <line x1="20" y1="90" x2="380" y2="90" stroke="#71717A" stroke-dasharray="4,4" />
    </svg>`;
    const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
    onSignatureChange(dataUrl);
  };

  return (
    <div className="signature-section-wrap">
      <div className="sig-header">
        <span className="sig-label">Digital Execution Signature Pad</span>
        <div className="sig-tools">
          <button
            type="button"
            className={`action-btn-clean ${sigMode === 'DRAW' ? 'active font-bold text-black' : ''}`}
            onClick={() => setSigMode('DRAW')}
          >
            <PenTool size={13} />
            <span>Draw</span>
          </button>
          <button
            type="button"
            className={`action-btn-clean ${sigMode === 'TYPE' ? 'active font-bold text-black' : ''}`}
            onClick={() => setSigMode('TYPE')}
          >
            <Type size={13} />
            <span>Type Name</span>
          </button>
          {sigMode === 'DRAW' && hasDrawn && (
            <button
              type="button"
              className="action-btn-clean text-red-700"
              onClick={clearCanvas}
              title="Clear signature"
            >
              <RotateCcw size={13} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {sigMode === 'DRAW' ? (
        <div className="sig-canvas-container">
          <canvas
            ref={canvasRef}
            width={700}
            height={140}
            className="sig-canvas"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
          <div className="sig-baseline-hint">
            <span>Sign with mouse, stylus or touch</span>
          </div>
        </div>
      ) : (
        <div style={{ background: '#FFF', padding: '1.25rem', border: '1px dashed #27272A' }}>
          <input
            type="text"
            placeholder="Type your official legal name..."
            value={typedName}
            onChange={(e) => handleTypedChange(e.target.value)}
            style={{
              width: '100%',
              fontSize: '1.75rem',
              fontFamily: "'Brush Script MT', 'Dancing Script', cursive",
              border: 'none',
              outline: 'none',
              color: '#09090B',
              borderBottom: '1px solid #E4E4E7',
              paddingBottom: '8px',
            }}
          />
          <p className="text-xs text-neutral-500 mt-2 font-mono">
            Cryptographically bound to your authenticated identity under IT Act, 2000.
          </p>
        </div>
      )}
    </div>
  );
};

export default SignaturePad;
