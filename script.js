document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
            
            // Toggle hamburger animation
            const spans = menuToggle.querySelectorAll('span');
            if (menuToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // --- Interactive Constructor ---
    const biscuitOptions = document.querySelectorAll('#biscuitOptions .selector-card');
    const creamOptions = document.querySelectorAll('#creamOptions .selector-card');
    const fillingOptions = document.querySelectorAll('#fillingOptions .selector-card');
    const summaryText = document.getElementById('summaryText');
    const btnSendConstructor = document.getElementById('btnSendConstructor');

    let selectedBiscuit = "Классический ванильный";
    let selectedCream = "Крем-чиз на сливках";
    let selectedFilling = "Свежая клубника";

    const updateSummary = () => {
        if (summaryText) {
            summaryText.textContent = `${selectedBiscuit} + ${selectedCream} + ${selectedFilling}`;
        }
    };

    // Helper to toggle active card and set value
    const setupSelector = (options, callback) => {
        options.forEach(card => {
            card.addEventListener('click', () => {
                options.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                const val = card.getAttribute('data-value');
                callback(val);
                updateSummary();
            });
        });
    };

    setupSelector(biscuitOptions, (val) => { selectedBiscuit = val; });
    setupSelector(creamOptions, (val) => { selectedCream = val; });
    setupSelector(fillingOptions, (val) => { selectedFilling = val; });

    if (btnSendConstructor) {
        btnSendConstructor.addEventListener('click', () => {
            const phoneNumber = "77071591799";
            const message = `Здравствуйте, Оразгуль! Я собрал свой идеальный торт в конструкторе на сайте:
- Основа: ${selectedBiscuit}
- Крем: ${selectedCream}
- Начинка: ${selectedFilling}

Подскажите, пожалуйста, стоимость и свободную дату для заказа.`;
            
            const encodedMessage = encodeURIComponent(message);
            const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            window.open(waUrl, '_blank');
        });
    }

    // --- Smooth Scrolling with header offset ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY;
                
                window.scrollTo({
                    top: targetPosition - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Scroll Reveal Animation (IntersectionObserver) ---
    const revealElements = document.querySelectorAll('[data-reveal]');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // --- Header shrink/shadow on scroll ---
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 80) {
                header.style.boxShadow = '0 4px 20px rgba(54, 34, 28, 0.06)';
                header.style.backgroundColor = 'rgba(255, 253, 249, 0.96)';
            } else {
                header.style.boxShadow = 'none';
                header.style.backgroundColor = 'rgba(255, 253, 249, 0.85)';
            }
        }, { passive: true });
    }
});
