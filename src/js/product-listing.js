import ProductData from './ProductData.mjs';
import { getParam, updateCartCount } from './utils.mjs';

const category = getParam('category') || 'tents';
const dataSource = new ProductData(category);

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
      <img src="${product.Image}" alt="${product.Name}" />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

async function renderProductList() {
    const products = await dataSource.getData();
    const productList = document.querySelector('.product-list');
    productList.innerHTML = products.map(productCardTemplate).join('');
}

renderProductList();
updateCartCount();
