import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const Cancel = () => {
  useEffect(() => {
    gsap.from('.cancel-reveal', { y: 20, opacity: 0, duration: 1, ease: 'power3.out' });
  }, []);

  return (
    <main style={{ minHeight: '100vh', background: 'var(--background)', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '2rem' }}>
      <div className="cancel-reveal" style={{ background: 'white', padding: '5rem 3rem', borderRadius: '30px', boxShadow: '0 25px 60px rgba(0,0,0,0.05)', maxWidth: '600px', border: '1px solid rgba(0,0,0,0.1)' }}>
        <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>⌛</div>
        <h1 style={{ fontSize: '3rem', color: 'var(--accent)', marginBottom: '1rem', fontFamily: 'Playfair Display, serif' }}>Payment Cancelled</h1>
        <p style={{ opacity: 0.7, fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '3rem' }}>
          No worries. Your delicacies are still waiting in your basket. Whenever you're ready, we're here to bake.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/order" style={{ background: 'var(--accent)', color: 'white', padding: '1.1rem 2.5rem', borderRadius: '50px', textDecoration: 'none', fontWeight: 700, letterSpacing: '1px' }}>RETURN TO BASKET</Link>
          <Link to="/" style={{ background: 'transparent', color: 'var(--accent)', border: '2px solid var(--accent)', padding: '1rem 2.5rem', borderRadius: '50px', textDecoration: 'none', fontWeight: 700, letterSpacing: '1px' }}>BROWSE MORE</Link>
        </div>
      </div>
    </main>
  );
};

export default Cancel;
