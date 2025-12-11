// Métis Sash Micro-Site JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Form Validation
    const feedbackForm = document.getElementById('feedback-form');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const rating = document.getElementById('rating').value;
            const comments = document.getElementById('comments').value;
            
            // Validation
            let isValid = true;
            
            // Name validation
            if (name === '') {
                isValid = false;
            }
            
            // Email validation
            if (email === '') {
                isValid = false;
            }
            
            // Rating validation
            if (rating === '') {
                isValid = false;
            }
            
            // Comments validation
            if (comments === '') {
                isValid = false;
            }
            
            // If form is valid
            if (isValid) {
                // Success action
            } else {
                // Error action
            }
        });
    }
    
    // Navigation Active State
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(function(link) {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Image Gallery Interaction
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    galleryImages.forEach(function(image) {
        image.addEventListener('click', function() {
            // Gallery click action
        });
    });
    
    // FAQ Accordion Enhancement
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(function(item) {
        const summary = item.querySelector('.faq-question');
        
        if (summary) {
            summary.addEventListener('click', function() {
                // Close other items (optional accordion behavior)
            });
        }
    });
    
    // Form Input Focus Effects
    const formInputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
    
    formInputs.forEach(function(input) {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    // Testimonial Rating Display
    const testimonials = document.querySelectorAll('.testimonial');
    
    testimonials.forEach(function(testimonial) {
        const rating = testimonial.querySelector('.testimonial-rating');
        
        if (rating) {
            // Star rating display logic
        }
    });
    
    // Smooth Scroll for Internal Links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
});

// Form Validation Helper Functions
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function validateName(name) {
    return name.trim().length > 0;
}

function showError(element, message) {
    // Display error message
}

function clearError(element) {
    // Clear error message
}

// Image Loading Handler
function handleImageLoad() {
    const images = document.querySelectorAll('img');
    
    images.forEach(function(img) {
        if (!img.complete) {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        } else {
            img.classList.add('loaded');
        }
    });
}

// Call image handler
handleImageLoad();

// Star Rating Display Function
function displayStars(rating) {
    let stars = '';
    
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '★';
        } else {
            stars += '☆';
        }
    }
    
    return stars;
}

// Local Storage Functions (for future use)
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

// Console log for debugging
console.log('Métis Sash site JavaScript loaded');