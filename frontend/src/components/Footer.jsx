import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ background: 'var(--accent)', color: 'white', padding: '5rem 10% 2rem', marginTop: 'auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
        {/* Brand Section */}
        <div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--secondary)' }}>bake it baby</h2>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.8', opacity: 0.8, marginBottom: '2rem' }}>
            Handcrafting moments of sweetness with authentic recipes and artisanal passion. A tribute to the classic patisserie tradition.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span style={{ cursor: 'pointer', opacity: 0.8 }}>Instagram</span>
            <span style={{ cursor: 'pointer', opacity: 0.8 }}>Facebook</span>
            <span style={{ cursor: 'pointer', opacity: 0.8 }}>LinkedIn</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '2rem', color: 'var(--secondary)' }}>Our Offerings</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '1rem' }}><Link to="/menu" style={{ color: 'white', textDecoration: 'none', opacity: 0.7 }}>Full Menu</Link></li>
            <li style={{ marginBottom: '1rem' }}><Link to="/menu?category=cakes" style={{ color: 'white', textDecoration: 'none', opacity: 0.7 }}>Celebration Cakes</Link></li>
            <li style={{ marginBottom: '1rem' }}><Link to="/menu?category=gifting" style={{ color: 'white', textDecoration: 'none', opacity: 0.7 }}>Gifting Boxes</Link></li>
            <li style={{ marginBottom: '1rem' }}><Link to="/menu?category=brownies" style={{ color: 'white', textDecoration: 'none', opacity: 0.7 }}>Legendary Brownies</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '2rem', color: 'var(--secondary)' }}>Guest Support</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '1rem' }}><Link to="/about" style={{ color: 'white', textDecoration: 'none', opacity: 0.7 }}>Our Story</Link></li>
            <li style={{ marginBottom: '1rem' }}><Link to="/contact" style={{ color: 'white', textDecoration: 'none', opacity: 0.7 }}>Find a Store</Link></li>
            <li style={{ marginBottom: '1rem' }}><Link to="/contact" style={{ color: 'white', textDecoration: 'none', opacity: 0.7 }}>Contact Us</Link></li>
            <li style={{ marginBottom: '1rem' }}><Link to="/order" style={{ color: 'white', textDecoration: 'none', opacity: 0.7 }}>Track Order</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '2rem', color: 'var(--secondary)' }}>Join Our World</h4>
          <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '1.5rem' }}>Subscribe for updates on our latest seasonal drops and exclusive offers.</p>
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '0.5rem' }}>
            <input 
              type="email" 
              placeholder="Your email address" 
              style={{ background: 'none', border: 'none', color: 'white', flex: 1, outline: 'none', fontFamily: 'Outfit, sans-serif' }} 
            />
            <button style={{ background: 'none', border: 'none', color: 'var(--secondary)', fontWeight: 700, cursor: 'pointer' }}>JOIN</button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>&copy; 2026 Bake It Baby Patisserie. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.8rem', opacity: 0.6 }}>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
