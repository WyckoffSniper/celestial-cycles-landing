import { useEffect } from 'react';

export default function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.92)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'lbFadeIn 0.2s ease',
      }}
    >
      <style>{`
        @keyframes lbFadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
      <button onClick={onClose} style={{
        position: 'absolute', top: 16, right: 24,
        background: 'none', border: 'none', color: '#fff',
        fontSize: '2rem', cursor: 'pointer', lineHeight: 1,
      }}>{'\u00D7'}</button>
      <img
        src={src} alt={alt || ''}
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: 8 }}
      />
    </div>
  );
}
