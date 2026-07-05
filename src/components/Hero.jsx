import { F, APP_URL } from '../tokens';

export default function Hero() {
  return (
    <section id="hero" style={{
      minHeight: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: '80px 24px 60px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Ambient glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 500,
        background: 'radial-gradient(ellipse at center, rgba(196,151,70,0.04) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div className="hero-anim hero-anim-0" style={{
        fontFamily: F.body, fontSize: 12, fontWeight: 500,
        letterSpacing: '0.15em', textTransform: 'uppercase',
        color: 'var(--gold)', marginBottom: 16,
      }}>40+ Cycle Overlays &middot; AI-Powered Analysis</div>

      <h1 className="hero-anim hero-anim-1" style={{
        fontFamily: F.display, fontWeight: 800,
        fontSize: 'clamp(36px, 6vw, 64px)', lineHeight: 1.05,
        letterSpacing: '-0.03em', color: 'var(--text-primary)',
        marginBottom: 20, maxWidth: 720,
      }}>
        See What the Chart Won't Show You
      </h1>

      <p className="hero-anim hero-anim-2" style={{
        fontFamily: F.body, fontSize: 17, lineHeight: 1.6,
        color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto 32px',
      }}>
        Moon phases, retrogrades, eclipses, Hurst arcs, Gann countdowns, FOMC dates,
        solar flares, planetary alignments &mdash; plus an Intelligence Hub with AI
        confluence narration. One tool, every cycle framework, on live crypto charts.
      </p>

      <div className="hero-anim hero-anim-3" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <a href={APP_URL} style={{
          fontFamily: F.body, fontSize: 15, fontWeight: 600,
          color: '#0a0a0f', textDecoration: 'none',
          background: 'var(--gold)', borderRadius: 'var(--radius-sm)',
          padding: '14px 32px',
          boxShadow: '0 4px 16px rgba(196,151,70,0.2), inset 0 1px 0 rgba(255,255,255,0.15)',
          transition: 'background var(--duration-fast) ease, transform var(--duration-fast) ease, box-shadow var(--duration-fast) ease',
        }}
        onMouseEnter={e => { e.target.style.background = '#d4a44e'; e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 6px 24px rgba(196,151,70,0.3)'; }}
        onMouseLeave={e => { e.target.style.background = 'var(--gold)'; e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 16px rgba(196,151,70,0.2), inset 0 1px 0 rgba(255,255,255,0.15)'; }}
        >Open Free Chart</a>
        <a href="#pricing" style={{
          fontFamily: F.body, fontSize: 15, fontWeight: 500,
          color: 'var(--text-secondary)', textDecoration: 'none',
          background: 'transparent', border: '1px solid var(--border-hover)',
          borderRadius: 'var(--radius-sm)', padding: '14px 28px',
          transition: 'background var(--duration-fast) ease, color var(--duration-fast) ease, border-color var(--duration-fast) ease',
        }}
        onMouseEnter={e => { e.target.style.background = 'rgba(255,255,255,0.04)'; e.target.style.color = 'var(--text-primary)'; e.target.style.borderColor = 'rgba(255,255,255,0.18)'; }}
        onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--text-secondary)'; e.target.style.borderColor = 'var(--border-hover)'; }}
        >See Plans</a>
      </div>

      <div className="hero-anim hero-anim-4" style={{
        maxWidth: 900, margin: '48px auto 0', position: 'relative',
      }}>
        <div style={{
          borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)',
          overflow: 'hidden',
        }}>
          <img
            src="/hero-chart.png"
            alt="Cosmic Charts live chart with moon phases, Hurst arcs, FOMC dates, and Mercury Rx overlays"
            style={{ width: '100%', display: 'block' }}
          />
        </div>
        {/* Gold glow beneath screenshot */}
        <div aria-hidden="true" style={{
          position: 'absolute', bottom: -100, left: '10%', width: '80%', height: 200,
          background: 'radial-gradient(ellipse at center, rgba(196,151,70,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
      </div>

      <div className="hero-anim hero-anim-5" style={{
        marginTop: 24, fontSize: 11, letterSpacing: '0.12em',
        textTransform: 'uppercase', color: 'var(--text-tertiary)',
      }}>
        Trusted by cycle traders worldwide &middot; No API keys required &middot; Loads in seconds
      </div>
    </section>
  );
}
