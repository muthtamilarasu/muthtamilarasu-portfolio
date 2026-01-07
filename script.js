// Modern QA Portfolio - Enhanced Interactive Features

document.addEventListener('DOMContentLoaded', function () {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            if (mobileToggle) mobileToggle.classList.remove('active');
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('.section, .hero-section');

    function setActiveLink() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);

    // Back to top button
    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Typing animation for name
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';
        typingText.style.borderRight = '3px solid var(--accent-primary)';
        typingText.style.paddingRight = '5px';
        typingText.style.display = 'inline-block';

        let charIndex = 0;

        function typeWriter() {
            if (charIndex < text.length) {
                typingText.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100);
            } else {
                // Remove cursor after typing
                setTimeout(() => {
                    typingText.style.borderRight = 'none';
                }, 500);
            }
        }

        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }

    // Animate proficiency bars on scroll
    const profBars = document.querySelectorAll('.prof-fill');

    function animateBars() {
        profBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;

            if (barPosition < screenPosition) {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }
        });
    }

    let barAnimated = false;
    window.addEventListener('scroll', () => {
        if (!barAnimated) {
            const skillsSection = document.getElementById('skills');
            if (skillsSection) {
                const skillsPosition = skillsSection.getBoundingClientRect().top;
                if (skillsPosition < window.innerHeight) {
                    animateBars();
                    barAnimated = true;
                }
            }
        }
    });

    // Number counter animation for stats
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            if (typeof end === 'number') {
                element.textContent = (progress * (end - start) + start).toFixed(2);
            }

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = end;
            }
        };
        window.requestAnimationFrame(step);
    }

    // Trigger counter animation on scroll
    const statItems = document.querySelectorAll('.stat-item[data-count]');
    let statsAnimated = false;

    window.addEventListener('scroll', () => {
        if (!statsAnimated) {
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                const heroPosition = heroSection.getBoundingClientRect().top;
                if (heroPosition < window.innerHeight && heroPosition > -window.innerHeight) {
                    statItems.forEach(item => {
                        const countValue = parseFloat(item.getAttribute('data-count'));
                        const numberElement = item.querySelector('.stat-number');
                        if (numberElement && !isNaN(countValue)) {
                            animateValue(numberElement, 0, countValue, 2000);
                        }
                    });
                    statsAnimated = true;
                }
            }
        }
    });

    // Smooth scroll for anchor links
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

    // Enhanced fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll('.skill-card, .project-card-modern, .highlight-card, .timeline-item, .cert-item, .contact-info-card, .tool-circle');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add parallax effect to hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const circuitBg = document.querySelector('.circuit-bg');
        const animatedBg = document.querySelector('.animated-bg');

        if (circuitBg && scrolled < window.innerHeight) {
            circuitBg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }

        if (animatedBg && scrolled < window.innerHeight) {
            animatedBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add hover effect to skill cards with tilt
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn, .social-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple-effect 0.6s ease-out';
            ripple.style.pointerEvents = 'none';

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-effect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .btn, .social-btn {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);

    console.log('🚀 Portfolio loaded with enhanced animations and interactions!');
});
