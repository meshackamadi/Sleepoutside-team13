import { getLocalStorage, updateCartCount, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter("/partials/header.html", "/partials/footer.html");

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const baseUrl = import.meta.env.BASE_URL || "/";
  const checkoutBtn = document.querySelector("#checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.href = `${baseUrl}checkout/index.html`;
  }

  if (cartItems && cartItems.length > 0) {
    const itemsArray = Array.isArray(cartItems) ? cartItems : [cartItems];
    const htmlItems = itemsArray.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    // Calculate total
    let total = 0;
    itemsArray.forEach((item) => {
      total += (item.FinalPrice || item.price || 0);
    });

    // Show footer and display total
    const cartFooter = document.querySelector(".cart-footer");
    const cartTotal = document.querySelector(".cart-total");
    if (cartTotal) {
      cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
    }
    if (cartFooter) {
      cartFooter.classList.remove("hide");
    }
  } else {
    document.querySelector(".product-list").innerHTML =
      "<p>Your cart is empty.</p>";
    const cartFooter = document.querySelector(".cart-footer");
    if (cartFooter) {
      cartFooter.classList.add("hide");
    }
  }
}

function cartItemTemplate(item) {
  const colorName = item.Colors?.[0]?.ColorName || "";
  const price = item.FinalPrice || item.price || 0;
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
  <p class="cart-card__color">${colorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${Number(price).toFixed(2)}</p>
</li>`;

  return newItem;
}

renderCartContents();
updateCartCount();
