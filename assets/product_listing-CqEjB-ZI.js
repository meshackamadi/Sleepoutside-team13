import{l as m,a as p,u,g as f,s as h}from"./utils-BTTFrAus.js";import{E as y}from"./ExternalServices-5B962CgB.js";m("/partials/header.html","/partials/footer.html");const r=p("category")||"tents",$=new y(r),l=document.querySelector(".products h2");if(l){const t=r.charAt(0).toUpperCase()+r.slice(1);l.textContent=`Top Products: ${t}`,document.title=`Sleep Outside | ${t}`}function g(t){return`<li class="product-card">
    <a href="../product_pages/index.html?product=${t.Id}">
      <img src="${t.Image}" alt="${t.Name}" />
      <h3 class="card__brand">${t.Brand.Name}</h3>
      <h2 class="card__name">${t.NameWithoutBrand}</h2>
      <p class="product-card__price">$${t.FinalPrice}</p>
    </a>
    <button class="quick-view-btn" data-id="${t.Id}" type="button">Quick View</button>
  </li>`}function v(t){var i,n;const e=document.querySelector("#quick-view-modal"),a=document.querySelector("#modal-body");if(!e||!a)return;const s=((n=(i=t.Colors)==null?void 0:i[0])==null?void 0:n.ColorName)||"",d=t.DescriptionHtmlSimple||"";a.innerHTML=`
    <div class="modal-product-details">
      <h3>${t.Brand.Name}</h3>
      <h2>${t.NameWithoutBrand}</h2>
      <img src="${t.Image}" alt="${t.Name}" />
      <p class="price">$${t.FinalPrice}</p>
      ${s?`<p class="product__color">Color: ${s}</p>`:""}
      <div class="description">${d}</div>
      <div class="modal-actions">
        <button id="modal-add-to-cart" type="button" data-id="${t.Id}">Add to Cart</button>
        <a href="../product_pages/index.html?product=${t.Id}" class="modal-view-details">Full Details</a>
      </div>
    </div>
  `;const o=a.querySelector("#modal-add-to-cart");o&&o.addEventListener("click",()=>{let c=f("so-cart")||[];Array.isArray(c)||(c=[c]),c.push(t),h("so-cart",c),u(),o.textContent="Added! ✓",setTimeout(()=>{o.textContent="Add to Cart"},1500)}),typeof e.showModal=="function"?e.showModal():e.classList.remove("hide")}function S(){const t=document.querySelector("#quick-view-modal"),e=document.querySelector("#close-modal");t&&(e&&e.addEventListener("click",()=>{typeof t.close=="function"?t.close():t.classList.add("hide")}),t.addEventListener("click",a=>{a.target===t&&(typeof t.close=="function"?t.close():t.classList.add("hide"))}))}async function C(){const t=await $.getData(),e=document.querySelector(".product-list");e.innerHTML=t.map(g).join(""),document.querySelectorAll(".quick-view-btn").forEach(a=>{a.addEventListener("click",s=>{s.stopPropagation();const d=a.dataset.id,o=t.find(i=>i.Id===d);o&&v(o)})})}S();C();u();
