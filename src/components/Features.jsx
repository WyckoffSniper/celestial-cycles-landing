import { F } from '../tokens';

/* ===================================================
   TIER BADGE
   =================================================== */
const TIER_COLORS = {
  free: { bg: 'rgba(255,255,255,0.06)', color: 'var(--text-secondary)', border: 'rgba(255,255,255,0.06)' },
  pro:  { bg: 'rgba(196,151,70,0.12)', color: 'var(--gold)', border: 'rgba(196,151,70,0.2)' },
  elite:{ bg: 'rgba(171,71,188,0.12)', color: '#CE93D8', border: 'rgba(171,71,188,0.2)' },
};

function TierBadge({ tier }) {
  const c = TIER_COLORS[tier] || TIER_COLORS.free;
  return (
    <span style={{
      display: 'inline-block', fontSize: 9, fontWeight: 700,
      letterSpacing: '0.1em', textTransform: 'uppercase',
      padding: '3px 8px', borderRadius: 100,
      background: c.bg, color: c.color, border: `1px solid ${c.border}`,
      lineHeight: 1.4, flexShrink: 0,
    }}>{tier}</span>
  );
}

/* ===================================================
   FEATURE CARD
   =================================================== */
function FeatureCard({ name, tier, desc, delay = 0 }) {
  return (
    <div
      className="feature-card"
      style={{
        background: 'var(--bg-card)', backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)',
        padding: '20px 22px', cursor: 'default',
        transition: 'all 0.3s var(--ease-spring)',
        opacity: 0, animation: `fadeSlideIn 0.5s var(--ease-smooth) ${delay}ms forwards`,
        display: 'flex', flexDirection: 'column', gap: 8,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'var(--bg-card-hover)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.3)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'var(--bg-card)';
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <div style={{
          fontFamily: F.display, fontWeight: 700, fontSize: 15,
          color: 'var(--text-primary)', letterSpacing: '-0.01em',
        }}>{name}</div>
        <TierBadge tier={tier} />
      </div>
      <div style={{
        fontFamily: F.body, fontSize: 13, lineHeight: 1.55,
        color: 'var(--text-secondary)',
      }}>{desc}</div>
    </div>
  );
}

/* ===================================================
   CATEGORY SECTION
   =================================================== */
function CategoryGroup({ label, overlays, baseDelay }) {
  return (
    <div style={{ marginBottom: 56 }}>
      <h3 style={{
        fontFamily: F.display, fontWeight: 700, fontSize: 18,
        color: 'var(--text-primary)', letterSpacing: '-0.01em',
        marginBottom: 20, paddingBottom: 12,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>{label}</h3>
      <div className="feature-grid" style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 14,
      }}>
        {overlays.map((o, i) => (
          <FeatureCard
            key={o.name}
            name={o.name}
            tier={o.tier}
            desc={o.desc}
            delay={baseDelay + i * 50}
          />
        ))}
      </div>
    </div>
  );
}

/* ===================================================
   FEATURE DATA — sourced from featureGate.js tiers
   and IndicatorsPage.jsx descriptions
   =================================================== */
const CATEGORIES = [
  {
    label: 'Astronomical Cycles',
    overlays: [
      { name: 'Moon phases', tier: 'free', desc: 'New, full, and quarter moon dates marked on the chart. Lunar cycles (~29.5 days) are one of the oldest timing tools.' },
      { name: 'Eclipse markers', tier: 'pro', desc: 'Solar and lunar eclipse dates with type labels. Eclipse seasons (~every 6 months) align with major cycle turning points.' },
      { name: 'Mercury retrograde', tier: 'pro', desc: 'Mercury retrograde periods shaded on the chart with pre/post shadow zones. Three times per year for ~21 days.' },
      { name: 'Venus retrograde', tier: 'pro', desc: 'Venus retrograde periods marked on chart. Occurs roughly every 18 months for ~40 days, affecting financial sentiment cycles.' },
      { name: 'Lunar node cycle', tier: 'pro', desc: 'North/south lunar node positions tracking the 18.6-year nodal cycle with McWhirter labels.' },
      { name: 'Mercury cazimi', tier: 'elite', desc: 'Exact Mercury-Sun conjunction dates. Cazimi moments mark the midpoint of each retrograde and direct cycle.' },
      { name: 'Mars trigger', tier: 'elite', desc: 'Mars aspects to outer planets \u2014 historically correlated with sharp, fast market moves and volatility spikes.' },
      { name: 'Planetary aspects', tier: 'elite', desc: 'Major planetary conjunctions, oppositions, and square aspects including Jupiter-Saturn, Saturn-Pluto, and Mars trigger cycles.' },
      { name: 'Planet ingresses', tier: 'elite', desc: 'Dates when outer planets change zodiacal signs, marking shifts in long-duration market themes.' },
      { name: 'Seasonal dates', tier: 'free', desc: 'Equinoxes, solstices, and cross-quarter days (Imbolc, Beltane, Lammas, Samhain) marked on chart.' },
    ],
  },
  {
    label: 'Cycles & Timing',
    overlays: [
      { name: 'Hurst cycles', tier: 'free', desc: 'Nested semicircular time cycle arcs with automatic left/right translation detection.' },
      { name: 'Fib time zones', tier: 'pro', desc: 'Fibonacci-based time projections from anchor points (1, 2, 3, 5, 8, 13, 21, 34, 55, 89 bars).' },
      { name: 'Fib time extensions', tier: 'pro', desc: 'Time-based Fibonacci extensions projecting future cycle boundaries from two anchor points.' },
      { name: 'Gann countdown', tier: 'pro', desc: "Gann's timing system \u2014 day counts (T+7 through T+360) from swing points with cluster zone detection." },
      { name: 'Gann seasonal dates', tier: 'pro', desc: "Gann's 8-part year division \u2014 degree markers (45\u00b0 through 360\u00b0) from Winter Solstice." },
      { name: 'Gann anniversary dates', tier: 'pro', desc: 'Major BTC pivot anniversaries \u2014 tracks what happens 1, 2, 3+ years from significant highs and lows.' },
      { name: 'Gann decade pattern', tier: 'elite', desc: "Gann's decade cycle \u2014 each year in a 10-year period has characteristic behavior." },
      { name: 'Gann angle fan', tier: 'elite', desc: 'All 9 Gann angle lines (8\u00d71 through 1\u00d78) from anchored pivots with ATR-calibrated 1\u00d71 slope.' },
      { name: 'Square of Nine', tier: 'elite', desc: "Gann's SQ9 \u2014 spiral-based price levels at cardinal and ordinal crosses." },
      { name: 'Price-to-time projection', tier: 'elite', desc: 'Converts pivot prices into time projections \u2014 "when time and price square, a change is due."' },
      { name: 'Gann scoring', tier: 'elite', desc: 'Composite Gann confluence score combining time cycles, price geometry, and seasonal alignment.' },
      { name: 'Benner cycle', tier: 'pro', desc: "Samuel Benner's 1875 cycle theory \u2014 panic/good/hard times repeating in predictable patterns." },
      { name: 'BTC halvings', tier: 'pro', desc: 'Bitcoin block reward halving dates \u2014 supply shock events every ~4 years.' },
    ],
  },
  {
    label: 'Macro',
    overlays: [
      { name: 'Liquidity cycle', tier: 'pro', desc: '~42-month global liquidity expansion/contraction sine wave overlay.' },
      { name: 'Puetz crash window', tier: 'elite', desc: 'Crash risk zones \u2014 periods where a full moon falls within 42 days of a solar eclipse.' },
      { name: 'FOMC dates', tier: 'pro', desc: 'Federal Open Market Committee meeting dates. The single biggest macro catalyst for all financial markets.' },
      { name: 'Triple witching', tier: 'pro', desc: 'Quarterly options and futures expiration on the third Friday of March, June, September, and December.' },
    ],
  },
  {
    label: 'Space Weather',
    overlays: [
      { name: 'Solar cycle ribbon', tier: 'free', desc: 'The ~11-year solar cycle rendered as a background ribbon showing solar activity intensity.' },
      { name: 'Solar flares', tier: 'pro', desc: 'Major solar flare events (M and X class) marked on chart with intensity indicators.' },
      { name: 'Geomagnetic storms', tier: 'pro', desc: 'Significant geomagnetic storm events (Kp index) plotted on chart.' },
      { name: 'CME windows', tier: 'elite', desc: 'Coronal mass ejection impact windows \u2014 predicted arrival times after major solar events.' },
    ],
  },
  {
    label: 'Tools & Intelligence',
    overlays: [
      { name: 'Cosmic score', tier: 'pro', desc: 'Composite 0\u2013100 confluence score combining all active cycle data into a single reading.' },
      { name: 'Convergence card', tier: 'free', desc: 'At-a-glance panel summarizing which overlays are currently signaling and in which direction.' },
      { name: 'Intelligence Hub', tier: 'pro', desc: '6-tab analysis panel: Upcoming events, Performance history, AI narrative, Signal alerts, Gann insights, and cycle timing.' },
      { name: 'Observatory', tier: 'free', desc: 'Interactive 3D solar system visualization showing real-time planetary positions and aspect geometry.' },
      { name: 'Backtest Hub', tier: 'elite', desc: 'Historical signal backtesting \u2014 tests every celestial signal against BTC price history with win rates and P&L.' },
      { name: 'Research Cockpit', tier: 'pro', desc: 'Multi-panel research dashboard combining cycle calendar, upcoming events, and historical pattern analysis.' },
      { name: 'Celestial alerts', tier: 'elite', desc: 'Telegram notifications for upcoming celestial events \u2014 eclipses, retrogrades, aspects, Gann dates, and score breakouts.' },
      { name: 'AI Cycle Analyst', tier: 'elite', desc: 'AI-powered analysis combining all active cycle data with current price action to generate actionable insights.' },
      { name: 'Drawing tools', tier: 'pro', desc: 'Manual chart annotations \u2014 Gann Fan, trendlines, Fibonacci retracements, horizontal levels, and text labels.' },
      { name: 'Screenshot & export', tier: 'free', desc: 'Export your chart as a branded image to share your analysis on social media.' },
    ],
  },
];

/* ===================================================
   FEATURES SECTION
   =================================================== */
export default function Features() {
  const totalOverlays = CATEGORIES.reduce((sum, cat) => sum + cat.overlays.length, 0);

  return (
    <section className="features-section" id="features" style={{ padding: '120px 24px 80px' }}>
      <div style={{ textAlign: 'center', marginBottom: 64, maxWidth: 1000, margin: '0 auto 64px' }}>
        <div style={{
          fontSize: 12, fontWeight: 500, letterSpacing: '0.15em',
          textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16,
        }}>OVERLAY LAYERS</div>
        <h2 style={{
          fontFamily: F.display, fontWeight: 800,
          fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.1,
          letterSpacing: '-0.03em', color: 'var(--text-primary)',
          marginBottom: 12,
        }}>{totalOverlays} Cycle Overlays, One Chart</h2>
        <p style={{
          fontFamily: F.body, fontSize: 15, lineHeight: 1.6,
          color: 'var(--text-secondary)', maxWidth: 560, margin: '0 auto',
        }}>
          Astronomical events, financial timing frameworks, macro catalysts, space weather,
          and AI-powered confluence analysis &mdash; all layered on live crypto charts.
        </p>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        {CATEGORIES.map((cat, ci) => (
          <CategoryGroup
            key={cat.label}
            label={cat.label}
            overlays={cat.overlays}
            baseDelay={600 + ci * 150}
          />
        ))}
      </div>
    </section>
  );
}
