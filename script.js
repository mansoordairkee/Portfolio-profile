// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Intersection Observer for animations
function createObserver() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, options);

    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(
        '[class*="animate-"], .progress-fill'
    );
    
    animatableElements.forEach(el => {
        observer.observe(el);
    });
}

// Animate progress bars when they come into view
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                
                // Reset width to 0 first
                progressBar.style.width = '0%';
                
                // Animate to target width
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
                
                progressObserver.unobserve(progressBar);
            }
        });
    }, {
        threshold: 0.5
    });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Form handling
function handleFormSubmission() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message (you can customize this)
            alert('Thank you for your message! I\'ll get back to you soon.');
            
            // Reset form
            form.reset();
        });
    }
}

// Add floating particle effect
function createFloatingParticles() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: hsl(217 91% 60% / ${Math.random() * 0.5 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
            pointer-events: none;
        `;
        
        heroSection.appendChild(particle);
    }
}

// Add CSS for floating particles
function addParticleStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Navbar scroll effect (if you want to add a navbar later)
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Typing effect for hero title
function createTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
}

// Add hover effects to cards
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.highlight-card, .skill-category, .education-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Parallax effect for background
function addParallaxEffect() {
    const heroBackground = document.querySelector('.hero-background');
    if (!heroBackground) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroBackground.style.transform = `translateY(${rate}px)`;
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createObserver();
    animateProgressBars();
    handleFormSubmission();
    addParticleStyles();
    createFloatingParticles();
    handleNavbarScroll();
    addCardHoverEffects();
    addParallaxEffect();
    
    // Optional: Add typing effect (uncomment if desired)
    // createTypingEffect();
});

// Add smooth reveal animations on scroll
window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('[class*="animate-"]');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Your scroll handling code here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);