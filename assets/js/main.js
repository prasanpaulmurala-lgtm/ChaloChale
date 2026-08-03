// ChaloChale - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar Background Change on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg');
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.classList.remove('shadow-lg');
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 1)';
        }
    });

    // Section Fade-in Animation on Scroll
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Wishlist Button Toggle
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const heart = this.querySelector('.fa-heart');
            if (heart.classList.contains('far')) {
                heart.classList.remove('far');
                heart.classList.add('fas');
                heart.style.color = '#FF4757';
                // Add animation
                heart.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    heart.style.transform = 'scale(1)';
                }, 200);
            } else {
                heart.classList.remove('fas');
                heart.classList.add('far');
                heart.style.color = '';
            }
        });
    });

    // Search Form Submission
    const searchForm = document.querySelector('.search-box form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const destination = this.querySelector('input[type="text"]').value;
            const date = this.querySelector('input[type="date"]').value;
            const travelers = this.querySelector('select').value;

            if (destination) {
                alert(`Searching for: ${destination}\nDate: ${date || 'Not specified'}\nTravelers: ${travelers}`);
            } else {
                alert('Please enter a destination');
            }
        });
    }

    // Newsletter Form Submission
    const newsletterForm = document.querySelector('section form');
    if (newsletterForm && newsletterForm.querySelector('input[type="email"]')) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                alert('Thank you for subscribing! You will receive travel inspiration and exclusive deals at: ' + email);
                this.reset();
            } else {
                alert('Please enter your email address');
            }
        });
    }

    // Package Card Button Click
    document.querySelectorAll('.package-card .btn-primary').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.package-card');
            const packageName = card.querySelector('h5').textContent;
            alert(`Exploring package: ${packageName}\nRedirecting to package details...`);
        });
    });

    // Destination Card Click
    document.querySelectorAll('.destination-card').forEach(card => {
        card.addEventListener('click', function() {
            const destination = this.querySelector('h5').textContent;
            alert(`Exploring destination: ${destination}\nRedirecting to destination details...`);
        });
        card.style.cursor = 'pointer';
    });

    // Testimonial Carousel Auto-play
    const testimonialCarousel = document.getElementById('testimonialCarousel');
    if (testimonialCarousel) {
        const carousel = new bootstrap.Carousel(testimonialCarousel, {
            interval: 5000,
            wrap: true
        });
    }

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });

    // Counter Animation for Statistics (if added later)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }

    // Parallax Effect for Hero Section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-section');
        if (hero) {
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });

    // Mobile Menu Close on Link Click
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                navbarCollapse.classList.remove('show');
            }
        });
    });

    // Add active state to nav links based on scroll position
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Image Lazy Loading (for performance)
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    console.log('ChaloChale - Travel Website Loaded Successfully');
});
