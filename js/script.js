// Testimonial Carousel Javascript

const track = document.querySelector(".testimonial-track");

const cards = document.querySelectorAll(".testimonial-card");

const nextBtn = document.querySelector(".next");

const prevBtn = document.querySelector(".prev");

const dots = document.querySelectorAll(".dot");

                // Testimonial Card swipe on mobile

let startX = 0;
let endX = 0;
track.addEventListener("touchstart", (e) => {

    startX = e.touches[0].clientX;

});
track.addEventListener("touchend", (e) => {

    endX = e.changedTouches[0].clientX;

    handleSwipe();

});
function handleSwipe(){

    const swipeDistance = startX - endX;

    // Ignore tiny movements
    if(Math.abs(swipeDistance) < 50){
        return;
    }

    if(swipeDistance > 0){

        // Swipe left → next card
        nextBtn.click();

    }else{

        // Swipe right → previous card
        prevBtn.click();

    }

}

                            // Stop
function getCardsPerView(){

    if(window.innerWidth <= 768){

        return 1;

    }

    if(window.innerWidth <= 992){

        return 2;

    }

    return 3;

}

let currentIndex = 0;

let cardsPerView = getCardsPerView();

function updateSlider(){

    cardsPerView = getCardsPerView();

    const cardWidth = cards[0].offsetWidth;

    track.style.transform =
        `translateX(-${currentIndex * cardWidth}px)`;

    dots.forEach(dot => {

    dot.classList.remove("active");

});

dots[currentIndex].classList.add("active");

}

nextBtn.addEventListener("click",()=>{

    if(currentIndex < cards.length - cardsPerView){

        currentIndex++;

    }else{

        currentIndex = 0;

    }

    updateSlider();

});

prevBtn.addEventListener("click",()=>{

    if(currentIndex > 0){

        currentIndex--;

    }else{

        currentIndex = cards.length - cardsPerView;

    }

    updateSlider();

});

window.addEventListener("resize",()=>{

    cardsPerView = getCardsPerView();

    updateSlider();

});


// stop card slide on hover

let autoSlide = setInterval(() => {
    nextBtn.click();
}, 8000);

const slider = document.querySelector(".testimonial-slider");

slider.addEventListener("mouseenter", () => {
    clearInterval(autoSlide);
});

slider.addEventListener("mouseleave", () => {
    autoSlide = setInterval(() => {
        nextBtn.click();
    }, 8000);
});



// Hamburger

const menuBtn = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

menuBtn.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

    document.body.classList.toggle("menu-open");

    menuBtn.innerHTML = mobileMenu.classList.contains("active")
        ? "✕"
        : "☰";

});


// Close Menu After Clicking a Link

const links = document.querySelectorAll(".nav-links a");

links.forEach(link=>{

    link.addEventListener("click",()=>{

        navLinks.classList.remove("active");

    });

});

                            // reveal

const reveals = document.querySelectorAll(".reveal");

function revealSections(){

    reveals.forEach(section => {

        const top = section.getBoundingClientRect().top;

        if(top < window.innerHeight - 100){

            section.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealSections);

revealSections();

                                    // Back to top
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if(window.scrollY > 400){

        backToTop.style.display = "block";

    }else{

        backToTop.style.display = "none";

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});