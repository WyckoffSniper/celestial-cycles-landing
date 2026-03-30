import { useState } from 'react';
import { C } from '../tokens';
import Lightbox from './Lightbox';
import Nav from './Nav';
import Hero from './Hero';
import CaseStudy from './CaseStudy';
import Features from './Features';
import Compare from './Compare';
import Convergence from './Convergence';
import HowItWorks from './HowItWorks';
import Pricing from './Pricing';
import FAQ from './FAQ';
import FinalCTA from './FinalCTA';
import Footer from './Footer';

export default function LandingPage() {
  const [lightbox, setLightbox] = useState(null);
  const openLightbox = (src, alt) => setLightbox({ src, alt });

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", color: C.text, background: 'var(--bg)', minHeight: '100vh', overflowX: 'hidden' }}>
      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
      <Nav />
      <Hero />
      <CaseStudy onOpenLightbox={openLightbox} />
      <Features />
      <Compare />
      <Convergence />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
