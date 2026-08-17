// ===== Mobile Menu Toggle =====
const mobileBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });
}

// ===== Smooth Scroll for Navigation =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Close mobile menu if open
            navLinks.classList.remove('active');
            if (mobileBtn) mobileBtn.textContent = '☰';
        }
    });
});

// ===== WhatsApp Number Configuration =====
// CHANGE THIS to your actual WhatsApp number (country code + number, no plus sign)
// Example: UK number 07700 900123 -> 447700900123
const WHATSAPP_NUMBER = '1234567890'; // ← CHANGE THIS

// Update all WhatsApp links
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.href = `https://wa.me/${WHATSAPP_NUMBER}`;
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate service cards and why cards on scroll
document.querySelectorAll('.service-card, .why-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== Console Message =====
console.log('🚐 Shahawi Ltd - Small fleet. Personal service. Reliable journeys.');
console.log('💬 Message us on WhatsApp: https://wa.me/' + WHATSAPP_NUMBER);