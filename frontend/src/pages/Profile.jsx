import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/orders/myorders', {
          headers: { 'x-auth-token': token }
        });
        setOrders(res.data);
      } catch (err) {
        console.error('Failed to fetch orders', err);
      }
    };
    fetchOrders();

    socket.on('orderStatusUpdated', (data) => {
      setOrders(prevOrders => prevOrders.map(order => 
        order._id === data.orderId ? { ...order, status: data.status } : order
      ));
    });

    return () => {
      socket.off('orderStatusUpdated');
    };
  }, [user]);

  const getStatusProgress = (status) => {
    switch(status) {
      case 'pending': return 25;
      case 'preparing': return 50;
      case 'ready': return 75;
      case 'delivered': return 100;
      default: return 25;
    }
  };

  return (
    <main style={{ background: 'var(--background)', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{ background: 'var(--secondary)', padding: '8rem 5% 4rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--accent)', marginBottom: '1rem', fontFamily: 'Playfair Display, serif' }}>Welcome, {user?.name.split(' ')[0]}</h1>
        <div style={{ width: '50px', height: '2px', background: 'var(--accent)', margin: '0 auto 1.5rem' }}></div>
        <p style={{ color: 'var(--text)', opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>
          View your order history and track your current artisanal delights in real-time.
        </p>
      </section>

      <section style={{ padding: '4rem 10%', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2rem', color: 'var(--accent)', marginBottom: '3rem', textAlign: 'center' }}>Your Order History</h2>
        
        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <p style={{ opacity: 0.6, marginBottom: '2rem' }}>You haven't placed any orders yet.</p>
            <button onClick={() => navigate('/menu')} style={{ background: 'var(--accent)', color: 'white', padding: '1rem 3rem', borderRadius: '50px', border: 'none', fontWeight: 700, cursor: 'pointer' }}>BROWSE MENU</button>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '2rem' }}>
            {orders.map(order => (
              <div key={order._id} style={{ background: 'white', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <span style={{ display: 'block', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '2px', fontWeight: 700, opacity: 0.5, marginBottom: '0.5rem' }}>Order Number</span>
                    <span style={{ fontWeight: 700, color: 'var(--accent)', fontSize: '1.1rem' }}>#{order._id.slice(-6).toUpperCase()}</span>
                  </div>
                  <div>
                    <span style={{ display: 'block', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '2px', fontWeight: 700, opacity: 0.5, marginBottom: '0.5rem' }}>Date Placed</span>
                    <span style={{ fontWeight: 600 }}>{new Date(order.date).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span style={{ display: 'block', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '2px', fontWeight: 700, opacity: 0.5, marginBottom: '0.5rem' }}>Total Amount</span>
                    <span style={{ fontWeight: 700, color: 'var(--accent)', fontSize: '1.1rem' }}>${order.total.toFixed(2)}</span>
                  </div>
                </div>

                <div style={{ marginBottom: '2.5rem' }}>
                  {order.items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.8rem 0', borderBottom: '1px solid rgba(0,0,0,0.03)' }}>
                      <span style={{ opacity: 0.8 }}>{item.name}</span>
                      <span style={{ fontWeight: 600 }}>${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Tracking Progress */}
                <div style={{ padding: '2rem', background: 'var(--background)', borderRadius: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--accent)' }}>Order Status: <span style={{ textTransform: 'uppercase' }}>{order.status}</span></span>
                    <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>Real-time Tracking Active</span>
                  </div>
                  <div style={{ height: '8px', background: 'white', borderRadius: '10px', overflow: 'hidden' }}>
                    <div style={{ 
                      height: '100%', 
                      background: 'var(--accent)', 
                      width: `${getStatusProgress(order.status)}%`, 
                      transition: 'width 1s cubic-bezier(0.23, 1, 0.32, 1)' 
                    }}></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', opacity: 0.4, letterSpacing: '1px' }}>
                    <span>Pending</span>
                    <span>Preparing</span>
                    <span>Ready</span>
                    <span>Delivered</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Profile;
