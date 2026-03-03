document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        // Simple animation for hamburger lines could be added here via CSS classes
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // --- Scroll Animations (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-right');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
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
                const speed = 2000 / target; // Adjust duration
                
                const updateCount = () => {
                    const count = +stat.innerText;
                    const inc = Math.ceil(target / 100); 

                    if (count < target) {
                        stat.innerText = count + inc;
                        setTimeout(updateCount, 20);
                    } else {
                        stat.innerText = target;
                    }
                };
                updateCount();
            });
        }
    }, { threshold: 0.5 });

    if(statsSection) {
        statsObserver.observe(statsSection);
    }

    // --- Form Handling ---
    const form = document.getElementById('offerForm');
    const successMsg = document.getElementById('successMessage');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate API call / processing delay
        const btn = form.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = "Processing...";
        btn.style.opacity = "0.7";

        setTimeout(() => {
            form.style.display = 'none';
            successMsg.style.display = 'block';
            successMsg.classList.add('fade-in');
            setTimeout(() => successMsg.classList.add('visible'), 10);
        }, 1500);
    });

    // --- Sticky Nav Background Change on Scroll ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 14, 26, 0.98)';
            navbar.style.padding = '15px 0';
        } else {
            navbar.style.background = 'rgba(10, 14, 26, 0.9)';
            navbar.style.padding = '20px 0';
        }
    });

});