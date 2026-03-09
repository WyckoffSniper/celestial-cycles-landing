import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

/* ═══════════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════════ */
const C = {
  bg:        '#0a0c14',
  bgCard:    '#131722',
  bgPanel:   '#181B28',
  bgInput:   '#1C1F2E',
  bgEl:      '#2A2E39',
  border:    'rgba(42,46,57,0.8)',
  text:      '#D1D4DC',
  textSec:   '#787B86',
  textMuted: '#555',
  accent:    '#6366f1',
  accentLt:  '#A5B4FC',
  blue:      '#42A5F5',
  gold:      '#FFD54F',
  teal:      '#26C6A0',
  pink:      '#EC4899',
  green:     '#4CAF50',
  red:       '#EF5350',
  orange:    '#FFA726',
  purple:    '#AB47BC',
  white:     '#ffffff',
};

const F = {
  display: "'Syne', sans-serif",
  body:    "'DM Sans', sans-serif",
  mono:    "'JetBrains Mono', monospace",
};

const APP_URL = 'https://app.cosmiccharts.com';

/* ═══════════════════════════════════════════
   FILM GRAIN OVERLAY
   ═══════════════════════════════════════════ */
function FilmGrain() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundSize: '128px 128px',
        opacity: 0.03,
        pointerEvents: 'none',
        animation: 'grainMove 0.5s steps(6) infinite',
        zIndex: 9999,
        mixBlendMode: 'screen',
      }}
    />
  );
}


/* ═══════════════════════════════════════════
   MINI CHART (seeded deterministic SVG)
   ═══════════════════════════════════════════ */
function seededRandom(seed) {
  let s = seed;
  return () => { s = (s * 16807 + 0) % 2147483647; return s / 2147483647; };
}

function MiniChart({ width = 360, height = 120, seed = 42, overlayColor = C.blue }) {
  const rand = seededRandom(seed);
  const bars = 40;
  const barW = width / bars;
  const candles = [];
  let price = 50;

  for (let i = 0; i < bars; i++) {
    const change = (rand() - 0.48) * 6;
    const open = price;
    const close = price + change;
    const high = Math.max(open, close) + rand() * 3;
    const low = Math.min(open, close) - rand() * 3;
    candles.push({ o: open, c: close, h: high, l: low });
    price = close;
  }

  const allPrices = candles.flatMap(c => [c.h, c.l]);
  const minP = Math.min(...allPrices);
  const maxP = Math.max(...allPrices);
  const scaleY = (p) => height - ((p - minP) / (maxP - minP)) * height * 0.85 - height * 0.05;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      {candles.map((c, i) => {
        const x = i * barW + barW * 0.3;
        const w = barW * 0.4;
        const bull = c.c >= c.o;
        const color = bull ? C.teal : C.red;
        const bodyTop = scaleY(Math.max(c.o, c.c));
        const bodyBot = scaleY(Math.min(c.o, c.c));
        const wickX = x + w / 2;
        return (
          <g key={i}>
            <line x1={wickX} y1={scaleY(c.h)} x2={wickX} y2={scaleY(c.l)} stroke={color} strokeWidth={1} />
            <rect x={x} y={bodyTop} width={w} height={Math.max(1, bodyBot - bodyTop)} fill={color} rx={0.5} />
          </g>
        );
      })}
      {/* Overlay line */}
      <path
        d={candles.map((c, i) => `${i === 0 ? 'M' : 'L'}${i * barW + barW / 2},${scaleY((c.o + c.c) / 2 + (seededRandom(seed + i + 100)() - 0.5) * 4)}`).join(' ')}
        fill="none" stroke={overlayColor} strokeWidth={1.5} opacity={0.6}
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   HERO CHART CARD
   ═══════════════════════════════════════════ */
function HeroChartCard() {
  const overlays = [
    { key: 'moon', label: 'Moon Phases', color: C.gold },
    { key: 'rx', label: 'Mercury Rx', color: C.pink },
    { key: 'hurst', label: 'Hurst Arcs', color: C.textSec },
    { key: 'eclipse', label: 'Eclipses', color: C.orange },
  ];
  const [active, setActive] = useState({ moon: true, rx: false, hurst: true, eclipse: false });

  return (
    <div style={{
      background: C.bgCard, borderRadius: 12, border: `1px solid ${C.border}`,
      padding: '16px 16px 12px', maxWidth: 440, width: '100%',
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontFamily: F.mono, fontSize: '0.75rem', color: C.textSec }}>BTC/USDT &middot; Daily</span>
        <span style={{ fontFamily: F.mono, fontSize: '0.75rem', color: C.teal }}>+4.2%</span>
      </div>
      <MiniChart
        width={408}
        height={140}
        seed={active.moon ? 42 : active.eclipse ? 99 : 42}
        overlayColor={active.rx ? C.pink : active.hurst ? C.textSec : C.blue}
      />
      <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
        {overlays.map(o => (
          <button
            key={o.key}
            onClick={() => setActive(prev => ({ ...prev, [o.key]: !prev[o.key] }))}
            style={{
              background: active[o.key] ? o.color + '22' : 'transparent',
              border: `1px solid ${active[o.key] ? o.color : C.bgEl}`,
              borderRadius: 6, padding: '4px 10px',
              fontFamily: F.mono, fontSize: '0.65rem', color: active[o.key] ? o.color : C.textSec,
              cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            <span style={{
              display: 'inline-block', width: 6, height: 6, borderRadius: '50%',
              background: o.color, opacity: active[o.key] ? 1 : 0.3, marginRight: 5, verticalAlign: 'middle',
            }} />
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PRICING CARD
   ═══════════════════════════════════════════ */
function PricingCard({ name, price, period, features, accent, popular, ctaLabel, ctaHref }) {
  return (
    <div style={{
      background: C.bgCard, borderRadius: 14,
      border: popular ? `2px solid ${accent}` : `1px solid ${C.border}`,
      padding: '32px 28px', flex: '1 1 280px', maxWidth: 340,
      position: 'relative', transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
      cursor: 'default',
    }}
    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      {popular && (
        <div style={{
          position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
          background: `linear-gradient(135deg, ${accent}, ${C.purple})`,
          borderRadius: 20, padding: '3px 14px',
          fontFamily: F.body, fontSize: '0.7rem', fontWeight: 600, color: C.white,
          letterSpacing: '0.05em', textTransform: 'uppercase',
        }}>Most Popular</div>
      )}
      <div style={{ fontFamily: F.display, fontSize: '1.2rem', fontWeight: 700, color: C.text, marginBottom: 8 }}>{name}</div>
      <div style={{ marginBottom: 20 }}>
        <span style={{ fontFamily: F.display, fontSize: '2.4rem', fontWeight: 800, color: accent }}>{price}</span>
        {period && <span style={{ fontFamily: F.body, fontSize: '0.85rem', color: C.textSec, marginLeft: 4 }}>/{period}</span>}
      </div>
      <ul style={{ listStyle: 'none', marginBottom: 24 }}>
        {features.map((f, i) => (
          <li key={i} style={{
            fontFamily: F.body, fontSize: '0.85rem', color: C.text, padding: '6px 0',
            borderBottom: i < features.length - 1 ? `1px solid ${C.border}` : 'none',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ color: accent, fontSize: '0.9rem' }}>{'\u2713'}</span>
            {f}
          </li>
        ))}
      </ul>
      <a href={ctaHref || APP_URL} style={{
        display: 'block', textAlign: 'center', textDecoration: 'none',
        background: popular ? `linear-gradient(135deg, ${accent}, ${C.purple})` : 'transparent',
        border: popular ? 'none' : `1px solid ${accent}`,
        borderRadius: 8, padding: '12px 0',
        fontFamily: F.body, fontSize: '0.9rem', fontWeight: 600,
        color: popular ? C.white : accent,
        transition: 'opacity 0.2s',
      }}>{ctaLabel || 'Get Started'}</a>
    </div>
  );
}

/* ═══════════════════════════════════════════
   FEATURE CARD
   ═══════════════════════════════════════════ */
function FeatureCard({ icon, title, desc, color, image, onImageClick }) {
  return (
    <div style={{
      background: C.bgCard, borderRadius: 12, border: `1px solid ${C.border}`,
      padding: '28px 24px', flex: '1 1 260px', maxWidth: 320,
      transition: 'border-color 0.3s',
    }}
    onMouseEnter={e => e.currentTarget.style.borderColor = color}
    onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
    >
      <div style={{ fontSize: '1.8rem', marginBottom: 12 }}>{icon}</div>
      <div style={{ fontFamily: F.display, fontSize: '1.05rem', fontWeight: 700, color: C.text, marginBottom: 8 }}>{title}</div>
      <div style={{ fontFamily: F.body, fontSize: '0.85rem', color: C.textSec, lineHeight: 1.6 }}>{desc}</div>
      {image && (
        <div
          onClick={() => onImageClick && onImageClick(image, title)}
          style={{ marginTop: 16, cursor: 'pointer', position: 'relative' }}
        >
          <img src={image} alt={title} style={{
            width: '100%', height: 140, objectFit: 'cover', borderRadius: 6, display: 'block',
          }} />
          <div style={{
            position: 'absolute', bottom: 6, right: 6,
            fontFamily: F.mono, fontSize: '0.6rem', color: C.textSec,
            background: 'rgba(10,12,20,0.7)', borderRadius: 4, padding: '2px 6px',
          }}>{'\uD83D\uDD0D'} click to expand</div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   FAQ ACCORDION ITEM
   ═══════════════════════════════════════════ */
function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      borderBottom: `1px solid ${C.border}`,
    }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '18px 0', textAlign: 'left',
        }}
      >
        <span style={{
          fontFamily: F.display, fontSize: '1rem', fontWeight: 600, color: C.text,
          lineHeight: 1.4, paddingRight: 16,
        }}>{question}</span>
        <span style={{
          fontFamily: F.mono, fontSize: '1.2rem', color: C.textSec,
          transition: 'transform 0.2s', transform: open ? 'rotate(45deg)' : 'rotate(0)',
          flexShrink: 0,
        }}>+</span>
      </button>
      <div style={{
        maxHeight: open ? 300 : 0, overflow: 'hidden',
        transition: 'max-height 0.3s ease',
      }}>
        <p style={{
          fontFamily: F.body, fontSize: '0.9rem', color: C.textSec,
          lineHeight: 1.7, paddingBottom: 18,
        }}>{answer}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   LIGHTBOX
   ═══════════════════════════════════════════ */
function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.92)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'lbFadeIn 0.2s ease',
      }}
    >
      <style>{`
        @keyframes lbFadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
      <button onClick={onClose} style={{
        position: 'absolute', top: 16, right: 24,
        background: 'none', border: 'none', color: '#fff',
        fontSize: '2rem', cursor: 'pointer', lineHeight: 1,
      }}>{'\u00D7'}</button>
      <img
        src={src} alt={alt || ''}
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: 8 }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════
   SECTION WRAPPER
   ═══════════════════════════════════════════ */
function Section({ id, children, style }) {
  return (
    <section id={id} style={{
      padding: '80px 24px', maxWidth: 1100, margin: '0 auto', ...style,
    }}>
      {children}
    </section>
  );
}

function SectionTitle({ tag, title, subtitle }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 48 }}>
      {tag && <div style={{
        fontFamily: F.mono, fontSize: '0.7rem', color: C.accent,
        textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 10,
      }}>{tag}</div>}
      <h2 style={{
        fontFamily: F.display, fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
        fontWeight: 800, color: C.text, lineHeight: 1.2, marginBottom: 12,
      }}>{title}</h2>
      {subtitle && <p style={{
        fontFamily: F.body, fontSize: '1rem', color: C.textSec, maxWidth: 560, margin: '0 auto', lineHeight: 1.6,
      }}>{subtitle}</p>}
    </div>
  );
}

/* ═══════════════════════════════════════════
   COMPARISON TABLE
   ═══════════════════════════════════════════ */
function ComparisonTable() {
  const rows = [
    ['Moon Phase Overlays',           true,  false],
    ['Mercury & Venus Retrograde',    true,  false],
    ['Eclipse Markers with Glow',     true,  false],
    ['Hurst Cycle Arcs',              true,  false],
    ['Gann Countdown System',         true,  false],
    ['Benner Cycle Bands',            true,  false],
    ['Lunar Node Ribbon',             true,  false],
    ['Jupiter-Saturn Conjunctions',   true,  false],
    ['Cosmic Confluence Score',       true,  false],
    ['Multi-Framework Overlap',       true,  false],
    ['Standard Indicators (MA, RSI)', true,  true ],
    ['Custom Pine Script',            false, true ],
  ];

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{
        width: '100%', borderCollapse: 'collapse', fontFamily: F.body, fontSize: '0.85rem',
      }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '12px 16px', color: C.textSec, borderBottom: `1px solid ${C.border}`, fontWeight: 500 }}>Feature</th>
            <th style={{ textAlign: 'center', padding: '12px 16px', color: C.gold, borderBottom: `1px solid ${C.border}`, fontWeight: 600, fontFamily: F.display }}>Cosmic Charts</th>
            <th style={{ textAlign: 'center', padding: '12px 16px', color: C.textSec, borderBottom: `1px solid ${C.border}`, fontWeight: 500 }}>TradingView</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([feature, cc, tv], i) => (
            <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
              <td style={{ padding: '10px 16px', color: C.text }}>{feature}</td>
              <td style={{ padding: '10px 16px', textAlign: 'center', color: cc ? C.teal : C.red }}>{cc ? '\u2713' : '\u2717'}</td>
              <td style={{ padding: '10px 16px', textAlign: 'center', color: tv ? C.teal : C.red }}>{tv ? '\u2713' : '\u2717'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ═══════════════════════════════════════════
   TESTIMONIAL CARD
   ═══════════════════════════════════════════ */
function TestimonialCard({ quote, name, role }) {
  return (
    <div style={{
      background: C.bgCard, borderRadius: 12, border: `1px solid ${C.border}`,
      padding: '28px 24px', flex: '1 1 280px', maxWidth: 340,
    }}>
      <div style={{ fontFamily: F.body, fontSize: '0.9rem', color: C.text, lineHeight: 1.7, marginBottom: 16, fontStyle: 'italic' }}>
        &ldquo;{quote}&rdquo;
      </div>
      <div style={{ fontFamily: F.display, fontSize: '0.85rem', fontWeight: 600, color: C.gold }}>{name}</div>
      <div style={{ fontFamily: F.body, fontSize: '0.75rem', color: C.textSec }}>{role}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   STEP CARD (How It Works)
   ═══════════════════════════════════════════ */
function StepCard({ number, title, desc }) {
  return (
    <div style={{ flex: '1 1 220px', maxWidth: 280, textAlign: 'center' }}>
      <div style={{
        width: 48, height: 48, borderRadius: '50%', margin: '0 auto 16px',
        background: `linear-gradient(135deg, ${C.accent}, ${C.purple})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: F.display, fontSize: '1.2rem', fontWeight: 800, color: C.white,
      }}>{number}</div>
      <div style={{ fontFamily: F.display, fontSize: '1rem', fontWeight: 700, color: C.text, marginBottom: 8 }}>{title}</div>
      <div style={{ fontFamily: F.body, fontSize: '0.85rem', color: C.textSec, lineHeight: 1.6 }}>{desc}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════ */
/* ═══════════════════════════════════════════
   PRIVACY POLICY PAGE
   ═══════════════════════════════════════════ */
function PrivacyPolicy() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const h3Style = {
    fontFamily: F.display, fontSize: '1.2rem', fontWeight: 700,
    color: C.text, marginTop: 36, marginBottom: 12,
  };
  const pStyle = {
    fontFamily: F.body, fontSize: '0.9rem', color: C.textSec,
    lineHeight: 1.8, marginBottom: 16,
  };

  return (
    <div style={{ fontFamily: F.body, color: C.text, background: C.bg, minHeight: '100vh' }}>

      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(10,12,20,0.85)', backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${C.border}`,
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto', padding: '0 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56,
        }}>
          <Link to="/" style={{
            fontFamily: F.display, fontSize: '1.1rem', fontWeight: 800, color: C.text,
            textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{
              width: 10, height: 10, borderRadius: '50%',
              background: `linear-gradient(135deg, ${C.accent}, ${C.purple})`,
              display: 'inline-block',
            }} />
            Cosmic Charts
          </Link>
          <a href={APP_URL} style={{
            fontFamily: F.body, fontSize: '0.85rem', fontWeight: 600, color: C.accent,
            textDecoration: 'none', border: `1px solid ${C.accent}`, borderRadius: 6,
            padding: '6px 16px',
          }}>Launch App</a>
        </div>
      </nav>

      {/* Content */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '100px 24px 80px' }}>
        <Link to="/" style={{
          fontFamily: F.body, fontSize: '0.85rem', color: C.accent,
          textDecoration: 'none', display: 'inline-block', marginBottom: 24,
        }}>{'\u2190'} Back to Home</Link>

        <h1 style={{
          fontFamily: F.display, fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
          fontWeight: 800, color: C.text, marginBottom: 8,
        }}>Privacy Policy</h1>
        <p style={{ ...pStyle, color: C.textMuted, fontSize: '0.8rem' }}>Last updated: March 5, 2026</p>

        <h3 style={h3Style}>1. Introduction</h3>
        <p style={pStyle}>
          Cosmic Charts is operated by Wyckoff Labs. This policy explains how we collect,
          use, and protect your information when you use our service at app.cosmiccharts.com.
        </p>

        <h3 style={h3Style}>2. Information We Collect</h3>
        <p style={pStyle}>
          <strong style={{ color: C.text }}>Account information:</strong> When you create an account,
          we collect your email address and display name.
          <br /><br />
          <strong style={{ color: C.text }}>Usage data:</strong> We collect anonymized usage data such
          as which overlays you enable, timeframes selected, and session duration to improve the product.
          <br /><br />
          <strong style={{ color: C.text }}>Payment information:</strong> Payments are processed entirely
          by Stripe. We never see, store, or have access to your credit card number or banking details.
        </p>

        <h3 style={h3Style}>3. How We Use Your Information</h3>
        <p style={pStyle}>
          We use the information we collect to provide and maintain the Cosmic Charts service,
          send account-related emails (password resets, subscription confirmations), and process
          payments through Stripe.
        </p>

        <h3 style={h3Style}>4. Data Sharing</h3>
        <p style={pStyle}>
          We do not sell, rent, or share your personal data with third parties for advertising
          purposes. Stripe processes payments on our behalf under their own privacy policy.
          We do not use any third-party advertising or tracking services.
        </p>

        <h3 style={h3Style}>5. Cookies</h3>
        <p style={pStyle}>
          We use session cookies for authentication only. These cookies are essential for
          keeping you logged in and do not track your activity across other websites.
        </p>

        <h3 style={h3Style}>6. Data Retention</h3>
        <p style={pStyle}>
          Your account data is retained for as long as your account is active. If you request
          account deletion, we will remove your personal data within 30 days.
        </p>

        <h3 style={h3Style}>7. Your Rights</h3>
        <p style={pStyle}>
          You may request a copy of your data or request deletion of your account and all
          associated data at any time by emailing{' '}
          <a href="mailto:support@wyckofflabs.com" style={{ color: C.accent, textDecoration: 'none' }}>
            support@wyckofflabs.com
          </a>.
        </p>

        <h3 style={h3Style}>8. Contact</h3>
        <p style={pStyle}>
          For any questions about this privacy policy, contact us at{' '}
          <a href="mailto:support@wyckofflabs.com" style={{ color: C.accent, textDecoration: 'none' }}>
            support@wyckofflabs.com
          </a>.
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN APP (Router)
   ═══════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <FilmGrain />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </>
  );
}

/* ═══════════════════════════════════════════
   LANDING PAGE
   ═══════════════════════════════════════════ */
function LandingPage() {
  const [mobileNav, setMobileNav] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const openLightbox = (src, alt) => setLightbox({ src, alt });

  return (
    <div style={{ fontFamily: F.body, color: C.text, background: 'var(--bg)', minHeight: '100vh', overflowX: 'hidden' }}>
      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}

      {/* ── NAV ── */}
      <nav style={{
        position: 'sticky', top: 16, zIndex: 100,
        maxWidth: 'fit-content', margin: '0 auto',
        background: 'var(--bg-card)', backdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '8px 8px 8px 20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <a href="#" style={{
          fontFamily: F.display, fontSize: 16, fontWeight: 700,
          letterSpacing: '-0.02em', color: 'var(--text-primary)',
          textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8,
          marginRight: 8, whiteSpace: 'nowrap',
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: 'var(--gold)',
            boxShadow: '0 0 12px rgba(196,151,70,0.4)',
            display: 'inline-block', flexShrink: 0,
          }} />
          Cosmic Charts
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="nav-desktop">
          {['Features', 'Compare', 'Pricing', 'FAQ'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{
              fontFamily: F.body, fontSize: 14, fontWeight: 500,
              color: 'var(--text-tertiary)', textDecoration: 'none',
              padding: '8px 16px', borderRadius: 'var(--radius-sm)',
              transition: 'color var(--duration-fast) ease, background var(--duration-fast) ease',
            }}
            onMouseEnter={e => { e.target.style.color = 'var(--text-primary)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }}
            onMouseLeave={e => { e.target.style.color = 'var(--text-tertiary)'; e.target.style.background = 'transparent'; }}
            >{l}</a>
          ))}
          <a href={APP_URL} style={{
            fontFamily: F.body, fontSize: 14, fontWeight: 600,
            color: '#0a0a0f', textDecoration: 'none',
            background: 'var(--gold)', borderRadius: 'var(--radius-sm)',
            padding: '8px 20px', marginLeft: 4,
            boxShadow: '0 2px 8px rgba(196,151,70,0.15), inset 0 1px 0 rgba(255,255,255,0.15)',
            transition: 'background var(--duration-fast) ease, transform var(--duration-fast) ease, box-shadow var(--duration-fast) ease',
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}
          onMouseEnter={e => { e.target.style.background = '#d4a44e'; e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 4px 16px rgba(196,151,70,0.25)'; }}
          onMouseLeave={e => { e.target.style.background = 'var(--gold)'; e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 2px 8px rgba(196,151,70,0.15), inset 0 1px 0 rgba(255,255,255,0.15)'; }}
          >Launch App {'\u2192'}</a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileNav(v => !v)}
          className="nav-mobile-btn"
          style={{
            background: 'none', border: 'none', color: 'var(--text-secondary)',
            cursor: 'pointer', padding: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            {mobileNav ? (
              <><line x1="4" y1="4" x2="16" y2="16" /><line x1="16" y1="4" x2="4" y2="16" /></>
            ) : (
              <><line x1="3" y1="5" x2="17" y2="5" /><line x1="3" y1="10" x2="17" y2="10" /><line x1="3" y1="15" x2="17" y2="15" /></>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileNav && (
        <div style={{
          position: 'fixed', top: 72, left: 16, right: 16, zIndex: 99,
          background: 'var(--bg-card)', backdropFilter: 'var(--glass-blur)',
          border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)',
          padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 8,
          boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
          animation: 'slideDown 0.25s var(--ease-smooth) forwards',
        }}>
          {['Features', 'Compare', 'Pricing', 'FAQ'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMobileNav(false)} style={{
              fontFamily: F.body, fontSize: 15, fontWeight: 500,
              color: 'var(--text-secondary)', textDecoration: 'none',
              padding: '10px 12px', borderRadius: 'var(--radius-sm)',
              transition: 'color var(--duration-fast) ease, background var(--duration-fast) ease',
            }}
            onMouseEnter={e => { e.target.style.color = 'var(--text-primary)'; e.target.style.background = 'rgba(255,255,255,0.04)'; }}
            onMouseLeave={e => { e.target.style.color = 'var(--text-secondary)'; e.target.style.background = 'transparent'; }}
            >{l}</a>
          ))}
          <a href={APP_URL} onClick={() => setMobileNav(false)} style={{
            fontFamily: F.body, fontSize: 15, fontWeight: 600,
            color: '#0a0a0f', textDecoration: 'none', textAlign: 'center',
            background: 'var(--gold)', borderRadius: 'var(--radius-sm)',
            padding: '12px 20px', marginTop: 4,
          }}>Launch App {'\u2192'}</a>
        </div>
      )}

      {/* ══════════════════════════════════════
         1. HERO
         ══════════════════════════════════════ */}
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
        }}>Multi-Framework Cycle Analysis</div>

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
          color: 'var(--text-secondary)', maxWidth: 560, margin: '0 auto 32px',
        }}>
          Moon phases, retrogrades, eclipses, Hurst arcs, Gann countdowns, planetary
          alignments &mdash; overlaid on live crypto charts. One tool, every cycle framework.
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
              alt="Cosmic Charts live chart with moon phases, Hurst arcs, and Mercury Rx overlays"
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

      {/* ══════════════════════════════════════
         LIVE CASE STUDY
         ══════════════════════════════════════ */}
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
              onClick={() => openLightbox('/cosmic-score-proof.png', 'Cosmic Score 10.0 — September 2025')}
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

      {/* ══════════════════════════════════════
         2. CONVERGENCE CALLOUT
         ══════════════════════════════════════ */}
      <section style={{ textAlign: 'center', padding: '80px 24px', maxWidth: 700, margin: '0 auto' }}>
        <div style={{ fontFamily: F.mono, fontSize: '0.75rem', letterSpacing: '0.15em', color: C.accent, textTransform: 'uppercase', marginBottom: 16 }}>
          2026 Convergence Event
        </div>
        <h2 style={{ fontFamily: F.display, fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: C.text, marginBottom: 20, lineHeight: 1.15 }}>
          Six Major Cycles.<br />Aligning Simultaneously.
        </h2>
        <p style={{ fontFamily: F.body, color: C.textSec, fontSize: '1.1rem', lineHeight: 1.7, marginBottom: 36 }}>
          Hurst trough, Benner panic year, Saturn{'\u2013'}Pluto square, lunar node shift, eclipse cluster, and Gann anniversary {'\u2014'} all converging in early 2026. Are you positioned?
        </p>
        <a href={APP_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', background: C.accent, color: '#000', fontFamily: F.body, fontWeight: 700, padding: '14px 32px', borderRadius: 8, fontSize: '1rem', textDecoration: 'none' }}>
          Open Free Chart
        </a>
      </section>

      {/* ══════════════════════════════════════
         3. TRADINGVIEW COMPARISON
         ══════════════════════════════════════ */}
      <Section id="compare">
        <SectionTitle
          tag="How We Compare"
          title="TradingView Shows Price. We Show Timing."
          subtitle="Standard charting platforms give you lagging indicators. Cosmic Charts gives you the timing frameworks that move ahead of price."
        />
        <div style={{ background: C.bgCard, borderRadius: 12, border: `1px solid ${C.border}`, padding: '4px 0', overflow: 'hidden' }}>
          <ComparisonTable />
        </div>
      </Section>

      {/* ══════════════════════════════════════
         4. FEATURE SHOWCASE
         ══════════════════════════════════════ */}
      <Section id="features">
        <SectionTitle
          tag="Overlay Layers"
          title="Every Cycle Framework, One Chart"
          subtitle="Toggle between 16 independent overlay layers. Each one adds a timing dimension that traditional charting misses."
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center' }}>
          <FeatureCard icon={'\uD83C\uDF11'} title="Moon Phases" desc="New & full moon markers with supermoon highlighting. See lunar rhythm on every timeframe." color={C.gold} image="/feature-moon.png" onImageClick={openLightbox} />
          <FeatureCard icon={'\u267B\uFE0F'} title="Mercury & Venus Rx" desc="Retrograde zones with pre/post shadow periods. Historically correlated with volatility spikes." color={C.pink} image="/feature-mercury.png" onImageClick={openLightbox} />
          <FeatureCard icon={'\uD83C\uDF1E'} title="Eclipse Windows" desc="Solar and lunar eclipse markers with glow effects. Major cycle turning points for crypto." color={C.orange} image="/feature-eclipse.png" onImageClick={openLightbox} />
          <FeatureCard icon={'\uD83D\uDD04'} title="Hurst Cycle Arcs" desc="Three nested cycle periods (15/30/60 bar) with translation labels. See cycle troughs before they hit." color={C.textSec} image="/feature-hurst.png" onImageClick={openLightbox} />
          <FeatureCard icon={'\u23F1\uFE0F'} title="Gann Countdown" desc="Custom anchor dates with T+7 through T+360 markers. July 27, 2024 — Trump's Nashville Bitcoin speech. T+360 days later: major top." color={C.orange} image="/feature-gann.png" onImageClick={openLightbox} />
          <FeatureCard icon={'\uD83D\uDCC8'} title="Benner Cycle" desc="Phase ribbons and background bands. Classifies years as good, hard, or panic since 1875." color={C.teal} image="/feature-benner.png" onImageClick={openLightbox} />
          <FeatureCard icon={'\uD83C\uDF10'} title="Lunar Node Ribbon" desc="18.6-year nodal cycle with zodiac position, ingress markers, and McWhirter labels." color={C.purple} image="/feature-lunar-node.png" onImageClick={openLightbox} />
          <FeatureCard icon={'\u2643'} title="Planetary Conjunctions" desc="Jupiter-Saturn and Saturn-Pluto hard aspects. The longest-cycle timing framework in the toolkit." color={C.blue} image="/feature-conjunctions.png" onImageClick={openLightbox} />
          <FeatureCard icon={'\u2605'} title="Cosmic Confluence Score" desc="Real-time 0-10 score combining all active layers. Heat strip visualization shows density at a glance." color={C.accent} image="/feature-cosmic-score.png" onImageClick={openLightbox} />
        </div>
      </Section>

      {/* ══════════════════════════════════════
         5. TESTIMONIALS
         ══════════════════════════════════════ */}
      <section style={{ background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bgPanel} 50%, ${C.bg} 100%)`, padding: '80px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <SectionTitle
            tag="Traders Say"
            title="Built for Cycle Traders, by Cycle Traders"
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center' }}>
            <TestimonialCard
              quote="I used to spend hours plotting moon phases manually on TradingView. Cosmic Charts does it instantly across every timeframe."
              name="Alex K."
              role="Crypto Swing Trader"
            />
            <TestimonialCard
              quote="The confluence score changed how I time entries. When Hurst, Gann, and eclipses align, the signal is impossible to ignore."
              name="Sarah M."
              role="Institutional Analyst"
            />
            <TestimonialCard
              quote="Finally a tool that takes planetary cycles seriously without looking like it was built in 2005. Clean UI, real data."
              name="Daniel R."
              role="Full-Time Trader"
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
         6. HOW IT WORKS
         ══════════════════════════════════════ */}
      <Section id="how">
        <SectionTitle
          tag="Getting Started"
          title="Three Clicks to Cycle Analysis"
          subtitle="No downloads, no API keys, no account required for the free tier."
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, justifyContent: 'center' }}>
          <StepCard number="1" title="Open the Chart" desc="Load any crypto pair on any timeframe. Live data from Bybit and Binance." />
          <StepCard number="2" title="Toggle Overlays" desc="Enable moon phases, retrogrades, Hurst arcs, Gann countdowns &mdash; any combination." />
          <StepCard number="3" title="Spot Confluences" desc="The Cosmic Score highlights where multiple frameworks converge. Time your entries with precision." />
        </div>
      </Section>

      {/* ══════════════════════════════════════
         7. PRICING
         ══════════════════════════════════════ */}
      <Section id="pricing">
        <SectionTitle
          tag="Plans"
          title="Choose Your Cycle Toolkit"
          subtitle="Start free. Upgrade when you need deeper analysis."
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center', alignItems: 'flex-start' }}>
          <PricingCard
            name="Free"
            price="$0"
            period={null}
            accent={C.textSec}
            features={[
              'Live crypto charts (all pairs)',
              'Moon phase overlays',
              'Hurst cycle arcs',
              'Seasonal date markers',
              'Unlimited timeframes',
            ]}
            ctaLabel="Start Free"
          />
          <PricingCard
            name="Pro"
            price="$9.95"
            period="mo"
            accent={C.accent}
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
          />
          <PricingCard
            name="Elite"
            price="$19.95"
            period="mo"
            accent={C.gold}
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
          />
        </div>
      </Section>

      {/* ══════════════════════════════════════
         8. FINAL CTA
         ══════════════════════════════════════ */}
      <section style={{
        padding: '80px 24px', textAlign: 'center',
        background: `radial-gradient(ellipse at center, ${C.accent}11 0%, transparent 70%)`,
      }}>
        <h2 style={{
          fontFamily: F.display, fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
          fontWeight: 800, color: C.text, marginBottom: 16, lineHeight: 1.2,
        }}>
          The Cycles Are Moving.<br />Are You Watching?
        </h2>
        <p style={{
          fontFamily: F.body, fontSize: '1rem', color: C.textSec, maxWidth: 480, margin: '0 auto 28px', lineHeight: 1.6,
        }}>
          Open a free chart in seconds. No signup required.
        </p>
        <a href={APP_URL} style={{
          fontFamily: F.body, fontSize: '1.05rem', fontWeight: 600, color: C.white,
          textDecoration: 'none',
          background: `linear-gradient(135deg, ${C.accent}, ${C.purple})`,
          borderRadius: 8, padding: '16px 40px', display: 'inline-block',
          boxShadow: `0 4px 24px ${C.accent}44`,
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = `0 6px 32px ${C.accent}66`; }}
        onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = `0 4px 24px ${C.accent}44`; }}
        >Launch Cosmic Charts</a>
      </section>

      {/* ══════════════════════════════════════
         9. FAQ
         ══════════════════════════════════════ */}
      <Section id="faq">
        <SectionTitle
          tag="FAQ"
          title="Frequently Asked Questions"
        />
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <FaqItem
            question="How do I subscribe to Cosmic Charts?"
            answer="Cosmic Charts runs on your Wyckoff Labs account — the same account used for TradeOS, our professional trading journal. If you don't have one yet, creating it is free and takes 30 seconds. Once you're logged in, click any locked feature on the chart and you'll be taken directly to Stripe checkout to activate your plan."
          />
          <FaqItem
            question="Do I need a TradeOS subscription too?"
            answer="No. A Wyckoff Labs account is free. Cosmic Charts and TradeOS are separate subscriptions — you only pay for what you want. That said, TradeOS Elite subscribers get full Cosmic Charts Elite access included at no extra charge."
          />
        </div>
      </Section>

      {/* ══════════════════════════════════════
         10. FOOTER
         ══════════════════════════════════════ */}
      <footer style={{
        borderTop: `1px solid ${C.border}`, padding: '32px 24px',
        maxWidth: 1100, margin: '0 auto',
        display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 16,
      }}>
        <div style={{ fontFamily: F.body, fontSize: '0.8rem', color: C.textSec }}>
          &copy; {new Date().getFullYear()} Wyckoff Labs. All rights reserved.
        </div>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {[
            { label: 'App', href: APP_URL },
            { label: 'Wyckoff Labs', href: 'https://wyckofflabs.com' },
          ].map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: F.body, fontSize: '0.8rem', color: C.textSec, textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = C.text}
            onMouseLeave={e => e.target.style.color = C.textSec}
            >{l.label}</a>
          ))}
          <Link to="/privacy" style={{
            fontFamily: F.body, fontSize: '0.8rem', color: C.textSec, textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.target.style.color = C.text}
          onMouseLeave={e => e.target.style.color = C.textSec}
          >Privacy Policy</Link>
          <a href="mailto:support@wyckofflabs.com" style={{
            fontFamily: F.body, fontSize: '0.8rem', color: C.textSec, textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.target.style.color = C.text}
          onMouseLeave={e => e.target.style.color = C.textSec}
          >support@wyckofflabs.com</a>
        </div>
      </footer>
    </div>
  );
}
