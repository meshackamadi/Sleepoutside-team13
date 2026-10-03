import{l,u as n,g as i}from"./utils-jHYyWK34.js";l();function d(){const t=i("so-cart");if(t&&t.length>0){const r=Array.isArray(t)?t:[t],c=r.map(a=>m(a));document.querySelector(".product-list").innerHTML=c.join("");let e=0;r.forEach(a=>{e+=a.FinalPrice});const o=document.querySelector(".cart-footer"),s=document.querySelector(".cart-total");s.innerHTML=`Total: $${e}`,o.classList.remove("hide")}else document.querySelector(".product-list").innerHTML="<p>Your cart is empty.</p>",document.querySelector(".cart-footer").classList.add("hide")}function m(t){return`<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${t.Image}"
      alt="${t.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${t.Name}</h2>
  </a>
  <p class="cart-card__color">${t.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${t.FinalPrice}</p>
</li>`}d();n();
