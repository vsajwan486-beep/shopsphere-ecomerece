
const shopGrid = document.getElementById("shop-product-grid");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const sortFilter = document.getElementById("sort-filter");
const productCount = document.getElementById("product-count");
const noProducts = document.getElementById("no-products");

function renderShopProducts() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;
    const sortOption = sortFilter.value;

    let filteredProducts = products.filter(product => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm);

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    if (sortOption === "low-high") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-low") {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortOption === "name") {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    shopGrid.replaceChildren();

    productCount.textContent = `${filteredProducts.length} Products`;
    noProducts.hidden = filteredProducts.length !== 0;

    filteredProducts.forEach(product => {
        const card = document.createElement("article");
        card.className = "product-card";

        const image = document.createElement("div");
        image.className = "product-image";
        image.textContent = product.image;

        const info = document.createElement("div");
        info.className = "product-info";

        const category = document.createElement("p");
        category.className = "product-category";
        category.textContent = product.category;

        const name = document.createElement("h3");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.className = "product-price";
        price.textContent = formatPrice(product.price);

        const addButton = document.createElement("button");
        addButton.className = "add-to-cart";
        addButton.textContent = "Add to Cart";

        addButton.addEventListener("click", () => {
            addToCart(product.id);
        });

        const detailsLink = document.createElement("a");
        detailsLink.href = `product.html?id=${product.id}`;
        detailsLink.className = "view-details";
        detailsLink.textContent = "View Details";

        info.append(category, name, price, addButton, detailsLink);
        card.append(image, info);

        shopGrid.appendChild(card);
    });
}

// Search products
searchInput.addEventListener("input", renderShopProducts);

// Filter categories
categoryFilter.addEventListener("change", renderShopProducts);

// Sort products
sortFilter.addEventListener("change", renderShopProducts);

// Read category from homepage URL
const urlParams = new URLSearchParams(window.location.search);
const requestedCategory = urlParams.get("category");

const validCategories = [
    "Electronics",
    "Fashion",
    "Home",
    "Accessories"
];

if (validCategories.includes(requestedCategory)) {
    categoryFilter.value = requestedCategory;
}

// Initial rendering
renderShopProducts();
