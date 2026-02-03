/* ===================================
   ICU MONITOR PRO - ULTRA PREMIUM JS
   Advanced Animations & Backend Integration
   Complete Implementation
   =================================== */

// ===================================
// GLOBAL STATE
// ===================================
const state = {
    isLoading: false,
    lastResult: null,
    cursorPos: { x: 0, y: 0 },
    cursorTarget: { x: 0, y: 0 }
};

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initCustomCursor();
    initParticles();
    initDateTime();
    initNavigation();
    initAlertBanner();
    initCardEffects();
    initInputEffects();
    initVitalCards();
    initLabCards();
    initCheckboxes();
    initButtons();
    initPrediction();
    initKeyboardShortcuts();
    initScrollEffects();
    initNavLinkGlow();
    
    // Console branding
    consoleBranding();
});

// ===================================
// PRELOADER
// ===================================
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    if (!preloader) return;
    
    // Hide preloader after animations complete
    const hidePreloader = () => {
        preloader.classList.add('hidden');
        document.body.style.overflow = '';
        
        // Trigger page entrance animations
        triggerEntranceAnimations();
    };
    
    // Wait for progress bar animation
    setTimeout(hidePreloader, 2500);
    
    // Fallback
    setTimeout(() => {
        if (!preloader.classList.contains('hidden')) {
            preloader.style.display = 'none';
        }
    }, 4000);
}

function triggerEntranceAnimations() {
    // Animate sections with stagger
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Animate header title
    const titleWords = document.querySelectorAll('.word');
    titleWords.forEach((word, index) => {
        word.style.opacity = '0';
        word.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            word.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            word.style.opacity = '1';
            word.style.transform = 'translateY(0)';
        }, 200 + index * 150);
    });
}

// ===================================
// CUSTOM CURSOR
// ===================================
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    
    if (!cursor || isTouchDevice()) {
        if (cursor) cursor.style.display = 'none';
        document.body.style.cursor = 'auto';
        return;
    }
    
    const dot = cursor.querySelector('.cursor-dot');
    const ring = cursor.querySelector('.cursor-ring');
    const trail = cursor.querySelector('.cursor-trail');
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        state.cursorTarget.x = e.clientX;
        state.cursorTarget.y = e.clientY;
        
        // Immediate dot update
        dot.style.left = `${e.clientX}px`;
        dot.style.top = `${e.clientY}px`;
    });
    
    // Smooth animation for ring and trail
    function animateCursor() {
        // Smooth follow
        state.cursorPos.x += (state.cursorTarget.x - state.cursorPos.x) * 0.15;
        state.cursorPos.y += (state.cursorTarget.y - state.cursorPos.y) * 0.15;
        
        ring.style.left = `${state.cursorPos.x}px`;
        ring.style.top = `${state.cursorPos.y}px`;
        
        trail.style.left = `${state.cursorPos.x}px`;
        trail.style.top = `${state.cursorPos.y}px`;
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Hover effects
    const interactiveElements = document.querySelectorAll(
        'a, button, input, select, textarea, .nav-link, .premium-card, .vital-card, .lab-card, .checkbox-card, .btn, .metric-card'
    );
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
    
    // Click effect
    document.addEventListener('mousedown', () => {
        cursor.classList.add('active');
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('active');
    });
    
    // Hide on leave
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
}

// ===================================
// PARTICLE SYSTEM
// ===================================
function initParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mousePos = { x: null, y: null };
    
    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', debounce(resizeCanvas, 250));
    
    // Particle class
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.hue = Math.random() * 60 + 220; // Blue-purple range
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wrap around
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
            
            // Mouse interaction
            if (mousePos.x && mousePos.y) {
                const dx = this.x - mousePos.x;
                const dy = this.y - mousePos.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 150) {
                    const force = (150 - dist) / 150;
                    this.x += dx * force * 0.02;
                    this.y += dy * force * 0.02;
                }
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    // Create particles
    const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 20000));
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Draw connections
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 120) {
                    const opacity = (1 - dist / 120) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        drawConnections();
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Track mouse for interaction
    canvas.addEventListener('mousemove', (e) => {
        mousePos.x = e.clientX;
        mousePos.y = e.clientY;
    });
    
    canvas.addEventListener('mouseleave', () => {
        mousePos.x = null;
        mousePos.y = null;
    });
}

// ===================================
// DATE & TIME
// ===================================
function initDateTime() {
    const timeValue = document.getElementById('time-value');
    const timePeriod = document.getElementById('time-period');
    const dateDisplay = document.getElementById('date-display');
    
    function updateDateTime() {
        const now = new Date();
        
        // Time (12-hour format)
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const period = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12 || 12;
        
        if (timeValue) {
            timeValue.textContent = `${hours}:${minutes}`;
        }
        
        if (timePeriod) {
            timePeriod.textContent = period;
        }
        
        // Date
        const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
        if (dateDisplay) {
            dateDisplay.textContent = now.toLocaleDateString('en-US', options);
        }
    }
    
    updateDateTime();
    setInterval(updateDateTime, 1000);
}

// ===================================
// NAVIGATION
// ===================================
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section[id]');
    
    // Click handler
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Scroll to section
            const targetId = link.getAttribute('href')?.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header')?.offsetHeight || 90;
                const targetPos = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll spy
    function handleScrollSpy() {
        const scrollPos = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', throttle(handleScrollSpy, 100));
}

// Nav link glow effect
function initNavLinkGlow() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            link.style.setProperty('--x', `${x}%`);
            link.style.setProperty('--y', `${y}%`);
            
            const glow = link.querySelector('.nav-link-glow');
            if (glow) {
                glow.style.opacity = '1';
            }
        });
        
        link.addEventListener('mouseleave', () => {
            const glow = link.querySelector('.nav-link-glow');
            if (glow) {
                glow.style.opacity = '0';
            }
        });
    });
}

// ===================================
// ALERT BANNER
// ===================================
function initAlertBanner() {
    const banner = document.getElementById('alert-banner');
    const dismissBtn = document.getElementById('alert-dismiss');
    
    if (dismissBtn && banner) {
        dismissBtn.addEventListener('click', () => {
            banner.style.animation = 'alertSlideOut 0.4s ease forwards';
            
            setTimeout(() => {
                banner.classList.add('hidden');
            }, 400);
        });
    }
}

// ===================================
// CARD EFFECTS (3D Tilt)
// ===================================
function initCardEffects() {
    const cards = document.querySelectorAll('.premium-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            
            // Move glow
            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.left = `${x - rect.width}px`;
                glow.style.top = `${y - rect.height}px`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            card.style.transition = 'transform 0.5s ease';
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease';
        });
    });
}

// ===================================
// INPUT EFFECTS
// ===================================
function initInputEffects() {
    const inputs = document.querySelectorAll('.input, .mini-input, .lab-input');
    
    inputs.forEach(input => {
        // Focus effects
        input.addEventListener('focus', () => {
            const wrapper = input.closest('.input-wrapper, .mini-input-wrap, .lab-card');
            if (wrapper) {
                wrapper.classList.add('focused');
            }
        });
        
        input.addEventListener('blur', () => {
            const wrapper = input.closest('.input-wrapper, .mini-input-wrap, .lab-card');
            if (wrapper) {
                wrapper.classList.remove('focused');
            }
        });
        
        // Ripple effect on focus
        input.addEventListener('focus', (e) => {
            createInputRipple(e, input);
        });
    });
}

function createInputRipple(e, input) {
    const wrapper = input.closest('.input-wrapper, .mini-input-wrap');
    if (!wrapper) return;
    
    const ripple = document.createElement('div');
    ripple.className = 'input-ripple';
    ripple.style.cssText = `
        position: absolute;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.3), transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: inputRipple 0.6s ease-out forwards;
        pointer-events: none;
        width: 200px;
        height: 200px;
        left: 50%;
        top: 50%;
        margin-left: -100px;
        margin-top: -100px;
    `;
    
    wrapper.style.position = 'relative';
    wrapper.style.overflow = 'hidden';
    wrapper.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// ===================================
// VITAL CARDS
// ===================================
function initVitalCards() {
    const vitalCards = document.querySelectorAll('.vital-card');
    
    const ranges = {
        hr: { min: 60, max: 100, critLow: 40, critHigh: 150 },
        spo2: { min: 95, max: 100, critLow: 85, critHigh: 101 },
        map: { min: 70, max: 100, critLow: 50, critHigh: 140 },
        resp: { min: 12, max: 20, critLow: 8, critHigh: 35 },
        temp: { min: 36.1, max: 37.2, critLow: 34, critHigh: 40 }
    };
    
    vitalCards.forEach(card => {
        const vitalType = card.dataset.vital;
        const inputs = card.querySelectorAll('.mini-input');
        const ring = card.querySelector('.ring-fill');
        const range = ranges[vitalType];
        
        if (!range) return;
        
        // Hover effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `translateY(-6px) scale(1.02) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
        
        // Input validation
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                validateVitalCard(card, inputs, range, vitalType);
                updateVitalRing(ring, inputs, vitalType);
            });
        });
    });
}

function validateVitalCard(card, inputs, range, vitalType) {
    let hasWarning = false;
    let hasCritical = false;
    
    inputs.forEach(input => {
        const value = parseFloat(input.value);
        if (isNaN(value) || input.value === '') return;
        
        if (value < range.critLow || value > range.critHigh) {
            hasCritical = true;
        } else if (value < range.min || value > range.max) {
            hasWarning = true;
        }
    });
    
    card.classList.remove('warning', 'critical');
    
    if (hasCritical) {
        card.classList.add('critical');
        triggerCriticalEffect(card);
    } else if (hasWarning) {
        card.classList.add('warning');
    }
}

function updateVitalRing(ring, inputs, vitalType) {
    if (!ring) return;
    
    const values = Array.from(inputs)
        .map(i => parseFloat(i.value))
        .filter(v => !isNaN(v));
    
    if (values.length === 0) {
        ring.style.strokeDashoffset = '264';
        return;
    }
    
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    
    const maxValues = { hr: 200, spo2: 100, map: 150, resp: 40, temp: 42 };
    const max = maxValues[vitalType] || 100;
    const percentage = Math.min((avg / max) * 100, 100);
    
    const circumference = 264;
    const offset = circumference - (circumference * percentage / 100);
    ring.style.strokeDashoffset = offset;
}

function triggerCriticalEffect(card) {
    // Shake animation
    card.style.animation = 'none';
    card.offsetHeight; // Reflow
    card.style.animation = 'criticalShake 0.5s ease';
    
    setTimeout(() => {
        card.style.animation = '';
    }, 500);
}

// ===================================
// LAB CARDS
// ===================================
function initLabCards() {
    const labCards = document.querySelectorAll('.lab-card');
    
    const ranges = {
        lactate: { min: 0.5, max: 2.0, critLow: 0, critHigh: 4 },
        wbc: { min: 4.5, max: 11.0, critLow: 1, critHigh: 25 },
        creatinine: { min: 0.7, max: 1.3, critLow: 0, critHigh: 4 },
        platelets: { min: 150, max: 400, critLow: 20, critHigh: 600 }
    };
    
    labCards.forEach(card => {
        const inputs = card.querySelectorAll('.lab-input');
        const progressBar = card.querySelector('.lab-bar-fill');
        
        // Hover effect
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
        
        inputs.forEach(input => {
            const labType = Array.from(input.classList).find(c => ranges[c]);
            
            input.addEventListener('input', () => {
                validateLabCard(card, inputs, labType, ranges);
                updateLabProgress(progressBar, inputs);
            });
        });
    });
}

function validateLabCard(card, inputs, labType, ranges) {
    const range = ranges[labType];
    if (!range) return;
    
    let hasWarning = false;
    let hasCritical = false;
    
    inputs.forEach(input => {
        const value = parseFloat(input.value);
        if (isNaN(value) || input.value === '') return;
        
        if (value < range.critLow || value > range.critHigh) {
            hasCritical = true;
        } else if (value < range.min || value > range.max) {
            hasWarning = true;
        }
    });
    
    card.classList.remove('warning', 'critical');
    
    if (hasCritical) {
        card.classList.add('critical');
    } else if (hasWarning) {
        card.classList.add('warning');
    }
}

function updateLabProgress(progressBar, inputs) {
    if (!progressBar) return;
    
    let filled = 0;
    inputs.forEach(input => {
        if (input.value !== '') filled++;
    });
    
    const percentage = (filled / inputs.length) * 100;
    progressBar.style.width = `${percentage}%`;
}

// ===================================
// CHECKBOXES
// ===================================
function initCheckboxes() {
    const checkboxCards = document.querySelectorAll('.checkbox-card');
    
    checkboxCards.forEach(card => {
        const input = card.querySelector('input');
        const content = card.querySelector('.checkbox-content');
        
        // Ripple on click
        card.addEventListener('click', (e) => {
            createRipple(e, content);
        });
        
        // Tilt effect
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            content.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            content.style.transform = '';
        });
    });
}

// ===================================
// BUTTONS
// ===================================
function initButtons() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        // Ripple effect
        btn.addEventListener('click', (e) => {
            createRipple(e, btn);
        });
        
        // Magnetic effect
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

function createRipple(e, element) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: rippleAnim 0.6s ease-out forwards;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// ===================================
// PREDICTION ENGINE
// ===================================
function initPrediction() {
    const predictBtn = document.getElementById('predict-btn');
    const clearBtn = document.getElementById('clear-btn');
    const exportBtn = document.getElementById('export-btn');
    
    if (predictBtn) {
        predictBtn.addEventListener('click', predictRisk);
    }
    
    if (clearBtn) {
        clearBtn.addEventListener('click', clearForm);
    }
    
    if (exportBtn) {
        exportBtn.addEventListener('click', exportResults);
    }
}

// Get array of values from inputs
function getArray(className) {
    const values = Array.from(document.querySelectorAll(`.${className}`))
        .map(el => parseFloat(el.value))
        .filter(v => !isNaN(v));
    
    if (values.length === 0) return [];
    if (values.length === 1) return [values[0], values[0], values[0]];
    if (values.length === 2) return [values[0], values[1], values[1]];
    return values;
}

// Get checked checkboxes
function getChecked(name) {
    return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`))
        .map(el => el.value);
}

// Main prediction function
async function predictRisk() {
    if (state.isLoading) return;
    
    // Validate required fields
    const age = parseFloat(document.getElementById('age')?.value);
    const sex = document.getElementById('sex')?.value;
    
    if (!age || isNaN(age)) {
        showToast('Please enter patient age', 'error');
        highlightField('age');
        return;
    }
    
    if (!sex) {
        showToast('Please select patient sex', 'error');
        highlightField('sex');
        return;
    }
    
    // Get vitals
    const hr = getArray('hr');
    const spo2 = getArray('spo2');
    const map = getArray('map');
    const resp = getArray('resp');
    const temp = getArray('temp');
    
    if (hr.length === 0 || spo2.length === 0 || map.length === 0 || resp.length === 0 || temp.length === 0) {
        showToast('Please enter at least one value for each vital sign', 'warning');
        return;
    }
    
    // Get labs
    const lactate = getArray('lactate');
    const wbc = getArray('wbc');
    const creatinine = getArray('creatinine');
    const platelets = getArray('platelets');
    
    if (lactate.length === 0 || wbc.length === 0 || creatinine.length === 0 || platelets.length === 0) {
        showToast('Please enter at least one value for each lab test', 'warning');
        return;
    }
    
    // Build payload (Backend Contract)
    const payload = {
        age: age,
        gender: sex === 'Male' ? 1 : 0,
        
        vitals: {
            HR: hr,
            O2Sat: spo2,
            MAP: map,
            Resp: resp,
            Temp: temp
        },
        
        labs: {
            Lactate: lactate,
            WBC: wbc,
            Creatinine: creatinine,
            Platelets: platelets
        },
        
        comorbidities: getChecked('comorbidities'),
        interventions: getChecked('interventions')
    };
    
    // Display payload
    displayPayload(payload);
    
    // Set loading state
    setLoadingState(true);
    
    try {
        const response = await fetch('http://localhost:8000/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        
        const result = await response.json();
        displayResults(result);
        scrollToResults();
        showToast('Risk assessment completed!', 'success');
        
    } catch (error) {
        console.warn('Backend unavailable, using mock prediction:', error.message);
        
        // Mock prediction for demo
        const mockResult = generateMockPrediction(payload);
        displayResults(mockResult);
        scrollToResults();
        showToast('Demo mode: Backend unavailable', 'warning');
        
    } finally {
        setLoadingState(false);
    }
}

// Mock prediction generator
function generateMockPrediction(payload) {
    let score = 0;
    const factors = [];
    
    // Age
    if (payload.age > 65) {
        score += 15;
        factors.push(`Advanced age (${payload.age} years)`);
    } else if (payload.age > 50) {
        score += 8;
    }
    
    // Heart Rate
    const avgHR = average(payload.vitals.HR);
    if (avgHR > 120 || avgHR < 50) {
        score += 20;
        factors.push(`Abnormal HR (${avgHR.toFixed(0)} bpm)`);
    } else if (avgHR > 100 || avgHR < 60) {
        score += 10;
    }
    
    // SpO2
    const avgSpO2 = average(payload.vitals.O2Sat);
    if (avgSpO2 < 90) {
        score += 25;
        factors.push(`Severe hypoxemia (SpO₂: ${avgSpO2.toFixed(0)}%)`);
    } else if (avgSpO2 < 95) {
        score += 15;
        factors.push(`Low oxygen (SpO₂: ${avgSpO2.toFixed(0)}%)`);
    }
    
    // MAP
    const avgMAP = average(payload.vitals.MAP);
    if (avgMAP < 65) {
        score += 25;
        factors.push(`Hypotension (MAP: ${avgMAP.toFixed(0)} mmHg)`);
    } else if (avgMAP < 70 || avgMAP > 105) {
        score += 12;
    }
    
    // Respiratory Rate
    const avgResp = average(payload.vitals.Resp);
    if (avgResp > 28 || avgResp < 10) {
        score += 20;
        factors.push(`Abnormal RR (${avgResp.toFixed(0)} br/min)`);
    } else if (avgResp > 22 || avgResp < 12) {
        score += 10;
    }
    
    // Temperature
    const avgTemp = average(payload.vitals.Temp);
    if (avgTemp > 39 || avgTemp < 35) {
        score += 15;
        factors.push(`Temperature (${avgTemp.toFixed(1)}°C)`);
    }
    
    // Lactate
    const avgLactate = average(payload.labs.Lactate);
    if (avgLactate > 4) {
        score += 25;
        factors.push(`High lactate (${avgLactate.toFixed(1)} mmol/L)`);
    } else if (avgLactate > 2) {
        score += 12;
    }
    
    // Creatinine
    const avgCreat = average(payload.labs.Creatinine);
    if (avgCreat > 2) {
        score += 15;
        factors.push(`Elevated creatinine (${avgCreat.toFixed(2)} mg/dL)`);
    }
    
    // WBC
    const avgWBC = average(payload.labs.WBC);
    if (avgWBC > 15 || avgWBC < 4) {
        score += 12;
        factors.push(`Abnormal WBC (${avgWBC.toFixed(1)} ×10⁹/L)`);
    }
    
    // Platelets
    const avgPlatelets = average(payload.labs.Platelets);
    if (avgPlatelets < 100) {
        score += 15;
        factors.push(`Low platelets (${avgPlatelets.toFixed(0)} ×10⁹/L)`);
    }
    
    // Comorbidities & Interventions
    score += payload.comorbidities.length * 3;
    if (payload.interventions.includes('Mechanical Ventilation')) score += 10;
    if (payload.interventions.includes('Vasopressors')) score += 12;
    
    // Cap at 100
    score = Math.min(score, 100);
    
    // Risk level
    let risk_level;
    if (score >= 70) risk_level = 'HIGH';
    else if (score >= 40) risk_level = 'MEDIUM';
    else risk_level = 'LOW';
    
    // Explanation
    let explanation = `Based on the clinical data analysis, this patient has a **${risk_level}** risk of deterioration within 24-48 hours (Risk Score: ${score}%).\n\n`;
    
    if (factors.length > 0) {
        explanation += `**Key Contributing Factors:**\n`;
        factors.slice(0, 5).forEach(f => {
            explanation += `• ${f}\n`;
        });
        explanation += '\n';
    }
    
    if (payload.comorbidities.length > 0) {
        explanation += `**Comorbidities:** ${payload.comorbidities.join(', ')}\n\n`;
    }
    
    if (payload.interventions.length > 0) {
        explanation += `**Current Interventions:** ${payload.interventions.join(', ')}\n\n`;
    }
    
    explanation += `⚠️ **Disclaimer:** This assessment requires clinical validation. Continuous monitoring recommended.`;
    
    return {
        risk_score: score / 100,
        risk_level: risk_level,
        explanation: explanation
    };
}

// Display functions
function displayPayload(payload) {
    const display = document.getElementById('payload-display');
    if (display) {
        display.textContent = JSON.stringify(payload, null, 2);
        display.classList.add('has-data');
    }
}

function displayResults(result) {
    const scoreEl = document.getElementById('riskScore');
    const levelEl = document.getElementById('riskLevel');
    const explanationEl = document.getElementById('explanation');
    const ringContainer = document.querySelector('.score-ring-container');
    const scoreFill = document.getElementById('score-fill');
    const riskBadge = document.getElementById('risk-badge');
    
    const displayScore = Math.round(result.risk_score * 100);
    
    // Animate score
    if (scoreEl) {
        animateCounter(scoreEl, displayScore);
    }
    
    // Risk level
    if (levelEl) {
        levelEl.textContent = result.risk_level;
    }
    
    // Badge styling
    if (riskBadge) {
        riskBadge.classList.remove('low', 'medium', 'high');
        riskBadge.classList.add(result.risk_level.toLowerCase());
    }
    
    // Ring container styling
    if (ringContainer) {
        ringContainer.classList.remove('low', 'medium', 'high');
        ringContainer.classList.add(result.risk_level.toLowerCase());
    }
    
    // Animate ring
    if (scoreFill) {
        const circumference = 534;
        const offset = circumference - (circumference * displayScore / 100);
        scoreFill.style.strokeDashoffset = offset;
    }
    
    // Explanation (with markdown-like formatting)
    if (explanationEl) {
        let html = result.explanation
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
        explanationEl.innerHTML = `<p>${html}</p>`;
    }
    
    // Animate score particles
    animateScoreParticles();
    
    // Store result
    state.lastResult = result;
}

function animateCounter(element, target) {
    let current = 0;
    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    const interval = duration / steps;
    
    const animation = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(animation);
        }
        element.textContent = Math.round(current);
    }, interval);
}

function animateScoreParticles() {
    const particles = document.querySelectorAll('.score-particles span');
    
    particles.forEach((p, i) => {
        p.style.animation = 'none';
        p.offsetHeight;
        p.style.animation = `scoreParticle 1s ease ${i * 0.1}s forwards`;
    });
}

function setLoadingState(loading) {
    state.isLoading = loading;
    const btn = document.getElementById('predict-btn');
    
    if (!btn) return;
    
    if (loading) {
        btn.classList.add('loading');
        btn.disabled = true;
        btn.innerHTML = `
            <div class="btn-bg"></div>
            <span class="btn-spinner"></span>
            <span class="btn-text">Analyzing...</span>
        `;
    } else {
        btn.classList.remove('loading');
        btn.disabled = false;
        btn.innerHTML = `
            <div class="btn-bg"></div>
            <span class="btn-icon">🔮</span>
            <span class="btn-text">Predict Risk</span>
            <span class="btn-arrow">→</span>
            <div class="btn-shine"></div>
        `;
    }
}

function scrollToResults() {
    const results = document.getElementById('results-section');
    if (results) {
        setTimeout(() => {
            results.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    }
}

function highlightField(fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.style.borderColor = 'var(--danger)';
        field.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.2)';
        field.focus();
        
        setTimeout(() => {
            field.style.borderColor = '';
            field.style.boxShadow = '';
        }, 3000);
    }
}

// Clear form
function clearForm() {
    // Clear inputs
    document.querySelectorAll('input[type="text"], input[type="number"], input[type="date"]').forEach(input => {
        input.value = '';
    });
    
    // Reset selects
    document.querySelectorAll('select').forEach(select => {
        select.selectedIndex = 0;
    });
    
    // Uncheck checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });
    
    // Reset card states
    document.querySelectorAll('.vital-card, .lab-card').forEach(card => {
        card.classList.remove('warning', 'critical');
    });
    
    // Reset rings
    document.querySelectorAll('.ring-fill').forEach(ring => {
        ring.style.strokeDashoffset = '264';
    });
    
    // Reset lab bars
    document.querySelectorAll('.lab-bar-fill').forEach(bar => {
        bar.style.width = '0%';
    });
    
    // Reset results
    resetResults();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    showToast('Form cleared successfully', 'info');
}

function resetResults() {
    const scoreEl = document.getElementById('riskScore');
    const levelEl = document.getElementById('riskLevel');
    const explanationEl = document.getElementById('explanation');
    const scoreFill = document.getElementById('score-fill');
    const ringContainer = document.querySelector('.score-ring-container');
    const riskBadge = document.getElementById('risk-badge');
    const payloadDisplay = document.getElementById('payload-display');
    
    if (scoreEl) scoreEl.textContent = '--';
    if (levelEl) levelEl.textContent = 'Awaiting Analysis';
    
    if (explanationEl) {
        explanationEl.innerHTML = '<p class="placeholder-text">Complete the assessment form and click "Predict Risk" to receive an AI-generated clinical interpretation.</p>';
    }
    
    if (scoreFill) scoreFill.style.strokeDashoffset = '534';
    
    if (ringContainer) ringContainer.classList.remove('low', 'medium', 'high');
    if (riskBadge) riskBadge.classList.remove('low', 'medium', 'high');
    
    if (payloadDisplay) {
        payloadDisplay.textContent = 'No payload sent yet';
        payloadDisplay.classList.remove('has-data');
    }
    
    state.lastResult = null;
}

// Export results
function exportResults() {
    if (!state.lastResult) {
        showToast('No results to export', 'warning');
        return;
    }
    
    const result = state.lastResult;
    const patientId = document.getElementById('patient-id')?.value || 'Unknown';
    const age = document.getElementById('age')?.value || 'N/A';
    const sex = document.getElementById('sex')?.value || 'N/A';
    const timestamp = new Date().toLocaleString();
    
    const report = `
╔══════════════════════════════════════════════════════════════════╗
║           ICU EARLY DETERIORATION PREDICTION REPORT              ║
╠══════════════════════════════════════════════════════════════════╣
║  Generated: ${timestamp.padEnd(52)}║
╚══════════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────────┐
│  PATIENT INFORMATION                                            │
├─────────────────────────────────────────────────────────────────┤
│  Patient ID:     ${patientId.toString().padEnd(46)}│
│  Age:            ${(age + ' years').padEnd(46)}│
│  Sex:            ${sex.padEnd(46)}│
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  RISK ASSESSMENT RESULTS                                        │
├─────────────────────────────────────────────────────────────────┤
│  Risk Score:     ${(Math.round(result.risk_score * 100) + '%').padEnd(46)}│
│  Risk Level:     ${result.risk_level.padEnd(46)}│
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  AI CLINICAL INTERPRETATION                                     │
├─────────────────────────────────────────────────────────────────┤
${formatExplanation(result.explanation)}
└─────────────────────────────────────────────────────────────────┘

════════════════════════════════════════════════════════════════════
DISCLAIMER: This report is generated by a clinical decision support
tool and should not replace clinical judgment. All findings must be
validated by qualified healthcare professionals.
════════════════════════════════════════════════════════════════════
    `.trim();
    
    // Download
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ICU_Risk_Report_${patientId}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('Report exported successfully!', 'success');
}

function formatExplanation(text) {
    const clean = text.replace(/\*\*/g, '').replace(/\n/g, ' ');
    const words = clean.split(' ');
    const lines = [];
    let line = '';
    
    words.forEach(word => {
        if ((line + word).length <= 61) {
            line += (line ? ' ' : '') + word;
        } else {
            lines.push(line);
            line = word;
        }
    });
    if (line) lines.push(line);
    
    return lines.map(l => `│  ${l.padEnd(62)}│`).join('\n');
}

// ===================================
// TOAST NOTIFICATIONS
// ===================================
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const icon = document.getElementById('toast-icon');
    const msg = document.getElementById('toast-message');
    
    if (!toast) return;
    
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    
    if (icon) icon.textContent = icons[type] || icons.info;
    if (msg) msg.textContent = message;
    
    toast.classList.remove('success', 'error', 'warning', 'info', 'show');
    toast.classList.add(type, 'show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// ===================================
// KEYBOARD SHORTCUTS
// ===================================
function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + Enter = Predict
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            predictRisk();
        }
        
        // Ctrl/Cmd + Shift + C = Clear
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            clearForm();
        }
        
        // Ctrl/Cmd + E = Export
        if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
            e.preventDefault();
            exportResults();
        }
        
        // Escape = Blur
        if (e.key === 'Escape') {
            document.activeElement.blur();
        }
    });
}

// ===================================
// SCROLL EFFECTS
// ===================================
function initScrollEffects() {
    const header = document.getElementById('header');
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        // Header background opacity
        if (header) {
            const opacity = Math.min(currentScroll / 100, 1);
            header.style.setProperty('--header-opacity', opacity);
        }
        
        lastScroll = currentScroll;
    });
}

// ===================================
// UTILITY FUNCTIONS
// ===================================
function average(arr) {
    if (!arr || arr.length === 0) return 0;
    return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// ===================================
// DYNAMIC STYLES
// ===================================
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes rippleAnim {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes inputRipple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes criticalShake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
        20%, 40%, 60%, 80% { transform: translateX(4px); }
    }
    
    @keyframes alertSlideOut {
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
    
    @keyframes scoreParticle {
        0% {
            opacity: 0;
            transform: scale(0) translate(-50%, -50%);
        }
        50% {
            opacity: 1;
            transform: scale(1.5) translate(-50%, -50%);
        }
        100% {
            opacity: 0;
            transform: scale(0) translate(-50%, -50%);
        }
    }
`;
document.head.appendChild(dynamicStyles);

// ===================================
// CONSOLE BRANDING
// ===================================
function consoleBranding() {
    console.log(
        '%c ICU Monitor Pro %c v2.1 ',
        'background: linear-gradient(135deg, #6366f1, #a855f7); color: white; font-size: 24px; font-weight: bold; padding: 12px 24px; border-radius: 12px 0 0 12px;',
        'background: #0a0a0f; color: #818cf8; font-size: 14px; padding: 12px 18px; border-radius: 0 12px 12px 0; border: 1px solid #6366f1;'
    );
    
    console.log('%c⌨️ Keyboard Shortcuts:', 'color: #a855f7; font-weight: bold; font-size: 14px;');
    console.log('   %cCtrl/Cmd + Enter%c    → Run Prediction', 'color: #6366f1; font-weight: bold;', 'color: #888;');
    console.log('   %cCtrl/Cmd + Shift + C%c → Clear Form', 'color: #6366f1; font-weight: bold;', 'color: #888;');
    console.log('   %cCtrl/Cmd + E%c        → Export Results', 'color: #6366f1; font-weight: bold;', 'color: #888;');
    console.log('   %cEscape%c              → Clear Focus', 'color: #6366f1; font-weight: bold;', 'color: #888;');
}

// ===================================
// EXPOSE FUNCTIONS GLOBALLY (for HTML onclick if needed)
// ===================================
window.predictRisk = predictRisk;
window.clearForm = clearForm;
window.exportResults = exportResults;