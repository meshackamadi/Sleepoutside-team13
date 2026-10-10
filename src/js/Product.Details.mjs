import { getParam } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductDetails from './ProductDetails.mjs';

export default ProductDetails;
export { ProductDetails };

if (typeof window !== 'undefined') {
  const productId = getParam('product');
  if (productId) {
    const dataSource = new ExternalServices('tents');
    const product = new ProductDetails(productId, dataSource);
    product.init();
  }
}
