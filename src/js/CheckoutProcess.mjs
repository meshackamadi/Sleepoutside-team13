import { getLocalStorage, setLocalStorage } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

function packageItems(items) {
  return items.map((item) => ({
    id: item.Id || item.id,
    name: item.Name || item.name,
    price: item.FinalPrice || item.price,
    quantity: item.quantity || item.Quantity || 1,
  }));
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    if (!Array.isArray(this.list)) {
      this.list = this.list ? [this.list] : [];
    }
    this.calculateItemSummary();
  }

  calculateItemSummary() {
    const summaryElement =
      document.querySelector(`${this.outputSelector} #subtotal`) ||
      document.querySelector('#subtotal');
    const countElement =
      document.querySelector(`${this.outputSelector} #num-items`) ||
      document.querySelector('#num-items');

    let total = 0;
    let count = 0;
    this.list.forEach((item) => {
      const price = item.FinalPrice || item.price || 0;
      const qty = item.quantity || item.Quantity || 1;
      total += price * qty;
      count += qty;
    });

    this.itemTotal = total;
    if (summaryElement) {
      summaryElement.innerText = `$${this.itemTotal.toFixed(2)}`;
    }
    if (countElement) {
      countElement.innerText = `${count}`;
    }
  }

  calculateOrdertotal() {
    let count = 0;
    this.list.forEach((item) => {
      count += item.quantity || item.Quantity || 1;
    });

    if (count > 0) {
      this.shipping = 10 + (count - 1) * 2;
    } else {
      this.shipping = 0;
    }

    this.tax = this.itemTotal * 0.06;
    this.orderTotal = this.itemTotal + this.shipping + this.tax;

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const taxElement =
      document.querySelector(`${this.outputSelector} #tax`) ||
      document.querySelector('#tax');
    const shippingElement =
      document.querySelector(`${this.outputSelector} #shipping`) ||
      document.querySelector('#shipping');
    const totalElement =
      document.querySelector(`${this.outputSelector} #orderTotal`) ||
      document.querySelector('#orderTotal');

    if (taxElement) taxElement.innerText = `$${this.tax.toFixed(2)}`;
    if (shippingElement) shippingElement.innerText = `$${this.shipping.toFixed(2)}`;
    if (totalElement) totalElement.innerText = `$${this.orderTotal.toFixed(2)}`;
  }

  async checkout(form) {
    const json = formDataToJSON(form);
    json.orderDate = new Date().toISOString();
    json.orderTotal = this.orderTotal.toFixed(2);
    json.tax = this.tax.toFixed(2);
    json.shipping = this.shipping;
    json.items = packageItems(this.list);

    const services = new ExternalServices();
    try {
      const res = await services.checkout(json);
      console.log('Order response:', res);
      setLocalStorage(this.key, []);
      return res;
    } catch (err) {
      console.error('Checkout failed:', err);
      throw err;
    }
  }
}
