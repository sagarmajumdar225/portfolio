// Advanced Animations Script for Cybersecurity Portfolio

document.addEventListener('DOMContentLoaded', function() {
    initSmoothScroll();
    initCursorGlow();
    initEntranceAnimations();
    initTypewriter();
    initCard3DTilt();
    initMagneticButtons();
});

// --- 1. Lenis Smooth Scroll Initialization ---
function initSmoothScroll() {
    if (typeof Lenis === 'undefined') return;
    
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom exponential easing
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    // Sync ScrollTrigger with Lenis and drive animation frames
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
    } else {
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }

    // Connect standard anchor scrolling links to Lenis
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                lenis.scrollTo(target, {
                    offset: -80, // Accounts for sticky header height
                    duration: 1.2
                });
            }
        });
    });
}

// --- 2. Interactive Cursor Spotlight Glow ---
function initCursorGlow() {
    if (typeof gsap === 'undefined') return;
    const glow = document.getElementById('cursorGlow');
    if (!glow) return;
    
    document.addEventListener('mousemove', function(e) {
        // Spotlight positions relative to viewport coordinates
        gsap.to(glow, {
            left: e.clientX,
            top: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
    });
}

// --- 3. GSAP ScrollTrigger Entrance Animations ---
function initEntranceAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section staggered entrance
    const heroTimeline = gsap.timeline();
    
    heroTimeline.from('.security-badge-wrapper', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 2.3, // Allow boot preloader sequence to finish first
        ease: "power3.out"
    })
    .from('.hero-title span', {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.4")
    .from('.hero-subtitle-container', {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power3.out"
    }, "-=0.5")
    .from('.hero-desc', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out"
    }, "-=0.4")
    .from('.hero-ctas', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out"
    }, "-=0.4")
    .from('.hero-image-wrapper', {
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.8");

    // Reveal Section Titles on scroll
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 30,
            duration: 0.7,
            ease: "power3.out"
        });
    });

    // Reveal About Profile elements
    gsap.from('.about-desc p', {
        scrollTrigger: {
            trigger: '.about-desc',
            start: "top 80%"
        },
        opacity: 0,
        y: 25,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out"
    });

    gsap.from('.stat-card', {
        scrollTrigger: {
            trigger: '.stats-grid',
            start: "top 85%"
        },
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out"
    });

    gsap.from('.code-panel', {
        scrollTrigger: {
            trigger: '.code-panel',
            start: "top 80%"
        },
        opacity: 0,
        x: 40,
        duration: 0.8,
        ease: "power3.out"
    });

    // Staggered Timeline entry for Experience logs
    gsap.utils.toArray('.timeline-item').forEach((item, index) => {
        const card = item.querySelector('.timeline-card');
        const node = item.querySelector('.timeline-node');
        
        const direction = index % 2 === 0 ? -40 : 40;
        
        gsap.from(card, {
            scrollTrigger: {
                trigger: item,
                start: "top 80%"
            },
            opacity: 0,
            x: direction,
            duration: 0.8,
            ease: "power3.out"
        });

        gsap.from(node, {
            scrollTrigger: {
                trigger: item,
                start: "top 80%"
            },
            scale: 0,
            duration: 0.5,
            delay: 0.2,
            ease: "back.out(1.7)"
        });
    });

    // Contact Panel and Form entries
    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact-layout',
            start: "top 80%"
        },
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: "power3.out"
    });

    gsap.from('.contact-form-box', {
        scrollTrigger: {
            trigger: '.contact-layout',
            start: "top 80%"
        },
        opacity: 0,
        x: 30,
        duration: 0.8,
        ease: "power3.out"
    });
}

// --- 4. Interactive Role Typewriter ---
function initTypewriter() {
    const subtitle = document.getElementById('typewriter');
    if (!subtitle) return;
    
    const roles = [
        "Cyber Security Specialist",
        "Ethical Hacker",
        "Penetration Tester",
        "Branch Director @ CBCE HABRA"
    ];
    
    let currentRoleIdx = 0;
    let currentCharIdx = 0;
    let isDeleting = false;
    let typingSpeed = 70;
    
    function handleType() {
        const fullText = roles[currentRoleIdx];
        
        if (isDeleting) {
            subtitle.innerText = fullText.substring(0, currentCharIdx - 1);
            currentCharIdx--;
            typingSpeed = 30; // Quicker backspace
        } else {
            subtitle.innerText = fullText.substring(0, currentCharIdx + 1);
            currentCharIdx++;
            typingSpeed = 70; // Normal type
        }
        
        // Handle transitions
        if (!isDeleting && currentCharIdx === fullText.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at full text
        } else if (isDeleting && currentCharIdx === 0) {
            isDeleting = false;
            currentRoleIdx = (currentRoleIdx + 1) % roles.length;
            typingSpeed = 400; // Brief pause before typing next word
        }
        
        setTimeout(handleType, typingSpeed);
    }
    
    // Begin typing sequence after preloader exits
    setTimeout(handleType, 2800);
}

// --- 5. Interactive 3D Card Mouse Tilt ---
function initCard3DTilt() {
    if (typeof gsap === 'undefined') return;
    // Select glassmorphic cards
    const tiltCards = document.querySelectorAll('.project-card, .stat-card, .cert-card, .code-panel');
    if (tiltCards.length === 0) return;
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            
            // Mouse offsets relative to element center
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            const dx = x - xc;
            const dy = y - yc;
            
            // Limit tilt values to keep it premium
            const tiltLimit = 8; 
            const tiltX = (dy / yc) * -tiltLimit;
            const tiltY = (dx / xc) * tiltLimit;
            
            // Apply 3D transform properties
            gsap.to(this, {
                transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset position smoothly
            gsap.to(this, {
                transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)",
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });
}

// --- 6. Magnetic Buttons Effect ---
function initMagneticButtons() {
    if (typeof gsap === 'undefined') return;
    const items = document.querySelectorAll('.btn-primary, .btn-secondary, .social-rack-btn, .floating-action-btn');
    if (items.length === 0) return;
    
    items.forEach(el => {
        el.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            
            // Calculate hover delta distance
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Magnetic pull (35% factor)
            gsap.to(this, {
                x: x * 0.35,
                y: y * 0.35,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        el.addEventListener('mouseleave', function() {
            // Spring back to standard position
            gsap.to(this, {
                x: 0,
                y: 0,
                duration: 0.6,
                ease: "elastic.out(1.2, 0.4)"
            });
        });
    });
}