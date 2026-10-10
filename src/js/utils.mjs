// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderWithTemplate(template, parentElement, data, callback) {
  if (!parentElement) return;
  const fragment = document.createRange().createContextualFragment(template);
  parentElement.replaceChildren(fragment);
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(templatePath) {
  const baseUrl = import.meta.env.BASE_URL || '/';
  const cleanPath = templatePath.startsWith('/') ? templatePath.slice(1) : templatePath;
  const path = `${baseUrl}${cleanPath}`;
  let response = await fetch(path);
  if (!response.ok) {
    response = await fetch(templatePath);
  }
  if (!response.ok) {
    throw new Error(`Failed to load template: ${templatePath}`);
  }
  const template = await response.text();
  return template;
}

export async function loadHeaderFooter(headerpath = '/partials/header.html', footerpath = '/partials/footer.html') {
  try {
    const header = await loadTemplate(headerpath);
    const footer = await loadTemplate(footerpath);
    const headerElement = document.querySelector("#main-header");
    const footerElement = document.querySelector("#main-footer");
    if (headerElement) {
      renderWithTemplate(header, headerElement);
      const baseUrl = import.meta.env.BASE_URL || '/';
      const logoLink = headerElement.querySelector('.logo a');
      const logoImg = headerElement.querySelector('.logo img');
      const cartLink = headerElement.querySelector('.cart a');
      if (logoLink) logoLink.href = `${baseUrl}index.html`;
      if (logoImg) logoImg.src = `${baseUrl}images/noun_Tent_2517.svg`;
      if (cartLink) cartLink.href = `${baseUrl}cart/index.html`;
    }
    if (footerElement) {
      renderWithTemplate(footer, footerElement);
    }
    updateCartCount();
  } catch (err) {
    console.error('Error loading header or footer partials:', err);
  }
}

export function updateCartCount() {
  const cart = getLocalStorage('so-cart');
  const count = Array.isArray(cart) ? cart.length : 0;
  const badge = document.getElementById('cart-count');
  if (badge) {
    badge.textContent = count > 0 ? count : '';
    badge.style.display = count > 0 ? 'inline-flex' : 'none';
  }
}