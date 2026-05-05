import React, { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, cartTotal } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      gsap.to('.cart-drawer-overlay', { opacity: 1, display: 'block', duration: 0.3 });
      gsap.to('.cart-drawer-panel', { x: 0, duration: 0.5, ease: 'power4.out' });
    } else {
      gsap.to('.cart-drawer-panel', { x: '100%', duration: 0.5, ease: 'power4.in' });
      gsap.to('.cart-drawer-overlay', { opacity: 0, display: 'none', duration: 0.3, delay: 0.2 });
    }
  }, [isOpen]);

  const handleGoToBag = () => {
    onClose();
    navigate('/order');
  };

  return (
    <>
      <div className="cart-drawer-overlay" onClick={onClose}></div>
      <div className="cart-drawer-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 className="syne-extra">Your Bag</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
        </div>

        {cart.length === 0 ? (
          <p style={{ textAlign: 'center', marginTop: '5rem', opacity: 0.6 }}>Your bag is empty. Let's fix that.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', height: '80%' }}>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {cart.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '1rem' }}>
                  <div>
                    <h4 style={{ margin: 0 }}>{item.name}</h4>
                    <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.6 }}>${item.price.toFixed(2)}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.cartId)} style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer' }}>Remove</button>
                </div>
              ))}
            </div>
            
            <div style={{ borderTop: '2px solid var(--primary)', paddingTop: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.2rem', marginBottom: '1.5rem' }}>
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <button className="btn" onClick={handleGoToBag} style={{ width: '100%' }}>Checkout Now</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
