import React, { useEffect } from 'react';
import gsap from 'gsap';

const About = () => {
  useEffect(() => {
    gsap.from('.about-reveal', { 
      y: 30, 
      opacity: 0,
      duration: 1, 
      stagger: 0.1, 
      ease: 'power3.out',
      clearProps: 'all'
    });
  }, []);

  const stats = [
    { label: 'Artisanal Products', value: '100+' },
    { label: 'Signature Stores', value: '15' },
    { label: 'Happy Guests', value: '50k+' },
    { label: 'Hand-laminated Layers', value: '81' }
  ];

  const team = [
    { name: 'Kainaz Messman', role: 'Founder & Visionary', bio: 'The heart behind the brand, bringing classic European techniques to our neighborhood.', img: '/bakery_vibe_1776934859373.png' },
    { name: 'Chef Julian', role: 'Head of Patisserie', bio: 'Master of the 3-day croissant process and guardian of our artisanal traditions.', img: '/aesthetic_pastries_1776934841310.png' },
    { name: 'Sarah Chen', role: 'Master Baker', bio: 'Curator of our decade-old sourdough starter and ancient grain breads.', img: '/sourdough_loaf.png' }
  ];

  return (
    <main style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      {/* 1. Hero Section */}
      <section className="about-hero" style={{ background: '#E3F2E1', padding: '10rem 5% 6rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="about-reveal">
          <h1 style={{ fontSize: '4rem', color: '#9A7B4F', marginBottom: '1rem', fontFamily: 'Playfair Display, serif' }}>The Patisserie Story</h1>
          <div style={{ width: '60px', height: '2px', background: '#9A7B4F', margin: '0 auto 2rem' }}></div>
          <p style={{ color: '#333333', maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem', lineHeight: '1.8', fontStyle: 'italic' }}>
            A journey of passion, precision, and the pursuit of the "Food of the Gods."
          </p>
        </div>
      </section>

      {/* 2. Brand Stats Section */}
      <section style={{ padding: '4rem 10%', background: '#F3C6CB', color: 'white' }}>
        <div className="about-reveal about-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', textAlign: 'center' }}>
          {stats.map((s, i) => (
            <div key={i}>
              <h2 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{s.value}</h2>
              <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', fontWeight: 700, opacity: 0.9 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. The Beginning */}
      <section style={{ padding: '8rem 10%', background: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '5rem', flexWrap: 'wrap' }}>
        <div className="about-reveal" style={{ flex: 1, minWidth: '350px' }}>
          <img src="/bakery_hero_1776934825336.png" alt="Our Heritage" style={{ width: '100%', borderRadius: '20px', boxShadow: '0 25px 50px rgba(0,0,0,0.08)', border: '10px solid white' }} />
        </div>
        <div className="about-reveal" style={{ flex: 1, minWidth: '350px' }}>
          <h2 style={{ fontSize: '2.8rem', color: '#9A7B4F', marginBottom: '2rem', lineHeight: '1.2' }}>Kneaded with Love</h2>
          <p style={{ fontSize: '1.1rem', color: '#333333', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            Bake It Baby was born from a single oven and a massive dream. We wanted to challenge the mass-produced bakery culture by reintroducing the patient art of slow fermentation and hand-craftsmanship.
          </p>
          <p style={{ fontSize: '1.1rem', color: '#333333', lineHeight: '1.8', marginBottom: '1.5rem' }}>
            Today, our website serves as a digital window into our flour-dusted world, connecting thousands of pastry lovers with 100+ unique, handcrafted treats delivered fresh daily.
          </p>
          <div style={{ padding: '1.5rem', borderLeft: '4px solid #F3C6CB', background: '#E3F2E1', borderRadius: '0 15px 15px 0' }}>
            <p style={{ fontStyle: 'italic', color: '#9A7B4F', fontWeight: 600 }}>"Our mission is to make the elite taste of a Parisian patisserie accessible to every home."</p>
          </div>
        </div>
      </section>

      {/* 4. Team Section */}
      <section style={{ padding: '8rem 10%', background: '#fdfbf7' }}>
        <div className="about-reveal" style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontSize: '3rem', color: '#9A7B4F', marginBottom: '1rem' }}>Masters of the Craft</h2>
          <div style={{ width: '60px', height: '2px', background: '#9A7B4F', margin: '0 auto' }}></div>
          <p style={{ marginTop: '1.5rem', color: '#333333', opacity: 0.7 }}>The hands and hearts behind your favorite delicacies.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          {team.map((member, i) => (
            <div key={i} className="about-reveal" style={{ background: 'white', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', textAlign: 'center' }}>
              <div style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 1.5rem', border: '5px solid #E3F2E1' }}>
                <img src={member.img} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '1.5rem', color: '#9A7B4F', marginBottom: '0.5rem' }}>{member.name}</h3>
              <p style={{ color: '#F3C6CB', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px', marginBottom: '1rem' }}>{member.role}</p>
              <p style={{ color: '#333333', opacity: 0.7, fontSize: '0.95rem', lineHeight: '1.6' }}>{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Website & Digital Experience Section */}
      <section style={{ padding: '8rem 10%', background: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5rem', flexWrap: 'wrap-reverse' }}>
          <div className="about-reveal" style={{ flex: 1, minWidth: '350px' }}>
            <h2 style={{ fontSize: '2.8rem', color: '#9A7B4F', marginBottom: '1.5rem' }}>Beyond the Oven</h2>
            <p style={{ fontSize: '1.1rem', color: '#333333', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              Our website is more than just a menu; it's a real-time connection to our kitchen. From live order tracking to artisanal collection management, we leverage technology to ensure your pastries are as fresh when they arrive as they were when they left the oven.
            </p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: '#F3C6CB', fontSize: '1.2rem' }}>✔</span> Real-time Order Tracking & Sync
              </li>
              <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: '#F3C6CB', fontSize: '1.2rem' }}>✔</span> 100+ Unique Artisanal Products
              </li>
              <li style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ color: '#F3C6CB', fontSize: '1.2rem' }}>✔</span> Secure Digital Payments & Logistics
              </li>
            </ul>
          </div>
          <div className="about-reveal" style={{ flex: 1, minWidth: '350px' }}>
            <img src="/watercolor_bakery.png" alt="Digital Bakery" style={{ width: '100%', borderRadius: '20px' }} />
          </div>
        </div>
      </section>

      {/* 6. Join Us CTA */}
      <section style={{ padding: '8rem 10%', background: '#E3F2E1', textAlign: 'center' }}>
        <div className="about-reveal">
          <h2 style={{ fontSize: '2.5rem', color: '#9A7B4F', marginBottom: '1.5rem' }}>Experience the Magic</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 3rem', color: '#333333', opacity: 0.8, lineHeight: '1.8' }}>
            From our family kitchen to your digital doorstep, we are honored to bake for you.
          </p>
          <button onClick={() => window.location.href='/menu'} style={{ background: '#9A7B4F', color: 'white', padding: '1.2rem 3rem', borderRadius: '50px', border: 'none', fontWeight: 700, cursor: 'pointer', letterSpacing: '1px' }}>EXPLORE THE COLLECTION</button>
        </div>
      </section>
    </main>
  );
};

export default About;
