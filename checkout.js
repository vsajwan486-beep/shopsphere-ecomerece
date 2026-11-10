
const checkoutLayout = document.getElementById("checkout-layout");
const emptyCheckout = document.getElementById("empty-checkout");
const checkoutItems = document.getElementById("checkout-items");

const checkoutSubtotal = document.getElementById("checkout-subtotal");
const checkoutDelivery = document.getElementById("checkout-delivery");
const checkoutTotal = document.getElementById("checkout-total");

const checkoutForm = document.getElementById("checkout-form");
const orderSuccess = document.getElementById("order-success");
const successMessage = document.getElementById("success-message");


/* =================================
   1. RENDER ORDER SUMMARY
================================= */

function renderCheckout() {
    checkoutItems.replaceChildren();

    const entries = Object.entries(cart);

    if (entries.length === 0) {
        checkoutLayout.hidden = true;
        emptyCheckout.hidden = false;
        return;
    }

    emptyCheckout.hidden = true;
    checkoutLayout.hidden = false;

    entries.forEach(([id, quantity]) => {
        const product = products.find(
            item => item.id === Number(id)
        );

        if (!product) return;

        const item = document.createElement("div");
        item.className = "checkout-item";

        const itemName = document.createElement("span");
        itemName.textContent = `${product.image} ${product.name} × ${quantity}`;

        const itemPrice = document.createElement("strong");
        itemPrice.textContent = formatPrice(
            product.price * quantity
        );

        item.append(itemName, itemPrice);
        checkoutItems.appendChild(item);
    });

    updateCheckoutTotals();
}


/* =================================
   2. UPDATE TOTALS
================================= */

function updateCheckoutTotals() {
    const totals = calculateTotals();

    checkoutSubtotal.textContent = formatPrice(totals.subtotal);
    checkoutDelivery.textContent = formatPrice(totals.delivery);
    checkoutTotal.textContent = formatPrice(totals.total);
}


/* =================================
   3. CONFIRM DEMO ORDER
================================= */

checkoutForm.addEventListener("submit", event => {
    event.preventDefault();

    if (Object.keys(cart).length === 0) {
        alert("Your cart is empty.");
        renderCheckout();
        return;
    }

    if (!checkoutForm.reportValidity()) return;

    const customerName = document
        .getElementById("customer-name")
        .value.trim();

    if (!customerName) return;

    successMessage.textContent =
        `Thank you, ${customerName}! Your demo order has been confirmed.`;

    checkoutLayout.hidden = true;
    orderSuccess.hidden = false;

    // Clear cart after successful demo confirmation.
    cart = {};

    saveCart();
    updateCartCount();
});


/* =================================
   4. INITIALIZE CHECKOUT
================================= */

renderCheckout();
