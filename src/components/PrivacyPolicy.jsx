import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { C, F, APP_URL } from '../tokens';

export default function PrivacyPolicy() {
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
