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

    // Trigger counter animation on scroll - DISABLED to prevent double animation conflict with CSS
    /*
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
    */

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Skip empty hashes or just '#'
            if (!href || href === '#' || href.length <= 1) {
                return;
            }

            e.preventDefault();
            const target = document.querySelector(href);
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
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll('.skill-group-card, .project-card-modern, .highlight-card, .timeline-item, .cert-item, .contact-details-panel, .contact-content');

    animateElements.forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });

    // Timeline specific observer
    const timeline = document.querySelector('.timeline');
    if (timeline) {
        observer.observe(timeline);
    }

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

    // Reading Progress Bar
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progressBar = document.getElementById('scrollProgressBar');
        if (progressBar) {
            progressBar.style.width = scrolled + "%";
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

    // PDF Resume Generation
    const downloadCVBtn = document.getElementById('downloadCV');

    // PDF Download feature disabled for live site
    /*
    if (downloadCVBtn) {
        downloadCVBtn.addEventListener('click', async function (e) {
            e.preventDefault();

            // Show loading state
            const originalText = this.querySelector('.btn-text').textContent;
            this.querySelector('.btn-text').textContent = 'Generating PDF...';
            this.style.pointerEvents = 'none';

            try {
                // Create resume HTML content inline
                const resumeHTML = `
                    <div id="resume-content" style="font-family: 'Inter', -apple-system, sans-serif; max-width: 100%; margin: 0; padding: 0; background: white; color: #000; line-height: 1.2;">
                        <!-- Header -->
                        <div style="text-align: center; margin-bottom: 8px; padding: 8px 0; border-bottom: 2px solid #2563eb;">
                            <h1 style="font-size: 24px; font-weight: 900; margin: 0 0 4px 0; color: #000;">MUTHTAMIL ARASU E</h1>
                            <div style="font-size: 14px; font-weight: 700; color: #2563eb; margin-bottom: 4px;">Quality Assurance Engineer</div>
                            <div style="font-size: 10px; color: #000; font-weight: 600; margin-bottom: 4px;">
                                muthtamilarasu898@gmail.com | +91 91592 16698 | Palani, Tamil Nadu
                            </div>
                            <div style="font-size: 10px; color: #2563eb; font-weight: 600; margin-bottom: 4px;">
                                GitHub: muthtamilarasu | LinkedIn: muthtamil-arasu-e | Portfolio: muthtamilarasu.in
                            </div>
                            <div style="margin-top: 4px;">
                                <span style="display: inline-block; padding: 3px 8px; background: #dcfce7; color: #16a34a; font-size: 9px; font-weight: 700; border-radius: 10px; border: 1px solid #16a34a; margin: 0 3px;">Open to Work</span>
                                <span style="display: inline-block; padding: 3px 8px; background: #dcfce7; color: #16a34a; font-size: 9px; font-weight: 700; border-radius: 10px; border: 1px solid #16a34a; margin: 0 3px;">Open to Internship</span>
                            </div>
                        </div>

                        <!-- Professional Summary -->
                        <div style="margin-bottom: 8px;">
                            <h2 style="font-size: 12px; font-weight: 900; margin: 0 0 4px 0; padding-bottom: 2px; border-bottom: 1px solid #000; text-transform: uppercase; letter-spacing: 0.3px; color: #000;">PROFESSIONAL SUMMARY</h2>
                            <p style="font-size: 10px; line-height: 1.3; color: #000; font-weight: 600; text-align: justify; margin: 0;">
                                Entry-level QA Engineer with a B.Sc in Computer Science (Cognitive Systems) and hands-on experience in manual testing, 
                                test case design, and defect management. Passionate about ensuring software quality through meticulous attention to detail, 
                                analytical thinking, and a strong foundation in SDLC/STLC. Experienced in building comprehensive testing frameworks, 
                                managing bug databases, and developing production-ready QA tools. Ready to contribute to high-quality product delivery 
                                and grow into automation testing.
                            </p>
                        </div>

                        <!-- Education -->
                        <div style="margin-bottom: 16px;">
                            <h2 style="font-size: 16px; font-weight: 700; margin-bottom: 6px; padding-bottom: 4px; border-bottom: 2px solid #e5e7eb; text-transform: uppercase; letter-spacing: 0.5px; color: #000;">EDUCATION</h2>
                            <div style="margin-bottom: 10px;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                                    <div>
                                        <div style="font-size: 13px; font-weight: 700; color: #000;">B.Sc Computer Science (Cognitive Systems)</div>
                                        <div style="font-size: 13px; color: #2563eb; font-weight: 600;">Karpagam Academy of Higher Education, Coimbatore</div>
                                    </div>
                                    <div style="font-size: 12px; color: #000; font-weight: 600;">2024</div>
                                </div>
                                <div style="font-size: 11px; color: #000;">CGPA: 7.29/10</div>
                            </div>
                            <div style="margin-bottom: 10px;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                                    <div>
                                        <div style="font-size: 13px; font-weight: 700; color: #000;">Higher Secondary Certificate (HSC)</div>
                                        <div style="font-size: 13px; color: #2563eb; font-weight: 600;">Sankar Ponnar Higher Secondary School, Palani</div>
                                    </div>
                                    <div style="font-size: 12px; color: #000; font-weight: 600;">2021</div>
                                </div>
                                <div style="font-size: 11px; color: #000;">79% - State Board</div>
                            </div>
                        </div>

                        <!-- Core QA Skills -->
                        <div style="margin-bottom: 16px;">
                            <h2 style="font-size: 16px; font-weight: 700; margin-bottom: 6px; padding-bottom: 4px; border-bottom: 2px solid #e5e7eb; text-transform: uppercase; letter-spacing: 0.5px; color: #000;">CORE QA SKILLS</h2>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                                <div>
                                    <h4 style="font-size: 15px; font-weight: 600; margin-bottom: 6px;">🐛 Bug Database Management</h4>
                                    <p style="font-size: 11px; color: #000; line-height: 1.5;">Defect tracking, bug lifecycle management, comprehensive documentation</p>
                                </div>
                                <div>
                                    <h4 style="font-size: 15px; font-weight: 600; margin-bottom: 6px;">📋 Test Management</h4>
                                    <p style="font-size: 11px; color: #000; line-height: 1.5;">Test case design, execution, bug tracking using industry-standard tools</p>
                                </div>
                                <div>
                                    <h4 style="font-size: 15px; font-weight: 600; margin-bottom: 6px;">📊 System Specifications</h4>
                                    <p style="font-size: 11px; color: #000; line-height: 1.5;">Requirements analysis, technical documentation, test scenario translation</p>
                                </div>
                                <div>
                                    <h4 style="font-size: 15px; font-weight: 600; margin-bottom: 6px;">💻 Programming Knowledge</h4>
                                    <p style="font-size: 11px; color: #000; line-height: 1.5;">Python, JavaScript, MySQL - Supporting automation and database testing</p>
                                </div>
                            </div>
                        </div>

                        <!-- Technical Proficiencies -->
                        <div style="margin-bottom: 16px;">
                            <h2 style="font-size: 14px; font-weight: 700; margin-bottom: 6px; padding-bottom: 4px; border-bottom: 2px solid #e5e7eb; text-transform: uppercase; letter-spacing: 0.5px; color: #000;">TECHNICAL PROFICIENCIES</h2>
                            <p style="font-size: 13px; margin-bottom: 8px;"><strong>Testing:</strong> Manual Testing (90%), Test Case Design (85%), SQL/Database Testing (75%), Automation Testing (60%)</p>
                            <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                                <span style="padding: 4px 10px; background: #eff6ff; color: #2563eb; font-size: 11px; font-weight: 600; border-radius: 4px; border: 1px solid #bfdbfe;">Selenium</span>
                                <span style="padding: 4px 10px; background: #eff6ff; color: #2563eb; font-size: 11px; font-weight: 600; border-radius: 4px; border: 1px solid #bfdbfe;">Python</span>
                                <span style="padding: 4px 10px; background: #eff6ff; color: #2563eb; font-size: 11px; font-weight: 600; border-radius: 4px; border: 1px solid #bfdbfe;">JavaScript</span>
                                <span style="padding: 4px 10px; background: #eff6ff; color: #2563eb; font-size: 11px; font-weight: 600; border-radius: 4px; border: 1px solid #bfdbfe;">MySQL</span>
                                <span style="padding: 4px 10px; background: #eff6ff; color: #2563eb; font-size: 11px; font-weight: 600; border-radius: 4px; border: 1px solid #bfdbfe;">Jira</span>
                                <span style="padding: 4px 10px; background: #eff6ff; color: #2563eb; font-size: 11px; font-weight: 600; border-radius: 4px; border: 1px solid #bfdbfe;">Git</span>
                                <span style="padding: 4px 10px; background: #eff6ff; color: #2563eb; font-size: 11px; font-weight: 600; border-radius: 4px; border: 1px solid #bfdbfe;">VS Code</span>
                                <span style="padding: 4px 10px; background: #eff6ff; color: #2563eb; font-size: 11px; font-weight: 600; border-radius: 4px; border: 1px solid #bfdbfe;">Vitest</span>
                                <span style="padding: 4px 10px; background: #eff6ff; color: #2563eb; font-size: 11px; font-weight: 600; border-radius: 4px; border: 1px solid #bfdbfe;">Playwright</span>
                                <span style="padding: 4px 10px; background: #eff6ff; color: #2563eb; font-size: 11px; font-weight: 600; border-radius: 4px; border: 1px solid #bfdbfe;">Docker</span>
                            </div>
                        </div>

                        <!-- Project Experience -->
                        <div style="margin-bottom: 16px;">
                            <h2 style="font-size: 14px; font-weight: 700; margin-bottom: 6px; padding-bottom: 4px; border-bottom: 2px solid #e5e7eb; text-transform: uppercase; letter-spacing: 0.5px; color: #000;">PROJECT EXPERIENCE</h2>
                            
                            <div style="margin-bottom: 18px;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <div style="font-size: 13px; font-weight: 700; color: #000;">Bug Tracker - Enterprise Defect Management System</div>
                                    <div style="font-size: 12px; color: #2563eb; font-weight: 600;">January 2026</div>
                                </div>
                                <p style="font-size: 12px; color: #000; margin-bottom: 8px; line-height: 1.6;">
                                    Production-ready defect tracking and management platform for QA teams featuring role-based access control, 
                                    real-time analytics, and enterprise-grade security.
                                </p>
                                <ul style="list-style: none; padding-left: 0; margin-bottom: 8px;">
                                    <li style="font-size: 11px; color: #000; padding-left: 16px; position: relative; margin-bottom: 4px;">→ Implemented comprehensive bug lifecycle management with detailed metadata tracking</li>
                                    <li style="font-size: 11px; color: #000; padding-left: 16px; position: relative; margin-bottom: 4px;">→ Built role-based access control (Admin, Tester, Developer) with granular permissions</li>
                                    <li style="font-size: 11px; color: #000; padding-left: 16px; position: relative; margin-bottom: 4px;">→ Developed real-time analytics dashboard using Chart.js for visualization</li>
                                    <li style="font-size: 11px; color: #000; padding-left: 16px; position: relative; margin-bottom: 4px;">→ Implemented enterprise security: PBKDF2 hashing, XSS protection, AES-GCM encryption</li>
                                    <li style="font-size: 11px; color: #000; padding-left: 16px; position: relative; margin-bottom: 4px;">→ Achieved 100% test coverage with Vitest (unit) and Playwright (E2E)</li>
                                </ul>
                                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px;">
                                    <span style="padding: 4px 10px; background: #eff6ff; color: #2563eb; font-size: 11px; font-weight: 600; border-radius: 4px;">JavaScript</span>
                                    <span style="padding: 4px 10px; background: #eff6ff; color: #2563eb; font-size: 11px; font-weight: 600; border-radius: 4px;">Vite</span>
                                    <span style="padding: 4px 10px; background: #eff6ff; color: #2563eb; font-size: 11px; font-weight: 600; border-radius: 4px;">SQL.js</span>
                                    <span style="padding: 4px 10px; background: #eff6ff; color: #2563eb; font-size: 11px; font-weight: 600; border-radius: 4px;">Vitest</span>
                                    <span style="padding: 4px 10px; background: #eff6ff; color: #2563eb; font-size: 11px; font-weight: 600; border-radius: 4px;">Playwright</span>
                                </div>
                            </div>

                            <div style="margin-bottom: 18px;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <div style="font-size: 13px; font-weight: 700; color: #000;">Young Entrepreneur E-Negosyo System</div>
                                    <div style="font-size: 12px; color: #2563eb; font-weight: 600;">March 2024</div>
                                </div>
                                <p style="font-size: 12px; color: #000; margin-bottom: 8px;">
                                    Full-stack e-commerce system for young entrepreneurs with comprehensive UI testing and debugging.
                                </p>
                                <ul style="list-style: none; padding-left: 0;">
                                    <li style="font-size: 11px; color: #000; padding-left: 16px; position: relative; margin-bottom: 4px;">→ Developed product listings and order workflow features</li>
                                    <li style="font-size: 11px; color: #000; padding-left: 16px; position: relative; margin-bottom: 4px;">→ Performed comprehensive debugging and testing</li>
                                </ul>
                            </div>
                        </div>

                        <!-- Work Experience -->
                        <div style="margin-bottom: 16px;">
                            <h2 style="font-size: 16px; font-weight: 700; margin-bottom: 6px; padding-bottom: 4px; border-bottom: 2px solid #e5e7eb; text-transform: uppercase; letter-spacing: 0.5px; color: #000;">WORK EXPERIENCE</h2>
                            <div style="margin-bottom: 10px;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                                    <div>
                                        <div style="font-size: 13px; font-weight: 700; color: #000;">Junior Web Developer Intern</div>
                                        <div style="font-size: 13px; color: #2563eb; font-weight: 600;">Internship</div>
                                    </div>
                                    <div style="font-size: 12px; color: #000; font-weight: 600;">2023</div>
                                </div>
                                <div style="font-size: 11px; color: #000; line-height: 1.4;">
                                    Assisted in UI development and debugging. Strengthened QA mindset through developer collaboration.
                                </div>
                            </div>
                        </div>

                        <!-- Certifications -->
                        <div style="margin-bottom: 16px;">
                            <h2 style="font-size: 16px; font-weight: 700; margin-bottom: 6px; padding-bottom: 4px; border-bottom: 2px solid #e5e7eb; text-transform: uppercase; letter-spacing: 0.5px; color: #000;">CERTIFICATIONS</h2>
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                                <div>
                                    <div style="font-size: 13px; font-weight: 700; color: #000;">📊 Data Analytics Workshop</div>
                                    <div style="font-size: 13px; color: #2563eb; font-weight: 600;">Jobaaj Learnings</div>
                                </div>
                                <div>
                                    <div style="font-size: 13px; font-weight: 700; color: #000;">💾 SQL Workshop</div>
                                    <div style="font-size: 13px; color: #2563eb; font-weight: 600;">Newton School</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                // Create a temporary container
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = resumeHTML;
                const resumeElement = tempDiv.querySelector('#resume-content');

                // Configure PDF options - minimal margins
                const opt = {
                    margin: [5, 8, 5, 8],  // top, left, bottom, right in mm
                    filename: 'Muthtamil_Arasu_E_QA_Engineer_Resume.pdf',
                    image: { type: 'jpeg', quality: 0.95 },
                    html2canvas: {
                        scale: 2,
                        useCORS: true,
                        letterRendering: true,
                        backgroundColor: '#ffffff'
                    },
                    jsPDF: {
                        unit: 'mm',
                        format: 'a4',
                        orientation: 'portrait',
                        compress: true
                    },
                    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
                };

                // Generate PDF
                await html2pdf().set(opt).from(resumeElement).save();

                // Reset button state
                this.querySelector('.btn-text').textContent = originalText;
                this.style.pointerEvents = 'auto';

                console.log('✅ Resume PDF generated successfully!');
            } catch (error) {
                console.error('Error generating PDF:', error);
                alert('Sorry, there was an error generating the PDF. Please try again.');

                // Reset button state
                this.querySelector('.btn-text').textContent = originalText;
                this.style.pointerEvents = 'auto';
            }
        });
    }
    */

    console.log('🚀 Portfolio loaded with enhanced animations and interactions!');
});
