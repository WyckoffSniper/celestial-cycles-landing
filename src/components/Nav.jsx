import { useState } from 'react';
import { F, APP_URL } from '../tokens';

export default function Nav() {
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <>
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
    </>
  );
}
