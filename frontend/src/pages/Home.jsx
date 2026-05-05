import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const Home = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const slides = [
    {
      img: '/hero_cheesecakes.png',
      title: 'Slice into endless Cheesecake delight!',
      sub: 'IRRESISTIBLE SWEET TREATS'
    },
    {
      img: '/birthday_cake.png',
      title: 'Celebrate with our Birthday Vibe Cake!',
      sub: 'MEMORIES IN EVERY BITE'
    },
    {
      img: '/bento_cake.png',
      title: 'Minimalist aesthetic in a box.',
      sub: 'PERFECT FOR SMALL MOMENTS'
    },
    {
      img: '/aesthetic_pastries_1776934841310.png',
      title: 'Artisanal French Viennoiserie.',
      sub: 'HANDCRAFTED DAILY'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const heroImage = document.querySelector('.hero-image');
      if (heroImage) {
        const scrollValue = window.scrollY;
        heroImage.style.transform = `translateY(${scrollValue * 0.2}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main style={{ background: 'var(--background)' }}>
      {/* 1. Dynamic Hero Slider */}
      <section style={{ background: 'var(--secondary)', position: 'relative', overflow: 'hidden', minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        {slides.map((slide, index) => (
          <div 
            key={index} 
            style={{ 
              position: 'absolute', 
              inset: 0, 
              opacity: currentSlide === index ? 1 : 0, 
              transition: 'opacity 1.5s ease-in-out',
              zIndex: currentSlide === index ? 1 : 0 
            }}
          >
            <img 
              className="hero-image" 
              src={slide.img} 
              alt={slide.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} 
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent, var(--secondary) 80%)', zIndex: 1 }}></div>
          </div>
        ))}
        
        <div style={{ position: 'relative', zIndex: 2, marginLeft: 'auto', marginRight: '10%', maxWidth: '600px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3.5rem', color: 'var(--accent)', marginBottom: '0.5rem', textShadow: '2px 2px 10px rgba(255,255,255,0.8)', transition: 'all 0.5s' }}>
            {slides[currentSlide].title}
          </h1>
          <p style={{ letterSpacing: '2px', fontWeight: 700, color: 'var(--text)', marginBottom: '2rem' }}>
            {slides[currentSlide].sub}
          </p>
          <Link to="/menu" style={{ background: 'white', color: 'var(--accent)', padding: '1rem 3rem', borderRadius: '50px', textDecoration: 'none', fontWeight: 800, border: '2px solid var(--accent)', letterSpacing: '1px' }}>
            ORDER NOW
          </Link>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '3rem' }}>
            {slides.map((_, i) => (
              <div key={i} onClick={() => setCurrentSlide(i)} style={{ width: i === currentSlide ? '30px' : '10px', height: '10px', borderRadius: '10px', background: 'var(--accent)', cursor: 'pointer', transition: 'all 0.3s' }}></div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Brand Data Section */}
      <section style={{ padding: '5rem 10%', textAlign: 'center', background: 'white' }}>
        <h2 style={{ fontSize: '2.5rem', color: 'var(--accent)', marginBottom: '1rem' }}>Handcrafted with Purpose</h2>
        <div style={{ width: '50px', height: '2px', background: 'var(--secondary)', margin: '0 auto 3rem' }}></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', maxWidth: '1000px', margin: '0 auto 4rem' }}>
          {[
            { label: 'Fresh Batches Daily', value: '24/7' },
            { label: 'Authentic Ingredients', value: '100%' },
            { label: 'Happy Customers', value: '50,000+' },
            { label: 'Artisanal Recipes', value: '200+' }
          ].map((stat, i) => (
            <div key={i}>
              <h3 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>{stat.value}</h3>
              <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, opacity: 0.6 }}>{stat.label}</p>
            </div>
          ))}
        </div>
        <img src="/watercolor_bakery.png" alt="Bakery Illustration" style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }} />
      </section>

      {/* 3. Our Creations Grid */}
      <section style={{ padding: '6rem 5%', background: 'var(--primary)', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '1rem', textShadow: '1px 1px 10px rgba(0,0,0,0.1)' }}>Our Creations</h2>
        <div style={{ width: '50px', height: '2px', background: 'white', margin: '0 auto 3rem' }}></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {[
            { name: 'Artisanal Breads', img: '/sourdough_loaf.png', cat: 'breads' },
            { name: 'Celebration Cakes', img: '/birthday_cake.png', cat: 'cakes' },
            { name: 'French Pastries', img: '/aesthetic_pastries_1776934841310.png', cat: 'pastries' },
            { name: 'Chunky Cookies', img: '/chunky_cookies.png', cat: 'biscuits, cookies & crackers' },
            { name: 'Bento Box Cakes', img: '/bento_cake.png', cat: 'desserts & cupcakes' },
            { name: 'Gourmet Brownies', img: '/chunky_cookies.png', cat: 'brownies' },
            { name: 'Morning Croissants', img: '/aesthetic_pastries_1776934841310.png', cat: 'croissant, danishes & muffins' },
            { name: 'Matcha & Lattes', img: '/matcha_sip.png', cat: 'beverages' }
          ].map((item, i) => (
            <Link to={`/menu?category=${item.cat}`} key={i} style={{ textDecoration: 'none', color: 'white' }}>
              <div style={{ width: '100%', aspectRatio: '1/1', borderRadius: '20px', overflow: 'hidden', border: '6px solid white', boxShadow: '0 15px 30px rgba(0,0,0,0.1)', marginBottom: '1rem', background: 'white' }}>
                <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '1.1rem', letterSpacing: '1px', fontWeight: 700 }}>{item.name}</h3>
            </Link>
          ))}
        </div>
        <Link to="/menu" style={{ display: 'inline-block', marginTop: '4rem', background: 'white', color: 'var(--primary)', padding: '1rem 3rem', borderRadius: '50px', textDecoration: 'none', fontWeight: 800, letterSpacing: '1px' }}>VIEW FULL MENU</Link>
      </section>

      {/* 4. Gifting Split */}
      <section style={{ padding: '6rem 10%', background: 'white', display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--accent)', marginBottom: '1rem' }}>Bespoke Gifting</h2>
          <p style={{ opacity: 0.8, marginBottom: '2rem' }}>Every celebration deserves a touch of elegance. Our customized hampers are curated with our finest signatures and wrapped in our legendary pastel style.</p>
          <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
            <div><h4 style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>15+</h4><p style={{ fontSize: '0.7rem', opacity: 0.6 }}>HAMPER STYLES</p></div>
            <div><h4 style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>100%</h4><p style={{ fontSize: '0.7rem', opacity: 0.6 }}>CUSTOMIZABLE</p></div>
          </div>
          <Link to="/menu?category=gifting" style={{ background: 'var(--secondary)', padding: '0.8rem 2.5rem', borderRadius: '50px', color: 'var(--text)', textDecoration: 'none', fontWeight: 700 }}>EXPLORE HAMPERS</Link>
        </div>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <img src="/cookie_box_aesthetic_1776935087110.png" alt="Hampers" style={{ width: '100%', borderRadius: '15px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
        </div>
      </section>

      {/* 5. Our Bestsellers (With Real-World Data Vibe) */}
      <section style={{ padding: '6rem 10%', background: '#fdfbf7' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: 'var(--accent)', marginBottom: '3rem' }}>Our Bestsellers</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem' }}>
          {[
            { n: 'Signature Sourdough', img: '/sourdough_loaf.png', d: '5000+ Sold' },
            { n: 'Overload Brownie', img: '/chunky_cookies.png', d: '8200+ Sold' },
            { n: 'Bento Celebration', img: '/bento_cake.png', d: '1200+ Sold' },
            { n: 'Matcha Sip', img: '/matcha_sip.png', d: '3000+ Sold' }
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center', background: 'white', padding: '1.5rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
              <img src={item.img} alt={item.n} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: '15px', marginBottom: '1.5rem' }} />
              <h3 style={{ fontSize: '1.1rem', color: '#333', marginBottom: '0.5rem' }}>{item.n}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700 }}>⭐ {item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Social Feed Section */}
      <section style={{ padding: '6rem 5%', background: 'white', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.2rem', color: 'var(--accent)', marginBottom: '3rem' }}>Join the World of @BakeItBaby</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {['/bakery_vibe_1776934859373.png', '/matcha_sip.png', '/savory_focaccia.png', '/birthday_cake.png', '/cookie_box_aesthetic_1776935087110.png', '/bakery_hero_1776934825336.png'].map((src, i) => (
            <div key={i} style={{ aspectRatio: '1', overflow: 'hidden', borderRadius: '15px' }}>
              <img src={src} alt="Social Feed" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </section>

      {/* 7. Final CTA */}
      <section style={{ padding: '8rem 10%', background: 'var(--primary)', textAlign: 'center', color: 'white' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Artisanal Magic, <br/> Delivered.</h2>
        <p style={{ marginBottom: '3.5rem', opacity: 0.9, letterSpacing: '1px', fontWeight: 600 }}>TREAT YOURSELF TO THE FOOD OF THE GODS</p>
        <Link to="/menu" style={{ background: 'white', color: 'var(--accent)', padding: '1.2rem 4rem', borderRadius: '50px', textDecoration: 'none', fontWeight: 800, letterSpacing: '1px', boxShadow: '0 15px 40px rgba(0,0,0,0.1)' }}>
          ORDER ONLINE
        </Link>
      </section>
    </main>
  );
};

export default Home;
