document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    // Theme Toggle Functionality
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    updateToggleIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleIcon(newTheme);
    });

    function updateToggleIcon(theme) {
        if (theme === 'dark') {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    // Mobile Menu Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        burger.classList.toggle('toggle');
    });

    // Close menu when any link inside is clicked
    nav.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navLinks.forEach(l => l.style.animation = '');
        }
    });

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));

    // Smart Navbar (Hide on Scroll Down, Show on Scroll Up)
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    const scrollDelta = 5;

    window.addEventListener('scroll', () => {
        let st = window.pageYOffset || document.documentElement.scrollTop;

        // Make sure scroll is more than delta
        if (Math.abs(lastScrollTop - st) <= scrollDelta) return;

        // If scroll down and past navbar, add class .nav-up
        if (st > lastScrollTop && st > navbar.offsetHeight) {
            navbar.classList.add('nav-up');
        } else {
            // Scroll Up
            if (st + window.innerHeight < document.documentElement.scrollHeight) {
                navbar.classList.remove('nav-up');
            }
        }
        lastScrollTop = st;
    });
});
