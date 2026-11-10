
const cartItemsContainer = document.getElementById("cart-items");
const cartContent = document.getElementById("cart-content");
const emptyCart = document.getElementById("empty-cart");

const subtotalElement = document.getElementById("subtotal");
const deliveryElement = document.getElementById("delivery-fee");
const grandTotalElement = document.getElementById("grand-total");

const checkoutButton = document.getElementById("checkout-button");


/* =================================
   1. RENDER CART
================================= */

function renderCart() {
    cartItemsContainer.replaceChildren();

    const entries = Object.entries(cart);

    const isEmpty = entries.length === 0;

    emptyCart.hidden = !isEmpty;
    cartContent.hidden = isEmpty;

    if (isEmpty) {
        return;
    }

    entries.forEach(([id, quantity]) => {
        const product = products.find(
            item => item.id === Number(id)
        );

        if (!product) return;

        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = `${product.image} ${product.name}`;

        const priceCell = document.createElement("td");
        priceCell.textContent = formatPrice(product.price);

        const quantityCell = document.createElement("td");

        const controls = document.createElement("div");
        controls.className = "quantity-controls";

        const decreaseButton = document.createElement("button");
        decreaseButton.textContent = "−";
        decreaseButton.dataset.action = "decrease";
        decreaseButton.dataset.id = id;
        decreaseButton.setAttribute(
            "aria-label",
            `Decrease ${product.name} quantity`
        );

        const quantityText = document.createElement("span");
        quantityText.textContent = quantity;

        const increaseButton = document.createElement("button");
        increaseButton.textContent = "+";
        increaseButton.dataset.action = "increase";
        increaseButton.dataset.id = id;
        increaseButton.setAttribute(
            "aria-label",
            `Increase ${product.name} quantity`
        );

        controls.append(
            decreaseButton,
            quantityText,
            increaseButton
        );

        quantityCell.appendChild(controls);

        const totalCell = document.createElement("td");
        totalCell.textContent = formatPrice(
            product.price * quantity
        );

        const actionCell = document.createElement("td");

        const removeButton = document.createElement("button");
        removeButton.className = "remove-button";
        removeButton.textContent = "Remove";
        removeButton.dataset.action = "remove";
        removeButton.dataset.id = id;

        actionCell.appendChild(removeButton);

        row.append(
            nameCell,
            priceCell,
            quantityCell,
            totalCell,
            actionCell
        );

        cartItemsContainer.appendChild(row);
    });

    updateCartSummary();
}


/* =================================
   2. UPDATE PRICE SUMMARY
================================= */

function updateCartSummary() {
    const totals = calculateTotals();

    subtotalElement.textContent = formatPrice(totals.subtotal);
    deliveryElement.textContent = formatPrice(totals.delivery);
    grandTotalElement.textContent = formatPrice(totals.total);
}


/* =================================
   3. CART BUTTON EVENTS
================================= */

cartItemsContainer.addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const { action, id } = button.dataset;

    if (action === "increase") {
        changeQuantity(id, 1);
    }

    if (action === "decrease") {
        changeQuantity(id, -1);
    }

    if (action === "remove") {
        removeItem(id);
    }

    renderCart();
});


/* =================================
   4. CHECKOUT NAVIGATION
================================= */

checkoutButton.addEventListener("click", () => {
    if (Object.keys(cart).length === 0) return;

    window.location.href = "checkout.html";
});


/* =================================
   5. INITIALIZE CART PAGE
================================= */

renderCart();
