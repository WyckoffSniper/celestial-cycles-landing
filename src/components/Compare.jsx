import { F } from '../tokens';

/* ===================================================
   COMPARISON TABLE
   =================================================== */
function ComparisonTable() {
  const rows = [
    ['Moon Phase Overlays',           true,  false],
    ['Mercury & Venus Retrograde',    true,  false],
    ['Eclipse Markers',               true,  false],
    ['Hurst Cycle Arcs',              true,  false],
    ['Gann Countdown System',         true,  false],
    ['Benner Cycle Bands',            true,  false],
    ['Lunar Node Ribbon',             true,  false],
    ['Planetary Aspects & Ingresses', true,  false],
    ['FOMC Meeting Dates',            true,  false],
    ['Triple Witching Dates',         true,  false],
    ['Liquidity Cycle Wave',          true,  false],
    ['Puetz Crash Windows',           true,  false],
    ['Solar Flares & Geomagnetic',    true,  false],
    ['CME Impact Windows',            true,  false],
    ['AI Cycle Analyst',              true,  false],
    ['Cosmic Confluence Score',       true,  false],
    ['Multi-Framework Overlap',       true,  false],
    ['Standard Indicators (MA, RSI)', true,  true ],
    ['Custom Pine Script',            false, true ],
  ];

  const thStyle = {
    fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
    textTransform: 'uppercase', padding: '14px 24px',
  };

  return (
    <div style={{
      background: 'rgba(8,8,13,0.5)', border: '1px solid rgba(255,255,255,0.04)',
      borderRadius: 'var(--radius-lg)', overflow: 'hidden',
      maxWidth: 720, margin: '0 auto',
      boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)',
      opacity: 0, animation: 'fadeSlideIn 0.7s var(--ease-smooth) 0.2s forwards',
    }}>
      {/* Header */}
      <div className="compare-row" style={{
        display: 'grid', gridTemplateColumns: '1fr 140px 140px',
        background: 'rgba(255,255,255,0.02)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div style={{ ...thStyle, color: 'var(--text-tertiary)', textAlign: 'left' }}>Feature</div>
        <div style={{ ...thStyle, color: 'var(--gold)', textAlign: 'center' }}>Cosmic Charts</div>
        <div style={{ ...thStyle, color: 'var(--text-tertiary)', textAlign: 'center' }}>TradingView</div>
      </div>
      {/* Rows */}
      {rows.map(([feature, cc, tv], i) => (
        <div key={i} className="compare-row" style={{
          display: 'grid', gridTemplateColumns: '1fr 140px 140px',
          padding: '14px 24px', transition: 'background 0.2s',
          borderBottom: i < rows.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{feature}</div>
          <div style={{ textAlign: 'center', fontSize: 14, color: cc ? 'var(--gold)' : 'var(--danger)' }}>{cc ? '\u2713' : '\u2717'}</div>
          <div style={{ textAlign: 'center', fontSize: 14, color: tv ? 'var(--text-secondary)' : 'var(--danger)' }}>{tv ? '\u2713' : '\u2717'}</div>
        </div>
      ))}
    </div>
  );
}

/* ===================================================
   COMPARE SECTION
   =================================================== */
export default function Compare() {
  return (
    <section className="compare-section" id="compare" style={{ padding: '120px 24px 80px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{
          fontSize: 12, fontWeight: 500, letterSpacing: '0.15em',
          textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16,
        }}>HOW WE COMPARE</div>
        <h2 style={{
          fontFamily: F.display, fontWeight: 800,
          fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.1,
          letterSpacing: '-0.03em', color: 'var(--text-primary)',
          marginBottom: 12,
        }}>TradingView Shows Price. We Show Timing.</h2>
        <p style={{
          fontFamily: F.body, fontSize: 15, lineHeight: 1.6,
          color: 'var(--text-secondary)', maxWidth: 560, margin: '0 auto',
        }}>
          Standard charting platforms give you lagging indicators. Cosmic Charts gives you
          FOMC dates, triple witching, Puetz crash windows, AI confluence analysis, and 20+
          cycle frameworks that move ahead of price.
        </p>
      </div>
      <ComparisonTable />
    </section>
  );
}
