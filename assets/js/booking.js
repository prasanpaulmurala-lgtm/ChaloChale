document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('bookingForm');
    const formMessage = document.getElementById('formMessage');

    const revealItems = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    revealItems.forEach(item => observer.observe(item));

    if (bookingForm) {
        bookingForm.addEventListener('submit', event => {
            event.preventDefault();
            if (!bookingForm.checkValidity()) {
                bookingForm.classList.add('was-validated');
                formMessage.textContent = 'Please complete the highlighted fields before continuing.';
                return;
            }

            formMessage.textContent = 'Thank you! Your booking request has been prepared successfully.';
            bookingForm.reset();
            bookingForm.classList.remove('was-validated');
        });
    }

    document.querySelectorAll('.addon-card .btn').forEach(button => {
        button.addEventListener('click', () => {
            button.textContent = 'Added';
            button.classList.remove('btn-outline-primary');
            button.classList.add('btn-primary');
        });
    });
});
