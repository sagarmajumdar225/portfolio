// Main JS Logic for Cybersecurity Portfolio Redesign

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Core Modules
    initPreloader();
    initNetworkCanvas();
    initMobileNav();
    initStickyHeader();
    initConsoleWidget();
    initRadarChart();
    initStatsCounter();
    initSkillBars();
    initCaseStudies();
    initContactForm();
});

// --- 1. Hacker Preloader Boot Sequence ---
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const terminal = document.getElementById('loaderTerminal');
    const progressBar = document.getElementById('loaderProgress');
    
    if (!preloader || !terminal) return;
    
    const bootLogs = [
        { text: "SYSTEM STATUS INITIALIZATION...", type: "info" },
        { text: "Probing network adapter eth0...", type: "info" },
        { text: "IP Address: 192.168.100.225 [LEASED]", type: "info" },
        { text: "DHCP server responded: 200 OK", type: "success" },
        { text: "Loading firewall parameters...", type: "info" },
        { text: "Firewall Integrity: 100% SECURE (Zero-Trust Active)", type: "success" },
        { text: "Decrypting profile volume...", type: "info" },
        { text: "Decryption: COMPLETE [Key SHA-256 Match]", type: "success" },
        { text: "User profile found: Sagar Majumdar (Vulnerability Researcher)", type: "success" },
        { text: "Mounting operations registry...", type: "info" },
        { text: "Warning: Port 22 is disabled. SSH access is limited.", type: "warning" },
        { text: "Compiling core experience matrices...", type: "info" },
        { text: "BOOT SEQUENCE COMPLETE. Starting UI.", type: "success" }
    ];
    
    let currentLogIndex = 0;
    const totalDuration = 2200; // Total loading time in ms
    const logInterval = totalDuration / bootLogs.length;
    
    function printNextLog() {
        if (currentLogIndex < bootLogs.length) {
            const log = bootLogs[currentLogIndex];
            const logLine = document.createElement('div');
            logLine.className = 'loader-line';
            
            if (log.type === "success") {
                logLine.innerHTML = `[ <span class="loader-success">OK</span> ] ${log.text}`;
            } else if (log.type === "warning") {
                logLine.innerHTML = `[ <span class="loader-warning">WARN</span> ] ${log.text}`;
            } else {
                logLine.innerHTML = `[ <span style="color: var(--secondary)">INFO</span> ] ${log.text}`;
            }
            
            terminal.appendChild(logLine);
            terminal.scrollTop = terminal.scrollHeight;
            
            currentLogIndex++;
            
            // Update progress bar
            const percent = (currentLogIndex / bootLogs.length) * 100;
            progressBar.style.width = `${percent}%`;
            
            setTimeout(printNextLog, logInterval);
        } else {
            // Boot sequence complete - hide screen
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.transition = 'opacity 0.6s ease';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 600);
            }, 300);
        }
    }
    
    // Start printing
    setTimeout(printNextLog, 200);
}

// --- 2. Mobile Navigation Toggle ---
function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Dynamic rotate hamburger lines
        if (hamburger.classList.contains('active')) {
            hamburger.children[0].style.transform = 'translateY(8px) rotate(45deg)';
            hamburger.children[1].style.opacity = '0';
            hamburger.children[2].style.transform = 'translateY(-8px) rotate(-45deg)';
        } else {
            hamburger.children[0].style.transform = 'none';
            hamburger.children[1].style.opacity = '1';
            hamburger.children[2].style.transform = 'none';
        }
    });

    // Close menu when clicking navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.children[0].style.transform = 'none';
            hamburger.children[1].style.opacity = '1';
            hamburger.children[2].style.transform = 'none';
        });
    });
}

// --- 3. Sticky Navigation Header ---
function initStickyHeader() {
    const header = document.getElementById('header');
    if (!header) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
}

// --- 4. Interactive Guest Cyber Terminal ---
function initConsoleWidget() {
    const consoleInput = document.getElementById('consoleInput');
    const consoleBody = document.getElementById('consoleBody');
    
    if (!consoleInput || !consoleBody) return;
    
    // Focus console input when clicking anywhere inside the terminal box
    consoleBody.parentNode.addEventListener('click', () => {
        consoleInput.focus();
    });
    
    consoleInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const command = consoleInput.value.trim().toLowerCase();
            processConsoleCommand(command);
            consoleInput.value = '';
        }
    });
}

function processConsoleCommand(command) {
    const consoleBody = document.getElementById('consoleBody');
    const promptRow = consoleBody.querySelector('.console-prompt-row');
    
    // Append the executed prompt
    const logPrompt = document.createElement('div');
    logPrompt.className = 'console-log-row';
    logPrompt.innerHTML = `<span class="console-path">sec-guest@sagarmajumdar:~$</span> <span>${command}</span>`;
    consoleBody.insertBefore(logPrompt, promptRow);
    
    // Process output
    const outputRow = document.createElement('div');
    outputRow.className = 'console-log-row';
    
    if (command === '') {
        // Empty command - do nothing
        return;
    }
    
    switch (command) {
        case 'help':
            outputRow.innerHTML = `
Available security queries:
  <span class="c-var">about</span>      Display biography summary
  <span class="c-var">skills</span>     Analyze security technical metrics
  <span class="c-var">projects</span>   Show list of audited case studies
  <span class="c-var">contact</span>    Print secure communication packets
  <span class="c-var">sysinfo</span>    System posture diagnostics
  <span class="c-var">clear</span>      Purge console logs
            `;
            break;
            
        case 'about':
            outputRow.innerHTML = `
Sagar Majumdar - Cybersecurity Specialist & Ethical Hacker.
Focuses on penetration testing and defensive engineering, helping organizations secure infrastructure. Currently serves as Branch Head at CBCE Habra IT training, leading curriculum in Web Security.
            `;
            break;
            
        case 'skills':
            outputRow.innerHTML = `
Technical Matrix levels:
  Penetration Testing       [====================] 90%
  Ethical Hacking           [==================  ] 85%
  Vulnerability Audit       [=================== ] 88%
  Web App Security          [==================  ] 86%
  Network Auditing          [================    ] 82%
  Security Tools            [=================== ] 88%
            `;
            break;
            
        case 'projects':
            outputRow.innerHTML = `
Active Case Studies in database:
  [0] <span class="c-class">Enterprise Penetration Assessment</span> (AD Auditor)
  [1] <span class="c-class">Automated Perimeter Scanner</span> (Python Utility)
  [2] <span class="c-class">E-Commerce Security Hardening</span> (OWASP Review)
Type the index number or click cards below to view complete details.
            `;
            break;
            
        case 'contact':
            outputRow.innerHTML = `
Secure communication pathways:
  Email:    <span class="c-string">sagarmajumdar225@gmail.com</span>
  WhatsApp: <span class="c-string">+91 6296600565</span>
  LinkedIn: <span class="c-string">linkedin.com/in/sagarmajumdar</span>
  GitHub:   <span class="c-string">github.com/sagarmajumdar225</span>
            `;
            break;
            
        case 'sysinfo':
            const randomIP = `192.168.10.${Math.floor(Math.random() * 254) + 1}`;
            outputRow.innerHTML = `
System Posture: Secure
Console Shell:  SagarOS v3.5-guest
Gateway IP:     ${randomIP}
Active Port:    443/HTTPS (Encrypted TLS)
Latency:        42ms
Vulnerabilities:0 critical detected.
            `;
            break;
            
        case 'clear':
            // Remove all log rows except the prompt
            const logs = consoleBody.querySelectorAll('.console-log-row');
            logs.forEach(log => log.remove());
            return;
            
        default:
            outputRow.innerHTML = `Command not found: '${command}'. Type <span class="c-var">help</span> for assistance.`;
            break;
    }
    
    consoleBody.insertBefore(outputRow, promptRow);
    consoleBody.scrollTop = consoleBody.scrollHeight;
}

// --- 5. Chart.js Radar Visualization ---
function initRadarChart() {
    const ctx = document.getElementById('radarChart');
    if (!ctx) return;
    if (typeof Chart === 'undefined') {
        console.warn("Chart.js is not loaded.");
        return;
    }
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: [
                'Infrastructure Audit', 
                'Web Pentesting', 
                'Active Directory', 
                'Scripting & Automation', 
                'Vulnerability Scans', 
                'Network Analysis'
            ],
            datasets: [{
                label: 'Capability Rating',
                data: [90, 86, 82, 80, 88, 85],
                backgroundColor: 'rgba(0, 255, 136, 0.12)',
                borderColor: 'rgba(0, 255, 136, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                pointBorderColor: '#ffffff',
                pointHoverBackgroundColor: '#ffffff',
                pointHoverBorderColor: 'rgba(0, 255, 136, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.08)'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.08)'
                    },
                    pointLabels: {
                        color: '#9ca3af',
                        font: {
                            family: "'Space Grotesk', sans-serif",
                            size: 11
                        }
                    },
                    ticks: {
                        backdropColor: 'transparent',
                        color: '#4b5563',
                        stepSize: 20
                    },
                    min: 0,
                    max: 100
                }
            },
            plugins: {
                legend: {
                    display: false // Clean visual, no label overlay needed
                }
            }
        }
    });
}

// --- 6. Stats Counter Animation ---
function initStatsCounter() {
    const statElements = document.querySelectorAll('.stat-val');
    if (statElements.length === 0) return;
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const countUp = (element) => {
        const target = parseInt(element.getAttribute('data-target'), 10);
        const duration = 1800; // Counter timing in ms
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCount = () => {
            current += increment;
            if (current < target) {
                element.innerText = Math.ceil(current);
                requestAnimationFrame(updateCount);
            } else {
                element.innerText = target + (target === 3 ? "+" : target === 150 ? "+" : "+");
            }
        };
        
        updateCount();
    };
    
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statElements.forEach(el => countUp(el));
                observer.disconnect(); // Fire once only
            }
        });
    }, observerOptions);
    
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        statsObserver.observe(aboutSection);
    }
}

// --- 7. Progress Skill Bars Trigger ---
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar-inner');
    if (skillBars.length === 0) return;
    
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            }
        });
    }, { threshold: 0.2 });
    
    skillBars.forEach(bar => {
        barObserver.observe(bar);
    });
}

// --- 8. Case Study Database & Modal Logic ---
const projectCaseStudies = [
    {
        title: "Enterprise Penetration Assessment",
        overviewHeader: "Project Objective & Scope",
        overviewText: "Commissioned by a regional financial firm to audit their internal active directory infrastructure and network domain controllers containing critical banking ledgers. The objective was to simulate an advanced post-exploitation footprint (assume breach) and identify paths leading to domain controller takeovers.",
        methodology: [
            "Network reconnaissance and LLMNR/NBT-NS poisoning checks using Responder.",
            "Active Directory enumeration and Kerberoasting to extract service account ticket hashes.",
            "Cracking hashes locally and exploiting weak access configurations to perform privilege escalations.",
            "Dumping SAM databases and establishing persistent credential pipelines on nested servers."
        ],
        tools: ["Kali Linux", "Mimikatz", "Nmap", "BloodHound", "Responder", "John the Ripper"],
        results: [
            "Identified 12 high-impact misconfigurations in Active Directory Group Policies.",
            "Secured 500+ employee endpoints from credentials harvesting strategies.",
            "Developed an AD audit checklist and migration path to implement tiering structure.",
            "Ensured zero-trust perimeter configuration aligned with national banking compliance frameworks."
        ]
    },
    {
        title: "Automated Perimeter Scanner",
        overviewHeader: "Design & Implementation",
        overviewText: "Manual port mapping and service finger-printing can cause delays in threat intelligence assessment phases. This project was developed as a lightweight, custom Python multi-threaded scanning framework designed to conduct secure perimeter auditing, banner analysis, and automate matches against active CVE catalog APIs.",
        methodology: [
            "Engineered socket-level TCP connection handlers implementing custom timeout limits.",
            "Designed asynchronous threading pools to handle parallel connection processes without bloating RAM.",
            "Integrated regex pattern matching for active banner parsing (fetching version data).",
            "Incorporated automated queries contacting NIST NVD CVE databases to retrieve severity rankings."
        ],
        tools: ["Python", "Scapy", "NVD API Services", "Regex Engine", "Bash Scripting"],
        results: [
            "Reduced external boundary reconnaissance cycles by 40% compared to typical baseline scans.",
            "Implemented an automated HTML report generator outlining security vulnerabilities and patch recommendations.",
            "Capable of scanning 1,000+ public IP boundaries in less than 3 minutes.",
            "Uploaded tool as open-source documentation to aid regional system administrators."
        ]
    },
    {
        title: "E-Commerce Security Hardening",
        overviewHeader: "Application Integrity Review",
        overviewText: "Conducted security assessment of an online retailer processing high volumes of transactions. The scope involved auditing web services for input parsing failures, secure state transitions, and compliance against the OWASP Top 10 web vulnerabilities standards.",
        methodology: [
            "Mapped system routes to test injection vectors (SQLi, XSS, Path Traversal).",
            "Analyzed secure session cookies settings, checking protection parameters (HTTPOnly, Secure flags).",
            "Performed code auditing on payment handlers and checkout API pipelines.",
            "Simulated database extraction attacks using automated SQLMap scripts."
        ],
        tools: ["Burp Suite Professional", "SQLMap", "OWASP ZAP Scanner", "Firefox Developer Tools"],
        results: [
            "Remedied 3 SQL Injection vulnerability points on production checkout paths.",
            "Hardened user accounts sessions management through JWT signature validations and rotation rules.",
            "Implemented Content Security Policies (CSP) to restrict XSS attack parameters.",
            "Assisted the development crew in implementing secure code review checklists, resulting in zero breaches."
        ]
    }
];

function initCaseStudies() {
    const modalOverlay = document.getElementById('modalOverlay');
    const closeBtn = document.getElementById('modalClose');
    const closeFooter = document.getElementById('modalCloseFooter');
    const projectCards = document.querySelectorAll('.project-card');
    const tabButtons = document.querySelectorAll('.modal-tab-btn');
    
    if (!modalOverlay || projectCards.length === 0) return;
    
    let activeProjectData = null;
    
    // Open Modal
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-project'), 10);
            activeProjectData = projectCaseStudies[index];
            
            if (activeProjectData) {
                populateModal(activeProjectData);
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Stop background scrolling
            }
        });
    });
    
    // Close Modal events
    const closeModal = () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    closeBtn.addEventListener('click', closeModal);
    closeFooter.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Tab switching inside modal
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            tabButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const targetTab = this.getAttribute('data-tab');
            const panes = document.querySelectorAll('.modal-pane');
            panes.forEach(pane => pane.classList.remove('active'));
            
            if (targetTab === 'overview') document.getElementById('modalTabOverview').classList.add('active');
            if (targetTab === 'methodology') document.getElementById('modalTabMethodology').classList.add('active');
            if (targetTab === 'tools') document.getElementById('modalTabTools').classList.add('active');
            if (targetTab === 'results') document.getElementById('modalTabResults').classList.add('active');
        });
    });
}

function populateModal(data) {
    // Reset active tab status
    document.querySelectorAll('.modal-tab-btn').forEach((b, i) => {
        if (i === 0) b.classList.add('active');
        else b.classList.remove('active');
    });
    document.querySelectorAll('.modal-pane').forEach((p, i) => {
        if (i === 0) p.classList.add('active');
        else p.classList.remove('active');
    });
    
    // Populate text
    document.getElementById('modalProjectTitle').innerText = data.title;
    document.getElementById('overviewHeader').innerText = data.overviewHeader;
    document.getElementById('overviewText').innerText = data.overviewText;
    
    // Populate Methodology List
    const methodologyList = document.getElementById('methodologyList');
    methodologyList.innerHTML = '';
    data.methodology.forEach(item => {
        const li = document.createElement('li');
        li.innerText = item;
        methodologyList.appendChild(li);
    });
    
    // Populate Tools Badges
    const toolsList = document.getElementById('toolsList');
    toolsList.innerHTML = '';
    data.tools.forEach(tool => {
        const badge = document.createElement('span');
        badge.className = 'modal-tool-badge';
        badge.innerText = tool;
        toolsList.appendChild(badge);
    });
    
    // Populate Results List
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = '';
    data.results.forEach(item => {
        const li = document.createElement('li');
        li.innerText = item;
        resultsList.appendChild(li);
    });
}

// --- 9. Contact Form Scoping Handler ---
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        if (name && email && subject && message) {
            // Success alert simulating system transaction
            alert(`[PACKET TRANSMITTED]
Connection Status: 200 OK
Payload Securely Delivered! Thank you, ${name}. I will contact you shortly.`);
            form.reset();
        } else {
            alert("Error: Scoping packet payload is empty. Complete all fields.");
        }
    });
}

// --- 10. Interactive Network Node Background ---
function initNetworkCanvas() {
    const canvas = document.getElementById('networkCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    const maxParticles = 60; // Optimal density for performance and layout clean feel
    const connectionDist = 110;
    
    const mouse = {
        x: null,
        y: null,
        radius: 160
    };
    
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    
    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resize();
    window.addEventListener('resize', resize);
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5; // Slow movement
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 1.5 + 1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            // Bounce on edges
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            
            // Mouse push effect (slightly push away from mouse)
            if (mouse.x !== null && mouse.y !== null) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.hypot(dx, dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    this.x += (dx / dist) * force * 1.5;
                    this.y += (dy / dist) * force * 1.5;
                }
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 255, 136, 0.4)';
            ctx.fill();
        }
    }
    
    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw and update particles
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        // Draw connection lines
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const p1 = particles[i];
                const p2 = particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.hypot(dx, dy);
                
                if (dist < connectionDist) {
                    const alpha = (1 - (dist / connectionDist)) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(0, 255, 136, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
            
            // Connect to mouse pointer
            if (mouse.x !== null && mouse.y !== null) {
                const p = particles[i];
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.hypot(dx, dy);
                
                if (dist < mouse.radius) {
                    const alpha = (1 - (dist / mouse.radius)) * 0.25;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}