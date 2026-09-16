// ========================================
// SHAHAWI LTD - Complete Website Script
// Version: 5.0 (with separate luggage + full validation)
// ========================================

// ===== CONFIGURATION =====
const CONFIG = {
    whatsappNumber: '447397547205',
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
        if (targetId === '#' || !targetId) return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
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
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.href = `https://wa.me/${CONFIG.whatsappNumber}`;
});

// ========================================
// 4. SCROLL ANIMATIONS
// ========================================
const animateElements = document.querySelectorAll(
    '.service-card, .why-card, .testimonial-card, .feature, .stat'
);

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
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 50);
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
    const increment = target / 40;
    const stepTime = 1500 / 40;
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

window.addEventListener('scroll', function() {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        navbar.style.borderBottomColor = 'rgba(0, 0, 0, 0.08)';
    } else {
        navbar.style.boxShadow = 'none';
        navbar.style.borderBottomColor = 'rgba(0, 0, 0, 0.05)';
    }
});

// ========================================
// 7. BACK TO TOP BUTTON
// ========================================
let backToTopBtn = document.querySelector('.back-to-top');

if (!backToTopBtn) {
    backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
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

backToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
});

backToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
});

// ========================================
// 8. QUOTE CALCULATOR (with separate luggage)
// ========================================

// Pricing configuration (per mile)
const PRICING = {
    car: {
        airport: 2.50,
        school: 2.00,
        group: 2.80,
        hospital: 2.20,
        business: 2.60,
        custom: 2.40
    },
    bus: {
        airport: 3.50,
        school: 3.00,
        group: 3.80,
        hospital: 3.20,
        business: 3.60,
        custom: 3.40
    },
    minCharge: {
        car: 15.00,
        bus: 25.00
    },
    extraPassenger: {
        car: 2.00,
        bus: 1.50
    }
};

// Luggage pricing (per bag)
const LUGGAGE_FEES = {
    small: 2.00,   // per small bag
    large: 5.00    // per large bag
};

const WAITING_CHARGE = 5.00;

function calculateQuote() {
    const tripType = document.getElementById('tripType').value;
    const distanceInput = document.getElementById('distance');
    const passengersInput = document.getElementById('passengers');
    const smallBagsInput = document.getElementById('smallBags');
    const largeBagsInput = document.getElementById('largeBags');
    const vehicleType = document.getElementById('vehicleType').value;
    const estimateAmount = document.getElementById('estimateAmount');
    const resultBox = document.getElementById('quoteResult');
    const luggageInfo = document.getElementById('luggageFeeInfo');
    const breakdown = document.getElementById('quoteBreakdown');

    // Get values
    const distance = parseFloat(distanceInput.value);
    const passengers = parseInt(passengersInput.value);
    const smallBags = parseInt(smallBagsInput.value) || 0;
    const largeBags = parseInt(largeBagsInput.value) || 0;

    // ✅ CHECK ALL REQUIRED FIELDS ARE FILLED
    // Required: tripType, distance, passengers, vehicleType
    // Optional: smallBags, largeBags (can be 0)

    // Check trip type
    if (!tripType || tripType === '') {
        estimateAmount.textContent = '—';
        resultBox.style.borderColor = 'rgba(37, 211, 102, 0.15)';
        if (luggageInfo) luggageInfo.classList.remove('visible');
        if (breakdown) breakdown.classList.remove('visible');
        return;
    }

    // Check distance
    if (distanceInput.value === '' || isNaN(distance) || distance < 1) {
        estimateAmount.textContent = '—';
        resultBox.style.borderColor = 'rgba(37, 211, 102, 0.15)';
        if (luggageInfo) luggageInfo.classList.remove('visible');
        if (breakdown) breakdown.classList.remove('visible');
        return;
    }

    // Check passengers
    if (passengersInput.value === '' || isNaN(passengers) || passengers < 1) {
        estimateAmount.textContent = '—';
        resultBox.style.borderColor = 'rgba(37, 211, 102, 0.15)';
        if (luggageInfo) luggageInfo.classList.remove('visible');
        if (breakdown) breakdown.classList.remove('visible');
        return;
    }

    // Check vehicle type
    if (!vehicleType || vehicleType === '') {
        estimateAmount.textContent = '—';
        resultBox.style.borderColor = 'rgba(37, 211, 102, 0.15)';
        if (luggageInfo) luggageInfo.classList.remove('visible');
        if (breakdown) breakdown.classList.remove('visible');
        return;
    }

    // Validate limits
    if (vehicleType === 'car' && passengers > 4) {
        alert('Private car can only carry up to 4 passengers. Please select Bus for larger groups.');
        return;
    }

    if (passengers > 16) {
        alert('Maximum capacity is 16 passengers. Please contact us for larger groups.');
        return;
    }

    if (smallBags > 20 || largeBags > 20) {
        alert('Maximum 20 bags per size. Please contact us for larger luggage requirements.');
        return;
    }

    // Calculate base cost
    const rate = PRICING[vehicleType][tripType] || PRICING[vehicleType].custom;
    let baseCost = distance * rate;
    const minCharge = PRICING.minCharge[vehicleType];
    if (baseCost < minCharge) {
        baseCost = minCharge;
    }

    // Extra passenger charges (beyond 2 passengers)
    let extraPassengerCost = 0;
    if (passengers > 2) {
        const extraCount = passengers - 2;
        extraPassengerCost = extraCount * PRICING.extraPassenger[vehicleType];
    }

    // Luggage cost - separate for small and large
    const smallBagsCost = smallBags * LUGGAGE_FEES.small;
    const largeBagsCost = largeBags * LUGGAGE_FEES.large;
    const luggageCost = smallBagsCost + largeBagsCost;

    // Waiting time (hospital/airport)
    let waitingCost = 0;
    if (tripType === 'hospital' || tripType === 'airport') {
        waitingCost = WAITING_CHARGE;
    }

    // Calculate total
    let total = baseCost + extraPassengerCost + luggageCost + waitingCost;
    total = Math.round(total * 100) / 100;

    // Display result
    estimateAmount.textContent = `£${total.toFixed(2)}`;
    resultBox.style.borderColor = '#25D366';

    // Show luggage fee info
    if (luggageInfo) {
        if (luggageCost > 0) {
            let parts = [];
            if (smallBags > 0) parts.push(`${smallBags} small (£${smallBagsCost.toFixed(2)})`);
            if (largeBags > 0) parts.push(`${largeBags} large (£${largeBagsCost.toFixed(2)})`);
            luggageInfo.textContent = `Luggage: ${parts.join(' + ')} = £${luggageCost.toFixed(2)}`;
            luggageInfo.classList.add('visible');
        } else {
            luggageInfo.classList.remove('visible');
        }
    }

    // Show breakdown
    if (breakdown) {
        let luggageRows = '';
        if (smallBags > 0) {
            luggageRows += `
            <div class="breakdown-row">
                <span class="label">Small bags (${smallBags} × £${LUGGAGE_FEES.small.toFixed(2)})</span>
                <span class="value">£${smallBagsCost.toFixed(2)}</span>
            </div>`;
        }
        if (largeBags > 0) {
            luggageRows += `
            <div class="breakdown-row">
                <span class="label">Large bags (${largeBags} × £${LUGGAGE_FEES.large.toFixed(2)})</span>
                <span class="value">£${largeBagsCost.toFixed(2)}</span>
            </div>`;
        }

        breakdown.innerHTML = `
            <div class="breakdown-row">
                <span class="label">Base fare (${distance} miles)</span>
                <span class="value">£${baseCost.toFixed(2)}</span>
            </div>
            ${extraPassengerCost > 0 ? `
            <div class="breakdown-row">
                <span class="label">Extra passengers (${passengers - 2})</span>
                <span class="value">£${extraPassengerCost.toFixed(2)}</span>
            </div>` : ''}
            ${luggageRows}
            ${waitingCost > 0 ? `
            <div class="breakdown-row">
                <span class="label">Waiting time (15 mins)</span>
                <span class="value">£${waitingCost.toFixed(2)}</span>
            </div>` : ''}
            <div class="breakdown-row total">
                <span class="label">Total</span>
                <span class="value">£${total.toFixed(2)}</span>
            </div>
        `;
        breakdown.classList.add('visible');
    }

    console.log('Quote Breakdown:', {
        tripType: tripType,
        vehicle: vehicleType,
        distance: distance,
        passengers: passengers,
        smallBags: smallBags,
        largeBags: largeBags,
        baseRate: rate,
        baseCost: baseCost,
        extraPassengerCost: extraPassengerCost,
        smallBagsCost: smallBagsCost,
        largeBagsCost: largeBagsCost,
        luggageCost: luggageCost,
        waitingCost: waitingCost,
        total: total
    });
}

// Auto-calculate only when all required fields have values
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.calculator-input');
    const estimateAmount = document.getElementById('estimateAmount');
    const resultBox = document.getElementById('quoteResult');
    const luggageInfo = document.getElementById('luggageFeeInfo');
    const breakdown = document.getElementById('quoteBreakdown');

    inputs.forEach(input => {
        input.addEventListener('change', function() {
            const tripType = document.getElementById('tripType').value;
            const distance = document.getElementById('distance').value;
            const passengers = document.getElementById('passengers').value;
            const vehicleType = document.getElementById('vehicleType').value;
            
            // Only calculate if ALL required fields have values
            if (tripType && distance && passengers && vehicleType) {
                calculateQuote();
            } else {
                estimateAmount.textContent = '—';
                resultBox.style.borderColor = 'rgba(37, 211, 102, 0.15)';
                if (luggageInfo) luggageInfo.classList.remove('visible');
                if (breakdown) breakdown.classList.remove('visible');
            }
        });
        
        input.addEventListener('input', function() {
            const tripType = document.getElementById('tripType').value;
            const distance = document.getElementById('distance').value;
            const passengers = document.getElementById('passengers').value;
            const vehicleType = document.getElementById('vehicleType').value;
            
            // Only calculate if ALL required fields have values
            if (tripType && distance && passengers && vehicleType) {
                calculateQuote();
            } else {
                estimateAmount.textContent = '—';
                resultBox.style.borderColor = 'rgba(37, 211, 102, 0.15)';
                if (luggageInfo) luggageInfo.classList.remove('visible');
                if (breakdown) breakdown.classList.remove('visible');
            }
        });
    });

    // Initial state
    estimateAmount.textContent = '—';
    resultBox.style.borderColor = 'rgba(37, 211, 102, 0.15)';
});

// Vehicle type passenger limits
document.getElementById('vehicleType')?.addEventListener('change', function() {
    const passengersInput = document.getElementById('passengers');
    const passengers = parseInt(passengersInput.value);
    if (this.value === 'car' && passengers > 4) {
        passengersInput.value = 4;
    }
    // Recalculate if all fields have values
    const tripType = document.getElementById('tripType').value;
    const distance = document.getElementById('distance').value;
    if (tripType && distance && passengersInput.value && this.value) {
        calculateQuote();
    }
});

document.getElementById('passengers')?.addEventListener('change', function() {
    const vehicleType = document.getElementById('vehicleType').value;
    if (vehicleType === 'car' && parseInt(this.value) > 4) {
        alert('Private car can only carry up to 4 passengers. Switching to Bus.');
        document.getElementById('vehicleType').value = 'bus';
    }
    if (parseInt(this.value) > 16) {
        this.value = 16;
        alert('Maximum capacity is 16 passengers.');
    }
    // Recalculate if all fields have values
    const tripType = document.getElementById('tripType').value;
    const distance = document.getElementById('distance').value;
    const vehicleTypeVal = document.getElementById('vehicleType').value;
    if (tripType && distance && this.value && vehicleTypeVal) {
        calculateQuote();
    }
});

// ========================================
// 9. YEAR UPDATE FOR FOOTER
// ========================================
document.querySelectorAll('.footer-bottom p:first-child').forEach(el => {
    const year = new Date().getFullYear();
    el.textContent = el.textContent.replace(/\d{4}/, year);
});

// ========================================
// 10. CONSOLE WELCOME MESSAGE
// ========================================
console.log('%c🚐 Shahawi Ltd', 'font-size: 24px; font-weight: bold; color: #1a1a2e;');
console.log(`%c${CONFIG.tagline}`, 'font-size: 14px; color: #25D366;');
console.log('📞 Phone: ' + CONFIG.phoneNumber);
console.log('✉️ Email: ' + CONFIG.email);
console.log('💬 WhatsApp: https://wa.me/' + CONFIG.whatsappNumber);
console.log('—'.repeat(40));
console.log('✅ Website loaded successfully!');
console.log('✅ Quote calculator with separate luggage ready!');