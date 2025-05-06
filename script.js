document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Check for saved dark mode preference or use the OS preference
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedDarkMode = localStorage.getItem('darkMode');
    
    // Apply dark mode based on saved preference or OS preference
    if (savedDarkMode === 'false') {
        body.classList.remove('dark-mode');
        darkModeToggle.checked = false;
    } else {
        // Default to dark mode for our dark theme site
        body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }
    
    // Handle dark mode toggle change
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'true');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'false');
        }
    });
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Create mobile menu if it doesn't exist
            if (!document.querySelector('.mobile-menu')) {
                const mobileMenu = document.createElement('div');
                mobileMenu.className = 'mobile-menu';
                
                const navClone = navLinks.cloneNode(true);
                const authClone = authButtons.cloneNode(true);
                
                mobileMenu.appendChild(navClone);
                mobileMenu.appendChild(authClone);
                
                document.body.appendChild(mobileMenu);
                
                // Add styles for mobile menu
                const style = document.createElement('style');
                style.textContent = `
                    .mobile-menu {
                        position: fixed;
                        top: 70px;
                        left: 0;
                        width: 100%;
                        background-color: rgba(15, 23, 42, 0.95);
                        padding: 2rem;
                        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
                        z-index: 99;
                        transform: translateY(-100%);
                        opacity: 0;
                        transition: all 0.3s ease;
                        backdrop-filter: blur(10px);
                        -webkit-backdrop-filter: blur(10px);
                        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    }
                    
                    .mobile-menu.active {
                        transform: translateY(0);
                        opacity: 1;
                    }
                    
                    .mobile-menu .nav-links {
                        display: flex;
                        flex-direction: column;
                        gap: 1.5rem;
                        margin-bottom: 2rem;
                    }
                    
                    .mobile-menu .auth-buttons {
                        display: flex;
                        flex-direction: column;
                        gap: 1rem;
                    }
                    
                    .hamburger.active span:nth-child(1) {
                        transform: translateY(8px) rotate(45deg);
                    }
                    
                    .hamburger.active span:nth-child(2) {
                        opacity: 0;
                    }
                    
                    .hamburger.active span:nth-child(3) {
                        transform: translateY(-8px) rotate(-45deg);
                    }
                `;
                document.head.appendChild(style);
            }
            
            const mobileMenu = document.querySelector('.mobile-menu');
            mobileMenu.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Add active class to clicked link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Close mobile menu if open
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    document.querySelector('.hamburger').classList.remove('active');
                }
            }
        });
    });
    
    // Enhanced animations for How It Works section
    const stepCards = document.querySelectorAll('.step-card');
    
    // Create staggered animation effect
    stepCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.transitionDelay = `${index * 0.15}s`;
    });
    
    // Special intersection observer for how it works section
    const howItWorksObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate step cards when section comes into view
                stepCards.forEach(card => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
                howItWorksObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    const howItWorksSection = document.querySelector('.how-it-works');
    if (howItWorksSection) {
        howItWorksObserver.observe(howItWorksSection);
    }
    
    // Intersection Observer for scroll-based animations
    const fadeInElements = document.querySelectorAll('.feature-card, .template-card');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeInElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(element);
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Mock login/signup with Google OAuth
    const authBtns = document.querySelectorAll('.auth-buttons .btn-primary, .auth-buttons .btn-secondary, .cta-buttons .btn-primary, .cta-section .btn-primary');
    
    authBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            alert('This would redirect to Google OAuth in a real application. After authentication, users would be guided to connect their GitHub and LinkedIn accounts.');
        });
    });
    
    // Template preview functionality
    const templatePreviewBtns = document.querySelectorAll('.template-card button');
    
    templatePreviewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const templateName = this.parentElement.querySelector('h3').textContent;
            alert(`This would open a preview of the ${templateName} template in a real application. You would be able to see how your portfolio looks with your actual data.`);
        });
    });
    
    // View Templates button functionality
    const viewTemplatesBtn = document.querySelector('.cta-buttons .btn-secondary');
    if (viewTemplatesBtn) {
        viewTemplatesBtn.addEventListener('click', function() {
            const templatesSection = document.getElementById('templates');
            if (templatesSection) {
                window.scrollTo({
                    top: templatesSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            if (scrollPosition < 600) {
                heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
            }
        });
    }
});