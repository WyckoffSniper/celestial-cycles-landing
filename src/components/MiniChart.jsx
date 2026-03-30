import { useState } from 'react';
import { C, F } from '../tokens';

/* ===================================================
   SEEDED RANDOM (deterministic SVG generation)
   =================================================== */
function seededRandom(seed) {
  let s = seed;
  return () => { s = (s * 16807 + 0) % 2147483647; return s / 2147483647; };
}

/* ===================================================
   MINI CHART
   =================================================== */
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

/* ===================================================
   HERO CHART CARD
   =================================================== */
export default function HeroChartCard() {
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
