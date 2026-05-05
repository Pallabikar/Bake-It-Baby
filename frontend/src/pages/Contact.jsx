import React, { useState, useEffect } from 'react';
import gsap from 'gsap';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    gsap.from('.contact-reveal', { y: 30, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out', clearProps: 'all' });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      {/* 1. Hero Section */}
      <section style={{ background: '#E3F2E1', padding: '10rem 5% 6rem', textAlign: 'center' }}>
        <div className="contact-reveal">
          <h1 style={{ fontSize: '3.5rem', color: '#9A7B4F', marginBottom: '1rem', fontFamily: 'Playfair Display, serif' }}>Contact Our Patisserie</h1>
          <div style={{ width: '60px', height: '2px', background: '#9A7B4F', margin: '0 auto 2rem' }}></div>
          <p style={{ color: '#333333', opacity: 0.8, maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem', lineHeight: '1.8' }}>
            From bespoke celebration cakes to bulk corporate orders, we are here to help you find the perfect sweet note.
          </p>
        </div>
      </section>

      {/* 2. Main Contact Grid */}
      <section className="contact-grid">
        
        {/* Left: Form */}
        <div className="contact-reveal">
          <h2 style={{ fontSize: '2.2rem', color: '#9A7B4F', marginBottom: '2rem' }}>Send an Inquiry</h2>
          {submitted ? (
            <div style={{ padding: '3rem', background: '#E3F2E1', borderRadius: '20px', textAlign: 'center', border: '2px solid #9A7B4F' }}>
              <h3 style={{ color: '#9A7B4F', marginBottom: '1rem' }}>Inquiry Received</h3>
              <p style={{ color: '#333333', opacity: 0.8 }}>Our concierge team will respond to your request within 24 hours. Stay sweet!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
              <div className="contact-form-row">
                <input type="text" placeholder="Full Name" required style={{ padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)', background: '#fdfbf7', fontFamily: 'Outfit, sans-serif' }} />
                <input type="email" placeholder="Email Address" required style={{ padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)', background: '#fdfbf7', fontFamily: 'Outfit, sans-serif' }} />
              </div>
              <input type="text" placeholder="Subject (e.g., Wedding Catering)" required style={{ padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)', background: '#fdfbf7', fontFamily: 'Outfit, sans-serif' }} />
              <textarea placeholder="Tell us about your requirements..." rows="6" required style={{ padding: '1.2rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.1)', background: '#fdfbf7', fontFamily: 'Outfit, sans-serif', resize: 'vertical' }}></textarea>
              <button type="submit" style={{ background: '#9A7B4F', color: 'white', padding: '1.2rem', borderRadius: '50px', border: 'none', fontWeight: 700, cursor: 'pointer', letterSpacing: '1px', transition: 'transform 0.3s' }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
                SEND MESSAGE
              </button>
            </form>
          )}
        </div>

        {/* Right: Info & Locations */}
        <div className="contact-reveal">
          <h2 style={{ fontSize: '2.2rem', color: '#9A7B4F', marginBottom: '2rem' }}>Our Locations</h2>
          
          <div style={{ display: 'grid', gap: '2rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ width: '40px', height: '40px', background: '#F3C6CB', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>📍</div>
              <div>
                <h4 style={{ color: '#9A7B4F', marginBottom: '0.5rem' }}>Flagship Store</h4>
                <p style={{ opacity: 0.7, fontSize: '0.95rem', lineHeight: '1.6' }}>123 Heritage Lane, Artisanal District, <br/>Mumbai, Maharashtra 400001</p>
                <p style={{ color: '#9A7B4F', fontWeight: 700, fontSize: '0.85rem', marginTop: '0.5rem' }}>View on Maps →</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ width: '40px', height: '40px', background: '#E3F2E1', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>📞</div>
              <div>
                <h4 style={{ color: '#9A7B4F', marginBottom: '0.5rem' }}>Guest Services</h4>
                <p style={{ opacity: 0.7, fontSize: '0.95rem' }}>Monday – Sunday: 9:00 AM – 9:00 PM</p>
                <p style={{ color: '#9A7B4F', fontWeight: 700, fontSize: '1.1rem', marginTop: '0.5rem' }}>+91 (22) 2345-6789</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ width: '40px', height: '40px', background: '#F3C6CB', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>✉️</div>
              <div>
                <h4 style={{ color: '#9A7B4F', marginBottom: '0.5rem' }}>Direct Inquiries</h4>
                <p style={{ opacity: 0.7, fontSize: '0.95rem' }}>For corporate orders & catering</p>
                <p style={{ color: '#9A7B4F', fontWeight: 700, fontSize: '1.1rem', marginTop: '0.5rem' }}>hello@bakeitbaby.com</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '4rem', padding: '2rem', background: '#fdfbf7', borderRadius: '15px', border: '1px solid #F3C6CB' }}>
            <h4 style={{ color: '#9A7B4F', marginBottom: '1rem' }}>Bespoke Gifting</h4>
            <p style={{ fontSize: '0.9rem', opacity: 0.7, lineHeight: '1.6' }}>Planning a wedding or a corporate event? Our gifting specialists can curate custom boxes with our finest signatures. Connect with us at gifting@bakeitbaby.com</p>
          </div>
        </div>
      </section>

      {/* 3. Map Section (Visual) */}
      <section style={{ height: '500px', width: '100%', position: 'relative', overflow: 'hidden', background: '#eee' }}>
        <img src="/watercolor_bakery.png" alt="Store Map" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ background: 'white', padding: '2rem 4rem', borderRadius: '50px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', color: '#9A7B4F', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '2px' }}>
             FIND A STORE NEAR YOU
          </div>
        </div>
      </section>

      {/* 4. FAQ Section */}
      <section style={{ padding: '6rem 10%', background: '#fdfbf7' }}>
        <h2 style={{ fontSize: '2.5rem', color: '#9A7B4F', textAlign: 'center', marginBottom: '4rem' }}>Frequently Asked Inquiries</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { q: 'How far in advance should I order?', a: 'For standard treats, 24 hours is perfect. For bespoke celebration cakes, we appreciate 3–5 days notice.' },
            { q: 'Do you offer eggless options?', a: 'Yes! A vast majority of our brownies and cakes are available in eggless variants without compromising on texture.' },
            { q: 'Can I customize my gifting hamper?', a: 'Absolutely. You can select any items from our menu and our gifting specialists will curate them in our signature boxes.' },
            { q: 'Do you handle corporate catering?', a: 'We do. We provide specialized menus for office events, meetings, and large-scale corporate celebrations.' }
          ].map((faq, i) => (
            <div key={i} className="contact-reveal">
              <h4 style={{ color: '#9A7B4F', marginBottom: '1rem', fontSize: '1.1rem' }}>Q: {faq.q}</h4>
              <p style={{ opacity: 0.7, fontSize: '0.95rem', lineHeight: '1.6' }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Contact;
