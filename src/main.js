// Import styles
import './style.css';

// Tailwind configuration
window.tailwind = window.tailwind || {};
window.tailwind.config = {
        darkMode: "class",
        theme: {
                extend: {
                        "colors": {
                                "surface-container-highest": "#353535",
                                "on-tertiary-fixed": "#1c1c18",
                                "surface-container": "#1f2020",
                                "inverse-on-surface": "#303030",
                                "surface-bright": "#393939",
                                "inverse-surface": "#e4e2e1",
                                "primary-fixed": "#ffdea8",
                                "on-surface": "#e4e2e1",
                                "secondary": "#c8c6c5",
                                "secondary-fixed-dim": "#c8c6c5",
                                "on-secondary-fixed-variant": "#474746",
                                "error-container": "#93000a",
                                "on-primary-container": "#6b4c00",
                                "surface-dim": "#131313",
                                "secondary-fixed": "#e5e2e1",
                                "on-secondary": "#313030",
                                "on-background": "#e4e2e1",
                                "tertiary": "#e3e0da",
                                "tertiary-container": "#c6c4bf",
                                "surface-container-high": "#2a2a2a",
                                "primary-fixed-dim": "#ffba20",
                                "primary-container": "#ffb800",
                                "surface-container-lowest": "#0e0e0e",
                                "on-primary": "#412d00",
                                "on-primary-fixed": "#271900",
                                "on-primary-fixed-variant": "#5e4200",
                                "secondary-container": "#474746",
                                "surface-variant": "#353535",
                                "surface-tint": "#ffba20",
                                "outline": "#9e8f78",
                                "primary": "#ffdca1",
                                "on-secondary-container": "#b7b5b4",
                                "on-tertiary": "#31312d",
                                "on-tertiary-fixed-variant": "#474743",
                                "background": "#131313",
                                "on-error": "#690005",
                                "outline-variant": "#514532",
                                "tertiary-fixed-dim": "#c9c6c1",
                                "surface-container-low": "#1b1c1c",
                                "surface": "#131313",
                                "tertiary-fixed": "#e5e2dc",
                                "error": "#ffb4ab",
                                "on-tertiary-container": "#52514d",
                                "on-secondary-fixed": "#1c1b1b",
                                "inverse-primary": "#7c5800",
                                "on-surface-variant": "#d5c4ab",
                                "on-error-container": "#ffdad6"
                        },
                        "borderRadius": {
                                "DEFAULT": "0.25rem",
                                "lg": "0.5rem",
                                "xl": "0.75rem",
                                "full": "9999px"
                        },
                        "spacing": {
                                "base": "8px",
                                "section-gap": "80px",
                                "gutter": "16px",
                                "margin-desktop": "64px",
                                "margin-mobile": "20px"
                        },
                        "fontFamily": {
                                "body-md": [
                                        "Hanken Grotesk"
                                ],
                                "display-lg": [
                                        "Archivo Narrow"
                                ],
                                "headline-lg-mobile": [
                                        "Archivo Narrow"
                                ],
                                "label-sm": [
                                        "Inter"
                                ],
                                "headline-lg": [
                                        "Archivo Narrow"
                                ]
                        },
                        "fontSize": {
                                "body-md": [
                                        "16px",
                                        {
                                                "lineHeight": "24px",
                                                "fontWeight": "400"
                                        }
                                ],
                                "display-lg": [
                                        "72px",
                                        {
                                                "lineHeight": "80px",
                                                "letterSpacing": "-0.02em",
                                                "fontWeight": "700"
                                        }
                                ],
                                "headline-lg-mobile": [
                                        "24px",
                                        {
                                                "lineHeight": "32px",
                                                "fontWeight": "700"
                                        }
                                ],
                                "label-sm": [
                                        "12px",
                                        {
                                                "lineHeight": "16px",
                                                "letterSpacing": "0.05em",
                                                "fontWeight": "600"
                                        }
                                ],
                                "headline-lg": [
                                        "32px",
                                        {
                                                "lineHeight": "40px",
                                                "fontWeight": "700"
                                        }
                                ]
                        }
                },
        },
};

// Scroll Reveal Observer
function initObserver() {
        const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                        if (entry.isIntersecting) {
                                entry.target.classList.add('reveal-active');
                        }
                });
        }, {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px"
        });

        document.querySelectorAll('.reveal').forEach((el) => {
                observer.observe(el);
        });
}

// Mobile menu toggle
function initMobileMenu() {
        const menuBtn = document.getElementById('mobile-menu-btn');
        const sidebar = document.getElementById('mobile-sidebar');
        const overlay = document.getElementById('mobile-sidebar-overlay');
        const icon = document.getElementById('hamburger-icon');

        if (!menuBtn || !sidebar || !overlay || !icon) return;

        function toggleMenu() {
                const isOpen = sidebar.classList.contains('open');
                if (!isOpen) {
                        sidebar.classList.add('open');
                        overlay.classList.add('open');
                        menuBtn.classList.add('menu-open');
                        icon.textContent = 'close';
                } else {
                        sidebar.classList.remove('open');
                        overlay.classList.remove('open');
                        menuBtn.classList.remove('menu-open');
                        icon.textContent = 'menu';
                }
        }

        menuBtn.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);

        // Close dropdown when a link is clicked
        sidebar.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', toggleMenu);
        });
}

// Transparent navbar scroll glassmorphism
function initNavbarScroll() {
        const nav = document.querySelector('nav');
        if (!nav) return;

        function handleScroll() {
                if (window.scrollY > 50) {
                        nav.classList.add('scrolled');
                } else {
                        nav.classList.remove('scrolled');
                }
        }

        window.addEventListener('scroll', handleScroll);
        // Call once on init to handle reload in scrolled position
        handleScroll();
}

function init() {
        initObserver();
        initMobileMenu();
        initNavbarScroll();
}

if (document.readyState === 'loading') {
        document.addEventListener("DOMContentLoaded", init);
} else {
        init();
}
