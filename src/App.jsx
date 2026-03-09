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
            <span style={{ color: checkColor }}>✓</span>
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

/* ═══════════════════════════════════════════
   FEATURE CARD
   ═══════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════
   FAQ ACCORDION ITEM
   ═══════════════════════════════════════════ */
function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)', marginBottom: 8, overflow: 'hidden',
    }}>
      <button
        className="faq-btn"
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '20px 24px', textAlign: 'left', transition: 'background 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-card-hover)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <span style={{
          fontFamily: F.body, fontSize: 15, fontWeight: 600,
          color: 'var(--text-primary)', lineHeight: 1.4, paddingRight: 16,
        }}>{question}</span>
        <span style={{
          fontSize: 18, color: 'var(--text-tertiary)',
          transition: 'transform 0.3s', transform: open ? 'rotate(45deg)' : 'rotate(0)',
          flexShrink: 0, lineHeight: 1,
        }}>+</span>
      </button>
      <div style={{
        maxHeight: open ? 400 : 0, overflow: 'hidden',
        transition: 'max-height 0.4s ease',
      }}>
        <p style={{
          fontFamily: F.body, fontSize: 14, color: 'var(--text-secondary)',
          lineHeight: 1.7, padding: '0 24px 20px 24px',
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
          <div style={{ textAlign: 'center', fontSize: 14, color: cc ? 'var(--gold)' : 'var(--danger)' }}>{cc ? '✓' : '✗'}</div>
          <div style={{ textAlign: 'center', fontSize: 14, color: tv ? 'var(--text-secondary)' : 'var(--danger)' }}>{tv ? '✓' : '✗'}</div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   STEP CARD (How It Works)
   ═══════════════════════════════════════════ */
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
         OVERLAY LAYERS FEATURE GRID
         ══════════════════════════════════════ */}
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
          <FeatureCard icon="🌙" title="Moon Phases" desc="New & full moon markers with supermoon highlighting. See lunar rhythm on every timeframe." image="/feature-moon.png" delay={800} />
          <FeatureCard icon="☿" title="Mercury & Venus Rx" desc="Retrograde zones with pre/post shadow periods. Historically correlated with volatility spikes." image="/feature-mercury.png" delay={860} />
          <FeatureCard icon="🌑" title="Eclipse Windows" desc="Solar and lunar eclipse markers with glow effects. Major cycle turning points for crypto." image="/feature-eclipse.png" delay={920} />
          <FeatureCard icon="🔄" title="Hurst Cycle Arcs" desc="Three nested cycle periods (15/30/60 bar) with translation labels. See cycle troughs before they hit." image="/feature-hurst.png" delay={980} />
          <FeatureCard icon="⏱" title="Gann Countdown" desc="Custom anchor dates with T+7 through T+360 markers. Track time cycles from any pivot." image="/feature-gann.png" delay={1040} />
          <FeatureCard icon="📊" title="Benner Cycle" desc="Phase ribbons and background bands. Classifies years as good, hard, or panic since 1875." image="/feature-benner.png" delay={1100} />
          <FeatureCard icon="🌐" title="Lunar Node Ribbon" desc="18.6-year nodal cycle with zodiac position, ingress markers, and McWhirter labels." image="/feature-lunar-node.png" delay={1160} />
          <FeatureCard icon="🪐" title="Planetary Conjunctions" desc="Jupiter-Saturn and Saturn-Pluto hard aspects. The longest-cycle timing framework in the toolkit." image="/feature-conjunctions.png" delay={1220} />
          <FeatureCard icon="⭐" title="Cosmic Confluence Score" desc="Real-time 0–10 score combining all active layers. Heat strip visualization shows density at a glance." image="/feature-cosmic-score.png" delay={1280} />
        </div>
      </section>

      {/* ══════════════════════════════════════
         COMPARE vs TRADINGVIEW
         ══════════════════════════════════════ */}
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
            color: 'var(--text-secondary)', maxWidth: 540, margin: '0 auto',
          }}>
            Standard charting platforms give you lagging indicators. Cosmic Charts gives you
            the timing frameworks that move ahead of price.
          </p>
        </div>
        <ComparisonTable />
      </section>

      {/* ══════════════════════════════════════
         2026 CONVERGENCE BANNER
         ══════════════════════════════════════ */}
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

      {/* ══════════════════════════════════════
         GETTING STARTED
         ══════════════════════════════════════ */}
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

      {/* ══════════════════════════════════════
         PRICING
         ══════════════════════════════════════ */}
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

      {/* ══════════════════════════════════════
         FAQ
         ══════════════════════════════════════ */}
      <section className="faq-section" id="faq" style={{ padding: '120px 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{
            fontSize: 12, fontWeight: 500, letterSpacing: '0.15em',
            textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16,
          }}>FAQ</div>
          <h2 style={{
            fontFamily: F.display, fontWeight: 800,
            fontSize: 'clamp(28px, 4vw, 44px)', lineHeight: 1.1,
            letterSpacing: '-0.03em', color: 'var(--text-primary)',
          }}>Common Questions</h2>
        </div>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <FaqItem
            question="What data sources does Cosmic Charts use?"
            answer="Live OHLCV data from Bybit and Binance. No API keys required — just open the chart and go."
          />
          <FaqItem
            question="Is this astrology?"
            answer="No. We overlay empirically observable astronomical events (eclipses, planetary conjunctions, lunar cycles) alongside established financial timing frameworks (Hurst, Gann, Benner). You decide what matters to your strategy."
          />
          <FaqItem
            question="Can I use this with TradingView?"
            answer="Cosmic Charts is a standalone web app — no TradingView integration needed. It includes standard indicators (MA, RSI) alongside the cycle overlays. If you need Pine Script, TradingView is the better choice for that."
          />
          <FaqItem
            question="What's the Cosmic Confluence Score?"
            answer="A real-time 0–10 score that combines all your active overlay layers into a single number. Higher scores mean more frameworks are aligned at that point in time."
          />
          <FaqItem
            question="Can I cancel anytime?"
            answer="Yes. All plans are month-to-month with no commitment. Cancel from your account settings and you keep access through the end of your billing period."
          />
          <FaqItem
            question="Do you support assets other than crypto?"
            answer="Currently crypto only (BTC, ETH, and 50+ pairs). Multi-asset support (S&P 500, Gold, Silver, Oil, DXY) is on the roadmap."
          />
        </div>
      </section>

      {/* ══════════════════════════════════════
         FINAL CTA
         ══════════════════════════════════════ */}
      <section style={{
        padding: '120px 24px 80px', textAlign: 'center', position: 'relative',
      }}>
        {/* Ambient glow */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600, height: 300,
          background: 'radial-gradient(ellipse at center, rgba(196,151,70,0.05) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        <h2 style={{
          fontFamily: F.display, fontWeight: 800,
          fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.1,
          letterSpacing: '-0.03em', color: 'var(--text-primary)',
          marginBottom: 16, position: 'relative',
        }}>The Cycles Are Moving.</h2>
        <p style={{
          fontFamily: F.body, fontSize: 17, color: 'var(--text-secondary)',
          lineHeight: 1.5, marginBottom: 32, position: 'relative',
        }}>Start charting what others can't see.</p>
        <a href={APP_URL} target="_blank" rel="noopener noreferrer" style={{
          display: 'inline-block', textDecoration: 'none', position: 'relative',
          background: 'var(--gold)', color: '#0a0a0f',
          fontFamily: F.body, fontWeight: 600, fontSize: 16,
          padding: '16px 36px', borderRadius: 14,
          boxShadow: '0 4px 20px rgba(196,151,70,0.25), inset 0 1px 0 rgba(255,255,255,0.15)',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(196,151,70,0.35), inset 0 1px 0 rgba(255,255,255,0.15)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.filter = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(196,151,70,0.25), inset 0 1px 0 rgba(255,255,255,0.15)'; }}
        >Open Free Chart →</a>
      </section>

      {/* ══════════════════════════════════════
         FOOTER
         ══════════════════════════════════════ */}
      <footer className="site-footer" style={{
        borderTop: '1px solid var(--border)', padding: 40,
        maxWidth: 900, margin: '0 auto',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4,
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: 'var(--gold)',
              boxShadow: '0 0 6px rgba(196,151,70,0.4)',
            }} />
            <span style={{
              fontFamily: F.display, fontWeight: 700, fontSize: 15,
              color: 'var(--text-primary)',
            }}>Cosmic Charts</span>
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>
            &copy; {new Date().getFullYear()} Wyckoff Labs. All rights reserved.
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, flexWrap: 'wrap' }}>
          {[
            { label: 'Features', href: '#features' },
            { label: 'Compare', href: '#compare' },
            { label: 'Pricing', href: '#pricing' },
            { label: 'FAQ', href: '#faq' },
            { label: 'Launch App', href: APP_URL, external: true },
          ].map((l, i, arr) => (
            <span key={l.label}>
              <a
                href={l.href}
                {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                style={{
                  fontSize: 13, color: 'var(--text-tertiary)',
                  textDecoration: 'none', transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-tertiary)'}
              >{l.label}</a>
              {i < arr.length - 1 && <span style={{ color: 'var(--text-tertiary)', margin: '0 8px' }}>&middot;</span>}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}
