// ============================================
// 1. CURSOR GLOW (Enhanced)
// ============================================
const cursorGlow = document.getElementById('cursor-glow');

if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
}

// ============================================
// 2. 3D TILT EFFECT ON CARDS
// ============================================
const tiltElements = document.querySelectorAll('[data-tilt]');

tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });
    
    el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ============================================
// 3. LIVE STATUS
// ============================================
const statusTexts = [
    'Currently exploring: React.js & Tailwind CSS',
    'Building: New portfolio projects',
    'Learning: Advanced JavaScript',
    'Available for freelance work'
];
let statusIndex = 0;
const statusElement = document.querySelector('.status-text');

if (statusElement) {
    setInterval(() => {
        statusIndex = (statusIndex + 1) % statusTexts.length;
        statusElement.textContent = statusTexts[statusIndex];
    }, 5000);
}

// ============================================
// 4. VISITOR COUNTER (Reliable with retry)
// ============================================
async function getVisitorCount() {
    const countElement = document.getElementById('visitor-count');
    if (!countElement) return;

    const cached = localStorage.getItem('visitorCount');
    if (cached) countElement.textContent = cached;

    const fetchWithRetry = async (retries = 3, delay = 1000) => {
        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch('https://api.countapi.xyz/hit/cthyrnmngt718/visits');
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const data = await response.json();
                if (data && typeof data.value === 'number') return data.value;
                throw new Error('Invalid response');
            } catch (e) {
                if (i === retries - 1) throw e;
                await new Promise(r => setTimeout(r, delay * Math.pow(2, i)));
            }
        }
    };

    try {
        const count = await fetchWithRetry();
        countElement.textContent = count;
        localStorage.setItem('visitorCount', count);
    } catch (error) {
        console.warn('Visitor counter fallback:', error);
        if (!sessionStorage.getItem('visitorCounted')) {
            let localCount = parseInt(localStorage.getItem('visitorCount') || '0');
            localCount++;
            localStorage.setItem('visitorCount', localCount);
            sessionStorage.setItem('visitorCounted', 'true');
            countElement.textContent = localCount;
        } else {
            countElement.textContent = localStorage.getItem('visitorCount') || '0';
        }
    }
}
document.addEventListener('DOMContentLoaded', getVisitorCount);

// ============================================
// 5. QUOTE OF THE DAY (Bible Verses)
// ============================================
const bibleVerses = [
    { text: "I can do all things through Christ who strengthens me.", author: "Philippians 4:13" },
    { text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.", author: "Jeremiah 29:11" },
    { text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", author: "Joshua 1:9" },
    { text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.", author: "Proverbs 3:5-6" },
    { text: "The Lord is my shepherd; I shall not want.", author: "Psalm 23:1" },
    { text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.", author: "Philippians 4:6" },
    { text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", author: "John 3:16" },
    { text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles.", author: "Isaiah 40:31" },
    { text: "The Lord is my light and my salvation—whom shall I fear?", author: "Psalm 27:1" },
    { text: "Be still, and know that I am God.", author: "Psalm 46:10" },
    { text: "Let your light shine before others, that they may see your good deeds and glorify your Father in heaven.", author: "Matthew 5:16" },
    { text: "The fear of the Lord is the beginning of wisdom, and knowledge of the Holy One is understanding.", author: "Proverbs 9:10" },
    { text: "Love the Lord your God with all your heart and with all your soul and with all your mind and with all your strength.", author: "Mark 12:30" },
    { text: "The peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.", author: "Philippians 4:7" },
    { text: "For we walk by faith, not by sight.", author: "2 Corinthians 5:7" },
    { text: "The Lord will fight for you; you need only to be still.", author: "Exodus 14:14" },
    { text: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind.", author: "Romans 12:2" },
    { text: "Above all else, guard your heart, for everything you do flows from it.", author: "Proverbs 4:23" },
    { text: "Commit to the Lord whatever you do, and he will establish your plans.", author: "Proverbs 16:3" },
    { text: "The Lord is gracious and compassionate, slow to anger and rich in love.", author: "Psalm 145:8" },
    { text: "Your word is a lamp for my feet, a light on my path.", author: "Psalm 119:105" },
    { text: "For the Lord gives wisdom; from his mouth come knowledge and understanding.", author: "Proverbs 2:6" },
    { text: "The name of the Lord is a fortified tower; the righteous run to it and are safe.", author: "Proverbs 18:10" },
    { text: "The Lord is my strength and my shield; my heart trusts in him, and he helps me.", author: "Psalm 28:7" },
    { text: "Cast all your anxiety on him because he cares for you.", author: "1 Peter 5:7" },
    { text: "For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.", author: "2 Timothy 1:7" },
    { text: "The Lord is good to those whose hope is in him, to the one who seeks him.", author: "Lamentations 3:25" },
    { text: "I have hidden your word in my heart that I might not sin against you.", author: "Psalm 119:11" },
    { text: "The Lord is near to all who call on him, to all who call on him in truth.", author: "Psalm 145:18" },
    { text: "But those who trust in the Lord will find new strength. They will soar high on wings like eagles.", author: "Isaiah 40:31" },
    { text: "The Lord bless you and keep you; the Lord make his face shine on you and be gracious to you.", author: "Numbers 6:24-25" },
    { text: "He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.", author: "Micah 6:8" },
    { text: "For we are God's handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.", author: "Ephesians 2:10" },
    { text: "The Lord is my rock, my fortress and my deliverer; my God is my rock, in whom I take refuge.", author: "Psalm 18:2" },
    { text: "He gives strength to the weary and increases the power of the weak.", author: "Isaiah 40:29" },
    { text: "The Lord is compassionate and gracious, slow to anger, abounding in love.", author: "Psalm 103:8" },
    { text: "The path of the righteous is like the morning sun, shining ever brighter till the full light of day.", author: "Proverbs 4:18" },
    { text: "The Lord is my helper; I will not be afraid. What can mere mortals do to me?", author: "Hebrews 13:6" },
    { text: "Seek the Lord while he may be found; call on him while he is near.", author: "Isaiah 55:6" },
    { text: "The Lord is faithful to all his promises and loving toward all he has made.", author: "Psalm 145:13" },
    { text: "A heart at peace gives life to the body, but envy rots the bones.", author: "Proverbs 14:30" },
];

function displayQuote() {
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const quoteType = document.getElementById('quote-type');
    
    if (!quoteText) return;
    
    const now = new Date();
    const philippineTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Manila' }));
    const startOfYear = new Date(philippineTime.getFullYear(), 0, 0);
    const diff = philippineTime - startOfYear;
    const dayOfYear = Math.floor(diff / 86400000);
    const verseIndex = dayOfYear % bibleVerses.length;
    const selectedVerse = bibleVerses[verseIndex];
    quoteText.textContent = selectedVerse.text;
    quoteAuthor.textContent = `— ${selectedVerse.author}`;
    
    if (quoteType) {
        quoteType.innerHTML = '<i class="fas fa-bible"></i> Verse of the Day';
        quoteType.style.color = '#ffdd44';
        quoteType.style.borderColor = 'rgba(255, 221, 68, 0.3)';
        quoteType.style.background = 'rgba(255, 221, 68, 0.1)';
    }
}

document.addEventListener('DOMContentLoaded', displayQuote);

// ============================================
// 6. MOBILE MENU (ENHANCED)
// ============================================
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
        const expanded = mobileMenu.classList.contains('active');
        mobileMenu.setAttribute('aria-expanded', expanded);
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
            mobileMenu.setAttribute('aria-expanded', 'false');
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
            mobileMenu.setAttribute('aria-expanded', 'false');
            mobileMenu.focus();
        }
    });
}

// ============================================
// 7. SCROLL PROGRESS BAR
// ============================================
const progressBar = document.getElementById('progress-bar');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;

    if (progressBar) {
        progressBar.style.width = Math.min(progress, 100) + '%';
    }

    updateScrollButton();
});

// ============================================
// 8. VERSATILE SCROLL BUTTON
// ============================================
const scrollBtn = document.getElementById('scroll-btn');
const scrollIcon = document.getElementById('scroll-icon');
const tooltip = document.getElementById('scroll-tooltip');

let isAtTop = true;

function updateScrollButton() {
    const scrollY = window.scrollY;

    if (scrollY < 100) {
        scrollIcon.className = 'fas fa-chevron-down';
        tooltip.textContent = 'Scroll Down';
        isAtTop = true;
        scrollBtn.classList.remove('pulse');
    } else if (scrollY > 300) {
        scrollIcon.className = 'fas fa-chevron-up';
        tooltip.textContent = 'Back to Top';
        isAtTop = false;
        scrollBtn.classList.add('pulse');
    } else {
        scrollBtn.classList.add('pulse');
    }
}

scrollBtn.addEventListener('click', () => {
    if (isAtTop) {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
        tooltip.textContent = 'Scrolling Down...';
        setTimeout(() => {
            tooltip.textContent = 'Scroll Down';
        }, 800);
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        tooltip.textContent = 'Scrolling Up...';
        setTimeout(() => {
            tooltip.textContent = 'Back to Top';
        }, 800);
    }
});

// ============================================
// 9. SCROLL REVEAL
// ============================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll(
        'section, .project-card, .edu-card, .about-text, .about-skills, .service-card'
    );
    elements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    setTimeout(updateScrollButton, 100);
});

// ============================================
// 10. ACTIVE NAV LINK
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks2 = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks2.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// 11. FORM SUBMISSION HANDLER (AJAX)
// ============================================
const contactForm = document.querySelector('.contact-form');
const successMsg = document.getElementById('form-success');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const btn = this.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;
        
        try {
            const formData = new FormData(this);
            const response = await fetch('https://formspree.io/f/mzepkbgw', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                contactForm.style.display = 'none';
                if (successMsg) {
                    successMsg.style.display = 'block';
                    successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    launchConfetti();
                }
                contactForm.reset();
            } else {
                alert('Oops! Something went wrong. Please try again.');
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        } catch (error) {
            alert('Network error. Please check your connection and try again.');
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    });
}

// ============================================
// 12. DARK/LIGHT MODE TOGGLE (Dark Mode Default)
// ============================================
const themeToggle = document.getElementById('theme-toggle');

const getPreferredTheme = () => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
    }
    return 'dark';
};

const currentTheme = getPreferredTheme();

if (currentTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeToggle) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
} else {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeToggle) {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

function updateRadarChartTheme() {
    if (!radarChartInstance) return;
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const textColor = isLight ? '#0b1a14' : '#e8f5ed';
    const gridColor = isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)';
    
    radarChartInstance.options.plugins.legend.labels.color = textColor;
    radarChartInstance.options.scales.r.angleLines.color = gridColor;
    radarChartInstance.options.scales.r.grid.color = gridColor;
    radarChartInstance.options.scales.r.pointLabels.color = textColor;
    radarChartInstance.options.scales.r.ticks.color = textColor;
    radarChartInstance.update();
}

function handleThemeToggle() {
    const theme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeToggle) {
        themeToggle.innerHTML = theme === 'light' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }
    updateRadarChartTheme();
}

if (themeToggle) {
    themeToggle.addEventListener('click', handleThemeToggle);
}

// ============================================
// 13. ANIMATED STATS COUNTERS
// ============================================
const stats = document.querySelectorAll('.stat-number');
const STAT_INCREMENT_DIVISOR = 60;
const STAT_ANIMATION_INTERVAL = 20;

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stat = entry.target;
            const text = stat.textContent;
            const isPlus = text.includes('+');
            const target = parseInt(text.replace('+', ''));
            let current = 0;
            const increment = Math.ceil(target / STAT_INCREMENT_DIVISOR);
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = isPlus ? current + '+' : current;
            }, STAT_ANIMATION_INTERVAL);
            counterObserver.unobserve(stat);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => counterObserver.observe(stat));

// ============================================
// 14. PARTICLE BACKGROUND
// ============================================
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles = [];
    let mouse = { x: null, y: null };

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 6 + 4;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.5 + 0.15;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (mouse.x && mouse.y) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 200) {
                    const force = 0.015;
                    this.speedX += (dx / dist) * force;
                    this.speedY += (dy / dist) * force;
                }
            }

            this.speedX *= 0.99;
            this.speedY *= 0.99;

            if (this.x < 0 || this.x > width) this.speedX *= -1;
            if (this.y < 0 || this.y > height) this.speedY *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 171, ${this.opacity})`;
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const count = Math.min(50, Math.floor((width * height) / 20000));
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }
    initParticles();

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 255, 171, ${0.06 * (1 - dist / 120)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    document.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('resize', () => {
        resize();
        initParticles();
    });
}

// ============================================
// 15. CONFETTI EFFECT (with cleanup)
// ============================================
let confettiPieces = [];

function launchConfetti() {
    const colors = ['#00ffab', '#00cc88', '#e8f5ed', '#88ffc8', '#00dd99', '#ff6b8a', '#ffdd44'];
    const count = 120;
    const container = document.body;

    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti-piece');
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.width = Math.random() * 10 + 4 + 'px';
        confetti.style.height = Math.random() * 10 + 4 + 'px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        confetti.style.position = 'fixed';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        confetti.style.animation = `confettiFall ${Math.random() * 2 + 2}s linear forwards`;
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        container.appendChild(confetti);
        confettiPieces.push(confetti);
        
        setTimeout(() => {
            confetti.remove();
            confettiPieces = confettiPieces.filter(p => p !== confetti);
        }, 3000);
    }
}

// ============================================
// 16. SKILLS BAR ANIMATION
// ============================================
const skillBars = document.querySelectorAll('.skill-bar-fill');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
            skillObserver.unobserve(bar);
        }
    });
}, { threshold: 0.3 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ============================================
// 17. FILTER BUTTONS (ENHANCED)
// ============================================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length && projectCards.length) {
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;

            projectCards.forEach(card => {
                const categories = card.dataset.category ? card.dataset.category.split(' ') : [];
                const matches = filter === 'all' || categories.includes(filter);

                card.classList.remove('filtered-in', 'filtered-out');

                if (matches) {
                    card.style.display = 'block';
                    void card.offsetWidth;
                    card.classList.add('filtered-in');
                } else {
                    card.classList.add('filtered-out');
                    const onAnimationEnd = () => {
                        if (card.classList.contains('filtered-out')) {
                            card.style.display = 'none';
                        }
                        card.removeEventListener('animationend', onAnimationEnd);
                    };
                    card.addEventListener('animationend', onAnimationEnd);
                }
            });
        });
    });
}

// ============================================
// 18. SKELETON LOADING (ENHANCED)
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.project-grid');
    if (!grid) return;

    const existingCards = grid.querySelectorAll('.project-card');
    if (existingCards.length) {
        existingCards.forEach(c => {
            c.style.display = 'none';
        });

        const skeletonWrapper = document.createElement('div');
        skeletonWrapper.className = 'skeleton-wrapper';
        skeletonWrapper.id = 'skeleton-wrapper';
        skeletonWrapper.innerHTML = `
            <div class="skeleton-card"><div class="skeleton-thumbnail"></div><div class="skeleton-title"></div><div class="skeleton-text"></div><div class="skeleton-text short"></div></div>
            <div class="skeleton-card"><div class="skeleton-thumbnail"></div><div class="skeleton-title"></div><div class="skeleton-text"></div><div class="skeleton-text short"></div></div>
            <div class="skeleton-card"><div class="skeleton-thumbnail"></div><div class="skeleton-title"></div><div class="skeleton-text"></div><div class="skeleton-text short"></div></div>
            <div class="skeleton-card"><div class="skeleton-thumbnail"></div><div class="skeleton-title"></div><div class="skeleton-text"></div><div class="skeleton-text short"></div></div>
        `;
        grid.prepend(skeletonWrapper);

        setTimeout(() => {
            const skeleton = document.getElementById('skeleton-wrapper');
            if (skeleton) skeleton.remove();
            existingCards.forEach(c => {
                c.style.display = 'block';
                c.classList.add('filtered-in');
            });
            addProjectProgress();
        }, 600);
    }
});

// ============================================
// 19. SKILL DISTRIBUTION BARS
// ============================================
function addSkillDistribution() {
    const container = document.querySelector('.tech-stack-visualization');
    if (!container) return;

    if (container.querySelector('.skill-distribution-container')) return;

    const skills = [
        { name: 'HTML5', level: 90, color: '#e34f26' },
        { name: 'CSS3', level: 85, color: '#2965f1' },
        { name: 'UI/UX Design', level: 88, color: '#6c5ce7' },
        { name: 'PHP', level: 80, color: '#777bb4' },
        { name: 'JavaScript', level: 78, color: '#f7df1e' },
        { name: 'GitHub', level: 80, color: '#181717' },
        { name: 'MySQL', level: 89, color: '#00758f' },
        { name: 'Git', level: 79, color: '#f05032' }
    ];

    skills.sort((a, b) => b.level - a.level);

    let barsHTML = `
        <div class="skill-distribution-container" style="margin: 20px 0 16px 0; padding: 20px 24px; background: var(--bg-card); border-radius: var(--radius); border: 1px solid var(--border-mint);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
                <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-primary); letter-spacing: 0.5px;">
                    <i class="fas fa-chart-bar" style="color: var(--mint-primary); margin-right: 8px;"></i>
                    Skill Distribution Overview
                </span>
                <span style="font-size: 0.65rem; color: var(--text-secondary); font-family: var(--font-mono); opacity: 0.6;">
                    Sorted by proficiency
                </span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 10px;">
    `;

    skills.forEach(skill => {
        const level = skill.level;
        const color = skill.color;
        const label = level >= 80 ? 'Proficient' : level >= 70 ? 'Intermediate' : 'Beginner';
        const gradient = `linear-gradient(90deg, ${color}44, ${color})`;

        barsHTML += `
            <div style="display: grid; grid-template-columns: 100px 1fr 70px; align-items: center; gap: 12px;">
                <span style="font-size: 0.75rem; font-weight: 500; color: var(--text-secondary); white-space: nowrap;">${skill.name}</span>
                <div style="height: 6px; background: var(--bg-secondary); border-radius: 4px; overflow: hidden; border: 1px solid var(--border-mint); position: relative;">
                    <div style="width: 0%; height: 100%; background: ${gradient}; border-radius: 4px; transition: width 1.2s cubic-bezier(0.2, 0.9, 0.3, 1);" class="skill-distribution-bar" data-level="${level}"></div>
                </div>
                <div style="display: flex; align-items: center; gap: 6px; justify-content: flex-end;">
                    <span style="font-size: 0.7rem; font-weight: 600; color: var(--mint-primary); font-family: var(--font-mono); min-width: 30px; text-align: right;">${level}%</span>
                    <span style="font-size: 0.55rem; color: var(--text-secondary); font-family: var(--font-mono); opacity: 0.5; min-width: 55px; text-align: right;">${label}</span>
                </div>
            </div>
        `;
    });

    barsHTML += `
            </div>
        </div>
    `;

    const heading = container.querySelector('h3');
    if (heading) {
        heading.insertAdjacentHTML('afterend', barsHTML);
    } else {
        container.insertAdjacentHTML('afterbegin', barsHTML);
    }

    const bars = container.querySelectorAll('.skill-distribution-bar');
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const level = bar.dataset.level;
                bar.style.width = level + '%';
                barObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    bars.forEach(bar => barObserver.observe(bar));
}

document.addEventListener('DOMContentLoaded', addSkillDistribution);

// ============================================
// 20. PROJECT PROGRESS INDICATORS
// ============================================
function addProjectProgress() {
    const cards = document.querySelectorAll('.project-card');
    const progressMap = {
        'RHU Morong Health System': 95,
        'Angono NHS Career Assessment': 85,
        'HowCan‑i‑Help': 100,
        'RITREMIS': 70
    };

    cards.forEach(card => {
        const titleEl = card.querySelector('h3');
        if (!titleEl) return;
        const title = titleEl.textContent.trim();
        const progress = progressMap[title] || 75;

        if (card.querySelector('.project-progress')) return;

        const infoDiv = card.querySelector('.project-info');
        if (!infoDiv) return;

        const techDiv = infoDiv.querySelector('.project-tech');
        const progressHTML = `
            <div class="project-progress">
                <span class="progress-label" style="font-size:0.65rem;color:var(--text-secondary);font-weight:500;">Completion</span>
                <div class="progress-track">
                    <div class="progress-fill" style="width: ${progress}%;"></div>
                </div>
                <span class="progress-percent">${progress}%</span>
            </div>
        `;

        if (techDiv) {
            techDiv.insertAdjacentHTML('beforebegin', progressHTML);
        } else {
            infoDiv.insertAdjacentHTML('beforeend', progressHTML);
        }
    });
}

// ============================================
// 21. PERFORMANCE OPTIMIZATIONS
// ============================================
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    lazyImages.forEach(img => imageObserver.observe(img));
}

if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        console.log('Non-critical resources loaded');
    });
}

// ============================================
// 22. PAGE LOADER (FIXED)
// ============================================
function hideLoader() {
    const loader = document.getElementById('page-loader');
    if (loader) {
        loader.classList.add('hidden');
        console.log('✅ Loader hidden');
    }
}

if (document.readyState === 'complete') {
    hideLoader();
} else {
    window.addEventListener('load', function() {
        setTimeout(hideLoader, 100);
    });
}

setTimeout(hideLoader, 1500);

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(hideLoader, 200);
    });
}

// ============================================
// 23. KEYBOARD NAVIGATION
// ============================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
        window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
        e.preventDefault();
    }
    if (e.key === 'ArrowUp') {
        window.scrollBy({ top: -window.innerHeight * 0.8, behavior: 'smooth' });
        e.preventDefault();
    }
});

// ============================================
// 24. CAROUSEL (if exists)
// ============================================
const track = document.getElementById('carousel-track');
const slides = track ? track.querySelectorAll('.carousel-slide') : [];
const dotsContainer = document.getElementById('carousel-dots');
let currentSlide = 0;
let autoSlideInterval;

function createDots() {
    if (!dotsContainer || slides.length === 0) return;
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
}

function goToSlide(index) {
    if (!track || slides.length === 0) return;
    currentSlide = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.carousel-dot') : [];
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    if (slides.length === 0) return;
    goToSlide((currentSlide + 1) % slides.length);
}

function prevSlide() {
    if (slides.length === 0) return;
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
}

function startAutoSlide() {
    if (slides.length <= 1) return;
    stopAutoSlide();
    autoSlideInterval = setInterval(nextSlide, 4000);
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

if (slides.length > 0) {
    createDots();
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoSlide(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoSlide(); });
    
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }
    
    startAutoSlide();
}

// ============================================
// 25. RADAR CHART (Lazy Load + Theme Update)
// ============================================
let radarChartInstance = null;

function loadRadarChart() {
    const canvas = document.getElementById('radarChart');
    if (!canvas) return;
    
    if (typeof Chart === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = () => createRadarChart(canvas);
        document.head.appendChild(script);
    } else {
        createRadarChart(canvas);
    }
}

function createRadarChart(canvas) {
    if (radarChartInstance) {
        radarChartInstance.destroy();
        radarChartInstance = null;
    }
    const ctx = canvas.getContext('2d');
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const textColor = isLight ? '#0b1a14' : '#e8f5ed';
    const gridColor = isLight ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)';

    radarChartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL', 'UI/UX'],
            datasets: [{
                label: 'Skill Level',
                data: [90, 85, 65, 75, 70, 80],
                backgroundColor: 'rgba(0, 255, 171, 0.2)',
                borderColor: '#00ffab',
                pointBackgroundColor: '#00ffab',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#00ffab'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                        font: {
                            family: 'Inter',
                            size: 12
                        }
                    }
                }
            },
            scales: {
                r: {
                    angleLines: {
                        color: gridColor
                    },
                    grid: {
                        color: gridColor
                    },
                    pointLabels: {
                        color: textColor,
                        font: {
                            family: 'Inter',
                            size: 11
                        }
                    },
                    ticks: {
                        color: textColor,
                        backdropColor: 'transparent',
                        font: {
                            size: 9
                        }
                    },
                    max: 100,
                    min: 0
                }
            }
        }
    });
}

const radarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            loadRadarChart();
            radarObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

const radarContainer = document.querySelector('.radar-chart-container');
if (radarContainer) {
    radarObserver.observe(radarContainer);
}

document.addEventListener('DOMContentLoaded', () => {
    if (radarContainer && radarContainer.getBoundingClientRect().top < window.innerHeight) {
        loadRadarChart();
    }
});

// ============================================
// 26. DYNAMIC STYLES
// ============================================
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes confettiFall {
        0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; }
        100% { transform: translateY(100vh) rotate(720deg) scale(0.2); opacity: 0; }
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
    }
`;
document.head.appendChild(dynamicStyles);

// ============================================
// 27. TYPEWRITER EFFECT
// ============================================
const taglineElement = document.getElementById('tagline');
const taglines = [
    'Computer Science Graduate',
    'Aspiring IT Professional',
    'Web Developer',
    'UI/UX Enthusiast'
];
let typeIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!taglineElement) return;
    const current = taglines[typeIndex];
    if (isDeleting) {
        taglineElement.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        taglineElement.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === current.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typeIndex = (typeIndex + 1) % taglines.length;
        speed = 500;
    }
    setTimeout(typeEffect, speed);
}

if (taglineElement) {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(typeEffect, 800);
    });
}

// ============================================
// 28. CLICK RIPPLE EFFECT
// ============================================
document.querySelectorAll('.btn, .floating-cta, .carousel-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 700);
    });
});

// ============================================
// 29. DYNAMIC COPYRIGHT YEAR
// ============================================
const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// ============================================
// 30. HIDE-ON-SCROLL NAVIGATION
// ============================================
const header = document.querySelector('header');
let lastScrollY = window.scrollY;
let ticking = false;
let headerHidden = false;

function handleHeaderScroll() {
    const currentScrollY = window.scrollY;
    
    if (window.innerWidth <= 768) {
        header.classList.remove('hidden');
        header.classList.add('show');
        lastScrollY = currentScrollY;
        return;
    }
    
    if (currentScrollY > lastScrollY && currentScrollY > 150) {
        if (!headerHidden) {
            header.classList.add('hidden');
            header.classList.remove('show');
            headerHidden = true;
        }
    } else if (currentScrollY < lastScrollY) {
        if (headerHidden) {
            header.classList.remove('hidden');
            header.classList.add('show');
            headerHidden = false;
        }
    }
    
    if (currentScrollY < 50) {
        header.classList.remove('hidden');
        header.classList.add('show');
        headerHidden = false;
    }
    
    if (currentScrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleHeaderScroll();
        });
        ticking = true;
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        header.classList.remove('hidden');
        header.classList.add('show');
        headerHidden = false;
    }
});

document.addEventListener('mousemove', (e) => {
    if (e.clientY < 80 && headerHidden) {
        header.classList.remove('hidden');
        header.classList.add('show');
        clearTimeout(window.headerShowTimeout);
        window.headerShowTimeout = setTimeout(() => {
            if (window.scrollY > 150) {
                header.classList.add('hidden');
                header.classList.remove('show');
                headerHidden = true;
            }
        }, 2000);
    }
});

setTimeout(() => {
    handleHeaderScroll();
}, 100);

// ============================================
// 31. RESUME PDF PREVIEW MODAL
// ============================================
const resumeModal = document.getElementById('resume-modal');
const resumeModalClose = document.getElementById('resume-modal-close');
const resumeModalCloseBtn = document.getElementById('resume-modal-close-btn');
const resumePreviewBtn = document.getElementById('resume-preview-btn');
const pdfViewer = document.getElementById('resume-pdf-viewer');

const PDFJS_SCRIPT = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';

function loadPDFViewer() {
    if (!pdfViewer) return;
    
    if (typeof pdfjsLib !== 'undefined') {
        renderPDFWithPDFJS();
        return;
    }
    
    const script = document.createElement('script');
    script.src = PDFJS_SCRIPT;
    script.onload = () => {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        renderPDFWithPDFJS();
    };
    script.onerror = () => {
        renderPDFWithIframe();
    };
    document.head.appendChild(script);
}

function renderPDFWithPDFJS() {
    const viewer = pdfViewer;
    const pdfUrl = 'Cathyrine%20Menguito%20Resume.pdf';
    
    viewer.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:center;height:500px;flex-direction:column;gap:16px;color:var(--text-secondary);">
            <i class="fas fa-spinner fa-spin" style="font-size:2rem;color:var(--mint-primary);"></i>
            <span>Loading resume...</span>
        </div>
    `;
    
    pdfjsLib.getDocument(pdfUrl).promise
        .then((pdf) => {
            return pdf.getPage(1).then((page) => {
                const scale = 1.5;
                const viewport = page.getViewport({ scale: scale });
                
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                canvas.style.width = '100%';
                canvas.style.height = 'auto';
                canvas.style.display = 'block';
                canvas.style.margin = '0 auto';
                
                viewer.innerHTML = '';
                viewer.appendChild(canvas);
                
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                
                page.render(renderContext).promise.then(() => {
                    const pageInfo = document.createElement('div');
                    pageInfo.style.cssText = `
                        text-align: center;
                        padding: 8px 0;
                        font-size: 0.75rem;
                        color: var(--text-secondary);
                        font-family: var(--font-mono);
                        opacity: 0.6;
                    `;
                    pageInfo.textContent = `Page 1 of ${pdf.numPages}`;
                    viewer.appendChild(pageInfo);
                });
            });
        })
        .catch((error) => {
            console.error('PDF.js error:', error);
            renderPDFWithIframe();
        });
}

function renderPDFWithIframe() {
    const viewer = pdfViewer;
    const pdfUrl = 'Cathyrine%20Menguito%20Resume.pdf';
    
    viewer.innerHTML = `
        <iframe src="${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0" 
                style="width:100%;height:100%;min-height:400px;border:none;display:block;"
                loading="lazy"
                onerror="this.style.display='none'; this.parentElement.querySelector('.pdf-error').style.display='flex';">
        </iframe>
        <div class="pdf-error" style="display:none;flex-direction:column;align-items:center;justify-content:center;height:400px;color:var(--text-secondary);text-align:center;padding:24px;gap:12px;">
            <i class="fas fa-file-pdf" style="font-size:3.5rem;color:var(--text-secondary);opacity:0.3;"></i>
            <p style="font-size:0.95rem;margin:0;">Resume preview unavailable.</p>
            <p style="font-size:0.85rem;opacity:0.6;margin:0;">Use the Download button below to view the full PDF.</p>
        </div>
    `;
    
    const iframe = viewer.querySelector('iframe');
    if (iframe) {
        iframe.addEventListener('error', () => {
            iframe.style.display = 'none';
            const errorDiv = viewer.querySelector('.pdf-error');
            if (errorDiv) errorDiv.style.display = 'flex';
        });
    }
}

if (resumePreviewBtn) {
    resumePreviewBtn.addEventListener('click', (e) => {
        e.preventDefault();
        resumeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        loadPDFViewer();
    });
}

function closeResumeModal() {
    resumeModal.classList.remove('active');
    document.body.style.overflow = '';
}

if (resumeModalClose) {
    resumeModalClose.addEventListener('click', closeResumeModal);
}

if (resumeModalCloseBtn) {
    resumeModalCloseBtn.addEventListener('click', closeResumeModal);
}

resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
        closeResumeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal.classList.contains('active')) {
        closeResumeModal();
    }
});

// ============================================
// 32. SERVICE WORKER REGISTRATION
// ============================================
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
            console.log('Service Worker registered successfully');
        })
        .catch((error) => {
            console.log('Service Worker registration failed:', error);
        });
}

// ============================================
// 33. I18N TRANSLATIONS
// ============================================
const translations = {
    en: {
        loader_text: "Loading...",
        skip_link: "Skip to main content",
        nav_home: "Home",
        nav_projects: "Projects",
        nav_about: "About",
        nav_contact: "Contact",
        hero_title: "Hi, I'm <span class='gradient-text'>Cathyrine Menguito</span>",
        hero_description: "I'm a recent Computer Science graduate with a growing interest in web development, UI/UX, and technology. My academic projects gave me opportunities to build web-based systems and explore how thoughtful design can make technology easier and more useful. I'm excited to keep learning, gain real-world experience, and begin my journey in the IT industry.",
        hero_btn_projects: "Projects",
        hero_btn_contact: "Contact Me",
        scroll_text: "Scroll",
        stat_projects: "Projects",
        stat_experience: "Year Experience",
        stat_certifications: "Certifications",
        live_status: "Currently exploring: React.js & Tailwind CSS",
        floating_cta: "Let's Talk",
        hero_badge: "Available for opportunities & freelance projects",
        location_badge: "📍 Morong, Rizal, Philippines (GMT+8)",
        tech_stack_title: "Tech Stack Proficiency",
        tech_stack_sub: "Technologies I work with and my comfort level",
        resume_download_hero: "Download Resume (PDF)",
        quote_label: "Verse of the Day",
        services_tag: "What I Can Help With",
        services_title_prefix: "Areas I Can",
        services_title_gradient: "Contribute",
        service_1_title: "Web Development",
        service_1_desc: "Developing responsive and functional websites and web-based applications using technologies such as HTML, CSS, JavaScript, PHP, and MySQL.",
        service_2_title: "UI/UX & Interface Design",
        service_2_desc: "Designing clean and intuitive user interfaces with attention to usability, organization, and the overall user experience.",
        service_3_title: "Academic System Development",
        service_3_desc: "Providing technical assistance for academic and capstone projects, including web-based systems, system interfaces, and related development tasks.",
        service_4_title: "Technical Documentation",
        service_4_desc: "Assisting with system documentation, technical diagrams, project presentations, and other documentation related to software projects.",
        service_5_title: "Branding & Visual Identity",
        service_5_desc: "Creating cohesive visual identities including logo design, color palettes, typography systems, and brand guidelines that help businesses and projects stand out with a consistent and memorable presence.",
        exp_tag: "Experience",
        exp_title_prefix: "My",
        exp_title_gradient: "Career Journey",
        exp_company_1: "Real IT OPC",
        exp_role_1: "Operations & Client Success Officer | System Developer",
        exp_date_1: "2026 – Present",
        exp_desc_1: "Contributing to the development of web-based systems and digital solutions, including system functionality, user interface implementation, and project-related technical work. This role allows me to apply my Computer Science knowledge to practical projects while continuing to strengthen my technical and professional skills.",
        exp_hl_1_1: "System Development",
        exp_hl_1_2: "UI/UX Implementation",
        exp_hl_1_3: "Front-End Development",
        exp_hl_1_4: "Project Coordination",
        exp_hl_1_5: "Client Collaboration",
        exp_company_2: "Skyline CATV Industries",
        exp_role_2: "Executive Agent",
        exp_date_2: "2018 – 2020",
        exp_desc_2: "Delivered professional customer support by handling inquiries, resolving service-related concerns, and coordinating requests to ensure customer satisfaction and efficient operations.",
        exp_hl_2_1: "Customer Support",
        exp_hl_2_2: "Service Resolution",
        exp_hl_2_3: "Client Coordination",
        about_tag: "About Me",
        about_title_prefix: "Passionate About Building",
        about_title_gradient: "Meaningful Solutions",
        about_p1: "I'm Cathyrine Menguito, a Bachelor of Science in Computer Science graduate from Renaissance School of Science and Technology, Inc. I have a growing interest in web development, user interface design, and creating practical technology solutions that address real-world needs.",
        about_p2: "Throughout my academic journey, I gained hands-on experience through software development projects, particularly in building web-based systems. I worked on projects involving healthcare management, career assessment, and other practical applications, where I developed my foundation in front-end development, interface design, and user experience.",
        about_p3: "I also hold a TESDA National Certificate II in Computer Systems Servicing and have developed experience in leadership, collaboration, and project-based work. As I begin my professional journey, I am continuously learning and strengthening my technical skills while looking for opportunities to contribute, gain real-world experience, and grow as an IT professional.",
        about_badge_1: "TESDA NC II – Computer Systems Servicing",
        about_badge_2: "Outstanding System Design",
        about_badge_3: "Class President 2024–2025",
        about_btn_preview: "Preview Resume",
        about_btn_download: "Download PDF",
        skills_tech_title: "Technical Skills",
        skills_tools_title: "Tools & Technologies",
        skills_prof_title: "Skill Proficiency",
        skills_radar_title: "Skill Distribution",
        edu_tag: "Education",
        edu_title_prefix: "My",
        edu_title_gradient: "Academic Journey",
        edu_tertiary_tag: "Tertiary",
        edu_tertiary_year: "2022 – 2026",
        edu_tertiary_title: "Bachelor of Science in Computer Science",
        edu_tertiary_school: "Renaissance School of Science and Technology, Inc.",
        edu_tertiary_loc: "Morong, Rizal",
        edu_ach_1: "Outstanding System Design",
        edu_ach_2: "Outstanding Thesis Writing",
        edu_ach_3: "Best in CS Practicum",
        edu_ach_4: "Best in OJT Narrative",
        edu_ach_5: "Loyalty Award",
        edu_shs_tag: "Senior High",
        edu_shs_year: "2021 – 2022",
        edu_shs_title: "HUMSS Strand",
        edu_shs_school: "Renaissance School of Science and Technology, Inc.",
        edu_shs_loc: "Morong, Rizal",
        edu_shs_ach: "With Honors (Grade 11 – 12)",
        edu_jhs_school: "Morong National High School",
        edu_jhs_loc: "Morong, Rizal",
        edu_jhs_year: "2019 – 2020",
        edu_jhs_tag: "Junior High",
        edu_jhs_year2: "2015 – 2019",
        edu_jhs_title: "Junior High School",
        edu_jhs_school2: "Morong National High School",
        edu_jhs_loc2: "Morong, Rizal",
        edu_elem_tag: "Elementary",
        edu_elem_year: "2009 – 2015",
        edu_elem_title: "Elementary School",
        edu_elem_school: "Tomas Claudio Memorial Elementary School",
        edu_elem_loc: "Morong, Rizal",
        edu_cert_tag: "Certification",
        edu_cert_date: "May 8, 2024",
        edu_cert_title: "National Certificate II (NC II)",
        edu_cert_sub: "Computer Systems Servicing (CSS)",
        edu_cert_org: "TESDA",
        edu_cert_badge: "Certified",
        timeline_tag: "Journey",
        timeline_title_prefix: "Project",
        timeline_title_gradient: "Timeline",
        tl_1_title: "RHU Morong Health System",
        tl_1_desc: "Academic thesis project - a healthcare management system for the Rural Health Unit of Morong, Rizal. Co-developed with Ariel B. Eubanas, Jr. Received Outstanding System Design and Outstanding Thesis Writing awards.",
        tl_2_title: "Angono NHS Career Assessment",
        tl_2_desc: "An independently developed academic project - a web-based career assessment tool designed to help incoming Senior High School students explore suitable SHS strands based on their interests and skills.",
        tl_3_title: "HowCan‑i‑Help",
        tl_3_desc: "Professional project developed at Real IT OPC in collaboration with Kenji Akira Bergaño and Ariel B. Eubanas, Jr. A healthcare and assistance platform actively used in clinic workflows.",
        tl_4_title: "RITREMIS",
        tl_4_desc: "Professional project developed at Real IT OPC in collaboration with Kenji Akira Bergaño and Ariel B. Eubanas, Jr. A real estate management and property information platform.",
        team_tag: "Collaboration",
        team_title_prefix: "People I've",
        team_title_gradient: "Worked With",
        team_sub: "I believe good work comes from collaboration. Here are some of the people I've had the privilege of working with and learning from.",
        team_role_1: "Full Stack Web Developer",
        team_company_1: "Real IT OPC",
        team_role_2: "Project Lead / Full Stack Web Developer",
        team_company_2: "Real IT OPC",
        team_built_together: "Built Together",
        team_learned_label: "Learned from this collaboration",
        team_connection_label: "3 projects · 2 collaborators · 1 team",
        client_title_prefix: "Have a",
        client_title_gradient: "Web System",
        client_title_suffix: "or Digital Project in Mind?",
        client_desc: "I work with a development team to build practical web-based systems and applications for businesses, organizations, and project teams. We focus on functional solutions, user-friendly interfaces, and systems designed around specific requirements.",
        client_svc_1: "Custom Web Applications",
        client_svc_2: "Web-Based Systems",
        client_svc_3: "Application-Based Systems",
        client_svc_4: "UI/UX Design",
        client_svc_5: "System Maintenance",
        client_btn: "Discuss a Project",
        client_badge: "Let's Build Together",
        client_process_discuss: "Discuss",
        client_process_build: "Build",
        client_process_launch: "Launch",
        client_process_discuss_desc: "We talk about your vision and requirements.",
        client_process_build_desc: "We design and develop your system with care.",
        client_process_launch_desc: "We deploy, test, and ensure everything runs smoothly.",
        client_trust_projects: "Projects Built",
        client_trust_members: "Team Members",
        client_trust_year: "Year of Collaboration",
        projects_tag: "Portfolio",
        projects_title: "Projects",
        projects_sub: "A collection of academic and professional work showcasing my growth in web development, system design, and collaborative problem-solving.",
        filter_all: "All",
        filter_healthcare: "Healthcare",
        filter_education: "Education",
        filter_realestate: "Real Estate",
        visit_project: "Visit Project",
        projects_cta: "Let's Work Together",
        proj_1_title: "RHU Morong Health System",
        proj_1_full: "A comprehensive healthcare management platform built as our thesis project. This system digitized patient intake, appointment scheduling, and record management for the Rural Health Unit of Morong, Rizal.<br /><br /><strong>My Contribution:</strong> Spearheaded the front-end architecture and user interface design, ensuring a seamless experience for healthcare personnel. Collaborated closely with my co-developer on back-end integration and system optimization.<br /><br /><strong>Recognition:</strong> Received the <strong>Outstanding System Design</strong> and <strong>Outstanding Thesis Writing</strong> awards for our work.",
        proj_1_contrib_label: "My Contribution",
        proj_1_contrib: "Spearheaded the front-end architecture and user interface design, ensuring a seamless experience for healthcare personnel. Collaborated closely with my co-developer on back-end integration and system optimization.",
        proj_1_recog_label: "Recognition",
        proj_1_recog: "Received the <strong>Outstanding System Design</strong> and <strong>Outstanding Thesis Writing</strong> awards for our work.",
        proj_2_title: "Angono NHS Career Assessment",
        proj_2_full: "A web-based career guidance tool developed to help incoming Senior High School students identify their SHS strand. The system evaluates students' interests, skills, and academic inclinations to provide data-driven recommendations.<br /><br /><strong>My Role:</strong> Developed the system independently, working on the database, front-end, system features, and deployment. This project gave me hands-on experience in building a complete web application and helped me better understand how its different parts work together. It also improved my development and problem-solving skills.<br /><br /><strong>Impact:</strong> Successfully assessed over 50 students, helping them make informed decisions about their academic pathways.",
        proj_2_role_label: "My Role",
        proj_2_role: "Developed the system independently, working on the database, front-end, system features, and deployment. This project gave me hands-on experience in building a complete web application and helped me better understand how its different parts work together. It also improved my development and problem-solving skills.",
        proj_2_impact_label: "Impact",
        proj_2_impact: "Successfully assessed over 50 students, helping them make informed decisions about their academic pathways.",
        proj_3_title: "HowCan‑i‑Help",
        proj_3_full: "A multi-tenant healthcare ecosystem that bridges the gap between patients, clinics, and community support networks. The platform streamlines clinical operations, donor coordination, and patient outreach through a centralized digital infrastructure.<br /><br /><strong>Project Context:</strong> Developed as part of my professional work at <strong>Real IT OPC</strong>, where I collaborated with senior developers to bring this solution from concept to production. Currently deployed and actively supporting clinic workflows.<br /><br /><strong>Key Achievement:</strong> The system has been fully integrated into the daily operations of partner clinics, replacing manual processes with efficient digital records management.",
        proj_3_context_label: "Project Context",
        proj_3_context: "Developed as part of my professional work at <strong>Real IT OPC</strong>, where I collaborated with senior developers to bring this solution from concept to production. Currently deployed and actively supporting clinic workflows.",
        proj_3_ach_label: "Key Achievement",
        proj_3_ach: "The system has been fully integrated into the daily operations of partner clinics, replacing manual processes with efficient digital records management.",
        proj_4_title: "RITREMIS",
        proj_4_full: "A comprehensive real estate management information system designed to centralize property records, streamline transactions, and provide stakeholders with real-time visibility into property portfolios.<br /><br /><strong>Project Context:</strong> Currently in active development at <strong>Real IT OPC</strong>, built in collaboration with our development team.<br /><br /><strong>My Focus:</strong> Front-end implementation, UI/UX design, and ensuring a responsive, intuitive interface for property managers and clients.",
        proj_4_context_label: "Project Context",
        proj_4_context: "Currently in active development at <strong>Real IT OPC</strong>, built in collaboration with our development team.",
        proj_4_focus_label: "My Focus",
        proj_4_focus: "Front-end implementation, UI/UX design, and ensuring a responsive, intuitive interface for property managers and clients.",
        contact_tag: "Contact",
        contact_title_prefix: "Get In",
        contact_title_gradient: "Touch",
        contact_sub: "I'm always open to new opportunities, collaborations, or just a friendly chat. Feel free to reach out!",
        contact_location: "Morong, Rizal, Philippines",
        form_name: "Your Name",
        form_email: "Your Email",
        form_message: "Your Message",
        form_submit: "Send Message",
        success_title: "Thank You!",
        success_msg: "Your message has been sent. I'll get back to you soon!",
        resume_doc_label: "Document",
        resume_title: "My Resume",
        resume_sub: "Cathyrine Menguito — Computer Science Graduate",
        resume_personal_title: "Personal Details",
        resume_personal_sub: "Contact and location information",
        resume_field_name: "Full Name",
        resume_field_email: "Email",
        resume_field_phone: "Phone",
        resume_field_location: "Location",
        resume_loc_val: "Morong, Rizal, Philippines",
        resume_pdf_title: "Resume PDF",
        resume_pdf_sub: "Full document preview",
        resume_loading: "Loading resume preview...",
        resume_download_btn: "Download PDF",
        resume_close_btn: "Close",
        footer_name: "Cathyrine Menguito",
        footer_title: "Computer Science Graduate · Web Developer · UI/UX Designer",
        footer_copy: "Cathyrine Menguito. All rights reserved.",
        footer_badge: "Available for opportunities",
        visitor_label: "visitors",
        scroll_tooltip: "Scroll Down"
    },
    ja: {
        loader_text: "読み込み中...",
        skip_link: "メインコンテンツへスキップ",
        nav_home: "ホーム",
        nav_projects: "プロジェクト",
        nav_about: "概要",
        nav_contact: "お問い合わせ",
        hero_title: "こんにちは、<span class='gradient-text'>Cathyrine Menguito</span>です",
        hero_description: "私は最近のコンピュータサイエンス卒業生で、ウェブ開発、UI/UX、テクノロジーにますます関心を持っています。学術プロジェクトを通じて、ウェブベースのシステムを構築し、思慮深いデザインがテクノロジーをより使いやすく、より有用にする方法を探求する機会を得ました。これからも学び続け、実務経験を積み、IT業界でのキャリアを始めることを楽しみにしています。",
        hero_btn_projects: "プロジェクト",
        hero_btn_contact: "お問い合わせ",
        scroll_text: "スクロール",
        stat_projects: "プロジェクト",
        stat_experience: "年の経験",
        stat_certifications: "認定資格",
        live_status: "現在探索中: React.js & Tailwind CSS",
        floating_cta: "話しましょう",
        hero_badge: "機会とフリーランスプロジェクトに対応可能",
        location_badge: "📍 モロン、リサール、フィリピン (GMT+8)",
        tech_stack_title: "テクノロジースタック習熟度",
        tech_stack_sub: "私が使用するテクノロジーと習熟度",
        resume_download_hero: "履歴書をダウンロード (PDF)",
        quote_label: "今日の聖句",
        services_tag: "お手伝いできる分野",
        services_title_prefix: "私が貢献できる",
        services_title_gradient: "領域",
        service_1_title: "ウェブ開発",
        service_1_desc: "HTML、CSS、JavaScript、PHP、MySQLなどの技術を使用して、レスポンシブで機能的なウェブサイトやウェブベースのアプリケーションを開発します。",
        service_2_title: "UI/UXおよびインターフェースデザイン",
        service_2_desc: "ユーザビリティ、構成、全体的なユーザーエクスペリエンスに配慮した、クリーンで直感的なユーザーインターフェースをデザインします。",
        service_3_title: "学術システム開発",
        service_3_desc: "ウェブベースのシステム、システムインターフェース、関連する開発タスクを含む、学術およびキャップストーンプロジェクトの技術支援を提供します。",
        service_4_title: "技術文書作成",
        service_4_desc: "システム文書、技術図、プロジェクトプレゼンテーション、その他ソフトウェアプロジェクトに関連する文書作成を支援します。",
        service_5_title: "ブランディングとビジュアルアイデンティティ",
        service_5_desc: "ロゴデザイン、カラーパレット、タイポグラフィシステム、ブランドガイドラインを含む一貫したビジュアルアイデンティティを作成し、ビジネスやプロジェクトが際立ち、記憶に残る存在となるよう支援します。",
        exp_tag: "経歴",
        exp_title_prefix: "私の",
        exp_title_gradient: "キャリアの歩み",
        exp_company_1: "Real IT OPC",
        exp_role_1: "オペレーションズ＆クライアントサクセスオフィサー | システム開発者",
        exp_date_1: "2026 – 現在",
        exp_desc_1: "ウェブベースのシステムやデジタルソリューションの開発に貢献しており、システム機能、ユーザーインターフェースの実装、プロジェクト関連の技術作業を含みます。この役割により、コンピュータサイエンスの知識を実践的なプロジェクトに適用しながら、技術的および専門的スキルを継続的に強化することができます。",
        exp_hl_1_1: "システム開発",
        exp_hl_1_2: "UI/UX実装",
        exp_hl_1_3: "フロントエンド開発",
        exp_hl_1_4: "プロジェクト調整",
        exp_hl_1_5: "クライアント連携",
        exp_company_2: "Skyline CATV Industries",
        exp_role_2: "エグゼクティブエージェント",
        exp_date_2: "2018 – 2020",
        exp_desc_2: "問い合わせ対応、サービス関連の問題解決、リクエストの調整を通じて専門的なカスタマーサポートを提供し、顧客満足度と効率的な運用を確保しました。",
        exp_hl_2_1: "カスタマーサポート",
        exp_hl_2_2: "サービス解決",
        exp_hl_2_3: "クライアント調整",
        about_tag: "私について",
        about_title_prefix: "意味のあるソリューション構築に",
        about_title_gradient: "情熱を注ぐ",
        about_p1: "私はRenaissance School of Science and Technology, Inc.でコンピュータサイエンスの学士号を取得したCathyrine Menguitoです。ウェブ開発、ユーザーインターフェースデザイン、現実世界のニーズに対応する実用的なテクノロジーソリューションの創造にますます関心を持っています。",
        about_p2: "学業を通じて、ソフトウェア開発プロジェクト、特にウェブベースのシステム構築において実践的な経験を積みました。医療管理、キャリア評価、その他の実用的なアプリケーションに関連するプロジェクトに取り組み、フロントエンド開発、インターフェースデザイン、ユーザーエクスペリエンスの基礎を築きました。",
        about_p3: "また、TESDA National Certificate II（コンピュータシステムサービス）を保有しており、リーダーシップ、コラボレーション、プロジェクトベースの業務経験も積んでいます。専門的なキャリアを始めるにあたり、技術スキルを継続的に学習・強化しながら、貢献し、実務経験を積み、ITプロフェッショナルとして成長する機会を模索しています。",
        about_badge_1: "TESDA NC II – コンピュータシステムサービス",
        about_badge_2: "優れたシステムデザイン",
        about_badge_3: "2024–2025 クラス会長",
        about_btn_preview: "履歴書をプレビュー",
        about_btn_download: "PDFをダウンロード",
        skills_tech_title: "技術スキル",
        skills_tools_title: "ツールとテクノロジー",
        skills_prof_title: "スキル習熟度",
        skills_radar_title: "スキル分布",
        edu_tag: "教育",
        edu_title_prefix: "私の",
        edu_title_gradient: "学業の歩み",
        edu_tertiary_tag: "大学",
        edu_tertiary_year: "2022 – 2026",
        edu_tertiary_title: "コンピュータサイエンス学士",
        edu_tertiary_school: "Renaissance School of Science and Technology, Inc.",
        edu_tertiary_loc: "モロン、リサール",
        edu_ach_1: "優れたシステムデザイン",
        edu_ach_2: "優れた論文執筆",
        edu_ach_3: "CS実習最優秀賞",
        edu_ach_4: "OJTレポート最優秀賞",
        edu_ach_5: "ロイヤルティ賞",
        edu_shs_tag: "高校",
        edu_shs_year: "2021 – 2022",
        edu_shs_title: "HUMSSコース",
        edu_shs_school: "Renaissance School of Science and Technology, Inc.",
        edu_shs_loc: "モロン、リサール",
        edu_shs_ach: "優等（11～12年生）",
        edu_jhs_school: "Morong National High School",
        edu_jhs_loc: "モロン、リサール",
        edu_jhs_year: "2019 – 2020",
        edu_jhs_tag: "中学校",
        edu_jhs_year2: "2015 – 2019",
        edu_jhs_title: "中学校",
        edu_jhs_school2: "Morong National High School",
        edu_jhs_loc2: "モロン、リサール",
        edu_elem_tag: "小学校",
        edu_elem_year: "2009 – 2015",
        edu_elem_title: "小学校",
        edu_elem_school: "Tomas Claudio Memorial Elementary School",
        edu_elem_loc: "モロン、リサール",
        edu_cert_tag: "認定資格",
        edu_cert_date: "2024年5月8日",
        edu_cert_title: "国家資格2級 (NC II)",
        edu_cert_sub: "コンピュータシステムサービス (CSS)",
        edu_cert_org: "TESDA",
        edu_cert_badge: "認定済み",
        timeline_tag: "歩み",
        timeline_title_prefix: "プロジェクト",
        timeline_title_gradient: "タイムライン",
        tl_1_title: "RHU Morong 医療システム",
        tl_1_desc: "学術論文プロジェクト - モロン、リサールの地方医療ユニット向けの医療管理システム。Ariel B. Eubanas, Jr.と共同開発。優れたシステムデザインおよび優れた論文執筆賞を受賞。",
        tl_2_title: "Angono NHS キャリア評価",
        tl_2_desc: "独立して開発した学術プロジェクト - 新入生の高校生が自分の興味やスキルに基づいて適切なSHSコースを探求できるように設計されたウェブベースのキャリア評価ツール。",
        tl_3_title: "HowCan‑i‑Help",
        tl_3_desc: "Real IT OPCでKenji Akira BergañoおよびAriel B. Eubanas, Jr.と協力して開発した専門プロジェクト。クリニックのワークフローで積極的に使用されている医療および支援プラットフォーム。",
        tl_4_title: "RITREMIS",
        tl_4_desc: "Real IT OPCでKenji Akira BergañoおよびAriel B. Eubanas, Jr.と協力して開発した専門プロジェクト。不動産管理および物件情報プラットフォーム。",
        team_tag: "コラボレーション",
        team_title_prefix: "一緒に働いた",
        team_title_gradient: "人々",
        team_sub: "良い仕事はコラボレーションから生まれると信じています。ここでは、一緒に働き、学ぶ機会を得た人々を紹介します。",
        team_role_1: "フルスタックウェブ開発者",
        team_company_1: "Real IT OPC",
        team_role_2: "プロジェクトリード / フルスタックウェブ開発者",
        team_company_2: "Real IT OPC",
        team_built_together: "一緒に作ったもの",
        team_learned_label: "このコラボレーションから学んだこと",
        team_connection_label: "3プロジェクト · 2人のコラボレーター · 1チーム",
        client_title_prefix: "ウェブシステムや",
        client_title_gradient: "デジタルプロジェクトの",
        client_title_suffix: "アイデアはありますか？",
        client_desc: "私は開発チームと協力して、ビジネス、組織、プロジェクトチーム向けの実用的なウェブベースのシステムやアプリケーションを構築します。機能的なソリューション、ユーザーフレンドリーなインターフェース、特定の要件に基づいて設計されたシステムに焦点を当てています。",
        client_svc_1: "カスタムウェブアプリケーション",
        client_svc_2: "ウェブベースのシステム",
        client_svc_3: "アプリケーションベースのシステム",
        client_svc_4: "UI/UXデザイン",
        client_svc_5: "システムメンテナンス",
        client_btn: "プロジェクトについて話し合う",
        client_badge: "一緒に作りましょう",
        client_process_discuss: "話し合う",
        client_process_build: "開発する",
        client_process_launch: "公開する",
        client_process_discuss_desc: "ビジョンと要件について話し合います。",
        client_process_build_desc: "システムを丁寧にデザインし、開発します。",
        client_process_launch_desc: "デプロイ、テスト、そしてスムーズな動作を確認します。",
        client_trust_projects: "構築したプロジェクト",
        client_trust_members: "チームメンバー",
        client_trust_year: "コラボレーション年数",
        projects_tag: "ポートフォリオ",
        projects_title: "プロジェクト",
        projects_sub: "ウェブ開発、システムデザイン、協調的問題解決における成長を示す学術および専門的な作品集です。",
        filter_all: "すべて",
        filter_healthcare: "医療",
        filter_education: "教育",
        filter_realestate: "不動産",
        visit_project: "プロジェクトを見る",
        projects_cta: "一緒に働きましょう",
        proj_1_title: "RHU Morong 医療システム",
        proj_1_full: "私たちの論文プロジェクトとして構築された包括的な医療管理プラットフォームです。このシステムは、モロン、リサールの地方医療ユニットの患者受付、予約スケジュール、記録管理をデジタル化しました。<br /><br /><strong>私の貢献:</strong> 医療従事者にシームレスな体験を提供するために、フロントエンドアーキテクチャとユーザーインターフェースデザインを主導しました。バックエンド統合とシステム最適化について共同開発者と緊密に連携しました。<br /><br /><strong>受賞:</strong> <strong>優れたシステムデザイン</strong>および<strong>優れた論文執筆</strong>賞を受賞しました。",
        proj_1_contrib_label: "私の貢献",
        proj_1_contrib: "医療従事者にシームレスな体験を提供するために、フロントエンドアーキテクチャとユーザーインターフェースデザインを主導しました。バックエンド統合とシステム最適化について共同開発者と緊密に連携しました。",
        proj_1_recog_label: "受賞",
        proj_1_recog: "<strong>優れたシステムデザイン</strong>および<strong>優れた論文執筆</strong>賞を受賞しました。",
        proj_2_title: "Angono NHS キャリア評価",
        proj_2_full: "新入生の高校生が自分のSHSコースを特定できるように設計されたウェブベースのキャリアガイダンスツールです。このシステムは、学生の興味、スキル、学業の適性を評価し、データに基づいた推奨事項を提供します。<br /><br /><strong>私の役割:</strong> データベース、フロントエンド、システム機能、デプロイメントを含め、システムを独立して開発しました。このプロジェクトにより、完全なウェブアプリケーションを構築する実践的な経験を得て、各部分がどのように連携するかをより深く理解できました。また、開発および問題解決スキルも向上しました。<br /><br /><strong>インパクト:</strong> 50人以上の学生を正常に評価し、彼らが学業の道について情報に基づいた決定を下すのを支援しました。",
        proj_2_role_label: "私の役割",
        proj_2_role: "データベース、フロントエンド、システム機能、デプロイメントを含め、システムを独立して開発しました。このプロジェクトにより、完全なウェブアプリケーションを構築する実践的な経験を得て、各部分がどのように連携するかをより深く理解できました。また、開発および問題解決スキルも向上しました。",
        proj_2_impact_label: "インパクト",
        proj_2_impact: "50人以上の学生を正常に評価し、彼らが学業の道について情報に基づいた決定を下すのを支援しました。",
        proj_3_title: "HowCan‑i‑Help",
        proj_3_full: "患者、クリニック、コミュニティサポートネットワークを結ぶマルチテナントの医療エコシステムです。このプラットフォームは、集中型デジタルインフラを通じて臨床運用、ドナー調整、患者アウトリーチを効率化します。<br /><br /><strong>プロジェクトの背景:</strong> <strong>Real IT OPC</strong>での専門業務の一環として開発され、シニア開発者と協力してこのソリューションをコンセプトから本番まで導きました。現在、展開され、クリニックのワークフローを積極的にサポートしています。<br /><br /><strong>主な成果:</strong> このシステムはパートナークリニックの日常業務に完全に統合され、手動プロセスを効率的なデジタル記録管理に置き換えました。",
        proj_3_context_label: "プロジェクトの背景",
        proj_3_context: "<strong>Real IT OPC</strong>での専門業務の一環として開発され、シニア開発者と協力してこのソリューションをコンセプトから本番まで導きました。現在、展開され、クリニックのワークフローを積極的にサポートしています。",
        proj_3_ach_label: "主な成果",
        proj_3_ach: "このシステムはパートナークリニックの日常業務に完全に統合され、手動プロセスを効率的なデジタル記録管理に置き換えました。",
        proj_4_title: "RITREMIS",
        proj_4_full: "不動産記録を一元化し、取引を合理化し、ステークホルダーに不動産ポートフォリオのリアルタイムな可視性を提供するように設計された包括的な不動産管理情報システムです。<br /><br /><strong>プロジェクトの背景:</strong> 現在、<strong>Real IT OPC</strong>で開発チームと協力して積極的に開発中です。<br /><br /><strong>私の焦点:</strong> フロントエンド実装、UI/UXデザイン、物件管理者とクライアント向けのレスポンシブで直感的なインターフェースの確保。",
        proj_4_context_label: "プロジェクトの背景",
        proj_4_context: "現在、<strong>Real IT OPC</strong>で開発チームと協力して積極的に開発中です。",
        proj_4_focus_label: "私の焦点",
        proj_4_focus: "フロントエンド実装、UI/UXデザイン、物件管理者とクライアント向けのレスポンシブで直感的なインターフェースの確保。",
        contact_tag: "お問い合わせ",
        contact_title_prefix: "お",
        contact_title_gradient: "問い合わせ",
        contact_sub: "新しい機会、コラボレーション、または気軽な会話にも常にオープンです。お気軽にご連絡ください！",
        contact_location: "モロン、リサール、フィリピン",
        form_name: "お名前",
        form_email: "メールアドレス",
        form_message: "メッセージ",
        form_submit: "メッセージを送信",
        success_title: "ありがとうございます！",
        success_msg: "メッセージが送信されました。すぐにご連絡いたします！",
        resume_doc_label: "書類",
        resume_title: "履歴書",
        resume_sub: "Cathyrine Menguito — コンピュータサイエンス卒業生",
        resume_personal_title: "個人情報",
        resume_personal_sub: "連絡先および所在地情報",
        resume_field_name: "氏名",
        resume_field_email: "メール",
        resume_field_phone: "電話番号",
        resume_field_location: "所在地",
        resume_loc_val: "モロン、リサール、フィリピン",
        resume_pdf_title: "履歴書PDF",
        resume_pdf_sub: "完全な書類プレビュー",
        resume_loading: "履歴書プレビューを読み込み中...",
        resume_download_btn: "PDFをダウンロード",
        resume_close_btn: "閉じる",
        footer_name: "Cathyrine Menguito",
        footer_title: "コンピュータサイエンス卒業生 · Web開発者 · UI/UXデザイナー",
        footer_copy: "Cathyrine Menguito. All rights reserved.",
        footer_badge: "機会を募集中",
        visitor_label: "訪問者",
        scroll_tooltip: "下へスクロール"
    }
};

const defaultLang = 'en';
let currentLang = localStorage.getItem('preferredLang') ||
                  (navigator.language.startsWith('ja') ? 'ja' : 'en');

function applyTranslations(lang) {
    const t = translations[lang] || translations[defaultLang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) {
            el.innerHTML = t[key];
        }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key] !== undefined) {
            el.placeholder = t[key];
        }
    });
    const switcher = document.getElementById('language-switcher');
    if (switcher) switcher.value = lang;
    localStorage.setItem('preferredLang', lang);
    currentLang = lang;
    updateDynamicContent(lang);
}

function updateDynamicContent(lang) {
    const t = translations[lang] || translations[defaultLang];
    const statusEl = document.querySelector('.status-text');
    if (statusEl && t.live_status) statusEl.textContent = t.live_status;
    const floatingCta = document.querySelector('.floating-cta span');
    if (floatingCta && t.floating_cta) floatingCta.textContent = t.floating_cta;
    const tooltip = document.getElementById('scroll-tooltip');
    if (tooltip && t.scroll_tooltip) tooltip.textContent = t.scroll_tooltip;
}

const switcher = document.getElementById('language-switcher');
if (switcher) {
    switcher.value = currentLang;
    switcher.addEventListener('change', (e) => {
        applyTranslations(e.target.value);
    });
}
applyTranslations(currentLang);

// ============================================
// REAL-TIME CLOCK (Local Time) – WITH AM/PM
// ============================================
function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true  // ✅ Shows AM/PM
    });
    const display = document.getElementById('clock-display');
    if (display) display.textContent = timeStr;
}
updateClock();
setInterval(updateClock, 1000);
