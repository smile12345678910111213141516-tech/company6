document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        });
    });

    // --- Scroll Animations (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    // --- Staggered Grid Animation ---
    const staggerContainers = document.querySelectorAll('.stagger');

    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('.stagger-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 150);
                });
                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    staggerContainers.forEach(container => staggerObserver.observe(container));

    // --- Number Counter Animation ---
    const statsSection = document.querySelector('.trust-bar');
    const stats = document.querySelectorAll('.stat-number');
    let hasCounted = false;

    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !hasCounted) {
            hasCounted = true;
            stats.forEach(stat => {
                const target = +stat.getAttribute('data-target');
                const duration = 2000;
                const start = performance.now();

                const animate = (currentTime) => {
                    const elapsed = currentTime - start;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    stat.innerText = Math.round(target * eased);

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        stat.innerText = target;
                    }
                };

                requestAnimationFrame(animate);
            });
        }
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // --- Parallax Effect ---
    const heroBg = document.querySelector('.hero-bg');
    const pageHeader = document.querySelector('.page-header');

    if (heroBg || pageHeader) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (heroBg) {
                heroBg.style.transform = 'translateY(' + (scrollY * 0.35) + 'px)';
            }
            if (pageHeader) {
                pageHeader.style.backgroundPositionY = (scrollY * 0.4) + 'px';
            }
        }, { passive: true });
    }

    // --- Form Handling ---
    const form = document.getElementById('offerForm');
    const successMsg = document.getElementById('successMessage');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = form.querySelector('button');
            btn.innerText = "Processing...";
            btn.style.opacity = "0.7";
            btn.disabled = true;

            setTimeout(() => {
                form.style.display = 'none';
                if (successMsg) {
                    successMsg.style.display = 'block';
                    successMsg.classList.add('fade-in');
                    setTimeout(() => successMsg.classList.add('visible'), 10);
                }
            }, 1500);
        });
    }

    // --- Sticky Nav Background Change on Scroll ---
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(8, 8, 8, 0.98)';
            navbar.style.padding = '12px 0';
            navbar.style.borderBottomColor = 'rgba(212, 180, 131, 0.15)';
        } else {
            navbar.style.background = 'rgba(18, 18, 18, 0.95)';
            navbar.style.padding = '20px 0';
            navbar.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
        }
    }, { passive: true });

});