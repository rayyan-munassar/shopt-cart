// Get references to DOM elements
const productsContainerEl = document.querySelector(".products-container");
const cartIndicator = document.querySelector(".cart-indicator");

// Number of products to display per page and cart data
const productsPerPage = 10;
let cart = {};

// Wait for the DOM to be loaded
window.addEventListener("DOMContentLoaded", () => {
  let currentPage = 1; // Initialize the current page
  let productsData = []; // Store all products data

  // Function to render products for the current page
  const renderProducts = () => {
    // Calculate the starting and ending indices for the current page
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    // Get the products to display for the current page
    const productsToDisplay = productsData.slice(startIndex, endIndex);

    // Generate HTML for the products
    const productsHtml = productsToDisplay.map((product) => {
      const {
        id,
        price,
        title,
        category: { image },
      } = product;

      const productJson = JSON.stringify({ id, title, price, image });
      return `
    <div class="product">
      <img class="product-image" src="${image}" alt="" />
      <p class="product-title">${title}</p>
      <div>
        <p class="product-price">${price}$</p>
      </div>
      <button class="btn product-btn" data-product='${productJson}'>Add to cart</button>
    </div>
  `;
    });

    // Display the products on the page
    productsContainerEl.innerHTML = productsHtml.join("");

    // Attach event listeners to cart buttons
    const cartBtns = document.querySelectorAll(".product-btn");
    cartBtns.forEach((cartBtn) => {
      cartBtn.addEventListener("click", (event) => {
        // Parse product data from cart button
        const product = JSON.parse(event.target.dataset.product);

        // Ensure that the cart data persists across different pages
        const existingCartData = localStorage.getItem("cart");
        if (existingCartData) {
          cart = JSON.parse(existingCartData);
        }

        // Update quantity of product is exist
        if (cart[product.id]) {
          cart = {
            ...cart,
            [product.id]: {
              ...product,
              quantity: cart[product.id].quantity + 1,
            },
          };
        } else {
          cart = { ...cart, [product.id]: { ...product, quantity: 1 } };
        }
        localStorage.setItem("cart", JSON.stringify(cart));

        // Display how many products in the cart
        displayNumberOfCartProducts();
      });
    });
  };

  const displayNumberOfCartProducts = () => {
    cartIndicator.classList.add("bounce");
    cartIndicator.style.color = "red";

    const storedCart = JSON.parse(localStorage.getItem("cart"));
    const numberOfProducts = Object.values(storedCart).reduce((accu, curr) => {
      return (accu += curr.quantity);
    }, 0);
    console.log(numberOfProducts);
    cartIndicator.innerText = `${numberOfProducts}`;

    setTimeout(() => {
      cartIndicator.classList.remove("bounce");
      cartIndicator.style.color = "black";
    }, 500);
  };

  displayNumberOfCartProducts(); // Display number of products in Cart

  fetch("https://api.escuelajs.co/api/v1/products") // Fetch API
    .then((resp) => resp.json())
    .then((data) => {
      productsData = data; // Store the products data

      renderProducts(); // Render the initial products
    });

  // Function to handle pagination navigation
  const handlePagination = (direction) => {
    if (direction === "next") {
      currentPage++;
    } else if (direction === "prev") {
      currentPage--;
    }

    // Ensure the current page stays within valid limits
    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > Math.ceil(productsData.length / productsPerPage)) {
      currentPage = Math.ceil(productsData.length / productsPerPage);
    }

    renderProducts(); // Render the products for the updated current page
  };
  // Pagination navigation event listeners
  document.querySelector("#prevPageBtn").addEventListener("click", () => {
    handlePagination("prev");
  });

  document.querySelector("#nextPageBtn").addEventListener("click", () => {
    handlePagination("next");
  });
});
