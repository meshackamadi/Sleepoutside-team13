import { loadHeaderFooter, updateCartCount } from './utils.mjs';
import CheckoutProcess from './CheckoutProcess.mjs';

loadHeaderFooter('/partials/header.html', '/partials/footer.html');
updateCartCount();

const myCheckout = new CheckoutProcess('so-cart', '.order-summary');
myCheckout.init();

const zipInput = document.querySelector('#zip');
if (zipInput) {
  zipInput.addEventListener('blur', () => {
    myCheckout.calculateOrdertotal();
  });
  zipInput.addEventListener('change', () => {
    myCheckout.calculateOrdertotal();
  });
}

const form = document.forms['checkout'];
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    myCheckout.calculateOrdertotal();
    try {
      const res = await myCheckout.checkout(form);
      const baseUrl = import.meta.env.BASE_URL || '/';
      window.location.href = `${baseUrl}index.html`;
    } catch (err) {
      alert('Checkout failed. Please check your information and try again.');
    }
  });
}
