import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      alert('Login failed: ' + err.response.data.message);
    }
  };

  return (
    <main style={{ background: 'var(--background)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 5%' }}>
      <section style={{ background: 'white', padding: '4rem', borderRadius: '15px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', width: '100%', maxWidth: '500px', borderTop: '4px solid var(--accent)' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--accent)', marginBottom: '1rem', fontFamily: 'Playfair Display, serif' }}>Welcome Back</h1>
          <div style={{ width: '40px', height: '2px', background: 'var(--secondary)', margin: '0 auto 1rem' }}></div>
          <p style={{ color: 'var(--text)', opacity: 0.8, fontSize: '0.95rem' }}>Log in to access your artisanal favorites.</p>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ padding: '1rem 1.5rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', background: 'var(--background)', fontFamily: 'Outfit, sans-serif', fontSize: '1rem', outline: 'none' }}
            onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(0,0,0,0.1)'}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ padding: '1rem 1.5rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', background: 'var(--background)', fontFamily: 'Outfit, sans-serif', fontSize: '1rem', outline: 'none' }}
            onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(0,0,0,0.1)'}
          />
          <button 
            type="submit" 
            style={{ 
              background: 'var(--accent)', 
              color: 'white', 
              padding: '1rem', 
              borderRadius: '50px', 
              border: 'none', 
              fontWeight: 700, 
              fontSize: '1rem', 
              letterSpacing: '1px', 
              cursor: 'pointer', 
              transition: 'background 0.3s',
              marginTop: '1rem'
            }}
            onMouseEnter={(e) => e.target.style.background = '#8A6A3E'}
            onMouseLeave={(e) => e.target.style.background = 'var(--accent)'}
          >
            LOG IN
          </button>
          
          <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', textAlign: 'center', color: 'var(--text)', opacity: 0.8 }}>
            Don't have an account? <Link to="/signup" style={{ color: 'var(--accent)', fontWeight: 700, textDecoration: 'none' }}>Sign up</Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Login;
