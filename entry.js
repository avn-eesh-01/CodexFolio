document.addEventListener('DOMContentLoaded', function() {
    // Create animated shapes dynamically
    addDynamicShapes();
    
    // Add parallax effect on mouse move
    const container = document.querySelector('.container');
    document.addEventListener('mousemove', function(e) {
        parallaxEffect(e);
    });
    
    // Add button animations
    initButtonEffects();
    
    // Add code element animations
    animateCodeElements();
    
    // Initialize 3D elements rotation
    init3DElements();
    
    // Animate tech illustrations
    animateTechIllustrations();
    
    // Add scroll-based animations
    window.addEventListener('scroll', function() {
        scrollParallax();
    });
});

// Add extra dynamic shapes to the background
function addDynamicShapes() {
    const shapesContainer = document.querySelector('.floating-shapes');
    const totalExtraShapes = 5; // Number of additional shapes to add
    
    for (let i = 0; i < totalExtraShapes; i++) {
        const shape = document.createElement('div');
        shape.className = 'shape dynamic-shape';
        
        // Random positioning and sizing
        const size = Math.random() * 100 + 50; // Between 50px and 150px
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.top = `${Math.random() * 100}%`;
        shape.style.left = `${Math.random() * 100}%`;
        
        // Random colors
        const hue = Math.floor(Math.random() * 360);
        shape.style.background = `linear-gradient(135deg, hsla(${hue}, 70%, 50%, 0.1), transparent)`;
        
        // Random animation
        const duration = Math.random() * 10 + 10; // Between 10s and 20s
        shape.style.animation = `float ${duration}s ease-in-out infinite ${Math.random() * 5}s alternate`;
        
        shapesContainer.appendChild(shape);
    }
}

// Parallax effect on mouse move
function parallaxEffect(e) {
    const container = document.querySelector('.container');
    const shapes = document.querySelectorAll('.shape');
    const circles = document.querySelectorAll('.circle');
    const codeBlocks = document.querySelectorAll('.code-block');
    const cube = document.querySelector('.cube');
    const pyramid = document.querySelector('.pyramid');
    const sphere = document.querySelector('.sphere');
    const techIcons = document.querySelectorAll('.tech-icon');
    const illustrations = document.querySelectorAll('.illustration');
    
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // Move container slightly for subtle effect
    container.style.transform = `translate(${mouseX * 10 - 5}px, ${mouseY * 10 - 5}px)`;
    
    // Move shapes in parallax
    shapes.forEach(shape => {
        const speed = parseFloat(shape.getAttribute('data-speed') || Math.random() * 0.1);
        const x = (mouseX - 0.5) * 40 * speed;
        const y = (mouseY - 0.5) * 40 * speed;
        shape.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.2}deg) scale(${1 + mouseY * 0.1})`;
    });
    
    // Move circles
    circles.forEach((circle, index) => {
        const x = (mouseX - 0.5) * (20 + index * 10);
        const y = (mouseY - 0.5) * (20 + index * 10);
        circle.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
    
    // Move code blocks
    codeBlocks.forEach((block, index) => {
        const factor = index % 2 === 0 ? 1 : -1;
        const x = (mouseX - 0.5) * 30 * factor;
        const y = (mouseY - 0.5) * 30 * factor;
        block.style.transform = `translate(${x}px, ${y}px)`;
    });
    
    // Add parallax to 3D elements
    if(cube) {
        const cubeBaseTransform = getComputedStyle(cube).transform;
        cube.style.transform = `${cubeBaseTransform} translate(${mouseX * 30 - 15}px, ${mouseY * 30 - 15}px)`;
    }
    
    if(pyramid) {
        const pyramidBaseTransform = getComputedStyle(pyramid).transform;
        pyramid.style.transform = `${pyramidBaseTransform} translate(${mouseX * -25 + 12.5}px, ${mouseY * -25 + 12.5}px)`;
    }
    
    if(sphere) {
        sphere.style.transform = `translate(${mouseX * 20 - 10}px, ${mouseY * 20 - 10}px) scale(${1 + mouseY * 0.2})`;
        sphere.style.boxShadow = `${(mouseX - 0.5) * 10}px ${(mouseY - 0.5) * 10}px 20px rgba(0, 245, 212, 0.15)`;
    }
    
    // Move tech icons with mouse
    techIcons.forEach((icon, index) => {
        const speed = 0.05 + (index * 0.01);
        const x = (mouseX - 0.5) * 40 * speed;
        const y = (mouseY - 0.5) * 40 * speed;
        const baseTransform = getComputedStyle(icon).transform;
        icon.style.transform = `translate(${x}px, ${y}px)`;
    });
    
    // Move illustrations with mouse
    illustrations.forEach((illustration, index) => {
        const speed = 0.04 + (index * 0.01);
        const x = (mouseX - 0.5) * 30 * (index % 2 === 0 ? 1 : -1);
        const y = (mouseY - 0.5) * 30 * (index % 2 === 0 ? 1 : -1);
        
        const style = getComputedStyle(illustration);
        const transform = style.transform === 'none' ? '' : style.transform;
        
        illustration.style.transform = `${transform} translate(${x}px, ${y}px)`;
    });
}

// Button hover effects
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn-login, .btn-signup');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.querySelector('.btn-glow').style.opacity = '1';
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.querySelector('.btn-glow').style.opacity = '0';
            this.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Animate code elements with typing effect
function animateCodeElements() {
    const codeBlocks = document.querySelectorAll('.code-block');
    
    codeBlocks.forEach((block, index) => {
        const originalText = block.textContent;
        block.textContent = '';
        
        // Type effect for code blocks
        setTimeout(() => {
            typeText(block, originalText);
        }, index * 500); // Stagger start times
    });
}

// Initialize 3D element rotation and effects
function init3DElements() {
    // Add glow effects to 3D elements
    addGlowEffects();
    
    // Add interactive rotation to 3D elements on hover
    const threeElements = document.querySelector('.three-d-elements');
    if (threeElements) {
        const cube = document.querySelector('.cube');
        const pyramid = document.querySelector('.pyramid');
        
        if (cube) {
            cube.addEventListener('mouseenter', function() {
                this.style.animation = 'none';
                this.style.transform = 'rotateX(-20deg) rotateY(45deg) scale(1.2)';
                
                // Add glow effect on hover
                const faces = this.querySelectorAll('.cube-face');
                faces.forEach(face => {
                    face.style.boxShadow = '0 0 20px rgba(76, 201, 240, 0.4) inset';
                    face.style.borderColor = 'rgba(76, 201, 240, 0.8)';
                });
            });
            
            cube.addEventListener('mouseleave', function() {
                this.style.animation = 'rotateCube 15s linear infinite';
                this.style.transform = 'rotateX(-20deg) rotateY(45deg) scale(1)';
                
                // Remove glow effect
                const faces = this.querySelectorAll('.cube-face');
                faces.forEach(face => {
                    face.style.boxShadow = '0 0 10px rgba(76, 201, 240, 0.2) inset';
                    face.style.borderColor = 'rgba(76, 201, 240, 0.4)';
                });
            });
        }
        
        if (pyramid) {
            pyramid.addEventListener('mouseenter', function() {
                this.style.animation = 'none';
                this.style.transform = 'rotateX(-30deg) rotateY(45deg) scale(1.2)';
                
                // Add glow effect on hover
                const faces = this.querySelectorAll('.pyramid-face');
                faces.forEach(face => {
                    face.style.boxShadow = '0 0 20px rgba(247, 37, 133, 0.4) inset';
                    face.style.borderColor = 'rgba(247, 37, 133, 0.8)';
                });
            });
            
            pyramid.addEventListener('mouseleave', function() {
                this.style.animation = 'rotatePyramid 20s linear infinite';
                this.style.transform = 'rotateX(-30deg) rotateY(45deg) scale(1)';
                
                // Remove glow effect
                const faces = this.querySelectorAll('.pyramid-face');
                faces.forEach(face => {
                    face.style.boxShadow = '0 0 10px rgba(247, 37, 133, 0.2) inset';
                    face.style.borderColor = 'rgba(247, 37, 133, 0.4)';
                });
            });
        }
    }
}

// Add glow effects to 3D elements
function addGlowEffects() {
    // Add pulsing glow to the sphere
    const sphere = document.querySelector('.sphere');
    if (sphere) {
        setInterval(() => {
            sphere.style.boxShadow = `0 0 30px rgba(0, 245, 212, 0.2)`;
            setTimeout(() => {
                sphere.style.boxShadow = `0 0 20px rgba(0, 245, 212, 0.1)`;
            }, 1000);
        }, 2000);
    }
    
    // Add random glint effects to tech icons
    const techIcons = document.querySelectorAll('.tech-icon');
    techIcons.forEach((icon, index) => {
        setInterval(() => {
            icon.style.filter = 'brightness(2)';
            icon.style.transform = 'scale(1.1)';
            
            setTimeout(() => {
                icon.style.filter = 'brightness(1)';
                icon.style.transform = 'scale(1)';
            }, 300);
        }, 3000 + (index * 1000)); // Staggered timing
    });
}

// Animate tech illustrations
function animateTechIllustrations() {
    // Animate code window content
    const codeLines = document.querySelectorAll('.code-line');
    codeLines.forEach((line, index) => {
        const width = parseFloat(getComputedStyle(line).width);
        line.style.width = '0';
        
        setTimeout(() => {
            line.animate(
                [
                    { width: '0' },
                    { width: width + 'px' }
                ],
                {
                    duration: 1500,
                    fill: 'forwards',
                    easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
                }
            );
        }, 500 + (index * 300));
    });
    
    // Animate device screen content
    const deviceContent = document.querySelector('.device-content');
    if (deviceContent) {
        // Create random "pixels" in the device
        for (let i = 0; i < 30; i++) {
            const pixel = document.createElement('div');
            pixel.className = 'pixel';
            pixel.style.position = 'absolute';
            pixel.style.width = '4px';
            pixel.style.height = '4px';
            pixel.style.backgroundColor = getRandomColor(0.5);
            pixel.style.top = Math.random() * 100 + '%';
            pixel.style.left = Math.random() * 100 + '%';
            pixel.style.borderRadius = '50%';
            pixel.style.boxShadow = '0 0 2px ' + getRandomColor(0.8);
            
            // Random blinking animation
            const animDuration = Math.random() * 4 + 1;
            pixel.style.animation = `blink ${animDuration}s infinite ${Math.random() * 2}s`;
            
            deviceContent.appendChild(pixel);
        }
    }
    
    // Animate circuit board paths
    const circuitPaths = document.querySelectorAll('.circuit-path');
    if (circuitPaths.length) {
        circuitPaths.forEach(path => {
            const length = path.offsetWidth || path.offsetHeight;
            
            // Create moving particles along paths
            for (let i = 0; i < 3; i++) {
                const particle = document.createElement('div');
                particle.className = 'circuit-particle';
                particle.style.position = 'absolute';
                particle.style.width = '3px';
                particle.style.height = '3px';
                particle.style.backgroundColor = 'var(--accent-cyan)';
                particle.style.borderRadius = '50%';
                particle.style.boxShadow = '0 0 5px var(--accent-cyan)';
                
                // Different position based on horizontal or vertical path
                if (path.offsetWidth > path.offsetHeight) {
                    // Horizontal path
                    particle.style.top = '50%';
                    particle.style.transform = 'translateY(-50%)';
                    particle.style.animation = `moveHorizontal ${Math.random() * 3 + 2}s linear infinite ${Math.random() * 2}s`;
                } else {
                    // Vertical path
                    particle.style.left = '50%';
                    particle.style.transform = 'translateX(-50%)';
                    particle.style.animation = `moveVertical ${Math.random() * 3 + 2}s linear infinite ${Math.random() * 2}s`;
                }
                
                path.appendChild(particle);
            }
        });
        
        // Add keyframes for particle movement
        const style = document.createElement('style');
        style.textContent = `
            @keyframes moveHorizontal {
                0% { left: 0; }
                100% { left: 100%; }
            }
            @keyframes moveVertical {
                0% { top: 0; }
                100% { top: 100%; }
            }
            @keyframes blink {
                0%, 100% { opacity: 0.3; }
                50% { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Helper for getting random colors
function getRandomColor(alpha = 1) {
    const hue = Math.floor(Math.random() * 360);
    return `hsla(${hue}, 70%, 60%, ${alpha})`;
}

// Simple scroll-based parallax effect
function scrollParallax() {
    const scrollY = window.scrollY || window.pageYOffset;
    
    // Apply scroll parallax to different elements
    const shapes = document.querySelectorAll('.shape');
    const threeElements = document.querySelectorAll('.cube, .pyramid, .sphere');
    const illustrations = document.querySelectorAll('.illustration');
    
    shapes.forEach((shape, index) => {
        const speed = 0.05 + (index * 0.01);
        shape.style.transform = `translateY(${scrollY * speed}px)`;
    });
    
    threeElements.forEach((element, index) => {
        const speed = 0.08 - (index * 0.02);
        const baseTransform = element.style.transform.replace(/translateY\([^)]+\)/, '');
        element.style.transform = `${baseTransform} translateY(${scrollY * speed}px)`;
    });
    
    illustrations.forEach((element, index) => {
        const speed = 0.06 + (index * 0.015);
        const direction = index % 2 === 0 ? 1 : -1;
        const baseTransform = element.style.transform.replace(/translateY\([^)]+\)/, '');
        element.style.transform = `${baseTransform} translateY(${scrollY * speed * direction}px)`;
    });
}

// Text typing animation
function typeText(element, text, speed = 50) {
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
} 