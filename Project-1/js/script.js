// Métis Sash Micro-Site JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Form Validation
    const feedbackForm = document.getElementById('feedback-form');
    
    // Clear all previous errors
    clearAllErrors();

    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const ratingSelect = document.getElementById('rating');
            const commentsTextarea = document.getElementById('comments');
            
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const rating = ratingSelect.value;
            const comments = commentsTextarea.value.trim();

            // Validation
            let isValid = true;
            
            // Name validation
            if (!validateName(name)) {
                showError(nameInput, 'Please enter your name.');
                isValid = false;
            }
            
            // Email validation
            if (!validateEmail(email)) {
                showError(emailInput, 'Please enter a valid address.');
                isValid = false;
            }
            
            // Rating validation
            if (rating === '') {
                showError(ratingSelect, 'Please select a rating.');
                isValid = false;
            }
            
            // Comments validation
            if (comments === '') {
                showError(commentsTextarea, 'Please share your testimonial.');
                isValid = false;
            } else if (comments.length < 10) {
                showError(commentsTextarea, 'Please provide at least 10 characters.');
                isValid = false;
            }
            
            // If form is valid, show success
            if (isValid) {
                showSuccessMessage(name, rating);
                
                // Save to localStorage
                saveTestimonial({
                    name: name,
                    email: email,
                    rating: rating,
                    comments: comments,
                    date: new Date().toISOString()
                });
                
                // Reset form after 3 seconds
                setTimeout(function() {
                    feedbackForm.reset();
                    hideSuccessMessage();
                }, 3000);
            }
        });
        
        // Real-time validation on input
        const formInputs = feedbackForm.querySelectorAll('.form-input, .form-select, .form-textarea');
        formInputs.forEach(function(input) {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearError(this);
            });
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
    
    const ratingSelect = document.getElementById('rating');
    
    if (ratingSelect) {
        // Create star rating display
        const starContainer = document.createElement('div');
        starContainer.className = 'star-rating-display';
        starContainer.innerHTML = `
            <div class="stars">
                <span class="star" data-rating="1">☆</span>
                <span class="star" data-rating="2">☆</span>
                <span class="star" data-rating="3">☆</span>
                <span class="star" data-rating="4">☆</span>
                <span class="star" data-rating="5">☆</span>
            </div>
            <span class="rating-text">Click a star to rate</span>
        `;
        
        // Insert after the select element
        ratingSelect.parentElement.appendChild(starContainer);
        
        // Hide the select visually but keep it for form submission
        ratingSelect.style.display = 'none';
        
        // Add click handlers to stars
        const stars = starContainer.querySelectorAll('.star');
        const ratingText = starContainer.querySelector('.rating-text');
        
        stars.forEach(function(star) {
            star.addEventListener('click', function() {
                const ratingValue = this.dataset.rating;
                ratingSelect.value = ratingValue;
                updateStarDisplay(stars, ratingValue);
                updateRatingText(ratingText, ratingValue);
                clearError(ratingSelect);
            });
            
            star.addEventListener('mouseenter', function() {
                const ratingValue = this.dataset.rating;
                highlightStars(stars, ratingValue);
            });
        });
        
        starContainer.addEventListener('mouseleave', function() {
            const currentRating = ratingSelect.value;
            updateStarDisplay(stars, currentRating);
        });
    }
    
    // Image Gallery Modal
    
    // Create modal structure
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <img src="" alt="" class="modal-image">
            <div class="modal-caption"></div>
            <div class="modal-controls">
                <button class="modal-prev">‹ Previous</button>
                <button class="modal-next">Next ›</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Get all gallery images
    const galleryImages = document.querySelectorAll('.gallery-image, .hero-image, .feature-image');
    let currentImageIndex = 0;
    let imageArray = Array.from(galleryImages);
    
    // Add click handlers to gallery images
    galleryImages.forEach(function(image, index) {
        image.style.cursor = 'pointer';
        image.addEventListener('click', function() {
            currentImageIndex = index;
            openModal(this);
        });
    });
    
    // Modal controls
    const modalClose = modal.querySelector('.modal-close');
    const modalOverlay = modal.querySelector('.modal-overlay');
    const modalPrev = modal.querySelector('.modal-prev');
    const modalNext = modal.querySelector('.modal-next');
    const modalImage = modal.querySelector('.modal-image');
    const modalCaption = modal.querySelector('.modal-caption');
    
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    modalPrev.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + imageArray.length) % imageArray.length;
        updateModalImage();
    });
    
    modalNext.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % imageArray.length;
        updateModalImage();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (modal.classList.contains('active')) {
            if (event.key === 'Escape') {
                closeModal();
            } else if (event.key === 'ArrowLeft') {
                modalPrev.click();
            } else if (event.key === 'ArrowRight') {
                modalNext.click();
            }
        }
    });
    
    function openModal(image) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateModalImage();
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function updateModalImage() {
        const currentImage = imageArray[currentImageIndex];
        modalImage.src = currentImage.src;
        modalImage.alt = currentImage.alt;
        modalCaption.textContent = currentImage.alt;
    }
    
    // Navigation Active State
    
    const activePage = window.location.pathname.split('/').pop() || 'index.html';
    const navigationLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(function(link) {
        const linkPage = link.getAttribute('href');
        if (linkPage === activePage) {
            link.classList.add('active');
        }
    });
    
    // Faq Accordion Enhancement
    
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(function(item) {
        item.addEventListener('toggle', function() {
            if (this.open) {
                // Close other FAQ items (optional single-open behavior)
                faqItems.forEach(function(otherItem) {
                    if (otherItem !== item && otherItem.open) {
                        otherItem.open = false;
                    }
                });
            }
        });
    });
    
    // Form Inputs Focus Effects
    
    const formInputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
    
    formInputs.forEach(function(input) {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
    
    // Smooth Scroll For Interal Links
    
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Image Loading Handler
    
    const allImages = document.querySelectorAll('img');
    
    allImages.forEach(function(img) {
        if (!img.complete) {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
            img.addEventListener('error', function() {
                this.classList.add('error');
                this.alt = 'Image failed to load';
            });
        } else {
            img.classList.add('loaded');
        }
    });
    
});

// Helper Functions

// Form Validation Functions
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function validateName(name) {
    return name.trim().length > 0;
}

function validateField(field) {
    const value = field.value.trim();
    
    if (field.id === 'name') {
        if (!validateName(value)) {
            showError(field, 'Please enter your name.');
            return false;
        }
    } else if (field.id === 'email') {
        if (!validateEmail(value)) {
            showError(field, 'Please enter a valid address.');
            return false;
        }
    } else if (field.id === 'rating') {
        if (value === '') {
            showError(field, 'Please select a rating.');
            return false;
        }
    } else if (field.id === 'comments') {
        if (value === '') {
            showError(field, 'Please share your testimonial.');
            return false;
        } else if (value.length < 10) {
            showError(field, 'Please provide at least 10 characters.');
            return false;
        }
    }
    
    clearError(field);
    return true;
}

function showError(element, message) {
    const formGroup = element.closest('.form-group');
    
    // Remove existing error if present
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create and add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);
    
    // Add error class to input
    element.classList.add('error');
    
    // Scroll to first error
    const firstError = document.querySelector('.error-message');
    if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function clearError(element) {
    const formGroup = element.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');
    
    if (errorMessage) {
        errorMessage.remove();
    }
    
    element.classList.remove('error');
}

function clearAllErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function(error) {
        error.remove();
    });
    
    const errorInputs = document.querySelectorAll('.error');
    errorInputs.forEach(function(input) {
        input.classList.remove('error');
    });
}

// Success Message Functions
function showSuccessMessage(name, rating) {
    const form = document.getElementById('feedback-form');
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="success-content">
            <span class="success-icon">✓</span>
            <h3>Thank You, ${name}!</h3>
            <p>Your ${rating}-star testimonial has been received.</p>
            <p>We greatly appreciate your patronage and feedback.</p>
        </div>
    `;
    
    form.parentElement.insertBefore(successDiv, form);
    
    // Animate in
    setTimeout(function() {
        successDiv.classList.add('show');
    }, 10);
}

function hideSuccessMessage() {
    const successMessage = document.querySelector('.success-message');
    if (successMessage) {
        successMessage.classList.remove('show');
        setTimeout(function() {
            successMessage.remove();
        }, 300);
    }
}

// Star Rating Functions
function updateStarDisplay(stars, rating) {
    stars.forEach(function(star) {
        const starValue = parseInt(star.dataset.rating);
        if (starValue <= rating) {
            star.textContent = '★';
            star.classList.add('filled');
        } else {
            star.textContent = '☆';
            star.classList.remove('filled');
        }
    });
}

function highlightStars(stars, rating) {
    stars.forEach(function(star) {
        const starValue = parseInt(star.dataset.rating);
        if (starValue <= rating) {
            star.textContent = '★';
            star.classList.add('highlight');
        } else {
            star.textContent = '☆';
            star.classList.remove('highlight');
        }
    });
}

function updateRatingText(textElement, rating) {
    const ratingTexts = {
        '1': 'Poor',
        '2': 'Fair',
        '3': 'Good',
        '4': 'Very Good',
        '5': 'Excellent'
    };
    textElement.textContent = `${rating} Star${rating > 1 ? 's' : ''} - ${ratingTexts[rating]}`;
}

// Local Storage Functions
function saveTestimonial(testimonialData) {
    let testimonials = getFromLocalStorage('testimonials') || [];
    testimonials.push(testimonialData);
    saveToLocalStorage('testimonials', testimonials);
    console.log('Testimonial saved:', testimonialData);
}

function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error('Error saving to localStorage:', e);
    }
}

function getFromLocalStorage(key) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (e) {
        console.error('Error reading from localStorage:', e);
        return null;
    }
}

// Console log for debugging
console.log('Métis Sash site JavaScript loaded successfully');
console.log('Features active: Form Validation, Star Rating, Image Gallery Modal');