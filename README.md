# ShopSphere 🛍️

A responsive, multi-page mini e-commerce website built using HTML, CSS, and JavaScript.

## About the Project

ShopSphere is a front-end e-commerce demo that allows users to explore products, search and filter the catalogue, view product details, manage a shopping cart, and complete a simulated checkout.

This project was developed as part of InternCircle Project 05.

## Features

- Responsive homepage and product catalogue.
- Search products by name or category.
- Filter products by category.
- Sort products by price and name.
- Individual product details pages.
- Add products to the shopping cart.
- Increase, decrease, and remove cart items.
- Automatic subtotal, delivery fee, and total calculation.
- Cart persistence using LocalStorage.
- Dark and light theme toggle.
- Checkout form with order summary.
- Simulated checkout with no real payments.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Browser LocalStorage

## Project Structure

```text
InternCircle-Project-05/
│
├── index.html
├── shop.html
├── product.html
├── cart.html
├── checkout.html
├── README.md
│
├── css/
│   └── style.css
│
├── js/
│   ├── products.js
│   ├── common.js
│   ├── home.js
│   ├── shop.js
│   ├── product.js
│   ├── cart.js
│   └── checkout.js
│
└── assets/
    └── images/
```

## How to Run

1. Clone or download this repository.
2. Open the project folder in Visual Studio Code.
3. Install the Live Server extension.
4. Right-click `index.html`.
5. Select **Open with Live Server**.

## Cart Calculation

- Subtotal = Sum of product price × quantity.
- Delivery fee = ₹40 when the subtotal is below ₹500 and greater than zero.
- Delivery fee = Free when the subtotal is ₹500 or more.
- Grand Total = Subtotal + Delivery Fee.

## Important Note

ShopSphere is a demonstration project. It does not process real payments or collect payment card information.

## Author

Vivek Sajwan

BCA Student | Web Development Learner