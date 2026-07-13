document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Toggle (System Preference + Manual) ---
    const themeToggle = document.getElementById('themeToggle');
    const htmlEl = document.documentElement;
    const THEME_KEY = 'orazgul-theme';

    // Determine initial theme: localStorage > system preference
    const getSystemTheme = () => 
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    const savedTheme = localStorage.getItem(THEME_KEY);
    const initialTheme = savedTheme || getSystemTheme();
    htmlEl.setAttribute('data-theme', initialTheme);

    // Toggle handler
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            // Add transition class for smooth color change
            document.body.classList.add('theme-transitioning');

            const current = htmlEl.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            
            htmlEl.setAttribute('data-theme', next);
            localStorage.setItem(THEME_KEY, next);

            // Remove transition class after animation completes
            setTimeout(() => {
                document.body.classList.remove('theme-transitioning');
            }, 450);
        });
    }

    // Listen for system theme changes (if user hasn't manually overridden)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(THEME_KEY)) {
            document.body.classList.add('theme-transitioning');
            htmlEl.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            setTimeout(() => document.body.classList.remove('theme-transitioning'), 450);
        }
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            const isActive = menuToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
            
            const spans = menuToggle.querySelectorAll('span');
            if (isActive) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

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

    const setupSelector = (options, callback) => {
        options.forEach(card => {
            card.addEventListener('click', () => {
                options.forEach(c => c.classList.remove('active'));
                card.classList.add('active');

                // Small haptic-like scale animation
                card.style.transform = 'scale(0.97)';
                setTimeout(() => { card.style.transform = ''; }, 150);

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
                    top: targetPosition - headerHeight - 10,
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
            threshold: 0.08,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // --- Header scroll effects ---
    const header = document.getElementById('mainHeader');
    if (header) {
        let lastScrollY = 0;
        const handleScroll = () => {
            const scrollY = window.scrollY;
            
            if (scrollY > 60) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScrollY = scrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Run once on load
    }

    // --- Animated Counter for Stats ---
    const animateCounters = () => {
        const statNums = document.querySelectorAll('.stat-num[data-count]');
        
        statNums.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            if (isNaN(target)) return;

            const duration = 2000;
            const startTime = performance.now();

            const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeOutQuart(progress);
                const current = Math.round(easedProgress * target);
                
                stat.textContent = current + '+';
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            };

            requestAnimationFrame(updateCounter);
        });
    };

    // Trigger counter animation when stats bar is visible
    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        statsObserver.observe(statsBar);
    }

    // --- Parallax-like subtle hero scroll effect ---
    const hero = document.querySelector('.hero');
    if (hero) {
        const decos = hero.querySelectorAll('.hero-deco');
        
        const handleHeroScroll = () => {
            const scrollY = window.scrollY;
            const heroHeight = hero.offsetHeight;
            
            if (scrollY < heroHeight) {
                const progress = scrollY / heroHeight;
                
                decos.forEach((deco, i) => {
                    const speed = (i + 1) * 0.3;
                    deco.style.transform = `translateY(${scrollY * speed}px)`;
                });
            }
        };

        window.addEventListener('scroll', handleHeroScroll, { passive: true });
    }
});
