// Mobile Navigation
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
        hamburger.innerHTML = nav.classList.contains('active') ?
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
}

// Header scroll effect (only once)
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Testimonial Slider
const testimonialSlide = document.getElementById('testimonialSlide');
const testimonialPrev = document.getElementById('testimonialPrev');
const testimonialNext = document.getElementById('testimonialNext');
let testimonialIndex = 0;

function showTestimonial(index) {
    if (testimonialSlide) {
        testimonialSlide.style.transform = `translateX(-${index * 100}%)`;
    }
}

if (testimonialNext && testimonialPrev && testimonialSlide) {
    testimonialNext.addEventListener('click', () => {
        testimonialIndex = (testimonialIndex + 1) % 3;
        showTestimonial(testimonialIndex);
    });

    testimonialPrev.addEventListener('click', () => {
        testimonialIndex = (testimonialIndex - 1 + 3) % 3;
        showTestimonial(testimonialIndex);
    });

    setInterval(() => {
        testimonialIndex = (testimonialIndex + 1) % 3;
        showTestimonial(testimonialIndex);
    }, 5000);
}

// Animated Counter for Stats
const counters = document.querySelectorAll('.stat-number');
const speed = 200;

function animateCounters() {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = Math.ceil(target / speed);

        if (count < target) {
            counter.innerText = Math.min(count + increment, target);
            setTimeout(animateCounters, 1);
        }
    });
}

// Start counter animation when stats section is in view
const statsSection = document.querySelector('.stats');
if (statsSection && counters.length > 0) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    observer.observe(statsSection);
}

// Form Validation
const quoteForm = document.getElementById('quoteForm');
const contactForm = document.getElementById('contactForm');

function handleFormSubmit(e, formType) {
    e.preventDefault();

    let name, phone, service, message;

    if (formType === 'quote') {
        name = document.getElementById('name')?.value;
        phone = document.getElementById('phone')?.value;
        service = document.getElementById('service')?.value;
        message = document.getElementById('message')?.value;
    } else {
        name = document.getElementById('contact-name')?.value;
        phone = document.getElementById('contact-phone')?.value;
        service = document.getElementById('contact-service')?.value;
        message = document.getElementById('contact-message')?.value;
    }

    if (name && phone && service && message) {
        alert(`Thank you for your request, ${name}! We will contact you shortly at ${phone} with your free quote for ${service} service.`);
        if (formType === 'quote' && quoteForm) {
            quoteForm.reset();
        } else if (contactForm) {
            contactForm.reset();
        }
    } else {
        alert('Please fill in all required fields.');
    }
}

if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => handleFormSubmit(e, 'quote'));
}
if (contactForm) {
    contactForm.addEventListener('submit', (e) => handleFormSubmit(e, 'contact'));
}

// Service page navigation
const serviceLinks = document.querySelectorAll('.service-nav-link');
serviceLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
        serviceLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Star Rating
const stars = document.querySelectorAll('.star-rating i');
const ratingInput = document.getElementById('rating-value');
if (stars.length > 0 && ratingInput) {
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = star.getAttribute('data-rating');
            ratingInput.value = rating;
            stars.forEach(s => {
                if (s.getAttribute('data-rating') <= rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });

        star.addEventListener('mouseover', () => {
            const rating = star.getAttribute('data-rating');
            stars.forEach(s => {
                s.style.color = (s.getAttribute('data-rating') <= rating) ? '#F59E0B' : '#ddd';
            });
        });

        star.addEventListener('mouseout', () => {
            const currentRating = ratingInput.value;
            stars.forEach(s => {
                s.style.color = (s.getAttribute('data-rating') <= currentRating) ? '#F59E0B' : '#ddd';
            });
        });
    });
}

// Image Upload
const beforeUpload = document.getElementById('before-upload');
const afterUpload = document.getElementById('after-upload');
const beforeInput = document.getElementById('before-photo');
const afterInput = document.getElementById('after-photo');

if (beforeUpload && beforeInput) {
    beforeUpload.addEventListener('click', () => {
        beforeInput.click();
    });
    beforeInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function(event) {
                beforeUpload.innerHTML = `<img src="${event.target.result}" style="width: 100%; height: 100%; object-fit: cover;">`;
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    });
}
if (afterUpload && afterInput) {
    afterUpload.addEventListener('click', () => {
        afterInput.click();
    });
    afterInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function(event) {
                afterUpload.innerHTML = `<img src="${event.target.result}" style="width: 100%; height: 100%; object-fit: cover;">`;
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    });
}

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');
    if (notification && notificationText) {
        notificationText.textContent = message;
        notification.className = `notification ${type} show`;
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }
}

// Review Form Submission with file validation
const reviewForm = document.getElementById('reviewForm');
const submitBtn = document.getElementById('submit-btn');
const submitText = document.getElementById('submit-text');
const submitSpinner = document.getElementById('submit-spinner');

function isValidImage(file) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    return allowedTypes.includes(file.type) && file.size <= 10 * 1024 * 1024; // 10MB
}

if (reviewForm && submitBtn && submitText && submitSpinner && beforeInput && afterInput && stars.length > 0 && ratingInput) {
    reviewForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Simple validation
        const name = document.getElementById('reviewer-name')?.value;
        const email = document.getElementById('reviewer-email')?.value;
        const service = document.getElementById('review-service')?.value;
        const rating = ratingInput.value;
        const title = document.getElementById('review-title')?.value;
        const content = document.getElementById('review-content')?.value;

        // File validation
        const beforeFile = beforeInput.files[0];
        const afterFile = afterInput.files[0];

        if (beforeFile && !isValidImage(beforeFile)) {
            showNotification('Before photo must be an image and less than 10MB.', 'error');
            return;
        }
        if (afterFile && !isValidImage(afterFile)) {
            showNotification('After photo must be an image and less than 10MB.', 'error');
            return;
        }

        if (!name || !email || !service || rating == 0 || !title || !content) {
            showNotification('Please fill in all required fields and provide a rating.', 'error');
            return;
        }
        // Show loading state
        submitText.textContent = 'Submitting...';
        submitSpinner.style.display = 'inline-block';
        submitBtn.disabled = true;

        try {
            // Create form data
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('service', service);
            formData.append('rating', rating);
            formData.append('title', title);
            formData.append('content', content);
            if (beforeFile) formData.append('beforePhoto', beforeFile);
            if (afterFile) formData.append('afterPhoto', afterFile);

             // Send to backend (email submission)
            // Replace with your email service endpoint
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.ok && result.success) {
                showNotification('Review submitted successfully! It will be published after approval.', 'success');
                reviewForm.reset();
                stars.forEach(star => {
                    star.classList.remove('active');
                    star.style.color = '#ddd';
                });
                ratingInput.value = '0';
                beforeUpload.innerHTML = '<i class="fas fa-camera"></i><span>Before Photo</span>';
                afterUpload.innerHTML = '<i class="fas fa-camera"></i><span>After Photo</span>';
            } else {
                throw new Error(result.message || 'Failed to submit review');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            showNotification('Failed to submit review. Please try again later.', 'error');
        } finally {
            submitText.textContent = 'Submit Review';
            submitSpinner.style.display = 'none';
            submitBtn.disabled = false;
        }
    });
}

// Helpful button functionality
const helpfulButtons = document.querySelectorAll('.helpful-btn');
helpfulButtons.forEach(button => {
    button.addEventListener('click', () => {
        const countElement = button.querySelector('span');
        let count = parseInt(countElement.textContent.match(/\d+/)[0]);
        count++;
        countElement.textContent = `Helpful (${count})`;
        button.style.color = '#10B981';
        button.innerHTML = `<i class="fas fa-thumbs-up"></i> <span>Helpful (${count})</span>`;
    });
});