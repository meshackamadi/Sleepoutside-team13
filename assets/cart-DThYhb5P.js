import{l as i,u as d,g as u}from"./utils-BTTFrAus.js";i("/partials/header.html","/partials/footer.html");function m(){const t=u("so-cart"),s="/Sleepoutside-team13/",c=document.querySelector("#checkout-btn");if(c&&(c.href=`${s}checkout/index.html`),t&&t.length>0){const e=Array.isArray(t)?t:[t],a=e.map(o=>p(o));document.querySelector(".product-list").innerHTML=a.join("");let r=0;e.forEach(o=>{r+=o.FinalPrice||o.price||0});const l=document.querySelector(".cart-footer"),n=document.querySelector(".cart-total");n&&(n.innerHTML=`Total: $${r.toFixed(2)}`),l&&l.classList.remove("hide")}else{document.querySelector(".product-list").innerHTML="<p>Your cart is empty.</p>";const e=document.querySelector(".cart-footer");e&&e.classList.add("hide")}}function p(t){var a,r;const s=((r=(a=t.Colors)==null?void 0:a[0])==null?void 0:r.ColorName)||"",c=t.FinalPrice||t.price||0;return`<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${t.Image}"
      alt="${t.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${t.Name}</h2>
  </a>
  <p class="cart-card__color">${s}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${Number(c).toFixed(2)}</p>
</li>`}m();d();
