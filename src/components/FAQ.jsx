import { useState } from 'react';
import { F } from '../tokens';

/* ===================================================
   FAQ ACCORDION ITEM
   =================================================== */
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
        maxHeight: open ? 500 : 0, overflow: 'hidden',
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

/* ===================================================
   FAQ SECTION
   =================================================== */
export default function FAQ() {
  return (
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
          question="What cycles does Cosmic Charts track?"
          answer="Five categories of overlays across 25+ indicators. Astronomical Cycles: moon phases, eclipses, Mercury and Venus retrograde, lunar node cycle, planetary aspects, planet ingresses, Mercury cazimi, and seasonal dates. Cycles and Timing: Hurst arcs, Gann countdown, Benner cycle, and BTC halvings. Macro: FOMC meeting dates, triple witching, liquidity cycle, and Puetz crash windows. Space Weather: solar cycle ribbon, solar flares, geomagnetic storms, and CME impact windows. Plus an Intelligence Hub with confluence scoring and AI analysis."
        />
        <FaqItem
          question="How does the AI Cycle Analyst work?"
          answer="The Intelligence Hub combines all your active overlays into a real-time convergence card and cosmic score. The AI Cycle Analyst (Elite tier) goes further: it synthesizes every active layer with current price action to generate plain-language insights about what the cycle confluence means right now and what to watch for next. Think of it as a second opinion that reads all your overlays at once."
        />
        <FaqItem
          question="What's included in the free plan?"
          answer="The free tier includes live crypto charts on all pairs, moon phase overlays (new, full, quarter, and supermoons), Hurst cycle arcs with translation detection, seasonal dates and cross-quarter days, the solar cycle ribbon, a convergence card, screenshot export, and unlimited timeframes. No credit card required."
        />
        <FaqItem
          question="How do FOMC dates and triple witching help?"
          answer="FOMC meeting dates mark the 8 times per year the Federal Reserve decides interest rates \u2014 the single biggest macro catalyst for financial markets. Triple witching marks quarterly options and futures expiration on the third Friday of March, June, September, and December. Both events create predictable volatility windows. Overlaying them on your cycle chart lets you see when macro catalysts align with cycle turning points."
        />
        <FaqItem
          question="What data sources does Cosmic Charts use?"
          answer="Live OHLCV data from Bybit and Binance. Astronomical data is computed from JPL ephemeris. Solar and geomagnetic data comes from NOAA SWPC. No API keys required \u2014 just open the chart and go."
        />
        <FaqItem
          question="Is this astrology?"
          answer="No. We overlay empirically observable astronomical events (eclipses, planetary conjunctions, lunar cycles) alongside established financial timing frameworks (Hurst, Gann, Benner) and macro catalysts (FOMC, triple witching). You decide what matters to your strategy."
        />
        <FaqItem
          question="Can I use this with TradingView?"
          answer="Cosmic Charts is a standalone web app \u2014 no TradingView integration needed. It includes standard indicators (MA, RSI) alongside the cycle overlays. If you need Pine Script, TradingView is the better choice for that."
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
  );
}
