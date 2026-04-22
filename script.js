document.addEventListener('DOMContentLoaded', () => {

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    const scrollBar = document.getElementById('scroll-bar');
    
    window.addEventListener('scroll', () => {
        // Navbar styling
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Progress Bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        if (scrollBar) scrollBar.style.width = scrolled + "%";
    });

    // Custom Cursor Follower
    const cursor = document.getElementById('cursor');
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .project-card, .skill-item');

    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
        });

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('active'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
        });
    }

    // Hero Parallax Effect
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 20;
            const y = (e.clientY / window.innerHeight) * 20;
            const spheres = heroBg.querySelectorAll('.gradient-sphere');
            spheres[0].style.transform = `translate(${x}px, ${y}px)`;
            spheres[1].style.transform = `translate(${-x}px, ${-y}px)`;
        });
    }

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('is-active');
        document.body.classList.toggle('no-scroll');
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle?.classList.remove('is-active');
        document.body.classList.remove('no-scroll');
    }));

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll Animations (Intersection Observer)
    const observerOptions = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, .reveal').forEach(el => {
        observer.observe(el);
    });

    // Card Tilt Effect Simulation
    document.querySelectorAll('.service-card, .project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)`;
        });
    });

    // Testimonial Navigation
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const prevButton = document.getElementById('prev-testimonial');
    const nextButton = document.getElementById('next-testimonial');

    if (testimonialSlider && prevButton && nextButton) {
        const scrollAmount = 420;
        prevButton.addEventListener('click', () => {
            testimonialSlider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
        nextButton.addEventListener('click', () => {
            testimonialSlider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }
});
