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
 