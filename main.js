document.addEventListener("DOMContentLoaded", () => {
  console.log("SCRIPT IS WORKING");

  // --- 1. GLOBAL SETUP & SMOOTH SCROLLING ---
  const internalLinks = document.querySelectorAll(
    "nav a, a.section-link, a.btn-primary"
  );

  internalLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href && href.startsWith("#")) {
        e.preventDefault();

        const targetElement = document.querySelector(href);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });

// ===== DAILY INCREASING METRICS =====

const startDate = new Date("2026-08-01"); // Website launch date

const today = new Date();

const differenceTime = today - startDate;

const daysPassed = Math.floor(
    differenceTime / (1000 * 60 * 60 * 24)
);


// Starting numbers

let visitors = 10000;
let projects = 50;
let clients = 5000;


// Increase 2 every day

visitors += daysPassed * 2;
projects += daysPassed * 2;
clients += daysPassed * 2;


// Display numbers with animation

function animateNumber(element, value){

    let current = 0;

    let speed = Math.ceil(value / 100);

    let timer = setInterval(()=>{

        current += speed;

        if(current >= value){

            current = value;
            clearInterval(timer);

        }

        element.innerText = current.toLocaleString() + "+";

    },20);

}


animateNumber(
    document.getElementById("visitor-count"),
    visitors
);


animateNumber(
    document.getElementById("active-projects-count"),
    projects
);


animateNumber(
    document.getElementById("happy-clients-count"),
    clients
);

  // --- 3. TESTIMONIAL CAROUSEL SLIDER ---
  const testimonialTrack = document.getElementById("testimonialTrack");
  const cards = document.querySelectorAll(".simple-testi-card");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentIndex = 0;

  function updateCarousel() {
    if (!testimonialTrack || cards.length === 0) return;

    let visibleCards =
      window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1;
    let maxIndex = Math.max(0, cards.length - visibleCards);

    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;

    const cardWidthPercent = 100 / visibleCards;
    const movePercentage = currentIndex * cardWidthPercent;
    testimonialTrack.style.transform = `translateX(-${movePercentage}%)`;
  }

  if (prevBtn && nextBtn && testimonialTrack) {
    nextBtn.addEventListener("click", () => {
      let visibleCards =
        window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1;
      let maxIndex = cards.length - visibleCards;
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
      }
    });

    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });
    
    window.addEventListener("resize", updateCarousel);
  }
});

// ===== SCROLL ANIMATION ====//
const animateItems = document.querySelectorAll(
    ".content-card, .metric-card, .process-step, .feedback-card, .location-box, .enquiry-form, .stats-bar, .footer-cta, .section-header"
);

animateItems.forEach(item => {
    item.classList.add("scroll-animate");
});


const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

}, {
    threshold: 0.2
});


animateItems.forEach(item=>{
    observer.observe(item);
});
