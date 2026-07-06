import { F, APP_URL } from '../tokens';

export default function Footer() {
  return (
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
          &copy; 2026 Wyckoff Labs. All rights reserved.
        </div>
        <a href="https://elevenlabs.io/startup-grants" target="_blank" rel="noopener noreferrer" style={{ marginTop: 12, display: 'inline-block' }}>
          <img src="https://eleven-public-cdn.elevenlabs.io/payloadcms/cy7rxce8uki-IIElevenLabsGrants%201.webp" alt="Supported by ElevenLabs Grants" style={{ width: 150, opacity: 0.6, transition: 'opacity 0.2s' }} onMouseEnter={e => e.currentTarget.style.opacity = '1'} onMouseLeave={e => e.currentTarget.style.opacity = '0.6'} />
        </a>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, flexWrap: 'wrap' }}>
        {[
          { label: 'Features', href: '#features' },
          { label: 'Compare', href: '#compare' },
          { label: 'Pricing', href: '#pricing' },
          { label: 'FAQ', href: '#faq' },
          { label: 'Terms', href: 'https://cc.wyckofflabs.com/terms', external: true },
          { label: 'Privacy', href: 'https://cc.wyckofflabs.com/privacy', external: true },
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
  );
}
