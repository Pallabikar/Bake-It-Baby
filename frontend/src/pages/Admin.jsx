import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ totalOrders: 0, totalRevenue: 0 });
  const [newItem, setNewItem] = useState({ name: '', description: '', price: '', category: 'cakes' });
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'menu'
  const navigate = useNavigate();

  const categories = [
    'brownies', 'biscuits, cookies & crackers', 'breads', 'cakes', 
    'combos', 'croissant, danishes & muffins', 'desserts & cupcakes', 
    'pastries', 'sandwiches & savouries', 'tea cakes', 'beverages', 
    'gifting', 'collectibles', 'chocolates', 'mango specials'
  ];

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const menuRes = await axios.get('http://localhost:5000/api/menu');
        const statsRes = await axios.get('http://localhost:5000/api/admin/stats', {
          headers: { 'x-auth-token': token }
        });
        const ordersRes = await axios.get('http://localhost:5000/api/admin/orders', {
          headers: { 'x-auth-token': token }
        });
        setItems(menuRes.data);
        setStats(statsRes.data);
        setOrders(ordersRes.data);
      } catch (err) {
        console.error('Data fetch failed', err);
      }
    };
    fetchData();
  }, [user]);

  const updateOrderStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/admin/orders/${id}`, { status }, {
        headers: { 'x-auth-token': token }
      });
      setOrders(orders.map(o => o._id === id ? { ...o, status } : o));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/menu', newItem, {
        headers: { 'x-auth-token': token }
      });
      setItems([res.data, ...items]);
      setNewItem({ name: '', description: '', price: '', category: 'cakes' });
      alert('Item added to the collection!');
    } catch (err) {
      alert('Failed to add item: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this delicacy from the menu?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/menu/${id}`, {
        headers: { 'x-auth-token': token }
      });
      setItems(items.filter(item => item._id !== id));
    } catch (err) {
      alert('Failed to delete item');
    }
  };

  return (
    <main style={{ background: 'var(--background)', minHeight: '100vh' }}>
      {/* Header Section */}
      <section style={{ background: 'var(--secondary)', padding: '8rem 5% 4rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--accent)', marginBottom: '1rem', fontFamily: 'Playfair Display, serif' }}>Patisserie Management</h1>
        <div style={{ width: '50px', height: '2px', background: 'var(--accent)', margin: '0 auto 1.5rem' }}></div>
        <p style={{ color: 'var(--text)', opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>
          Curate the collection and oversee the baking operations from one elegant dashboard.
        </p>
      </section>

      <section style={{ padding: '4rem 10%' }}>
        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          <div style={{ background: 'white', padding: '2.5rem', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center', borderTop: '4px solid var(--accent)' }}>
            <h2 style={{ fontSize: '3rem', color: 'var(--accent)', marginBottom: '0.5rem' }}>{stats.totalOrders}</h2>
            <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', fontWeight: 700, opacity: 0.7 }}>Orders Placed</p>
          </div>
          <div style={{ background: 'white', padding: '2.5rem', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center', borderTop: '4px solid var(--primary)' }}>
            <h2 style={{ fontSize: '3rem', color: 'var(--accent)', marginBottom: '0.5rem' }}>${stats.totalRevenue}</h2>
            <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', fontWeight: 700, opacity: 0.7 }}>Total Revenue</p>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <button 
            onClick={() => setActiveTab('orders')}
            style={{ 
              background: activeTab === 'orders' ? 'var(--accent)' : 'white', 
              color: activeTab === 'orders' ? 'white' : 'var(--accent)', 
              padding: '0.8rem 2.5rem', 
              borderRadius: '50px', 
              border: '2px solid var(--accent)', 
              fontWeight: 700, 
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >LIVE ORDERS</button>
          <button 
            onClick={() => setActiveTab('menu')}
            style={{ 
              background: activeTab === 'menu' ? 'var(--accent)' : 'white', 
              color: activeTab === 'menu' ? 'white' : 'var(--accent)', 
              padding: '0.8rem 2.5rem', 
              borderRadius: '50px', 
              border: '2px solid var(--accent)', 
              fontWeight: 700, 
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >MENU MANAGER</button>
        </div>

        {activeTab === 'orders' ? (
          <div style={{ display: 'grid', gap: '2rem' }}>
            <h2 style={{ fontSize: '2rem', color: 'var(--accent)', marginBottom: '1rem', textAlign: 'center' }}>Active Orders</h2>
            {orders.length === 0 ? (
              <p style={{ textAlign: 'center', opacity: 0.6 }}>No active orders at the moment.</p>
            ) : (
              orders.map(order => (
                <div key={order._id} style={{ background: 'white', padding: '2rem', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
                  <div style={{ flex: 1, minWidth: '250px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                      <span style={{ fontWeight: 700, color: 'var(--accent)' }}>#{order._id.slice(-6)}</span>
                      <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>{new Date(order.date).toLocaleDateString()}</span>
                    </div>
                    <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{order.user?.name || 'Guest User'} <span style={{ fontWeight: 400, opacity: 0.6, fontSize: '0.9rem' }}>({order.user?.email})</span></p>
                    <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                      {order.items.map((item, i) => <span key={i}>{item.name}{i < order.items.length - 1 ? ', ' : ''}</span>)}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent)' }}>${order.total.toFixed(2)}</span>
                    <select 
                      value={order.status} 
                      onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                      style={{ padding: '0.6rem 1.5rem', borderRadius: '50px', border: '1px solid var(--accent)', background: 'var(--background)', color: 'var(--accent)', fontWeight: 700, cursor: 'pointer', outline: 'none' }}
                    >
                      <option value="pending">Pending</option>
                      <option value="preparing">Preparing</option>
                      <option value="ready">Ready for Pickup</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', color: 'var(--accent)', marginBottom: '2.5rem', textAlign: 'center' }}>Add New Offering</h2>
            <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', background: 'white', padding: '3rem', borderRadius: '20px', boxShadow: '0 15px 40px rgba(0,0,0,0.05)', marginBottom: '4rem' }}>
              <input type="text" placeholder="Product Name" value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})} required style={{ padding: '1rem 1.5rem', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.1)', background: 'var(--background)', fontFamily: 'Outfit, sans-serif' }} />
              <input type="number" step="0.01" placeholder="Price" value={newItem.price} onChange={(e) => setNewItem({...newItem, price: e.target.value})} required style={{ padding: '1rem 1.5rem', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.1)', background: 'var(--background)', fontFamily: 'Outfit, sans-serif' }} />
              <select value={newItem.category} onChange={(e) => setNewItem({...newItem, category: e.target.value})} style={{ padding: '1rem 1.5rem', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.1)', background: 'var(--background)', fontFamily: 'Outfit, sans-serif' }}>
                {categories.map(cat => <option key={cat} value={cat}>{cat.toUpperCase()}</option>)}
              </select>
              <textarea placeholder="Description" value={newItem.description} onChange={(e) => setNewItem({...newItem, description: e.target.value})} required style={{ gridColumn: '1 / -1', padding: '1rem 1.5rem', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.1)', background: 'var(--background)', fontFamily: 'Outfit, sans-serif', minHeight: '100px' }} />
              <button type="submit" style={{ gridColumn: '1 / -1', background: 'var(--accent)', color: 'white', border: 'none', padding: '1.2rem', borderRadius: '50px', fontWeight: 700, cursor: 'pointer', letterSpacing: '1px' }}>ADD TO COLLECTION</button>
            </form>

            <h2 style={{ fontSize: '2rem', color: 'var(--accent)', marginBottom: '2.5rem', textAlign: 'center' }}>Current Collection</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
              {items.map(item => (
                <div key={item._id} style={{ background: 'white', padding: '1.5rem', borderRadius: '15px', boxShadow: '0 5px 20px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ color: 'var(--accent)', marginBottom: '0.2rem' }}>{item.name}</h4>
                    <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>${parseFloat(item.price).toFixed(2)}</p>
                  </div>
                  <button onClick={() => handleDelete(item._id)} style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem' }}>REMOVE</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default Admin;
