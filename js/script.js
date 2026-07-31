// Testimonial Carousel Javascript

const track = document.querySelector(".testimonial-track");

const cards = document.querySelectorAll(".testimonial-card");

const nextBtn = document.querySelector(".next");

const prevBtn = document.querySelector(".prev");

const dots = document.querySelectorAll(".dot");


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

setInterval(()=>{

    nextBtn.click();

},10000);

// stop card slide on hover

let autoSlide = setInterval(() => {
    nextBtn.click();
}, 10000);

const slider = document.querySelector(".testimonial-slider");

slider.addEventListener("mouseenter", () => {
    clearInterval(autoSlide);
});

slider.addEventListener("mouseleave", () => {
    autoSlide = setInterval(() => {
        nextBtn.click();
    }, 10000);
});



// Hamburger

const menuBtn = document.querySelector(".menu-toggle");

const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click",()=>{

    navLinks.classList.toggle("active");

});

menuBtn.classList.toggle("open");

// Close Menu After Clicking a Link

const links = document.querySelectorAll(".nav-links a");

links.forEach(link=>{

    link.addEventListener("click",()=>{

        navLinks.classList.remove("active");

    });

});