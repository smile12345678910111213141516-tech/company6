document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle w/ Hamburger Animation ---
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });

    // --- Jawdropping Scroll Animations (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    // --- Number Counter Animation ---
    const statsSection = document.querySelector('.trust-bar');
    const stats = document.querySelectorAll('.stat-number');
    let hasCounted = false;

    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !hasCounted) {
            hasCounted = true;
            stats.forEach(stat => {
                const target = +stat.getAttribute('data-target');
                const speed = 2000; // Total duration in ms
                const incrementTime = 30; // ms per frame
                const steps = speed / incrementTime;
                const inc = target / steps;
                let count = 0;
                
                const updateCount = () => {
                    count += inc;
                    if (count < target) {
                        stat.innerText = Math.ceil(count);
                        setTimeout(updateCount, incrementTime);
                    } else {
                        stat.innerText = target;
                    }
                };
                updateCount();
            });
        }
    }, { threshold: 0.2 });

    if(statsSection) {
        statsObserver.observe(statsSection);
    }

    // --- Form Handling with smooth transition ---
    const form = document.getElementById('offerForm');
    const successMsg = document.getElementById('successMessage');

    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = "Processing Details...";
            btn.style.opacity = "0.8";
            btn.style.pointerEvents = "none";

            setTimeout(() => {
                // Keep the layout intact but show message
                const inputs = form.querySelectorAll('.form-group, button');
                inputs.forEach(el => el.style.display = 'none');
                
                successMsg.style.display = 'block';
                successMsg.classList.add('fade-in');
                setTimeout(() => successMsg.classList.add('visible'), 50);
            }, 1500);
        });
    }

    // --- Dynamic Sticky Nav Background ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.padding = '12px 0';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
        } else {
            navbar.style.background = 'rgba(18, 18, 18, 0.85)';
            navbar.style.padding = '20px 0';
            navbar.style.boxShadow = 'none';
        }
    });

});