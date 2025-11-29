// Cart data structure with localStorage
let cartItems = [];

// Load cart from localStorage on page load
function loadCartFromStorage() {
    try {
        const savedCart = localStorage.getItem('carDealershipCart');
        if (savedCart) {
            cartItems = JSON.parse(savedCart);
        }
    } catch (error) {
        console.error('Error loading cart from storage:', error);
        cartItems = [];
    }
}

// Save cart to localStorage
function saveCartToStorage() {
    try {
        localStorage.setItem('carDealershipCart', JSON.stringify(cartItems));
    } catch (error) {
        console.error('Error saving cart to storage:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadCartFromStorage();
    initializeSlider();
    initializeMenu();
    initializeHeaderScroll();
    initializeCars();
    initializeCart();
    updateCartBadge();
});

function initializeSlider() {
    const slideContainer = document.getElementById("slideContainer");
    const dots = document.querySelectorAll(".dot");
    
    if (!slideContainer || dots.length === 0) return;

    let currentSlide = 0;
    const slides = document.querySelectorAll('#slideContainer > div');
    const totalSlides = slides.length;
    
    function getSlideWidth() {
        if (window.innerWidth >= 1024) return 60;
        if (window.innerWidth >= 768) return 80;
        return 100;
    }

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle("bg-black", index === currentSlide);
            dot.classList.toggle("bg-gray-400", index !== currentSlide);
        });
    }

    function moveSlide(direction) {
        currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
        updateSlidePosition();
    }

    function updateSlidePosition() {
        const slideWidth = getSlideWidth();
        const gapPercent = (24 / window.innerWidth) * 100;
        const translateX = currentSlide * (slideWidth + gapPercent);
        slideContainer.style.transform = `translateX(-${translateX}%)`;
        updateDots();
    }

    function goToSlide(index) {
        if (index >= 0 && index < totalSlides) {
            currentSlide = index;
            updateSlidePosition();
        }
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    let slideInterval = setInterval(() => moveSlide(1), 4000);

    const slider = slideContainer.parentElement;
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => moveSlide(1), 4000);
    });

    window.addEventListener('resize', updateSlidePosition);

    window.moveSlide = moveSlide;
    window.goToSlide = goToSlide;

    updateDots();
}

function initializeMenu() {
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const hamburgerIcon = document.getElementById("hamburgerIcon");
    const closeIcon = document.getElementById("closeIcon");

    if (!menuToggle || !navMenu) return;

    function closeMenu() {
        navMenu.classList.add("hidden");
        hamburgerIcon.classList.remove("hidden");
        closeIcon.classList.add("hidden");
    }

    function toggleMenu() {
        const isHidden = navMenu.classList.contains("hidden");
        navMenu.classList.toggle("hidden");
        hamburgerIcon.classList.toggle("hidden", !isHidden);
        closeIcon.classList.toggle("hidden", isHidden);
    }

    menuToggle.addEventListener("click", toggleMenu);

    navMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth < 1024) closeMenu();
        });
    });

    document.addEventListener("click", (e) => {
        if (window.innerWidth < 1024 && 
            !menuToggle.contains(e.target) && 
            !navMenu.contains(e.target)) {
            closeMenu();
        }
    });
}

function initializeHeaderScroll() {
    const header = document.querySelector("header");
    if (!header) return;

    let lastScrollY = window.scrollY;
    const scrollThreshold = 100;

    function handleScroll() {
        const currentScrollY = window.scrollY;

        if (currentScrollY === 0) {
            header.style.transform = "translateY(0)";
        } else if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
            header.style.transform = "translateY(-100%)";
        } else if (currentScrollY < lastScrollY) {
            header.style.transform = "translateY(0)";
        }

        lastScrollY = currentScrollY;
    }

    let ticking = false;
    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    header.style.transition = "transform 0.3s ease-in-out";
}

function initializeCars() {
    const selectionModels = document.getElementById("selection-models");
    const carsContainer = document.getElementById("cars");

    if (!selectionModels || !carsContainer) return;

    const cars = [
        { id: 1, category: "bmw s1", img: "https://images.pexels.com/photos/29580162/pexels-photo-29580162.jpeg", title: "BMW Sport S1", price: 100000 },
        { id: 2, category: "bmw s1", img: "https://images.pexels.com/photos/25691078/pexels-photo-25691078.png", title: "BMW class S1", price: 10000 },
        { id: 3, category: "bmw s1", img: "https://images.pexels.com/photos/29580174/pexels-photo-29580174.jpeg", title: "BMW Flagship", price: 50000 },
        { id: 4, category: "bmw x2", img: "https://images.pexels.com/photos/29098232/pexels-photo-29098232.jpeg", title: "BMW Executive", price: 500000 },
        { id: 5, category: "bmw x2", img: "https://images.pexels.com/photos/7154531/pexels-photo-7154531.jpeg", title: "BMW Executive Class", price: 500000 },
        { id: 6, category: "bmw x2", img: "https://images.pexels.com/photos/9411660/pexels-photo-9411660.jpeg", title: "BMW Sports Activity", price: 505000 },
        { id: 7, category: "bmw x5", img: "https://images.pexels.com/photos/14776716/pexels-photo-14776716.jpeg", title: "BMW x5 class", price: 600000 },
        { id: 8, category: "bmw x5", img: "https://images.pexels.com/photos/12175734/pexels-photo-12175734.jpeg", title: "BMW X5 Class Man", price: 300000 },
        { id: 9, category: "bmw x5", img: "https://images.pexels.com/photos/18688742/pexels-photo-18688742.jpeg", title: "BMW X5 Sport", price: 700000 }
    ];

    function formatPrice(price) {
        return `$${price.toLocaleString()}`;
    }

    function renderCarCard(car) {
        return `
            <div class="car-card bg-white rounded-lg shadow-md p-4 gap-8 w-full max-w-[500px]">
                <img src="${car.img}" alt="${car.title}" class="w-full h-48 object-cover rounded-lg mb-4 transition-transform duration-300 hover:scale-105">
                <div class="flex justify-between p-2 items-center">
                    <h3 class="text-xl font-bold text-black">${car.title}</h3>
                    <span class="text-lg text-red-500">${formatPrice(car.price)}</span>
                </div>
                <button class="mt-4 w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition add-to-cart" data-car-id="${car.id}">
                    Add to Cart
                </button>
            </div>
        `;
    }

    function filterCars(category) {
        const filtered = category === "all" ? cars : cars.filter(car => car.category === category);
        carsContainer.innerHTML = filtered.map(renderCarCard).join("");
    }

    selectionModels.addEventListener("change", () => filterCars(selectionModels.value));
    
    // Delegate event handling for add to cart buttons
    carsContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("add-to-cart")) {
            const carId = parseInt(e.target.dataset.carId);
            const car = cars.find(c => c.id === carId);
            if (car) addToCart(car);
        }
    });

    filterCars("all");
}

function initializeCart() {
    const basketBtn = document.getElementById("basket");
    const popup = document.getElementById("popap");
    const closeBtn = document.getElementById("closebtn");
    const cartContainer = document.getElementById("add-basket");

    if (!basketBtn || !popup || !closeBtn || !cartContainer) return;

    basketBtn.addEventListener("click", () => {
        popup.hidden = !popup.hidden;
        renderCart();
    });

    closeBtn.addEventListener("click", () => {
        popup.hidden = true;
    });

    // Delegate cart item actions
    cartContainer.addEventListener("click", (e) => {
        const buyBtn = e.target.closest(".buy-btn");
        const deleteBtn = e.target.closest(".delete-btn");

        if (buyBtn) {
            const carId = parseInt(buyBtn.dataset.carId);
            handlePurchase(carId);
        } else if (deleteBtn) {
            const carId = parseInt(deleteBtn.dataset.carId);
            removeFromCart(carId);
        }
    });
}

function addToCart(car) {
    const existingItem = cartItems.find(item => item.id === car.id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({ ...car, quantity: 1 });
    }
    
    saveCartToStorage();
    updateCartBadge();
    showNotification(`${car.title} added to cart!`);
}

function removeFromCart(carId) {
    cartItems = cartItems.filter(item => item.id !== carId);
    saveCartToStorage();
    renderCart();
    updateCartBadge();
}

function renderCart() {
    const cartContainer = document.getElementById("add-basket");
    if (!cartContainer) return;

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p class="text-center text-gray-500 p-4">Your cart is empty</p>';
        return;
    }

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartContainer.innerHTML = `
        ${cartItems.map(item => `
            <div class="cart-item bg-white rounded-lg shadow-md p-4 mb-4">
                <img src="${item.img}" alt="${item.title}" class="w-full h-32 object-cover rounded-lg mb-2">
                <h3 class="text-lg font-bold">${item.title}</h3>
                <div class="flex justify-between items-center mt-2">
                    <span class="text-red-500">$${item.price.toLocaleString()}</span>
                    <span class="text-gray-600">Qty: ${item.quantity}</span>
                </div>
                <div class="flex gap-2 mt-3">
                    <button class="buy-btn bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex-1" data-car-id="${item.id}">
                        Buy Now
                    </button>
                    <button class="delete-btn bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition" data-car-id="${item.id}">
                        Remove
                    </button>
                </div>
            </div>
        `).join("")}
        <div class="total-section bg-gray-100 p-4 rounded-lg mt-4">
            <div class="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span class="text-green-600">$${total.toLocaleString()}</span>
            </div>
        </div>
    `;
}

function updateCartBadge() {
    const badge = document.getElementById("cart-badge");
    if (badge) {
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        badge.textContent = totalItems;
        badge.hidden = totalItems === 0;
    }
}

function handlePurchase(carId) {
    const item = cartItems.find(item => item.id === carId);
    if (item) {
        showNotification(`Processing purchase for ${item.title}...`);
        // Remove item from cart after purchase
        removeFromCart(carId);
        // Add actual purchase logic here
    }
}

// Clear entire cart
function clearCart() {
    cartItems = [];
    saveCartToStorage();
    renderCart();
    updateCartBadge();
    showNotification('Cart cleared!');
}

// Update quantity of specific item
function updateQuantity(carId, newQuantity) {
    const item = cartItems.find(item => item.id === carId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(carId);
        } else {
            item.quantity = newQuantity;
            saveCartToStorage();
            renderCart();
            updateCartBadge();
        }
    }
}

function showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in";
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}