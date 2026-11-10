
const featuredContainer = document.getElementById("featured-products");

function renderFeaturedProducts() {
    if (!featuredContainer) return;

    featuredContainer.replaceChildren();

    products.slice(0, 4).forEach(product => {
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

        const button = document.createElement("button");
        button.className = "add-to-cart";
        button.textContent = "Add to Cart";
        button.addEventListener("click", () => addToCart(product.id));

        const detailsLink = document.createElement("a");
        detailsLink.href = `product.html?id=${product.id}`;
        detailsLink.className = "view-details";
        detailsLink.textContent = "View Details";

        info.append(category, name, price, button, detailsLink);
        card.append(image, info);

        featuredContainer.appendChild(card);
    });
}

renderFeaturedProducts();
