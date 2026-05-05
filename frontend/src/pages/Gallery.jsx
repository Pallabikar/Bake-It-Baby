import React, { useState, useEffect } from 'react';
import gsap from 'gsap';

const Gallery = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setRotation(scrolled * 0.2);
    };

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      gsap.to('.scroller-3d', { rotateY: rotation + x, rotateX: -y, duration: 0.5 });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    gsap.from('.gallery-header', { y: 30, opacity: 0, duration: 1, clearProps: 'all' });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [rotation]);

  const items = [
    { src: '/bakery_hero_1776934825336.png', title: 'The Morning Glow', desc: 'Capturing the first light hitting our golden croissants.' },
    { src: '/aesthetic_pastries_1776934841310.png', title: 'Flaky Layers', desc: '81 layers of hand-laminated European butter.' },
    { src: '/bakery_vibe_1776934859373.png', title: 'Artisanal Hands', desc: 'The dedication behind every single loaf of bread.' },
    { src: '/cookie_box_aesthetic_1776935087110.png', title: 'Signature Hampers', desc: 'Wrapped with love, delivered with elegance.' },
    { src: '/hero_cheesecakes.png', title: 'Velvet Dreams', desc: 'Our signature Philadelphia-style cheesecakes.' },
    { src: '/birthday_cake.png', title: 'Celebration Art', desc: 'Because every milestone deserves a masterpiece.' },
  ];

  return (
    <main style={{ background: 'var(--background)', minHeight: '150vh', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, var(--secondary) 0%, transparent 70%)', opacity: 0.5, zIndex: 0, pointerEvents: 'none' }}></div>
      
      <div className="gallery-container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="gallery-header" style={{ textAlign: 'center', paddingTop: '120px', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '3.5rem', color: 'var(--accent)', marginBottom: '1rem', fontFamily: 'Playfair Display, serif' }}>The Art of the Patisserie</h1>
          <div style={{ width: '50px', height: '2px', background: 'var(--accent)', margin: '0 auto 1.5rem' }}></div>
          <p style={{ color: 'var(--text)', opacity: 0.8, fontSize: '1.1rem' }}>A visual journey through our kitchen's most iconic moments.</p>
        </div>

        <div className="scroller-3d-wrap" style={{ perspective: '1200px', height: '650px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="scroller-3d" style={{ transformStyle: 'preserve-3d', position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {items.map((item, i) => (
              <div 
                key={i} 
                className="scroller-item" 
                style={{ 
                  '--ry': `${i * 60}deg`, 
                  '--tz': '450px',
                  position: 'absolute', 
                  width: '350px', 
                  height: '480px', 
                  transform: `rotateY(var(--ry)) translateZ(var(--tz))`,
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.15)',
                  border: '10px solid white',
                  background: 'white',
                  transition: 'transform 0.3s'
                }}
              >
                <div style={{ width: '100%', height: '75%', overflow: 'hidden' }}>
                  <img src={item.src} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '1.5rem', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--accent)', marginBottom: '0.5rem' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.85rem', opacity: 0.7, lineHeight: '1.4' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div style={{ position: 'absolute', bottom: '5%', left: '0', width: '100%', textAlign: 'center', opacity: 0.5 }}>
        <p style={{ fontStyle: 'italic', color: 'var(--accent)', letterSpacing: '2px' }}>SCROLL TO EXPLORE OUR WORLD</p>
      </div>
    </main>
  );
};

export default Gallery;
