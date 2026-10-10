import{a as r,u as e}from"./utils-BVwILOua.js";import{E as c}from"./ExternalServices-5B962CgB.js";const n=r("category")||"tents",s=new c(n);function o(a){return`<li class="product-card">
    <a href="../product_pages/index.html?product=${a.Id}">
      <img src="${a.Image}" alt="${a.Name}" />
      <h3 class="card__brand">${a.Brand.Name}</h3>
      <h2 class="card__name">${a.NameWithoutBrand}</h2>
      <p class="product-card__price">$${a.FinalPrice}</p>
    </a>
  </li>`}async function i(){const a=await s.getData(),t=document.querySelector(".product-list");t.innerHTML=a.map(o).join("")}i();e();
