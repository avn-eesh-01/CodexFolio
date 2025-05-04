// API utility functions for authentication

// Base URL for API requests (change this based on your deployment)
const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Sign up a new user
 * @param {string} name - User's full name
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise} - Promise with the signup result
 */
async function signupUser(name, email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        
        return await response.json();
    } catch (error) {
        console.error('Signup error:', error);
        return { success: false, message: 'Network error. Please try again.' };
    }
}

/**
 * Log in an existing user
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise} - Promise with the login result
 */
async function loginUser(email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        return await response.json();
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'Network error. Please try again.' };
    }
}

/**
 * Save user session data
 * @param {Object} userData - User data to save
 */
function saveUserSession(userData) {
    localStorage.setItem('user', JSON.stringify(userData));
}

/**
 * Get current user session
 * @returns {Object|null} - User data or null if not logged in
 */
function getCurrentUser() {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
}

/**
 * Check if user is logged in
 * @returns {boolean} - True if user is logged in
 */
function isLoggedIn() {
    return !!getCurrentUser();
}

function logoutUser() {
    localStorage.removeItem('user');
    
} 