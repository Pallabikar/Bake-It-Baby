import React, { useState, useEffect, useContext } from 'react';
import gsap from 'gsap';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import staticItems from '../data/menuData';

const Menu = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const { addToCart } = useContext(CartContext);

  const categories = [
    'all', 'brownies', 'biscuits, cookies & crackers', 'breads', 'cakes', 
    'combos', 'croissant, danishes & muffins', 'desserts & cupcakes', 
    'pastries', 'sandwiches & savouries', 'tea cakes', 'beverages', 
    'gifting', 'collectibles', 'chocolates', 'mango specials'
  ];

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/menu');
        if (response.data.length > 0) setItems(response.data);
        else setItems(staticItems);
      } catch (err) {
        setItems(staticItems);
      }
    };
    fetchMenu();

    gsap.from('.menu-hero-content', { y: 50, opacity: 0, duration: 1 });
  }, []);

  return (
    <main style={{ background: 'var(--background)' }}>
      {/* Elegant Hero */}
      <section style={{ background: 'var(--secondary)', padding: '8rem 5% 4rem', textAlign: 'center' }}>
        <div className="menu-hero-content">
          <h1 style={{ fontSize: '3rem', color: 'var(--accent)', marginBottom: '1rem' }}>Our Artisanal Menu</h1>
          <div style={{ width: '50px', height: '2px', background: 'var(--accent)', margin: '0 auto 1.5rem' }}></div>
          <p style={{ color: 'var(--text)', opacity: 0.8, maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
            Handcrafted daily with the finest ingredients. From classic French viennoiserie to elegant celebration cakes.
          </p>
        </div>
      </section>

      {/* Elegant Filters */}
      <section style={{ padding: '3rem 5%', background: 'white', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
          <input 
            type="text" 
            placeholder="Search our offerings..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ 
              padding: '1rem 2rem', 
              borderRadius: '50px', 
              border: '1px solid rgba(0,0,0,0.1)', 
              background: 'var(--background)', 
              width: '100%', 
              maxWidth: '450px',
              fontFamily: 'Outfit, sans-serif',
              textAlign: 'center',
              fontSize: '1rem',
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(0,0,0,0.1)'}
          />
          <div className="filter-scroll-container" style={{ 
            display: 'flex', 
            flexWrap: 'nowrap', 
            justifyContent: 'flex-start', 
            gap: '1rem',
            overflowX: 'auto',
            width: '100%',
            padding: '1rem 0',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
          }}>
            <style>{`
              .filter-scroll-container::-webkit-scrollbar { display: none; }
              @media (min-width: 769px) {
                .filter-scroll-container { flex-wrap: wrap; justify-content: center; }
              }
            `}</style>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  background: filter === cat ? 'var(--accent)' : 'transparent',
                  color: filter === cat ? 'white' : 'var(--text)',
                  border: filter === cat ? 'none' : '1px solid rgba(0,0,0,0.1)',
                  padding: '0.6rem 2rem',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontSize: '0.85rem',
                  transition: 'all 0.3s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid Section Header */}
      <section style={{ padding: '4rem 5% 2rem', textAlign: 'center', background: 'white' }}>
        <h2 style={{ fontSize: '2.5rem', color: 'var(--accent)', textTransform: 'capitalize', marginBottom: '1rem' }}>
          {filter === 'all' ? 'All Creations' : filter}
        </h2>
        <p style={{ maxWidth: '700px', margin: '0 auto', opacity: 0.6, fontSize: '0.95rem', lineHeight: '1.6' }}>
          {filter === 'all' && 'Explore our entire collection of 100+ artisanal treats, from the heart of our kitchen to yours.'}
          {filter === 'brownies' && 'Dense, fudgy, and decadently rich. Our signature brownies are a chocolate lover\'s ultimate dream.'}
          {filter === 'breads' && 'Ancient grain sourdoughs and classic European loaves, baked fresh every morning with traditional starters.'}
          {filter === 'cakes' && 'Elegance in every slice. Our celebration cakes are crafted with real cream and artisanal precision.'}
          {filter === 'pastries' && 'Authentic French viennoiserie, featuring 81 delicate layers of premium European butter.'}
          {filter === 'beverages' && 'The perfect companions for your treats, from ceremonial grade matcha to rich artisanal lattes.'}
          {filter === 'gifting' && 'Curated hampers and signature boxes, designed to make every occasion a legendary memory.'}
          {['all', 'brownies', 'breads', 'cakes', 'pastries', 'beverages', 'gifting'].indexOf(filter) === -1 && `Discover our curated selection of ${filter}, crafted with passion and precision.`}
        </p>
      </section>

      {/* Grid */}
      <section style={{ padding: '2rem 5% 5rem', background: 'white' }}>
        <div className="menu-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '3rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <style>{`
            @media (max-width: 768px) {
              .menu-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
            }
          `}</style>
          {items
            .filter(item => (filter === 'all' || item.category === filter) && item.name.toLowerCase().includes(search.toLowerCase()))
            .map((item, index) => (
              <div key={index} style={{ 
                background: 'var(--background)', 
                borderRadius: '15px', 
                overflow: 'hidden', 
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                border: '1px solid rgba(0,0,0,0.05)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(154, 123, 79, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.03)';
              }}
              >
                <div 
                  onClick={() => setSelectedItem(item)}
                  style={{ height: '250px', overflow: 'hidden', cursor: 'zoom-in' }}
                >
                  <img 
                    src={item.image || '/aesthetic_pastries_1776934841310.png'} 
                    alt={item.name} 
                    loading="lazy"
                    width="280"
                    height="250"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
                <div style={{ padding: '2rem', textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--accent)', marginBottom: '0.5rem' }}>{item.name}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text)', opacity: 0.7, marginBottom: '1.5rem', flexGrow: 1 }}>{item.desc || item.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--text)' }}>${parseFloat(item.price).toFixed(2)}</span>
                    <button 
                      onClick={() => addToCart({ ...item, id: index })}
                      style={{
                        background: 'var(--secondary)',
                        color: 'var(--text)',
                        border: 'none',
                        padding: '0.6rem 1.5rem',
                        borderRadius: '50px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        transition: 'all 0.3s',
                        letterSpacing: '1px'
                      }}
                      onMouseEnter={(e) => e.target.style.background = 'var(--primary)'}
                      onMouseLeave={(e) => e.target.style.background = 'var(--secondary)'}
                    >
                      ADD TO BAG
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
      {/* Product Detail Modal */}
      {selectedItem && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', zIndex: 2000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
          <div style={{ background: 'white', maxWidth: '1000px', width: '100%', maxHeight: '90vh', borderRadius: '30px', overflow: 'hidden', display: 'flex', flexWrap: 'wrap', position: 'relative' }}>
            <button onClick={() => setSelectedItem(null)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'var(--secondary)', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', zIndex: 10 }}>✕</button>
            
            <div style={{ flex: 1, minWidth: '400px', height: '500px' }}>
              <img src={selectedItem.image || '/aesthetic_pastries_1776934841310.png'} alt={selectedItem.name} loading="lazy" width="500" height="500" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            
            <div style={{ flex: 1, minWidth: '400px', padding: '3rem', overflowY: 'auto' }}>
              <span style={{ textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--primary)', fontWeight: 800, fontSize: '0.8rem' }}>{selectedItem.category}</span>
              <h2 style={{ fontSize: '2.5rem', color: 'var(--accent)', marginBottom: '1rem', fontFamily: 'Playfair Display, serif' }}>{selectedItem.name}</h2>
              <p style={{ opacity: 0.7, lineHeight: '1.8', marginBottom: '2rem' }}>{selectedItem.desc || selectedItem.description}</p>
              
              <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', padding: '1.5rem', background: 'var(--background)', borderRadius: '15px' }}>
                <div><span style={{ display: 'block', fontSize: '0.7rem', opacity: 0.5, fontWeight: 700 }}>CALORIES</span><span style={{ fontWeight: 800 }}>320 kcal</span></div>
                <div><span style={{ display: 'block', fontSize: '0.7rem', opacity: 0.5, fontWeight: 700 }}>ALLERGENS</span><span style={{ fontWeight: 800 }}>Dairy, Gluten</span></div>
                <div><span style={{ display: 'block', fontSize: '0.7rem', opacity: 0.5, fontWeight: 700 }}>SERVES</span><span style={{ fontWeight: 800 }}>1-2</span></div>
              </div>

              <div style={{ marginBottom: '3rem' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--accent)', marginBottom: '1rem' }}>Artisanal Reviews</h4>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {[
                    { u: 'Alicia R.', r: '⭐⭐⭐⭐⭐', c: 'The best croissant I’ve ever had outside Paris!' },
                    { u: 'Marco V.', r: '⭐⭐⭐⭐⭐', c: 'Incredible texture and perfectly balanced sweetness.' }
                  ].map((rev, i) => (
                    <div key={i} style={{ fontSize: '0.85rem', padding: '1rem', background: '#fdfbf7', borderRadius: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                        <span style={{ fontWeight: 800 }}>{rev.u}</span>
                        <span>{rev.r}</span>
                      </div>
                      <p style={{ opacity: 0.7 }}>"{rev.c}"</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '2rem', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent)' }}>${parseFloat(selectedItem.price).toFixed(2)}</span>
                <button 
                  onClick={() => { addToCart(selectedItem); setSelectedItem(null); }}
                  style={{ background: 'var(--accent)', color: 'white', padding: '1.2rem 3rem', borderRadius: '50px', border: 'none', fontWeight: 700, cursor: 'pointer', letterSpacing: '1px' }}
                >
                  ADD TO BAG
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Menu;
