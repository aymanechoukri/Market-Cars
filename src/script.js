let currentSlide = 0;
const slideContainer = document.getElementById("slideContainer");
const dots = document.querySelectorAll(".dot");
const totalSlides = 5;
const slideWidth = 520;

function updateDots() {
  dots.forEach((dot, index) => {
    if (index === currentSlide) {
      dot.classList.add("bg-black");
      dot.classList.remove("bg-gray-400");
    } else {
      dot.classList.remove("bg-black");
      dot.classList.add("bg-gray-400");
    }
  });
}

function moveSlide(direction) {
  currentSlide += direction;

  if (currentSlide < 0) {
    currentSlide = totalSlides - 1;
  } else if (currentSlide >= totalSlides) {
    currentSlide = 0;
  }

  slideContainer.style.transform = `translateX(-${
    currentSlide * slideWidth
  }px)`;
  updateDots();
}

function goToSlide(index) {
  currentSlide = index;
  slideContainer.style.transform = `translateX(-${
    currentSlide * slideWidth
  }px)`;
  updateDots();
}

setInterval(() => {
  moveSlide(1);
}, 5000);

updateDots();

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const hamburgerIcon = document.getElementById("hamburgerIcon");
const closeIcon = document.getElementById("closeIcon");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("hidden");
  hamburgerIcon.classList.toggle("hidden");
  closeIcon.classList.toggle("hidden");
});

const navLinks = navMenu.querySelectorAll("a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 1024) {
      navMenu.classList.add("hidden");
      hamburgerIcon.classList.remove("hidden");
      closeIcon.classList.add("hidden");
    }
  });
});

document.addEventListener("click", (e) => {
  if (window.innerWidth < 1024) {
    if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.add("hidden");
      hamburgerIcon.classList.remove("hidden");
      closeIcon.classList.add("hidden");
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  let lastScrollY = window.scrollY;
  const scrollThreshold = 100;

  function handleScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY === 0) {
      header.style.transform = "translateY(0)";
      return;
    }

    if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
      header.style.transform = "translateY(-100%)";
    } else if (currentScrollY < lastScrollY) {
      header.style.transform = "translateY(0)";
    }

    lastScrollY = currentScrollY;
  }

  let ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  });

  header.style.transition = "transform 0.3s ease-in-out";
});
