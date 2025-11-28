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
}, 3000);

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

const selectionModels = document.getElementById("selection-models");
const cars = document.getElementById("cars");

const carss = [
  {
    category: "bmw s1",
    img: "https://images.pexels.com/photos/29580162/pexels-photo-29580162.jpeg",
    title: "BMW Sport S1",
    price: "100,000$"
  },

  {
    category: "bmw s1",
    img: "https://images.pexels.com/photos/25691078/pexels-photo-25691078.png",
    title: "BMW class S1",
    price: "10,000$"
  },

  {
    category: "bmw s1",
    img: "https://images.pexels.com/photos/29580174/pexels-photo-29580174.jpeg",
    title: "BMW Flagship",
    price: "50,000$"
  },

  {
    category: "bmw x2",
    img: "https://images.pexels.com/photos/29098232/pexels-photo-29098232.jpeg",
    title: "BMW Executive",
    price: "500,000$"
  },

  {
    category: "bmw x2",
    img: "https://images.pexels.com/photos/7154531/pexels-photo-7154531.jpeg",
    title: "BMW Executive Class",
    price: "500,000$"
  },

  {
    category: "bmw x2",
    img: "https://images.pexels.com/photos/9411660/pexels-photo-9411660.jpeg",
    title: "BMW Sports Activity",
    price: "505,000$"
  },

  {
    category: "bmw x5",
    img: "https://images.pexels.com/photos/14776716/pexels-photo-14776716.jpeg",
    title: "BMW x5 class",
    price: "600,000$"
  },

  {
    category: "bmw x5",
    img: "https://images.pexels.com/photos/12175734/pexels-photo-12175734.jpeg",
    title: "BMW X5 Class Man",
    price: "300,000$"
  },

  {
    category: "bmw x5",
    img: "https://images.pexels.com/photos/18688742/pexels-photo-18688742.jpeg",
    title: "BMW X5 Sport",
    price: "700,000$"
  },
];


function selectorCars(str) {
  const current = str === "all"
  ?carss
  :carss.filter(car => car.category === str);
  return current
    .map(car => {
      return `
        <div class="car-card bg-white rounded-lg shadow-md p-4 gap-8 w-[500px] shadow-lg">
          <img src="${car.img}" alt="${car.title}" class="w-full h-48 object-cover rounded-lg mb-4 transition-transform duration-300 hover:scale-x-75">
          <div class="flex justify-between p-2 items-center ">
            <h3 class="text-xl font-bold text-black">${car.title}</h3>
            <span class="text-lg text-red-500">${car.price}</span>
          </div>
          <button class="mt-4 bg-white text-white p-3 rounded-full hover:bg-blue-700 transition">
    <img src="image/basket.svg" alt="Add to cart" class="w-5 h-5">
</button>
        </div>
      `;
    }).join("");
};

selectionModels.addEventListener("change", () => {
    cars.innerHTML = selectorCars(selectionModels.value);
});

cars.innerHTML = selectorCars("all");