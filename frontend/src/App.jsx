import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Order from './pages/Order';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import gsap from 'gsap';

const AnimatedRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    // Page Transition Animation
    const tl = gsap.timeline();
    
    // Smooth fade in for the main content
    gsap.fromTo('main', 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.6, ease: 'power2.out' }
    );

    // Optional: scale transition for a premium feel
    tl.fromTo('.page-transition', 
      { scaleY: 0 }, 
      { scaleY: 1, duration: 0.4, transformOrigin: 'top', ease: 'power4.inOut' }
    ).to('.page-transition', 
      { scaleY: 0, duration: 0.4, transformOrigin: 'bottom', ease: 'power4.inOut' }
    );
    
  }, [location.pathname]);

  return (
    <>
      <div className="page-transition" style={{ 
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
        background: 'var(--primary)', zIndex: 9999, transform: 'scaleY(0)' 
      }}></div>
      <main style={{ minHeight: '80vh' }}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/order" element={<Order />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/order/success" element={<Success />} />
          <Route path="/order/cancel" element={<Cancel />} />
        </Routes>
      </main>
    </>
  );
};

function App() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef(null);

  useEffect(() => {
    // Initial theme check
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }

    // Custom Cursor Logic (Disabled on touch devices)
    if (!('ontouchstart' in window)) {
      const cursor = document.createElement('div');
      cursor.className = 'cursor';
      document.body.appendChild(cursor);

      const follower = document.createElement('div');
      follower.className = 'cursor-follower';
      document.body.appendChild(follower);

      const moveCursor = (e) => {
        gsap.to(cursor, { x: e.clientX - 10, y: e.clientY - 10, duration: 0.1 });
        gsap.to(follower, { x: e.clientX - 4, y: e.clientY - 4, duration: 0.3 });
      };

      window.addEventListener('mousemove', moveCursor);

      return () => {
        window.removeEventListener('mousemove', moveCursor);
        if (cursor) cursor.remove();
        if (follower) follower.remove();
      };
    }
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Router>
      <div className="progress-container">
        <div className="progress-bar" id="progressBar" style={{ height: '4px', background: 'var(--primary)', width: '0%' }}></div>
      </div>
      
      {/* Audio Source - Smooth Lo-fi Bakery Beats */}
      <audio 
        ref={audioRef} 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" 
        loop 
      />

      <div className="music-player">
        <button 
          className="music-player-btn"
          onClick={togglePlay}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent)', letterSpacing: '1px', textTransform: 'uppercase' }}>Bakery Beats</span>
          <span style={{ fontSize: '0.65rem', opacity: 0.6 }}>{isPlaying ? 'Now Playing — Lo-fi' : 'Paused — Lo-fi'}</span>
        </div>
        {/* Animated Sound Wave (only visible when playing) */}
        {isPlaying && (
          <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '15px' }}>
             {[1, 2, 3, 4].map(i => (
               <div key={i} style={{ 
                 width: '2px', 
                 background: 'var(--primary)', 
                 borderRadius: '2px',
                 animation: `wave 0.5s ease-in-out infinite alternate ${i * 0.1}s` 
               }}></div>
             ))}
          </div>
        )}
      </div>

      <Navbar />
      
      <AnimatedRoutes />

      <Footer />

      <style>{`
        @keyframes wave {
          from { height: 3px; }
          to { height: 15px; }
        }
      `}</style>
    </Router>
  );
}

export default App;
