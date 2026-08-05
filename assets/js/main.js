// ChaloChale - Main JavaScript File

document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.nav-link');

    const packageSearch = document.getElementById('packageSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    const durationFilter = document.getElementById('durationFilter');
    const budgetFilter = document.getElementById('budgetFilter');
    const ratingFilter = document.getElementById('ratingFilter');
    const resetFilters = document.getElementById('resetFilters');
    const packageCards = Array.from(document.querySelectorAll('article.package-card-enhanced'));

    const destinationSearch = document.getElementById('destinationSearch');
    const destCategoryFilter = document.getElementById('categoryFilter');
    const destPriceFilter = document.getElementById('priceFilter');
    const destRatingFilter = document.getElementById('ratingFilter');
    const destDurationFilter = document.getElementById('durationFilter');
    const destinationCards = Array.from(document.querySelectorAll('.destination-card-enhanced'));

    const contactForm = document.querySelector('#contact-enquiry-form');

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
        if (!packageCards.length) return;

        const query = packageSearch ? packageSearch.value.trim().toLowerCase() : '';
        const category = categoryFilter ? categoryFilter.value : '';
        const duration = durationFilter ? durationFilter.value : '';
        const budget = budgetFilter ? budgetFilter.value : '';
        const rating = ratingFilter ? ratingFilter.value : '';

        packageCards.forEach(card => {
            const title = card.dataset.title.toLowerCase();
            const location = card.dataset.location.toLowerCase();
            const cardCategory = card.dataset.category.toLowerCase();
            const cardDuration = card.dataset.duration.toLowerCase();
            const cardBudget = card.dataset.budget.toLowerCase();
            const cardRating = card.dataset.rating.toLowerCase();
            let visible = true;

            if (query && !(title.includes(query) || location.includes(query))) visible = false;
            if (category && cardCategory !== category) visible = false;
            if (duration && cardDuration !== duration) visible = false;
            if (budget && cardBudget !== budget) visible = false;
            if (rating && cardRating < rating) visible = false;

            const wrapper = card.closest('.col-12, .col-md-6, .col-lg-4, .col-xl-3');
            if (wrapper) wrapper.style.display = visible ? '' : 'none';
        });
    }

    function resetPackageFilters() {
        if (packageSearch) packageSearch.value = '';
        if (categoryFilter) categoryFilter.value = '';
        if (durationFilter) durationFilter.value = '';
        if (budgetFilter) budgetFilter.value = '';
        if (ratingFilter) ratingFilter.value = '';
        packageCards.forEach(card => {
            const wrapper = card.closest('.col-12, .col-md-6, .col-lg-4, .col-xl-3');
            if (wrapper) wrapper.style.display = '';
        });
    }

    function filterDestinations() {
        if (!destinationCards.length) return;

        const query = destinationSearch ? destinationSearch.value.trim().toLowerCase() : '';
        const category = destCategoryFilter ? destCategoryFilter.value : '';
        const price = destPriceFilter ? destPriceFilter.value : '';
        const rating = destRatingFilter ? destRatingFilter.value : '';
        const duration = destDurationFilter ? destDurationFilter.value : '';

        destinationCards.forEach(card => {
            const title = card.dataset.title.toLowerCase();
            const categoryValue = card.dataset.category.toLowerCase();
            const priceValue = card.dataset.price.toLowerCase();
            const ratingValue = card.dataset.rating.toLowerCase();
            const durationValue = card.dataset.duration.toLowerCase();
            const description = card.querySelector('p')?.textContent.toLowerCase() || '';

            let visible = true;

            if (query && !(title.includes(query) || description.includes(query))) visible = false;
            if (category && categoryValue !== category) visible = false;
            if (price && priceValue !== price) visible = false;
            if (rating && ratingValue < rating) visible = false;
            if (duration && durationValue !== duration) visible = false;

            const wrapper = card.closest('.col-12, .col-sm-6, .col-lg-3');
            if (wrapper) wrapper.style.display = visible ? '' : 'none';
        });
    }

    function resetDestinationFilters() {
        if (destinationSearch) destinationSearch.value = '';
        if (destCategoryFilter) destCategoryFilter.value = '';
        if (destPriceFilter) destPriceFilter.value = '';
        if (destRatingFilter) destRatingFilter.value = '';
        if (destDurationFilter) destDurationFilter.value = '';
        destinationCards.forEach(card => {
            const wrapper = card.closest('.col-12, .col-sm-6, .col-lg-3');
            if (wrapper) wrapper.style.display = '';
        });
    }

    function toggleWishlist(button) {
        button.classList.toggle('active');
        const icon = button.querySelector('i');
        if (!icon) return;
        if (button.classList.contains('active')) {
            icon.classList.remove('far');
            icon.classList.add('fas', 'text-danger');
        } else {
            icon.classList.remove('fas', 'text-danger');
            icon.classList.add('far');
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

        document.querySelectorAll('.fade-in, .fade-in-up, .package-card-enhanced, .package-card, .destination-card-enhanced, .destination-card').forEach(el => {
            observer.observe(el);
        });
    }

    const loginForm = document.getElementById('loginForm');
    const loginEmailInput = document.getElementById('loginEmail');
    const loginPasswordInput = document.getElementById('loginPassword');

    function setupContactFormValidation() {
        if (!contactForm) return;

        contactForm.addEventListener('submit', event => {
            if (!contactForm.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            contactForm.classList.add('was-validated');
        });
    }

    function setupLoginForm() {
        if (!loginForm || !loginEmailInput || !loginPasswordInput) return;

        loginForm.addEventListener('submit', event => {
            event.preventDefault();
            const email = loginEmailInput.value.trim();
            const password = loginPasswordInput.value;

            if (email === 'admin123@gmail.com' && password === 'admin123') {
                window.location.href = 'index.html';
            } else {
                alert('Invalid login. Use admin123@gmail.com and password admin123.');
            }
        });
    }

    updateNavbarStyle();
    setupFadeInObserver();
    setupContactFormValidation();
    setupLoginForm();

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

    if (packageSearch) packageSearch.addEventListener('input', filterPackages);
    [categoryFilter, durationFilter, budgetFilter, ratingFilter].forEach(select => {
        if (select) select.addEventListener('change', filterPackages);
    });
    if (resetFilters) resetFilters.addEventListener('click', function () {
        resetPackageFilters();
        resetDestinationFilters();
    });

    if (destinationSearch) destinationSearch.addEventListener('input', filterDestinations);
    [destCategoryFilter, destPriceFilter, destRatingFilter, destDurationFilter].forEach(select => {
        if (select) select.addEventListener('change', filterDestinations);
    });

    document.querySelectorAll('.wishlist-icon').forEach(btn => {
        btn.addEventListener('click', function () {
            toggleWishlist(this);
        });
    });

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
});
