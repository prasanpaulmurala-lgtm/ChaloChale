// ChaloChale - Main JavaScript File

document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');
    const packageSearch = document.getElementById('packageSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    const durationFilter = document.getElementById('durationFilter');
    const budgetFilter = document.getElementById('budgetFilter');
    const ratingFilter = document.getElementById('ratingFilter');
    const resetFilters = document.getElementById('resetFilters');
    const packageCards = Array.from(document.querySelectorAll('article.package-card-enhanced'));
    const packageGridItems = packageCards.map(card => card.closest('.col-xl-3, .col-lg-4, .col-md-6'));
    const exploreButtons = document.querySelectorAll('.btn-explore-package');
    const newsletterForm = document.querySelector('.newsletter-form');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    function updateNavbarStyle() {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg');
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.classList.remove('shadow-lg');
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 1)';
        }
    }

    function smoothScrollTo(target) {
        if (!target) return;
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }

    function filterPackages() {
        const query = packageSearch ? packageSearch.value.trim().toLowerCase() : '';
        const category = categoryFilter ? categoryFilter.value : '';
        const duration = durationFilter ? durationFilter.value : '';
        const budget = budgetFilter ? budgetFilter.value : '';
        const rating = ratingFilter ? ratingFilter.value : '';

        packageCards.forEach((card, index) => {
            const title = card.dataset.title.toLowerCase();
            const location = card.dataset.location.toLowerCase();
            const cardCategory = card.dataset.category.toLowerCase();
            const cardDuration = card.dataset.duration.toLowerCase();
            const cardBudget = card.dataset.budget.toLowerCase();
            const cardRating = card.dataset.rating.toLowerCase();

            let visible = true;

            if (query && !(title.includes(query) || location.includes(query))) {
                visible = false;
            }
            if (category && cardCategory !== category) {
                visible = false;
            }
            if (duration && cardDuration !== duration) {
                visible = false;
            }
            if (budget && cardBudget !== budget) {
                visible = false;
            }
            if (rating && cardRating < rating) {
                visible = false;
            }

            const wrapper = packageGridItems[index];
            if (wrapper) {
                wrapper.style.display = visible ? '' : 'none';
            }
        });
    }

    function resetPackageFilters() {
        if (packageSearch) packageSearch.value = '';
        if (categoryFilter) categoryFilter.value = '';
        if (durationFilter) durationFilter.value = '';
        if (budgetFilter) budgetFilter.value = '';
        if (ratingFilter) ratingFilter.value = '';
        packageGridItems.forEach(item => {
            if (item) item.style.display = '';
        });
    }

    function toggleWishlist(button) {
        button.classList.toggle('active');
        const heart = button.querySelector('.fa-heart');
        if (!heart) return;
        if (button.classList.contains('active')) {
            heart.style.color = '#FF4757';
            heart.style.transform = 'scale(1.2)';
            setTimeout(() => { heart.style.transform = 'scale(1)'; }, 180);
        } else {
            heart.style.color = '#6B7280';
        }
    }

    function setupFadeInObserver() {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });

        document.querySelectorAll('.fade-in, .package-card-enhanced').forEach(el => {
            observer.observe(el);
        });
    }

    updateNavbarStyle();
    setupFadeInObserver();

    window.addEventListener('scroll', updateNavbarStyle);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                smoothScrollTo(target);
            }
        });
    });

    if (packageSearch) {
        packageSearch.addEventListener('input', filterPackages);
    }
    [categoryFilter, durationFilter, budgetFilter, ratingFilter].forEach(select => {
        if (select) select.addEventListener('change', filterPackages);
    });
    if (resetFilters) {
        resetFilters.addEventListener('click', function () {
            resetPackageFilters();
        });
    }

    document.querySelectorAll('.wishlist-btn-package').forEach(btn => {
        btn.addEventListener('click', function () {
            toggleWishlist(this);
        });
    });

    exploreButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const card = this.closest('article.package-card-enhanced');
            if (!card) return;
            const packageName = card.dataset.title || card.querySelector('.package-title')?.textContent;
            alert(`Exploring package: ${packageName}\nRedirecting to package details...`);
        });
    });

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput ? emailInput.value.trim() : '';
            if (email) {
                alert(`Thank you for subscribing! You will receive travel inspiration and exclusive deals at: ${email}`);
                this.reset();
            } else {
                alert('Please enter your email address');
            }
        });
    }

    if (navbarCollapse && navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                if (window.innerWidth < 992) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
                    bsCollapse.hide();
                }
            });
        });
    }

    console.log('ChaloChale: Packages page script loaded');
});
