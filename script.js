// ========================================
// SHAHAWI LTD - Complete Website Script
// ========================================

// ===== CONFIGURATION =====
// Update these with your actual business details
const CONFIG = {
    whatsappNumber: '447397547205',  // UK number without leading 0
    phoneNumber: '07397 547205',
    email: 'Shahawi_ltd@outlook.com',
    companyName: 'Shahawi Ltd',
    tagline: 'Driven by Quality, Built on Trust'
};

// ========================================
// 1. MOBILE MENU TOGGLE
// ========================================
const mobileBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

if (mobileBtn) {
    mobileBtn.addEventListener('click', function() {
        const isOpen = navLinks.classList.toggle('active');
        this.textContent = isOpen ? '✕' : '☰';
        this.setAttribute('aria-expanded', isOpen);
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (mobileBtn) {
                mobileBtn.textContent = '☰';
                mobileBtn.setAttribute('aria-expanded', 'false');
            }
        }
    });
});

// ========================================
// 2. SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Skip if it's just "#" or empty
        if (targetId === '#' || !targetId) return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            
            // Get header height for offset (sticky nav)
            const header = document.querySelector('.navbar');
            const headerHeight = header ? header.offsetHeight : 0;
            
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// 3. WHATSAPP LINK UPDATER
// ========================================
// Update ALL WhatsApp links on the page
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.href = `https://wa.me/${CONFIG.whatsappNumber}`;
    
    // Optional: Add tracking parameters for analytics
    // link.href = `https://wa.me/${CONFIG.whatsappNumber}?text=Hello%20Shahawi%20Ltd%2C%20I%27d%20like%20to%20book%20a%20journey`;
});

// ========================================
// 4. SCROLL ANIMATIONS (Intersection Observer)
// ========================================
const animateElements = document.querySelectorAll(
    '.service-card, .why-card, .testimonial-card, .feature, .stat'
);

// Set initial state for elements to animate
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
});

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add a small delay for staggered effect
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 50);
            
            // Stop observing once animated
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

animateElements.forEach(el => {
    observer.observe(el);
});

// ========================================
// 5. COUNTER ANIMATION FOR STATS
// ========================================
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.textContent);
            
            // Only animate if it's a number
            if (!isNaN(target) && target > 0) {
                animateCounter(el, target);
            }
            
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => {
    counterObserver.observe(el);
});

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 40; // Smooth animation over ~40 frames
    const duration = 1500; // 1.5 seconds
    const stepTime = duration / 40;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// ========================================
// 6. NAVBAR SCROLL EFFECT
// ========================================
const navbar = document.querySelector('.navbar');
let lastScrollY = 0;

window.addEventListener('scroll', function() {
    const currentScrollY = window.scrollY;
    
    // Add shadow when scrolled
    if (currentScrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        navbar.style.borderBottomColor = 'rgba(0, 0, 0, 0.08)';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.borderBottomColor = 'rgba(0, 0, 0, 0.05)';
    }
    
    // Hide/show navbar on scroll (optional - uncomment to enable)
    // if (currentScrollY > lastScrollY && currentScrollY > 200) {
    //     navbar.style.transform = 'translateY(-100%)';
    // } else {
    //     navbar.style.transform = 'translateY(0)';
    // }
    // lastScrollY = currentScrollY;
});

// ========================================
// 7. BACK TO TOP BUTTON (Optional)
// ========================================
// Create back to top button if it doesn't exist
let backToTopBtn = document.querySelector('.back-to-top');

if (!backToTopBtn) {
    backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #25D366;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        z-index: 999;
    `;
    document.body.appendChild(backToTopBtn);
}

window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
        backToTopBtn.style.transform = 'translateY(0)';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
        backToTopBtn.style.transform = 'translateY(20px)';
    }
});

backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover effect for back to top button
backToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
    this.style.boxShadow = '0 6px 25px rgba(37, 211, 102, 0.6)';
});

backToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
    this.style.boxShadow = '0 4px 15px rgba(37, 211, 102, 0.4)';
});

// ========================================
// 8. CONTACT FORM VALIDATION (if you add a form later)
// ========================================
// This is a placeholder in case you add a contact form
// You can uncomment and use this later

/*
document.querySelector('form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = this.querySelector('input[name="name"]')?.value;
    const email = this.querySelector('input[name="email"]')?.value;
    const message = this.querySelector('textarea[name="message"]')?.value;
    
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Simple email validation
    if (!email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Redirect to WhatsApp with pre-filled message
    const whatsappMessage = `Hello Shahawi Ltd,%0A%0AName: ${name}%0AEmail: ${email}%0AMessage: ${message}`;
    window.location.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${whatsappMessage}`;
});
*/

// ========================================
// 9. LAZY LOAD IMAGES (if you add images)
// ========================================
// Automatically lazy load images
document.querySelectorAll('img[data-src]').forEach(img => {
    img.src = img.dataset.src;
    img.removeAttribute('data-src');
});

// ========================================
// 10. YEAR UPDATE FOR FOOTER
// ========================================
document.querySelectorAll('.footer-bottom p:first-child').forEach(el => {
    const year = new Date().getFullYear();
    el.textContent = el.textContent.replace(/\d{4}/, year);
});

// ========================================
// 11. KEYBOARD ACCESSIBILITY
// ========================================
// Allow Enter/Space key to trigger buttons and links
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});

// ========================================
// 12. CONSOLE WELCOME MESSAGE
// ========================================
console.log('%c🚐 Shahawi Ltd', 'font-size: 24px; font-weight: bold; color: #1a1a2e;');
console.log(`%c${CONFIG.tagline}`, 'font-size: 14px; color: #25D366;');
console.log('📞 Phone: ' + CONFIG.phoneNumber);
console.log('✉️ Email: ' + CONFIG.email);
console.log('💬 WhatsApp: https://wa.me/' + CONFIG.whatsappNumber);
console.log('—'.repeat(40));
console.log('✅ Website loaded successfully!');

// ========================================
// 13. PERFORMANCE: DEBOUNCE RESIZE EVENTS
// ========================================
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Handle any resize-specific logic here
        // For example, recalculate element positions
    }, 250);
});

// ========================================
// 14. DARK MODE DETECTION (Optional)
// ========================================
// Check if user prefers dark mode
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // You could add dark mode support here if needed
    console.log('User prefers dark mode');
}

// ========================================
// 15. PREVENT DUPLICATE SUBMISSIONS
// ========================================
// Prevent double-clicking on buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.dataset.clicked === 'true') {
            e.preventDefault();
            return;
        }
        this.dataset.clicked = 'true';
        setTimeout(() => {
            this.dataset.clicked = 'false';
        }, 3000);
    });
});

console.log('✅ All scripts initialized successfully!');