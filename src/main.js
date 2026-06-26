// Import styles
import './style.css';
import { strings } from './translations.js';

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

// Dynamic Reviews Loader and Animator
async function loadReviewsData() {
        try {
                const response = await fetch('/reviews-data.json');
                if (!response.ok) throw new Error('Failed to load reviews data');
                const data = await response.json();
                window.reviewsData = data; // Store data globally
                const rating = data.rating || 4.8;
                const count = data.reviewsCount || 70;

                // Elements
                const heroRatingNum = document.getElementById('hero-rating-num');
                const heroStarsContainer = document.getElementById('hero-stars-container');
                const heroReviewsCount = document.getElementById('hero-reviews-count');

                const reviewsStarsContainer = document.getElementById('reviews-stars-container');
                const reviewsRatingText = document.getElementById('reviews-rating-text');
                const reviewsReviewsCount = document.getElementById('reviews-reviews-count');

                // Render Stars Function
                function renderStars(container, fillCol = '#ffba20', emptyCol = '#4a4a4a') {
                        if (!container) return;
                        container.innerHTML = '';
                        for (let i = 1; i <= 5; i++) {
                                if (i <= Math.floor(rating)) {
                                        // Fully filled star
                                        container.innerHTML += `
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${fillCol}" class="w-5 h-5">
                                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                </svg>
                                        `;
                                } else if (i > Math.ceil(rating)) {
                                        // Empty/Gray star
                                        container.innerHTML += `
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${emptyCol}" class="w-5 h-5">
                                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                </svg>
                                        `;
                                } else {
                                        // Partially filled star
                                        const percentage = Math.round((rating % 1) * 100);
                                        const gradId = `star-grad-${Math.random().toString(36).substr(2, 9)}`;
                                        container.innerHTML += `
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5">
                                                        <defs>
                                                                <linearGradient id="${gradId}" x1="0%" y1="0%" x2="100%" y2="0%">
                                                                        <stop offset="${percentage}%" stop-color="${fillCol}" />
                                                                        <stop offset="${percentage}%" stop-color="${emptyCol}" />
                                                                </linearGradient>
                                                        </defs>
                                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="url(#${gradId})" />
                                                </svg>
                                        `;
                                }
                        }
                }

                // Render stars in both containers
                renderStars(heroStarsContainer);
                renderStars(reviewsStarsContainer, '#ffba20', '#4a4a4a');

                // Animate Rating Values
                if (heroRatingNum) {
                        animateValue(heroRatingNum, 0, rating, 1500, (v) => v.toFixed(1));
                }
                if (reviewsRatingText) {
                        animateValue(reviewsRatingText, 0, rating, 1500, (v) => v.toFixed(1));
                }

                // Animate Reviews Count
                if (heroReviewsCount) {
                        animateValue(heroReviewsCount, 0, count, 1500, (v) => {
                                const currentLang = localStorage.getItem('language') || 'en';
                                return currentLang === 'is' ? `(+${Math.round(v)} umsagnir)` : `(+${Math.round(v)} reviews)`;
                        });
                }
                if (reviewsReviewsCount) {
                        animateValue(reviewsReviewsCount, 0, count, 1500, (v) => {
                                const currentLang = localStorage.getItem('language') || 'en';
                                return currentLang === 'is' ? `Byggt á ${Math.round(v)} ánægðum umsögnum` : `Based on ${Math.round(v)} happy reviews`;
                        });
                }

        } catch (error) {
                console.error("Error updating live reviews rating:", error);
        }
}

function animateValue(obj, start, end, duration, formatFn = (v) => v) {
        let startTimestamp = null;
        const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                obj.innerHTML = formatFn(start + progress * (end - start));
                if (progress < 1) {
                        window.requestAnimationFrame(step);
                }
        };
        window.requestAnimationFrame(step);
}



function initNavbarScroll() {
        const nav = document.querySelector('nav');
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        if (!nav) return;

        function handleScroll() {
                if (window.scrollY > 20) {
                        nav.classList.add('bg-[#e89e1b]', 'shadow-md');
                        nav.classList.remove('bg-transparent', 'shadow-none');
                        if (mobileMenuBtn) {
                                mobileMenuBtn.classList.add('text-black');
                                mobileMenuBtn.classList.remove('text-white');
                        }
                } else {
                        nav.classList.remove('bg-[#e89e1b]', 'shadow-md');
                        nav.classList.add('bg-transparent', 'shadow-none');
                        if (mobileMenuBtn) {
                                mobileMenuBtn.classList.remove('text-black');
                                mobileMenuBtn.classList.add('text-white');
                        }
                }
        }

        // Initialize state
        handleScroll();
        window.addEventListener('scroll', handleScroll);
}

function cookieConsent() {
        const cookieconsent = document.getElementById("cookie-consent");
        const acceptBtn = document.getElementById("accept-btn");
        const cancelBtn = document.getElementById("cancel-btn");

        if (!cookieconsent || !acceptBtn || !cancelBtn) return;

        // Check if user already consented
        if (localStorage.getItem("cookieConsent")) {
                return;
        }

        // Show cookie consent banner
        cookieconsent.classList.remove("hidden");
        // Trigger transition
        setTimeout(() => {
                cookieconsent.classList.remove("translate-y-24", "opacity-0");
                cookieconsent.classList.add("translate-y-0", "opacity-100");
        }, 100);

        function hideBanner() {
                cookieconsent.classList.remove("translate-y-0", "opacity-100");
                cookieconsent.classList.add("translate-y-24", "opacity-0");
                setTimeout(() => {
                        cookieconsent.classList.add("hidden");
                }, 500);
        }

        // Accept button
        acceptBtn.addEventListener("click", () => {
                localStorage.setItem("cookieConsent", "accepted");
                hideBanner();
        });

        // Cancel button
        cancelBtn.addEventListener("click", () => {
                localStorage.setItem("cookieConsent", "declined");
                hideBanner();
        });
}

// Interactive Food Gallery Lightbox
function initFoodGallery() {
        const lightbox = document.getElementById('gallery-lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const closeBtn = document.getElementById('lightbox-close');
        const prevBtn = document.getElementById('lightbox-prev');
        const nextBtn = document.getElementById('lightbox-next');
        const galleryItems = document.querySelectorAll('.gallery-item');

        if (!lightbox || !galleryItems.length) return;

        // Build gallery data from DOM
        const galleryData = [];
        galleryItems.forEach(item => {
                const img = item.querySelector('img');
                const caption = item.querySelector('h3');
                galleryData.push({
                        src: img ? img.src : '',
                        alt: img ? img.alt : '',
                        caption: caption ? caption.textContent.trim() : ''
                });
        });

        let currentIndex = 0;

        function openLightbox(index) {
                currentIndex = index;
                updateLightbox();
                lightbox.classList.remove('hidden');
                lightbox.classList.add('flex');
                requestAnimationFrame(() => {
                        lightbox.classList.remove('opacity-0');
                        lightbox.classList.add('opacity-100');
                });
                document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
                lightbox.classList.remove('opacity-100');
                lightbox.classList.add('opacity-0');
                setTimeout(() => {
                        lightbox.classList.add('hidden');
                        lightbox.classList.remove('flex');
                }, 300);
                document.body.style.overflow = '';
        }

        function updateLightbox() {
                const item = galleryData[currentIndex];
                lightboxImg.src = item.src;
                lightboxImg.alt = item.alt;
                lightboxCaption.textContent = item.caption;
        }

        function nextImage() {
                currentIndex = (currentIndex + 1) % galleryData.length;
                updateLightbox();
        }

        function prevImage() {
                currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
                updateLightbox();
        }

        // Attach click events to gallery items
        galleryItems.forEach((item, i) => {
                item.addEventListener('click', () => openLightbox(i));
        });

        closeBtn.addEventListener('click', closeLightbox);
        nextBtn.addEventListener('click', nextImage);
        prevBtn.addEventListener('click', prevImage);

        // Close on backdrop click
        lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) closeLightbox();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
                if (lightbox.classList.contains('hidden')) return;
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowRight') nextImage();
                if (e.key === 'ArrowLeft') prevImage();
        });
}

function initTicketVisibility() {
        const ticket = document.getElementById('static-ticket');
        const specialOffers = document.getElementById('special-offers');
        if (!ticket || !specialOffers) return;

        const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                        if (entry.isIntersecting) {
                                ticket.classList.add('opacity-0', 'pointer-events-none');
                                ticket.classList.remove('opacity-100');
                        } else {
                                ticket.classList.remove('opacity-0', 'pointer-events-none');
                                ticket.classList.add('opacity-100');
                        }
                });
        }, {
                threshold: 0
        });

        observer.observe(specialOffers);
}

function initLanguageToggle() {
        const desktopBtn = document.getElementById('lang-toggle-desktop');
        const mobileBtn = document.getElementById('lang-toggle-mobile');
        const desktopLabel = document.getElementById('lang-label-desktop');
        const mobileLabel = document.getElementById('lang-label-mobile');

        let currentLang = localStorage.getItem('language') || 'en';

        function setLanguage(lang) {
                currentLang = lang;
                localStorage.setItem('language', lang);

                // Update DOM elements using selector mapping
                const index = lang === 'is' ? 1 : 0;
                for (const [selector, values] of Object.entries(strings)) {
                        document.querySelectorAll(selector).forEach(el => {
                                el.innerHTML = values[index];
                        });
                }

                // Re-update dynamic reviews count if they were already loaded
                if (window.reviewsData) {
                        const count = window.reviewsData.reviewsCount || 70;
                        const heroReviewsCount = document.getElementById('hero-reviews-count');
                        const reviewsReviewsCount = document.getElementById('reviews-reviews-count');
                        if (heroReviewsCount) {
                                heroReviewsCount.textContent = lang === 'is' ? `(+${count} umsagnir)` : `(+${count} reviews)`;
                        }
                        if (reviewsReviewsCount) {
                                reviewsReviewsCount.textContent = lang === 'is' ? `Byggt á ${count} ánægðum umsögnum` : `Based on ${count} happy reviews`;
                        }
                }

                if (desktopLabel) desktopLabel.textContent = lang === 'is' ? 'IS' : 'EN';
                if (mobileLabel) mobileLabel.textContent = lang === 'is' ? 'IS' : 'EN';
        }

        // Initialize
        setLanguage(currentLang);

        if (desktopBtn) {
                desktopBtn.addEventListener('click', () => {
                        setLanguage(currentLang === 'en' ? 'is' : 'en');
                });
        }

        if (mobileBtn) {
                mobileBtn.addEventListener('click', () => {
                        setLanguage(currentLang === 'en' ? 'is' : 'en');
                });
        }
}

function init() {
        initObserver();
        initMobileMenu();
        loadReviewsData();
        initNavbarScroll();
        cookieConsent();
        initFoodGallery();
        initTicketVisibility();
        initLanguageToggle();
}

if (document.readyState === 'loading') {
        document.addEventListener("DOMContentLoaded", init);
} else {
        init();
}
