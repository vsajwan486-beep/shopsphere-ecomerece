
/* =================================
   1. PRICE FORMATTER
================================= */

function formatPrice(amount) {
    return amount.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2
    });
}


/* =================================
   2. CART STORAGE
================================= */

function loadCart() {
    try {
        const savedCart = JSON.parse(
            localStorage.getItem("shopSphereCart") || "{}"
        );

        if (
            !savedCart ||
            typeof savedCart !== "object" ||
            Array.isArray(savedCart)
        ) {
            return {};
        }

        const validCart = {};

        Object.entries(savedCart).forEach(([id, quantity]) => {
            const exists = products.some(
                product => product.id === Number(id)
            );

            if (
                exists &&
                Number.isInteger(quantity) &&
                quantity > 0 &&
                quantity <= 99
            ) {
                validCart[id] = quantity;
            }
        });

        return validCart;

    } catch (error) {
        console.error("Cart loading failed:", error);
        return {};
    }
}

let cart = loadCart();


function saveCart() {
    try {
        localStorage.setItem(
            "shopSphereCart",
            JSON.stringify(cart)
        );
    } catch (error) {
        console.error("Unable to save cart:", error);
    }
}


/* =================================
   3. CART OPERATIONS
================================= */

function addMultipleToCart(id, quantity) {
    const product = products.find(
        item => item.id === Number(id)
    );

    if (!product) return false;

    const currentQuantity = cart[id] || 0;

    if (
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        currentQuantity + quantity > 99
    ) {
        alert("Maximum quantity allowed is 99.");
        return false;
    }

    cart[id] = currentQuantity + quantity;

    saveCart();
    updateCartCount();

    return true;
}


function addToCart(id) {
    const product = products.find(
        item => item.id === Number(id)
    );

    if (!product) return;

    if (addMultipleToCart(id, 1)) {
        alert(`${product.name} added to cart!`);
    }
}


function changeQuantity(id, delta) {
    if (!cart[id]) return;

    const newQuantity = cart[id] + delta;

    if (newQuantity <= 0) {
        delete cart[id];
    } else if (newQuantity <= 99) {
        cart[id] = newQuantity;
    }

    saveCart();
    updateCartCount();
}


function removeItem(id) {
    delete cart[id];

    saveCart();
    updateCartCount();
}


/* =================================
   4. CALCULATE TOTALS
================================= */

function calculateTotals() {
    const subtotal = Object.entries(cart).reduce(
        (sum, [id, quantity]) => {
            const product = products.find(
                item => item.id === Number(id)
            );

            if (!product) return sum;

            return sum + product.price * quantity;
        },
        0
    );

    const delivery =
        subtotal > 0 && subtotal < 500 ? 40 : 0;

    return {
        subtotal,
        delivery,
        total: subtotal + delivery
    };
}


/* =================================
   5. UPDATE CART COUNT
================================= */

function updateCartCount() {
    const countElement = document.getElementById("cart-count");

    if (!countElement) return;

    const totalItems = Object.values(cart).reduce(
        (sum, quantity) => sum + quantity,
        0
    );

    countElement.textContent = totalItems;
}


/* =================================
   6. THEME MANAGEMENT
================================= */

function applyTheme(theme) {
    document.body.classList.toggle(
        "light-theme",
        theme === "light"
    );

    const themeButton = document.getElementById("theme-toggle");

    if (themeButton) {
        themeButton.textContent =
            theme === "light" ? "🌙" : "☀️";

        themeButton.setAttribute(
            "aria-label",
            theme === "light"
                ? "Switch to dark theme"
                : "Switch to light theme"
        );
    }
}


function initializeTheme() {
    const savedTheme = localStorage.getItem("shopSphereTheme");

    applyTheme(savedTheme === "light" ? "light" : "dark");
}


function setupThemeToggle() {
    const themeButton = document.getElementById("theme-toggle");

    if (!themeButton) return;

    themeButton.addEventListener("click", () => {
        const newTheme = document.body.classList.contains("light-theme")
            ? "dark"
            : "light";

        applyTheme(newTheme);

        localStorage.setItem("shopSphereTheme", newTheme);
    });
}


/* =================================
   7. INITIALIZE SHARED FEATURES
================================= */

document.addEventListener("DOMContentLoaded", () => {
    initializeTheme();
    setupThemeToggle();
    updateCartCount();
});
