import { F, APP_URL } from '../tokens';

/* ===================================================
   TIER FEATURE DATA — from featureGate.js
   =================================================== */
const PLAN_FEATURES = {
  free: [
    'Live crypto charts (all pairs)',
    'Moon phase overlays',
    'Hurst cycle arcs',
    'Seasonal dates & cross-quarter days',
    'Solar cycle ribbon',
    'Observatory (3D solar system)',
    'Convergence card',
    'Screenshot export',
    "What's happening now",
    'Unlimited timeframes',
  ],
  pro: [
    'Everything in Free',
    'Eclipse markers with glow',
    'Mercury & Venus retrograde',
    'Lunar node cycle ribbon',
    'Gann countdown + seasonal dates',
    'Gann anniversary dates',
    'Fib time zones & extensions',
    'Benner cycle bands',
    'BTC halving markers',
    'FOMC dates & triple witching',
    'Liquidity cycle wave',
    'Cosmic confluence score',
    'Intelligence Hub (6 tabs)',
    'Research Cockpit',
    'Drawing tools (Gann Fan, Fib, lines)',
    'Solar flares & geomagnetic storms',
  ],
  elite: [
    'Everything in Pro',
    'Planetary aspects (Jupiter-Saturn, Saturn-Pluto, Mars)',
    'Planet ingresses & Mars trigger',
    'Mercury cazimi',
    'Gann angle fan (all 9 angles)',
    'Square of Nine & Price-to-Time',
    'Gann decade pattern & scoring',
    'Backtest Hub (historical win rates)',
    'Celestial alerts (Telegram)',
    'Puetz crash windows',
    'CME impact windows',
    'AI Cycle Analyst',
    'Priority support',
  ],
};

/* Feature comparison rows grouped by category for the table */
const COMPARISON_ROWS = [
  { category: 'Astronomical Cycles', features: [
    { name: 'Moon phases', free: true, pro: true, elite: true },
    { name: 'Seasonal dates', free: true, pro: true, elite: true },
    { name: 'Eclipse markers', free: false, pro: true, elite: true },
    { name: 'Mercury retrograde', free: false, pro: true, elite: true },
    { name: 'Venus retrograde', free: false, pro: true, elite: true },
    { name: 'Lunar node cycle', free: false, pro: true, elite: true },
    { name: 'Mercury cazimi', free: false, pro: false, elite: true },
    { name: 'Mars trigger', free: false, pro: false, elite: true },
    { name: 'Planetary aspects', free: false, pro: false, elite: true },
    { name: 'Planet ingresses', free: false, pro: false, elite: true },
  ]},
  { category: 'Cycles & Timing', features: [
    { name: 'Hurst cycles', free: true, pro: true, elite: true },
    { name: 'Fib time zones & extensions', free: false, pro: true, elite: true },
    { name: 'Gann countdown', free: false, pro: true, elite: true },
    { name: 'Gann seasonal dates', free: false, pro: true, elite: true },
    { name: 'Gann anniversary dates', free: false, pro: true, elite: true },
    { name: 'Gann decade pattern', free: false, pro: false, elite: true },
    { name: 'Gann angle fan (9 angles)', free: false, pro: false, elite: true },
    { name: 'Square of Nine', free: false, pro: false, elite: true },
    { name: 'Price-to-time projection', free: false, pro: false, elite: true },
    { name: 'Gann scoring', free: false, pro: false, elite: true },
    { name: 'Benner cycle', free: false, pro: true, elite: true },
    { name: 'BTC halvings', free: false, pro: true, elite: true },
  ]},
  { category: 'Macro', features: [
    { name: 'FOMC dates', free: false, pro: true, elite: true },
    { name: 'Triple witching', free: false, pro: true, elite: true },
    { name: 'Liquidity cycle', free: false, pro: true, elite: true },
    { name: 'Puetz crash window', free: false, pro: false, elite: true },
  ]},
  { category: 'Space Weather', features: [
    { name: 'Solar cycle ribbon', free: true, pro: true, elite: true },
    { name: 'Solar flares', free: false, pro: true, elite: true },
    { name: 'Geomagnetic storms', free: false, pro: true, elite: true },
    { name: 'CME windows', free: false, pro: false, elite: true },
  ]},
  { category: 'Tools & Intelligence', features: [
    { name: 'Convergence card', free: true, pro: true, elite: true },
    { name: 'Observatory (3D)', free: true, pro: true, elite: true },
    { name: 'Screenshot & export', free: true, pro: true, elite: true },
    { name: 'Cosmic score', free: false, pro: true, elite: true },
    { name: 'Intelligence Hub', free: false, pro: true, elite: true },
    { name: 'Research Cockpit', free: false, pro: true, elite: true },
    { name: 'Drawing tools', free: false, pro: true, elite: true },
    { name: 'Backtest Hub', free: false, pro: false, elite: true },
    { name: 'Celestial alerts (Telegram)', free: false, pro: false, elite: true },
    { name: 'AI Cycle Analyst', free: false, pro: false, elite: true },
  ]},
];

/* ===================================================
   PRICING CARD
   =================================================== */
function PricingCard({ name, price, period, features, popular, ctaLabel, ctaHref, delay = 0 }) {
  const checkColor = popular || name === 'Elite' ? 'var(--gold)' : 'var(--text-tertiary)';

  return (
    <div style={{
      background: 'var(--bg-card)', backdropFilter: 'var(--glass-blur)',
      WebkitBackdropFilter: 'var(--glass-blur)',
      border: popular ? '1px solid var(--border-gold)' : '1px solid var(--border)',
      borderRadius: 'var(--radius-xl)', padding: 32,
      flex: '1 1 280px', maxWidth: 340, position: 'relative', overflow: 'hidden',
      boxShadow: popular ? '0 8px 32px rgba(0,0,0,0.3), 0 0 60px rgba(196,151,70,0.05)' : 'none',
      display: 'flex', flexDirection: 'column',
      opacity: 0, animation: `fadeSlideIn 0.6s var(--ease-smooth) ${delay}ms forwards`,
    }}>
      {/* Gold shimmer line (Pro only) */}
      {popular && <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(196,151,70,0.4), transparent)',
      }} />}

      {/* Most Popular badge (Pro only) */}
      {popular && <div style={{
        display: 'inline-block', padding: '4px 12px', marginBottom: 16,
        fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em',
        background: 'rgba(196,151,70,0.15)', color: 'var(--gold)',
        borderRadius: 100, border: '1px solid rgba(196,151,70,0.2)',
        alignSelf: 'flex-start',
      }}>Most Popular</div>}

      {/* Plan name + price */}
      <div style={{
        fontFamily: F.display, fontWeight: 700, fontSize: 20,
        color: 'var(--text-primary)', marginBottom: 8,
      }}>{name}</div>
      <div style={{ marginBottom: 28 }}>
        <span style={{
          fontFamily: F.display, fontWeight: 800, fontSize: 44,
          color: 'var(--text-primary)', letterSpacing: '-0.03em',
        }}>{price}</span>
        {period && <span style={{
          fontSize: 14, color: 'var(--text-tertiary)', fontWeight: 400, marginLeft: 4,
        }}>/{period}</span>}
      </div>

      {/* Features list */}
      <ul style={{ listStyle: 'none', marginBottom: 0, flex: 1 }}>
        {features.map((f, i) => (
          <li key={i} style={{
            fontFamily: F.body, fontSize: 14, color: 'var(--text-secondary)',
            padding: '9px 0', display: 'flex', alignItems: 'center', gap: 8,
            borderBottom: i < features.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
          }}>
            <span style={{ color: checkColor }}>{'\u2713'}</span>
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      {popular ? (
        /* Spinning gold ring CTA for Pro */
        <a href={ctaHref || APP_URL} style={{ textDecoration: 'none', display: 'block', marginTop: 28 }}>
          <div style={{
            position: 'relative', width: '100%', height: 52,
            borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(196,151,70,0.3)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              width: '300%', height: '300%',
              background: `conic-gradient(
                from 0deg,
                #533517 0%, #8b6a2f 8%, #c49746 16%, #feeaa5 24%,
                #c49746 30%, #ffffff 33%, #ffc0cb 34.5%, #a8c8ff 36%,
                #c49746 37.5%, #8b6a2f 42%, #533517 50%,
                #8b6a2f 58%, #c49746 66%, #feeaa5 74%,
                #c49746 80%, #ffffff 83%, #ffc0cb 84.5%, #a8c8ff 86%,
                #c49746 87.5%, #8b6a2f 92%, #533517 100%
              )`,
              animation: 'spinRing 4.5s linear infinite',
            }} />
            <div style={{
              position: 'absolute', inset: 2, borderRadius: 12,
              background: 'rgba(14,14,22,0.92)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{
                fontSize: 15, fontWeight: 600, fontFamily: F.body,
                color: '#feeaa5', letterSpacing: '0.01em',
              }}>{ctaLabel}</span>
            </div>
          </div>
        </a>
      ) : (
        /* Ghost button for Free and Elite */
        <a href={ctaHref || APP_URL} className="pricing-ghost-btn" style={{
          display: 'block', textAlign: 'center', textDecoration: 'none',
          marginTop: 28, background: 'transparent',
          border: '1px solid var(--border-hover)', borderRadius: 14,
          padding: 14, fontFamily: F.body, fontSize: 15, fontWeight: 500,
          color: 'var(--text-secondary)', transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
        >{ctaLabel}</a>
      )}
    </div>
  );
}

/* ===================================================
   COMPARISON TABLE
   =================================================== */
function ComparisonTable() {
  const thStyle = {
    fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
    textTransform: 'uppercase', padding: '14px 20px',
  };

  return (
    <div style={{
      background: 'rgba(8,8,13,0.5)', border: '1px solid rgba(255,255,255,0.04)',
      borderRadius: 'var(--radius-lg)', overflow: 'hidden',
      maxWidth: 800, margin: '48px auto 0',
      boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)',
      opacity: 0, animation: 'fadeSlideIn 0.7s var(--ease-smooth) 0.4s forwards',
    }}>
      {/* Header */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 100px 100px 100px',
        background: 'rgba(255,255,255,0.02)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div style={{ ...thStyle, color: 'var(--text-tertiary)', textAlign: 'left' }}>Feature</div>
        <div style={{ ...thStyle, color: 'var(--text-secondary)', textAlign: 'center' }}>Free</div>
        <div style={{ ...thStyle, color: 'var(--gold)', textAlign: 'center' }}>Pro</div>
        <div style={{ ...thStyle, color: '#CE93D8', textAlign: 'center' }}>Elite</div>
      </div>
      {/* Rows by category */}
      {COMPARISON_ROWS.map((group) => (
        <div key={group.category}>
          {/* Category header */}
          <div style={{
            padding: '12px 20px', fontSize: 11, fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: 'var(--gold)', background: 'rgba(196,151,70,0.04)',
            borderBottom: '1px solid rgba(255,255,255,0.03)',
            borderTop: '1px solid rgba(255,255,255,0.03)',
          }}>{group.category}</div>
          {/* Feature rows */}
          {group.features.map((row, i) => (
            <div key={row.name} className="compare-row" style={{
              display: 'grid', gridTemplateColumns: '1fr 100px 100px 100px',
              padding: '12px 20px', transition: 'background 0.2s',
              borderBottom: i < group.features.length - 1 ? '1px solid rgba(255,255,255,0.02)' : 'none',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{row.name}</div>
              {[
                { plan: 'free',  checkColor: '#888' },
                { plan: 'pro',   checkColor: '#c8a84e' },
                { plan: 'elite', checkColor: '#5dcaa5' },
              ].map(({ plan, checkColor }) => (
                <div key={plan} style={{
                  textAlign: 'center', fontSize: 14,
                  color: row[plan] ? checkColor : 'rgba(255,255,255,0.15)',
                }}>{row[plan] ? '\u2713' : '\u2014'}</div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ===================================================
   PRICING SECTION
   =================================================== */
export default function Pricing() {
  return (
    <section className="pricing-section" id="pricing" style={{ padding: '120px 24px 80px' }}>
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <div style={{
          fontSize: 12, fontWeight: 500, letterSpacing: '0.15em',
          textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16,
        }}>PLANS</div>
        <h2 style={{
          fontFamily: F.display, fontWeight: 800,
          fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.1,
          letterSpacing: '-0.03em', color: 'var(--text-primary)',
          marginBottom: 12,
        }}>Choose Your Cycle Toolkit</h2>
        <p style={{
          fontFamily: F.body, fontSize: 15, lineHeight: 1.6,
          color: 'var(--text-secondary)',
        }}>Start free. Upgrade when you need deeper analysis.</p>
      </div>

      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 20,
        justifyContent: 'center', alignItems: 'stretch',
        maxWidth: 1080, margin: '0 auto',
      }}>
        <PricingCard
          name="Free"
          price="$0"
          features={PLAN_FEATURES.free}
          ctaLabel="Get Started Free"
          delay={0}
        />
        <PricingCard
          name="Pro"
          price="$9.95"
          period="mo"
          popular
          features={PLAN_FEATURES.pro}
          ctaLabel="Start Pro"
          ctaHref={`${APP_URL}?upgrade=pro`}
          delay={100}
        />
        <PricingCard
          name="Elite"
          price="$19.95"
          period="mo"
          features={PLAN_FEATURES.elite}
          ctaLabel="Go Elite"
          ctaHref={`${APP_URL}?upgrade=elite`}
          delay={200}
        />
      </div>

      {/* Full comparison table */}
      <ComparisonTable />
    </section>
  );
}
