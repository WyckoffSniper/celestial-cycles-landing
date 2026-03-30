import { F, APP_URL } from '../tokens';

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
        maxWidth: 1000, margin: '0 auto',
      }}>
        <PricingCard
          name="Free"
          price="$0"
          features={[
            'Live crypto charts (all pairs)',
            'Moon phase overlays',
            'Hurst cycle arcs',
            'Seasonal date markers',
            'Unlimited timeframes',
          ]}
          ctaLabel="Start Free"
          delay={0}
        />
        <PricingCard
          name="Pro"
          price="$9.95"
          period="mo"
          popular
          features={[
            'Everything in Free',
            'Mercury & Venus Retrograde',
            'Eclipse markers with glow',
            'Gann countdown system',
            'Benner cycle bands',
            'Lunar node ribbon',
            'Cosmic confluence score',
          ]}
          ctaLabel="Upgrade to Pro"
          ctaHref={`${APP_URL}?upgrade=pro`}
          delay={100}
        />
        <PricingCard
          name="Elite"
          price="$19.95"
          period="mo"
          features={[
            'Everything in Pro',
            'Jupiter-Saturn conjunctions',
            'Saturn-Pluto hard aspects',
            'Mars trigger overlay',
            'Planet sign ingresses',
            'Screenshot export',
            'Priority support',
          ]}
          ctaLabel="Go Elite"
          ctaHref={`${APP_URL}?upgrade=elite`}
          delay={200}
        />
      </div>
    </section>
  );
}
