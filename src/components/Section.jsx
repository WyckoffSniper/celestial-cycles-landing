import { C, F } from '../tokens';

export function Section({ id, children, style }) {
  return (
    <section id={id} style={{
      padding: '80px 24px', maxWidth: 1100, margin: '0 auto', ...style,
    }}>
      {children}
    </section>
  );
}

export function SectionTitle({ tag, title, subtitle }) {
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
