// ==== Displayer punch of products per page && cart functionality ====

// Define the number of products to display per page and the cart var
const productsPerPage = 10;
let cart = {};

window.addEventListener("DOMContentLoaded", () => {
  let currentPage = 1; // Initialize the current page
  let productsData = []; // Store all products data
  let productsContainer = document.querySelector(".products-container");

  // Function to render the products for the current page
  const renderProducts = () => {
    // Calculate the starting and ending indices for the current page
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    // Get the products to display for the current page
    const productsToDisplay = productsData.slice(startIndex, endIndex);

    // Generate the HTML for the products
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

    // Set the HTML content of the products container
    productsContainer.innerHTML = productsHtml.join("");
    // Adding events listener for each btn and parse JSON data
    const cartBtns = document.querySelectorAll(".product-btn");
    cartBtns.forEach((cartBtn) => {
      cartBtn.addEventListener("click", (event) => {
        const product = JSON.parse(event.target.dataset.product);
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
        console.log(cart);
        localStorage.setItem("cart", JSON.stringify(cart));
      });
    });
  };

  // Fetch the products data
  fetch("https://api.escuelajs.co/api/v1/products")
    .then((resp) => resp.json())
    .then((data) => {
      productsData = data; // Store the products data

      renderProducts(); // Render the initial products

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
        } else if (
          currentPage > Math.ceil(productsData.length / productsPerPage) // num of pages
        ) {
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
});
