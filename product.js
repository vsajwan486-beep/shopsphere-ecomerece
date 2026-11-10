
/* =================================
   1. GET PRODUCT ELEMENTS
================================= */

const detailsContainer = document.getElementById("product-details");
const notFoundContainer = document.getElementById("product-not-found");


/* =================================
   2. RENDER PRODUCT DETAILS
================================= */

function renderProductDetails() {

    // Get product ID from URL
    const params = new URLSearchParams(window.location.search);
    const productId = Number(params.get("id"));

    // Find matching product
    const product = products.find(
        item => item.id === productId
    );

    // Handle invalid product ID
    if (!product) {
        detailsContainer.hidden = true;
        notFoundContainer.hidden = false;
        return;
    }

    detailsContainer.hidden = false;
    notFoundContainer.hidden = true;
    detailsContainer.replaceChildren();


    /* =================================
       3. PRODUCT IMAGE
    ================================= */

    const imageContainer = document.createElement("div");
    imageContainer.className = "product-details-image";
    imageContainer.textContent = product.image;


    /* =================================
       4. PRODUCT INFORMATION
    ================================= */

    const info = document.createElement("div");
    info.className = "product-details-info";

    // Category
    const category = document.createElement("p");
    category.className = "product-category";
    category.textContent = product.category;

    // Product name
    const name = document.createElement("h1");
    name.textContent = product.name;

    // Product price
    const price = document.createElement("p");
    price.className = "details-price";
    price.textContent = formatPrice(product.price);

    // Product description
    const description = document.createElement("p");
    description.className = "product-description";
    description.textContent = product.description;

    // Delivery information
    const deliveryInfo = document.createElement("p");
    deliveryInfo.className = "delivery-info";
    deliveryInfo.textContent =
        "🚚 Free delivery on orders of ₹500 or more.";


    /* =================================
       5. PRODUCT QUANTITY
    ================================= */

    const quantityLabel = document.createElement("label");
    quantityLabel.textContent = "Quantity";
    quantityLabel.htmlFor = "product-quantity";

    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.id = "product-quantity";
    quantityInput.min = "1";
    quantityInput.max = "99";
    quantityInput.value = "1";
    quantityInput.step = "1";
    quantityInput.className = "product-quantity";


    /* =================================
       6. ADD TO CART BUTTON
    ================================= */

    const addButton = document.createElement("button");
    addButton.className = "add-to-cart details-add-button";
    addButton.textContent = "Add to Cart";

    addButton.addEventListener("click", () => {

        const quantity = Number(quantityInput.value);

        // Validate quantity
        if (
            !Number.isInteger(quantity) ||
            quantity < 1 ||
            quantity > 99
        ) {
            alert("Please enter a quantity between 1 and 99.");
            return;
        }

        // Add selected quantity to cart
        if (addMultipleToCart(product.id, quantity)) {
            alert(`${quantity} × ${product.name} added to cart!`);
        }

    });


    /* =================================
       7. APPEND PRODUCT ELEMENTS
    ================================= */

    info.append(
        category,
        name,
        price,
        description,
        deliveryInfo,
        quantityLabel,
        quantityInput,
        addButton
    );

    detailsContainer.append(
        imageContainer,
        info
    );

}


/* =================================
   8. INITIALIZE PRODUCT PAGE
================================= */

renderProductDetails();
