// Navbar active link on click
const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");

        // close mobile menu after click
        navMenu.classList.remove("show");
    });
});


// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});

// Stats counter animation (on every refresh + scroll)
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".stats h2");
    const statsSection = document.querySelector(".stats");

    if (!statsSection || counters.length === 0) return;

    const animateCounter = (counter) => {
        const target = +counter.dataset.target;
        const suffix = counter.dataset.suffix || "";
        let count = 0;
        const speed = target / 80;

        const update = () => {
            count += speed;
            if (count < target) {
                counter.textContent = Math.floor(count);
                requestAnimationFrame(update);
            } else {
                counter.textContent =
                    target >= 1000
                        ? Math.floor(target / 1000) + "K" + suffix
                        : target + suffix;
            }
        };

        // reset before animation (important on refresh)
        counter.textContent = "0";
        update();
    };

    // Trigger animation when stats come into view
    const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                counters.forEach(animateCounter);
                observer.disconnect(); // animate only once per refresh
            }
        },
        { threshold: 0.5 }
    );

    observer.observe(statsSection);
});

// ===== Product Image Slider =====
const mainImg = document.getElementById("main-img");
const thumbs = document.querySelectorAll("#thumbs img");
const leftArrow = document.querySelector(".arrow.left");
const rightArrow = document.querySelector(".arrow.right");

// Images array (same order as thumbnails)
const images = [
    "assest/p4.svg",
    "assest/p5.svg",
    "assest/p6.svg",
    "assest/p7.svg"
];

let currentIndex = 0;

// Show image function
function showImage(index) {
    currentIndex = index;
    mainImg.src = images[index];

    thumbs.forEach((thumb, i) => {
        thumb.classList.toggle("active", i === index);
    });
}

// Left arrow
leftArrow.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
});

// Right arrow
rightArrow.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
});

// Thumbnail click
thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
        showImage(index);
    });
});

// Auto-scroll (3 seconds)
setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}, 3000);

// Initialize
showImage(0);



// collection-section
document.addEventListener("DOMContentLoaded", function () {

    const accordionItems = document.querySelectorAll(".accordion-item");

    accordionItems.forEach(item => {
        const btn = item.querySelector(".accordion-btn");
        const icon = item.querySelector(".accordion-icon");

        btn.addEventListener("click", () => {
            const isActive = item.classList.contains("active");

            // close all
            accordionItems.forEach(other => {
                other.classList.remove("active");
                other.querySelector(".accordion-icon").textContent = "+";
            });

            // open clicked
            if (!isActive) {
                item.classList.add("active");
                icon.textContent = "−";
            }
        });
    });

});

// stats-section
console.log("Stats section loaded");

// Why GTG is the #1 Choice
console.log("GTG comparison loaded");

// footer
document.getElementById("newsletterForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const emailInput = document.getElementById("email");
    const successMessage = document.getElementById("successMessage");

    if (emailInput.checkValidity()) {
        successMessage.style.display = "block";
        emailInput.value = "";
    }
});

