import React, { useState, useContext, useEffect } from 'react';
import gsap from 'gsap';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Order = () => {
  const { user } = useContext(AuthContext);
  const { cart, removeFromCart, cartTotal, clearCart, addToCart } = useContext(CartContext);
  const [checkedOut, setCheckedOut] = useState(false);
  const [shopItems, setShopItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/menu');
        setShopItems(res.data.slice(0, 4));
      } catch (err) {
        console.error('Error fetching menu items', err);
      }
    };
    fetchItems();
    
    gsap.from('.order-content', { y: 30, opacity: 0, duration: 1, stagger: 0.2 });
  }, []);

  const handleCheckout = async () => {
    if (!user) {
      alert('Please log in to place an order.');
      return;
    }

    if (cart.length > 0) {
      try {
        const token = localStorage.getItem('token');
        
        // 1. Create Stripe Checkout Session
        const res = await axios.post('http://localhost:5000/api/payments/create-checkout-session', {
          items: cart
        }, {
          headers: { 'x-auth-token': token }
        });

        // 2. Also save order to our DB (as pending)
        await axios.post('http://localhost:5000/api/orders', {
          items: cart,
          total: cartTotal
        }, {
          headers: { 'x-auth-token': token }
        });

        // 3. Redirect to Stripe
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      } catch (err) {
        alert('Payment initialization failed: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  return (
    <main style={{ background: 'var(--background)' }}>
      {/* Hero Section */}
      <section style={{ background: 'var(--secondary)', padding: '8rem 5% 4rem', textAlign: 'center' }}>
        <div className="order-content">
          <h1 style={{ fontSize: '3.5rem', color: 'var(--accent)', marginBottom: '1rem' }}>Your Selection</h1>
          <div style={{ width: '50px', height: '2px', background: 'var(--accent)', margin: '0 auto 1.5rem' }}></div>
          <p style={{ color: 'var(--text)', opacity: 0.8, maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
            Review your carefully chosen delicacies before we begin preparing them.
          </p>
        </div>
      </section>

      {/* Order Layout */}
      <section style={{ padding: '5rem 10%', background: 'white' }}>
        <div className="order-layout" style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap', maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Menu Suggestions */}
          <div className="order-content" style={{ flex: 2, minWidth: '300px' }}>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--accent)', marginBottom: '2rem' }}>Freshly Baked Additions</h2>
            
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              {shopItems.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '15px', background: 'var(--background)', transition: 'transform 0.3s', boxShadow: '0 5px 15px rgba(0,0,0,0.02)' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(5px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                >
                  <div style={{ width: '80px', height: '80px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
                    <img src={item.image || '/aesthetic_pastries_1776934841310.png'} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--accent)', marginBottom: '0.2rem' }}>{item.name}</h3>
                    <p style={{ fontWeight: 600, color: 'var(--text)' }}>${parseFloat(item.price).toFixed(2)}</p>
                  </div>
                  <button 
                    onClick={() => addToCart(item)} 
                    style={{ background: 'var(--secondary)', color: 'var(--text)', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '50px', cursor: 'pointer', fontWeight: 600, transition: 'background 0.3s' }}
                    onMouseEnter={(e) => e.target.style.background = 'var(--primary)'}
                    onMouseLeave={(e) => e.target.style.background = 'var(--secondary)'}
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
            
            <div style={{ marginTop: '4rem', padding: '3rem', background: 'var(--primary)', borderRadius: '20px', textAlign: 'center', boxShadow: '0 10px 30px rgba(243, 198, 203, 0.3)' }}>
              <h3 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '1rem' }}>Artisanal Hampers</h3>
              <p style={{ color: 'white', opacity: 0.9, marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem' }}>
                Curate a beautiful box of our finest pastries for a loved one. Wrapped with our signature ribbon.
              </p>
              <button style={{ background: 'white', color: 'var(--accent)', border: 'none', padding: '0.8rem 2.5rem', borderRadius: '50px', fontWeight: 700, cursor: 'pointer' }}>
                View Hampers
              </button>
            </div>
          </div>
          
          {/* Cart Summary */}
          <div className="order-content" style={{ flex: 1, minWidth: '350px' }}>
            <div className="cart-summary-sticky" style={{ position: 'sticky', top: '100px', padding: '2.5rem', background: 'var(--background)', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 15px 40px rgba(0,0,0,0.04)' }}>
              <h2 style={{ fontSize: '1.8rem', color: 'var(--accent)', marginBottom: '2rem', textAlign: 'center' }}>Your Basket</h2>
              
              {cart.length === 0 ? (
                <p style={{ textAlign: 'center', opacity: 0.6, padding: '2rem 0' }}>Your basket is currently empty.</p>
              ) : (
                <div style={{ maxHeight: '350px', overflowY: 'auto', marginBottom: '1.5rem', paddingRight: '10px' }}>
                  {cart.map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', paddingBottom: '1.2rem', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                      <div>
                        <span style={{ fontWeight: 600, color: 'var(--text)', display: 'block', marginBottom: '0.2rem' }}>{item.name}</span>
                        <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>${item.price.toFixed(2)}</span>
                      </div>
                      <button onClick={() => removeFromCart(item.cartId)} style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '1.2rem', padding: '5px' }}>&times;</button>
                    </div>
                  ))}
                </div>
              )}
              
              <div style={{ borderTop: '2px solid rgba(0,0,0,0.05)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.2rem', color: 'var(--accent)', marginBottom: '2rem' }}>
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <button style={{ flex: 1, padding: '0.8rem', borderRadius: '10px', border: '1px solid var(--accent)', background: 'var(--accent)', color: 'white', fontWeight: 600, cursor: 'pointer' }}>Delivery</button>
                <button style={{ flex: 1, padding: '0.8rem', borderRadius: '10px', border: '1px solid var(--accent)', background: 'transparent', color: 'var(--accent)', fontWeight: 600, cursor: 'pointer' }}>Store Pickup</button>
              </div>
              
              <textarea 
                placeholder="Special instructions for the baker..." 
                style={{ width: '100%', marginBottom: '2rem', padding: '1rem', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.1)', fontFamily: 'Outfit, sans-serif', resize: 'vertical', minHeight: '80px', background: 'white' }}
              ></textarea>

              <button 
                onClick={handleCheckout}
                disabled={cart.length === 0}
                style={{ 
                  width: '100%', 
                  padding: '1.2rem', 
                  background: cart.length > 0 ? 'var(--accent)' : 'rgba(0,0,0,0.1)', 
                  color: cart.length > 0 ? 'white' : 'rgba(0,0,0,0.4)', 
                  border: 'none', 
                  borderRadius: '50px', 
                  fontWeight: 700, 
                  fontSize: '1rem', 
                  cursor: cart.length > 0 ? 'pointer' : 'not-allowed',
                  transition: 'background 0.3s'
                }}
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Overlay */}
      {checkedOut && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(255,255,255,0.95)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 3000, backdropFilter: 'blur(10px)' }}>
          <div style={{ textAlign: 'center', background: 'white', padding: '4rem', borderRadius: '20px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--accent)', marginBottom: '1rem' }}>Order Confirmed</h2>
            <div style={{ width: '40px', height: '2px', background: 'var(--secondary)', margin: '0 auto 1.5rem' }}></div>
            <p style={{ fontSize: '1.1rem', color: 'var(--text)', opacity: 0.8 }}>Your elegant pastries are being carefully prepared.</p>
          </div>
        </div>
      )}
    </main>
  );
};

export default Order;
