import ExternalServices from './ExternalServices.mjs';
import { getParam, updateCartCount, loadHeaderFooter, getLocalStorage, setLocalStorage } from './utils.mjs';

loadHeaderFooter('/partials/header.html', '/partials/footer.html');

const category = getParam('category') || 'tents';
const dataSource = new ExternalServices(category);

const titleElement = document.querySelector('.products h2');
if (titleElement) {
  const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
  titleElement.textContent = `Top Products: ${formattedCategory}`;
  document.title = `Sleep Outside | ${formattedCategory}`;
}

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="../product_pages/index.html?product=${product.Id}">
      <img src="${product.Image}" alt="${product.Name}" />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
    <button class="quick-view-btn" data-id="${product.Id}" type="button">Quick View</button>
  </li>`;
}

function renderQuickViewModal(product) {
  const modal = document.querySelector('#quick-view-modal');
  const modalBody = document.querySelector('#modal-body');
  if (!modal || !modalBody) return;

  const color = product.Colors?.[0]?.ColorName || '';
  const description = product.DescriptionHtmlSimple || '';

  modalBody.innerHTML = `
    <div class="modal-product-details">
      <h3>${product.Brand.Name}</h3>
      <h2>${product.NameWithoutBrand}</h2>
      <img src="${product.Image}" alt="${product.Name}" />
      <p class="price">$${product.FinalPrice}</p>
      ${color ? `<p class="product__color">Color: ${color}</p>` : ''}
      <div class="description">${description}</div>
      <div class="modal-actions">
        <button id="modal-add-to-cart" type="button" data-id="${product.Id}">Add to Cart</button>
        <a href="../product_pages/index.html?product=${product.Id}" class="modal-view-details">Full Details</a>
      </div>
    </div>
  `;

  const addBtn = modalBody.querySelector('#modal-add-to-cart');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      let cart = getLocalStorage('so-cart') || [];
      if (!Array.isArray(cart)) cart = [cart];
      cart.push(product);
      setLocalStorage('so-cart', cart);
      updateCartCount();
      addBtn.textContent = 'Added! ✓';
      setTimeout(() => {
        addBtn.textContent = 'Add to Cart';
      }, 1500);
    });
  }

  if (typeof modal.showModal === 'function') {
    modal.showModal();
  } else {
    modal.classList.remove('hide');
  }
}

function setupModal() {
  const modal = document.querySelector('#quick-view-modal');
  const closeBtn = document.querySelector('#close-modal');
  if (!modal) return;

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (typeof modal.close === 'function') {
        modal.close();
      } else {
        modal.classList.add('hide');
      }
    });
  }

  // Close when clicking outside modal content
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      if (typeof modal.close === 'function') {
        modal.close();
      } else {
        modal.classList.add('hide');
      }
    }
  });
}

async function renderProductList() {
  const products = await dataSource.getData();
  const productList = document.querySelector('.product-list');
  productList.innerHTML = products.map(productCardTemplate).join('');

  document.querySelectorAll('.quick-view-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const product = products.find((p) => p.Id === id);
      if (product) {
        renderQuickViewModal(product);
      }
    });
  });
}

setupModal();
renderProductList();
updateCartCount();
