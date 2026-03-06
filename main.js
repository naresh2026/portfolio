document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Navigation ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navOverlay = document.querySelector('.mobile-nav-overlay');
    const body = document.body;
    let isMenuOpen = false;

    mobileBtn.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        navOverlay.classList.toggle('active', isMenuOpen);
        
        // Simple hamburger animation
        const bars = mobileBtn.querySelectorAll('.bar');
        if (isMenuOpen) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
            body.style.overflow = '';
        }
    }

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible to prevent re-triggering
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });


    // --- Form Handling ---
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate API call
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = 'Message Sent!';
                btn.style.backgroundColor = '#10B981'; // Green
                btn.style.borderColor = '#10B981';
                
                formStatus.innerText = "Thank you! We'll be in touch shortly.";
                formStatus.style.color = '#10B981';
                formStatus.style.marginTop = '1rem';
                
                contactForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                    btn.style.backgroundColor = '';
                    btn.style.borderColor = '';
                    formStatus.innerText = '';
                }, 5000);
            }, 1500);
        });
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
            navbar.style.padding = '0.8rem 0'; // Shrink slightly
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '1.2rem 0';
        }
    });

});
