import{a as r,u as c}from"./utils-jHYyWK34.js";import{P as e}from"./ProductData-Dx0C3TkS.js";const n=r("category")||"tents",o=new e(n);function s(a){return`<li class="product-card">
    <a href="../product_pages/index.html?product=${a.Id}">
      <img src="${a.Image}" alt="${a.Name}" />
      <h3 class="card__brand">${a.Brand.Name}</h3>
      <h2 class="card__name">${a.NameWithoutBrand}</h2>
      <p class="product-card__price">$${a.FinalPrice}</p>
    </a>
  </li>`}async function d(){const a=await o.getData(),t=document.querySelector(".product-list");t.innerHTML=a.map(s).join("")}d();c();
