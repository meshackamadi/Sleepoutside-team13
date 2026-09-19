import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  if (cartItems && cartItems.length > 0) {
    // If it is somehow a single object, we can wrap it in an array to avoid map errors on old data
    const itemsArray = Array.isArray(cartItems) ? cartItems : [cartItems];
    const htmlItems = itemsArray.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    
    // Calculate total
    let total = 0;
    itemsArray.forEach((item) => {
      total += item.FinalPrice;
    });

    // Show the footer and display total
    const cartFooter = document.querySelector(".cart-footer");
    const cartTotal = document.querySelector(".cart-total");
    cartTotal.innerHTML = `Total: $${total}`;
    cartFooter.classList.remove("hide");
  } else {
    document.querySelector(".product-list").innerHTML =
      "<p>Your cart is empty.</p>";
    document.querySelector(".cart-footer").classList.add("hide");
  }
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
