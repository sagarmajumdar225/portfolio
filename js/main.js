// Main JavaScript for Portfolio Website
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // Sticky Header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '20px 0';
            header.style.boxShadow = 'none';
        }
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation on Scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const countUp = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCount = () => {
            current += increment;
            if (current < target) {
                element.innerText = Math.ceil(current);
                requestAnimationFrame(updateCount);
            } else {
                element.innerText = target;
            }
        };
        
        updateCount();
    };

    // Trigger counter when stats section is in view
    const statsSection = document.querySelector('.stats-container');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statNumbers.forEach(num => countUp(num));
                    statsObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        statsObserver.observe(statsSection);
    }

    // Skill Bar Animation
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width;
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (name && email && subject && message) {
                // In a real implementation, you would send the form data to a server
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Initialize Radar Chart
    initRadarChart();
});

// Initialize Radar Chart for Skills
function initRadarChart() {
    const ctx = document.getElementById('radarChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Penetration Testing', 'Ethical Hacking', 'Vulnerability Assessment', 'Network Security', 'Web Security', 'Security Tools'],
                datasets: [{
                    label: 'Skill Level',
                    data: [90, 85, 88, 82, 78, 92],
                    backgroundColor: 'rgba(0, 255, 157, 0.2)',
                    borderColor: 'rgba(0, 255, 157, 1)',
                    pointBackgroundColor: 'rgba(0, 255, 157, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(0, 255, 157, 1)'
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        pointLabels: {
                            color: '#a0a0b0',
                            font: {
                                size: 12
                            }
                        },
                        ticks: {
                            backdropColor: 'transparent',
                            color: '#a0a0b0',
                            stepSize: 20
                        },
                        min: 0,
                        max: 100
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff',
                            font: {
                                family: "'Orbitron', sans-serif"
                            }
                        }
                    }
                }
            }
        });
    }
}