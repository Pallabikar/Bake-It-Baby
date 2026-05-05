import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import CartDrawer from './CartDrawer';

const Navbar = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinkStyle = {
    color: 'var(--accent)',
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: '0.85rem',
    letterSpacing: '0.5px',
    transition: 'opacity 0.2s',
    textTransform: 'uppercase',
    padding: '0.5rem 0'
  };

  const pillStyle = {
    padding: '0.4rem 1.2rem',
    borderRadius: '50px',
    fontWeight: 700,
    fontSize: '0.8rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    color: 'var(--accent)',
    border: '1px solid var(--accent)',
    background: 'transparent',
    fontFamily: 'inherit',
    letterSpacing: '0.5px'
  };

  const categories = [
    'BROWNIES', 'BISCUITS, COOKIES & CRACKERS', 
    'BREADS', 'CAKES', 
    'COMBOS', 'CROISSANT, DANISHES & MUFFINS', 
    'DESSERTS & CUPCAKES', 'PASTRIES', 
    'SANDWICHES & SAVOURIES', 'TEA CAKES', 
    'BEVERAGES', 'GIFTING', 
    'COLLECTIBLES', 'CHOCOLATES', 
    'MANGO SPECIALS'
  ];

  const mobileMenuStyle = {
    position: 'fixed',
    top: 0,
    right: isMobileMenuOpen ? 0 : '-100%',
    width: '80%',
    height: '100vh',
    background: 'white',
    zIndex: 2000,
    transition: 'right 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
    padding: '5rem 10%',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
    boxShadow: '-10px 0 30px rgba(0,0,0,0.05)'
  };

  return (
    <>
      {/* Top Promotional Banner */}
      <div style={{ textAlign: 'center', padding: '0.6rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent)', background: 'white', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        Upto Rs. 200 OFF on the First Order. T&C apply.
      </div>
      
      {/* Main Navigation */}
      <nav role="navigation" style={{ 
        background: 'white', 
        display: 'flex', 
        alignItems: 'stretch', 
        justifyContent: 'space-between', 
        padding: '0 5%', 
        borderBottom: '1px solid rgba(0,0,0,0.05)', 
        height: '80px', 
        position: 'sticky', 
        top: 0, 
        zIndex: 1000, 
        boxShadow: '0 4px 15px rgba(0,0,0,0.03)' 
      }}>
        
        {/* Logo Area */}
        <div className="nav-logo-container" style={{ 
          background: 'var(--primary)', 
          display: 'flex', 
          alignItems: 'center', 
          padding: '0 2rem', 
          marginLeft: '-5%' 
        }}>
          <Link to="/" style={{ 
            fontFamily: 'Playfair Display, serif', 
            fontSize: '1.8rem', 
            color: 'white', 
            textDecoration: 'none', 
            fontStyle: 'italic', 
            letterSpacing: '1px',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
          }}>
            bake it baby
          </Link>
        </div>

        {/* Desktop Navigation Links & Actions */}
        <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link to="/about" style={navLinkStyle}>ABOUT US</Link>
          
          {/* Products Dropdown Trigger */}
          <div 
            style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center' }}
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <Link to="/menu" style={navLinkStyle}>PRODUCTS</Link>
            
            {/* Dropdown Menu Container */}
            {isDropdownOpen && (
              <div style={{ 
                position: 'absolute', 
                top: '100%', 
                left: '50%', 
                transform: 'translateX(-50%)', 
                background: 'white', 
                boxShadow: '0 10px 40px rgba(0,0,0,0.08)', 
                padding: '2.5rem 3rem', 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '1.2rem 4rem',
                width: '700px',
                zIndex: 1001,
                borderTop: '2px solid rgba(0,0,0,0.03)'
              }}>
                {categories.map(cat => (
                  <Link 
                    key={cat} 
                    to={`/menu?category=${cat.toLowerCase().replace(/ & /g, '-').replace(/, /g, '-').replace(/ /g, '-')}`} 
                    style={{ 
                      color: 'var(--accent)', 
                      textDecoration: 'none', 
                      fontSize: '0.85rem', 
                      fontWeight: 600, 
                      transition: 'color 0.2s',
                      textTransform: 'uppercase',
                      display: 'block'
                    }}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/gallery" style={navLinkStyle}>SPECIALITY CAKES</Link>
          <Link to="/contact" style={navLinkStyle}>CONTACT US</Link>

          {/* Action Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '1rem' }}>
            <button 
              onClick={() => {
                const themes = ['classic', 'moody', 'pastel', 'dark'];
                const current = document.documentElement.getAttribute('data-theme') || 'classic';
                const next = themes[(themes.indexOf(current) + 1) % themes.length];
                document.documentElement.setAttribute('data-theme', next);
                localStorage.setItem('theme', next);
              }}
              style={{ ...pillStyle, width: '40px', padding: '0.4rem', justifyContent: 'center' }}
              aria-label="Change Color Theme"
            >
              🎨
            </button>
            <button 
              onClick={() => setIsCartOpen(true)} 
              style={{ 
                ...pillStyle, 
                background: 'rgba(243, 198, 203, 0.5)', 
                color: 'var(--accent)'
              }}
            >
              ORDER ONLINE ({cart.length})
            </button>
          </div>
        </div>

        {/* Mobile Hamburger Icon */}
        <div className="mobile-nav-toggle" style={{ alignItems: 'center', gap: '1.5rem' }}>
          <button onClick={() => setIsCartOpen(true)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', color: 'var(--accent)', cursor: 'pointer' }} aria-label="Open Shopping Bag">🛒</button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            style={{ background: 'none', border: 'none', fontSize: '2rem', color: 'var(--accent)', cursor: 'pointer' }}
            aria-label={isMobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Sidebar Menu */}
        <div style={mobileMenuStyle}>
          <Link to="/menu" onClick={() => setIsMobileMenuOpen(false)} style={{ ...navLinkStyle, fontSize: '1.5rem' }}>Products</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} style={{ ...navLinkStyle, fontSize: '1.5rem' }}>Our Story</Link>
          <Link to="/gallery" onClick={() => setIsMobileMenuOpen(false)} style={{ ...navLinkStyle, fontSize: '1.5rem' }}>Speciality Cakes</Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} style={{ ...navLinkStyle, fontSize: '1.5rem' }}>Contact</Link>
          <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} style={{ ...navLinkStyle, fontSize: '1.5rem' }}>Login / Signup</Link>
          <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '2rem' }}>
            <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>© 2026 Bake It Baby Patisserie</p>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div 
            onClick={() => setIsMobileMenuOpen(false)} 
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.2)', zIndex: 1999 }}
          ></div>
        )}
      </nav>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
