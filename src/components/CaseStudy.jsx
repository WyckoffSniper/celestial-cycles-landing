import { F, APP_URL } from '../tokens';

export default function CaseStudy({ onOpenLightbox }) {
  return (
    <section className="case-study-section" style={{
      padding: '120px 24px 80px', position: 'relative',
    }}>
      {/* Ambient glow behind card */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '120%', maxWidth: 1152, height: 300,
        background: 'radial-gradient(ellipse at center, rgba(196,151,70,0.05) 0%, transparent 65%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />

      <div className="case-study-card" style={{
        maxWidth: 960, margin: '0 auto', position: 'relative',
        background: 'var(--bg-card)', backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)',
        boxShadow: '0 16px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
        padding: 48, overflow: 'hidden',
        opacity: 0, animation: 'fadeSlideIn 0.7s var(--ease-smooth) 0.6s forwards',
      }}>
        {/* Badge */}
        <div style={{
          display: 'inline-block', padding: '5px 14px',
          fontSize: 10, fontWeight: 700, fontFamily: F.body,
          textTransform: 'uppercase', letterSpacing: '0.12em',
          background: 'rgba(196,151,70,0.15)', color: 'var(--gold)',
          border: '1px solid rgba(196,151,70,0.2)', borderRadius: 100,
          marginBottom: 24,
        }}>LIVE CASE STUDY</div>

        {/* Score headline */}
        <h2 style={{
          fontFamily: F.display, fontWeight: 800,
          fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 1.05,
          letterSpacing: '-0.03em', color: 'var(--gold)',
          marginBottom: 8,
        }}>10.0 Cosmic Score.</h2>

        {/* Subtitle */}
        <p style={{
          fontFamily: F.display, fontWeight: 700,
          fontSize: 'clamp(20px, 3vw, 28px)', lineHeight: 1.2,
          letterSpacing: '-0.02em', color: 'var(--text-primary)',
          marginBottom: 16,
        }}>Two weeks later, historic crash.</p>

        {/* Description */}
        <p style={{
          fontFamily: F.body, fontSize: 15, lineHeight: 1.6,
          color: 'var(--text-secondary)', maxWidth: 520,
          marginBottom: 32,
        }}>
          September 21, 2025. Every cycle framework aligned simultaneously.
          The score hit maximum. BTC dropped 45% in the weeks that followed.
        </p>

        {/* Chart screenshot */}
        <div style={{ position: 'relative', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}>
          <img
            src="/cosmic-score-proof.png"
            alt="Cosmic Confluence Score hitting 10.0 before the September 2025 BTC crash"
            onClick={() => onOpenLightbox('/cosmic-score-proof.png', 'Cosmic Score 10.0 — September 2025')}
            style={{ width: '100%', display: 'block', cursor: 'pointer' }}
          />
          {/* Gold gradient fade at bottom */}
          <div aria-hidden="true" style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 60,
            background: 'linear-gradient(to top, rgba(196,151,70,0.04) 0%, transparent 100%)',
            pointerEvents: 'none',
          }} />
        </div>
      </div>
    </section>
  );
}
