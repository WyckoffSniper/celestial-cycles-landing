import { F, APP_URL } from '../tokens';

export default function FinalCTA() {
  return (
    <section style={{
      padding: '120px 24px 80px', textAlign: 'center', position: 'relative',
    }}>
      {/* Ambient glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 300,
        background: 'radial-gradient(ellipse at center, rgba(196,151,70,0.05) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <h2 style={{
        fontFamily: F.display, fontWeight: 800,
        fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.1,
        letterSpacing: '-0.03em', color: 'var(--text-primary)',
        marginBottom: 16, position: 'relative',
      }}>The Cycles Are Moving.</h2>
      <p style={{
        fontFamily: F.body, fontSize: 17, color: 'var(--text-secondary)',
        lineHeight: 1.5, marginBottom: 32, position: 'relative',
      }}>Start charting what others can't see.</p>
      <a href={APP_URL} target="_blank" rel="noopener noreferrer" style={{
        display: 'inline-block', textDecoration: 'none', position: 'relative',
        background: 'var(--gold)', color: '#0a0a0f',
        fontFamily: F.body, fontWeight: 600, fontSize: 16,
        padding: '16px 36px', borderRadius: 14,
        boxShadow: '0 4px 20px rgba(196,151,70,0.25), inset 0 1px 0 rgba(255,255,255,0.15)',
        transition: 'all 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(196,151,70,0.35), inset 0 1px 0 rgba(255,255,255,0.15)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.filter = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(196,151,70,0.25), inset 0 1px 0 rgba(255,255,255,0.15)'; }}
      >Open Free Chart {'\u2192'}</a>
    </section>
  );
}
