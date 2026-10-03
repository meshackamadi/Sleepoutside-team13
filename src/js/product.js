import { getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

const filenameToId = {
  'marmot-ajax-3': '880RR',
  'northface-talus-4': '985RF',
  'northface-alpine-3': '985PR',
  'cedar-ridge-rimrock-2': '344YJ',
};

let productId = getParam('product');
if (!productId) {
  const path = window.location.pathname;
  for (const [key, id] of Object.entries(filenameToId)) {
    if (path.includes(key)) {
      productId = id;
      break;
    }
  }
}
if (!productId) {
  productId = '880RR';
}

const dataSource = new ProductData('tents');

const product = new ProductDetails(productId, dataSource);
product.init();
