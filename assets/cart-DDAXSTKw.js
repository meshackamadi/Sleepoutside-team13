import{l,g as n}from"./utils-CYjq4TMC.js";/* empty css              */l();function i(){const r=n("so-cart");if(r&&r.length>0){const t=Array.isArray(r)?r:[r],c=t.map(e=>d(e));document.querySelector(".product-list").innerHTML=c.join("");let a=0;t.forEach(e=>{a+=e.FinalPrice});const o=document.querySelector(".cart-footer"),s=document.querySelector(".cart-total");s.innerHTML=`Total: $${a}`,o.classList.remove("hide")}else document.querySelector(".product-list").innerHTML="<p>Your cart is empty.</p>",document.querySelector(".cart-footer").classList.add("hide")}function d(r){return`<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${r.Image}"
      alt="${r.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${r.Name}</h2>
  </a>
  <p class="cart-card__color">${r.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${r.FinalPrice}</p>
</li>`}i();
