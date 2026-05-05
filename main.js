// Custom Cursor
const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

const follower = document.createElement('div');
follower.className = 'cursor-follower';
document.body.appendChild(follower);

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX - 10, y: e.clientY - 10, duration: 0.1 });
    gsap.to(follower, { x: e.clientX - 4, y: e.clientY - 4, duration: 0.3 });
});

// Cursor Hover Effects
document.querySelectorAll('a, button, .card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 3, background: 'var(--primary)', opacity: 0.2, duration: 0.3 });
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 1, background: 'transparent', opacity: 1, duration: 0.3 });
    });
});

// Magnetic Buttons
document.querySelectorAll('.btn, #theme-toggle, #play-pause').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3 });
    });
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.3 });
    });
});

// Music Player Logic
const playBtn = document.getElementById('play-pause');
let isPlaying = false;
if (playBtn) {
    playBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        playBtn.innerText = isPlaying ? 'II' : '▶';
        // In a real app, you'd trigger audio here
    });
}

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') themeToggle.innerText = '☀️';
}

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.innerText = '🌙';
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerText = '☀️';
        localStorage.setItem('theme', 'dark');
    }
});

// Cookie Consent
const showCookieToast = () => {
    if (!localStorage.getItem('cookies-accepted')) {
        const toast = document.createElement('div');
        toast.className = 'cookie-toast';
        toast.innerHTML = `
            <p>We use cookies to make your experience as sweet as our pastries. Cool?</p>
            <button class="btn" id="accept-cookies" style="padding: 0.5rem 1rem; font-size: 0.8rem; width: 100%;">Totes Cool</button>
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.display = 'block';
            gsap.from(toast, { y: 50, opacity: 0, duration: 0.5 });
        }, 3000);

        document.getElementById('accept-cookies').addEventListener('click', () => {
            gsap.to(toast, { y: 50, opacity: 0, duration: 0.5, onComplete: () => {
                toast.remove();
                localStorage.setItem('cookies-accepted', 'true');
            }});
        });
    }
};

// Loader and Initial Animations
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        gsap.to(loader, {
            opacity: 0,
            duration: 1,
            delay: 1,
            onComplete: () => loader.style.display = 'none'
        });
    }
    
    showCookieToast();

    // GSAP Initial Animations
    gsap.from('.hero-content h1', { y: 100, opacity: 0, duration: 1, delay: 1.5, ease: 'power4.out' });
    gsap.from('.hero-content p', { y: 50, opacity: 0, duration: 1, delay: 1.8, ease: 'power4.out' });
});

// GSAP Scroll Reveals
gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('.reveal').forEach(el => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: 'top 85%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
});

// Cart Logic
let cartTotal = 0;
const orderButtons = document.querySelectorAll('.order-item .btn');
const cartTotalDisplay = document.querySelector('.cart-summary span:last-child');
const cartMessage = document.querySelector('.cart-summary p');
const checkoutBtn = document.querySelector('.cart-summary .btn');

if (orderButtons.length > 0) {
    orderButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const priceText = btn.parentElement.querySelector('p').innerText;
            const price = parseFloat(priceText.replace('$', ''));
            cartTotal += price;
            
            if (cartTotalDisplay) {
                cartTotalDisplay.innerText = `$${cartTotal.toFixed(2)}`;
                cartMessage.innerText = `You have added some treats!`;
                checkoutBtn.style.opacity = '1';
                checkoutBtn.style.cursor = 'pointer';
            }
            
            btn.innerText = 'Added!';
            setTimeout(() => btn.innerText = 'Add', 1000);
            
            // Subtle "pop" animation
            gsap.fromTo(btn, { scale: 0.9 }, { scale: 1, duration: 0.3, ease: 'back.out(2)' });
        });
    });
}

if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cartTotal > 0) {
            // Create a success overlay
            const overlay = document.createElement('div');
            overlay.className = 'loader'; // Reuse loader style
            overlay.innerHTML = '<h2>ORDER SECURED! 🥐✨</h2><p>Your treats are being prepped.</p>';
            document.body.appendChild(overlay);
            
            gsap.from(overlay, { opacity: 0, duration: 0.5 });
            gsap.from(overlay.querySelector('h2'), { scale: 0, duration: 1, ease: 'back.out(1.7)' });
            
            setTimeout(() => {
                gsap.to(overlay, { 
                    opacity: 0, 
                    duration: 1, 
                    onComplete: () => {
                        overlay.remove();
                        cartTotal = 0;
                        cartTotalDisplay.innerText = '$0.00';
                        cartMessage.innerText = 'Your bag is empty.';
                        checkoutBtn.style.opacity = '0.5';
                    }
                });
            }, 3000);
        }
    });
}

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById('progressBar');
    if (progressBar) progressBar.style.width = scrolled + '%';
});

// Contact Form Submission
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // GSAP Success Animation
        gsap.to(contactForm, { opacity: 0, y: -20, duration: 0.5, onComplete: () => {
            contactForm.style.display = 'none';
            formSuccess.style.display = 'block';
            gsap.from(formSuccess, { opacity: 0, scale: 0.8, duration: 0.5, ease: 'back.out(1.7)' });
        }});
    });
}

// Menu Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            menuItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    gsap.to(item, { display: 'flex', opacity: 1, scale: 1, duration: 0.5 });
                } else {
                    gsap.to(item, { display: 'none', opacity: 0, scale: 0.8, duration: 0.5 });
                }
            });
        });
    });
}

// Filter Modal Logic
const filterModal = document.getElementById('filter-modal');
const openFilters = document.getElementById('open-filters');
const closeModal = document.getElementById('close-modal');
const modalTabs = document.querySelectorAll('.modal-tab');
const tabPanes = document.querySelectorAll('.tab-pane');

if (openFilters) {
    openFilters.addEventListener('click', () => {
        filterModal.style.display = 'flex';
        gsap.from('.modal-container', { y: 50, opacity: 0, duration: 0.5, ease: 'back.out(1.7)' });
    });

    closeModal.addEventListener('click', () => {
        gsap.to('.modal-container', { y: 50, opacity: 0, duration: 0.3, onComplete: () => {
            filterModal.style.display = 'none';
        }});
    });

    // Tab Switching
    modalTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            modalTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const targetTab = tab.getAttribute('data-tab');
            tabPanes.forEach(pane => {
                pane.style.display = pane.id === `tab-${targetTab}` ? 'block' : 'none';
            });
        });
    });

    // Close on outside click
    filterModal.addEventListener('click', (e) => {
        if (e.target === filterModal) closeModal.click();
    });
}

// Parallax effect for hero images
window.addEventListener('scroll', () => {
    const heroImage = document.querySelector('.hero-image-container img');
    if (heroImage) {
        const scrollValue = window.scrollY;
        heroImage.style.transform = `translateY(${scrollValue * 0.1}px) rotate(-5deg)`;
    }
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
