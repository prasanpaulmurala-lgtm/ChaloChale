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
    const sections = document.querySelectorAll('section:not(.hero-section)');
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

    // Package Wishlist Button Toggle
    document.querySelectorAll('.wishlist-btn-package').forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const heart = this.querySelector('.fa-heart');
            if (this.classList.contains('active')) {
                heart.style.color = '#FF4757';
                // Add animation
                heart.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    heart.style.transform = 'scale(1)';
                }, 200);
            } else {
                heart.style.color = '#6B7280';
            }
        });
    });

    // Package Explore Button Click
    document.querySelectorAll('.btn-explore-package').forEach(btn => {
        btn.addEventListener('click', function() {
            const card = this.closest('.package-card-enhanced');
            const packageName = card.querySelector('.package-title').textContent;
            alert(`Exploring package: ${packageName}\nRedirecting to package details...`);
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

    // Newsletter Form Submission (Homepage)
    const homeNewsletterForm = document.querySelector('section:not(.newsletter-section) form');
    if (homeNewsletterForm && homeNewsletterForm.querySelector('input[type="email"]')) {
        homeNewsletterForm.addEventListener('submit', function(e) {
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
        
        // Trigger hero animations
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.opacity = '1';
        }
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

    // Remove parallax effect - using zoom animation instead

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

    // Destinations Page Specific Functionality
    if (window.location.pathname.includes('destination.html') || window.location.pathname.includes('destinations')) {
        
        // Filter Panel Functionality
        const filterPanel = document.querySelector('.filter-panel');
        if (filterPanel) {
            const searchInput = document.getElementById('destinationSearch');
            const categorySelect = document.getElementById('categoryFilter');
            const priceSelect = document.getElementById('priceFilter');
            const ratingSelect = document.getElementById('ratingFilter');
            const durationSelect = document.getElementById('durationFilter');
            const resetButton = document.getElementById('resetFilters');
            
            // Filter destinations based on search
            if (searchInput) {
                searchInput.addEventListener('input', function() {
                    filterDestinations();
                });
            }
            
            // Filter on dropdown change
            [categorySelect, priceSelect, ratingSelect, durationSelect].forEach(select => {
                if (select) {
                    select.addEventListener('change', function() {
                        filterDestinations();
                    });
                }
            });
            
            // Reset filters
            if (resetButton) {
                resetButton.addEventListener('click', function() {
                    if (searchInput) searchInput.value = '';
                    if (categorySelect) categorySelect.value = '';
                    if (priceSelect) priceSelect.value = '';
                    if (ratingSelect) ratingSelect.value = '';
                    if (durationSelect) durationSelect.value = '';
                    
                    // Show all cards
                    document.querySelectorAll('.destination-card-enhanced').forEach(card => {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease forwards';
                    });
                });
            }
            
            function filterDestinations() {
                const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
                const category = categorySelect ? categorySelect.value : '';
                const price = priceSelect ? priceSelect.value : '';
                const rating = ratingSelect ? ratingSelect.value : '';
                const duration = durationSelect ? durationSelect.value : '';
                
                document.querySelectorAll('.destination-card-enhanced').forEach(card => {
                    const title = card.querySelector('h5').textContent.toLowerCase();
                    const description = card.querySelector('p').textContent.toLowerCase();
                    const cardPrice = card.querySelector('.text-primary.fw-bold').textContent;
                    const cardRating = card.querySelector('.badge .fa-star').parentElement.textContent.trim();
                    const cardDuration = card.querySelector('.fa-clock').parentElement.textContent.trim();
                    
                    let showCard = true;
                    
                    // Search filter
                    if (searchTerm && !title.includes(searchTerm) && !description.includes(searchTerm)) {
                        showCard = false;
                    }
                    
                    // Category filter (based on badge text)
                    if (category) {
                        const categoryBadge = card.querySelector('.gradient-overlay .badge');
                        if (categoryBadge) {
                            const cardCategory = categoryBadge.textContent.toLowerCase();
                            if (!cardCategory.includes(category.toLowerCase())) {
                                showCard = false;
                            }
                        }
                    }
                    
                    // Price filter
                    if (price) {
                        const priceValue = parseInt(cardPrice.replace(/[^0-9]/g, ''));
                        if (price === 'budget' && priceValue > 500) showCard = false;
                        if (price === 'mid' && (priceValue < 500 || priceValue > 1500)) showCard = false;
                        if (price === 'luxury' && priceValue < 1500) showCard = false;
                    }
                    
                    // Rating filter
                    if (rating) {
                        const ratingValue = parseFloat(cardRating);
                        if (rating === '5' && ratingValue < 5) showCard = false;
                        if (rating === '4' && ratingValue < 4) showCard = false;
                        if (rating === '3' && ratingValue < 3) showCard = false;
                    }
                    
                    // Duration filter
                    if (duration) {
                        if (duration === 'short' && !cardDuration.includes('1-3') && !cardDuration.includes('2-3')) showCard = false;
                        if (duration === 'medium' && !cardDuration.includes('4-7') && !cardDuration.includes('3-5')) showCard = false;
                        if (duration === 'long' && !cardDuration.includes('8+') && !cardDuration.includes('5-7')) showCard = false;
                    }
                    
                    if (showCard) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        }
        
        // Destination Card Click
        document.querySelectorAll('.destination-card-enhanced').forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', function(e) {
                if (!e.target.closest('button')) {
                    const destination = this.querySelector('h5').textContent;
                    alert(`Exploring destination: ${destination}\nRedirecting to destination details...`);
                }
            });
        });
        
        // Explore Packages Button Click
        document.querySelectorAll('.destination-card-enhanced .btn-primary').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const card = this.closest('.destination-card-enhanced');
                const destination = card.querySelector('h5').textContent;
                alert(`Exploring packages for: ${destination}\nRedirecting to package details...`);
            });
        });
        
        // Load More Button
        const loadMoreBtn = document.querySelector('.destinations-grid .btn-outline-primary');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', function() {
                this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Loading...';
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-check me-2"></i>All Destinations Loaded';
                    this.disabled = true;
                    setTimeout(() => {
                        this.innerHTML = '<i class="fas fa-plus me-2"></i>Load More Destinations';
                        this.disabled = false;
                    }, 2000);
                }, 1500);
            });
        }
        
        // Newsletter Form (Destinations page)
        const destinationsNewsletterForm = document.querySelector('.newsletter-content form');
        if (destinationsNewsletterForm) {
            destinationsNewsletterForm.addEventListener('submit', function(e) {
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
    }

    console.log('ChaloChale - Travel Website Loaded Successfully');
});

document.addEventListener('DOMContentLoaded', function() {
            // Wishlist functionality
            document.querySelectorAll('.wishlist-btn-package').forEach(btn => {
                btn.addEventListener('click', function() {
                    this.classList.toggle('active');
                    const heart = this.querySelector('.fa-heart');
                    if (this.classList.contains('active')) {
                        heart.style.color = '#FF4757';
                    } else {
                        heart.style.color = '#6B7280';
                    }
                });
            });

            // Filter functionality
            const resetFilters = document.getElementById('resetFilters');
            if (resetFilters) {
                resetFilters.addEventListener('click', function() {
                    document.getElementById('packageSearch').value = '';
                    document.getElementById('categoryFilter').value = '';
                    document.getElementById('durationFilter').value = '';
                    document.getElementById('budgetFilter').value = '';
                    document.getElementById('ratingFilter').value = '';
                    
                    // Show all packages
                    document.querySelectorAll('.package-card-wrapper').forEach(card => {
                        card.style.display = 'block';
                    });
                });
            }

            // Package explore button
            document.querySelectorAll('.btn-explore-package').forEach(btn => {
                btn.addEventListener('click', function() {
                    const card = this.closest('.package-card-enhanced');
                    const packageName = card.querySelector('.package-title').textContent;
                    alert(`Exploring package: ${packageName}\nRedirecting to package details...`);
                });
            });

            // Newsletter form
            const newsletterForm = document.querySelector('.newsletter-section-packages form');
            if (newsletterForm) {
                newsletterForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const email = this.querySelector('input[type="email"]').value;
                    if (email) {
                        alert('Thank you for subscribing! You will receive travel inspiration and exclusive deals at: ' + email);
                        this.reset();
                    }
                });
            }
        });