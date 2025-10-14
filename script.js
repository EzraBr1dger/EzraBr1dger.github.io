// Cursor glow effect
const cursorGlow = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX - 10 + 'px';
    cursorGlow.style.top = e.clientY - 10 + 'px';
});

// Enhanced smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Advanced navbar effects
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (scrolled > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.borderBottom = '1px solid rgba(0, 255, 255, 0.5)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.borderBottom = '1px solid rgba(0, 255, 255, 0.3)';
    }
});

// Typewriter effect
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    element.style.borderRight = '3px solid var(--primary-color)';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Blinking cursor effect
            setInterval(() => {
                element.style.borderRight = element.style.borderRight === 'none' 
                    ? '3px solid var(--primary-color)' 
                    : 'none';
            }, 500);
        }
    }
    type();
}

// Initialize typewriter when page loads
window.addEventListener('load', () => {
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        setTimeout(() => {
            typeWriter(typewriterElement, '& Systems Architect', 150);
        }, 4000); // Start after glitch animation
    }
});

// Parallax effect for floating shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        shape.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Special handling for skill bars
            if (entry.target.classList.contains('skill-category')) {
                const skillLevels = entry.target.querySelectorAll('.skill-level');
                skillLevels.forEach((level, index) => {
                    setTimeout(() => {
                        level.style.animation = 'skillFill 2s ease forwards';
                    }, index * 200);
                });
            }
            
            // Special handling for stat cards
            if (entry.target.classList.contains('stat-card')) {
                setTimeout(() => {
                    entry.target.style.animation = 'statPulse 0.6s ease';
                }, Math.random() * 300);
            }
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.project-card, .skill-category, .stat-card, .contact-card, .text-card'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
});

// Add CSS for animate-in class
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    @keyframes statPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes skillFill {
        from { width: 0; }
        to { width: var(--skill-width); }
    }
`;
document.head.appendChild(style);

// Enhanced project card interactions
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(0, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = e.offsetX - 50 + 'px';
        ripple.style.top = e.offsetY - 50 + 'px';
        ripple.style.width = '100px';
        ripple.style.height = '100px';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Glitch effect for main title
function createGlitchEffect() {
    const glitchText = document.querySelector('.glitch-text');
    if (!glitchText) return;
    
    const originalText = glitchText.getAttribute('data-text');
    const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
    
    let iteration = 0;
    
    const glitchInterval = setInterval(() => {
        glitchText.innerHTML = originalText
            .split('')
            .map((char, index) => {
                if (index < iteration) {
                    return originalText[index];
                }
                return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            })
            .join('');
        
        if (iteration >= originalText.length) {
            clearInterval(glitchInterval);
        }
        
        iteration += 1 / 3;
    }, 30);
}

// Trigger glitch effect on page load
window.addEventListener('load', () => {
    setTimeout(createGlitchEffect, 500);
});

// Particle effects for buttons
function createParticleEffect(button) {
    const particles = [];
    const particleCount = 6;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'var(--primary-color)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.animation = `particle-float-${i} 2s infinite linear`;
        
        button.appendChild(particle);
        particles.push(particle);
    }
    
    return particles;
}

// Add particle animations
const particleAnimations = document.createElement('style');
particleAnimations.textContent = `
    @keyframes particle-float-0 {
        0% { transform: translate(0, 0) scale(0); opacity: 1; }
        100% { transform: translate(20px, -20px) scale(1); opacity: 0; }
    }
    @keyframes particle-float-1 {
        0% { transform: translate(0, 0) scale(0); opacity: 1; }
        100% { transform: translate(-20px, -20px) scale(1); opacity: 0; }
    }
    @keyframes particle-float-2 {
        0% { transform: translate(0, 0) scale(0); opacity: 1; }
        100% { transform: translate(15px, -25px) scale(1); opacity: 0; }
    }
    @keyframes particle-float-3 {
        0% { transform: translate(0, 0) scale(0); opacity: 1; }
        100% { transform: translate(-15px, -25px) scale(1); opacity: 0; }
    }
    @keyframes particle-float-4 {
        0% { transform: translate(0, 0) scale(0); opacity: 1; }
        100% { transform: translate(25px, -15px) scale(1); opacity: 0; }
    }
    @keyframes particle-float-5 {
        0% { transform: translate(0, 0) scale(0); opacity: 1; }
        100% { transform: translate(-25px, -15px) scale(1); opacity: 0; }
    }
`;
document.head.appendChild(particleAnimations);

// Initialize particle effects on glow buttons
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.glow-btn').forEach(button => {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        createParticleEffect(button);
    });
});

// Add magnetic effect to contact cards
document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const moveX = x * 0.1;
        const moveY = y * 0.1;
        
        card.style.transform = `translateY(-10px) rotateX(${moveY}deg) rotateY(${moveX}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
});

// Dynamic background pattern
function createBackgroundPattern() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    
    document.body.appendChild(canvas);
    
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(0, 255, 255, 0.5)';
        
        particles.forEach((particle, i) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw connections
            particles.forEach((other, j) => {
                if (i !== j) {
                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.strokeStyle = `rgba(0, 255, 255, ${0.2 - distance / 500})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.stroke();
                    }
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

createBackgroundPattern(); 