document.addEventListener('DOMContentLoaded', () => {
    
    // --- Active Link Highlight ---
    // Automatically highlights the nav link corresponding to the current page
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });

    // --- Mobile Menu ---
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if(hamburger) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            // Toggle Hamburger Icon appearance
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(s => s.classList.toggle('open'));
        });
    }

    // --- Stats Counter (Only runs if element exists on page) ---
    const statsSection = document.querySelector('.trust-bar');
    if (statsSection) {
        const stats = document.querySelectorAll('.stat-number');
        let hasCounted = false;
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasCounted) {
                hasCounted = true;
                stats.forEach(stat => {
                    const target = +stat.getAttribute('data-target');
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
        });
        observer.observe(statsSection);
    }

    // --- Form Handling ---
    const form = document.getElementById('offerForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            btn.innerText = "Processing...";
            
            setTimeout(() => {
                form.innerHTML = `
                    <div style="text-align:center; padding:40px;">
                        <div style="font-size:3rem; color:#00D4FF; margin-bottom:20px;">✓</div>
                        <h3>Received</h3>
                        <p style="color:#9CA3AF;">Our team will review your project and contact you shortly.</p>
                    </div>
                `;
            }, 1500);
        });
    }
});