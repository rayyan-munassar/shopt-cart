<<<<<<< HEAD
# My Awesome Cart Project

This project is a shopping cart implementation that allows users to add products to their cart and view the cart contents. It includes features such as pagination for displaying products and the ability to store specific product information using the data set attribute and JSON serialization.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Overview

The My Awesome Cart Project is a web application that provides a user-friendly shopping cart experience. It allows users to browse through a list of products and add them to their cart. The cart functionality includes pagination, which divides the products into pages to improve readability.

The project also utilizes the data set attribute to store specific product information within the HTML elements. This allows easy retrieval of the product object when a user interacts with the "Add to cart" button. JSON serialization is used to convert the product object into a string representation for storage and subsequent parsing back into a JavaScript object.

## Installation

To set up and run the project locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the project dependencies by running the following command:
4. Start the development server by running the following command:
5. Open your web browser and visit `http://localhost:3000` to access the application.

## Usage

Once the project is set up and running, you can perform the following actions:

- Browse the list of products displayed on the page.
- Navigate between product pages using the pagination controls.
- Click the "Add to cart" button to add a product to your cart.
- View the current contents of your cart, which will be displayed dynamically.

Example code snippet for adding a product to the cart:

```javascript
// Retrieve the product object from the data set attribute
const productButton = document.getElementById("add-to-cart-button");
const productData = JSON.parse(productButton.dataset.product);

// Add the product to the cart
cart.addProduct(productData);
```
=======
# shopt-cart-app
>>>>>>> 407136557ed3cc028d9aa4f63b21ee4cdfd8e1f6
