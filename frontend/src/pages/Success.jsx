import React, { useEffect, useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import gsap from 'gsap';

const Success = () => {
  const { clearCart } = useContext(CartContext);
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    clearCart();
    gsap.from('.success-reveal', { scale: 0.9, opacity: 0, duration: 1, stagger: 0.2, ease: 'back.out(1.7)' });
  }, []);

  return (
    <main style={{ minHeight: '100vh', background: 'var(--background)', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '2rem' }}>
      <div className="success-reveal" style={{ background: 'white', padding: '5rem 3rem', borderRadius: '30px', boxShadow: '0 25px 60px rgba(0,0,0,0.05)', maxWidth: '600px', border: '2px solid var(--secondary)' }}>
        <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>✨</div>
        <h1 style={{ fontSize: '3rem', color: 'var(--accent)', marginBottom: '1rem', fontFamily: 'Playfair Display, serif' }}>Payment Successful</h1>
        <p style={{ opacity: 0.7, fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2.5rem' }}>
          Your artisanal treats are now secured. Our bakers have been notified and are already pre-heating the ovens.
        </p>
        <div style={{ marginBottom: '3rem', padding: '1rem', background: 'var(--secondary)', borderRadius: '15px' }}>
          <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent)' }}>Order ID Ref: {sessionId?.slice(-8).toUpperCase() || 'BAKED-772'}</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/profile" style={{ background: 'var(--accent)', color: 'white', padding: '1.1rem 2.5rem', borderRadius: '50px', textDecoration: 'none', fontWeight: 700, letterSpacing: '1px' }}>TRACK ORDER</Link>
          <Link to="/" style={{ background: 'transparent', color: 'var(--accent)', border: '2px solid var(--accent)', padding: '1rem 2.5rem', borderRadius: '50px', textDecoration: 'none', fontWeight: 700, letterSpacing: '1px' }}>HOME</Link>
        </div>
      </div>
    </main>
  );
};

export default Success;
