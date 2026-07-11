// Advanced Animations for Portfolio Website
document.addEventListener('DOMContentLoaded', function() {
    // Floating Elements Animation
    const floatingItems = document.querySelectorAll('.floating-item');
    
    floatingItems.forEach((item, index) => {
        const speed = item.getAttribute('data-speed') || 1;
        let y = 0;
        let direction = 1;
        
        function animate() {
            y += 0.05 * speed * direction;
            
            if (y > 20 || y < -20) {
                direction *= -1;
            }
            
            item.style.transform = `translateY(${y}px) rotate(${y * 0.5}deg)`;
            requestAnimationFrame(animate);
        }
        
        animate();
    });

    // Cyber Grid Background Animation
    const cyberGridBg = document.querySelector('.cyber-grid-bg');
    if (cyberGridBg) {
        let position = 0;
        
        function animateGrid() {
            position += 0.2;
            cyberGridBg.style.backgroundPosition = `${position}px ${position}px`;
            requestAnimationFrame(animateGrid);
        }
        
        animateGrid();
    }

    // Particle Effect for Hero Section
    createParticles();

    // Scroll-based animations
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero');
        
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.backgroundPositionY = `${speed}px`;
        }
    });

    // Typewriter Effect for Hero Text
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        let i = 0;
        const typingSpeed = 50;
        
        function typeWriter() {
            if (i < text.length) {
                heroSubtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, typingSpeed);
            }
        }
        
        // Start typing after a delay
        setTimeout(typeWriter, 1500);
    }

    // Project Card Hover Effects
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Certification Card Animation
    const certCards = document.querySelectorAll('.certification-card');
    
    certCards.forEach((card, index) => {
        // Add delay for staggered animation
        card.style.transitionDelay = `${index * 0.1}s`;
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Create Particle Effect
function createParticles() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: var(--primary-color);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.1};
            animation: floatParticle ${Math.random() * 10 + 5}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        heroSection.appendChild(particle);
    }
    
    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0%, 100% { transform: translate(0, 0); }
            25% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); }
            50% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); }
            75% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); }
        }
        
        .particle {
            z-index: -1;
        }
    `;
    
    document.head.appendChild(style);
}

// Dark Mode Toggle
function initDarkModeToggle() {
    const toggleButton = document.createElement('div');
    toggleButton.className = 'dark-mode-toggle';
    toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(toggleButton);
    
    let isDarkMode = true;
    
    toggleButton.addEventListener('click', function() {
        isDarkMode = !isDarkMode;
        
        if (isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            this.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            this.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
}

// Initialize Dark Mode
document.addEventListener('DOMContentLoaded', initDarkModeToggle);