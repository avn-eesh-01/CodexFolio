document.addEventListener('DOMContentLoaded', function() {
    // Initialize background animations
    initBackgroundElements();
    
    // Add parallax effect on mouse move
    document.addEventListener('mousemove', function(e) {
        parallaxEffect(e);
    });
    
    // Setup form validations
    setupFormValidations();
    
    // Setup password visibility toggle
    setupPasswordToggles();
    
    // Setup form submissions
    setupFormSubmissions();
    
    // Add animations to 3D elements
    animate3DElements();
    
    // Add code typing effect
    animateCodeElements();
});

// Initialize background elements and animations
function initBackgroundElements() {
    // Add dynamic floating elements
    addDynamicShapes();
    
    // Add glow effects to elements
    document.querySelectorAll('.cube-face, .pyramid-face').forEach(face => {
        face.style.transition = 'box-shadow 0.5s ease, border-color 0.5s ease';
    });
}

// Add extra dynamic shapes to the background
function addDynamicShapes() {
    const shapesContainer = document.querySelector('.floating-shapes');
    const totalExtraShapes = 3; // Number of additional shapes to add
    
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
    const codeBlocks = document.querySelectorAll('.code-block');
    const cube = document.querySelector('.cube');
    const pyramid = document.querySelector('.pyramid');
    
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
}

// Setup form validations
function setupFormValidations() {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    
    // Setup password strength meter for signup
    if (signupForm) {
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirm-password');
        const strengthBar = document.querySelector('.strength-bar .bar');
        const strengthText = document.querySelector('.strength-text');
        
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            const strength = calculatePasswordStrength(password);
            
            // Update strength bar width
            strengthBar.style.width = `${strength}%`;
            
            // Update strength text
            if (strength < 33) {
                strengthText.textContent = 'Weak password';
                strengthText.style.color = '#ef4444';
                strengthBar.style.background = '#ef4444';
            } else if (strength < 66) {
                strengthText.textContent = 'Medium password';
                strengthText.style.color = '#f59e0b';
                strengthBar.style.background = '#f59e0b';
            } else {
                strengthText.textContent = 'Strong password';
                strengthText.style.color = '#10b981';
                strengthBar.style.background = '#10b981';
            }
        });
        
        // Check if passwords match
        confirmPasswordInput.addEventListener('input', function() {
            if (this.value && this.value !== passwordInput.value) {
                this.setCustomValidity('Passwords do not match');
            } else {
                this.setCustomValidity('');
            }
        });
    }
    
    // Validate email format on both forms
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('input', function() {
            const email = this.value;
            const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            
            if (!isValid && email) {
                this.setCustomValidity('Please enter a valid email address');
            } else {
                this.setCustomValidity('');
            }
        });
    });
}

// Calculate password strength score (0-100)
function calculatePasswordStrength(password) {
    if (!password) return 0;
    
    let score = 0;
    
    // Length
    score += Math.min(password.length * 4, 25);
    
    // Lowercase letters
    if (/[a-z]/.test(password)) score += 10;
    
    // Uppercase letters
    if (/[A-Z]/.test(password)) score += 15;
    
    // Numbers
    if (/[0-9]/.test(password)) score += 15;
    
    // Special characters
    if (/[^a-zA-Z0-9]/.test(password)) score += 20;
    
    // Variety of characters
    const uniqueChars = new Set(password.split('')).size;
    score += Math.min(uniqueChars * 2, 15);
    
    return Math.min(score, 100);
}

// Setup password visibility toggles
function setupPasswordToggles() {
    const toggleButtons = document.querySelectorAll('.toggle-password');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            
            // Toggle password visibility
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            } else {
                passwordInput.type = 'password';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            }
            
            // Focus back on the input
            passwordInput.focus();
        });
    });
}

// Setup form submissions
function setupFormSubmissions() {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    
    // Handle signup form submission
    if (signupForm) {
        signupForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.querySelector('.btn-content').innerHTML;
            
            submitButton.disabled = true;
            submitButton.querySelector('.btn-content').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            try {
                // Call API for signup
                const result = await signupUser(name, email, password);
                
                if (result.success) {
                    // Save user data and redirect
                    saveUserSession(result.user);
                    showSuccessMessage('Account created successfully!');
                    
                    // Redirect to dashboard after a delay
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 1500);
                } else {
                    // Show error message
                    showErrorMessage(result.message || 'Failed to create account. Please try again.');
                    
                    // Reset button
                    submitButton.disabled = false;
                    submitButton.querySelector('.btn-content').innerHTML = originalText;
                }
            } catch (error) {
                console.error('Error during signup:', error);
                showErrorMessage('An unexpected error occurred. Please try again.');
                
                // Reset button
                submitButton.disabled = false;
                submitButton.querySelector('.btn-content').innerHTML = originalText;
            }
        });
    }
    
    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.querySelector('.btn-content').innerHTML;
            
            submitButton.disabled = true;
            submitButton.querySelector('.btn-content').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            
            // Get form data
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            try {
                // Call API for login
                const result = await loginUser(email, password);
                
                if (result.success) {
                    // Save user data and redirect
                    saveUserSession(result.user);
                    showSuccessMessage('Login successful!');
                    
                    // Redirect to dashboard after a delay
                    setTimeout(() => {
                        window.location.href = 'hero.html';
                    }, 1500);
                } else {
                    // Show error message
                    showErrorMessage(result.message || 'Invalid email or password.');
                    
                    // Reset button
                    submitButton.disabled = false;
                    submitButton.querySelector('.btn-content').innerHTML = originalText;
                }
            } catch (error) {
                console.error('Error during login:', error);
                showErrorMessage('An unexpected error occurred. Please try again.');
                
                // Reset button
                submitButton.disabled = false;
                submitButton.querySelector('.btn-content').innerHTML = originalText;
            }
        });
    }
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.disabled) return;
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.position = 'absolute';
            ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            ripple.style.borderRadius = '50%';
            ripple.style.transformOrigin = 'center';
            ripple.style.pointerEvents = 'none';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.style.animation = 'ripple 0.6s ease-out forwards';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple keyframes if not already defined
    if (!document.querySelector('#ripple-keyframes')) {
        const style = document.createElement('style');
        style.id = 'ripple-keyframes';
        style.textContent = `
            @keyframes ripple {
                0% {
                    width: 0;
                    height: 0;
                    opacity: 0.5;
                }
                100% {
                    width: 200%;
                    height: 200%;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Animate 3D elements
function animate3DElements() {
    const cube = document.querySelector('.cube');
    const pyramid = document.querySelector('.pyramid');
    
    // Pulse effect for 3D elements
    setInterval(() => {
        if (cube) {
            const cubeFaces = cube.querySelectorAll('.cube-face');
            cubeFaces.forEach(face => {
                face.style.boxShadow = '0 0 20px rgba(76, 201, 240, 0.4) inset';
                face.style.borderColor = 'rgba(76, 201, 240, 0.8)';
                
                setTimeout(() => {
                    face.style.boxShadow = '0 0 10px rgba(76, 201, 240, 0.2) inset';
                    face.style.borderColor = 'rgba(76, 201, 240, 0.4)';
                }, 1000);
            });
        }
        
        if (pyramid) {
            const pyramidFaces = pyramid.querySelectorAll('.pyramid-face');
            pyramidFaces.forEach(face => {
                face.style.boxShadow = '0 0 20px rgba(247, 37, 133, 0.4) inset';
                face.style.borderColor = 'rgba(247, 37, 133, 0.8)';
                
                setTimeout(() => {
                    face.style.boxShadow = '0 0 10px rgba(247, 37, 133, 0.2) inset';
                    face.style.borderColor = 'rgba(247, 37, 133, 0.4)';
                }, 1000);
            });
        }
    }, 3000);
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

// Show success message
function showSuccessMessage(message) {
    // Create message element if it doesn't exist
    let messageElement = document.querySelector('.auth-message');
    
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.className = 'auth-message';
        const formContainer = document.querySelector('.form-container');
        formContainer.insertBefore(messageElement, formContainer.firstChild);
    }
    
    // Set message content and style
    messageElement.textContent = message;
    messageElement.className = 'auth-message success';
    
    // Automatically remove after 5 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
}

// Show error message
function showErrorMessage(message) {
    // Create message element if it doesn't exist
    let messageElement = document.querySelector('.auth-message');
    
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.className = 'auth-message';
        const formContainer = document.querySelector('.form-container');
        formContainer.insertBefore(messageElement, formContainer.firstChild);
    }
    
    // Set message content and style
    messageElement.textContent = message;
    messageElement.className = 'auth-message error';
    
    // Automatically remove after 5 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
} 