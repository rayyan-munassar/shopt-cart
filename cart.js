const totalEl = document.querySelector(".cart-total span");
const cartContainer = document.querySelector(".cart-container");

// Get products from storage
const storedCart = localStorage.getItem("cart");
const cart = storedCart ? JSON.parse(storedCart) : {};

let total = 0;
const renderCartInfo = () => {
  const productHTML = Object.entries(cart)
    .map(([key, product]) => {
      total += product.price * product.quantity;
      return `
          <div class="product">
            <img class="product-image" src="${product.image}" alt="" />
            <p class="product-title">${product.title}</p>
            <div>
              <p class="product-price">${product.price}$</p>
              <p class="quantity">quantity: <span>${product.quantity}</span></p>
            </div>
            <button class="btn remove-btn" data-key=${key}>Remove</button>
          </div>
        `;
    })
    .join("");

  cartContainer.innerHTML = productHTML;
  totalEl.innerHTML = `${total}$`;

  // Attach event listeners after adding the product HTML to the cart container
  const removeBtns = document.querySelectorAll(".remove-btn");
  removeBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      console.log(localStorage.removeItem("cart"));
      window.location.reload(true);
      console.log(event.target.dataset.key);
    });
  });
};

renderCartInfo();
