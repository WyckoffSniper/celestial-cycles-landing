import { F, APP_URL } from '../tokens';

export default function Convergence() {
  return (
    <section style={{ padding: '0 24px' }}>
      <div className="convergence-banner" style={{
        maxWidth: 800, margin: '80px auto', padding: '40px 48px',
        background: 'var(--bg-card)', backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--border-gold)', borderRadius: 'var(--radius-xl)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 0 40px rgba(196,151,70,0.04)',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
        opacity: 0, animation: 'fadeSlideIn 0.6s var(--ease-smooth) forwards',
      }}>
        {/* Gold shimmer line */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(196,151,70,0.4), transparent)',
        }} />

        {/* Badge */}
        <div style={{
          display: 'inline-block', padding: '5px 14px',
          fontSize: 10, fontWeight: 700, fontFamily: F.body,
          textTransform: 'uppercase', letterSpacing: '0.12em',
          background: 'var(--purple-dim)', color: 'var(--purple)',
          border: '1px solid rgba(139,126,200,0.2)', borderRadius: 100,
          marginBottom: 20,
        }}>2026 CONVERGENCE EVENT</div>

        <h2 style={{
          fontFamily: F.display, fontWeight: 800,
          fontSize: 'clamp(24px, 3.5vw, 36px)', lineHeight: 1.15,
          letterSpacing: '-0.02em', color: 'var(--text-primary)',
          marginBottom: 12,
        }}>Six Major Cycles. Aligning Simultaneously.</h2>

        <p style={{
          fontFamily: F.body, fontSize: 15, lineHeight: 1.6,
          color: 'var(--text-secondary)', maxWidth: 480, margin: '0 auto 24px',
        }}>
          Hurst trough, Benner panic year, Saturn{'\u2013'}Pluto square, lunar node shift,
          eclipse cluster, and Gann anniversary {'\u2014'} all converging in early 2026. Are you positioned?
        </p>

        <a href={APP_URL} target="_blank" rel="noopener noreferrer" style={{
          display: 'inline-block', background: 'var(--gold)', color: '#0a0a0f',
          fontFamily: F.body, fontWeight: 600, padding: '12px 28px',
          borderRadius: 12, fontSize: 14, textDecoration: 'none',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.filter = 'brightness(1.1)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.filter = 'none'; }}
        >
          Open Free Chart
        </a>
      </div>
    </section>
  );
}
