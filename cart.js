const cartContainer = document.querySelector(".cart-container");

const storedCart = localStorage.getItem("cart");
const cart = storedCart ? JSON.parse(storedCart) : {};

console.log(cart);

const productHTML = Object.values(cart).map((product) => {
  return `
    <div class="product">
    <img
      class="product-image"
      src="${product.image}"
      alt=""
    />
    <p class="product-title">${product.title}</p>
    <div>
      <p class="product-price">${product.price}$</p>
      <p class="quantity">quantity: <apan>${product.quantity}</apan></p>
    </div>
    <button class="btn remove-btn">Remove</button>
  </div>
</div>
    
    `;
});

cartContainer.innerHTML = productHTML.join("");
