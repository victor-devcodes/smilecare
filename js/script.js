/*==================================================
    MAIN JAVASCRIPT FILE
    -----------------------------------------
    Contents
    1. Testimonial Carousel
    2. Mobile Navigation
    3. Scroll Reveal
    4. Back To Top Button
    5. Gallery Lightbox
==================================================*/

document.addEventListener("DOMContentLoaded", () => {
    initTestimonialCarousel();
    initMobileMenu();
    initRevealAnimation();
    initBackToTop();
    initLightbox();
});

/*==================================================
    1. TESTIMONIAL CAROUSEL
==================================================*/

function initTestimonialCarousel() {

    // Select Elements
    const track = document.querySelector(".testimonial-track");
    const cards = document.querySelectorAll(".testimonial-card");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");
    const dots = document.querySelectorAll(".dot");
    const slider = document.querySelector(".testimonial-slider");

    // Exit if carousel doesn't exist
    if (!track || !cards.length) return;

    let currentIndex = 0;
    let cardsPerView = getCardsPerView();

    let startX = 0;
    let endX = 0;

    /*---------------------------
        Helper Functions
    ---------------------------*/

    function getCardsPerView() {

        if (window.innerWidth <= 768) return 1;

        if (window.innerWidth <= 992) return 2;

        return 3;
    }

    function updateSlider() {

        cardsPerView = getCardsPerView();

        const cardWidth = cards[0].offsetWidth;

        track.style.transform =
            `translateX(-${currentIndex * cardWidth}px)`;

        dots.forEach(dot => dot.classList.remove("active"));

        if (dots[currentIndex]) {
            dots[currentIndex].classList.add("active");
        }
    }

    function nextSlide() {

        if (currentIndex < cards.length - cardsPerView) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }

        updateSlider();
    }

    function previousSlide() {

        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = cards.length - cardsPerView;
        }

        updateSlider();
    }

    /*---------------------------
        Buttons
    ---------------------------*/

    nextBtn?.addEventListener("click", nextSlide);
    prevBtn?.addEventListener("click", previousSlide);

    /*---------------------------
        Touch Swipe
    ---------------------------*/

    track.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
    });

    track.addEventListener("touchend", (e) => {

        endX = e.changedTouches[0].clientX;

        const swipeDistance = startX - endX;

        if (Math.abs(swipeDistance) < 50) return;

        swipeDistance > 0
            ? nextSlide()
            : previousSlide();
    });

    /*---------------------------
        Auto Slide
    ---------------------------*/

    let autoSlide = setInterval(nextSlide, 8000);

    slider?.addEventListener("mouseenter", () => {
        clearInterval(autoSlide);
    });

    slider?.addEventListener("mouseleave", () => {
        autoSlide = setInterval(nextSlide, 8000);
    });

    /*---------------------------
        Window Resize
    ---------------------------*/

    window.addEventListener("resize", updateSlider);

    updateSlider();
}

/*==================================================
    2. MOBILE NAVIGATION
==================================================*/

function initMobileMenu() {

    const menuBtn = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const navLinks = document.querySelector(".nav-links");

    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");

        document.body.classList.toggle("menu-open");

        menuBtn.innerHTML =
            mobileMenu.classList.contains("active")
                ? "✕"
                : "☰";
    });

    navLinks?.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");
            document.body.classList.remove("menu-open");
            menuBtn.innerHTML = "☰";

        });

    });
}

/*==================================================
    3. SCROLL REVEAL
==================================================*/

function initRevealAnimation() {

    const sections = document.querySelectorAll(".reveal");

    if (!sections.length) return;

    function revealSections() {

        sections.forEach(section => {

            const top = section.getBoundingClientRect().top;

            if (top < window.innerHeight - 100) {
                section.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", revealSections);

    revealSections();
}

/*==================================================
    4. BACK TO TOP BUTTON
==================================================*/

function initBackToTop() {

    const button = document.getElementById("backToTop");

    if (!button) return;

    window.addEventListener("scroll", () => {

        button.style.display =
            window.scrollY > 400
                ? "block"
                : "none";

    });

    button.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });
}

/*==================================================
    5. GALLERY LIGHTBOX
==================================================*/

function initLightbox() {

    const images = document.querySelectorAll(".gallery-grid img");
    const lightbox = document.querySelector(".lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const closeBtn = document.querySelector(".close-lightbox");

    if (!images.length || !lightbox) return;

    images.forEach(image => {

        image.addEventListener("click", () => {

            lightbox.style.display = "flex";
            lightboxImage.src = image.src;

        });

    });

    closeBtn?.addEventListener("click", () => {

        lightbox.style.display = "none";

    });
}