// ═══════════════════════════════════════════════════════════════════════════════
//                              TYPING EFFECT
// ═══════════════════════════════════════════════════════════════════════════════

const typingTexts = [
    "Full-Stack Developer",
    "React Specialist",
    "Node.js Developer",
    "TypeScript Enthusiast",
    "Clean Code Advocate"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.typing');

function typeEffect() {
    const currentText = typingTexts[textIndex];

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

// ═══════════════════════════════════════════════════════════════════════════════
//                              NAVIGATION
// ═══════════════════════════════════════════════════════════════════════════════

const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.section');
const pageIndicator = document.querySelector('.current-page');

// Update active section on scroll
function updateActiveSection() {
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Update nav items
            navItems.forEach(item => item.classList.remove('active'));
            navItems[index].classList.add('active');

            // Update page indicator
            pageIndicator.textContent = String(index + 1).padStart(2, '0');

            // Trigger animations for active section
            section.classList.add('active');

            // Animate skill bars if skills section
            if (section.id === 'skills') {
                animateSkillBars();
            }
        }
    });
}

// Smooth scroll to section
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        targetSection.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// ═══════════════════════════════════════════════════════════════════════════════
//                              SKILL BARS ANIMATION
// ═══════════════════════════════════════════════════════════════════════════════

let skillsAnimated = false;

function animateSkillBars() {
    if (skillsAnimated) return;

    const progressBars = document.querySelectorAll('.skill-progress');

    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 200);
    });

    skillsAnimated = true;
}

// ═══════════════════════════════════════════════════════════════════════════════
//                              INTERSECTION OBSERVER
// ═══════════════════════════════════════════════════════════════════════════════

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');

            // Find index and update nav
            const index = Array.from(sections).indexOf(entry.target);
            navItems.forEach(item => item.classList.remove('active'));
            navItems[index].classList.add('active');
            pageIndicator.textContent = String(index + 1).padStart(2, '0');

            // Animate skills if needed
            if (entry.target.id === 'skills') {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// ═══════════════════════════════════════════════════════════════════════════════
//                              PARALLAX EFFECT
// ═══════════════════════════════════════════════════════════════════════════════

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    const bgGradient = document.querySelector('.bg-gradient');
    if (bgGradient) {
        bgGradient.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
    }
});

// ═══════════════════════════════════════════════════════════════════════════════
//                              INITIALIZE
// ═══════════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    // Start typing effect
    setTimeout(typeEffect, 1000);

    // Set first section as active
    sections[0].classList.add('active');

    // Add scroll listener
    window.addEventListener('scroll', updateActiveSection);

    // Initial check
    updateActiveSection();
});

// ═══════════════════════════════════════════════════════════════════════════════
//                              SMOOTH REVEAL
// ═══════════════════════════════════════════════════════════════════════════════

// Add subtle hover effects to glass cards
const glassCards = document.querySelectorAll('.glass-card');

glassCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});
