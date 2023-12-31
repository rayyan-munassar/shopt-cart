const productsContainerEl = document.querySelector(".products-container");
const cartIndicator = document.querySelector(".cart-indicator");

// Number of products to display per page and cart data
const productsPerPage = 10;
let cart = {};

// Wait for the DOM to be loaded
window.addEventListener("DOMContentLoaded", () => {
  // Handle search
  const searchInput = document.querySelector(".search-input");
  const searchBtn = document.querySelector(".search-btn");
  const searchForm = document.querySelector(".search-form");

  searchForm.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(searchInput.value);
    const productFound = productsData.filter((product) => {
      return product.title.includes(searchInput.value);
    });
    if (productFound) {
      console.log(productFound);
      renderProducts(productFound);
    }
  });

  let currentPage = 1; // Initialize the current page
  let productsData = []; // Store all products data

  // Function to render products for the current page
  const renderProducts = (data) => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    const productsToDisplay = data.slice(startIndex, endIndex);

    // Generate HTML for the products
    const productsHtml = productsToDisplay.map((product) => {
      const { id, price, title, image } = product;

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
        const product = JSON.parse(event.target.dataset.product);

        const existingCartData = localStorage.getItem("cart");
        if (existingCartData) {
          cart = JSON.parse(existingCartData);
        }

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

        displayNumberOfCartProducts();
      });
    });
  };
  // Number of porducts in Cart
  const displayNumberOfCartProducts = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    cartIndicator.classList.add("bounce");
    cartIndicator.style.color = "green";
    const numberOfProducts = Object.values(storedCart).reduce((accu, curr) => {
      return (accu += curr.quantity);
    }, 0);
    cartIndicator.innerText = `${numberOfProducts}`;
    setTimeout(() => {
      cartIndicator.classList.remove("bounce");
      cartIndicator.style.color = "black";
    }, 350);
  };
  // Fetch API
  fetch("https://fakestoreapi.com/products")
    .then((resp) => resp.json())
    .then((data) => {
      productsData = data;
      renderProducts(productsData);
    });

  // Pagination
  const handlePagination = (direction) => {
    if (direction === "next") {
      currentPage++;
    } else if (direction === "prev") {
      currentPage--;
    }

    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > Math.ceil(productsData.length / productsPerPage)) {
      currentPage = Math.ceil(productsData.length / productsPerPage);
    }
    renderProducts(productsData);
  };

  document.querySelector("#prevPageBtn").addEventListener("click", () => {
    handlePagination("prev");
  });

  document.querySelector("#nextPageBtn").addEventListener("click", () => {
    handlePagination("next");
  });
});
