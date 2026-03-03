// UPDATED: Added Spotlight Effect
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Sticky Header ---
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 2. Mobile Navigation Toggle ---
    const hamburger = document.querySelector('.hamburger-menu');
    const body = document.body;
    hamburger.addEventListener('click', () => {
        body.classList.toggle('nav-open');
    });

    // --- 3. Intersection Observer for fade-in animations ---
    const animatedElements = document.querySelectorAll('.fade-in-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    animatedElements.forEach(el => observer.observe(el));

    // --- 4. Number Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const startCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        
        const updateCount = () => {
            const count = +counter.innerText;
            const inc = Math.max(Math.floor(target / speed), 1);

            if (count < target) {
                counter.innerText = Math.min(count + inc, target);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target.toLocaleString(); // Add commas for thousands
            }
        };
        updateCount();
    }
    
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => {
        counter.innerText = '0'; // Initialize
        counterObserver.observe(counter);
    });
    
    // --- 5. Contact Form Submission Logic ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formContainer = document.querySelector('.contact-form-container');
            const successMessage = document.getElementById('form-success-message');

            formContainer.style.transition = 'opacity 0.5s';
            formContainer.style.opacity = '0';
            
            setTimeout(() => {
                contactForm.style.display = 'none';
                successMessage.style.display = 'block';
                formContainer.style.opacity = '1';
            }, 500);
        });
    }

    // --- 6. Add data-label for responsive table ---
    const tableRows = document.querySelectorAll('.comparison-row');
    tableRows.forEach(row => {
        if(row.children.length < 3) return;
        const feature = row.children[0].textContent;
        row.children[1].setAttribute('data-label', feature);
        row.children[2].setAttribute('data-label', feature);
    });

    // --- 7. NEW FEATURE: Interactive Spotlight Effect ---
    const spotlight = document.getElementById('spotlight');
    const darkSections = document.querySelectorAll('.dark-section');

    // This feature only makes sense on devices with a mouse, not touch screens.
    const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (spotlight && !isTouchDevice()) {
        const handleMouseMove = (e) => {
            // Use requestAnimationFrame for smoother animation
            requestAnimationFrame(() => {
                spotlight.style.left = `${e.clientX}px`;
                spotlight.style.top = `${e.clientY}px`;
            });
        };

        darkSections.forEach(section => {
            section.addEventListener('mouseenter', () => {
                spotlight.style.opacity = '1';
                window.addEventListener('mousemove', handleMouseMove);
            });
            section.addEventListener('mouseleave', () => {
                spotlight.style.opacity = '0';
                window.removeEventListener('mousemove', handleMouseMove);
            });
        });
    }

});