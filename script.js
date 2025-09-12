// Mobile Navigation
        const hamburger = document.getElementById('hamburger');
        const nav = document.getElementById('nav');
        
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
            hamburger.innerHTML = nav.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        
        // Multi-page navigation
        const pageContents = document.querySelectorAll('.page-content');
        const navLinks = document.querySelectorAll('.nav-link');
        
        function showPage(pageId) {
            pageContents.forEach(page => {
                page.classList.remove('active');
            });
            
            document.getElementById(pageId).classList.add('active');
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-page') === pageId.replace('-page', '')) {
                    link.classList.add('active');
                }
            });
            
            // Scroll to top
            window.scrollTo(0, 0);
        }
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageId = link.getAttribute('data-page') + '-page';
                showPage(pageId);
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
        
        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Testimonial Slider
        const testimonialSlide = document.getElementById('testimonialSlide');
        const testimonialPrev = document.getElementById('testimonialPrev');
        const testimonialNext = document.getElementById('testimonialNext');
        let testimonialIndex = 0;
        
        function showTestimonial(index) {
            testimonialSlide.style.transform = `translateX(-${index * 100}%)`;
        }
        
        if (testimonialNext && testimonialPrev) {
            testimonialNext.addEventListener('click', () => {
                testimonialIndex = (testimonialIndex + 1) % 3;
                showTestimonial(testimonialIndex);
            });
            
            testimonialPrev.addEventListener('click', () => {
                testimonialIndex = (testimonialIndex - 1 + 3) % 3;
                showTestimonial(testimonialIndex);
            });
            
            // Auto slide testimonials
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
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        if (document.querySelector('.stats')) {
            observer.observe(document.querySelector('.stats'));
        }
        
        // Form Validation
        const quoteForm = document.getElementById('quoteForm');
        const contactForm = document.getElementById('contactForm');
        
        function handleFormSubmit(e, formType) {
            e.preventDefault();
            
            let name, phone, service, message;
            
            if (formType === 'quote') {
                name = document.getElementById('name').value;
                phone = document.getElementById('phone').value;
                service = document.getElementById('service').value;
                message = document.getElementById('message').value;
            } else {
                name = document.getElementById('contact-name').value;
                phone = document.getElementById('contact-phone').value;
                service = document.getElementById('contact-service').value;
                message = document.getElementById('contact-message').value;
            }
            
            if (name && phone && service && message) {
                alert('Thank you for your request, ' + name + '! We will contact you shortly at ' + phone + ' with your free quote for ' + service + ' service.');
                if (formType === 'quote') {
                    quoteForm.reset();
                } else {
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
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Update active state
                serviceLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
 // Mobile Navigation
        const hamburger = document.getElementById('hamburger');
        const nav = document.getElementById('nav');
        
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
            hamburger.innerHTML = nav.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        
        // Star Rating
        const stars = document.querySelectorAll('.star-rating i');
        const ratingInput = document.getElementById('rating-value');
        
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
                    if (s.getAttribute('data-rating') <= rating) {
                        s.style.color = '#F59E0B';
                    } else {
                        s.style.color = '#ddd';
                    }
                });
            });
            
            star.addEventListener('mouseout', () => {
                const currentRating = ratingInput.value;
                
                stars.forEach(s => {
                    if (s.getAttribute('data-rating') <= currentRating) {
                        s.style.color = '#F59E0B';
                    } else {
                        s.style.color = '#ddd';
                    }
                });
            });
        });
        
        // Image Upload
        const beforeUpload = document.getElementById('before-upload');
        const afterUpload = document.getElementById('after-upload');
        const beforeInput = document.getElementById('before-photo');
        const afterInput = document.getElementById('after-photo');
        
        beforeUpload.addEventListener('click', () => {
            beforeInput.click();
        });
        
        afterUpload.addEventListener('click', () => {
            afterInput.click();
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
        
        afterInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    afterUpload.innerHTML = `<img src="${event.target.result}" style="width: 100%; height: 100%; object-fit: cover;">`;
                }
                reader.readAsDataURL(e.target.files[0]);
            }
        });
        
        // Notification System
        function showNotification(message, type = 'success') {
            const notification = document.getElementById('notification');
            const notificationText = document.getElementById('notification-text');
            
            notificationText.textContent = message;
            notification.className = `notification ${type} show`;
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 5000);
        }
        
        // Form Submission with Backend Integration
        const reviewForm = document.getElementById('reviewForm');
        const submitBtn = document.getElementById('submit-btn');
        const submitText = document.getElementById('submit-text');
        const submitSpinner = document.getElementById('submit-spinner');
        
        reviewForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Simple validation
            const name = document.getElementById('reviewer-name').value;
            const email = document.getElementById('reviewer-email').value;
            const service = document.getElementById('review-service').value;
            const rating = document.getElementById('rating-value').value;
            const title = document.getElementById('review-title').value;
            const content = document.getElementById('review-content').value;
            
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
                formData.append('beforePhoto', beforeInput.files[0]);
                formData.append('afterPhoto', afterInput.files[0]);
                
                // Send to backend
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (response.ok && result.success) {
                    showNotification('Review submitted successfully! It will be published after approval.', 'success');
                    
                    // Reset form
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
                // Reset button state
                submitText.textContent = 'Submit Review';
                submitSpinner.style.display = 'none';
                submitBtn.disabled = false;
            }
        });
        
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
        
        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });