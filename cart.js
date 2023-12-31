const totalEl = document.querySelector(".cart-total span");
const cartContainer = document.querySelector(".cart-container");
const clearBtn = document.querySelector(".clear-btn");

clearBtn.addEventListener("click", () => {
  localStorage.removeItem("cart");
  window.location.reload(true);
});

// Get products from storage
const storedCart = localStorage.getItem("cart");
let cart = storedCart ? JSON.parse(storedCart) : {};

// Calc total
let total = 0;
const calcTotal = () => {
 total = Object.values(cart).reduce((accu, product) => {
    return accu + product.price * product.quantity;
  }, 0);
  return total
};

// Display cart products
const renderCart = () => {
  const productHTML = Object.entries(cart)
    .map(([key, product]) => {
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
    
    calcTotal();
  totalEl.innerHTML = `${parseInt(calcTotal())}$`;

  // Remove btn
  const removeBtns = document.querySelectorAll(".remove-btn");
  removeBtns.forEach((removeBtn) => {
    removeBtn.addEventListener("click", (event) => {
      const key = event.target.dataset.key;
      if (cart[key].quantity == 1) {
        delete cart[key];
      } else {
        cart[key].quantity = cart[key].quantity - 1;
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
      calcTotal();
    });
  });
};

renderCart();
