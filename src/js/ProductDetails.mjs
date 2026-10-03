import { setLocalStorage, getLocalStorage, updateCartCount } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = null;
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    if (!this.product) {
      document.querySelector('.product-detail').innerHTML =
        '<p>Product not found.</p>';
      return;
    }
    this.renderProductDetails();
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
    updateCartCount();
  }

  addToCart() {
    let cart = getLocalStorage('so-cart');
    if (!Array.isArray(cart)) {
      cart = cart ? [cart] : [];
    }
    cart.push(this.product);
    setLocalStorage('so-cart', cart);
    updateCartCount();
  }

  renderProductDetails() {
    const p = this.product;
    document.querySelector('h3').textContent = p.Brand.Name;
    document.querySelector('h2.divider').textContent = p.NameWithoutBrand;
    document.querySelector('img.divider').src = p.Image;
    document.querySelector('img.divider').alt = p.Name;
    document.querySelector('.product-card__price').textContent =
      `$${p.FinalPrice}`;
    document.querySelector('.product__color').textContent =
      p.Colors?.[0]?.ColorName || '';
    document.querySelector('.product__description').innerHTML =
      p.DescriptionHtmlSimple;
    document.getElementById('addToCart').dataset.id = p.Id;
    document.title = `Sleep Outside | ${p.Name}`;
  }
}
