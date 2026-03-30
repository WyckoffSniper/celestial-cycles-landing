import { F } from '../tokens';

/* ===================================================
   FEATURE CARD
   =================================================== */
function FeatureCard({ icon, title, desc, image, delay = 0 }) {
  return (
    <div
      className="feature-card"
      style={{
        background: 'var(--bg-card)', backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)',
        padding: 24, cursor: 'default',
        transition: 'all 0.3s var(--ease-spring)',
        opacity: 0, animation: `fadeSlideIn 0.5s var(--ease-smooth) ${delay}ms forwards`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'var(--bg-card-hover)';
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.3)';
        const img = e.currentTarget.querySelector('.feature-img');
        if (img) img.style.opacity = '0.9';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'var(--bg-card)';
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        const img = e.currentTarget.querySelector('.feature-img');
        if (img) img.style.opacity = '0.7';
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 14 }}>{icon}</div>
      <div style={{
        fontFamily: F.display, fontWeight: 700, fontSize: 17,
        color: 'var(--text-primary)', letterSpacing: '-0.01em', marginBottom: 8,
      }}>{title}</div>
      <div style={{
        fontFamily: F.body, fontSize: 13, lineHeight: 1.55,
        color: 'var(--text-secondary)',
      }}>{desc}</div>
      {image && (
        <img className="feature-img" src={image} alt={title} style={{
          width: '100%', display: 'block', marginTop: 16,
          borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)',
          opacity: 0.7, transition: 'opacity 0.3s',
        }} />
      )}
    </div>
  );
}

/* ===================================================
   FEATURES SECTION
   =================================================== */
export default function Features() {
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
        }}>Every Cycle Framework, One Chart</h2>
        <p style={{
          fontFamily: F.body, fontSize: 15, lineHeight: 1.6,
          color: 'var(--text-secondary)', maxWidth: 520, margin: '0 auto',
        }}>
          Toggle between 16 independent overlay layers. Each one adds a timing
          dimension that traditional charting misses.
        </p>
      </div>

      <div className="feature-grid" style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 16, maxWidth: 1000, margin: '0 auto',
      }}>
        <FeatureCard icon="&#127769;" title="Moon Phases" desc="New & full moon markers with supermoon highlighting. See lunar rhythm on every timeframe." image="/feature-moon.png" delay={800} />
        <FeatureCard icon="&#9791;" title="Mercury & Venus Rx" desc="Retrograde zones with pre/post shadow periods. Historically correlated with volatility spikes." image="/feature-mercury.png" delay={860} />
        <FeatureCard icon="&#127761;" title="Eclipse Windows" desc="Solar and lunar eclipse markers with glow effects. Major cycle turning points for crypto." image="/feature-eclipse.png" delay={920} />
        <FeatureCard icon="&#128260;" title="Hurst Cycle Arcs" desc="Three nested cycle periods (15/30/60 bar) with translation labels. See cycle troughs before they hit." image="/feature-hurst.png" delay={980} />
        <FeatureCard icon="&#9201;" title="Gann Countdown" desc="Custom anchor dates with T+7 through T+360 markers. Track time cycles from any pivot." image="/feature-gann.png" delay={1040} />
        <FeatureCard icon="&#128202;" title="Benner Cycle" desc="Phase ribbons and background bands. Classifies years as good, hard, or panic since 1875." image="/feature-benner.png" delay={1100} />
        <FeatureCard icon="&#127760;" title="Lunar Node Ribbon" desc="18.6-year nodal cycle with zodiac position, ingress markers, and McWhirter labels." image="/feature-lunar-node.png" delay={1160} />
        <FeatureCard icon="&#129680;" title="Planetary Conjunctions" desc="Jupiter-Saturn and Saturn-Pluto hard aspects. The longest-cycle timing framework in the toolkit." image="/feature-conjunctions.png" delay={1220} />
        <FeatureCard icon="&#11088;" title="Cosmic Confluence Score" desc="Real-time 0-10 score combining all active layers. Heat strip visualization shows density at a glance." image="/feature-cosmic-score.png" delay={1280} />
      </div>
    </section>
  );
}
