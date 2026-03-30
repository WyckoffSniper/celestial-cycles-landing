import { F } from '../tokens';

/* ===================================================
   STEP CARD
   =================================================== */
function StepCard({ number, title, desc, delay = 0 }) {
  return (
    <div style={{
      flex: '1 1 220px', maxWidth: 280, textAlign: 'center',
      opacity: 0, animation: `fadeSlideIn 0.6s var(--ease-smooth) ${delay}ms forwards`,
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: '50%', margin: '0 auto 20px',
        background: 'var(--gold-dim)', border: '1px solid rgba(196,151,70,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: F.display, fontSize: 18, fontWeight: 700, color: 'var(--gold)',
      }}>{number}</div>
      <div style={{
        fontFamily: F.display, fontWeight: 700, fontSize: 17,
        color: 'var(--text-primary)', letterSpacing: '-0.01em', marginBottom: 8,
      }}>{title}</div>
      <div style={{
        fontFamily: F.body, fontSize: 14, lineHeight: 1.6,
        color: 'var(--text-secondary)', maxWidth: 240, margin: '0 auto',
      }}>{desc}</div>
    </div>
  );
}

/* ===================================================
   HOW IT WORKS SECTION
   =================================================== */
export default function HowItWorks() {
  return (
    <section className="steps-section" style={{ padding: '120px 24px 80px' }}>
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <div style={{
          fontSize: 12, fontWeight: 500, letterSpacing: '0.15em',
          textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16,
        }}>GETTING STARTED</div>
        <h2 style={{
          fontFamily: F.display, fontWeight: 800,
          fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.1,
          letterSpacing: '-0.03em', color: 'var(--text-primary)',
          marginBottom: 12,
        }}>Three Clicks to Cycle Analysis</h2>
        <p style={{
          fontFamily: F.body, fontSize: 15, lineHeight: 1.6,
          color: 'var(--text-secondary)',
        }}>No downloads, no API keys, no account required for the free tier.</p>
      </div>

      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 32,
        justifyContent: 'center', maxWidth: 900, margin: '0 auto',
        position: 'relative',
      }}>
        {/* Connecting dashed line (desktop only) */}
        <div className="steps-line" aria-hidden="true" style={{
          position: 'absolute', top: 24, left: '20%', right: '20%',
          borderTop: '1px dashed rgba(255,255,255,0.06)',
          pointerEvents: 'none',
        }} />
        <StepCard number="1" title="Open the Chart" desc="Load any crypto pair on any timeframe. Live data from Bybit and Binance." delay={0} />
        <StepCard number="2" title="Toggle Overlays" desc="Enable moon phases, retrogrades, Hurst arcs, Gann countdowns — any combination." delay={100} />
        <StepCard number="3" title="Spot Confluences" desc="The Cosmic Score highlights where multiple frameworks converge. Time your entries with precision." delay={200} />
      </div>
    </section>
  );
}
